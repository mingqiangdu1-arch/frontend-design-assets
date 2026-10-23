import test from "node:test";
import assert from "node:assert/strict";
import {styleIds,selectStyle,filterCommands,markSelected,toggleSaved,lessons,evaluateChoice,progressPercent,nextQuestionIndex} from "../playground/style-explorer/model.mjs";

test("three new styles have stable, distinct identifiers",()=>{
 assert.equal(new Set(styleIds).size,3);
 assert.deepEqual(styleIds,["precision-dark","editorial-warm","playful-pop"]);
});
test("style switch rejects unregistered theme and preserves selection",()=>{
 assert.equal(selectStyle("editorial-warm"),"editorial-warm");
 assert.equal(selectStyle("not-a-theme","precision-dark"),"precision-dark");
});
test("command filter supports case-insensitive search",()=>{
 const entries=[{title:"Feature review",meta:"OPS-01"},{title:"Token audit",meta:"DS-02"}];
 assert.deepEqual(filterCommands(entries,"token").map(x=>x.title),["Token audit"]);
 assert.deepEqual(filterCommands(entries,"OPS").map(x=>x.title),["Feature review"]);
 assert.equal(filterCommands(entries,"nothing").length,0);
});
test("work selection falls back on invalid ID",()=>{
 assert.equal(markSelected(["a","b"],"b"),"b");
 assert.equal(markSelected(["a","b"],"bad"),"a");
});
test("bookmark toggle is reversible",()=>{
 assert.equal(toggleSaved(false),true);
 assert.equal(toggleSaved(toggleSaved(false)),false);
});
test("quiz evaluation does not reward invalid choices",()=>{
 assert.deepEqual(evaluateChoice(lessons[0],null),{valid:false,correct:false,delta:0});
 assert.deepEqual(evaluateChoice(lessons[0],-1),{valid:false,correct:false,delta:0});
 assert.equal(evaluateChoice(lessons[0],0).delta,20);
 assert.equal(evaluateChoice(lessons[0],2).correct,false);
});
test("progress and next question wrap predictably",()=>{
 assert.equal(progressPercent(0,3),33);
 assert.equal(progressPercent(2,3),100);
 assert.equal(progressPercent(3,3),100);
 assert.equal(nextQuestionIndex(2,3),0);
});
test("each quiz has one valid answer",()=>{
 for(const lesson of lessons){
  assert.ok(lesson.correct>=0 && lesson.correct<lesson.options.length);
  assert.equal(lesson.options.length,3);
 }
});
