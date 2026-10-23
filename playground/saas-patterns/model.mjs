/**
 * Pure, framework-agnostic state transforms for the SaaS Pattern Lab.
 * Demo data only; no network/persistence.
 */
export const sampleRecords = [
  {id:"REC-101",name:"商品管理平台",owner:"产品团队",status:"进行中",updatedAt:"2026-10-22",archived:false},
  {id:"REC-102",name:"客户反馈归档",owner:"运营团队",status:"待确认",updatedAt:"2026-10-21",archived:false},
  {id:"REC-103",name:"AI 需求工作台",owner:"设计团队",status:"进行中",updatedAt:"2026-10-20",archived:false},
  {id:"REC-104",name:"通知模板中心",owner:"技术团队",status:"已完成",updatedAt:"2026-10-18",archived:false},
  {id:"REC-105",name:"供应商管理",owner:"运营团队",status:"待确认",updatedAt:"2026-10-16",archived:false},
  {id:"REC-106",name:"版本发布清单",owner:"产品团队",status:"已完成",updatedAt:"2026-10-15",archived:false}
];

export const statusOptions = ["all","进行中","已完成","待确认"];

export function listRecords(records,{query="",status="all",sortKey="updatedAt",sortDirection="desc"}={}){
  const q=query.trim().toLocaleLowerCase();
  const result=records.filter(r=>!r.archived && (status==="all" || r.status===status) &&
    (!q || [r.id,r.name,r.owner,r.status].some(v=>String(v).toLocaleLowerCase().includes(q))));
  const dir=sortDirection==="asc"?1:-1;
  return result.sort((a,b)=>dir*String(a[sortKey]??"").localeCompare(String(b[sortKey]??""),"zh-CN") ||
    a.id.localeCompare(b.id));
}

export function selectRow(selected,id,checked){
  const next=new Set(selected);
  if(checked)next.add(id);else next.delete(id);
  return next;
}

export function selectVisible(selected,visibleIds,checked){
  const next=new Set(selected);
  for(const id of visibleIds){if(checked)next.add(id);else next.delete(id);}
  return next;
}

export function archiveWithUndo(records,selected){
  const ids=new Set(selected);
  const previous=records.filter(r=>ids.has(r.id)).map(r=>({id:r.id,archived:r.archived}));
  return {records:records.map(r=>ids.has(r.id)?{...r,archived:true}:r),undoSnapshot:previous};
}

export function undoArchive(records,undoSnapshot){
  const byId=new Map(undoSnapshot.map(x=>[x.id,x.archived]));
  return records.map(r=>byId.has(r.id)?{...r,archived:byId.get(r.id)}:r);
}

export function validateName(value){
  const trimmed=String(value??"").trim();
  if(!trimmed)return {ok:false,message:"请输入名称"};
  if(trimmed.length>40)return {ok:false,message:"名称不能超过 40 个字符"};
  return {ok:true,value:trimmed};
}

export function updateRecordName(records,id,name){
  const valid=validateName(name);
  if(!valid.ok)return {records,error:valid.message};
  return {records:records.map(r=>r.id===id?{...r,name:valid.value}:r),error:null};
}
