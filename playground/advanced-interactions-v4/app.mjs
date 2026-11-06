import {TREE_NODES,initialTreeState,visibleTreeRows,treeKey,toggleTreeBranch,renameTreeNode} from "./tree-model.mjs";
import {ANCHORS,NOTES,projectAnnotations,findAnnotation,placeAnnotationOverlay} from "./annotation-model.mjs";
import {STORY,initialStory,currentStory,storyChoose,storyBack,storyJump,storyOutline} from "./story-model.mjs";
import {DIAL_CONFIG,dialSnap,valueAngle,dialKey,dialDrag} from "./dial-model.mjs";
const $=id=>document.getElementById(id);
const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};

// IP-025: row-first roving tabindex; active and selected are separate.
let tree=initialTreeState();
function treeFeedback(s){$("treeStatus").textContent=s;}
function focusTree(id=tree.active){document.querySelector('[data-tree-id="'+id+'"]')?.focus({preventScroll:true});}
function renderTree({focus=false}={}){
 const visible=visibleTreeRows(tree.nodes,tree.expanded),container=$("treeRows");
 const frag=document.createDocumentFragment();
 for(const item of visible){
  const row=node("div",undefined,"tree-row");row.dataset.treeId=item.id;
  row.setAttribute("role","row");row.setAttribute("aria-level",String(item.level));
  row.setAttribute("aria-selected",String(tree.selected===item.id));
  if(item.hasChildren)row.setAttribute("aria-expanded",String(tree.expanded.includes(item.id)));
  row.dataset.active=String(tree.active===item.id);
  row.tabIndex=tree.active===item.id?0:-1;
  const primary=node("div",undefined,"tree-name-cell");primary.setAttribute("role","gridcell");
  primary.style.paddingLeft=(8+(item.level-1)*18)+"px";
  const toggle=node("button",item.hasChildren?(tree.expanded.includes(item.id)?"▾":"▸"):"·","tree-branch");
  toggle.type="button";toggle.disabled=!item.hasChildren;toggle.tabIndex=-1;
  toggle.setAttribute("aria-label",(tree.expanded.includes(item.id)?"折叠 ":"展开 ")+item.name);
  toggle.addEventListener("click",event=>{
   event.stopPropagation();tree={...tree,active:item.id};
   tree=toggleTreeBranch(tree,item.id);
   renderTree({focus:true});treeFeedback("已切换 "+item.name+" 的可见子级。");
  });
  primary.append(toggle,node("span",item.name,"tree-label"));
  const secondary=node("div",item.type,"tree-type-cell");secondary.setAttribute("role","gridcell");
  row.append(primary,secondary);
  row.addEventListener("click",event=>{
   if(event.target.closest("button"))return;
   tree={...tree,active:item.id,selected:item.id};renderTree({focus:true});
   treeFeedback("已选中 "+item.name+"。");
  });
  row.addEventListener("keydown",event=>{
   if(!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End","Enter","F2"].includes(event.key))return;
   event.preventDefault();
   tree={...tree,active:item.id};
   tree=treeKey(tree,event.key);
   if(event.key==="F2"){beginRename();return;}
   renderTree({focus:true});
   treeFeedback(event.key==="Enter"?"已选中 "+item.name+"。":"当前焦点："+tree.active);
  });
  frag.append(row);
 }
 container.replaceChildren(frag);
 const active=tree.nodes.find(n=>n.id===tree.active),selected=tree.nodes.find(n=>n.id===tree.selected);
 $("treeActive").textContent=active?.name||"无";
 $("treeSelected").textContent=selected?.name||"尚未选择";
 $("treeCount").textContent=String(visible.length)+" / "+tree.nodes.length;
 $("treeExpand").disabled=!active||!tree.nodes.some(n=>n.parentId===active.id)||tree.expanded.includes(active.id);
 $("treeCollapse").disabled=!active||!tree.expanded.includes(active.id);
 if(focus)focusTree();
}
function beginRename(){
 const active=tree.nodes.find(n=>n.id===tree.active);
 if(!active)return;
 tree={...tree,editing:active.id};
 $("treeRenameForm").hidden=false;$("treeRenameInput").value=active.name;
 $("treeRenameInput").focus();$("treeRenameInput").select();
 treeFeedback("正在编辑 "+active.name+"；Enter 确认，Escape 放弃。");
}
function cancelRename(){
 tree={...tree,editing:null};$("treeRenameForm").hidden=true;renderTree({focus:true});treeFeedback("已取消改名，未保存任何修改。");
}
$("treeRenameForm").addEventListener("submit",e=>{
 e.preventDefault();if(!tree.editing)return;
 const r=renameTreeNode(tree,tree.editing,$("treeRenameInput").value);
 if(!r.ok){treeFeedback(r.error);return;}
 tree=r.state;$("treeRenameForm").hidden=true;renderTree({focus:true});treeFeedback("名称已在本地副本中更新。");
});
$("treeRenameInput").addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();cancelRename();}});
$("treeCancel").addEventListener("click",cancelRename);
$("treeEdit").addEventListener("click",beginRename);
$("treeExpand").addEventListener("click",()=>{
 if(!tree.expanded.includes(tree.active)){tree=toggleTreeBranch(tree,tree.active);renderTree({focus:true});treeFeedback("已展开当前节点。");}
});
$("treeCollapse").addEventListener("click",()=>{
 if(tree.expanded.includes(tree.active)){tree=toggleTreeBranch(tree,tree.active);renderTree({focus:true});treeFeedback("已折叠当前节点。");}
});
$("treeReset").addEventListener("click",()=>{tree=initialTreeState(TREE_NODES);$("treeRenameForm").hidden=true;renderTree({focus:true});treeFeedback("已恢复原始树形数据。");});
renderTree();

