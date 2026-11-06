// IP-029 / original branching narrative graph with reversible *local* path.
export const STORY=Object.freeze([
 {id:"opening",title:"从一条线索开始",copy:"你找到一个未被标注的设计片段。下一步是先观察，还是先整理？",choices:[{id:"observe",label:"观察素材",to:"evidence"},{id:"organize",label:"整理结构",to:"outline"}]},
 {id:"evidence",title:"观察得到新证据",copy:"留意到两处变化，但它们之间的关系尚不明确。",choices:[{id:"describe",label:"记录观察",to:"outcome"},{id:"verify",label:"查验另一条线索",to:"outline"}]},
 {id:"outline",title:"先画出结构",copy:"结构可以帮助查找缺失的证据，但不能替代证据本身。",choices:[{id:"connect",label:"补齐依据",to:"outcome"},{id:"review",label:"回顾关键线索",to:"evidence"}]},
 {id:"outcome",title:"完成一次推演",copy:"选择的路径改变了叙事顺序，不会向服务器提交任何动作。",choices:[]}
]);
export function validateStory(nodes,rootId){
 if(!Array.isArray(nodes)||!nodes.length)throw Error("No story nodes");
 const ids=new Set();
 for(const node of nodes){if(!node.id||ids.has(node.id)||!Array.isArray(node.choices))throw Error("Invalid story node");ids.add(node.id);}
 if(!ids.has(rootId))throw Error("Missing root");
 for(const n of nodes){
  const choiceIds=new Set();
  for(const edge of n.choices){
   if(!ids.has(edge.to)||!edge.id||choiceIds.has(edge.id)||!edge.label)throw Error("Invalid story edge");
   choiceIds.add(edge.id);
  }
 }
 return true;
}
export function initialStory(nodes=STORY,rootId="opening"){
 validateStory(nodes,rootId);return {nodes:structuredClone(nodes),path:[rootId],choicePath:[]};
}
export function currentStory(state){return state.nodes.find(x=>x.id===state.path.at(-1));}
export function storyChoose(state,choiceId,{maxDepth=20}={}){
 const current=currentStory(state);
 const choice=current.choices.find(c=>c.id===choiceId);
 if(!choice)return {state,changed:false,reason:"unknown-choice"};
 if(state.path.length>=maxDepth)return {state,changed:false,reason:"max-depth"};
 if(state.path.includes(choice.to))return {state,changed:false,reason:"cycle-protection"};
 return {state:{...state,path:[...state.path,choice.to],choicePath:[...state.choicePath,choice.id]},changed:true};
}
export function storyBack(state){
 if(state.path.length===1)return state;
 return {...state,path:state.path.slice(0,-1),choicePath:state.choicePath.slice(0,-1)};
}
export function storyJump(state,index){
 if(!Number.isInteger(index)||index<0||index>=state.path.length)return state;
 return {...state,path:state.path.slice(0,index+1),choicePath:state.choicePath.slice(0,index)};
}
export function storyOutline(state){
 return state.path.map((id,i)=>({id,index:i,title:state.nodes.find(x=>x.id===id).title,choice:i?state.choicePath[i-1]:null}));
}
