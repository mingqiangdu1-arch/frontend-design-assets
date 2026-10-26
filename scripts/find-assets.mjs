import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";

export function searchAssets(assets,options={}){
 const {style=null,context=null,kind=null,intent="",limit=12}=options;
 const terms=String(intent).toLocaleLowerCase().split(/\s+/).filter(Boolean);
 return assets.filter(asset=>{
  if(kind && asset.reuseKind!==kind)return false;
  if(style && asset.styleIds?.length && !asset.styleIds.includes(style))return false;
  if(style && asset.reuseKind==="style-token" && !asset.styleIds?.includes(style))return false;
  if(context && asset.applicationContexts?.length && !asset.applicationContexts.includes(context))return false;
  return true;
 }).map(asset=>{
  const searchable=[asset.id,asset.name,...(asset.tags||[]),...(asset.applicationContexts||[])].join(" ").toLocaleLowerCase();
  const hits=terms.filter(t=>searchable.includes(t)).length;
  const score=hits*5+
    (style&&asset.styleIds?.includes(style)?3:0)+
    (context&&asset.applicationContexts?.includes(context)?2:0)+
    (asset.stage==="validated"?3:asset.stage==="production-ready"?4:0);
  return {...asset,_score:score,_hits:hits};
 }).filter(a=>!terms.length||a._hits>0).sort((a,b)=>b._score-a._score||a.id.localeCompare(b.id))
   .slice(0,Math.min(100,Math.max(1,Number(limit)||12)));
}

function parseArgs(args){
 const params={};
 for(const raw of args){
  if(raw==="--json"){params.json=true;continue;}
  if(!raw.startsWith("--")||!raw.includes("="))throw Error("Use --style=... --context=... --intent=... --kind=... --limit=... [--json]");
  const [key,...rest]=raw.slice(2).split("=");
  if(!["style","context","kind","intent","limit"].includes(key))throw Error("Unknown option: "+key);
  params[key]=rest.join("=");
 }
 return params;
}
export function runCLI(args,root=process.cwd()){
 const opt=parseArgs(args);
 const manifest=JSON.parse(fs.readFileSync(path.join(root,"registry/assets.json"),"utf8"));
 const styleRegistry=JSON.parse(fs.readFileSync(path.join(root,"registry/styles.json"),"utf8"));
 if(opt.style&&!styleRegistry.styles.some(s=>s.id===opt.style))throw Error("Unknown styleId: "+opt.style);
 const results=searchAssets(manifest.assets,opt);
 if(opt.json)return JSON.stringify({
  criteria:{style:opt.style||null,context:opt.context||null,intent:opt.intent||null,kind:opt.kind||null},
  note:"Matches are candidates, not certified cross-style compatibility. A style-neutral reference is not portable code.",
  results
 },null,2);
 const lines=[
  "Candidates ("+results.length+"): style="+(opt.style||"any")+", context="+(opt.context||"any")+", intent="+(opt.intent||"any"),
  "INFO: style-neutral behavior references are not validated production components.",
 ];
 for(const a of results){
  lines.push(a.id.padEnd(9)+" "+a.stage.padEnd(22)+" "+a.name+
    " | "+a.reuseKind+" | "+(a.path||a.spec||a.source||"no path"));
 }
 return lines.join("\n");
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{console.log(runCLI(process.argv.slice(2)));}
 catch(e){console.error(e.message);process.exitCode=1;}
}
