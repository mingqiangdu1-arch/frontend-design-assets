import test from "node:test";
import assert from "node:assert/strict";
import {validateCreative} from "../scripts/check-creative-directions.mjs";
test("new experimental art directions reference existing independent style profiles and stage boundaries",()=>{
 const result=validateCreative();
 assert.equal(result.directions,4);
 assert.equal(result.registeredStyles,15);
 assert.ok(result.assetCount>=117,"Asset library may grow without invalidating creative grammar");
 assert.equal(result.reactExperimentalThemes,0);
});
