// Copyright 2023 Singularity Data
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use std::collections::{HashMap, HashSet};
use std::sync::Arc;

use bytes::Bytes;
use futures::future::try_join_all;
use futures::{stream, StreamExt, TryFutureExt};
use itertools::Itertools;
use risingwave_common::catalog::TableId;
use risingwave_hummock_sdk::compaction_group::StaticCompactionGroupId;
use risingwave_hummock_sdk::filter_key_extractor::FilterKeyExtractorImpl;
use risingwave_hummock_sdk::key::{FullKey, UserKey};
use risingwave_hummock_sdk::key_range::KeyRange;
use risingwave_hummock_sdk::{CompactionGroupId, HummockEpoch, LocalSstableInfo};

use crate::hummock::compactor::compaction_filter::DummyCompactionFilter;
use crate::hummock::compactor::context::Context;
use crate::hummock::compactor::{CompactOutput, Compactor};
use crate::hummock::iterator::{Forward, HummockIterator};
use crate::hummock::shared_buffer::shared_buffer_uploader::UploadTaskPayload;
use crate::hummock::shared_buffer::{build_ordered_merge_iter, UncommittedData};
use crate::hummock::sstable::{DeleteRangeAggregatorBuilder, SstableIteratorReadOptions};
use crate::hummock::{
    CachePolicy, ForwardIter, HummockError, HummockResult, RangeTombstonesCollector,
    SstableBuilderOptions,
};
use crate::monitor::StoreLocalStatistic;

const GC_DELETE_KEYS_FOR_FLUSH: bool = false;
const GC_WATERMARK_FOR_FLUSH: u64 = 0;

/// Flush shared buffer to level0. Resulted SSTs are grouped by compaction group.
pub async fn compact(
    context: Arc<Context>,
    payload: UploadTaskPayload,
    compaction_group_index: Arc<HashMap<TableId, CompactionGroupId>>,
) -> HummockResult<Vec<LocalSstableInfo>> {
    let mut grouped_payload: HashMap<CompactionGroupId, UploadTaskPayload> = HashMap::new();
    for uncommitted_list in payload {
        let mut next_inner = HashSet::new();
        for uncommitted in uncommitted_list {
            let compaction_group_id = match &uncommitted {
                UncommittedData::Sst(LocalSstableInfo {
                    compaction_group_id,
                    ..
                }) => *compaction_group_id,
                UncommittedData::Batch(batch) => {
                    match compaction_group_index.get(&batch.table_id) {
                        // compaction group id is used only as a hint for grouping different data.
                        // If the compaction group id is not found for the table id, we can assign a
                        // default compaction group id for the batch.
                        //
                        // On meta side, when we commit a new epoch, it is acceptable that the
                        // compaction group id provided from CN does not match the latest compaction
                        // group config.
                        None => StaticCompactionGroupId::StateDefault as CompactionGroupId,
                        Some(group_id) => *group_id,
                    }
                }
            };
            let group = grouped_payload
                .entry(compaction_group_id)
                .or_insert_with(std::vec::Vec::new);
            if !next_inner.contains(&compaction_group_id) {
                group.push(vec![]);
                next_inner.insert(compaction_group_id);
            }
            group.last_mut().unwrap().push(uncommitted);
        }
    }

    let mut futures = vec![];
    for (id, group_payload) in grouped_payload {
        let id_copy = id;
        futures.push(
            compact_shared_buffer(context.clone(), group_payload).map_ok(move |results| {
                results
                    .into_iter()
                    .map(move |mut result| {
                        result.compaction_group_id = id_copy;
                        result
                    })
                    .collect_vec()
            }),
        );
    }
    // Note that the output is reordered compared with input `payload`.
    let result = try_join_all(futures)
        .await?
        .into_iter()
        .flatten()
        .collect_vec();
    Ok(result)
}

