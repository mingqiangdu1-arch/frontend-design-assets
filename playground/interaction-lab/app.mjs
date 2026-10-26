import {records,archiveRecord,undoArchive,moveItem,wizardSteps,validateWizard,nextWizardStep,previousWizardStep,clampSplit} from "./model.mjs";
const $=id=>document.getElementById(id);
let items=records.map(x=>({...x})),undoSnapshot=null;
let order=["需求澄清","视觉探索","交互验证","交付验收"];
const wizard={step:0,name:"",styleId:""};
function node(tag,text,className){
 const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;
}
function renderRecords(){
 const fragment=document.createDocumentFragment();
 for(const item of items){
  const li=node("li");
  li.append(node("span",item.title),node("small",item.id));
  const btn=node("button","归档");btn.type="button";btn.dataset.archive=item.id;
  btn.setAttribute("aria-label","归档 "+item.title);
  li.append(btn);fragment.append(li);
 }
 if(!items.length)fragment.append(node("li","没有待处理记录。"));
 $("records").replaceChildren(fragment);
}
function showArchive(message){
 $("archiveFeedback").hidden=false;$("archiveText").textContent=message;
 $("undo").hidden=!undoSnapshot;
}
$("records").addEventListener("click",e=>{
 const btn=e.target.closest("[data-archive]");if(!btn)return;
 const id=btn.dataset.archive;
 const result=archiveRecord(items,id);if(!result.snapshot)return;
 items=result.items;undoSnapshot=result.snapshot;renderRecords();
 showArchive("已归档 "+undoSnapshot.record.title+" · 可撤销最近一次操作");
});
$("undo").addEventListener("click",()=>{
 if(!undoSnapshot)return;
 const restored=undoSnapshot.record.title;items=undoArchive(items,undoSnapshot);
 undoSnapshot=null;renderRecords();showArchive("已恢复 "+restored);
});
$("dismiss").addEventListener("click",()=>{$("archiveFeedback").hidden=true;undoSnapshot=null;});
function renderWizard(){
 const frag=document.createDocumentFragment();
 wizardSteps.forEach((s,i)=>{const li=node("li");if(i===wizard.step)li.setAttribute("aria-current","step");
 const index=node("b",String(i+1));li.append(index,node("span",s));frag.append(li);});
 $("steps").replaceChildren(frag);
 const body=$("wizardBody");body.replaceChildren();
 if(wizard.step===0){
  const label=node("label","项目名称");label.htmlFor="projectName";
  const input=node("input");input.id="projectName";input.value=wizard.name;input.placeholder="例如：新品体验研究";input.autocomplete="off";
  input.addEventListener("input",e=>{wizard.name=e.target.value;$("wizardError").hidden=true;});
  body.append(label,input);
 }else if(wizard.step===1){
  const label=node("label","视觉方向");label.htmlFor="projectStyle";
  const select=node("select");select.id="projectStyle";
  [["","请选择"],["refined-light-saas","精致浅色 SaaS"],["precision-dark","精密深色"],["editorial-warm","阅读编辑"],["playful-pop","鲜活轻娱乐"],["neo-brutalist","Bold Grid"]].forEach(([v,text])=>{
   const opt=node("option",text);opt.value=v;opt.selected=v===wizard.styleId;select.append(opt);
  });
  select.addEventListener("change",e=>{wizard.styleId=e.target.value;$("wizardError").hidden=true;});
  body.append(label,select);
 }else{
  body.append(node("strong","请核对草稿摘要"));
  body.append(node("p","项目："+wizard.name+"。视觉："+wizard.styleId+"。本演示不会真正创建项目。"));
 }
 $("wizardError").hidden=true;
 $("prev").disabled=wizard.step===0;
 $("next").textContent=wizard.step===2?"完成演示":"下一步";
}
$("next").addEventListener("click",()=>{
 if(wizard.step===2){$("wizardBody").replaceChildren(node("strong","已完成演示（无数据提交）"));$("next").disabled=true;$("prev").disabled=false;return;}
 const result=nextWizardStep(wizard.step,wizard);
 if(result.error){$("wizardError").textContent=result.error;$("wizardError").hidden=false;return;}
 wizard.step=result.step;renderWizard();
});
$("prev").addEventListener("click",()=>{
 wizard.step=previousWizardStep(wizard.step);$("next").disabled=false;renderWizard();
});
function renderOrder(focusId=null,direction=""){
 const frag=document.createDocumentFragment();
 order.forEach((label,index)=>{
  const li=node("li");const marker=node("span",String(index+1).padStart(2,"0"),"number");
  const title=node("strong",label);li.append(marker,title);
  for(const [dir,icon,aria] of [[-1,"↑","上移"],[1,"↓","下移"]]){
   const btn=node("button",icon);btn.type="button";btn.dataset.move=String(dir);btn.dataset.item=label;
   btn.setAttribute("aria-label",aria+" "+label);
   btn.disabled=index+dir<0||index+dir>=order.length;
   li.append(btn);
  }frag.append(li);
 });
 $("orderList").replaceChildren(frag);
 if(focusId){
  // After movement, prefer the same directional control; if it became disabled, focus the other.
  const buttons=Array.from(document.querySelectorAll("[data-item]"));
  const target=buttons.find(b=>b.dataset.item===focusId&&b.dataset.move===direction&&!b.disabled)
    ||buttons.find(b=>b.dataset.item===focusId&&!b.disabled);
  target?.focus();
 }
}
$("orderList").addEventListener("click",e=>{
 const btn=e.target.closest("[data-move]");if(!btn||btn.disabled)return;
 const item=btn.dataset.item,direction=Number(btn.dataset.move);
 const before=order.indexOf(item),next=moveItem(order,item,direction);
 if(next.join("|")===order.join("|"))return;
 order=next;const after=order.indexOf(item);
 renderOrder(item,String(direction));
 $("orderStatus").textContent=item+" 已移至第 "+(after+1)+" 位（原第 "+(before+1)+" 位）";
});
function updateSplit(){
 const value=clampSplit($("splitRange").value);
 $("splitRange").value=String(value);
 $("splitValue").value=value+"%";$("splitValue").textContent=value+"%";
 $("splitPreview").style.setProperty("--left",value+"%");
}
$("splitRange").addEventListener("input",updateSplit);
$("resetSplit").addEventListener("click",()=>{$("splitRange").value="50";updateSplit();$("splitRange").focus();});
renderRecords();renderWizard();renderOrder();updateSplit();
