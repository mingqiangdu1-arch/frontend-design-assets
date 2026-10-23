import {styleIds,selectStyle,filterCommands,markSelected,toggleSaved,lessons,evaluateChoice,progressPercent,nextQuestionIndex} from "./model.mjs";
const $=id=>document.getElementById(id);
let currentStyle="precision-dark";
function switchStyle(id){
 const next=selectStyle(id,currentStyle);
 currentStyle=next;
 for(const style of styleIds){
  $(style).hidden=style!==next;
  const button=document.querySelector('[data-style="'+style+'"]');
  if(button){button.classList.toggle("current",style===next);button.setAttribute("aria-pressed",String(style===next));}
 }
 if($("pdCommandDialog").open)$("pdCommandDialog").close();
}
document.querySelectorAll("[data-style]").forEach(button=>button.addEventListener("click",()=>switchStyle(button.dataset.style)));

const workItems=[{title:"Feature review",meta:"OPS-120",status:"In progress"},
 {title:"Design token audit",meta:"DS-048",status:"Queued"},
 {title:"Launch checklist",meta:"OPS-119",status:"In progress"},
 {title:"Workflow metrics",meta:"ANA-027",status:"Queued"}];
const workIds=workItems.map(x=>x.title);
function selectWork(title){
 const chosen=markSelected(workIds,title);
 const item=workItems.find(w=>w.title===chosen);
 if(!item)return;
 $("pdSelected").textContent=item.title;
 $("pdSelectedStatus").textContent=item.status;
 document.querySelectorAll(".pd-item").forEach(row=>row.classList.toggle("selected",row.dataset.work===chosen));
}
document.querySelectorAll(".pd-item").forEach(row=>row.addEventListener("click",()=>selectWork(row.dataset.work)));
$("pdFocus").addEventListener("click",()=>{
 const on=$("precision-dark").classList.toggle("is-focused");
 $("pdFocus").setAttribute("aria-pressed",String(on));
 $("pdFocus").textContent=on?"◈ Exit focus":"◌ Focus mode";
});

const commandDialog=$("pdCommandDialog"),commandSearch=$("pdCommandSearch");
function drawCommands(){
 const matches=filterCommands(workItems,commandSearch.value);
 const frag=document.createDocumentFragment();
 for(const item of matches){
  const li=document.createElement("li");
  const button=document.createElement("button");
  const title=document.createElement("span");title.textContent=item.title;
  const code=document.createElement("em");code.textContent=item.meta;
  button.type="button";button.append(title,code);
  button.addEventListener("click",()=>{
   selectWork(item.title);
   commandDialog.close();
   const row=Array.from(document.querySelectorAll(".pd-item")).find(x=>x.dataset.work===item.title);
   row?.focus();
  });
  li.append(button);frag.append(li);
 }
 if(!matches.length){const li=document.createElement("li");li.textContent="No matching items";li.style.padding="14px";frag.append(li);}
 $("pdCommandResults").replaceChildren(frag);
}
function openCommand(){
 commandSearch.value="";
 drawCommands();
 commandDialog.showModal();
 requestAnimationFrame(()=>commandSearch.focus());
}
$("pdCommandButton").addEventListener("click",openCommand);
commandSearch.addEventListener("input",drawCommands);
commandSearch.addEventListener("keydown",e=>{
 if(e.key==="Enter"){
  e.preventDefault();
  $("pdCommandResults").querySelector("button")?.click();
 }
});
document.addEventListener("keydown",e=>{
 if(currentStyle!=="precision-dark")return;
 const inDialog=commandDialog.open;
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){
  e.preventDefault();
  if(inDialog)commandDialog.close();else openCommand();
 }
 if(!inDialog && (e.key==="ArrowDown"||e.key==="ArrowUp")){
  const active=document.activeElement;
  if(active?.tagName==="INPUT"||active?.tagName==="TEXTAREA")return;
  const current=document.querySelector(".pd-item.selected")?.dataset.work;
  const index=workIds.indexOf(current);
  const next=(index+(e.key==="ArrowDown"?1:-1)+workIds.length)%workIds.length;
  selectWork(workIds[next]);
  const row=Array.from(document.querySelectorAll(".pd-item")).find(x=>x.dataset.work===workIds[next]);
  row?.focus();
  e.preventDefault();
 }
});

