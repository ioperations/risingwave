(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[893],{6696:function(e,n,r){"use strict";r.d(n,{Td:function(){return x},Th:function(){return f},Tr:function(){return p},hr:function(){return h},iA:function(){return u},p3:function(){return m},xJ:function(){return d}});var t=r(7294),i=r(2067),c=r(4520),o=r(8387),s=(...e)=>e.filter(Boolean).join(" "),[a,l]=(0,o.k)({name:"TableStylesContext",errorMessage:"useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Table />\" "}),u=(0,i.Gp)(((e,n)=>{const r=(0,i.jC)("Table",e),{className:o,...l}=(0,c.Lr)(e);return t.createElement(a,{value:r},t.createElement(i.m$.table,{role:"table",ref:n,__css:r.table,className:s("chakra-table",o),...l}))}));u.displayName="Table";var d=(0,i.Gp)(((e,n)=>{const{overflow:r,overflowX:c,className:o,...a}=e;return t.createElement(i.m$.div,{ref:n,className:s("chakra-table__container",o),...a,__css:{display:"block",whiteSpace:"nowrap",WebkitOverflowScrolling:"touch",overflowX:r??c??"auto",overflowY:"hidden",maxWidth:"100%"}})}));(0,i.Gp)(((e,n)=>{const{placement:r="bottom",...c}=e,o=l();return t.createElement(i.m$.caption,{...c,ref:n,__css:{...o.caption,captionSide:r}})})).displayName="TableCaption";var h=(0,i.Gp)(((e,n)=>{const r=l();return t.createElement(i.m$.thead,{...e,ref:n,__css:r.thead})})),m=(0,i.Gp)(((e,n)=>{const r=l();return t.createElement(i.m$.tbody,{...e,ref:n,__css:r.tbody})})),f=((0,i.Gp)(((e,n)=>{const r=l();return t.createElement(i.m$.tfoot,{...e,ref:n,__css:r.tfoot})})),(0,i.Gp)((({isNumeric:e,...n},r)=>{const c=l();return t.createElement(i.m$.th,{...n,ref:r,__css:c.th,"data-is-numeric":e})}))),p=(0,i.Gp)(((e,n)=>{const r=l();return t.createElement(i.m$.tr,{role:"row",...e,ref:n,__css:r.tr})})),x=(0,i.Gp)((({isNumeric:e,...n},r)=>{const c=l();return t.createElement(i.m$.td,{role:"gridcell",...n,ref:r,__css:c.td,"data-is-numeric":e})}))},3066:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sinks",function(){return r(6209)}])},7841:function(e,n,r){"use strict";r.d(n,{K:function(){return j}});var t=r(7568),i=r(4051),c=r.n(i),o=r(5893),s=r(6479),a=r(639),l=r(6696),u=r(7741),d=r(9008),h=r.n(d),m=r(1664),f=r.n(m),p=r(7294),x=r(5330),v=r(8704);function j(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=(0,s.pm)(),d=(0,p.useState)([]),m=d[0],j=d[1];(0,p.useEffect)((function(){function e(){return(e=(0,t.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=j,e.next=4,n();case 4:e.t1=e.sent,(0,e.t0)(e.t1),e.next=12;break;case 8:e.prev=8,e.t2=e.catch(0),i({title:"Error Occurred",description:e.t2.toString(),status:"error",duration:5e3,isClosable:!0}),console.error(e.t2);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return function(){e.apply(this,arguments)}(),function(){}}),[i,n]);var w=(0,o.jsxs)(a.xu,{p:3,children:[(0,o.jsx)(x.Z,{children:e}),(0,o.jsx)(l.xJ,{children:(0,o.jsxs)(l.iA,{variant:"simple",size:"sm",maxWidth:"full",children:[(0,o.jsx)(l.hr,{children:(0,o.jsxs)(l.Tr,{children:[(0,o.jsx)(l.Th,{width:3,children:"Id"}),(0,o.jsx)(l.Th,{width:5,children:"Name"}),(0,o.jsx)(l.Th,{width:3,children:"Owner"}),r.map((function(e){return(0,o.jsx)(l.Th,{width:e.width,children:e.name},e.name)})),(0,o.jsx)(l.Th,{width:1,children:"Metrics"}),(0,o.jsx)(l.Th,{width:1,children:"Depends"}),(0,o.jsx)(l.Th,{width:1,children:"Fragments"}),(0,o.jsx)(l.Th,{children:"Visible Columns"})]})}),(0,o.jsx)(l.p3,{children:m.map((function(e){return(0,o.jsxs)(l.Tr,{children:[(0,o.jsx)(l.Td,{children:e.id}),(0,o.jsx)(l.Td,{children:e.name}),(0,o.jsx)(l.Td,{children:e.owner}),r.map((function(n){return(0,o.jsx)(l.Td,{children:n.content(e)},n.name)})),(0,o.jsx)(l.Td,{children:(0,o.jsx)(u.zx,{size:"sm","aria-label":"view metrics",colorScheme:"teal",variant:"link",children:"M"})}),(0,o.jsx)(l.Td,{children:(0,o.jsx)(f(),{href:"/streaming_graph/?id=".concat(e.id),children:(0,o.jsx)(u.zx,{size:"sm","aria-label":"view metrics",colorScheme:"teal",variant:"link",children:"D"})})}),(0,o.jsx)(l.Td,{children:(0,o.jsx)(f(),{href:"/streaming_plan/?id=".concat(e.id),children:(0,o.jsx)(u.zx,{size:"sm","aria-label":"view metrics",colorScheme:"teal",variant:"link",children:"F"})})}),(0,o.jsx)(l.Td,{overflowWrap:"normal",children:e.columns.filter((function(e){return!e.isHidden})).map((function(e){return(0,v.Z)(e)})).join(", ")})]},e.id)}))})]})})]});return(0,o.jsxs)(p.Fragment,{children:[(0,o.jsx)(h(),{children:(0,o.jsx)("title",{children:e})}),w]})}},8704:function(e,n,r){"use strict";function t(e){var n,r,t;return"".concat(null===(n=e.columnDesc)||void 0===n?void 0:n.name," (").concat(null===(r=e.columnDesc)||void 0===r||null===(t=r.columnType)||void 0===t?void 0:t.typeName,")")}r.d(n,{Z:function(){return t}})},6209:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return c}});var t=r(7841),i=r(6640);function c(){var e,n=[{name:"Connector",width:3,content:function(n){return null!==(e=n.properties.connector)&&void 0!==e?e:"unknown"}}];return(0,t.K)("Sinks",i.Iw,n)}},603:function(e,n,r){"use strict";function t(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(e){if("string"===typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(n,{Z:function(){return i}})}},function(e){e.O(0,[482,836,640,774,888,179],(function(){return n=3066,e(e.s=n);var n}));var n=e.O();_N_E=n}]);