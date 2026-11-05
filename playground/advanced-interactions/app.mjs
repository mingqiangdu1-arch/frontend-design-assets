import {WORLD,createBoard,moveNodes,commitNodes,undoNodes,redoNodes,clampZoom,zoomAt,screenToWorld,boxHits,clampCompare} from './model.mjs';

const $=id=>document.getElementById(id);
const boardEl=$('spatialViewport'),worldEl=$('spatialWorld'),status=$('boardStatus');
let board=createBoard(),view={zoom:1,panX:25,panY:25},mode='select',session=null,spaceDown=false;
const nodeLabels=new Map(board.nodes.map(n=>[n.id,n.title]));
const announce=text=>{status.textContent=text;};
function renderBoard(transient=null){
 const nodes=transient||board.nodes;
 worldEl.style.transform=`translate(${view.panX}px,${view.panY}px) scale(${view.zoom})`;
 worldEl.replaceChildren(...nodes.map((n,i)=>{
  const btn=document.createElement('button');btn.type='button';btn.className='world-node';btn.dataset.node=n.id;
  btn.style.left=n.x+'px';btn.style.top=n.y+'px';btn.style.width=n.w+'px';btn.style.height=n.h+'px';
  btn.setAttribute('aria-pressed',String(board.selected.includes(n.id)));
  btn.setAttribute('aria-label',n.title+'，节点 '+(i+1)+'；方向键移动；Shift 点击切换多选');
  btn.innerHTML='<span></span><strong></strong><small></small>';
  btn.children[0].textContent=n.id+' / '+n.kind.toUpperCase();
  btn.children[1].textContent=n.title;
  btn.children[2].textContent='LOCAL · DRAG OR USE ARROWS';
  return btn;
 }));
 $('zoomValue').textContent=Math.round(view.zoom*100)+'%';
 $('undoMove').disabled=board.past.length===0;$('redoMove').disabled=board.future.length===0;
 const picker=$('nodePicker');const previous=picker.value;
 if(picker.options.length!==board.nodes.length){
  picker.replaceChildren(...board.nodes.map(n=>{const o=document.createElement('option');o.value=n.id;o.textContent=n.title;return o;}));
 }
 picker.value=board.selected[0]||previous||board.nodes[0].id;
}
function refreshSelection(text){renderBoard();announce(text||('已选择 '+(board.selected.map(id=>nodeLabels.get(id)).join('、')||'零个节点'))+'。');}
function localPoint(e){const r=boardEl.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
function fitView(){const w=boardEl.clientWidth,h=boardEl.clientHeight;const z=clampZoom(Math.min((w-36)/WORLD.width,(h-38)/WORLD.height));
 view={zoom:z,panX:WORLD.width*z>w-24?12:(w-WORLD.width*z)/2,panY:(h-WORLD.height*z)/2};renderBoard();announce(WORLD.width*z>w-24?'画布已适配当前视角；可平移查看右侧节点。':'画布已适配可用空间。');}
function setZoom(delta){const p={x:boardEl.clientWidth/2,y:boardEl.clientHeight/2};view=zoomAt(view,p,view.zoom+delta);renderBoard();announce('画布缩放为 '+Math.round(view.zoom*100)+'%。');}
function setMode(next){mode=next;for(const id of ['selectMode','panMode'])$(id).setAttribute('aria-pressed',String(id===(next==='pan'?'panMode':'selectMode')));
 announce(next==='pan'?'平移模式：拖动画布平移，可切回选择模式。':'选择模式：拖动空白处框选，拖动节点移动。');}
$('selectMode').addEventListener('click',()=>setMode('select'));
$('panMode').addEventListener('click',()=>setMode('pan'));
$('zoomIn').addEventListener('click',()=>setZoom(.2));$('zoomOut').addEventListener('click',()=>setZoom(-.2));$('fitView').addEventListener('click',fitView);
$('undoMove').addEventListener('click',()=>{board=undoNodes(board);refreshSelection('已撤销最近一次节点移动');});
$('redoMove').addEventListener('click',()=>{board=redoNodes(board);refreshSelection('已重做最近一次节点移动');});
$('nodePicker').addEventListener('change',e=>{board={...board,selected:[e.target.value]};refreshSelection();});
const offsets={up:[0,-10],down:[0,10],left:[-10,0],right:[10,0]};
function nudge(dx,dy){if(!board.selected.length)return;
 const next=moveNodes(board.nodes,board.selected,dx,dy);board=commitNodes(board,next);
 refreshSelection('已移动 '+board.selected.length+' 个节点，支持撤销');}
document.querySelectorAll('[data-nudge]').forEach(b=>b.addEventListener('click',()=>nudge(...offsets[b.dataset.nudge])));
boardEl.addEventListener('wheel',e=>{
 // Alt+Wheel is opt-in; ordinary wheel keeps native document scrolling.
 if(!e.altKey)return;e.preventDefault();
 const p=localPoint(e);view=zoomAt(view,p,view.zoom+(e.deltaY<0?.1:-.1));renderBoard();
},{passive:false});
boardEl.addEventListener('pointerdown',e=>{
 if(e.button!==0||session)return;
 const p=localPoint(e),target=e.target.closest('[data-node]');
 if(mode==='pan'||spaceDown){session={id:e.pointerId,kind:'pan',start:p,view:{...view},moved:false};}
 else if(target){
  const id=target.dataset.node;
  if(e.shiftKey){const selected=new Set(board.selected);selected.has(id)?selected.delete(id):selected.add(id);board={...board,selected:[...selected]};refreshSelection();return;}
  if(!board.selected.includes(id))board={...board,selected:[id]};
  session={id:e.pointerId,kind:'drag',start:p,original:board.nodes,moved:false,nodeId:id};renderBoard();
 }else{session={id:e.pointerId,kind:'marquee',start:p,moved:false};board={...board,selected:[]};renderBoard();}
 boardEl.setPointerCapture(e.pointerId);
});
function overlayRect(a,b){const m=$('marquee');m.hidden=false;m.style.left=Math.min(a.x,b.x)+'px';m.style.top=Math.min(a.y,b.y)+'px';m.style.width=Math.abs(a.x-b.x)+'px';m.style.height=Math.abs(a.y-b.y)+'px';}
boardEl.addEventListener('pointermove',e=>{
 if(!session||session.id!==e.pointerId)return;
 const p=localPoint(e),dx=p.x-session.start.x,dy=p.y-session.start.y;
 if(Math.hypot(dx,dy)>3)session.moved=true;
 if(session.kind==='pan'){view={...session.view,panX:session.view.panX+dx,panY:session.view.panY+dy};renderBoard();}
 else if(session.kind==='drag'){renderBoard(moveNodes(session.original,board.selected,dx/view.zoom,dy/view.zoom));}
 else if(session.kind==='marquee'){overlayRect(session.start,p);}
});
function stopPointer(e,cancel){
 if(!session||session.id!==e.pointerId)return;
 const s=session;session=null;
 if(boardEl.hasPointerCapture(e.pointerId))boardEl.releasePointerCapture(e.pointerId);
 $('marquee').hidden=true;
 if(cancel){if(s.kind==='pan')view=s.view;renderBoard();announce('已取消当前手势，不保存更改。');return;}
 const p=localPoint(e),dx=p.x-s.start.x,dy=p.y-s.start.y;
 if(s.kind==='drag'&&s.moved){board=commitNodes(board,moveNodes(s.original,board.selected,dx/view.zoom,dy/view.zoom));refreshSelection('已移动选中节点；可撤销。');}
 else if(s.kind==='marquee'){
  if(s.moved){const a=screenToWorld(s.start,view),b=screenToWorld(p,view);board={...board,selected:boxHits(board.nodes,{x1:a.x,y1:a.y,x2:b.x,y2:b.y})};}
  refreshSelection();
 }else{renderBoard();}
}
boardEl.addEventListener('pointerup',e=>stopPointer(e,false));
boardEl.addEventListener('pointercancel',e=>stopPointer(e,true));
boardEl.addEventListener('lostpointercapture',e=>{if(session&&session.id===e.pointerId)stopPointer(e,true);});
boardEl.addEventListener('click',e=>{
 const btn=e.target.closest('[data-node]');if(btn&&e.detail===0){board={...board,selected:[btn.dataset.node]};refreshSelection();}
});
function isTypingTarget(t){return !!t.closest('input,textarea,select,[contenteditable="true"]');}
document.addEventListener('keydown',e=>{
 if(e.code==='Space'&&!isTypingTarget(e.target))spaceDown=true;
 const focused=e.target.closest?.('[data-node]');
 if(focused&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){
  e.preventDefault();const mapping={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
  const [x,y]=mapping[e.key];const id=focused.dataset.node;
  if(!board.selected.includes(id))board={...board,selected:[id]};
  nudge(x*(e.shiftKey?30:10),y*(e.shiftKey?30:10));
  worldEl.querySelector(`[data-node="${id}"]`)?.focus();
 }
 const inBoard=boardEl.contains(e.target)||e.target===boardEl;
 if(inBoard&&(e.ctrlKey||e.metaKey)&&!e.altKey&&e.key.toLowerCase()==='z'){
  e.preventDefault();board=e.shiftKey?redoNodes(board):undoNodes(board);refreshSelection(e.shiftKey?'已重做节点移动':'已撤销节点移动');
 }
});
document.addEventListener('keyup',e=>{if(e.code==='Space')spaceDown=false;});
window.addEventListener('blur',()=>{spaceDown=false;});
// Do not assume all devices support keyboard/pointer hover. These controls remain explicit.
fitView();
// Preserve a usable first-node view when a desktop window is narrowed or a device rotates.
window.addEventListener('resize',fitView);

const orbitTarget=$('orbitTarget'),orbitMenu=$('orbitMenu'),orbitTrigger=$('orbitTrigger');
const menuItems=[...orbitMenu.querySelectorAll('[role="menuitem"]')];
let openedBy=null,activeIndex=0,orbitState={marked:false,pinned:false,copies:0};
function closeMenu(restore=true){orbitMenu.hidden=true;orbitTarget.setAttribute('aria-expanded','false');orbitTrigger.setAttribute('aria-expanded','false');
 if(restore)openedBy?.focus();openedBy=null;}
function focusMenu(i){activeIndex=(i+menuItems.length)%menuItems.length;menuItems[activeIndex].focus();}
function openMenu(invoker){openedBy=invoker;orbitMenu.hidden=false;orbitTarget.setAttribute('aria-expanded','true');orbitTrigger.setAttribute('aria-expanded','true');focusMenu(0);}
function syncOrbit(message){$('markedValue').textContent=orbitState.marked?'已标记':'未标记';$('pinnedValue').textContent=orbitState.pinned?'已置顶':'未置顶';$('copyValue').textContent=String(orbitState.copies);orbitTarget.classList.toggle('is-marked',orbitState.marked);
 $('orbitStatus').textContent=message;}
function useOrbit(action){
 if(action==='mark')orbitState.marked=!orbitState.marked;
 else if(action==='pin')orbitState.pinned=!orbitState.pinned;
 else if(action==='duplicate')orbitState.copies++;
 else if(action==='reset')orbitState={marked:false,pinned:false,copies:0};
 syncOrbit(({mark:'标记已切换',pin:'置顶已切换',duplicate:'本地模拟副本数量 +1',reset:'本地状态已重置'})[action]+'；没有网络提交。');closeMenu(true);
}
orbitTarget.addEventListener('contextmenu',e=>{e.preventDefault();openMenu(orbitTarget);});
orbitTarget.addEventListener('keydown',e=>{if(e.shiftKey&&e.key==='F10'){e.preventDefault();openMenu(orbitTarget);}});
orbitTrigger.addEventListener('click',()=>orbitMenu.hidden?openMenu(orbitTrigger):closeMenu());
orbitTarget.addEventListener('click',()=>orbitMenu.hidden?openMenu(orbitTarget):closeMenu());
menuItems.forEach((b,i)=>b.addEventListener('click',()=>useOrbit(b.dataset.orbit)));
orbitMenu.addEventListener('keydown',e=>{
 if(e.key==='Escape'){e.preventDefault();closeMenu(true);}
 if(['ArrowDown','ArrowRight'].includes(e.key)){e.preventDefault();focusMenu(activeIndex+1);}
 if(['ArrowUp','ArrowLeft'].includes(e.key)){e.preventDefault();focusMenu(activeIndex-1);}
 if(e.key==='Home'){e.preventDefault();focusMenu(0);}
 if(e.key==='End'){e.preventDefault();focusMenu(menuItems.length-1);}
 if(e.key==='Tab'){closeMenu(false);}
});
document.addEventListener('pointerdown',e=>{if(!orbitMenu.hidden&&!orbitMenu.contains(e.target)&&e.target!==orbitTrigger&&e.target!==orbitTarget)closeMenu(false);});

const compare=$('compareRange'),stage=$('compareStage');
function renderCompare(){const value=clampCompare(compare.value);compare.value=String(value);stage.style.setProperty('--percent',value+'%');$('compareValue').textContent='优化后 '+value+'%';}
compare.addEventListener('input',renderCompare);
document.querySelectorAll('[data-compare]').forEach(button=>button.addEventListener('click',()=>{compare.value=button.dataset.compare;renderCompare();compare.focus();}));
renderCompare();
