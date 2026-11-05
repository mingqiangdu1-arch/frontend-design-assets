import {FPS,DURATION,TRACKS,CHAPTERS,clamp,timecode,initialTimeline,placeClip,commitClip,undoClip,redoClip,moveDestination,scrollProgress} from "./model.mjs";
const $=id=>document.getElementById(id);
const make=(name,label)=>{const el=document.createElement(name);if(label!=null)el.textContent=label;return el;};
let timeline=initialTimeline(),selected="VIS-A",drag=null;
const rails=Object.fromEntries(TRACKS.map(t=>[t.id,document.querySelector('[data-rail="'+t.id+'"]')]));
const trackName=id=>TRACKS.find(t=>t.id===id)?.name??id;
const selectedItem=()=>timeline.clips.find(c=>c.id===selected);
function clipFocus(id){document.querySelector('[data-clip="'+id+'"]')?.focus({preventScroll:true});}
function feedback(text){$("timelineStatus").textContent=text;}
function render({focus=false}={}){
 for(const track of TRACKS){
  const fragment=document.createDocumentFragment();
  for(const clip of timeline.clips.filter(c=>c.track===track.id)){
   const button=make("button");
   button.type="button";button.className="clip";button.dataset.clip=clip.id;button.dataset.track=clip.track;
   button.style.left=(clip.start/DURATION*100)+"%";
   button.style.width=(clip.duration/DURATION*100)+"%";
   button.setAttribute("aria-pressed",String(selected===clip.id));
   button.setAttribute("aria-label",clip.label+"，"+track.name+"，开始 "+timecode(clip.start)+"，时长 "+timecode(clip.duration)+"；方向键逐帧移动，Shift+方向键十二帧，Alt+上下键切换轨道");
   const name=make("strong",clip.label),time=make("small",timecode(clip.start));
   button.append(name,time);fragment.append(button);
  }
  rails[track.id].replaceChildren(fragment);
 }
 const clip=selectedItem();
 $("selectedClip").textContent=clip.label+" · "+trackName(clip.track)+" · "+timecode(clip.start);
 $("selectedInfo").textContent=clip.detail+" / "+clip.duration+" 帧（"+(clip.duration/FPS).toFixed(2)+" 秒）/ 结束于 "+timecode(clip.start+clip.duration);
 $("undo").disabled=timeline.past.length===0;$("redo").disabled=timeline.future.length===0;
 $("frameBack").disabled=clip.start<=0;$("frameForward").disabled=clip.start+clip.duration>=DURATION;
 $("trackUp").disabled=!moveDestination(clip.track,-1);$("trackDown").disabled=!moveDestination(clip.track,1);
 $("playhead").value=String(timeline.playhead);$("playheadReadout").textContent=timecode(timeline.playhead);
 if(focus)clipFocus(selected);
}
function select(id,{focus=false}={}){
 if(!timeline.clips.some(c=>c.id===id))return;
 selected=id;render({focus});
}
function move(id,targetTrack,targetFrame,{snap=false,focus=true}={}){
 const result=commitClip(timeline,id,targetTrack,targetFrame,{snap});
 if(!result.changed){
  const reasons={"overlap":"与目标轨道的现有片段发生时间冲突","same-position":"片段位置未改变","invalid":"目标位置无效"};
  feedback("无法移动："+(reasons[result.reason]||"当前操作不可用")+"。未修改时间线。");
  if(focus)clipFocus(id);
  return false;
 }
 timeline=result.state;selected=id;render({focus});
 const snapLabel=result.snap?" · 已磁吸到"+({"clip-start":"片段起点","clip-end":"片段末端","second":"整秒刻度","playhead":"播放头"}[result.snap]):"";
 feedback(id+" 已移动到「"+trackName(result.to.track)+"」 "+timecode(result.to.start)+snapLabel+"。操作可撤销。");
 return true;
}
$("undo").addEventListener("click",()=>{if(!timeline.past.length)return;timeline=undoClip(timeline);render();feedback("已撤销最近一次片段移动。");$("undo").focus();});
$("redo").addEventListener("click",()=>{if(!timeline.future.length)return;timeline=redoClip(timeline);render();feedback("已重做最近一次片段移动。");$("redo").focus();});
$("reset").addEventListener("click",()=>{timeline=initialTimeline();selected="VIS-A";render();feedback("已恢复六段原始片段，没有发送或保存至服务器。");$("reset").focus();});
$("playhead").addEventListener("input",e=>{timeline.playhead=Number(e.target.value);$("playheadReadout").textContent=timecode(timeline.playhead);});
for(const [id,delta] of [["frameBack",-1],["frameForward",1]]){
 $(id).addEventListener("click",()=>{const c=selectedItem();move(selected,c.track,c.start+delta,{snap:false,focus:false});});
}
for(const [id,delta] of [["trackUp",-1],["trackDown",1]]){
 $(id).addEventListener("click",()=>{const c=selectedItem(),target=moveDestination(c.track,delta);if(target)move(selected,target,c.start,{snap:false,focus:false});});
}
$("trackList").addEventListener("click",e=>{
 const button=e.target.closest("[data-clip]");if(button&&!drag)select(button.dataset.clip,{focus:false});
});
$("trackList").addEventListener("keydown",e=>{
 const clipButton=e.target.closest("[data-clip]");if(!clipButton)return;
 const id=clipButton.dataset.clip,c=timeline.clips.find(x=>x.id===id);
 const delta=e.shiftKey?12:1;
 if(e.altKey&&(e.key==="ArrowUp"||e.key==="ArrowDown")){
  e.preventDefault();const target=moveDestination(c.track,e.key==="ArrowUp"?-1:1);
  if(target)move(id,target,c.start,{snap:false});
  else feedback("已经位于最外侧轨道，不能跨越边界。");
 }else if(!e.altKey&&(e.key==="ArrowLeft"||e.key==="ArrowRight")){
  e.preventDefault();move(id,c.track,c.start+(e.key==="ArrowRight"?delta:-delta),{snap:false});
 }else if(e.key==="Escape"){
  e.preventDefault();feedback("已停止编辑键盘移动，片段保持当前位置。");
 }
});
const clearDragVisual=()=>{
 for(const el of Object.values(rails))el.removeAttribute("data-hover");
 if(drag?.element){drag.element.style.transform="";drag.element.removeAttribute("data-dragging");}
};
// A captured/transformed clip can mask the lane beneath it in elementFromPoint().
const railAt=(x,y)=>{
 for(const [id,rail] of Object.entries(rails)){
  const box=rail.getBoundingClientRect();
  if(x>=box.left&&x<=box.right&&y>=box.top&&y<=box.bottom)return id;
 }
 return null;
};
$("trackList").addEventListener("pointerdown",e=>{
 const item=e.target.closest("[data-clip]");
 if(!item||e.button!==0)return;
 const c=timeline.clips.find(x=>x.id===item.dataset.clip);
 selected=c.id;render();
 // After render the clicked button is replaced, so capture on the NEW element.
 const replacement=document.querySelector('[data-clip="'+c.id+'"]');
 const box=rails[c.track].getBoundingClientRect();
 drag={id:c.id,element:replacement,pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,startFrame:c.start,track:c.track,railWidth:box.width,moved:false,preview:null};
 try{replacement.setPointerCapture(e.pointerId);}catch{drag=null;}
});
$("trackList").addEventListener("pointermove",e=>{
 const d=drag;if(!d||d.pointerId!==e.pointerId)return;
 const dx=e.clientX-d.startX,dy=e.clientY-d.startY;
 if(Math.hypot(dx,dy)>7)d.moved=true;
 if(!d.moved)return;
 const track=railAt(e.clientX,e.clientY)||d.track;
 const frame=d.startFrame+Math.round(dx/d.railWidth*DURATION);
 const snap=$("snapEnabled").checked&&!e.altKey;
 const suggestion=placeClip(timeline.clips,d.id,track,frame,{snap,playhead:timeline.playhead});
 d.preview={track,frame,snap};
 for(const [key,rail] of Object.entries(rails))rail.toggleAttribute("data-hover",key===track);
 d.element.dataset.dragging="true";
 d.element.style.transform="translate("+dx+"px,"+dy+"px)";
 $("selectedInfo").textContent=suggestion.changed?"预览："+trackName(suggestion.to.track)+" "+timecode(suggestion.to.start)+(suggestion.snap?" · 磁吸 "+suggestion.snap:""):"预览无法放置（与已有片段冲突或位置未变）";
});
$("trackList").addEventListener("pointerup",e=>{
 const d=drag;if(!d||d.pointerId!==e.pointerId)return;
 const moved=d.moved,target=railAt(e.clientX,e.clientY)||d.preview?.track||d.track;
 const frame=d.startFrame+Math.round((e.clientX-d.startX)/d.railWidth*DURATION);
 const snap=$("snapEnabled").checked&&!e.altKey;
 clearDragVisual();drag=null;
 if(moved)move(d.id,target,frame,{snap});
 else{render({focus:true});feedback(d.id+" 已选中，可通过方向键逐帧移动。");}
});
$("trackList").addEventListener("pointercancel",e=>{
 if(!drag||e.pointerId!==drag.pointerId)return;
 const id=drag.id;clearDragVisual();drag=null;render({focus:true});feedback(id+" 拖动已取消，没有修改位置。");
});
$("trackList").addEventListener("lostpointercapture",e=>{
 if(!drag||e.pointerId!==drag.pointerId)return;
 const id=drag.id;clearDragVisual();drag=null;render();feedback(id+" 拖动已中断，原位置已保留。");
});
render();