/// For compaction from shared buffer to level 0, this is the only function gets called.
async fn compact_shared_buffer(
    context: Arc<Context>,
    payload: UploadTaskPayload,
) -> HummockResult<Vec<LocalSstableInfo>> {
    // Local memory compaction looks at all key ranges.
    let sstable_store = context.sstable_store.clone();
    let mut local_stats = StoreLocalStatistic::default();
    let mut size_and_start_user_keys = vec![];
    let mut compact_data_size = 0;
    let mut builder = DeleteRangeAggregatorBuilder::default();
    for data_list in &payload {
        for data in data_list {
            let data_size = match data {
                UncommittedData::Sst(LocalSstableInfo { sst_info, .. }) => {
                    let table = sstable_store.sstable(sst_info, &mut local_stats).await?;
                    // TODO: use reference to avoid memory allocation.
                    let tombstones = table.value().meta.range_tombstone_list.clone();
                    builder.add_tombstone(tombstones);
                    sst_info.file_size
                }
                UncommittedData::Batch(batch) => {
                    let tombstones = batch.get_delete_range_tombstones();
                    builder.add_tombstone(tombstones);
                    // calculate encoded bytes of key var length
                    (batch.get_payload().len() * 8 + batch.size()) as u64
                }
            };
            compact_data_size += data_size;
            size_and_start_user_keys.push((data_size, data.start_user_key()));
        }
    }
    size_and_start_user_keys.sort();
    let mut splits = Vec::with_capacity(size_and_start_user_keys.len());
    splits.push(KeyRange::new(Bytes::new(), Bytes::new()));
    let mut key_split_append = |key_before_last: &Bytes| {
        splits.last_mut().unwrap().right = key_before_last.clone();
        splits.push(KeyRange::new(key_before_last.clone(), Bytes::new()));
    };
    let sstable_size = (context.options.sstable_size_mb as u64) << 20;
    let parallelism = std::cmp::min(
        context.options.share_buffers_sync_parallelism as u64,
        size_and_start_user_keys.len() as u64,
    );
    let sub_compaction_data_size = if compact_data_size > sstable_size && parallelism > 1 {
        compact_data_size / parallelism
    } else {
        compact_data_size
    };
    // mul 1.2 for other extra memory usage.
    let sub_compaction_sstable_size = std::cmp::min(sstable_size, sub_compaction_data_size * 6 / 5);
    if parallelism > 1 && compact_data_size > sstable_size {
        let mut last_buffer_size = 0;
        let mut last_user_key = UserKey::default();
        for (data_size, user_key) in size_and_start_user_keys {
            if last_buffer_size >= sub_compaction_data_size && last_user_key.as_ref() != user_key {
                last_user_key.set(user_key);
                key_split_append(
                    &FullKey {
                        user_key,
                        epoch: HummockEpoch::MAX,
                    }
                    .encode()
                    .into(),
                );
                last_buffer_size = data_size;
            } else {
                last_user_key.set(user_key);
                last_buffer_size += data_size;
            }
        }
    }

    let existing_table_ids: HashSet<u32> = payload
        .iter()
        .flat_map(|data_list| {
            data_list
                .iter()
                .flat_map(|uncommitted_data| match uncommitted_data {
                    UncommittedData::Sst(local_sst_info) => {
                        local_sst_info.sst_info.table_ids.clone()
                    }
                    UncommittedData::Batch(shared_buffer_write_batch) => {
                        vec![shared_buffer_write_batch.table_id.table_id()]
                    }
                })
        })
        .dedup()
        .collect();

    assert!(!existing_table_ids.is_empty());

    let multi_filter_key_extractor = context
        .filter_key_extractor_manager
        .acquire(existing_table_ids)
        .await;
    let multi_filter_key_extractor = Arc::new(multi_filter_key_extractor);
    let stats = context.stats.clone();

    let parallelism = splits.len();
    let mut compact_success = true;
    let mut output_ssts = Vec::with_capacity(parallelism);
    let mut compaction_futures = vec![];

    let agg = builder.build(GC_WATERMARK_FOR_FLUSH, GC_DELETE_KEYS_FOR_FLUSH);
    for (split_index, key_range) in splits.into_iter().enumerate() {
        let compactor = SharedBufferCompactRunner::new(
            split_index,
            key_range,
            context.clone(),
            sub_compaction_sstable_size as usize,
        );
        let iter = build_ordered_merge_iter::<ForwardIter>(
            &payload,
            sstable_store.clone(),
            stats.clone(),
            &mut local_stats,
            Arc::new(SstableIteratorReadOptions::default()),
        )
        .await?;
        let compaction_executor = context.compaction_executor.clone();
        let multi_filter_key_extractor = multi_filter_key_extractor.clone();
        let del_range_agg = agg.clone();
        let handle = compaction_executor.spawn(async move {
            compactor
                .run(iter, multi_filter_key_extractor, del_range_agg)
                .await
        });
        compaction_futures.push(handle);
    }
    local_stats.report(stats.as_ref());

    let mut buffered = stream::iter(compaction_futures).buffer_unordered(parallelism);
    let mut err = None;
    while let Some(future_result) = buffered.next().await {
        match future_result {
            Ok(Ok((split_index, ssts, table_stats_map))) => {
                output_ssts.push((split_index, ssts, table_stats_map));
            }
            Ok(Err(e)) => {
                compact_success = false;
                tracing::warn!("Shared Buffer Compaction failed with error: {:#?}", e);
                err = Some(e);
            }
            Err(e) => {
                compact_success = false;
                tracing::warn!(
                    "Shared Buffer Compaction failed with future error: {:#?}",
                    e
                );
                err = Some(HummockError::compaction_executor(
                    "failed while execute in tokio",
                ));
            }
        }
    }

    // Sort by split/key range index.
    output_ssts.sort_by_key(|(split_index, ..)| *split_index);

    if compact_success {
        let mut level0 = Vec::with_capacity(parallelism);

        for (_, ssts, _) in output_ssts {
            for sst_info in &ssts {
                context
                    .stats
                    .write_build_l0_bytes
                    .inc_by(sst_info.file_size());
            }
            level0.extend(ssts);
        }

        Ok(level0)
    } else {
        Err(err.unwrap())
    }
}

pub struct SharedBufferCompactRunner {
    compactor: Compactor,
    split_index: usize,
}

impl SharedBufferCompactRunner {
    pub fn new(
        split_index: usize,
        key_range: KeyRange,
        context: Arc<Context>,
        sub_compaction_sstable_size: usize,
    ) -> Self {
        let mut options: SstableBuilderOptions = context.options.as_ref().into();
        options.capacity = sub_compaction_sstable_size;
        let compactor = Compactor::new(
            context,
            options,
            key_range,
            CachePolicy::Fill,
            GC_DELETE_KEYS_FOR_FLUSH,
            GC_WATERMARK_FOR_FLUSH,
            None,
        );
        Self {
            compactor,
            split_index,
        }
    }

    pub async fn run(
        self,
        iter: impl HummockIterator<Direction = Forward>,
        filter_key_extractor: Arc<FilterKeyExtractorImpl>,
        del_agg: Arc<RangeTombstonesCollector>,
    ) -> HummockResult<CompactOutput> {
        let dummy_compaction_filter = DummyCompactionFilter {};
        let (ssts, table_stats_map) = self
            .compactor
            .compact_key_range(
                iter,
                dummy_compaction_filter,
                del_agg,
                filter_key_extractor,
                None,
            )
            .await?;
        Ok((self.split_index, ssts, table_stats_map))
    }
}
