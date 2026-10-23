import {sampleRecords,statusOptions,listRecords,selectRow,selectVisible,archiveWithUndo,undoArchive,validateName,updateRecordName} from "./model.mjs";

const $=id=>document.getElementById(id);
const state={
  records:structuredClone(sampleRecords),query:"",status:"all",sortKey:"updatedAt",
  sortDirection:"desc",density:"comfortable",selected:new Set(),mode:"normal",
  undoSnapshot:null,editId:null,focusId:null,saving:false
};
const tone={"进行中":"active","已完成":"done","待确认":"pending"};
const visible=()=>listRecords(state.records,{query:state.query,status:state.status,sortKey:state.sortKey,sortDirection:state.sortDirection});
const element=(tag,cls="",text="")=>{
  const e=document.createElement(tag);
  if(cls)e.className=cls;
  if(text)e.textContent=text;
  return e;
};

function updateViewControls(){
  document.querySelectorAll("[data-status]").forEach(btn=>{
    const active=btn.dataset.status===state.status;
    btn.classList.toggle("active",active);
    btn.setAttribute("aria-pressed",String(active));
  });
  document.querySelectorAll("[data-mode]").forEach(btn=>{
    const active=btn.dataset.mode===state.mode;
    btn.classList.toggle("active",active);
    btn.setAttribute("aria-pressed",String(active));
  });
  $("density").setAttribute("aria-pressed",String(state.density==="compact"));
  $("densityText").textContent=state.density==="compact"?"紧凑密度":"标准密度";
  $("clearFilter").hidden=state.status==="all"&&!state.query.trim();
}

function render(){
  const list=visible();
  const active=state.mode==="normal";
  const empty=state.mode==="empty"||(active&&list.length===0);
  $("recordCount").textContent=String(state.records.filter(r=>!r.archived).length);
  $("loading").hidden=state.mode!=="loading";
  $("error").hidden=state.mode!=="error";
  $("empty").hidden=!empty;
  $("tablePanel").hidden=!active||empty;
  $("bulk").hidden=!active||state.selected.size===0;
  $("bulkText").textContent="选中 "+state.selected.size+" 条";
  $("main").classList.toggle("compact",state.density==="compact");
  $("footerCount").textContent=active?"当前显示 "+list.length+" 条 · 未归档 "+state.records.filter(r=>!r.archived).length+" 条":"正在预览状态";
  if(empty){
    $("emptyTitle").textContent=state.mode==="empty"?"当前数据集为空（演示）":"没有找到匹配记录";
    $("emptyDesc").textContent=state.mode==="empty"?"切换正常模式以恢复演示数据。":"请修改关键词或选择其他状态视图。";
  }
  for(const key of ["name","updatedAt"]){
    const activeSort=state.sortKey===key,header=$(key==="name"?"thName":"thDate");
    const arrow=$(key==="name"?"dirName":"dirDate");
    header.setAttribute("aria-sort",activeSort?(state.sortDirection==="asc"?"ascending":"descending"):"none");
    arrow.textContent=activeSort?(state.sortDirection==="asc"?"↑":"↓"):"↕";
  }
  const fragment=document.createDocumentFragment();
  for(const record of list){
    const row=element("tr");
    const pick=element("td","pick");
    const checkbox=element("input");
    checkbox.type="checkbox";checkbox.checked=state.selected.has(record.id);
    checkbox.dataset.select=record.id;checkbox.setAttribute("aria-label","选择 "+record.name);
    pick.append(checkbox);row.append(pick);
    const name=element("td");
    const opener=element("button","record-btn",record.name);
    opener.type="button";opener.dataset.open=record.id;
    name.append(opener,element("span","record-id",record.id));row.append(name);
    row.append(element("td","muted",record.owner));
    const status=element("td");
    status.append(element("span","tag "+(tone[record.status]||"pending"),record.status));row.append(status);
    row.append(element("td","muted",record.updatedAt));
    fragment.append(row);
  }
  $("rows").replaceChildren(fragment);
  const ids=list.map(x=>x.id),marked=ids.filter(x=>state.selected.has(x)).length;
  $("allVisible").checked=!!ids.length&&marked===ids.length;
  $("allVisible").indeterminate=marked>0&&marked<ids.length;
  $("allVisible").disabled=!active||empty||!ids.length;
  updateViewControls();
}

function sortBy(key){
  if(state.sortKey===key)state.sortDirection=state.sortDirection==="asc"?"desc":"asc";
  else{state.sortKey=key;state.sortDirection=key==="updatedAt"?"desc":"asc";}
  render();
}
function showToast(message,undoSnapshot=null){
  state.undoSnapshot=undoSnapshot;
  $("toastMessage").textContent=message;
  $("undo").hidden=!undoSnapshot;
  $("toast").hidden=false;
}
function dismissToast(){state.undoSnapshot=null;$("toast").hidden=true;}

