import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const registry=JSON.parse(fs.readFileSync("registry/assets.json","utf8"));
test("four-pilot registry contains new assets without duplicate identifiers or dangling dependencies",()=>{
 const all=registry.assets;
 assert.equal(new Set(all.map(x=>x.id)).size,all.length);
 for(const id of ["PR-015","PR-016","IP-018","IP-019","IP-020","KIT-014"])
   assert.equal(all.filter(x=>x.id===id).length,1,"missing or duplicate "+id);
 const ids=new Set(all.map(x=>x.id));
 for(const item of all)for(const dep of item.dependencies||[])
   assert.ok(ids.has(dep),item.id+" references "+dep);
});
test("integrated repo retains the original behavior code and evidence scripts",()=>{
 const paths=[
  "playground/precision-workbench/src/styles.css",
  "playground/editorial-review/src/main.tsx",
  "playground/creative-style-lab/lab.css",
  "playground/advanced-interactions/app.mjs",
  "playground/advanced-interactions/model.mjs",
  "scripts/report-design-audit.mjs",
  "scripts/triage-genre-audit.mjs"
 ];
 for(const path of paths)assert.ok(fs.existsSync(path),"missing "+path);
});
