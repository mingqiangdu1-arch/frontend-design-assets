import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

export function reviewAudit(raw,styleId,registry){
 if(!raw || !Array.isArray(raw.findings))throw new Error("Expected Hallmark JSON findings array");
 const policy=registry?.styles?.[styleId];
 if(!policy)throw new Error("A registered explicit styleId is required: "+styleId);
 const protectedIds=new Set((policy.protectedFeatures||[]).map(x=>x.id));
 const findings=raw.findings.map(item=>{
  if(!item || item.gate==null || typeof item.grade!=="string" || typeof item.file!=="string")throw new Error("Malformed upstream finding");
  const rule=(policy.contextualReview||[]).find(x=>
   String(x.gate)===String(item.gate)
   && item.file.endsWith(x.file)
   && protectedIds.has(x.feature)
   && new RegExp(x.evidencePattern,"i").test(item.evidence||""));
  return {
   gate:String(item.gate),grade:item.grade,file:item.file,line:item.line||0,
   evidence:item.evidence||"",
   reviewOnly:rule?{feature:rule.feature,why:rule.reason}:null
  };
 });
 const grades={};
 for(const item of findings)grades[item.grade]=(grades[item.grade]||0)+1;
 return {styleId,total:findings.length,grades,findings,
  contextualCandidates:findings.filter(x=>x.reviewOnly),
  rawFindingsPreserved:findings.length===raw.findings.length,
  scopeNote:"This upstream run scans an entire multi-scene CSS/HTML file, not Pixel Arcade in isolation.",
  policyNote:"Candidates for visual review only. No finding is automatically dismissed, downgraded or suppressed."};
}
export function compareAudits(before,after,styleId,registry){
 const a=reviewAudit(before,styleId,registry),b=reviewAudit(after,styleId,registry);
 const grades=[...new Set([...Object.keys(a.grades),...Object.keys(b.grades)])].sort();
 const lines=[
  "# "+styleId+" · advisory source-audit comparison","",
  "**Not an accessibility, visual, or production quality score.** This report retains every upstream finding.",
  "",
  "| Grade | Baseline | Candidate | Difference |","|---|---:|---:|---:|"
 ];
 for(const grade of grades)lines.push("| "+grade+" | "+(a.grades[grade]||0)+" | "+(b.grades[grade]||0)+" | "+((b.grades[grade]||0)-(a.grades[grade]||0))+" |");
 lines.push("| Total | "+a.total+" | "+b.total+" | "+(b.total-a.total)+" |",
  "", "## Contextual review candidates (never automatic waivers)", "",
  "Baseline "+a.contextualCandidates.length+" / "+a.total+"; candidate "+b.contextualCandidates.length+" / "+b.total+".",
  "");
 if(!b.contextualCandidates.length)lines.push("No narrow rule matched. Inspect the entire original source and rendered page; do not infer that no genre-specific conflicts exist.");
 for(const item of b.contextualCandidates.slice(0,16))lines.push("- "+item.grade+" gate "+item.gate+" at "+item.file+":"+item.line+": **"+item.reviewOnly.feature+"** — "+item.reviewOnly.why);
 lines.push("","## Required validation","",
  "- Inspect context and rendered pixels before treating a Hallmark house rule as a defect.",
  "- Keep all quest feedback, keyboard state, body readability, 390/768/1440 responsive coverage and original CSS pixel illustration.",
  "- The raw scan covers FOUR different styles and cannot be used as a pixel-only defect count.",
  "- Never auto-publish, auto-merge, create a golden visual baseline or declare a11y compliance from lint totals.",
  "");
 return {baseline:a,candidate:b,markdown:lines.join("\n")};
}
export function runCLI(argv=process.argv.slice(2)){
 if(argv.length!==4)throw new Error("usage: node scripts/triage-genre-audit.mjs <baseline.json> <candidate.json> <styleId> <policy.json>");
 const [baseline,candidate,styleId,registry]=argv;
 const result=compareAudits(
  JSON.parse(fs.readFileSync(baseline,"utf8")),
  JSON.parse(fs.readFileSync(candidate,"utf8")),
  styleId,
  JSON.parse(fs.readFileSync(registry,"utf8"))
 );
 process.stdout.write(result.markdown+"\n");
 return result;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{runCLI();}catch(err){console.error(err.message);process.exitCode=2;}
}
