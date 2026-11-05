import {LANES,CARDS,initialTransferState,commitTransfer,undoTransfer,redoTransfer,locateCard,moveLane,orderShowcase} from "./model.mjs";
const $=id=>document.getElementById(id);
const node=(tag,text,className)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;};
let transferState=initialTransferState();
let keyboardPick=null;
let pointerDrag=null;
const announce=(message)=>{$("boardStatus").textContent=message;};
const focusHandle=(id)=>document.querySelector('[data-handle="'+id+'"]')?.focus({preventScroll:true});
const lanes=Object.fromEntries(LANES.map(l=>[l.id,document.querySelector('[data-lane="'+l.id+'"]')]));
function clearTargets(){for(const el of Object.values(lanes))el.removeAttribute("data-target");}
function updateTarget(id){
 clearTargets();
 if(id&&lanes[id])lanes[id].dataset.target="true";
}
function laneName(id){return LANES.find(x=>x.id===id)?.title||id;}
function renderBoard(focusId){
 for(const lane of LANES){
  const list=document.querySelector('[data-cards="'+lane.id+'"]');
  const frag=document.createDocumentFragment();
  for(const id of transferState.board[lane.id]){
   const card=CARDS.find(c=>c.id===id);
   const li=node("li",undefined,"transfer-card");li.dataset.card=id;
   const hd=node("div",undefined,"card-hd");
   const code=node("span",card.id,"card-id"),tag=node("span",card.category.toUpperCase(),"card-tag");
   hd.append(code,tag);
   li.append(hd,node("strong",card.label));
   const actions=node("div",undefined,"card-actions");
   const from=locateCard(transferState.board,id).lane;
   const handle=node("button","⋮⋮ 移动手柄","drag-handle");
   handle.type="button";handle.dataset.handle=id;
   handle.setAttribute("aria-label","移动 "+card.label+"；空格拾取，方向键选列，回车放下，Escape 取消");
   handle.setAttribute("aria-pressed",String(keyboardPick?.id===id));
   handle.setAttribute("aria-keyshortcuts","Space ArrowLeft ArrowRight Enter Escape");
   handle.setAttribute("aria-describedby","boardStatus");
   actions.append(handle);
   for(const delta of [-1,1]){
    const target=moveLane(from,delta);
    const b=node("button",delta===-1?"←":"→");
    b.type="button";b.dataset.shift=String(delta);b.dataset.item=id;
    b.setAttribute("aria-label",delta===-1?"向左移动 "+card.label:"向右移动 "+card.label);
    b.disabled=!target;
    actions.append(b);
   }
   li.append(actions);frag.append(li);
  }
  list.replaceChildren(frag);
  document.querySelector('[data-count="'+lane.id+'"]').textContent=String(transferState.board[lane.id].length);
 }
 $("boardUndo").disabled=transferState.past.length===0;
 $("boardRedo").disabled=transferState.future.length===0;
 if(focusId)focusHandle(focusId);
 if(keyboardPick)updateTarget(keyboardPick.target);
 else clearTargets();
}
function commit(id,target,restore=true){
 const move=commitTransfer(transferState,id,target);
 keyboardPick=null;
 pointerDrag=null;
 if(!move.changed){renderBoard(restore?id:undefined);announce("未移动：请选择其他列。");return false;}
 transferState=move.state;
 renderBoard(restore?id:undefined);
 announce(id+" 已从「"+laneName(move.from)+"」移动至「"+laneName(move.to)+"」。可撤销。");
 return true;
}
$("board").addEventListener("click",event=>{
 const btn=event.target.closest("[data-shift]");if(!btn||btn.disabled)return;
 const location=locateCard(transferState.board,btn.dataset.item);
 const target=moveLane(location?.lane,Number(btn.dataset.shift));
 if(target)commit(btn.dataset.item,target);
});
$("boardUndo").addEventListener("click",()=>{
 const old=transferState;if(!old.past.length)return;
 transferState=undoTransfer(old);keyboardPick=null;pointerDrag=null;renderBoard();announce("已撤销最近一次跨列移动。");
 $("boardUndo").focus();
});
$("boardRedo").addEventListener("click",()=>{
 const old=transferState;if(!old.future.length)return;
 transferState=redoTransfer(old);keyboardPick=null;pointerDrag=null;renderBoard();announce("已重做最近一次跨列移动。");
 $("boardRedo").focus();
});
$("boardReset").addEventListener("click",()=>{
 transferState=initialTransferState();keyboardPick=null;pointerDrag=null;renderBoard();
 announce("已恢复五张原始示例卡片；没有保存到服务器。");
 $("boardReset").focus();
});
$("board").addEventListener("focusin",event=>{
 if(!keyboardPick)return;
 const handle=event.target.closest?.("[data-handle]");
 if(handle?.dataset.handle===keyboardPick.id)return;
 const canceled=keyboardPick.id;
 keyboardPick=null;
 clearTargets();
 document.querySelector('[data-handle="'+canceled+'"]')?.setAttribute("aria-pressed","false");
 announce(canceled+" 已取消拾取；焦点已移到其他操作，位置未改变。");
});
$("board").addEventListener("keydown",event=>{
 const handle=event.target.closest("[data-handle]");if(!handle)return;
 const id=handle.dataset.handle;
 if(event.code==="Space"||event.key===" "){
  event.preventDefault();
  if(!keyboardPick){
   const loc=locateCard(transferState.board,id);
   keyboardPick={id,target:loc.lane};
   handle.setAttribute("aria-pressed","true");
   updateTarget(loc.lane);
   announce(id+" 已拾取，当前目标「"+laneName(loc.lane)+"」。使用左右箭头选择列，Enter 放下，Escape 取消。");
  }else if(keyboardPick.id===id){commit(id,keyboardPick.target);}
  return;
 }
 if(event.key==="Escape"&&keyboardPick){
  event.preventDefault();const current=keyboardPick.id;keyboardPick=null;clearTargets();
  document.querySelector('[data-handle="'+current+'"]')?.setAttribute("aria-pressed","false");
  announce(current+" 已取消拾取，位置未改变。");return;
 }
 if(keyboardPick?.id===id&&["ArrowLeft","ArrowRight"].includes(event.key)){
  event.preventDefault();
  const next=moveLane(keyboardPick.target,event.key==="ArrowRight"?1:-1);
  if(next){keyboardPick.target=next;updateTarget(next);}
  announce(id+" 拾取中，目标列「"+laneName(keyboardPick.target)+"」。按 Enter 放下。");return;
 }
 if(event.key==="Enter"&&keyboardPick?.id===id){
  event.preventDefault();commit(id,keyboardPick.target);return;
 }
});
function hoveredLane(x,y){
 const element=document.elementFromPoint(x,y);
 return element?.closest?.("[data-lane]")?.dataset.lane||null;
}
$("board").addEventListener("pointerdown",event=>{
 const handle=event.target.closest("[data-handle]");
 if(!handle||event.button!==0||keyboardPick)return;
 const id=handle.dataset.handle,from=locateCard(transferState.board,id)?.lane;
 if(!from)return;
 pointerDrag={id,from,clientX:event.clientX,clientY:event.clientY,moved:false,target:from,pointerId:event.pointerId,handle};
 handle.setPointerCapture?.(event.pointerId);
});
$("board").addEventListener("pointermove",event=>{
 const drag=pointerDrag;if(!drag||drag.pointerId!==event.pointerId)return;
 if(Math.hypot(event.clientX-drag.clientX,event.clientY-drag.clientY)>7)drag.moved=true;
 if(!drag.moved)return;
 const target=hoveredLane(event.clientX,event.clientY);
 if(target){drag.target=target;updateTarget(target);}
});
$("board").addEventListener("pointerup",event=>{
 const drag=pointerDrag;if(!drag||drag.pointerId!==event.pointerId)return;
 const target=hoveredLane(event.clientX,event.clientY)||drag.target;
 pointerDrag=null;clearTargets();
 if(drag.moved&&target&&target!==drag.from)commit(drag.id,target);
 else if(drag.moved)announce(drag.id+" 未移动：需要放到另一列。");
});
$("board").addEventListener("pointercancel",event=>{
 if(!pointerDrag||event.pointerId!==pointerDrag.pointerId)return;
 const id=pointerDrag.id;pointerDrag=null;clearTargets();
 announce(id+" 的拖动已取消，没有提交。");
});
$("board").addEventListener("lostpointercapture",()=>{
 // Pointer cancellation and release do not mutate board state; pointerup is the sole commit path.
 if(pointerDrag&&pointerDrag.handle?.hasPointerCapture?.(pointerDrag.pointerId)===false){
  pointerDrag=null;clearTargets();
 }
});
renderBoard();

