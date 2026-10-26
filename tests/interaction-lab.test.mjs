import test from "node:test";
import assert from "node:assert/strict";
import {records,archiveRecord,undoArchive,moveItem,wizardSteps,validateWizard,nextWizardStep,previousWizardStep,clampSplit} from "../playground/interaction-lab/model.mjs";
test("archive returns snapshot and undo restores original position",()=>{
 const r=archiveRecord(records,"PR-102");
 assert.deepEqual(r.items.map(x=>x.id),["PR-101","PR-103"]);
 assert.deepEqual(undoArchive(r.items,r.snapshot),records);
 assert.deepEqual(records.map(x=>x.id),["PR-101","PR-102","PR-103"]);
});
test("undo is idempotent and unknown archive is not destructive",()=>{
 assert.deepEqual(undoArchive(records,null),records);
 assert.equal(archiveRecord(records,"missing").snapshot,null);
 const r=archiveRecord(records,"PR-101");
 const restored=undoArchive(r.items,r.snapshot);
 assert.deepEqual(undoArchive(restored,r.snapshot),records);
});
test("move sequence respects boundaries and immutable updates",()=>{
 const ids=["a","b","c"];
 assert.deepEqual(moveItem(ids,"b",-1),["b","a","c"]);
 assert.deepEqual(moveItem(ids,"b",1),["a","c","b"]);
 assert.deepEqual(moveItem(ids,"a",-1),ids);
 assert.deepEqual(moveItem(ids,"unknown",1),ids);
 assert.deepEqual(ids,["a","b","c"]);
});
test("wizard validation and back maintain step order",()=>{
 const data={name:"",styleId:""};
 assert.ok(validateWizard(0,data));
 assert.equal(nextWizardStep(0,data).step,0);
 data.name="Design";assert.equal(nextWizardStep(0,data).step,1);
 assert.ok(validateWizard(1,data));
 data.styleId="neo-brutalist";assert.equal(nextWizardStep(1,data).step,2);
 assert.equal(previousWizardStep(2),1);
 assert.equal(wizardSteps.length,3);
});
test("split bounds clamp invalid and extreme numeric values",()=>{
 assert.equal(clampSplit(5),25);assert.equal(clampSplit(100),75);
 assert.equal(clampSplit("50"),50);assert.equal(clampSplit("oops"),50);
});
