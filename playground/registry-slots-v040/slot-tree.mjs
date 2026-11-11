// IP-064: ORIGINAL minimal bounded slot tree. No renderer, no recursion into arbitrary components.
import {validateBlocks,updateBlockProps} from "../visual-editor-v039/block-schema.mjs";
export const SLOT_RULES=Object.freeze({
 section:{fields:{layout:["vertical","split"]},slots:{content:{accepts:["hero","feature","stack"],max:4}}},
 stack:{fields:{density:["comfortable","compact"]},slots:{items:{accepts:["feature","quote"],max:3}}},
 hero:{fields:null,slots:{}},feature:{fields:null,slots:{}},quote:{fields:null,slots:{}}
});
const clone=value=>JSON.parse(JSON.stringify(value));
const isRecord=value=>value!==null&&typeof value==="object"&&!Array.isArray(value);
const validId=value=>typeof value==="string"&&/^[a-z][a-z0-9-]{1,49}$/.test(value);
export function seedSlotDocument(){
 return {schemaVersion:"1.0",roots:["section-one","section-two"],nodes:[
  {id:"section-one",type:"section",props:{layout:"vertical"},slots:{content:["hero-one","stack-one"]}},
  {id:"hero-one",type:"hero",props:{eyebrow:"ORIGINAL MATERIALS",title:"组合前先验证规则",align:"left"},slots:{}},
  {id:"stack-one",type:"stack",props:{density:"comfortable"},slots:{items:["feature-one","quote-one"]}},
  {id:"feature-one",type:"feature",props:{title:"有界 Slot",description:"仅允许通过白名单的类型进入指定位置。",emphasis:true},slots:{}},
  {id:"quote-one",type:"quote",props:{quote:"结构安全，不等于视觉统一。",source:"原创素材"},slots:{}},
  {id:"section-two",type:"section",props:{layout:"split"},slots:{content:["feature-two"]}},
  {id:"feature-two",type:"feature",props:{title:"独立片段",description:"可安全移入另一个 Section。",emphasis:false},slots:{}}
 ]};
}
export function validateSlotDocument(doc){
 if(!isRecord(doc)||doc.schemaVersion!=="1.0"||!Array.isArray(doc.nodes)||!Array.isArray(doc.roots)||
   doc.nodes.length<1||doc.nodes.length>12||doc.roots.length<1||doc.roots.length>4)throw Error("Invalid or oversized slot document");
 if(Object.keys(doc).some(k=>!["schemaVersion","roots","nodes"].includes(k)))throw Error("Unknown document field");
 const ids=new Set();
 const byId=new Map();
 for(const n of doc.nodes){
  if(!isRecord(n)||Object.keys(n).some(k=>!["id","type","props","slots"].includes(k))||
     !validId(n.id)||ids.has(n.id)||!Object.hasOwn(SLOT_RULES,n.type))throw Error("Duplicate ID or invalid node type");
  ids.add(n.id);byId.set(n.id,n);
  const rule=SLOT_RULES[n.type];
  if(!isRecord(n.props)||!isRecord(n.slots))throw Error("Invalid node props or slots");
  if(rule.fields){
   if(Object.keys(n.props).length!==Object.keys(rule.fields).length||
      Object.entries(rule.fields).some(([field,choices])=>!choices.includes(n.props[field])))throw Error("Invalid container props");
  }else validateBlocks([{id:n.id,type:n.type,props:n.props}]);
  if(Object.keys(n.slots).length!==Object.keys(rule.slots).length ||
     Object.keys(n.slots).some(name=>!Object.hasOwn(rule.slots,name)))throw Error("Invalid or unknown slot");
  for(const [name,def] of Object.entries(rule.slots)){
   const children=n.slots[name];
   if(!Array.isArray(children)||children.length>def.max)throw Error("Slot capacity exceeded");
   for(const child of children)if(!validId(child))throw Error("Invalid child ID");
  }
 }
 const rootSet=new Set();
 for(const root of doc.roots){
  if(!ids.has(root)||rootSet.has(root)||byId.get(root).type!=="section")throw Error("Invalid root section");
  rootSet.add(root);
 }
 const parents=new Map();
 for(const n of doc.nodes)for(const [name,children] of Object.entries(n.slots)){
  const allowed=SLOT_RULES[n.type].slots[name].accepts;
  for(const child of children){
   if(!ids.has(child))throw Error("Missing child ID");
   if(!allowed.includes(byId.get(child).type))throw Error("Slot rejects child type");
   if(parents.has(child)||rootSet.has(child))throw Error("Duplicate parent or root reference");
   parents.set(child,n.id);
  }
 }
 for(const id of ids)if(!rootSet.has(id)&&!parents.has(id))throw Error("Unreachable/orphaned node");
 const visited=new Set();
 const visit=(id,depth,ancestors)=>{
  if(depth>3)throw Error("Maximum slot depth exceeded");
  if(ancestors.has(id)||visited.has(id))throw Error("Cycle or duplicated node");
  visited.add(id);
  const n=byId.get(id);
  const next=new Set([...ancestors,id]);
  for(const children of Object.values(n.slots))for(const child of children)visit(child,depth+1,next);
 };
 for(const id of doc.roots)visit(id,1,new Set());
 if(visited.size!==ids.size)throw Error("Cycle or unreachable node");
 return true;
}
export function insertIntoSlot(doc,node,parentId,slot,index=Infinity){
 validateSlotDocument(doc);
 if(!isRecord(node)||!validId(node.id)||doc.nodes.some(n=>n.id===node.id))throw Error("Duplicate or invalid new ID");
 const next=clone(doc),parent=next.nodes.find(n=>n.id===parentId);
 if(!parent||!Object.hasOwn(parent.slots,slot))throw Error("Invalid target slot");
 const arr=parent.slots[slot];
 const at=Number.isInteger(index)?Math.max(0,Math.min(index,arr.length)):arr.length;
 next.nodes.push(clone(node));
 arr.splice(at,0,node.id);
 validateSlotDocument(next);
 return next;
}
export function moveIntoSlot(doc,nodeId,parentId,slot,index=Infinity){
 validateSlotDocument(doc);
 if(!doc.nodes.some(n=>n.id===nodeId))throw Error("Unknown move node");
 const next=clone(doc);
 const parent=next.nodes.find(n=>n.id===parentId);
 if(!parent||!Object.hasOwn(parent.slots,slot))throw Error("Invalid target slot");
 if(next.roots.includes(nodeId))throw Error("Root sections cannot be nested");
 const owners=next.nodes.flatMap(n=>Object.entries(n.slots).filter(([,children])=>children.includes(nodeId)).map(([name])=>({n,name})));
 if(owners.length!==1)throw Error("Invalid node ownership");
 owners[0].n.slots[owners[0].name]=owners[0].n.slots[owners[0].name].filter(x=>x!==nodeId);
 const arr=parent.slots[slot];
 const at=Number.isInteger(index)?Math.max(0,Math.min(index,arr.length)):arr.length;
 arr.splice(at,0,nodeId);
 validateSlotDocument(next);
 if(JSON.stringify(next)===JSON.stringify(doc))return doc;
 return next;
}
export function updateSlotProps(doc,nodeId,patch){
 validateSlotDocument(doc);
 if(!isRecord(patch))throw Error("Invalid properties");
 const n=doc.nodes.find(x=>x.id===nodeId);
 if(!n)throw Error("Unknown node ID");
 let nextProps;
 if(SLOT_RULES[n.type].fields){
  const fields=SLOT_RULES[n.type].fields;
  if(Object.keys(patch).some(k=>!Object.hasOwn(fields,k)))throw Error("Unknown container prop");
  nextProps={...n.props,...patch};
 }else nextProps=updateBlockProps([{id:n.id,type:n.type,props:n.props}],n.id,patch)[0].props;
 if(JSON.stringify(nextProps)===JSON.stringify(n.props))return doc;
 const next=clone(doc);
 next.nodes.find(x=>x.id===nodeId).props=nextProps;
 validateSlotDocument(next);
 return next;
}
export function describeSlotTree(doc){
 validateSlotDocument(doc);
 const byId=new Map(doc.nodes.map(n=>[n.id,n]));
 const lines=[];
 const visit=(id,depth)=>{
  const n=byId.get(id);
  lines.push(" ".repeat((depth-1)*2)+n.type+" · "+id);
  for(const [slot,children] of Object.entries(n.slots))for(const child of children)visit(child,depth+1);
 };
 for(const root of doc.roots)visit(root,1);
 return lines;
}
