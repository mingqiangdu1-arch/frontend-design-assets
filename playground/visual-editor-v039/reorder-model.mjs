// IP-060 · Original block reordering model, position-independent IDs and immutable arrays.
import {validateBlocks} from "./block-schema.mjs";
export function reorderBlocks(blocks,sourceId,targetId,placement="before"){
 validateBlocks(blocks);
 if(!["before","after"].includes(placement))throw Error("Invalid drop placement");
 const source=blocks.findIndex(b=>b.id===sourceId);
 const target=blocks.findIndex(b=>b.id===targetId);
 if(source<0||target<0)throw Error("Unknown block ID");
 if(source===target)return blocks;
 const next=blocks.slice();
 const [moving]=next.splice(source,1);
 const targetAfterRemoval=next.findIndex(b=>b.id===targetId);
 next.splice(targetAfterRemoval+(placement==="after"?1:0),0,moving);
 if(next.every((x,i)=>x.id===blocks[i].id))return blocks;
 return next;
}
export function stepBlock(blocks,id,direction){
 validateBlocks(blocks);
 if(![-1,1].includes(direction))throw Error("Direction must be -1 or 1");
 const at=blocks.findIndex(x=>x.id===id);
 if(at<0)throw Error("Unknown block ID");
 const pos=at+direction;
 if(pos<0||pos>=blocks.length)return blocks;
 const next=blocks.slice();
 [next[at],next[pos]]=[next[pos],next[at]];
 return next;
}
