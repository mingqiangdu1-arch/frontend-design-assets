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

test("metadata-driven handoff never equates source code with production readiness", async()=>{
 const {buildHandoff}=await import("../scripts/find-assets.mjs");
 const manifest=JSON.parse((await import("node:fs")).default.readFileSync("registry/assets.json","utf8"));
 const button=manifest.assets.find(a=>a.id==="UI-011");
 const drag=manifest.assets.find(a=>a.id==="IP-021");
 const visual=manifest.assets.find(a=>a.id==="REF-001");
 assert.equal(buildHandoff(button,manifest.reusePolicies).mode,"copyable-source");
 assert.equal(buildHandoff(button,manifest.reusePolicies).entry,"packages/ui/src/index.tsx");
 assert.equal(buildHandoff(drag,manifest.reusePolicies).mode,"adapt-required");
 assert.equal(buildHandoff(visual,manifest.reusePolicies).mode,"research-only");
 assert.match(buildHandoff(drag,manifest.reusePolicies).warning,/not certified|production signoff/i);
});
test("goal-based ranking favors behavior assets while honoring strict style compatibility",()=>{
 const enriched=[
  {...fixtures[0],id:"DT-010",name:"Drag token",tags:["drag"]},
  {...fixtures[2],id:"IP-010",name:"Drag interaction",tags:["drag"]},
  {...fixtures[3],id:"UI-010",name:"Drag Button",tags:["drag"]}
 ];
 const ranked=searchAssets(enriched,{style:"refined-light-saas",intent:"drag",goal:"behavior"});
 assert.equal(ranked[0].id,"IP-010");
 assert.ok(!ranked.some(a=>a.id==="DT-002"));
});
test("Chinese aliases are searchable and reuse modes filter safely",()=>{
 const assets=[
  {id:"IP-021",name:"Cross-container transfer",aliases:["跨容器拖放"],tags:["drag"],reuseKind:"behavior-pattern",styleIds:[],applicationContexts:[],stage:"prototype"},
  {id:"UI-011",name:"Button",aliases:["按钮"],tags:["button"],reuseKind:"styled-implementation",styleIds:["precision-dark"],applicationContexts:[],stage:"reference-implemented"}
 ];
 assert.deepEqual(searchAssets(assets,{intent:"跨容器拖放"}).map(a=>a.id),["IP-021"]);
 assert.deepEqual(searchAssets(assets,{reuse:"copyable-source"}).map(a=>a.id),["UI-011"]);
 const obj=JSON.parse(runCLI(["--intent=跨容器拖放","--goal=behavior","--json"]));
 assert.ok(obj.results.some(a=>a.id==="IP-021"&&a.handoffResolved.mode==="adapt-required"));
 assert.throws(()=>runCLI(["--reuse=production-ready"]),/Unknown reuse mode/);
 assert.throws(()=>runCLI(["--goal=magic"]),/Unknown goal/);
});
