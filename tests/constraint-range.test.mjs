import test from "node:test";
import assert from "node:assert/strict";
import {validateRangeConfig,validateRange,moveRangeHandle,stepRangeHandle} from "../interactions/research/constraint-range.mjs";
const config={min:0,max:100,step:5,minSpan:15};
test("dual handles snap without crossing or mutating the other handle",()=>{
 const base=[20,65];
 assert.deepEqual(moveRangeHandle(base,"low",57,config),[50,65]);
 assert.deepEqual(moveRangeHandle(base,"high",22,config),[20,35]);
 assert.deepEqual(moveRangeHandle(base,"low",-50,config),[0,65]);
 assert.deepEqual(moveRangeHandle(base,"high",900,config),[20,100]);
 assert.deepEqual(base,[20,65]);
});
test("keyboard steps support precision and larger moves with deterministic clamping",()=>{
 assert.deepEqual(stepRangeHandle([20,65],"low",1,config),[25,65]);
 assert.deepEqual(stepRangeHandle([20,65],"high",-1,config,{large:true}),[20,35]);
 assert.deepEqual(stepRangeHandle([0,100],"low",-1,config),[0,100]);
});
test("fractional ranges and invalid configs fail explicitly",()=>{
 const decimal={min:-1,max:1,step:0.1,minSpan:0.3};
 assert.deepEqual(moveRangeHandle([-0.5,0.7],"low",0.47,decimal),[0.4,0.7]);
 assert.deepEqual(validateRange([0.4,0.7],decimal),[0.4,0.7]);
 assert.throws(()=>validateRangeConfig({min:0,max:1,step:0.3,minSpan:0.1}),/step-aligned/);
 assert.throws(()=>validateRange([15,10],config),/Invalid range/);
 assert.throws(()=>moveRangeHandle([20,65],"middle",30,config),/Unknown range handle/);
 assert.throws(()=>stepRangeHandle([20,65],"low",2,config),/direction/);
});
