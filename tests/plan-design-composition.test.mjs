import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {planComposition,runCLI,toMarkdown} from "../scripts/plan-design-composition.mjs";
const load=name=>JSON.parse(fs.readFileSync("registry/"+name,"utf8"));
const data={styles:load("styles.json"),templates:load("page-templates.json"),
 components:load("components.json"),registry:load("assets.json")};

test("context proposes alternatives but never silently selects a default",()=>{
 const result=planComposition({context:"consumer-mobile",stack:"react"},data);
 assert.equal(result.selection.styleId,null);
 assert.equal(result.selection.templateId,null);
 assert.equal(result.options[0].page.id,"TPL-003");
 assert.equal(result.options[0].stack.adaptation,"framework-port-required");
 assert.ok(result.options[0].components.some(c=>c.status==="candidate-not-wired"));
 assert.ok(result.options[0].components.every(c=>c.status!=="wired-in-reference-demo"));
});

test("explicit React template includes only truly wired reference components",()=>{
 const result=planComposition({template:"TPL-005",stack:"react",behaviors:["IP-021"]},data);
 const option=result.options[0];
 assert.equal(result.selection.styleId,"precision-dark");
 assert.equal(result.selection.templateId,"TPL-005");
 assert.equal(option.stack.exampleUsesReactLibrary,true);
 assert.ok(option.components.some(c=>c.status==="wired-in-reference-demo"));
 assert.ok(option.interactions.some(c=>c.id==="IP-021"&&c.selection==="explicit"));
 assert.ok(option.interactions.find(c=>c.id==="IP-021").handoff.mode==="adapt-required");
});

test("non-React experimental style yields style-only handoff, no invented template",()=>{
 const x=planComposition({context:"sci-fi-game",style:"signal-noir",stack:"react"},data);
 assert.equal(x.selection.styleId,"signal-noir");
 assert.equal(x.selection.templateId,null);
 assert.equal(x.options.length,1);
 assert.equal(x.options[0].page,null);
 assert.equal(x.options[0].stack.reactThemeSupported,false);
 assert.equal(x.options[0].components.length,0);
 assert.equal(x.options[0].stack.adaptation,"page-design-required");
});
test("no unrelated fallback when context lacks registered style/blueprint",()=>{
 const x=planComposition({context:"totally-unknown-product-context"},data);
 assert.equal(x.options.length,0);
 assert.ok(x.warnings.some(w=>w.includes("No registered style/template")));
});
test("behavior suggestions use actual registry context and Chinese aliases",()=>{
 const x=planComposition({context:"workspace",style:"precision-dark",intent:"跨容器拖放"},data);
 assert.ok(x.options.every(o=>o.style.id==="precision-dark"));
 assert.ok(x.options.some(o=>o.interactions.some(b=>b.id==="IP-021"&&b.selection==="suggested")));
});
test("no silent template or style incompatibility, no bogus behavior",()=>{
 assert.throws(()=>planComposition({},data),/Specify --context/);
 assert.throws(()=>planComposition({style:"wrong"},data),/Unknown style/);
 assert.throws(()=>planComposition({template:"TPL-999"},data),/Unknown template/);
 assert.throws(()=>planComposition({template:"TPL-005",style:"playful-pop"},data),/Incompatible style/);
 assert.throws(()=>planComposition({template:"TPL-005",context:"consumer-mobile"},data),/not declared/);
 assert.throws(()=>planComposition({style:"precision-dark",behaviors:["UI-011"]},data),/Unknown\/non-interaction/);
 assert.throws(()=>planComposition({style:"precision-dark",behaviors:["IP-999"]},data),/Unknown\/non-interaction/);
 assert.throws(()=>planComposition({style:"precision-dark",behaviors:["IP-021","IP-021"]},data),/Invalid behavior IDs/);
 assert.throws(()=>planComposition({style:"precision-dark",stack:"vue"},data),/Unknown stack/);
});
test("style-bound behavior conflicts fail closed in synthetic registry",()=>{
 const modified=structuredClone(data);
 modified.registry.assets.find(a=>a.id==="IP-021").styleIds=["playful-pop"];
 assert.throws(()=>planComposition({style:"precision-dark",behaviors:["IP-021"]},modified),/incompatible with style/);
});
test("CLI JSON/Markdown are deterministic, source-grounded and nonexecuting",()=>{
 const args=["--context=knowledge-base","--stack=react","--intent=review"];
 const a=runCLI(args),b=runCLI(args);
 assert.equal(a,b);
 const plan=JSON.parse(a);
 assert.ok(plan.options.length>=1);
 assert.ok(plan.options.every(o=>o.style.tokens.css.startsWith("styles/")));
 assert.ok(plan.options.some(o=>o.page?.id==="TPL-007"));
 assert.ok(toMarkdown(plan).includes("Planning only"));
 assert.ok(runCLI(["--template=TPL-007","--format=markdown"]).includes("TPL-007"));
 assert.throws(()=>runCLI(["--context=workspace","--format=yaml"]),/Unknown format/);
});
