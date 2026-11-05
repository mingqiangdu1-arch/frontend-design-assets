// Original deterministic, theme-free interaction logic. No persistence or network calls.
export const WORLD={width:920,height:540};
export const seedNodes=[
 {id:'N-01',title:'Define the problem',kind:'Discovery',x:72,y:86,w:210,h:112},
 {id:'N-02',title:'Sketch alternatives',kind:'Design',x:355,y:79,w:226,h:112},
 {id:'N-03',title:'Test the interaction',kind:'Validation',x:644,y:230,w:223,h:112},
 {id:'N-04',title:'Review with people',kind:'Research',x:160,y:316,w:224,h:112}
];
export const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
export const clampZoom=value=>clamp(Number.isFinite(Number(value))?Number(value):1,.5,1.8);
export function zoomAt(view,point,newZoom){
 const zoom=clampZoom(newZoom);const factor=zoom/view.zoom;
 return {zoom,panX:point.x-(point.x-view.panX)*factor,panY:point.y-(point.y-view.panY)*factor};
}
export function screenToWorld(point,view){return{x:(point.x-view.panX)/view.zoom,y:(point.y-view.panY)/view.zoom};}
export function boxHits(nodes,rect){
 const left=Math.min(rect.x1,rect.x2),top=Math.min(rect.y1,rect.y2);
 const right=Math.max(rect.x1,rect.x2),bottom=Math.max(rect.y1,rect.y2);
 return nodes.filter(n=>n.x<right&&n.x+n.w>left&&n.y<bottom&&n.y+n.h>top).map(n=>n.id);
}
export function createBoard(){return{nodes:seedNodes.map(x=>({...x})),selected:['N-01'],past:[],future:[]};}
const copyNodes=nodes=>nodes.map(n=>({...n}));
export function moveNodes(nodes,selected,dx,dy){
 if(!Number.isFinite(dx)||!Number.isFinite(dy))return copyNodes(nodes);
 const set=new Set(selected);
 return nodes.map(n=>set.has(n.id)?{...n,x:clamp(Math.round(n.x+dx),0,WORLD.width-n.w),y:clamp(Math.round(n.y+dy),0,WORLD.height-n.h)}:{...n});
}
export function commitNodes(board,next){
 if(next.length!==board.nodes.length||next.some((n,i)=>n.id!==board.nodes[i].id))throw Error('Mismatched node identity');
 if(next.every((n,i)=>n.x===board.nodes[i].x&&n.y===board.nodes[i].y))return board;
 return {...board,nodes:copyNodes(next),past:[...board.past.slice(-19),copyNodes(board.nodes)],future:[]};
}
export function undoNodes(board){
 if(!board.past.length)return board;
 return {...board,nodes:copyNodes(board.past.at(-1)),past:board.past.slice(0,-1),future:[...board.future,copyNodes(board.nodes)]};
}
export function redoNodes(board){
 if(!board.future.length)return board;
 return {...board,nodes:copyNodes(board.future.at(-1)),future:board.future.slice(0,-1),past:[...board.past,copyNodes(board.nodes)]};
}
export function clampCompare(value){const n=Number(value);return Number.isFinite(n)?clamp(Math.round(n/5)*5,0,100):50;}
