import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";

// Registry policy is authoritative in the CLI. This fallback keeps direct
// searchAssets() calls useful with small fixtures and legacy manifests.
const FALLBACK_MODES=Object.freeze({
 "style-token":"copyable-source",
 "styled-implementation":"copyable-source",
 "behavior-pattern":"adapt-required",
 "composition-recipe":"adapt-required",
 "design-reference":"research-only",
 "motion-reference":"research-only",
 "snapshot":"research-only"
});
const GOALS=new Set(["implementation","behavior","visual"]);
const MODES=new Set(["copyable-source","adapt-required","research-only"]);
const text=v=>String(v??"").toLocaleLowerCase();
const unique=values=>[...new Set(values.filter(Boolean))];

export function reuseMode(asset,policies={}){
 return policies[asset.reuseKind]?.mode||FALLBACK_MODES[asset.reuseKind]||"research-only";
}

export function buildHandoff(asset,policies={}){
 const policy=policies[asset.reuseKind]||{};
 const mode=reuseMode(asset,policies);
 return {
  mode,
  entry:asset.handoff?.entry||asset.path||asset.spec||asset.details||null,
  relatedFiles:unique([asset.path,asset.spec,asset.details,asset.demo].filter(Boolean)),
  stack:asset.handoff?.stack||asset.framework||null,
  instructions:asset.handoff?.instructions||policy.guidance||"Inspect the original asset and adapt it to the target application's contracts.",
  limitations:asset.handoff?.limitations||asset.verified||"No destination project verification recorded.",
  dependencies:asset.dependencies||[],
  sourceStage:asset.stage,
  styleIds:asset.styleIds||[],
  warning:"Research/reference handoff only. No package installation, project integration or production signoff is implied."
 };
}

function scoreIntent(asset,terms){
 const id=text(asset.id),name=text(asset.name),exports=text(asset.exportName);
 const tags=(asset.tags||[]).map(text),aliases=(asset.aliases||[]).map(text);
 const contexts=(asset.applicationContexts||[]).map(text);
 // Match registered, multi-character aliases inside Chinese task sentences.
 // This is conservative lexical matching: no stemming or semantic inference.
 const phraseMatch=term=>aliases.some(a=>a.length>=2&&term.includes(a));
 let score=0,hits=0;
 for(const term of terms){
  const matched=id.includes(term)||name.includes(term)||exports.includes(term)||
    tags.some(t=>t.includes(term))||aliases.some(t=>t.includes(term))||contexts.some(t=>t.includes(term))||phraseMatch(term);
  if(!matched)continue;
  hits++;
  if(id===term)score+=45;
  else if(name===term||exports===term)score+=32;
  else if(aliases.includes(term))score+=27;
  else if(tags.includes(term))score+=20;
  else if(name.includes(term)||exports.includes(term))score+=14;
  else if(aliases.some(t=>t.includes(term)))score+=12;
  else if(phraseMatch(term))score+=11;
  else score+=6;
 }
 return {score,hits};
}

