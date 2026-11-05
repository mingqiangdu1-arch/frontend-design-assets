import test from "node:test";
import assert from "node:assert/strict";
import {reviewAudit,compareAudits} from "../scripts/triage-genre-audit.mjs";

const registry={styles:{"pixel-arcade":{
 protectedFeatures:[{id:"landscape"}],
 contextualReview:[{gate:"2a",file:"playground/creative-style-lab/lab.css",evidencePattern:"pixel-world",feature:"landscape",reason:"Original scene art"}]
}}};
const source=(findings)=>({findings});

test("matches exact file, gate and evidence without suppressing or downgrading anything",()=>{
 const payload=source([
  {gate:"2a",grade:"FAIL",file:"playground/creative-style-lab/lab.css",line:8,evidence:"gradient on pixel-world"},
  {gate:"2a",grade:"FAIL",file:"playground/creative-style-lab/index.html",line:11,evidence:"pixel-world"},
  {gate:"26a",grade:"FAIL",file:"playground/creative-style-lab/lab.css",line:8,evidence:"pixel-world missing focus-visible"},
  {gate:"2a",grade:"REFLEX",file:"playground/creative-style-lab/lab.css",line:8,evidence:"different gradient"}
 ]);
 const result=reviewAudit(payload,"pixel-arcade",registry);
 assert.equal(result.total,4);
 assert.equal(result.grades.FAIL,3);
 assert.equal(result.grades.REFLEX,1);
 assert.equal(result.contextualCandidates.length,1);
 assert.equal(result.findings.length,4);
 assert.equal(result.rawFindingsPreserved,true);
 assert.equal(result.contextualCandidates[0].grade,"FAIL");
 assert.equal(result.contextualCandidates[0].reviewOnly.feature,"landscape");
});
test("compares real finding grades rather than externally supplied summary counters",()=>{
 const a=source([{gate:"2a",grade:"FAIL",file:"playground/creative-style-lab/lab.css",evidence:"pixel-world"}]);
 const b=source([{gate:"67",grade:"REFLEX",file:"playground/creative-style-lab/lab.css",evidence:"pixel-label"}]);
 a.summary={fails:0};
 const result=compareAudits(a,b,"pixel-arcade",registry);
 assert.match(result.markdown,/\| FAIL \| 1 \| 0 \| -1 \|/);
 assert.match(result.markdown,/\| REFLEX \| 0 \| 1 \| 1 \|/);
 assert.match(result.markdown,/raw scan covers FOUR different styles/);
 assert.match(result.markdown,/never automatic waivers/);
});
test("malformed upstream audit and unregistered style fail closed",()=>{
 assert.throws(()=>reviewAudit({}, "pixel-arcade",registry),/findings array/);
 assert.throws(()=>reviewAudit(source([]),"other",registry),/registered explicit styleId/);
 assert.throws(()=>reviewAudit(source([{grade:"FAIL",file:"x"}]),"pixel-arcade",registry),/Malformed upstream finding/);
});
