import test from "node:test";
import assert from "node:assert/strict";
import {searchAssets,runCLI} from "../scripts/find-assets.mjs";
const fixtures=[
 {id:"DT-001",name:"Light theme",reuseKind:"style-token",styleIds:["refined-light-saas"],applicationContexts:["workspace"],stage:"prototype",tags:["light"]},
 {id:"DT-002",name:"Dark theme",reuseKind:"style-token",styleIds:["precision-dark"],applicationContexts:["developer-tool"],stage:"prototype",tags:["dark"]},
 {id:"IP-002",name:"Preview behavior",reuseKind:"behavior-pattern",styleIds:[],applicationContexts:["workspace","developer-tool"],stage:"analyzed",tags:["peek","preview"]},
 {id:"UI-001",name:"Light Button",reuseKind:"styled-implementation",styleIds:["refined-light-saas"],applicationContexts:["workspace"],stage:"reference-implemented",tags:["button"]}
];
test("style selection does not return incompatible styled components",()=>{
 const result=searchAssets(fixtures,{style:"precision-dark"});
 assert.ok(result.some(x=>x.id==="DT-002"));
 assert.ok(result.some(x=>x.id==="IP-002"));
 assert.ok(!result.some(x=>x.id==="DT-001"));
 assert.ok(!result.some(x=>x.id==="UI-001"));
});
test("context search excludes unrelated assets",()=>{
 const ids=searchAssets(fixtures,{context:"developer-tool"}).map(x=>x.id);
 assert.deepEqual(ids,["DT-002","IP-002"]);
});
test("intent search requires a matching concept",()=>{
 const rows=searchAssets(fixtures,{intent:"preview",style:"precision-dark"});
 assert.deepEqual(rows.map(x=>x.id),["IP-002"]);
});
test("CLI rejects unknown style IDs",()=>{
 assert.throws(()=>runCLI(["--style=unregistered"]),/Unknown styleId/);
});
test("CLI can return parseable selection JSON",()=>{
 const obj=JSON.parse(runCLI(["--style=precision-dark","--json"]));
 assert.equal(obj.criteria.style,"precision-dark");
 assert.ok(obj.results.every(x=>x.styleIds.length===0||x.styleIds.includes("precision-dark")));
});
