// IP-062 · Original local transaction + selection history. Selection alone is not undoable.
import {seedBlocks,validateBlocks,updateBlockProps} from "./block-schema.mjs";
import {reorderBlocks,stepBlock} from "./reorder-model.mjs";
const clone=blocks=>blocks.map(b=>({id:b.id,type:b.type,props:{...b.props}}));
const snapshot=state=>({blocks:clone(state.blocks),selectedId:state.selectedId});
const LIMIT=30;
export function createEditor(blocks=seedBlocks()){
 validateBlocks(blocks);
 const copy=clone(blocks);
 return {blocks:copy,selectedId:copy[0].id,past:[],future:[]};
}
export function selectBlock(state,id){
 if(!state.blocks.some(b=>b.id===id))throw Error("Cannot select unknown block");
 return state.selectedId===id?state:{...state,selectedId:id};
}
export function commitBlocks(state,blocks){
 validateBlocks(blocks);
 if(blocks.length!==state.blocks.length||blocks.some((x,i)=>!state.blocks.some(y=>y.id===x.id&&y.type===x.type)))throw Error("Cannot mutate document identity in this specimen");
 if(JSON.stringify(blocks)===JSON.stringify(state.blocks))return state;
 return {...state,blocks:clone(blocks),past:[...state.past.slice(-(LIMIT-1)),snapshot(state)],future:[]};
}
export function moveSelected(state,direction){
 return commitBlocks(state,stepBlock(state.blocks,state.selectedId,direction));
}
export function dropBlock(state,sourceId,targetId,placement="before"){
 const selected=selectBlock(state,sourceId);
 return commitBlocks(selected,reorderBlocks(selected.blocks,sourceId,targetId,placement));
}
export function editSelectedProps(state,patch){
 if(!state.selectedId)throw Error("No block selected");
 return commitBlocks(state,updateBlockProps(state.blocks,state.selectedId,patch));
}
export function undoEditor(state){
 if(!state.past.length)return state;
 const prev=state.past.at(-1);
 return {...state,...snapshot(prev),past:state.past.slice(0,-1),future:[...state.future,snapshot(state)]};
}
export function redoEditor(state){
 if(!state.future.length)return state;
 const next=state.future.at(-1);
 return {...state,...snapshot(next),future:state.future.slice(0,-1),past:[...state.past.slice(-(LIMIT-1)),snapshot(state)]};
}
export function historySummary(state){
 return {canUndo:state.past.length>0,canRedo:state.future.length>0,undoDepth:state.past.length,redoDepth:state.future.length,selectedId:state.selectedId};
}
