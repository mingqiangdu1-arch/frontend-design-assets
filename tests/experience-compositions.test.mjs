import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {experienceRegistry,validateExperienceRegistry,createExperienceDirections} from "../scripts/experience-compositions.mjs";
const assetRegistry=JSON.parse(fs.readFileSync("registry/assets.json","utf8"));
test("16 original architecture recipes cover diverse product contexts",()=>{
 const s=validateExperienceRegistry(experienceRegistry,assetRegistry.assets);
 assert.equal(s.recipes,16);
 assert.equal(s.contexts,24);
 assert.equal(experienceRegistry.defaultRecipeId,null);
 assert.ok(experienceRegistry.recipes.every(r=>r.stage==="research-brief-only"));
});
test("mobile alternatives have distinct structures without choosing a theme",()=>{
 const opts={context:"consumer-mobile",styleId:"playful-pop"};
 const a=createExperienceDirections(opts,assetRegistry.assets,assetRegistry.reusePolicies);
 const b=createExperienceDirections(opts,assetRegistry.assets,assetRegistry.reusePolicies);
 assert.deepEqual(a,b);
 assert.equal(a.length,2);
 assert.notEqual(a[0].spatialModel,a[1].spatialModel);
 assert.notEqual(a[0].navigation,a[1].navigation);
 assert.ok(a.every(c=>c.behaviorReferences.every(ref=>ref.status==="adapt-required")));
 assert.ok(a.every(c=>c.status==="research-brief-only"));
});
test("unknown context has no fallback and recipe count is bounded",()=>{
 assert.deepEqual(createExperienceDirections({context:"unlisted-thing"},assetRegistry.assets),[]);
 assert.deepEqual(createExperienceDirections({},assetRegistry.assets),[]);
 assert.deepEqual(createExperienceDirections({context:"workspace",limit:0},assetRegistry.assets),[]);
 assert.throws(()=>createExperienceDirections({context:"workspace",limit:5},assetRegistry.assets),/concept count/);
});
test("validations reject ghost assets, defaults and duplicate structures",()=>{
 const a=structuredClone(experienceRegistry);a.defaultRecipeId="XC-001";
 assert.throws(()=>validateExperienceRegistry(a,assetRegistry.assets),/must not have a default/);
 const b=structuredClone(experienceRegistry);b.recipes[0].assetIds=["IP-999"];
 assert.throws(()=>validateExperienceRegistry(b,assetRegistry.assets),/Unknown\/non-interaction/);
 const c=structuredClone(experienceRegistry);c.recipes[1].structure=c.recipes[0].structure;
 assert.throws(()=>validateExperienceRegistry(c,assetRegistry.assets),/Duplicated structure/);
});
