// IP-061 · Original flat editable-block schema. No arbitrary JSX, HTML or third-party code.
export const BLOCK_DEFS=Object.freeze({
 hero:{label:"Hero / 头图区块",fields:{
  eyebrow:{label:"眉题",kind:"text",min:1,max:40},
  title:{label:"主标题",kind:"text",min:1,max:90},
  align:{label:"文字对齐",kind:"select",options:["left","center"]}
 }},
 feature:{label:"Feature / 特性卡片",fields:{
  title:{label:"卡片标题",kind:"text",min:1,max:80},
  description:{label:"简述",kind:"text",min:0,max:180},
  emphasis:{label:"强调显示",kind:"boolean"}
 }},
 quote:{label:"Quote / 引言",fields:{
  quote:{label:"引言",kind:"text",min:1,max:180},
  source:{label:"来源",kind:"text",min:1,max:80}
 }}
});
export const seedBlocks=()=>[
 {id:"hero-01",type:"hero",props:{eyebrow:"CRAFTED INTERFACES",title:"让内容结构保持清晰",align:"left"}},
 {id:"feature-01",type:"feature",props:{title:"可复用的区块",description:"属性可编辑，移动和撤销行为可验证。",emphasis:true}},
 {id:"quote-01",type:"quote",props:{quote:"设计系统是判断和复用的语言。",source:"独立原创示例"}}
];
export function validateBlocks(blocks){
 if(!Array.isArray(blocks)||blocks.length<1||blocks.length>12)throw Error("Block list must contain 1–12 items");
 const ids=new Set();
 for(const block of blocks){
  if(!block||typeof block.id!=="string"||!/^[a-z][a-z0-9-]{1,49}$/.test(block.id)||ids.has(block.id))throw Error("Duplicate or invalid block ID");
  ids.add(block.id);
  const def=BLOCK_DEFS[block.type];
  if(!def||!block.props||typeof block.props!=="object"||Array.isArray(block.props))throw Error("Invalid block type or props");
  const fieldNames=Object.keys(def.fields);
  const found=Object.keys(block.props);
  if(found.length!==fieldNames.length||found.some(field=>!Object.hasOwn(def.fields,field)))throw Error("Unknown or missing props");
  for(const [key,spec] of Object.entries(def.fields)){
   const value=block.props[key];
   if(spec.kind==="text"&&(typeof value!=="string"||value.trim().length<spec.min||value.length>spec.max))throw Error("Invalid "+key+" text");
   if(spec.kind==="select"&&!spec.options.includes(value))throw Error("Invalid "+key+" choice");
   if(spec.kind==="boolean"&&typeof value!=="boolean")throw Error("Invalid "+key+" boolean");
  }
 }
 return true;
}
export function updateBlockProps(blocks,id,patch){
 validateBlocks(blocks);
 if(!patch||typeof patch!=="object"||Array.isArray(patch))throw Error("Invalid prop patch");
 const idx=blocks.findIndex(x=>x.id===id);
 if(idx<0)throw Error("Unknown block ID");
 const keys=Object.keys(patch);
 if(!keys.length)return blocks;
 const allowed=BLOCK_DEFS[blocks[idx].type].fields;
 if(keys.some(key=>!Object.hasOwn(allowed,key)))throw Error("Unknown prop field");
 const next=blocks.map((b,i)=>i===idx?{...b,props:{...b.props,...patch}}:b);
 validateBlocks(next);
 if(keys.every(key=>next[idx].props[key]===blocks[idx].props[key]))return blocks;
 return next;
}
export function exportBlockSchema(blocks){
 validateBlocks(blocks);
 return JSON.stringify({schemaVersion:"1.0",blocks},null,2);
}
export function importBlockSchema(json){
 if(typeof json!=="string"||json.length>16384)throw Error("Invalid or too large document");
 let parsed;
 try{parsed=JSON.parse(json);}catch{throw Error("Invalid JSON document");}
 if(!parsed||parsed.schemaVersion!=="1.0"||!Array.isArray(parsed.blocks))throw Error("Unsupported document schema");
 validateBlocks(parsed.blocks);
 return parsed.blocks.map(b=>({id:b.id,type:b.type,props:{...b.props}}));
}