export function searchAssets(assets,options={}){
 const {style=null,context=null,kind=null,type=null,stage=null,reuse=null,goal=null,intent="",limit=12,reusePolicies={}}=options;
 const terms=text(intent).normalize("NFKC").split(/[\s,，、;；。.!?！？/]+/).filter(Boolean);
 return assets.filter(asset=>{
  if(kind&&asset.reuseKind!==kind)return false;
  if(type&&asset.type!==type)return false;
  if(stage&&asset.stage!==stage)return false;
  if(reuse&&reuseMode(asset,reusePolicies)!==reuse)return false;
  if(style&&asset.styleIds?.length&&!asset.styleIds.includes(style))return false;
  if(style&&asset.reuseKind==="style-token"&&!asset.styleIds?.includes(style))return false;
  if(context&&asset.applicationContexts?.length&&!asset.applicationContexts.includes(context))return false;
  return true;
 }).map(asset=>{
  const match=scoreIntent(asset,terms);
  const mode=reuseMode(asset,reusePolicies);
  let score=match.score+(style&&asset.styleIds?.includes(style)?8:0)+
    (context&&asset.applicationContexts?.includes(context)?5:0)+
    (asset.stage==="production-ready"?4:asset.stage==="validated"?3:0);
  if(goal==="implementation")score+=mode==="copyable-source"?12:mode==="adapt-required"?3:0;
  if(goal==="behavior")score+=asset.reuseKind==="behavior-pattern"?15:mode==="adapt-required"?4:0;
  if(goal==="visual")score+=asset.reuseKind==="design-reference"?10:asset.reuseKind==="style-token"?7:0;
  return {...asset,_score:score,_hits:match.hits,_reuseMode:mode};
 }).filter(a=>!terms.length||a._hits>0)
   .sort((a,b)=>b._score-a._score||a.id.localeCompare(b.id))
   .slice(0,Math.min(100,Math.max(1,Number(limit)||12)));
}

function parseArgs(args){
 const params={};
 for(const raw of args){
  if(raw==="--json"){params.json=true;continue;}
  if(!raw.startsWith("--")||!raw.includes("="))throw Error("Use --style=... --context=... --intent=... --kind=... --type=... --stage=... --reuse=... --goal=... --limit=... [--json]");
  const [key,...rest]=raw.slice(2).split("=");
  if(!["style","context","kind","type","stage","intent","reuse","goal","limit"].includes(key))throw Error("Unknown option: "+key);
  if(params[key]!==undefined)throw Error("Duplicate option: "+key);
  params[key]=rest.join("=");
 }
 if(params.reuse&&!MODES.has(params.reuse))throw Error("Unknown reuse mode: "+params.reuse);
 if(params.goal&&!GOALS.has(params.goal))throw Error("Unknown goal: "+params.goal);
 return params;
}
export function runCLI(args,root=process.cwd()){
 const opt=parseArgs(args);
 const manifest=JSON.parse(fs.readFileSync(path.join(root,"registry/assets.json"),"utf8"));
 const styleRegistry=JSON.parse(fs.readFileSync(path.join(root,"registry/styles.json"),"utf8"));
 if(opt.style&&!styleRegistry.styles.some(s=>s.id===opt.style))throw Error("Unknown styleId: "+opt.style);
 const options={...opt,reusePolicies:manifest.reusePolicies||{}};
 const results=searchAssets(manifest.assets,options);
 const criteria={style:opt.style||null,context:opt.context||null,intent:opt.intent||null,
  kind:opt.kind||null,type:opt.type||null,stage:opt.stage||null,reuse:opt.reuse||null,goal:opt.goal||null};
 if(opt.json)return JSON.stringify({
  criteria,
  note:"Reference handoffs are not certified code. Empty styleIds denotes conceptual neutrality, not CSS/React portability.",
  results:results.map(asset=>({...asset,handoffResolved:buildHandoff(asset,manifest.reusePolicies)}))
 },null,2);
 const lines=[
  "Candidates ("+results.length+"): type="+(opt.type||"any")+", stage="+(opt.stage||"any")+", style="+(opt.style||"any")+", context="+(opt.context||"any")+
   ", intent="+(opt.intent||"any")+", reuse="+(opt.reuse||"any")+", goal="+(opt.goal||"any"),
  "INFO: copyable-source means inspectable reference code, NOT drop-in/production-ready software."
 ];
 for(const a of results){
  const handoff=buildHandoff(a,manifest.reusePolicies);
  lines.push(a.id.padEnd(9)+" "+a.stage.padEnd(22)+" "+a.name+
    " | "+handoff.mode+" | "+(handoff.entry||a.source||"no path"));
 }
 return lines.join("\n");
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{console.log(runCLI(process.argv.slice(2)));}
 catch(e){console.error(e.message);process.exitCode=1;}
}
