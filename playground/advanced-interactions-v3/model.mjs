// Original frame-based timeline + narrative model. No media files, AI, network or persistence.
export const FPS=24;
export const DURATION=288; // twelve seconds at 24 fps
export const SNAP_THRESHOLD=5; // frames
export const TRACKS=[
 {id:"visual",name:"画面",accent:"#a3c6b5"},
 {id:"captions",name:"字幕",accent:"#e4bf87"},
 {id:"audio",name:"声场",accent:"#c5b8df"}
];
export const SEED_CLIPS=[
 {id:"VIS-A",track:"visual",start:0,duration:84,label:"第一幕",detail:"Opening scene"},
 {id:"VIS-B",track:"visual",start:132,duration:96,label:"结构显现",detail:"Reveal"},
 {id:"CAP-A",track:"captions",start:48,duration:60,label:"叙事标题",detail:"Copy block"},
 {id:"CAP-B",track:"captions",start:240,duration:48,label:"结尾字幕",detail:"Closing copy"},
 {id:"AUD-A",track:"audio",start:0,duration:144,label:"环境音",detail:"Atmosphere"},
 {id:"AUD-B",track:"audio",start:180,duration:72,label:"转场音效",detail:"Accent"}
];
export const CHAPTERS=[
 {id:"origin",number:"01",title:"一个信号",eyebrow:"SIGNAL",copy:"从原始输入中找到值得被看见的变化。",shape:"dot"},
 {id:"structure",number:"02",title:"建立结构",eyebrow:"STRUCTURE",copy:"关系逐渐清晰，信息开始组成可理解的路径。",shape:"grid"},
 {id:"rhythm",number:"03",title:"出现节奏",eyebrow:"RHYTHM",copy:"连续的运动让转场成为叙事，而非装饰。",shape:"wave"},
 {id:"resolve",number:"04",title:"抵达结论",eyebrow:"RESOLVE",copy:"内容始终可读，动画只是解释它如何到达这里。",shape:"orbit"}
];
const finite=(v)=>Number.isFinite(v);
export const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export const timecode=(frames)=>{
 const f=clamp(Math.round(frames),0,DURATION),seconds=Math.floor(f/FPS),sub=f%FPS;
 return "00:"+String(seconds).padStart(2,"0")+":"+String(sub).padStart(2,"0");
};
export function overlaps(a,b){
 return a.track===b.track&&a.start<b.start+b.duration&&b.start<a.start+a.duration;
}
export function validateClips(clips){
 const ids=new Set();
 for(const clip of clips){
  if(ids.has(clip.id)||!TRACKS.some(t=>t.id===clip.track)||!finite(clip.start)||!finite(clip.duration)||!Number.isInteger(clip.start)||!Number.isInteger(clip.duration)||clip.start<0||clip.duration<=0||clip.start+clip.duration>DURATION)return false;
  ids.add(clip.id);
 }
 for(let i=0;i<clips.length;i++)for(let k=i+1;k<clips.length;k++)if(overlaps(clips[i],clips[k]))return false;
 return true;
}
export function initialTimeline(){
 return {clips:SEED_CLIPS.map(c=>({...c})),past:[],future:[],playhead:120};
}
export function trackIndex(id){return TRACKS.findIndex(t=>t.id===id);}
export function moveDestination(track,delta){const i=trackIndex(track);return i<0?null:TRACKS[i+delta]?.id??null;}
function candidates(clips,id,track,start,playhead,enableSnap){
 const base=Math.round(start);
 const others=clips.filter(c=>c.id!==id&&c.track===track);
 const points=[];
 if(enableSnap){
  for(const c of others){points.push({at:c.start,kind:"clip-start",priority:0},{at:c.start+c.duration,kind:"clip-end",priority:0});}
  if(Number.isFinite(playhead))points.push({at:playhead,kind:"playhead",priority:1});
  for(let f=0;f<=DURATION;f+=FPS)points.push({at:f,kind:"second",priority:2});
 }
 const options=points.filter(x=>Math.abs(x.at-base)<=SNAP_THRESHOLD).sort((a,b)=>Math.abs(a.at-base)-Math.abs(b.at-base)||a.priority-b.priority).map(x=>({start:x.at,snap:x.kind}));
 options.push({start:base,snap:null});
 return options;
}
export function placeClip(clips,id,targetTrack,targetFrame,{snap=true,playhead=120}={}){
 const source=clips.find(c=>c.id===id);
 if(!source||trackIndex(targetTrack)<0||!finite(targetFrame))return {clips,changed:false,reason:"invalid"};
 const requested=clamp(Math.round(targetFrame),0,DURATION-source.duration);
 for(const option of candidates(clips,id,targetTrack,requested,playhead,snap)){
  if(option.start<0||option.start+source.duration>DURATION)continue;
  const next=clips.map(c=>c.id===id?{...c,track:targetTrack,start:option.start}:c);
  if(!validateClips(next))continue;
  if(source.track===targetTrack&&source.start===option.start)return {clips,changed:false,reason:"same-position"};
  return {clips:next,changed:true,from:{track:source.track,start:source.start},to:{track:targetTrack,start:option.start},snap:option.snap};
 }
 return {clips,changed:false,reason:"overlap"};
}
export function commitClip(state,id,track,frame,options={}){
 const moved=placeClip(state.clips,id,track,frame,{playhead:state.playhead,...options});
 if(!moved.changed)return {state,changed:false,reason:moved.reason};
 return {state:{...state,clips:moved.clips,past:[...state.past.slice(-19),state.clips.map(c=>({...c}))],future:[]},changed:true,...moved};
}
export function undoClip(state){
 if(!state.past.length)return state;
 return {...state,clips:state.past.at(-1).map(x=>({...x})),past:state.past.slice(0,-1),future:[state.clips.map(x=>({...x})),...state.future].slice(0,20)};
}
export function redoClip(state){
 if(!state.future.length)return state;
 return {...state,clips:state.future[0].map(x=>({...x})),past:[...state.past.slice(-19),state.clips.map(x=>({...x}))],future:state.future.slice(1)};
}
export function scrollProgress(y,start,end){
 if(![y,start,end].every(finite)||end<=start)return 0;
 return clamp((y-start)/(end-start),0,1);
}
export function chapterAt(progress){
 return CHAPTERS[Math.min(CHAPTERS.length-1,Math.floor(clamp(progress,0,1)*CHAPTERS.length))];
}
