import test from "node:test";
import assert from "node:assert/strict";
import {ratio,inspectTheme,auditAll} from "../scripts/contrast-audit.mjs";
test("WCAG contrast reference pairs",()=>{
 assert.equal(+ratio("#000000","#ffffff").toFixed(2),21);
 assert.equal(+ratio("#ffffff","#ffffff").toFixed(2),1);
 assert.ok(ratio("#FF785D","#FFFFFF")<4.5);
 assert.ok(ratio("#48291F","#FF785D")>=4.5);
});
test("invalid colors cannot silently pass",()=>{
 assert.throws(()=>ratio("red","#ffffff"),/Unsupported/);
});
test("inspects normal/secondary/muted with threshold",()=>{
 const checks=inspectTheme({colors:{text:"#000000",textSecondary:"#333333",textMuted:"#777777",canvas:"#FFFFFF",surface:"#FFFFFF",accent:"#000000",accentText:"#FFFFFF"}});
 assert.ok(checks.every(x=>x.pass));
});
test("all repository theme tokens are scoped and have sufficient contrast",()=>{
 const results=auditAll();
 assert.ok(results.length>=4);
 const fail=results.flatMap(x=>x.checks.filter(c=>!c.pass).map(c=>x.styleId+" "+c.name+" "+c.ratio));
 assert.deepEqual(fail,[]);
});