// IP-027: semantic anchors, an always-visible index and collision-aware overlay.
const annotations=projectAnnotations(NOTES,ANCHORS);
let activeNote=null,originNoteButton=null;
const overlay=$("annotationOverlay");
function positionAnnotation(anchor){
 if(!anchor)return;
 const box=anchor.getBoundingClientRect();
 const safe={left:14,top:14,right:window.innerWidth-14,bottom:window.innerHeight-14};
 const result=placeAnnotationOverlay(box,safe,{width:Math.min(310,window.innerWidth-28),height:overlay.offsetHeight||165});
 overlay.style.left=result.left+"px";overlay.style.top=result.top+"px";
 overlay.dataset.side=result.side;
}
function closeAnnotation({focus=true}={}){
 overlay.hidden=true;activeNote=null;
 document.querySelectorAll("[data-note-pin],[data-note-index]").forEach(b=>b.setAttribute("aria-pressed","false"));
 if(focus&&originNoteButton?.isConnected)originNoteButton.focus({preventScroll:true});
 originNoteButton=null;
 $("annotationStatus").textContent="已关闭标注；焦点返回打开它的控件。";
}
function openAnnotation(id,origin){
 const found=findAnnotation(annotations,id);if(!found)return;
 activeNote=id;originNoteButton=origin;
 $("annotationHeading").textContent="标注 "+found.label+" · "+found.author;
 $("annotationContent").textContent=found.content; // Untrusted annotations never become HTML.
 $("annotationProvenance").textContent="来源："+found.anchorId+" · Revision "+found.revision+" · "+(found.orphan?"孤立标注 / 原锚点缺失":found.status);
 overlay.hidden=false;
 document.querySelectorAll("[data-note-pin],[data-note-index]").forEach(button=>
  button.setAttribute("aria-pressed",String(button.dataset.notePin===id||button.dataset.noteIndex===id)));
 const semantic=document.getElementById(found.anchorId);
 if(semantic)semantic.scrollIntoView({block:"nearest",behavior:"instant"});
 const point=origin||semantic||$("noteItems");
 positionAnnotation(point);
 $("annotationClose").focus({preventScroll:true});
 $("annotationStatus").textContent=found.orphan?"标注 "+found.label+" 对应锚点已缺失，可从索引恢复。":"已打开 "+found.label+" 对应来源标注。";
}
const index=$("noteItems");
for(const item of annotations){
 const button=node("button",undefined,"note-item");button.type="button";button.dataset.noteIndex=item.id;
 button.setAttribute("aria-pressed","false");
 button.append(node("strong","标注 "+item.label+" · "+item.author),
  node("small","Revision "+item.revision+" · "+(item.orphan?"原锚点缺失":item.anchorId)));
 if(item.orphan)button.append(node("span"," · 孤立标注","orphan"));
 button.addEventListener("click",()=>openAnnotation(item.id,button));index.append(button);
}
$("noteCount").textContent=annotations.length+" NOTES";
document.querySelectorAll("[data-note-pin]").forEach(button=>{
 button.setAttribute("aria-pressed","false");
 button.addEventListener("click",()=>openAnnotation(button.dataset.notePin,button));
});
$("annotationClose").addEventListener("click",()=>closeAnnotation());
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!overlay.hidden){e.preventDefault();closeAnnotation();}});
window.addEventListener("resize",()=>{
 if(!activeNote||overlay.hidden)return;
 const found=findAnnotation(annotations,activeNote);
 const target=document.getElementById(found.anchorId)||originNoteButton;positionAnnotation(target);
});
window.addEventListener("scroll",()=>{
 if(!activeNote||overlay.hidden)return;
 const found=findAnnotation(annotations,activeNote);
 positionAnnotation(document.getElementById(found.anchorId)||originNoteButton);
},{passive:true});

