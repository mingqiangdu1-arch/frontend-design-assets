import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {assembleStyleBrief,toAssemblyMarkdown,validateStyleAssembly} from "../scripts/style-assembly.mjs";
import {parseStyleBriefArgs,runCLI} from "../scripts/build-style-brief.mjs";

const read=f=>JSON.parse(fs.readFileSync("registry/"+f,"utf8"));
const data={styles:read("styles.json"),facets:read("style-facets.json"),
 assembly:read("style-assembly.json"),components:read("components.json"),
 templates:read("page-templates.json"),experiences:read("experience-compositions.json"),
 assets:read("assets.json")};
const request=(style,other={})=>assembleStyleBrief(data,{style,...other});

test("15 assembly grammars and 61 unique, concrete page sections reference registered sources",()=>{
 const v=validateStyleAssembly(data);
 assert.equal(v.styles,15);
 assert.equal(v.sections,61);
 assert.equal(v.defaultStyleId,null);
 const structures=data.assembly.recipes.map(x=>x.structureId);
 assert.equal(new Set(structures).size,15);
 for(const style of data.styles.styles){
  const r=request(style.id);
  assert.equal(r.theme.id,style.id);
  assert.equal(r.request.template,null);
  assert.equal(r.status,"research-handoff-not-code");
  assert.equal(r.integration.productionReady,false);
  assert.ok(r.page.sections.length>=4);
  assert.equal(r.templates.selected,null);
 }
});
test("no default, no invented application contexts, no unbound page templates",()=>{
 assert.throws(()=>assembleStyleBrief(data,{}),/Explicit --style/);
 assert.throws(()=>request("not-a-style"),/Unknown style/);
 assert.throws(()=>request("organic-tactile",{context:"developer-tool"}),/not declared/);
 assert.throws(()=>request("organic-tactile",{template:"TPL-007"}),/not bound/);
 assert.throws(()=>request("editorial-warm",{context:"reading",template:"TPL-007"}),/does not support/);
 assert.throws(()=>request("shape-expressive",{stack:"auto-import"}),/Unsupported stack/);
});
test("real editorial React template is explicitly selected and components accurately sourced",()=>{
 const r=request("editorial-warm",{context:"publication",template:"TPL-007",stack:"react",device:"desktop"});
 assert.equal(r.templates.selected,"TPL-007");
 assert.equal(r.templates.selectedSource.implementation,"react-vite");
 assert.equal(r.integration.themePortRequired,false);
 assert.equal(r.integration.templatePortRequired,false);
 assert.equal(r.theme.reactCompatible,true);
 assert.ok(r.reactComponents.length>=2);
 assert.ok(r.reactComponents.every(c=>data.components.entries.some(x=>x.id===c.id&&x.source===c.source)));
 assert.ok(r.templates.options.some(x=>x.id==="TPL-002"&&x.selection==="not-selected"));
 assert.equal(r.integration.productionReady,false);
});
test("independent theme with requested React output requires explicit manual port, never supplies fake package exports",()=>{
 const r=request("liquid-layer",{context:"media-gallery",stack:"react",device:"mobile",
  title:"可视化画廊",goal:"用户在两个方案之间比较视觉变化"});
 assert.equal(r.integration.themePortRequired,true);
 assert.equal(r.theme.reactCompatible,false);
 assert.deepEqual(r.reactComponents,[]);
 assert.equal(r.templates.options.length,0);
 assert.equal(r.page.sections[1].id,"toolbar");
 assert.ok(r.warnings.some(s=>s.includes("NOT supported")));
 assert.ok(r.warnings.some(s=>s.includes("No runnable page template")));
 assert.match(toAssemblyMarkdown(r),/可视化画廊/);
 assert.match(toAssemblyMarkdown(r),/manual CSS/i);
});
test("an explicitly selected static page template targeting React records framework port separately",()=>{
 const r=request("commerce-atelier",{context:"product-catalog",stack:"react",template:"TPL-006"});
 assert.equal(r.templates.selected,"TPL-006");
 assert.equal(r.integration.themePortRequired,true);
 assert.equal(r.integration.templatePortRequired,true);
 assert.deepEqual(r.reactComponents,[]);
 assert.equal(r.templates.selectedSource.implementation,"independent-static-js");
});
test("existing React theme without a chosen runnable template does not auto-select one",()=>{
 const r=request("editorial-warm",{context:"knowledge-base",stack:"react"});
 assert.equal(r.templates.selected,null);
 assert.ok(r.templates.options.length===2);
 assert.ok(r.warnings.some(x=>x.includes("never auto-selected")));
 assert.ok(r.reactComponents.every(x=>x.status==="candidate-not-wired"));
});
test("CLI supports deterministic Markdown and JSON, rejects invalid and duplicate arguments",()=>{
 const result=JSON.parse(runCLI(["--style=type-led-minimal","--stack=static","--format=json"]));
 assert.equal(result.page.structureId,"indexed-brand-story");
 assert.equal(result.theme.source.profile,"styles/type-led-minimal/style.json");
 const md=runCLI(["--style=precision-dark","--template=TPL-005","--context=developer-tool","--stack=react"]);
 assert.match(md,/TPL-005/);
 assert.match(md,/wired-in-selected-demo|candidate-not-wired/);
 assert.match(md,/Acceptance checklist/);
 assert.throws(()=>runCLI([]),/Explicit --style/);
 assert.throws(()=>parseStyleBriefArgs(["--style=a","--style=b"]),/Duplicate/);
 assert.throws(()=>parseStyleBriefArgs(["--context="]),/Empty/);
 assert.throws(()=>parseStyleBriefArgs(["--publish=true"]),/Unknown/);
});
test("validator detects duplicate theme, nonexistent template, invalid hints and wrong source path",()=>{
 const bad=structuredClone(data);
 bad.assembly.recipes[1].styleId=bad.assembly.recipes[0].styleId;
 assert.throws(()=>validateStyleAssembly(bad),/Unknown\/duplicate/);
 const wrong=structuredClone(data);
 wrong.assembly.recipes[0].templateIds=["TPL-007"];
 assert.throws(()=>validateStyleAssembly(wrong),/Template mismatch/);
 const hint=structuredClone(data);
 hint.assembly.recipes.at(-1).componentHints=["Button"];
 assert.throws(()=>validateStyleAssembly(hint),/Unsupported component hint/);
 const pathData=structuredClone(data);
 pathData.styles.styles[0].tokens.css="../secrets.txt";
 assert.throws(()=>validateStyleAssembly(pathData),/Unsafe style source path/);
});
