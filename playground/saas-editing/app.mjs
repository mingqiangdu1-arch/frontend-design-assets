import {savedExample,filterData,clone,hasUnsaved,validateField,validateDraft,fieldOrder,saveDraft,rule,group,filterWithTree,activeRuleCount,validateFilterTree,newDefaultFilter} from "./model.mjs";

const $=id=>document.getElementById(id);
const state={
 saved:clone(savedExample),draft:clone(savedExample),inlineEditing:false,saving:false,
 view:"form",pendingAction:null,filterDraft:newDefaultFilter(),
 appliedFilter:group("applied","and",[]),filterChanged:true,sequence:2
};
let toastTimer=null;
const targetInput={slug:"slug",email:"email",description:"description"};
const isDirty=()=>hasUnsaved(state.saved,state.draft)||
 (state.inlineEditing&&$("inlineInput").value!==state.draft.name);
function flash(text){
 $("toastText").textContent=text;$("toast").hidden=false;
 if(toastTimer)clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>{$("toast").hidden=true;},3500);
}
$("closeToast").addEventListener("click",()=>{$("toast").hidden=true;if(toastTimer)clearTimeout(toastTimer);});
function updateStatus(message){
 if(message)$("saveStatus").textContent=message;
 else $("saveStatus").textContent=state.saving?"正在保存（模拟）":isDirty()?"有未保存的修改":"所有修改已保存";
 $("draftBadge").textContent=isDirty()?"草稿未保存":"已保存";
 $("draftBadge").classList.toggle("dirty",isDirty());
 $("saveAll").disabled=state.saving;
 $("discardChanges").disabled=state.saving;
}
function clearError(field){
 const error=$(field==="name"?"inlineError":field+"Error");
 error.hidden=true;
 const input=$(field==="name"?"inlineInput":field);
 input.removeAttribute("aria-invalid");
}
function showError(field,message){
 const error=$(field==="name"?"inlineError":field+"Error");
 error.textContent=message;error.hidden=false;
 $(field==="name"?"inlineInput":field).setAttribute("aria-invalid","true");
}
function syncForm(){
 for(const f of ["slug","email","description"])$(f).value=state.draft[f];
 $("notifications").checked=state.draft.notifications;
 $("inlineDisplay").textContent=state.draft.name;
 $("inlineInput").value=state.draft.name;
 $("charCount").textContent=String(state.draft.description.length)+" / 240";
 for(const f of fieldOrder)clearError(f);
 $("saveError").hidden=true;
 updateStatus();
}
function setInlineEditing(open){
 state.inlineEditing=open;
 $("inlineRead").hidden=open;$("inlineEdit").hidden=!open;
 if(open){$("inlineInput").value=state.draft.name;$("inlineInput").focus();$("inlineInput").select();}
 else clearError("name");
 updateStatus();
}
function confirmInline(){
 if(!state.inlineEditing)return true;
 const value=$("inlineInput").value;
 const error=validateField("name",value);
 if(error){showError("name",error);$("inlineInput").focus();return false;}
 state.draft.name=value.trim();$("inlineDisplay").textContent=state.draft.name;
 setInlineEditing(false);updateStatus();return true;
}
function cancelInline(){if(!state.inlineEditing)return;setInlineEditing(false);updateStatus();}
$("editName").addEventListener("click",()=>setInlineEditing(true));
$("confirmInline").addEventListener("click",confirmInline);
$("cancelInline").addEventListener("click",cancelInline);
$("inlineInput").addEventListener("input",()=>{clearError("name");updateStatus();});
$("inlineInput").addEventListener("keydown",e=>{
 if(e.key==="Escape"){e.preventDefault();cancelInline();$("editName").focus();}
 if(e.key==="Enter"){e.preventDefault();if(confirmInline())$("editName").focus();}
});
for(const field of ["slug","email","description"]){
 const input=$(field);
 input.addEventListener("input",()=>{
  state.draft[field]=input.value;
  clearError(field);
  if(field==="description")$("charCount").textContent=String(input.value.length)+" / 240";
  $("saveError").hidden=true;
  updateStatus();
 });
 input.addEventListener("blur",()=>{
  const error=validateField(field,input.value);
  if(error)showError(field,error);else clearError(field);
 });
}
$("notifications").addEventListener("change",e=>{state.draft.notifications=e.target.checked;updateStatus();});

