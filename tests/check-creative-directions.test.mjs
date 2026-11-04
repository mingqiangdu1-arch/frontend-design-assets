import test from "node:test";
import assert from "node:assert/strict";
import {validateCreative} from "../scripts/check-creative-directions.mjs";
test("new experimental art directions reference existing independent style profiles and stage boundaries",()=>{
 const result=validateCreative();
 assert.equal(result.directions,4);
 assert.equal(result.registeredStyles,10);
 assert.equal(result.assetCount,117);
 assert.equal(result.reactExperimentalThemes,0);
});
