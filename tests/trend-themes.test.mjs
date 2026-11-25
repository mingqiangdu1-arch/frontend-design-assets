import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {auditAll} from "../scripts/contrast-audit.mjs";
import {directionIds,validStyle,stories,storyFor,materialName} from "../playground/trend-style-lab/app.mjs";

const styles=JSON.parse(fs.readFileSync("registry/styles.json","utf8"));
const assets=JSON.parse(fs.readFileSync("registry/assets.json","utf8"));
const implementedThemes=JSON.parse(fs.readFileSync("registry/components.json","utf8")).styleIds;
const sample=fs.readFileSync("playground/trend-style-lab/index.html","utf8");

test("2026 trend profile candidates are four distinct registered styles with no implicit default",()=>{
 assert.equal(styles.defaultStyleId,null);
 assert.equal(styles.styles.length,15);
 assert.deepEqual(directionIds,["liquid-layer","shape-expressive","type-led-minimal","organic-tactile"]);
 for(const [i,id] of directionIds.entries()){
  const style=styles.styles.find(item=>item.id===id);
  const asset=assets.assets.find(item=>item.id==="DT-"+String(i+11).padStart(3,"0"));
  assert.equal(style.id,id);
  assert.deepEqual(asset.styleIds,[id]);
  assert.equal(asset.reuseKind,"style-token");
  assert.equal(asset.stage,"prototype");
  assert.equal(style.demo,"playground/trend-style-lab/index.html");
  const profile=JSON.parse(fs.readFileSync(style.styleProfile,"utf8"));
  const token=JSON.parse(fs.readFileSync(style.tokens.json,"utf8"));
  const css=fs.readFileSync(style.tokens.css,"utf8");
  assert.equal(profile.id,id);
  assert.equal(token.id,id);
  assert.equal(profile.assetId,asset.id);
  assert.ok(css.includes('[data-design-theme="'+id+'"]'));
  assert.ok(!/(^|\n)\s*:root\s*\{/.test(css));
  assert.ok(sample.includes('data-scene="'+id+'"'));
  assert.ok(sample.includes('data-direction="'+id+'"'));
  assert.ok(profile.categoryHints.length>=3);
  assert.ok(token.layout.other.length>=2);
  assert.ok(token.negativeConstraints.length>=3);
 }
});
test("2026 original theme tokens pass all built-in contrast and scoped CSS consistency audits",()=>{
 const result=auditAll();
 assert.equal(result.length,15);
 const newThemes=result.filter(v=>directionIds.includes(v.styleId));
 assert.equal(newThemes.length,4);
 assert.deepEqual(newThemes.flatMap(x=>x.checks.filter(c=>!c.pass)),[]);
});
test("four standalone research scenes do not expand React theme compatibility",()=>{
 assert.equal(implementedThemes.length,4);
 for(const id of directionIds)assert.ok(!implementedThemes.includes(id));
 const bridge=fs.readFileSync("packages/ui/src/themes.css","utf8");
 for(const id of directionIds)assert.ok(!bridge.includes('[data-design-theme="'+id+'"]'));
});
test("local interactions validate direction names, story range and original material palette",()=>{
 assert.equal(validStyle("liquid-layer"),"liquid-layer");
 assert.equal(validStyle("unregistered"),null);
 assert.equal(stories.length,3);
 assert.equal(storyFor(1).name,"Method");
 assert.equal(storyFor(900),null);
 assert.equal(materialName("clay"),"陶土");
 assert.equal(materialName("unknown"),null);
});
