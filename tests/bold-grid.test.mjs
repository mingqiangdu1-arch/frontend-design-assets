import test from "node:test";
import assert from "node:assert/strict";
import {samples,categories,selectCategory,toggleSaved,shouldAnimate} from "../playground/bold-grid/model.mjs";
test("six unique bold-grid samples with known categories",()=>{
 assert.equal(samples.length,6);
 assert.equal(new Set(samples.map(x=>x.id)).size,6);
 assert.ok(samples.every(x=>categories.includes(x.category)));
});
test("filtering is deterministic and non-mutating",()=>{
 const result=selectCategory(samples,"tool");
 assert.equal(result.length,2);
 assert.equal(samples.length,6);
 assert.equal(selectCategory(samples,"all").length,6);
 assert.throws(()=>selectCategory(samples,"invalid"),/Unknown/);
});
test("saved state toggles both ways without mutating original",()=>{
 const old=new Set(["BG-01"]);
 const next=toggleSaved(old,"BG-01");
 assert.equal(next.has("BG-01"),false);
 assert.equal(old.has("BG-01"),true);
 assert.equal(toggleSaved(next,"BG-01").has("BG-01"),true);
});
test("reduced motion and unsupported browsers fall back to immediate updates",()=>{
 assert.equal(shouldAnimate(true,true),false);
 assert.equal(shouldAnimate(false,false),false);
 assert.equal(shouldAnimate(false,true),true);
});
