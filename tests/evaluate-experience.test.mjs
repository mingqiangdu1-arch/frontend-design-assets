import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {FIT_AXES,FIT_BASIS,validateFitProfile,validateFitConstraints,evaluateFitProfile,rankExperienceRecipes} from "../scripts/evaluate-experience.mjs";
import {createExperienceDirections,experienceRegistry} from "../scripts/experience-compositions.mjs";
const data=JSON.parse(fs.readFileSync("registry/assets.json","utf8"));
test("all 16 recipes declare bounded four-axis profiles and tradeoffs",()=>{
 for(const r of experienceRegistry.recipes)assert.equal(validateFitProfile(r.fitProfile,r.id),true);
 assert.deepEqual(Object.keys(FIT_AXES),["density","device","complexity","expression"]);
 const broken=structuredClone(experienceRegistry.recipes[0].fitProfile);
 broken.device="wall";
 assert.throws(()=>validateFitProfile(broken),/Invalid device/);
 assert.throws(()=>validateFitConstraints({density:"anything"}),/Unknown density/);
 assert.throws(()=>validateFitConstraints({surprise:"yes"}),/Unknown fit criterion/);
});
test("unconstrained design remains unranked with no hidden aesthetic winner",()=>{
 const rows=createExperienceDirections({context:"consumer-mobile"},data.assets,data.reusePolicies);
 assert.equal(rows.length,2);
 assert.ok(rows.every(r=>r.fitEvaluation.status==="not-assessed"&&r.fitEvaluation.score===null));
 assert.ok(rows.every(r=>r.fitEvaluation.relative==="not-ranked"));
});
test("low-density simple mobile brief favors one-task focus over chapter map",()=>{
 const fit={density:"low",device:"mobile",complexity:"simple",expression:"restrained"};
 const rows=createExperienceDirections({context:"consumer-mobile",fit},data.assets,data.reusePolicies);
 assert.deepEqual(rows.map(x=>x.id),["XC-003","XC-004"]);
 assert.equal(rows[0].fitEvaluation.score,8);
 assert.equal(rows[0].fitEvaluation.maxScore,8);
 assert.equal(rows[0].fitEvaluation.relative,"leading-hypothesis");
 assert.equal(rows[1].fitEvaluation.relative,"tradeoff-alternative");
 assert.ok(rows[0].fitEvaluation.criteria.every(x=>x.fit==="aligned"));
 assert.equal(rows[0].fitEvaluation.status,FIT_BASIS);
});
test("guided expressive mobile journey reverses the ordering with reasons",()=>{
 const rows=createExperienceDirections({context:"consumer-mobile",fit:{density:"medium",device:"mobile",complexity:"guided",expression:"expressive"}},data.assets,data.reusePolicies);
 assert.deepEqual(rows.map(x=>x.id),["XC-004","XC-003"]);
 assert.equal(rows[0].fitEvaluation.score,8);
 assert.ok(rows[0].fitEvaluation.tradeoff.includes("fallback"));
 assert.ok(rows[1].fitEvaluation.criteria.some(x=>x.fit==="partial"||x.fit==="conflict"));
});
test("single preference never masquerades as complete product quality",()=>{
 const rows=createExperienceDirections({context:"workspace",fit:{device:"mobile"}},data.assets,data.reusePolicies);
 assert.equal(rows[0].fitEvaluation.maxScore,2);
 assert.equal(rows[0].fitEvaluation.criteria.length,1);
 assert.match(rows[0].fitEvaluation.caveat,/not verified visual quality/);
});
test("tie is explicit and score is limited to declared dimensions",()=>{
 const selected=experienceRegistry.recipes.slice(2,4);
 const tied=rankExperienceRecipes(selected,{device:"mobile"});
 assert.equal(tied[0].fitEvaluation.score,tied[1].fitEvaluation.score);
 assert.ok(tied.every(x=>x.fitEvaluation.relative==="tied-hypothesis"));
 const empty=rankExperienceRecipes(selected,{});
 assert.deepEqual(empty.map(x=>x.id),selected.map(x=>x.id));
 assert.equal(empty[0].fitEvaluation.score,null);
});

test("relative ranking never describes universally conflicting hypotheses as winners",()=>{
 const opposite=structuredClone(experienceRegistry.recipes[2]);
 const alt=structuredClone(experienceRegistry.recipes[2]);alt.id="XC-900";
 const ranked=rankExperienceRecipes([opposite,alt],
   {density:"high",device:"desktop",complexity:"expert",expression:"immersive"});
 assert.ok(ranked.every(x=>x.fitEvaluation.score===0));
 assert.ok(ranked.every(x=>x.fitEvaluation.relative==="weak-fit-hypothesis"));
 assert.equal(ranked[0].fitEvaluation.maxScore,8);
 const only=rankExperienceRecipes([opposite],{device:"mobile"});
 assert.equal(only[0].fitEvaluation.relative,"only-indexed-candidate");
});
