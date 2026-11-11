import test from "node:test";
import assert from "node:assert/strict";
import {createTimeline,applyToolEvent,timelineSummary} from "../playground/agent-interactions-v038/timeline-model.mjs";
import {createApproval,proposePatch,decidePatch,markPatchResult} from "../playground/agent-interactions-v038/approval-model.mjs";
import {createClarification,changeDraft,askQuestion,chooseAnswer,submitAnswer,finishQuestion,dismissQuestion} from "../playground/agent-interactions-v038/clarification-model.mjs";
const p={id:"p1",baseVersion:"v1",patchHash:"sha256:00112233aabbccdd",summary:"Original change"};
test("timeline identity, initial phase and immutable updates",()=>{
 const s=createTimeline([{id:"a"},{id:"b"}]);
 assert.equal(timelineSummary(s).phase,"idle");
 assert.throws(()=>createTimeline([{id:"x"},{id:"x"}]),/Duplicate/);
 const t=applyToolEvent(s,{id:"a",seq:1,status:"running"});
 assert.equal(s.tools[0].status,"queued");assert.equal(t.tools[0].status,"running");
 assert.equal(t.tools[1],s.tools[1]);
});
test("timeline ignores stale and post-terminal tool events",()=>{
 let s=createTimeline([{id:"a"}]);
 s=applyToolEvent(s,{id:"a",seq:5,status:"running"});
 assert.equal(applyToolEvent(s,{id:"a",seq:3,status:"failed"}),s);
 s=applyToolEvent(s,{id:"a",seq:6,status:"succeeded"});
 assert.equal(applyToolEvent(s,{id:"a",seq:7,status:"failed"}),s);
 assert.equal(timelineSummary(s).phase,"succeeded");
});
test("timeline partial failure and cancellation do not show success",()=>{
 let s=createTimeline([{id:"a"},{id:"b"}]);
 s=applyToolEvent(s,{id:"a",seq:1,status:"running"});
 s=applyToolEvent(s,{id:"a",seq:2,status:"succeeded"});
 s=applyToolEvent(s,{id:"b",seq:1,status:"running"});
 s=applyToolEvent(s,{id:"b",seq:2,status:"failed"});
 assert.equal(timelineSummary(s).phase,"partial-failure");
 let c=createTimeline([{id:"x"}]);
 c=applyToolEvent(c,{id:"x",seq:1,status:"cancelled"});
 assert.equal(timelineSummary(c).phase,"cancelled");
});
test("timeline rejects impossible jumps and malformed sequence",()=>{
 const s=createTimeline([{id:"a"}]);
 assert.throws(()=>applyToolEvent(s,{id:"a",seq:1,status:"succeeded"}),/Illegal/);
 assert.throws(()=>applyToolEvent(s,{id:"a",seq:0,status:"running"}),/Sequence/);
 assert.throws(()=>applyToolEvent(s,{id:"missing",seq:1,status:"running"}),/Unknown/);
 const t=applyToolEvent(s,{id:"a",seq:1,status:"running",message:"x".repeat(600)});
 assert.equal(t.events[0].message.length,500);
});
test("approval never equates proposal with permission to write",()=>{
 const s=createApproval();
 assert.throws(()=>markPatchResult(s,{...p,currentVersion:"v1",operationId:"x"}),/mismatch/);
 const t=proposePatch(s,p);
 assert.equal(s.phase,"draft");assert.equal(t.phase,"proposed");
 assert.throws(()=>markPatchResult(t,{...p,currentVersion:"v1",operationId:"x"}),/Approved/);
 assert.throws(()=>decidePatch(t,{...p,patchHash:"sha256:deadbeef",decision:"approve"}),/mismatch/);
});
test("approval rejects denied changes and stale versions",()=>{
 let s=proposePatch(createApproval(),p);
 const rejected=decidePatch(s,{...p,decision:"reject"});
 assert.equal(rejected.phase,"rejected");
 assert.equal(decidePatch(rejected,{...p,decision:"reject"}),rejected);
 assert.throws(()=>markPatchResult(rejected,{...p,currentVersion:"v1",operationId:"x"}),/Approved/);
 const approved=decidePatch(s,{...p,decision:"approve"});
 const conflict=markPatchResult(approved,{...p,currentVersion:"v2",operationId:"x"});
 assert.equal(conflict.phase,"conflict");
 assert.equal(conflict.receipt.actual,"v2");
});
test("approval receipt is explicitly demo-only, not a real write",()=>{
 let s=proposePatch(createApproval(),p);s=decidePatch(s,{...p,decision:"approve"});
 const done=markPatchResult(s,{...p,currentVersion:"v1",operationId:"local-op"});
 assert.equal(done.phase,"applied");
 assert.equal(done.receipt.kind,"local-demo-only");
 assert.equal(s.phase,"approved");
 assert.throws(()=>proposePatch(createApproval(),{...p,patchHash:"bad"}),/hash/);
});
test("clarification accepted answer preserves original draft and attachment names",()=>{
 const a=createClarification("do not lose",["notes.md"]);
 let s=askQuestion(a,{id:"q",prompt:"Choose",options:["A","B"]});
 s=chooseAnswer(s,{questionId:"q",value:"A"});
 s=submitAnswer(s,{questionId:"q",nonce:"n1"});
 assert.equal(submitAnswer(s,{questionId:"q",nonce:"n1"}),s);
 const done=finishQuestion(s,{questionId:"q",result:"accepted"});
 assert.equal(done.draft,"do not lose");
 assert.deepEqual(done.attachments,["notes.md"]);
 assert.equal(done.receipts[0].value,"A");
 assert.equal(a.status,"idle");
});
test("clarification rejects stale IDs, duplicate nonces and invalid choices",()=>{
 let s=askQuestion(createClarification(),{id:"q",prompt:"Choose",options:["A","B"]});
 assert.throws(()=>chooseAnswer(s,{questionId:"q",value:"Z"}),/Invalid/);
 assert.throws(()=>chooseAnswer(s,{questionId:"old",value:"A"}),/not editable/);
 s=chooseAnswer(s,{questionId:"q",value:"A"});s=submitAnswer(s,{questionId:"q",nonce:"n1"});
 assert.throws(()=>submitAnswer(s,{questionId:"q",nonce:"n2"}),/Already/);
 assert.throws(()=>changeDraft(s,"unwanted"),/Finish/);
});
test("clarification can retry failed answer and preserve draft",()=>{
 let s=askQuestion(createClarification("keep"),{id:"q",prompt:"Reason",kind:"text"});
 s=chooseAnswer(s,{questionId:"q",value:"because"});
 s=submitAnswer(s,{questionId:"q",nonce:"n1"});
 s=finishQuestion(s,{questionId:"q",result:"failed"});
 assert.equal(s.status,"error");
 s=submitAnswer(s,{questionId:"q",nonce:"n2"});
 s=finishQuestion(s,{questionId:"q",result:"accepted"});
 assert.equal(s.draft,"keep");assert.equal(s.receipts[0].nonce,"n2");
});
test("clarification supports multi-select and dismiss without data loss",()=>{
 let s=askQuestion(createClarification("draft",["file.md"]),{id:"q",prompt:"Pick",kind:"multi",options:["A","B"]});
 assert.throws(()=>chooseAnswer(s,{questionId:"q",value:["B","B"]}),/Invalid/);
 s=chooseAnswer(s,{questionId:"q",value:["A","B"]});
 assert.deepEqual(s.answer,["A","B"]);
 s=dismissQuestion(s);
 assert.equal(s.status,"idle");assert.equal(s.draft,"draft");assert.deepEqual(s.attachments,["file.md"]);
});