$("search").addEventListener("input",e=>{state.query=e.target.value;state.mode="normal";render();});
document.querySelectorAll("[data-status]").forEach(btn=>btn.addEventListener("click",()=>{
  state.status=statusOptions.includes(btn.dataset.status)?btn.dataset.status:"all";
  state.mode="normal";render();
}));
$("clearFilter").addEventListener("click",()=>{
  state.query="";state.status="all";state.mode="normal";$("search").value="";render();$("search").focus();
});
$("density").addEventListener("click",()=>{state.density=state.density==="compact"?"comfortable":"compact";render();});
$("sortName").addEventListener("click",()=>sortBy("name"));
$("sortDate").addEventListener("click",()=>sortBy("updatedAt"));
$("rows").addEventListener("change",e=>{
  const id=e.target.dataset?.select;
  if(!id)return;
  state.selected=selectRow(state.selected,id,e.target.checked);render();
  const matching=Array.from(document.querySelectorAll("[data-select]")).find(n=>n.dataset.select===id);
  matching?.focus();
});
$("allVisible").addEventListener("change",e=>{
  state.selected=selectVisible(state.selected,visible().map(x=>x.id),e.target.checked);
  render();$("allVisible").focus();
});
$("deselect").addEventListener("click",()=>{state.selected.clear();render();});
$("archive").addEventListener("click",()=>{
  if(!state.selected.size)return;
  const count=state.selected.size;
  const result=archiveWithUndo(state.records,state.selected);
  state.records=result.records;state.selected.clear();render();
  showToast("已归档 "+count+" 条（本地模拟）",result.undoSnapshot);
});
$("undo").addEventListener("click",()=>{
  if(!state.undoSnapshot)return;
  state.records=undoArchive(state.records,state.undoSnapshot);
  dismissToast();render();showToast("已撤销归档（本地模拟）");
});
$("toastClose").addEventListener("click",dismissToast);
document.querySelectorAll("[data-mode]").forEach(btn=>btn.addEventListener("click",()=>{
  state.mode=btn.dataset.mode;render();
}));
$("retry").addEventListener("click",()=>{state.mode="normal";render();showToast("已恢复演示数据");});
$("reset").addEventListener("click",()=>{
  state.mode="normal";state.status="all";state.query="";$("search").value="";render();
});

const dialog=$("sheet"),nameInput=$("nameInput");
function openSheet(id){
  const record=state.records.find(r=>r.id===id);
  state.editId=id;state.focusId=id;state.saving=false;
  $("sheetTitle").textContent=record?"编辑记录":"新建记录";
  $("detailId").textContent=record?.id||"保存时分配";
  $("detailStatus").textContent=record?.status||"待确认";
  $("detailOwner").textContent=record?.owner||"设计团队";
  nameInput.value=record?.name||"";
  $("nameError").hidden=true;nameInput.removeAttribute("aria-invalid");
  $("saveState").textContent="尚未保存";
  $("sheetSave").disabled=false;$("sheetSave").textContent="保存更改";
  dialog.showModal();requestAnimationFrame(()=>nameInput.focus());
}
$("rows").addEventListener("click",e=>{
  const opener=e.target.closest("[data-open]");if(opener)openSheet(opener.dataset.open);
});
$("newBtn").addEventListener("click",()=>openSheet(null));
$("sheetClose").addEventListener("click",()=>dialog.close());
$("sheetCancel").addEventListener("click",()=>dialog.close());
dialog.addEventListener("close",()=>{
  const id=state.focusId;state.editId=null;state.focusId=null;state.saving=false;
  if(id){
    const target=Array.from(document.querySelectorAll("[data-open]")).find(n=>n.dataset.open===id);
    (target||$("newBtn")).focus();
  }else $("newBtn").focus();
});
nameInput.addEventListener("input",()=>{
  $("nameError").hidden=true;nameInput.removeAttribute("aria-invalid");
  $("saveState").textContent="未保存的更改";
});
$("recordForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if(state.saving)return;
  const valid=validateName(nameInput.value);
  if(!valid.ok){
    $("nameError").textContent=valid.message;
    $("nameError").hidden=false;nameInput.setAttribute("aria-invalid","true");nameInput.focus();return;
  }
  state.saving=true;$("sheetSave").disabled=true;$("sheetSave").textContent="保存中…";
  $("saveState").textContent="正在本地模拟保存";
  await new Promise(resolve=>setTimeout(resolve,280));
  const isNew=state.editId===null;
  if(isNew){
    const id="NEW-"+String(Date.now());
    state.records=[{id,name:valid.value,owner:"设计团队",status:"待确认",updatedAt:"2026-10-23",archived:false},...state.records];
    state.status="all";state.query="";$("search").value="";
    state.focusId=id;
  }else{
    const updated=updateRecordName(state.records,state.editId,valid.value);
    if(updated.error){$("nameError").textContent=updated.error;$("nameError").hidden=false;
      state.saving=false;$("sheetSave").disabled=false;$("sheetSave").textContent="保存更改";return;}
    state.records=updated.records;
  }
  dismissToast();state.mode="normal";render();dialog.close();
  showToast(isNew?"记录已创建（本地模拟）":"记录已保存（本地模拟）");
});
render();
