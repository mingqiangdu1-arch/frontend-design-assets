import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const grades=["FAIL","REFLEX","WARN","WAIVED","REJECTED","ANSWERED","DISMISSED"];
export function summarizeAudit(data){
 if(!data||typeof data!=="object"||!Array.isArray(data.findings))throw Error("Expected Hallmark JSON with a findings array");
 const counts=Object.fromEntries(grades.map(g=>[g,0]));
 const gates=new Map();
 for(const f of data.findings){
  if(!f||typeof f.grade!=="string"||f.gate==null)throw Error("Malformed Hallmark finding");
  counts[f.grade]=(counts[f.grade]||0)+1;
  const key=String(f.gate)+" / "+f.grade;
  gates.set(key,(gates.get(key)||0)+1);
 }
 return {total:data.findings.length,counts,gates};
}
export function compareAudits(before,after,{label="Design review"}={}){
 const a=summarizeAudit(before),b=summarizeAudit(after);
 const keys=new Set([...a.gates.keys(),...b.gates.keys()]);
 const changed=[...keys].map(key=>({key,before:a.gates.get(key)||0,after:b.gates.get(key)||0}))
  .filter(x=>x.before!==x.after).sort((x,y)=>Math.abs(y.after-y.before)-Math.abs(x.after-x.before)||x.key.localeCompare(y.key));
 return {label,before:a,after:b,changed};
}
export function formatReport(comparison){
 const {label,before,after,changed}=comparison;
 const row=(title,b,a)=>"| "+title+" | "+b+" | "+a+" | "+(a-b>0?"+":"")+(a-b)+" |";
 const out=[
  "# "+label+" — Hallmark source audit (advisory)","","**Not a design quality score or accessibility certification.** Hallmark FAIL/REFLEX can encode its own genre/house rules. Review the actual rule, screenshots and behavior before accepting changes.","",
  "| Grade | Baseline | Candidate | Change |","|---|---:|---:|---:|",
  row("All",before.total,after.total),
  ...grades.filter(g=>before.counts[g]||after.counts[g]).map(g=>row(g,before.counts[g]||0,after.counts[g]||0)),
  "","## Changed gate counts",""
 ];
 if(!changed.length)out.push("No changed gate counts; verify visual and functional changes independently.");
 else{
  out.push("| Gate / grade | Baseline | Candidate | Change |","|---|---:|---:|---:|");
  out.push(...changed.slice(0,30).map(x=>row(x.key,x.before,x.after)));
 }
 out.push("","## Review contract","","- Preserve functional tests, source/data truthfulness and interaction semantics.","- Keep genre-specific typography and visual language unless the actual product brief requires changing them.","- Inspect 390/768/1440 screenshots, keyboard focus and relevant content/overflow behavior.","- Do not merge solely because the number of Hallmark findings fell.","");
 return out.join("\n");
}
export function runCLI(argv=process.argv.slice(2)){
 if(argv.length<2||argv.length>3)throw Error("usage: node scripts/report-design-audit.mjs baseline.json candidate.json [label]");
 const [base,candidate,label="Design review"]=argv;
 const result=compareAudits(JSON.parse(fs.readFileSync(base,"utf8")),JSON.parse(fs.readFileSync(candidate,"utf8")),{label});
 process.stdout.write(formatReport(result)+"\n");
 return result;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{runCLI();}catch(e){console.error(e.message);process.exitCode=2;}
}
