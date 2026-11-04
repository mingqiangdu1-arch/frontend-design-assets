import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {fileURLToPath} from "node:url";
const pattern=/^(matrix-(refined-light-saas|precision-dark|editorial-warm|playful-pop)-(390|768|1440)|workbench-(390|768|1440)|editorial-react-(390|768|1440)|commerce-(390|768|1440)|creative-(pixel-arcade|signal-noir|paper-rebellion|aether-orbit)-(390|768|1440)|asset-explorer-(390|768|1440)|visual-(gallery|editorial|mobile)-(390|768|1440))\.png$/;
export function collectEvidence(dir){
 if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir).filter(name=>pattern.test(name)).sort().map(name=>{
  const data=fs.readFileSync(path.join(dir,name));
  const pngSignature=Buffer.from([137,80,78,71,13,10,26,10]);
  if(data.length<24||!data.subarray(0,8).equals(pngSignature))throw Error("Invalid PNG: "+name);
  return {file:name,bytes:data.length,sha256:crypto.createHash("sha256").update(data).digest("hex")};
 });
}
export function captureEvidence({dir="test-results",out="test-results/visual-evidence.json",commit="unknown"}={}){
 const files=collectEvidence(dir);
 if(!files.length)throw Error("No supported PNGs found; run browser screenshot tests first");
 const record={schemaVersion:"1.0",status:"capture-only-unapproved",commit,files,
  warning:"Evidence captured only. No human visual or cross-browser approval is implied."};
 fs.mkdirSync(path.dirname(out),{recursive:true});
 fs.writeFileSync(out,JSON.stringify(record,null,2)+"\n");
 return record;
}
export function verifyApproved({dir="test-results",approval="registry/visual-baselines.json"}={}){
 const baseline=JSON.parse(fs.readFileSync(approval,"utf8"));
 if(!baseline.approved||!Object.keys(baseline.approved).length)throw Error("No human-approved baselines. Capture is not visual regression verification.");
 const evidence=collectEvidence(dir);
 const current=new Map(evidence.map(x=>[x.file,x.sha256]));
 for(const [file,entry] of Object.entries(baseline.approved)){
  if(!entry?.reviewer||!entry?.reviewedAt||!entry?.sourceCommit||!entry?.sha256)throw Error("Incomplete manual approval for "+file);
  if(!current.has(file))throw Error("Approved screenshot missing: "+file);
  if(current.get(file)!==entry.sha256)throw Error("Screenshot hash differs from manually approved "+file);
 }
 return Object.keys(baseline.approved).length;
}
const isMain=process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(isMain){
 const command=process.argv[2]||"capture";
 const flags=Object.fromEntries(process.argv.slice(3).filter(x=>x.startsWith("--")).map(x=>{const i=x.indexOf("=");return i<0?[x.slice(2),true]:[x.slice(2,i),x.slice(i+1)];}));
 try{
  if(command==="capture"){
   const record=captureEvidence({dir:flags.dir||"test-results",out:flags.out||"test-results/visual-evidence.json",commit:flags.commit||process.env.GITHUB_SHA||"local"});
   console.log("CAPTURED "+record.files.length+" PNGs; UNAPPROVED; manifest at "+(flags.out||"test-results/visual-evidence.json"));
  }else if(command==="verify"){
   console.log("VERIFIED "+verifyApproved({dir:flags.dir||"test-results",approval:flags.approval||"registry/visual-baselines.json"})+" human-approved SHA256 baselines");
  }else throw Error("Use capture or verify");
 }catch(e){console.error(e.message);process.exitCode=1;}
}
