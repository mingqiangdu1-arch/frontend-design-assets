import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const assets=JSON.parse(fs.readFileSync("registry/assets.json","utf8")).assets;
test("third-party design skills are research links, never silently installed source dependencies",()=>{
 const ids=["REF-031","REF-032","PR-013"];
 for(const id of ids){const item=assets.find(x=>x.id===id);assert.ok(item,id+" missing");assert.equal(item.stage,"analyzed");assert.deepEqual(item.styleIds,[]);}
 const read=fs.readFileSync("docs/research/unslop-hallmark.md","utf8");
 assert.ok(read.includes("CC BY 4.0"));assert.ok(read.includes("MIT"));assert.ok(read.includes("not automatically"));
 const plan=fs.readFileSync("recipes/contextual-design-review.md","utf8");
 assert.ok(plan.includes("Negotiable heuristics"));
 assert.ok(plan.includes("human"));
});
