import test from "node:test";
import assert from "node:assert/strict";
import { planDesignReview, runCLI, toMarkdown } from "../scripts/plan-design-review.mjs";

test("new-page routes to opt-in Hallmark with no default style", () => {
  const p = planDesignReview({mode:"new-page",context:"an indie-game event landing page"});
  assert.equal(p.status,"planning-only");
  assert.equal(p.styleId,null);
  assert.equal(p.suggestedExternalSkill.name,"hallmark");
  assert.equal(p.suggestedExternalSkill.assetId,"REF-032");
  assert.equal(p.suggestedExternalSkill.installedOrExecutedByThisCommand,false);
  assert.match(toMarkdown(p),/No default theme/);
});
test("redesign routes to Unslop while preserving an explicit genre", () => {
  const p = planDesignReview({mode:"redesign",target:"./app/page.tsx",context:"sci-fi mission console",style:"signal-noir"});
  assert.equal(p.suggestedExternalSkill.name,"unslop");
  assert.equal(p.styleId,"signal-noir");
  assert.ok(p.preservedContracts.some(x=>x.includes("API")));
});
test("audit-only remains optional and protects local style choices", () => {
  const p = planDesignReview({mode:"audit",target:"./index.html",style:"paper-rebellion"});
  assert.equal(p.suggestedExternalSkill.name,"hallmark");
  assert.ok(p.reviewSteps.some(x=>x.includes("never redesign")));
  assert.ok(p.cautions.some(x=>x.includes("not global")));
});
test("reject missing mode, target, unregistered style and unknown options", () => {
  assert.throws(()=>planDesignReview({}),/Choose --mode/);
  assert.throws(()=>planDesignReview({mode:"redesign"}),/target/);
  assert.throws(()=>planDesignReview({mode:"audit",target:"x",style:"hallmark-theme"}),/Unknown styleId/);
  assert.throws(()=>runCLI(["--mode=new-page","--execute"]),/Unknown option/);
});
test("JSON handoff and help are deterministic, without external invocation", () => {
  const a=runCLI(["--mode=new-page","--context=reading","--format=json"]);
  const b=runCLI(["--mode=new-page","--context=reading","--format=json"]);
  assert.equal(a,b);
  assert.equal(JSON.parse(a).suggestedExternalSkill.installedOrExecutedByThisCommand,false);
  assert.match(runCLI(["--help"]),/never installs/);
});
