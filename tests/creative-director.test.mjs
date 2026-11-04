import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {registry,generateDirection,generateCollection,runCLI,toMarkdown} from "../scripts/creative-director.mjs";
const styleIds=["pixel-arcade","signal-noir","paper-rebellion","aether-orbit"];
test("creative grammar lists four distinct directions with no implicit default",()=>{
 assert.equal(registry.defaultStyleId,null);
 assert.deepEqual(registry.styles.map(x=>x.id),styleIds);
 for(const item of registry.styles){
  assert.ok(item.layout.length>=3&&item.surprise.length>=3&&item.negative.length>=3);
  assert.ok(fs.existsSync("styles/"+item.id+"/tokens.json"));
 }
});
test("no default and unknown styles fail explicitly",()=>{
 assert.throws(()=>generateDirection({}),/Explicit/);
 assert.throws(()=>generateDirection({style:"made-up"}),/Unknown/);
 assert.throws(()=>runCLI(["--style=surprise","--count=0"]),/count/);
 assert.throws(()=>runCLI(["--style=pixel-arcade","--format=html"]),/format/);
});
test("same seed and context is fully reproducible",()=>{
 const a=generateCollection({style:"paper-rebellion",seed:"workshop",context:"museum",count:8});
 const b=generateCollection({style:"paper-rebellion",seed:"workshop",context:"museum",count:8});
 assert.deepEqual(a,b);
 assert.equal(new Set(a.map(x=>x.conceptId)).size,8);
});
test("explicit surprise spans only indexed style IDs and remains reproducible",()=>{
 const a=generateCollection({style:"surprise",seed:"42",count:12});
 assert.ok(a.every(x=>styleIds.includes(x.styleId)));
 assert.deepEqual(a,generateCollection({style:"surprise",seed:"42",count:12}));
});
test("output contains real tokens and negative constraints, not ready-to-ship claims",()=>{
 const result=generateDirection({style:"signal-noir",seed:"99",context:"audio library"});
 assert.equal(result.reactPackageCompatible,false);
 assert.ok(result.avoid.includes("constant flashing"));
 assert.equal(result.styleTokens,"styles/signal-noir/tokens.json");
 const md=toMarkdown([result]);
 assert.ok(md.includes("Avoid:"));
 assert.ok(md.includes("audio library"));
 assert.ok(md.includes("research-only")||md.includes("Research-only"));
 const json=JSON.parse(runCLI(["--style=surprise","--seed=20","--count=4","--format=json"]));
 assert.equal(json.count,4);
});