// IP-029: a reversible *local* narrative choice path.
let story=initialStory(STORY);
function renderStory({focus=false}={}){
 const current=currentStory(story),outline=storyOutline(story);
 $("storyStep").textContent="NODE "+String(outline.length).padStart(2,"0");
 $("storyHeading").textContent=current.title;$("storyCopy").textContent=current.copy;
 const fragment=document.createDocumentFragment();
 for(const edge of current.choices){
  const button=node("button",edge.label);button.type="button";button.dataset.choice=edge.id;
  button.addEventListener("click",()=>{
   const result=storyChoose(story,edge.id);
   if(result.changed){story=result.state;renderStory({focus:true});$("storyStatus").textContent="记录本地选择："+edge.label+"。";}
   else $("storyStatus").textContent="无法进入循环分支："+result.reason+"。";
  });fragment.append(button);
 }
 if(!current.choices.length)fragment.append(node("p","当前分支已到达终点，可返回其他选项。"));
 $("storyChoices").replaceChildren(fragment);
 const trail=document.createDocumentFragment();
 outline.forEach(item=>{
  const li=node("li");if(item.index===outline.length-1)li.setAttribute("aria-current","step");
  const b=node("button",String(item.index+1)+". "+item.title);b.type="button";
  b.dataset.storyJump=String(item.index);
  b.addEventListener("click",()=>{story=storyJump(story,item.index);renderStory({focus:true});$("storyStatus").textContent="已返回路径第 "+(item.index+1)+" 步，后续分支已从本地路径移除。";});
  li.append(b);trail.append(li);
 });
 $("storyTrail").replaceChildren(trail);
 $("storyDepth").textContent=outline.length+" STEPS";
 $("storyBack").disabled=outline.length===1;
 if(focus)$("storyHeading").focus({preventScroll:true});
}
$("storyBack").addEventListener("click",()=>{story=storyBack(story);renderStory({focus:true});$("storyStatus").textContent="回退一步；之后的本地选择已移除。";});
$("storyReset").addEventListener("click",()=>{story=initialStory(STORY);renderStory({focus:true});$("storyStatus").textContent="回到起点；所有临时分支记录已清除。";});
renderStory();

// IP-030: native input parity, pointer drag with cancellation restore, no side effects.
let value=40,drag=null;
function setDial(v,source="control"){
 try{value=dialSnap(v,DIAL_CONFIG);}catch{return;}
 $("dialRange").value=String(value);$("dialNumber").value=String(value);
 $("dialRangeOutput").textContent=value+" %";$("dialCenter").textContent=String(value);
 $("dialIndicator").style.transform="rotate("+valueAngle(value,DIAL_CONFIG)+"deg)";
 $("dialKnob").setAttribute("aria-valuenow",String(value));
 $("dialKnob").setAttribute("aria-valuetext",value+" %");
 $("dialStatus").textContent="当前为 "+value+"% · 来源："+source+"；数值与旋钮显示一致。";
}
$("dialRange").addEventListener("input",e=>setDial(Number(e.target.value),"原生滑块"));
$("dialNumber").addEventListener("change",e=>{
 const num=e.target.value===""?value:Number(e.target.value);
 setDial(num,"数字输入（按步长对齐）");
});
$("dialMinus").addEventListener("click",()=>setDial(dialKey(value,"ArrowLeft"),"快捷按钮"));
$("dialPlus").addEventListener("click",()=>setDial(dialKey(value,"ArrowRight"),"快捷按钮"));
$("dialReset").addEventListener("click",()=>setDial(40,"重置"));
const knob=$("dialKnob");
knob.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&drag){
  setDial(drag.initial,"取消拖动");drag=null;e.preventDefault();return;
 }
 if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))return;
 e.preventDefault();setDial(dialKey(value,e.key,{shift:e.shiftKey}),"键盘");
});
knob.addEventListener("pointerdown",e=>{
 if(e.button!==0)return;
 drag={id:e.pointerId,startY:e.clientY,initial:value};
 knob.setPointerCapture(e.pointerId);knob.focus();e.preventDefault();
});
knob.addEventListener("pointermove",e=>{
 if(!drag||drag.id!==e.pointerId)return;
 setDial(dialDrag(drag.initial,drag.startY-e.clientY),"指针拖动（松开确认）");
});
knob.addEventListener("pointerup",e=>{
 if(!drag||drag.id!==e.pointerId)return;
 drag=null;if(knob.hasPointerCapture(e.pointerId))knob.releasePointerCapture(e.pointerId);
 $("dialStatus").textContent="已确认本地数值 "+value+"%；没有向服务器写入。";
});
knob.addEventListener("pointercancel",e=>{
 if(!drag||drag.id!==e.pointerId)return;
 const prev=drag.initial;drag=null;setDial(prev,"指针取消（已回滚）");
});
knob.addEventListener("lostpointercapture",()=>{
 if(!drag)return;
 const prev=drag.initial;drag=null;setDial(prev,"捕获意外失效（已回滚）");
});
setDial(40,"初始值");
