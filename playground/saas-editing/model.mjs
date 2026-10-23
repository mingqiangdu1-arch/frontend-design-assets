/** Independent SaaS editing / filter research model. No persistence or API. */
export const savedExample=Object.freeze({
 name:"AI Workflow Platform",slug:"ai-workflow",email:"owner@example.com",
 description:"协同完成从需求到发布的产品研发工作。",owner:"产品团队",notifications:true
});
export const filterData=[
 {id:"S-101",name:"商品管理平台",status:"进行中",owner:"产品团队"},
 {id:"S-102",name:"通知模板中心",status:"已完成",owner:"技术团队"},
 {id:"S-103",name:"需求协作系统",status:"进行中",owner:"设计团队"},
 {id:"S-104",name:"供应商管理",status:"待确认",owner:"运营团队"},
 {id:"S-105",name:"客户反馈模块",status:"待确认",owner:"产品团队"},
 {id:"S-106",name:"版本发布清单",status:"已完成",owner:"产品团队"}
];

export function clone(value){return structuredClone(value);}
export function hasUnsaved(saved,draft){
 return Object.keys(saved).some(key=>draft[key]!==saved[key]);
}
export function validateField(field,value){
 const text=String(value??"").trim();
 if(field==="name"){
  if(!text)return "名称不能为空。";
  if(text.length>40)return "名称不能超过 40 个字符。";
 }
 if(field==="slug"){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text)||text.length<2||text.length>24)
   return "标识符需为 2–24 位小写字母、数字或连字符，且不能以连字符开头或结尾。";
 }
 if(field==="email"){
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)||text.length>120)
   return "请填写有效的联系邮箱。";
 }
 if(field==="description"&&text.length>240)return "说明不能超过 240 个字符。";
 return null;
}
export const fieldOrder=["name","slug","email","description"];
export function validateDraft(draft){
 const errors={};
 for(const f of fieldOrder){const error=validateField(f,draft[f]);if(error)errors[f]=error;}
 return errors;
}
export function saveDraft(saved,draft,{simulateFailure=false}={}){
 const errors=validateDraft(draft);
 if(Object.keys(errors).length)return {ok:false,kind:"validation",errors,saved};
 if(simulateFailure)return {ok:false,kind:"network",message:"模拟保存失败：本地演示没有真实服务，请重试。",saved};
 const next=clone(draft);
 for(const field of fieldOrder)next[field]=String(next[field]??"").trim();
 return {ok:true,kind:"success",saved:next};
}
export const filterFields=["name","owner","status"];
export const filterOps=["contains","equals","notEquals"];
export function rule(id,field="status",operator="equals",value=""){
 return {type:"rule",id,field,operator,value};
}
export function group(id,mode="and",clauses=[]){return {type:"group",id,mode,clauses};}
function isActiveRule(node){return node.type==="rule"&&String(node.value??"").trim().length>0;}
export function activeRuleCount(node){
 if(node.type==="rule")return isActiveRule(node)?1:0;
 return node.clauses.reduce((sum,clause)=>sum+activeRuleCount(clause),0);
}
export function validateFilterTree(node,depth=0){
 if(!node||node.type!=="group"||!["and","or"].includes(node.mode)||!Array.isArray(node.clauses))
  return "筛选组无效。";
 if(depth>1)return "当前演示最多支持两层条件组。";
 if(node.clauses.length>5)return "每个条件组最多添加 5 条规则或子组。";
 for(const clause of node.clauses){
  if(clause.type==="group"){
   const error=validateFilterTree(clause,depth+1);if(error)return error;
  }else if(clause.type==="rule"){
   if(!filterFields.includes(clause.field)||!filterOps.includes(clause.operator))return "存在不支持的字段或运算符。";
  }else return "存在无效条件。";
 }
 return null;
}
function matchRule(item,r){
 const source=String(item[r.field]??"").toLocaleLowerCase();
 const value=String(r.value).trim().toLocaleLowerCase();
 if(r.operator==="contains")return source.includes(value);
 if(r.operator==="equals")return source===value;
 if(r.operator==="notEquals")return source!==value;
 return false;
}
function matchNode(item,node){
 if(node.type==="rule")return isActiveRule(node)?matchRule(item,node):null;
 const decisions=node.clauses.map(clause=>matchNode(item,clause)).filter(x=>x!==null);
 if(!decisions.length)return null;
 return node.mode==="and"?decisions.every(Boolean):decisions.some(Boolean);
}
export function filterWithTree(records,tree){
 const invalid=validateFilterTree(tree);
 if(invalid)throw new Error(invalid);
 if(!activeRuleCount(tree))return records.slice();
 return records.filter(item=>matchNode(item,tree)??true);
}
export function newDefaultFilter(){
 return group("root","and",[rule("rule-1","status","equals","进行中")]);
}
