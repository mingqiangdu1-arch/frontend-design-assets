import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {searchAssets,buildHandoff} from "../scripts/find-assets.mjs";

const registry=JSON.parse(fs.readFileSync("registry/assets.json","utf8"));
const specs=JSON.parse(fs.readFileSync("registry/state-specimens-v035.json","utf8"));
const existing=JSON.parse(fs.readFileSync("registry/experience-artifacts-v034.json","utf8"));
const assetById=new Map(registry.assets.map(x=>[x.id,x]));
const allowed=new Set(existing.entries.map(x=>x.id));

test("V0.35 adds illustrations to exactly eight historical IDs, not new implementations",()=>{
 assert.equal(specs.schemaVersion,"1.0");
 assert.equal(specs.assetsAdded,0);
 assert.equal(specs.specimens.length,8);
 assert.equal(new Set(specs.specimens.map(x=>x.assetId)).size,8);
 assert.equal(specs.viewportsAreConceptsNotCaptures,true);
 assert.equal(registry.assets.filter(asset=>asset.visualSpecimen && allowed.has(asset.id)).length,8);
 for(const sample of specs.specimens){
  assert.ok(allowed.has(sample.assetId),sample.assetId);
  const asset=assetById.get(sample.assetId);
  assert.ok(asset,sample.assetId);
  assert.equal(asset.stage,"analyzed");
  assert.equal(asset.visualSpecimen,sample.svg);
  assert.deepEqual(sample.targetViewportWidths,[1440,390]);
  const handoff=buildHandoff(asset,registry.reusePolicies);
  assert.equal(handoff.mode,"research-only");
  assert.ok(handoff.relatedFiles.includes(sample.svg),sample.assetId);
  assert.match(handoff.visualEvidence,/not-browser-render-or-functional-state/);
  assert.ok(!asset.exportName && !sample.implemented && !sample.interactive);
 }
});
test("SVG studies are self-contained, labeled, distinct and not executable",()=>{
 const contents=new Set();
 for(const sample of specs.specimens){
  const svg=fs.readFileSync(sample.svg,"utf8");
  assert.ok(svg.startsWith("<svg "),sample.assetId);
  assert.ok(svg.trimEnd().endsWith("</svg>"),sample.assetId);
  assert.match(svg,/<title\s/);
  assert.match(svg,/<desc\s/);
  assert.ok(svg.includes(sample.assetId),sample.assetId);
  assert.ok(svg.includes("DESKTOP LAYOUT CONCEPT"),sample.assetId);
  assert.ok(svg.includes("MOBILE LAYOUT CONCEPT"),sample.assetId);
  assert.ok(svg.includes("NOT RESPONSIVE TEST EVIDENCE"),sample.assetId);
  assert.ok((svg.match(/<rect\s/g)||[]).length>=5,sample.assetId);
  assert.doesNotMatch(svg,/<script\b|<foreignObject\b|<image\b|(?:xlink:)?href\s*=|@import\b|url\s*\(/i);
  contents.add(svg);
 }
 assert.equal(contents.size,8);
});
test("agent search resolves static visual samples without promoting them to code",()=>{
 for(const sample of specs.specimens){
  const found=searchAssets(registry.assets,{intent:sample.assetId,reusePolicies:registry.reusePolicies,limit:50}).find(x=>x.id===sample.assetId);
  assert.ok(found,sample.assetId);
  assert.equal(found._reuseMode,"research-only");
  assert.equal(buildHandoff(found,registry.reusePolicies).relatedFiles.includes(sample.svg),true);
 }
 const impl=searchAssets(registry.assets,{intent:"UI-058",reusePolicies:registry.reusePolicies}).find(x=>x.id==="UI-058");
 assert.equal(buildHandoff(impl,registry.reusePolicies).mode,"copyable-source");
});
