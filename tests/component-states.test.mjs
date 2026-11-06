import test from "node:test";
import assert from "node:assert/strict";
import {validateMatrix} from "../scripts/check-component-states.mjs";
test("declared component states are real, scoped and transparently incomplete",()=>{
 const r=validateMatrix();
 assert.equal(r.coveredExports,12);
 assert.equal(r.explicitUncovered,36);
 assert.equal(r.styles,4);
});