let saved=false;
$("edSave").addEventListener("click",()=>{
 saved=toggleSaved(saved);
 $("edSave").setAttribute("aria-pressed",String(saved));
 $("edSave").textContent=saved?"★ 已收藏":"☆ 收藏文章";
 $("edSavedNote").textContent=saved?"本次演示中已收藏；刷新会重置":"仅本地演示，不永久保存";
});
$("edReadingMode").addEventListener("click",()=>{
 const on=$("editorial-warm").classList.toggle("is-reading");
 $("edReadingMode").setAttribute("aria-pressed",String(on));
 $("edReadingMode").textContent=on?"退出专注阅读 ↗":"开启专注阅读 ↗";
});

let quizIndex=0,selectedChoice=null,submitted=false,points=120;
function drawLesson(){
 const question=lessons[quizIndex];
 $("popQuestion").textContent=question.title;
 $("popProgressLabel").textContent=(quizIndex+1)+" / "+lessons.length;
 $("popProgressBar").style.width=progressPercent(quizIndex,lessons.length)+"%";
 const frag=document.createDocumentFragment();
 question.options.forEach((option,index)=>{
  const button=document.createElement("button");
  button.type="button";button.className="pop-choice";button.dataset.choice=String(index);
  button.setAttribute("aria-pressed",String(selectedChoice===index));
  button.disabled=submitted;
  if(selectedChoice===index)button.classList.add("selected");
  if(submitted&&index===question.correct)button.classList.add("correct");
  else if(submitted&&index===selectedChoice)button.classList.add("wrong");
  const idx=document.createElement("span");idx.className="pop-choice-index";idx.textContent=String.fromCharCode(65+index);
  const text=document.createElement("span");text.textContent=option;
  button.append(idx,text);
  button.addEventListener("click",()=>{
   if(submitted)return;
   selectedChoice=index;
   drawLesson();
   const active=$("popChoices").querySelector('[data-choice="'+index+'"]');
   active?.focus();
  });
  frag.append(button);
 });
 $("popChoices").replaceChildren(frag);
 $("popSubmit").hidden=submitted;
 $("popNext").hidden=!submitted;
 $("popSubmit").disabled=selectedChoice===null;
 $("popFeedback").className="pop-feedback";
 if(!submitted){
  $("popFeedback").textContent=selectedChoice===null?"选一个选项，看看即时反馈如何提升操作感。":"选择已记录，现在可以确认答案。";
 }
}
$("popSubmit").addEventListener("click",()=>{
 if(selectedChoice===null||submitted)return;
 const result=evaluateChoice(lessons[quizIndex],selectedChoice);
 if(!result.valid)return;
 submitted=true;points+=result.delta;
 $("popPoints").textContent=String(points);
 $("popFeedback").className="pop-feedback "+(result.correct?"good":"bad");
 $("popFeedback").textContent=(result.correct?"答对了！ +20 点 · ":"这个选项不太合适。")+lessons[quizIndex].detail;
 $("popNext").textContent=quizIndex===lessons.length-1?"从头开始 ↻":"继续下一题 →";
 drawLesson();
 $("popFeedback").className="pop-feedback "+(result.correct?"good":"bad");
 $("popFeedback").textContent=(result.correct?"答对了！ +20 点 · ":"这个选项不太合适。")+lessons[quizIndex].detail;
 $("popNext").focus();
});
$("popNext").addEventListener("click",()=>{
 quizIndex=nextQuestionIndex(quizIndex,lessons.length);
 selectedChoice=null;submitted=false;
 if(quizIndex===0)points=120;
 $("popPoints").textContent=String(points);
 drawLesson();$("popChoices").querySelector("button")?.focus();
});
drawLesson();
switchStyle("precision-dark");
