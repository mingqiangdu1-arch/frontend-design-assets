import test from "node:test";
import assert from "node:assert/strict";
import {summarizeAudit,compareAudits,formatReport} from "../scripts/report-design-audit.mjs";

const fake=(findings)=>({summary:{fails:99},findings});
test("raw finding grades, not the external summary, determine count deltas",()=>{
 const baseline=fake([{grade:"FAIL",gate:"26a"},{grade:"FAIL",gate:"48"},{grade:"REFLEX",gate:"67"},{grade:"WARN",gate:"34"}]);
 const candidate=fake([{grade:"FAIL",gate:"48"},{grade:"REFLEX",gate:"67"},{grade:"REFLEX",gate:"67"}]);
 const comparison=compareAudits(baseline,candidate,{label:"Editorial Warm"});
 assert.equal(comparison.before.total,4);
 assert.equal(comparison.after.total,3);
 assert.equal(comparison.before.counts.FAIL,2);
 assert.equal(comparison.after.counts.FAIL,1);
 assert.equal(comparison.changed.find(x=>x.key==="26a / FAIL").after,0);
 const text=formatReport(comparison);
 assert.match(text,/Editorial Warm/);
 assert.match(text,/Not a design quality score/);
 assert.match(text,/house rules/);
 assert.match(text,/\| All \| 4 \| 3 \| -1 \|/);
 assert.match(text,/\| 67 \/ REFLEX \| 1 \| 2 \| \+1 \|/);
});
test("empty valid findings can be compared",()=>{
 const s=summarizeAudit(fake([]));
 assert.equal(s.total,0);
 assert.equal(s.counts.FAIL,0);
 assert.match(formatReport(compareAudits(fake([]),fake([]))),/No changed gate counts/);
});
test("missing and malformed findings fail rather than producing invented clean audit",()=>{
 assert.throws(()=>summarizeAudit({summary:{fails:0}}),/findings array/);
 assert.throws(()=>summarizeAudit(fake([{grade:"FAIL"}])),/Malformed/);
});