// The scroll story always exposes complete semantic article content; motion is optional.
const chapterNodes=CHAPTERS.map(c=>document.querySelector('[data-chapter="'+c.id+'"]'));
let storyIndex=0,scrollQueued=false;
const reduced=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function measureStory(){
 const vh=window.innerHeight,anchor=vh*(window.innerWidth<=640?.68:.51);
 let best=0,bestDist=Infinity;
 for(let i=0;i<chapterNodes.length;i++){
  const box=chapterNodes[i].getBoundingClientRect(),center=box.top+box.height*.5;
  const distance=Math.abs(center-anchor);
  if(distance<bestDist){best=i;bestDist=distance;}
 }
 const first=chapterNodes[0].getBoundingClientRect(),last=chapterNodes.at(-1).getBoundingClientRect();
 const start=window.scrollY+first.top-vh*.32,end=window.scrollY+last.bottom-vh*.70;
 const p=scrollProgress(window.scrollY,start,end);
 const scene=CHAPTERS[best];storyIndex=best;
 $("storyStage").dataset.scene=scene.id;
 $("storyStage").style.setProperty("--progress",String(p));
 $("storyActive").textContent=scene.title;
 $("storyNumber").textContent=scene.number+" / "+scene.eyebrow;
 $("storyPercent").textContent=String(Math.round(p*100)).padStart(2,"0")+"%";
 $("storyMeter").setAttribute("aria-valuenow",String(Math.round(p*100)));
 $("storyMeterFill").style.width=Math.round(p*100)+"%";
 chapterNodes.forEach((el,i)=>{
  el.dataset.active=String(i===best);
  if(i===best)el.setAttribute("aria-current","step");else el.removeAttribute("aria-current");
 });
 $("storyPrevious").disabled=best===0;$("storyNext").disabled=best===CHAPTERS.length-1;
 $("storyStage").dataset.motion=reduced()?"reduced":"progressive";
}
function scheduleStory(){
 if(scrollQueued)return;
 scrollQueued=true;
 requestAnimationFrame(()=>{scrollQueued=false;measureStory();});
}
window.addEventListener("scroll",scheduleStory,{passive:true});
window.addEventListener("resize",scheduleStory);
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",scheduleStory);
function jumpTo(index){
 const next=clamp(index,0,CHAPTERS.length-1),chapter=CHAPTERS[next];
 chapterNodes[next].scrollIntoView({behavior:reduced()?"auto":"smooth",block:"start"});
 $("storyStatus").textContent="已导航到第 "+chapter.number+" 章「"+chapter.title+"」，章节内容在页面中完整可读。";
 storyIndex=next;
 // Do not claim scene progress has completed before the scrolling position changes.
 scheduleStory();
}
$("storyPrevious").addEventListener("click",()=>jumpTo(storyIndex-1));
$("storyNext").addEventListener("click",()=>jumpTo(storyIndex+1));
measureStory();
