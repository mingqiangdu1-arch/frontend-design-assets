import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {collectEvidence,captureEvidence,verifyApproved} from "../scripts/visual-evidence.mjs";
function fixture(fn){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"fda-visual-"));
 try{return fn(dir);}finally{fs.rmSync(dir,{recursive:true,force:true});}
}
const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),Buffer.alloc(30)]);
test("no screenshot means no captured evidence or claims",()=>fixture(dir=>{
 assert.deepEqual(collectEvidence(dir),[]);
 assert.throws(()=>captureEvidence({dir,out:path.join(dir,"data.json")}),/No supported PNGs/);
}));
test("captured evidence is clearly UNAPPROVED with hashes",()=>fixture(dir=>{
 fs.writeFileSync(path.join(dir,"matrix-playful-pop-390.png"),png);
 fs.writeFileSync(path.join(dir,"unrelated-secret.png"),png);
 const result=captureEvidence({dir,out:path.join(dir,"evidence.json"),commit:"abc"});
 assert.equal(result.files.length,1);assert.equal(result.status,"capture-only-unapproved");
 assert.match(result.files[0].sha256,/^[a-f0-9]{64}$/);
 assert.ok(!result.files[0].file.includes("secret"));
}));
test("approval verification refuses empty and incomplete approvals",()=>fixture(dir=>{
 fs.writeFileSync(path.join(dir,"matrix-editorial-warm-768.png"),png);
 const file=path.join(dir,"baselines.json");
 fs.writeFileSync(file,JSON.stringify({approved:{}}));
 assert.throws(()=>verifyApproved({dir,approval:file}),/No human-approved/);
 fs.writeFileSync(file,JSON.stringify({approved:{"matrix-editorial-warm-768.png":{sha256:"fake"}}}));
 assert.throws(()=>verifyApproved({dir,approval:file}),/Incomplete manual approval/);
}));
test("verified hashes are exact after explicit approval metadata",()=>fixture(dir=>{
 const fileName="matrix-editorial-warm-768.png";fs.writeFileSync(path.join(dir,fileName),png);
 const sha=collectEvidence(dir)[0].sha256,approved=path.join(dir,"baselines.json");
 fs.writeFileSync(approved,JSON.stringify({approved:{[fileName]:{sha256:sha,reviewer:"human",reviewedAt:"2026-10-26",sourceCommit:"reviewed-commit"}}}));
 assert.equal(verifyApproved({dir,approval:approved}),1);
 fs.writeFileSync(path.join(dir,fileName),Buffer.concat([png,Buffer.from([1])]));
 assert.throws(()=>verifyApproved({dir,approval:approved}),/differs/);
}));
