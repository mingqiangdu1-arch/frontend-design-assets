import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {searchAssets,buildHandoff} from "../scripts/find-assets.mjs";

const read = filepath => JSON.parse(fs.readFileSync(filepath,"utf8"));
const registry = read("registry/assets.json");
const studies = read("registry/experience-artifacts-v034.json");
const byId = new Map(registry.assets.map(asset => [asset.id,asset]));
const expectedGroups = ["visual-storytelling","spatial-composition","creative-navigation","unconventional-interaction"];

test("V0.34 is four balanced groups with 16 unique, cross-linked research studies",()=>{
 assert.equal(studies.schemaVersion,"1.0");
 assert.equal(studies.entries.length,16);
 assert.equal(new Set(studies.entries.map(e=>e.id)).size,16);
 assert.deepEqual(studies.groups.map(g=>g.id),expectedGroups);
 for(const group of expectedGroups)assert.equal(studies.entries.filter(e=>e.group===group).length,4);
 for(const item of studies.entries){
  assert.ok(/^https:\/\//.test(item.source),item.id);
  assert.ok(item.distinctFrom && item.failureModes && item.accessibleFallback && item.stateContract,item.id);
  assert.ok(item.relatedAssets.length,item.id);
  assert.ok(item.relatedAssets.every(id=>byId.has(id)),item.id);
  const asset=byId.get(item.id);
  assert.ok(asset,item.id);
  assert.equal(asset.name,item.name,item.id);
  assert.equal(asset.stage,"analyzed",item.id);
  assert.equal(asset.source,item.source,item.id);
  assert.equal(asset.spec,"registry/experience-artifacts-v034.json",item.id);
  assert.deepEqual(asset.dependencies,item.relatedAssets,item.id);
  assert.deepEqual(asset.styleIds,[],item.id);
  assert.equal(item.adoption,"research-only",item.id);
  assert.equal(buildHandoff(asset,registry.reusePolicies).mode,"research-only",item.id);
 }
});

test("all eight novel interactions remain research-only in agent search; prototypes and code keep their original modes",()=>{
 for(const item of studies.entries.filter(e=>e.id.startsWith("IP-"))){
  const hits=searchAssets(registry.assets,{intent:item.id,reusePolicies:registry.reusePolicies,limit:50});
  const exact=hits.find(a=>a.id===item.id);
  assert.ok(exact,item.id);
  assert.equal(exact._reuseMode,"research-only",item.id);
  assert.equal(exact.handoff.mode,"research-only",item.id);
 }
 const fromPrototype=byId.get("IP-030"),fromCode=byId.get("UI-058");
 assert.equal(buildHandoff(fromPrototype,registry.reusePolicies).mode,"adapt-required");
 assert.equal(buildHandoff(fromCode,registry.reusePolicies).mode,"copyable-source");
});

test("Chinese natural-language search can retrieve distinct new assets without implying implementations",()=>{
 const cases=[
  ["我想做双线叙事的阅读页","REF-081"],
  ["采用一个非对称网格设计","REF-085"],
  ["想探索星图导航如何处理键盘","IP-042"],
  ["希望有一个环形菜单做快捷操作","IP-043"],
  ["按章节导航实现返回原位置","IP-044"],
  ["支持逐帧探索的分镜归档","IP-046"]
 ];
 for(const [intent,id] of cases){
  const found=searchAssets(registry.assets,{intent,reusePolicies:registry.reusePolicies,limit:80}).find(a=>a.id===id);
  assert.ok(found,id+" not found for: "+intent);
  assert.equal(found._reuseMode,"research-only",id);
 }
});

test("six standalone CSS layout atoms remain scoped and resource free",()=>{
 const css=fs.readFileSync("styles/primitives/v034/creative-atoms.css","utf8");
 for(const name of ["paired-reading","note-rail","contact-strip","editorial-tracks","depth-surface","orbit-guide"])
  assert.ok(css.includes(".fda34-"+name),"Missing css primitive: "+name);
 assert.doesNotMatch(css,/(?:^|\n)\s*:root\s*\{|(?:^|\n)\s*@import\b|url\s*\(/m);
 assert.ok(css.includes("prefers-reduced-motion"));
 assert.ok(css.includes("forced-colors"));
 assert.ok(css.includes("subgrid"));
});
