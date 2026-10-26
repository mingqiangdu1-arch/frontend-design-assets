export const records=[
 {id:"PR-101",title:"设计规范评审"},
 {id:"PR-102",title:"交互状态补全"},
 {id:"PR-103",title:"视觉回归验收"}
];
export function archiveRecord(items,id){
 if(!items.some(x=>x.id===id))return {items:items.slice(),snapshot:null};
 return {items:items.filter(x=>x.id!==id),snapshot:{record:items.find(x=>x.id===id),index:items.findIndex(x=>x.id===id)}};
}
export function undoArchive(items,snapshot){
 if(!snapshot || items.some(x=>x.id===snapshot.record.id))return items.slice();
 const next=items.slice();next.splice(Math.max(0,Math.min(items.length,snapshot.index)),0,snapshot.record);return next;
}
export function moveItem(ids,id,direction){
 const at=ids.indexOf(id),next=at+direction;
 if(!Number.isInteger(direction)||Math.abs(direction)!==1||at===-1||next<0||next>=ids.length)return ids.slice();
 const result=ids.slice();[result[at],result[next]]=[result[next],result[at]];return result;
}
export const wizardSteps=["基本信息","视觉偏好","确认摘要"];
export function validateWizard(step,data){
 if(step===0&&!data.name.trim())return "请填写项目名称。";
 if(step===1&&!data.styleId)return "请选择一个视觉方向。";
 return null;
}
export function nextWizardStep(current,data){
 const error=validateWizard(current,data);
 return error?{step:current,error}:{step:Math.min(wizardSteps.length-1,current+1),error:null};
}
export function previousWizardStep(current){return Math.max(0,current-1);}
export function clampSplit(percent){
 const n=Number(percent);
 return Number.isFinite(n)?Math.min(75,Math.max(25,Math.round(n))):50;
}