async function submitForm(){
 if(state.saving||state.view!=="form")return;
 if(!confirmInline())return;
 const errors=validateDraft(state.draft);
 for(const f of fieldOrder){if(errors[f])showError(f,errors[f]);else clearError(f);}
 if(Object.keys(errors).length){
  const first=fieldOrder.find(f=>errors[f]);
  if(first==="name"){setInlineEditing(true);showError("name",errors.name);}
  else $(first).focus();
  updateStatus("请修正输入错误");
  return;
 }
 if(!isDirty()){flash("没有需要保存的修改");return;}
 state.saving=true;$("saveError").hidden=true;
 updateStatus("正在保存（模拟）");
 const fail=$("failSave").checked;
 await new Promise(resolve=>setTimeout(resolve,420));
 const result=saveDraft(state.saved,state.draft,{simulateFailure:fail});
 $("failSave").checked=false;
 state.saving=false;
 if(!result.ok){
  $("saveErrorText").textContent=result.message||"请检查表单";
  $("saveError").hidden=false;
  updateStatus("保存失败 · 修改仍在草稿中");
  return;
 }
 state.saved=clone(result.saved);state.draft=clone(result.saved);
 syncForm();
 flash("设置已保存（本地模拟）");
}
$("settingsForm").addEventListener("submit",e=>{e.preventDefault();void submitForm();});
$("retrySave").addEventListener("click",()=>{void submitForm();});
function resetForm(){
 state.draft=clone(state.saved);cancelInline();syncForm();
}
function requestGuard(action){
 if(state.saving)return;
 if(!isDirty()){action();return;}
 state.pendingAction=action;
 $("discardDialog").showModal();
}
$("discardChanges").addEventListener("click",()=>requestGuard(()=>{resetForm();flash("草稿已恢复到上次保存状态");}));
$("continueEditing").addEventListener("click",()=>{state.pendingAction=null;$("discardDialog").close();});
$("confirmDiscard").addEventListener("click",()=>{
 const pending=state.pendingAction;
 state.pendingAction=null;
 $("discardDialog").close();
 resetForm();pending?.();
});
$("discardDialog").addEventListener("close",()=>{state.pendingAction=null;});
window.addEventListener("beforeunload",e=>{
 if(isDirty()){
  e.preventDefault();
  e.returnValue="";
 }
});
function changeView(next){
 if(!["form","filters"].includes(next)||next===state.view)return;
 const go=()=>{
  state.view=next;
  $("editView").hidden=next!=="form";
  $("filterView").hidden=next!=="filters";
  document.querySelectorAll("[data-view]").forEach(btn=>{
   const active=btn.dataset.view===next;
   btn.classList.toggle("selected",active);
   if(active)btn.setAttribute("aria-current","page");
   else btn.removeAttribute("aria-current");
  });
  const activeTab=document.querySelector('[data-view="'+next+'"]');
  activeTab?.focus();
 };
 if(state.view==="form")requestGuard(go);
 else go();
}
document.querySelectorAll("[data-view]").forEach(btn=>btn.addEventListener("click",()=>changeView(btn.dataset.view)));

