import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {filterAssets,facetValues,toggleSelection,formatBundle,safeRepoPath} from "../playground/asset-explorer/model.mjs";
const assets=JSON.parse(fs.readFileSync("registry/assets.json","utf8")).assets;
test("uses live registry and contains five styles",()=>{assert.ok(assets.length>=95);assert.equal(new Set(assets.map(x=>x.id)).size,assets.length);assert.ok(facetValues(assets,"styleIds").includes("precision-dark"));});
test("query, style, stage, type, context intersect",()=>{
 const rows=filterAssets(assets,{style:"precision-dark",type:"component",stage:"reference-implemented"});
 assert.ok(rows.length);assert.ok(rows.every(x=>x.styleIds.includes("precision-dark")&&x.type==="component"));
 assert.ok(filterAssets(assets,{query:"UI-019"}).some(x=>x.id==="UI-019"));
 assert.ok(filterAssets(assets,{context:"developer-tool"}).some(x=>x.id==="TPL-005"));
 assert.equal(filterAssets(assets,{query:"no-asset-like-zzz999"}).length,0);
});
test("neutral assets opt-in",()=>{
 const a=filterAssets(assets,{style:"precision-dark"}),b=filterAssets(assets,{style:"precision-dark",includeAgnostic:true});
 assert.ok(b.length>=a.length);assert.ok(a.every(x=>x.styleIds.includes("precision-dark")));
 assert.ok(b.some(x=>x.styleIds.length===0));
});
test("selection is reversible and immutable",()=>{const a=new Set(["UI-010"]),b=toggleSelection(a,"UI-010");assert.ok(a.has("UI-010"));assert.ok(!b.has("UI-010"));assert.ok(toggleSelection(b,"UI-010").has("UI-010"));});
test("brief lists dependencies and warns on cross-style combinations",()=>{
 const md=formatBundle(assets,new Set(["TPL-002","TPL-005"]));
 assert.ok(md.includes("TPL-005"));assert.ok(md.includes("multiple explicit style IDs"));assert.ok(md.includes("Do not auto-compose incompatible themes"));assert.ok(md.includes("Dependencies"));
});
test("path cannot escape repository",()=>{assert.equal(safeRepoPath("styles/precision-dark/tokens.css"),"styles/precision-dark/tokens.css");for(const path of ["../secret","/tmp/a","https://foo.test","x\\y"])assert.equal(safeRepoPath(path),null);});
