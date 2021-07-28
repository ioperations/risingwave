/*
 * Licensed to Crate.io GmbH ("Crate") under one or more contributor
 * license agreements.  See the NOTICE file distributed with this work for
 * additional information regarding copyright ownership.  Crate licenses
 * this file to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.  You may
 * obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * However, if you have executed another commercial license agreement
 * with Crate these terms will supersede the license and you may use the
 * software solely pursuant to the terms of the relevant commercial agreement.
 */

package com.risingwave.sql.tree;

import java.util.Locale;

public final class DiscardStatement extends Statement {

  public enum Target {
    ALL,
    PLANS,
    SEQUENCES,
    TEMPORARY
  }

  private final Target target;

  public DiscardStatement(Target target) {
    this.target = target;
  }

  public Target target() {
    return target;
  }

  @Override
  public String toString() {
    return "DISCARD " + target.name().toUpperCase(Locale.ENGLISH);
  }

  @Override
  public int hashCode() {
    return target.hashCode();
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof DiscardStatement && ((DiscardStatement) obj).target == this.target;
  }

  @Override
  public <R, C> R accept(AstVisitor<R, C> visitor, C context) {
    return visitor.visitDiscard(this, context);
  }
}
