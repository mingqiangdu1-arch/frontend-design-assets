// IP-057 · Original deterministic Agent tool timeline; no network or runtime dependencies.
const STATES=new Set(["queued","running","succeeded","failed","cancelled"]);
const TERMINAL=new Set(["succeeded","failed","cancelled"]);
const transitions={queued:new Set(["running","cancelled"]),running:new Set(["running","succeeded","failed","cancelled"])};
export function createTimeline(entries=[
 {id:"research",label:"检索公开资料"},
 {id:"inspect",label:"分析候选素材"},
 {id:"handoff",label:"生成复用说明"}
]){
 if(!Array.isArray(entries)||!entries.length)throw Error("At least one tool is required");
 const ids=new Set();
 const tools=entries.map(e=>{
  if(!e||typeof e.id!=="string"||!e.id.trim()||ids.has(e.id))throw Error("Duplicate or empty tool ID");
  ids.add(e.id);
  return {id:e.id,label:String(e.label||e.id),status:"queued",seq:0,message:""};
 });
 return {tools,events:[]};
}
export function applyToolEvent(state,event){
 if(!state||!Array.isArray(state.tools))throw Error("Invalid timeline state");
 const {id,seq,status}=event||{};
 const idx=state.tools.findIndex(t=>t.id===id);
 if(idx<0)throw Error("Unknown tool ID");
 if(!STATES.has(status)||status==="queued")throw Error("Invalid event status");
 if(!Number.isSafeInteger(seq)||seq<1)throw Error("Sequence must be positive integer");
 const current=state.tools[idx];
 if(seq<=current.seq || TERMINAL.has(current.status))return state;
 if(!transitions[current.status]?.has(status))throw Error("Illegal tool status transition");
 const message=String(event.message||"").slice(0,500);
 const tool={...current,status,seq,message};
 const tools=state.tools.map((t,i)=>i===idx?tool:t);
 const events=[...state.events,{id,status,seq,message}].slice(-200);
 return {tools,events};
}
export function timelineSummary(state){
 const counts={queued:0,running:0,succeeded:0,failed:0,cancelled:0};
 for(const t of state.tools)counts[t.status]++;
 const total=state.tools.length;
 let phase="running";
 if(counts.queued===total)phase="idle";
 else if(counts.running===0&&counts.queued===0){
  if(counts.failed)phase=counts.succeeded?"partial-failure":"failed";
  else if(counts.cancelled)phase=counts.succeeded?"partial-cancelled":"cancelled";
  else phase="succeeded";
 }
 return {phase,total,done:counts.succeeded+counts.failed+counts.cancelled,counts};
}