let layout="grid",sort="priority";
const collection=$("collection");
const elements=Object.fromEntries([...collection.querySelectorAll("[data-id]")].map(el=>[el.dataset.id,el]));
let activeAnimations=[];
function applyReflow(animate=true){
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 for(const anim of activeAnimations)anim.cancel();
 activeAnimations=[];
 const before=animate&&!reduced?new Map(Object.entries(elements).map(([id,el])=>[id,el.getBoundingClientRect()])):new Map();
 collection.dataset.layout=layout;
 const activeId=document.activeElement?.dataset?.id;
 const frag=document.createDocumentFragment();
 for(const item of orderShowcase(sort))frag.append(elements[item.id]);
 collection.append(frag);
 // Moving DOM nodes can remove focus in some engines.
 if(activeId&&elements[activeId])elements[activeId].focus({preventScroll:true});
 const canFlip=animate&&!reduced&&typeof Element.prototype.animate==="function";
 collection.dataset.motion=reduced?"reduced":canFlip?"flip":"instant";
 if(canFlip){
  for(const [id,el] of Object.entries(elements)){
   const prior=before.get(id),next=el.getBoundingClientRect();
   const dx=prior.left-next.left,dy=prior.top-next.top;
   if(Math.abs(dx)+Math.abs(dy)<1)continue;
   const animation=el.animate([{transform:"translate("+dx+"px,"+dy+"px)"},{transform:"translate(0,0)"}],{duration:320,easing:"cubic-bezier(.2,.8,.2,1)"});
   activeAnimations.push(animation);
  }
 }
 for(const button of document.querySelectorAll("[data-layout]"))button.setAttribute("aria-pressed",String(button.dataset.layout===layout));
 for(const button of document.querySelectorAll("[data-sort]"))button.setAttribute("aria-pressed",String(button.dataset.sort===sort));
 $("reflowStatus").textContent=(sort==="priority"?"优先级":"名称")+"排序 · "+(layout==="grid"?"卡片网格":"纵向列表")+"。四个对象保持原始 DOM 节点，"+(reduced?"已遵循减少动效设置。":"状态已更新。");
}
for(const button of document.querySelectorAll("[data-layout]"))button.addEventListener("click",()=>{if(layout===button.dataset.layout)return;layout=button.dataset.layout;applyReflow();});
for(const button of document.querySelectorAll("[data-sort]"))button.addEventListener("click",()=>{if(sort===button.dataset.sort)return;sort=button.dataset.sort;applyReflow();});
matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change",()=>applyReflow(false));
applyReflow(false);
