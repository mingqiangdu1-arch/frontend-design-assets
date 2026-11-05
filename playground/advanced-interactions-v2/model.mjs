// Original, deterministic and theme-independent interaction state. No network or persistence.
export const LANES=[{id:"inbox",title:"收集"},{id:"progress",title:"制作中"},{id:"ready",title:"待验收"}];
export const CARDS=[
 {id:"ST-01",label:"故事路径图",category:"Narrative",priority:2},
 {id:"ST-02",label:"图层状态",category:"System",priority:1},
 {id:"ST-03",label:"手势反馈",category:"Interaction",priority:3},
 {id:"ST-04",label:"动效草案",category:"Motion",priority:4},
 {id:"ST-05",label:"交付说明",category:"Documentation",priority:5}
];
export const START_BOARD={inbox:["ST-01","ST-02"],progress:["ST-03","ST-04"],ready:["ST-05"]};
const clone=(board)=>Object.fromEntries(LANES.map(l=>[l.id,[...(board[l.id]||[])]]));
export const laneIndex=(id)=>LANES.findIndex(l=>l.id===id);
export function locateCard(board,id){
 for(const lane of LANES){const pos=(board[lane.id]||[]).indexOf(id);if(pos!==-1)return {lane:lane.id,index:pos};}
 return null;
}
export function transfer(board,id,target,index=Infinity){
 const current=locateCard(board,id);
 if(!current||laneIndex(target)===-1)return {board,changed:false};
 if(current.lane===target)return {board,changed:false};
 const next=clone(board);
 next[current.lane].splice(current.index,1);
 const position=Math.max(0,Math.min(next[target].length,Number.isFinite(index)?Math.floor(index):next[target].length));
 next[target].splice(position,0,id);
 return {board:next,changed:true,from:current.lane,to:target};
}
export function initialTransferState(){return {board:clone(START_BOARD),past:[],future:[]};}
export function commitTransfer(state,id,target){
 const result=transfer(state.board,id,target);
 if(!result.changed)return {state,changed:false};
 return {state:{board:result.board,past:[...state.past.slice(-19),clone(state.board)],future:[]},changed:true,from:result.from,to:result.to};
}
export function undoTransfer(state){
 if(!state.past.length)return state;
 return {board:clone(state.past.at(-1)),past:state.past.slice(0,-1),future:[clone(state.board),...state.future].slice(0,20)};
}
export function redoTransfer(state){
 if(!state.future.length)return state;
 return {board:clone(state.future[0]),past:[...state.past.slice(-19),clone(state.board)],future:state.future.slice(1)};
}
export function moveLane(id,delta){
 const i=laneIndex(id);return i===-1?null:LANES[i+delta]?.id||null;
}
export const SHOWCASE=[
 {id:"PRISM",label:"Prism Studies",type:"Composition",priority:3,sub:"Geometry in motion"},
 {id:"VECTOR",label:"Vector Process",type:"Workflow",priority:1,sub:"Precision first"},
 {id:"TIDAL",label:"Tidal Volume",type:"Motion",priority:4,sub:"Responsive rhythm"},
 {id:"FORM",label:"Form Atlas",type:"Workflow",priority:2,sub:"Adaptive systems"}
];
export function orderShowcase(by="priority"){
 if(!["priority","name"].includes(by))throw Error("Unknown sort mode: "+by);
 return [...SHOWCASE].sort(by==="priority"?(a,b)=>a.priority-b.priority:(a,b)=>a.label.localeCompare(b.label,"en"));
}
