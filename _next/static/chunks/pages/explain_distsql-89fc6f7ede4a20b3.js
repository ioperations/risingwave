(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[80],{1718:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/explain_distsql",function(){return t(9318)}])},5330:function(n,e,t){"use strict";var i=t(5893),r=t(639);t(7294);e.Z=function(n){var e=n.children;return(0,i.jsx)(r.xv,{mb:2,textColor:"teal.500",fontWeight:"semibold",lineHeight:"6",children:e})}},9318:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return Z}});var i=t(603),r=t(7297),o=t(5893),a=t(639),d=t(4995),s=t(7741),c=t(7294),l=t(5330),u=t(9647),h=t(6022),p=t(5100),x=t(5362),g=t(4556),_=t(8091),f=t(5783);function v(){var n=(0,r.Z)(["\n  font-family: sans-serif;\n  text-align: left;\n"]);return v=function(){return n},n}function b(){var n=(0,r.Z)(["\n  width: 100%;\n  height: 80vh;\n"]);return b=function(){return n},n}var j=(0,g.ZP)(a.xu)(v()),y=(0,g.ZP)(a.xu)(b()),S={x:200,y:100},w={node:_.default};function m(n,e,t,i,r,o,a){if(0!=n.children.length)for(var d=0;d<n.children.length;d++){var s=n.children[d],c={id:"e".concat(n.plan_node_id,"-").concat(s.plan_node_id),source:n.plan_node_id.toString(),target:s.plan_node_id.toString(),type:"smoothstep"};if(r.push(c),!o.has(s.plan_node_id)){var l={id:s.plan_node_id.toString(),data:{label:"#".concat(s.plan_node_id," ").concat(s.plan_node_type),stage:e,content:Object.values(s.schema)},position:S,type:"node",style:t};null!=s.source_stage_id&&a.push([s.plan_node_id,s.source_stage_id]),m(s,e,t,i,r,o,a),i.push(l)}}}function k(n){var e=[],t=[],r=n.stages,o=new Set,a={},d=[],s=n.root_stage_id.toString(),c=!0,l=!1,u=void 0;try{for(var h,p=Object.entries(r)[Symbol.iterator]();!(c=(h=p.next()).done);c=!0){var x=(0,i.Z)(h.value,2),g=x[0],_=x[1].root;a[g]=_.plan_node_id;var v={background:"linear-gradient(".concat("hsl("+360*Math.random()+","+(25+70*Math.random())+"%,"+(85+10*Math.random())+"%)",", white, white)"),height:50,width:150,border:"0.5px solid black",padding:"5px","border-radius":"5px"},b={id:_.plan_node_id.toString(),data:{label:"#".concat(_.plan_node_id," ").concat(_.plan_node_type),stage:g,content:Object.values(_.schema)},position:S,type:"node",style:v};null!=_.source_stage_id&&d.push([_.plan_node_id,_.source_stage_id]),o.add(b.id),m(_,g,v,e,t,o,d),e.push(b)}}catch(Z){l=!0,u=Z}finally{try{c||null==p.return||p.return()}finally{if(l)throw u}}for(var j=0;j<d.length;j++){var y=d[j][0],w=a[d[j][1].toString()],k={id:"e".concat(w,"-").concat(y),source:y.toString(),target:w.toString(),type:"smoothstep"};t.push(k)}return function(n,e,t,i){var r=new Map;n.forEach((function(n){r.set(n.id,[{id:n.id,children:[]},n])})),e.forEach((function(n){var e=r.get(n.source)[0],t=r.get(n.target)[0];e.children.push(t)}));var o=r.get(t[i].toString())[0],a=f.bT9(o);f.G_s().nodeSize([60,180])(a).each((function(n){var e=r.get(n.data.id)[1];void 0!=e&&(e.position={x:n.y,y:n.x})}))}(e,t,a,s),{node:e,edge:t}}function Z(){var n=(0,c.useState)(""),e=n[0],t=n[1],i=(0,c.useState)(!1),r=i[0],g=i[1],_=(0,c.useState)([]),f=_[0],v=_[1],b=(0,c.useState)([]),S=b[0],m=b[1];return(0,o.jsx)(c.Fragment,{children:(0,o.jsxs)(a.xu,{p:3,children:[(0,o.jsx)(l.Z,{children:"Distributed Plan Explain"}),(0,o.jsxs)(a.Kq,{direction:"row",spacing:4,align:"center",children:[(0,o.jsx)(d.g,{name:"input json",placeholder:"Explain",value:e,onChange:function(n){t(n.target.value),g(!0)},style:{width:"1000px",height:"100px"}}),(0,o.jsx)(s.zx,{colorScheme:"blue",onClick:function(){if(r){var n=k(JSON.parse(e));m(n.edge),v(n.node),g(!1)}},style:{width:"80px",height:"100px"},children:"Click"})]}),(0,o.jsx)(j,{fluid:!0,children:(0,o.jsx)(y,{children:(0,o.jsxs)(u.ZP,{nodes:f,edges:S,nodeTypes:w,children:[(0,o.jsx)(h.Z,{}),(0,o.jsx)(p.i,{}),(0,o.jsx)(x.Z,{color:"#aaa",gap:16})]})})})]})})}},8091:function(n,e,t){"use strict";t.r(e);var i=t(5893),r=t(639),o=t(5914),a=t(3679),d=t(7294),s=t(9647),c=t(336),l=(0,a.ZP)((function(){return t.e(171).then(t.t.bind(t,5171,23))})),u={background:"#FFFFFF"};e.default=function(n){var e=n.data;return void 0===e||void 0===e.label?(0,i.jsx)(d.Fragment,{}):(0,i.jsxs)(r.xu,{children:[(0,i.jsxs)(o.J2,{isLazy:!0,placement:"top",children:[(0,i.jsx)(o.xo,{contentStyle:u,children:(0,i.jsxs)(r.xu,{zIndex:"0",children:[(0,i.jsx)(r.xv,{fontSize:"8px",textAlign:"right",color:"LightSlateGray",children:e.stage}),(0,i.jsxs)(r.xv,{fontSize:"14px",textAlign:"center",children:[e.label," "]})]})}),(0,i.jsx)(r.xu,{zIndex:"popover",children:(0,i.jsxs)(o.yk,{children:[(0,i.jsx)(o.QH,{}),(0,i.jsx)(r.xu,{sx:{"&::-webkit-scrollbar":{width:"16px",borderRadius:"8px",backgroundColor:"rgba(0, 0, 0, 0.05)"},"&::-webkit-scrollbar-thumb":{backgroundColor:"rgba(0, 0, 0, 0.05)"}},overflowX:"auto",maxHeight:"400px",children:(0,i.jsx)(l,{src:e.content,name:!1,displayDataTypes:!1})})]})})]}),(0,i.jsx)(s.HH,{type:"target",position:c.P.Left}),(0,i.jsx)(s.HH,{type:"source",position:c.P.Right})]})}}},function(n){n.O(0,[770,591,130,476,731,627,774,888,179],(function(){return e=1718,n(n.s=e);var e}));var e=n.O();_N_E=e}]);