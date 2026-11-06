import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const assets=read("registry/assets.json").assets;
const visual=read("registry/visual-studies.json");
const styles=read("registry/styles.json");
const components=read("registry/components.json");
const byId=new Map(assets.map(a=>[a.id,a]));
test("v0.18 adds 20 indexed entries without claiming a registered style or React export",()=>{
 assert.ok(assets.length>=153,"V0.18 catalog entries must survive later additive batches");
 assert.equal(styles.styles.length,10);
 assert.ok(components.entries.length>=18,"Prior React exports must survive later additive batches");
 const ids=[...Array.from({length:9},(_,i)=>"REF-"+String(i+33).padStart(3,"0")),
  ...Array.from({length:6},(_,i)=>"IP-"+String(i+25).padStart(3,"0")),
  ...Array.from({length:5},(_,i)=>"UI-"+String(i+28).padStart(3,"0"))];
 assert.equal(ids.length,20);
 for(const id of ids)assert.ok(byId.has(id),"missing "+id);
 for(const id of ["UI-028","UI-029","UI-030","UI-031","UI-032"]){
  assert.equal(byId.get(id).stage,"analyzed");
  assert.ok(!components.entries.some(c=>c.id===id));
 }
});
test("two visual studies have real independent scoped token sketches, not complete themes",()=>{
 assert.equal(visual.defaultStudyId,null);
 assert.equal(visual.studies.length,2);
 for(const study of visual.studies){
  assert.equal(study.status,"research-only");
  assert.equal(byId.get(study.assetId).reuseKind,"design-reference");
  assert.ok(!styles.styles.some(s=>s.id===study.id));
  assert.ok(fs.existsSync(study.documentation));
  const css=fs.readFileSync(study.tokens,"utf8");
  assert.ok(css.includes('[data-style-study="'),"no scoped style marker");
  assert.ok(!/(^|\n)\s*:root\s*\{/.test(css),"global root CSS");
 }
});
test("interaction patterns link to existing sources and show honest maturity",()=>{
 for(let number=25;number<=30;number++){
  const item=byId.get("IP-"+String(number).padStart(3,"0"));
  assert.ok(item&&fs.existsSync(item.path)&&item.type==="interaction");
  assert.ok(item.dependencies.every(id=>byId.has(id)));
  assert.ok(item.styleIds.length===0);
 }
 for(const id of ["IP-026","IP-028"]){
  const asset=byId.get(id);
  assert.equal(asset.stage,"prototype");
  assert.ok(fs.existsSync(asset.handoff.entry));
  assert.match(asset.verified,/headless Node/i);
 }
 for(const id of ["IP-025","IP-027","IP-029","IP-030"])assert.equal(byId.get(id).stage,"analyzed");
});
test("every external source is research-only, not auto-installed",()=>{
 for(const id of ["REF-033","REF-034","REF-035","REF-036","REF-037","REF-038","REF-041"]){
  const a=byId.get(id);
  assert.equal(a.reuseKind,"design-reference");
  assert.ok(a.source.startsWith("https://"));
  assert.ok(fs.existsSync(path.resolve(a.path)));
  assert.match(a.verified,/not installed/i);
 }
});