const fields=[["status","状态"],["owner","负责人"],["name","名称"]];
const operators=[["equals","等于"],["notEquals","不等于"],["contains","包含"]];
const choices={status:["进行中","已完成","待确认"],owner:["产品团队","技术团队","设计团队","运营团队"]};
const mk=(tag,className="",text="")=>{
 const node=document.createElement(tag);
 if(className)node.className=className;
 if(text)node.textContent=text;
 return node;
};
function selectMenu(options,current,change,aria){
 const sel=mk("select");sel.setAttribute("aria-label",aria);
 for(const [value,label] of options){
  const o=mk("option","",label);o.value=value;o.selected=value===current;sel.append(o);
 }
 sel.addEventListener("change",e=>change(e.target.value));return sel;
}
function notifyFilterEdited(){
 state.filterChanged=true;
 $("filterDraftState").textContent="条件草稿未应用";
 $("filterDraftState").classList.add("dirty");
 $("filterError").hidden=true;
}
function findGroup(id,base=state.filterDraft){
 if(base.id===id)return base;
 for(const child of base.clauses)if(child.type==="group"){
  const result=findGroup(id,child);if(result)return result;
 }
 return null;
}
function removeNode(id,parent=state.filterDraft){
 const i=parent.clauses.findIndex(c=>c.id===id);
 if(i>=0){parent.clauses.splice(i,1);return true;}
 for(const child of parent.clauses)if(child.type==="group"&&removeNode(id,child))return true;
 return false;
}
function renderGroup(g,isNested=false){
 const wrap=mk("div","filter-group"+(isNested?" nested":""));
 const header=mk("div","group-head");
 header.append(mk("span","","满足以下"));
 header.append(selectMenu([["and","全部条件 AND"],["or","任意条件 OR"]],g.mode,value=>{
  g.mode=value;notifyFilterEdited();renderBuilder();
 },"条件组逻辑"));
 if(isNested){
  const remove=mk("button","outline","删除此组");remove.type="button";
  remove.addEventListener("click",()=>{removeNode(g.id);notifyFilterEdited();renderBuilder();});
  header.append(remove);
 }
 wrap.append(header);
 for(const item of g.clauses){
  if(item.type==="group"){wrap.append(renderGroup(item,true));continue;}
  const row=mk("div","condition");
  row.append(selectMenu(fields,item.field,value=>{item.field=value;notifyFilterEdited();renderBuilder();},"筛选字段"));
  row.append(selectMenu(operators,item.operator,value=>{item.operator=value;notifyFilterEdited();renderBuilder();},"比较关系"));
  const input=mk("input");input.type="text";input.value=item.value;
  input.setAttribute("aria-label",item.field+"筛选值");
  input.setAttribute("placeholder",choices[item.field]?"例如 "+choices[item.field][0]:"输入关键字");
  input.addEventListener("input",e=>{item.value=e.target.value;notifyFilterEdited();});
  row.append(input);
  const remove=mk("button","","×");remove.type="button";remove.setAttribute("aria-label","删除条件");
  remove.addEventListener("click",()=>{removeNode(item.id);notifyFilterEdited();renderBuilder();});
  row.append(remove);
  wrap.append(row);
 }
 if(isNested){
  const add=mk("button","outline","＋ 组内添加条件");add.type="button";
  add.addEventListener("click",()=>appendRule(g.id));
  wrap.append(add);
 }
 return wrap;
}
function renderBuilder(){$("filterBuilder").replaceChildren(renderGroup(state.filterDraft));}
function appendRule(groupId){
 const g=findGroup(groupId);
 if(!g)return;
 if(g.clauses.length>=5){flash("每个条件组最多允许 5 个项目");return;}
 state.sequence++;
 g.clauses.push(rule("rule-"+state.sequence,"owner","equals",""));
 notifyFilterEdited();renderBuilder();
 const all=$("filterBuilder").querySelectorAll(".condition input");
 all[all.length-1]?.focus();
}
$("addRule").addEventListener("click",()=>appendRule("root"));
$("addGroup").addEventListener("click",()=>{
 if(state.filterDraft.clauses.length>=5){flash("最外层最多 5 个项目");return;}
 if(state.filterDraft.clauses.some(c=>c.type==="group")){flash("本轮演示只允许一个嵌套组");return;}
 state.sequence++;const child=group("group-"+state.sequence,"or",[]);
 state.sequence++;child.clauses.push(rule("rule-"+state.sequence,"owner","equals","产品团队"));
 state.sequence++;child.clauses.push(rule("rule-"+state.sequence,"owner","equals","设计团队"));
 state.filterDraft.clauses.push(child);notifyFilterEdited();renderBuilder();
});
function renderMatches(){
 const matched=filterWithTree(filterData,state.appliedFilter);
 $("matchCount").textContent=String(matched.length);
 $("matchNote").textContent=activeRuleCount(state.appliedFilter)+" 条规则已应用（仅本次会话）";
 const frag=document.createDocumentFragment();
 if(!matched.length)frag.append(mk("li","no-match","没有匹配结果，可编辑条件并重新应用。"));
 for(const item of matched){
  const li=mk("li");
  li.append(mk("strong","",item.name),mk("small","",item.owner+" · "+item.status));
  frag.append(li);
 }
 $("matches").replaceChildren(frag);
}
$("applyFilter").addEventListener("click",()=>{
 const error=validateFilterTree(state.filterDraft);
 if(error){$("filterError").hidden=false;$("filterError").textContent=error;return;}
 state.appliedFilter=clone(state.filterDraft);
 state.filterChanged=false;
 $("filterDraftState").textContent="条件已应用";$("filterDraftState").classList.remove("dirty");
 renderMatches();flash("临时筛选已应用");
});
$("resetFilter").addEventListener("click",()=>{
 state.filterDraft=group("root","and",[]);
 state.appliedFilter=group("applied","and",[]);
 state.filterChanged=false;
 renderBuilder();renderMatches();
 $("filterDraftState").textContent="显示全部记录";$("filterDraftState").classList.remove("dirty");
 flash("筛选已重置");
});
document.addEventListener("keydown",e=>{
 if(state.view==="form"&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){
  if($("discardDialog").open)return;
  e.preventDefault();void submitForm();return;
 }
 const tag=document.activeElement?.tagName.toLowerCase();
 if(state.view==="filters"&&e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!["input","textarea","select"].includes(tag)&&!document.activeElement?.isContentEditable){
  e.preventDefault();$("filterBuilder").querySelector(".condition input")?.focus();return;
 }
 if(e.key==="Escape"&&state.inlineEditing&&state.view==="form"&&!$("discardDialog").open){
  e.preventDefault();cancelInline();$("editName").focus();
 }
});
syncForm();renderBuilder();renderMatches();
