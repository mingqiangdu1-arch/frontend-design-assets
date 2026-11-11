import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const dossier=read("registry/component-dossiers-v037.json");
const master=read("registry/assets.json");
const byId=new Map(master.assets.map(a=>[a.id,a]));
test("V0.37 names real upstream files at pinned commits, with no code imported",()=>{
 assert.equal(dossier.dossiers.length,10);
 assert.equal(dossier.patterns.length,3);
 const ids=new Set();
 for(const row of [...dossier.dossiers,...dossier.patterns]){
   assert.ok(!ids.has(row.id));ids.add(row.id);
   const a=byId.get(row.id);assert.ok(a,row.id);
   assert.equal(a.source,row.source);assert.equal(a.handoff.mode,"research-only");
   assert.equal(a.stage,"analyzed");assert.equal(a.spec,"registry/component-dossiers-v037.json");
   assert.ok(row.related.every(id=>byId.has(id)));
 }
 for(const row of dossier.dossiers){
   assert.equal(row.imported,false);
   assert.equal(row.implementation,"metadata-and-independent-design-study-only");
   assert.equal(row.suggestedStatesNotUpstreamVerified,true);
   assert.match(row.upstreamCommit,/^[0-9a-f]{40}$/);
   assert.ok(row.source.includes(row.upstreamCommit));
   assert.ok(row.licenseEvidence.startsWith("https://github.com/"));
   assert.ok(row.filePaths.length>=2);
   assert.ok(row.installTargets.length);
   assert.ok(row.states.length>=4 && row.responsive.length>=2);
   assert.ok(row.observed && row.study && row.fallback && row.distinct);
 }
});
test("V0.37 disallows promotion of marketplace-only candidates",()=>{
 assert.equal(dossier.candidateQueue.length,3);
 for(const row of dossier.candidateQueue){
   assert.equal(row.status,"collection-listed-item-permalink-unverified");
   assert.equal(row.licenseStatus,"author-item-license-unknown");
   assert.ok(byId.has(row.sourceRef));
   assert.ok(!master.assets.some(a=>a.source===row.collectionUrl && a.name===row.label));
 }
});
test("V0.37 original agent state patterns retain fail-closed handoff",()=>{
 assert.equal(dossier.patterns.length,3);
 for(const row of dossier.patterns){
   assert.equal(row.implementation,"original-research-only");
   for(const k of ["contract","states","controls","fallback","failures","diff"])assert.ok(row[k]);
   assert.equal(byId.get(row.id).reuseKind,"behavior-pattern");
 }
});
