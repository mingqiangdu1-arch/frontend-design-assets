import test from "node:test";
import assert from "node:assert/strict";
import {savedExample,filterData,clone,hasUnsaved,validateField,validateDraft,saveDraft,
 rule,group,filterWithTree,validateFilterTree,activeRuleCount,newDefaultFilter} from "../playground/saas-editing/model.mjs";

test("unchanged and changed form state are distinct",()=>{
 const draft=clone(savedExample);assert.equal(hasUnsaved(savedExample,draft),false);
 draft.name="new";assert.equal(hasUnsaved(savedExample,draft),true);
 assert.equal(savedExample.name,"Example Workspace");
});
test("required and length validation catches field errors",()=>{
 assert.ok(validateField("name"," "));
 assert.ok(validateField("name","X".repeat(41)));
 assert.equal(validateField("name","  新项目 "),null);
 assert.ok(validateField("description","A".repeat(241)));
});
test("slug and email field validation",()=>{
 for(const bad of ["A-Upper","-hello","hello-","a","a--b","A B"]){assert.ok(validateField("slug",bad),bad);}
 assert.equal(validateField("slug","work-2026"),null);
 assert.ok(validateField("email","bad-at-email"));assert.equal(validateField("email","will@example.com"),null);
});
test("submit gathers all errors without changing saved baseline",()=>{
 const invalid={...savedExample,name:"",slug:"Wrong",email:"x"};
 const before=clone(savedExample);
 const res=saveDraft(savedExample,invalid);
 assert.equal(res.ok,false);assert.equal(res.kind,"validation");
 assert.equal(Object.keys(res.errors).length,3);
 assert.deepEqual(res.saved,before);
});
test("simulated server failure preserves saved data",()=>{
 const draft={...savedExample,name:"New"};
 const res=saveDraft(savedExample,draft,{simulateFailure:true});
 assert.equal(res.kind,"network");
 assert.equal(hasUnsaved(savedExample,draft),true);
 assert.deepEqual(res.saved,savedExample);
});
test("successful explicit save only updates returned baseline",()=>{
 const draft={...savedExample,name:"  New Name  "};
 const res=saveDraft(savedExample,draft);
 assert.equal(res.ok,true);assert.equal(res.saved.name,"New Name");
 assert.equal(savedExample.name,"Example Workspace");
});
test("one rule, whitespace, empty rules are predictable",()=>{
 const a=group("root","and",[rule("s","status","equals","进行中")]);
 assert.equal(filterWithTree(filterData,a).length,2);
 assert.equal(filterWithTree(filterData,group("root","and",[rule("s","status","equals","  ")])).length,filterData.length);
 assert.equal(activeRuleCount(a),1);
});
test("AND / OR differ and can combine 3 predicates",()=>{
 const conditions=[rule("a","status","equals","进行中"),rule("b","owner","equals","产品团队")];
 const and=filterWithTree(filterData,group("root","and",conditions));
 const or=filterWithTree(filterData,group("root","or",conditions));
 assert.deepEqual(and.map(x=>x.id),["S-101"]);
 assert.equal(or.length,4);
});
test("nested group supports different operator than parent",()=>{
 const tree=group("root","and",[
  rule("a","owner","equals","产品团队"),
  group("child","or",[rule("b","status","equals","已完成"),rule("c","status","equals","待确认")])
 ]);
 assert.deepEqual(filterWithTree(filterData,tree).map(x=>x.id),["S-105","S-106"]);
});
test("negative and contains operators work",()=>{
 const root=group("root","and",[rule("one","name","contains","平台"),rule("two","status","notEquals","已完成")]);
 assert.deepEqual(filterWithTree(filterData,root).map(x=>x.id),["S-101"]);
});
test("invalid conditions or nesting rejected",()=>{
 assert.ok(validateFilterTree(group("root","and",[rule("x","secret","equals","1")])));
 assert.ok(validateFilterTree(group("root","and",[group("deep","and",[group("deeper","or",[])])])));
 assert.throws(()=>filterWithTree(filterData,group("root","and",[rule("x","status","bad","1")])));
});
test("default filter doesn't mutate source records",()=>{
 const records=clone(filterData),f=newDefaultFilter();
 assert.equal(filterWithTree(records,f).length,2);
 assert.deepEqual(records,filterData);
});
