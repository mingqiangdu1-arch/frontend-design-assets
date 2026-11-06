// IP-025 / original immutable row-first treegrid state model, no persistence.
export const TREE_NODES=Object.freeze([
 {id:"root",parentId:null,name:"研究素材",type:"root"},
 {id:"themes",parentId:"root",name:"视觉主题",type:"group"},
 {id:"style",parentId:"themes",name:"Typography-first",type:"item"},
 {id:"variations",parentId:"style",name:"布局变体",type:"group"},
 {id:"draft",parentId:"variations",name:"紧凑实验",type:"item"},
 {id:"components",parentId:"root",name:"交互控件",type:"group"},
 {id:"tokens",parentId:"components",name:"设计 Tokens",type:"item"},
 {id:"motion",parentId:"components",name:"动画规则",type:"item"},
 {id:"research",parentId:"root",name:"参考研究",type:"item"}
]);
const childIds=(nodes,id)=>nodes.filter(n=>n.parentId===id).map(n=>n.id);
export function validateTree(nodes){
 if(!Array.isArray(nodes)||!nodes.length)throw Error("Tree must contain nodes");
 const ids=new Set();
 for(const n of nodes){
  if(typeof n.id!=="string"||!n.id||ids.has(n.id))throw Error("Duplicate or empty node ID");
  ids.add(n.id);
 }
 const byId=new Map(nodes.map(n=>[n.id,n]));
 for(const n of nodes){
  if(n.parentId!==null&&!byId.has(n.parentId))throw Error("Missing parent: "+n.id);
  const chain=new Set([n.id]);let parent=n.parentId;
  while(parent!==null){if(chain.has(parent))throw Error("Cyclic parent graph");chain.add(parent);parent=byId.get(parent).parentId;}
 }
 return true;
}
export function visibleTreeRows(nodes,expanded){
 validateTree(nodes);
 const result=[],roots=nodes.filter(n=>n.parentId===null);
 const walk=(item,level)=>{
  result.push({...item,level,hasChildren:nodes.some(n=>n.parentId===item.id)});
  if(expanded.includes(item.id))for(const child of nodes.filter(n=>n.parentId===item.id))walk(child,level+1);
 };
 roots.forEach(root=>walk(root,1));return result;
}
export function initialTreeState(nodes=TREE_NODES){
 validateTree(nodes);
 return {nodes:structuredClone(nodes),expanded:["root","themes","style"],active:"root",selected:null,editing:null};
}
export function treeKey(state,key){
 const rows=visibleTreeRows(state.nodes,state.expanded),idx=rows.findIndex(n=>n.id===state.active);
 if(idx<0)return state;
 const current=rows[idx],children=childIds(state.nodes,current.id),open=state.expanded.includes(current.id);
 if(key==="ArrowDown")return {...state,active:rows[Math.min(rows.length-1,idx+1)].id};
 if(key==="ArrowUp")return {...state,active:rows[Math.max(0,idx-1)].id};
 if(key==="Home")return {...state,active:rows[0].id};
 if(key==="End")return {...state,active:rows.at(-1).id};
 if(key==="ArrowRight"){
  if(children.length&&!open)return {...state,expanded:[...state.expanded,current.id]};
  if(children.length&&open)return {...state,active:children[0]};
 }
 if(key==="ArrowLeft"){
  if(children.length&&open)return {...state,expanded:state.expanded.filter(id=>id!==current.id)};
  if(current.parentId)return {...state,active:current.parentId};
 }
 if(key==="Enter")return {...state,selected:current.id};
 if(key==="F2")return {...state,editing:current.id};
 return state;
}
export function toggleTreeBranch(state,id){
 const node=state.nodes.find(n=>n.id===id);
 if(!node||!childIds(state.nodes,id).length)return state;
 const open=state.expanded.includes(id);
 const expanded=open?state.expanded.filter(k=>k!==id):[...state.expanded,id];
 const rows=visibleTreeRows(state.nodes,expanded),visible=new Set(rows.map(n=>n.id));
 return {...state,expanded,active:visible.has(state.active)?state.active:id,
  editing:state.editing&&!visible.has(state.editing)?null:state.editing};
}
export function renameTreeNode(state,id,name){
 const value=String(name||"").trim();
 if(value.length<2||value.length>40||!state.nodes.some(n=>n.id===id))return {state,ok:false,error:"名称需为 2–40 个字符"};
 return {state:{...state,nodes:state.nodes.map(n=>n.id===id?{...n,name:value}:n),editing:null},ok:true};
}
