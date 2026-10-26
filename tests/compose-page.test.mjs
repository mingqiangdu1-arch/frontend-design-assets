import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {listTemplates,chooseTemplate,buildPlan,toMarkdown,runCLI} from "../scripts/compose-page.mjs";
import {validatePageRegistry} from "../scripts/check-page-templates.mjs";
const pages=JSON.parse(fs.readFileSync("registry/page-templates.json","utf8")),components=JSON.parse(fs.readFileSync("registry/components.json","utf8"));
test("five templates have distinct IDs and explicit styles",()=>{
 assert.equal(pages.templates.length,5);
 assert.equal(new Set(pages.templates.map(t=>t.id)).size,4);
 assert.equal(listTemplates(pages,{context:"reading"}).length,1);
 assert.equal(listTemplates(pages,{style:"neo-brutalist"})[0].id,"TPL-004");
});
test("never silently select incompatible visual style",()=>{
 assert.throws(()=>chooseTemplate(pages,{template:"TPL-002",style:"precision-dark"}),/Incompatible/);
 assert.equal(chooseTemplate(pages,{style:"precision-dark"}).id,"TPL-005");
 assert.throws(()=>chooseTemplate(pages,{context:"reading"}),/explicit style/);
 assert.throws(()=>chooseTemplate(pages,{template:"TPL-003",context:"campaign"}),/not declared/);
});
test("selection creates a reusable plan but does not claim generated source",()=>{
 const selected=chooseTemplate(pages,{template:"TPL-002",style:"editorial-warm"});
 const plan=buildPlan(pages,components,selected,{title:"Knowledge Review"});
 assert.equal(plan.assets.demoActuallyUsesReactLibrary,false);
 assert.ok(plan.assets.relatedReactComponentCandidates.length);
 assert.ok(toMarkdown(plan).includes("Knowledge Review"));
 assert.ok(toMarkdown(plan).includes("NOT compiled application code"));
});
test("fifth style has no implied React component support",()=>{
 const plan=buildPlan(pages,components,chooseTemplate(pages,{style:"neo-brutalist"}));
 assert.equal(plan.assets.reactComponentPackageCompatible,false);
 assert.equal(plan.assets.relatedReactComponentCandidates.length,0);
});
test("CLI listing and exact JSON plan",()=>{
 assert.ok(runCLI(["--list"]).includes("TPL-004"));
 assert.equal(JSON.parse(runCLI(["--template=TPL-003","--format=json"])).selection.styleId,"playful-pop");
 assert.throws(()=>runCLI(["--style=unknown"]),/Unknown style/);
});
test("page manifest references existing sources and indexed assets",()=>{
 const v=validatePageRegistry();assert.equal(v.templates,5);assert.ok(v.assets>=92);
});

test("React blueprint has verified integration flags and a separate Vite launch command",()=>{
 const blueprint=chooseTemplate(pages,{template:"TPL-005",style:"precision-dark"});
 const plan=buildPlan(pages,components,blueprint);
 assert.equal(plan.assets.demoActuallyUsesReactLibrary,true);
 assert.equal(plan.assets.reactComponentPackageCompatible,true);
 assert.equal(plan.runCommand,"npm run dev:workbench");
 assert.ok(plan.assets.relatedReactComponentCandidates.some(c=>c.status==="wired-in-demo"));
 assert.throws(()=>chooseTemplate(pages,{template:"TPL-005",style:"neo-brutalist"}),/Incompatible/);
});
