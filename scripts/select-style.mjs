import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
import {rankThemes,compareThemes} from "./style-match.mjs";

const read=(root,file)=>JSON.parse(fs.readFileSync(path.join(root,"registry",file),"utf8"));
function parseArgs(argv){
 const opts={};
 for(const arg of argv){
  if(!arg.startsWith("--")||!arg.includes("="))throw Error("Use --task=... or --context=... with optional --layout, --material, --interaction, --density, --device, --stack, --limit, --format; or --compare=id,id");
  const i=arg.indexOf("="),key=arg.slice(2,i),value=arg.slice(i+1);
  if(!["task","context","layout","material","interaction","density","device","stack","limit","format","compare"].includes(key))throw Error("Unknown option: "+key);
  if(Object.hasOwn(opts,key))throw Error("Duplicate option: "+key);
  if(!value.trim())throw Error("Empty option: "+key);
  opts[key]=value;
 }
 if(opts.format&&!["json","markdown"].includes(opts.format))throw Error("Unknown format: "+opts.format);
 return opts;
}
export function toMarkdown(response){
 const lines=["# Style comparison / selection", "",response.note||"Explicit comparison of declared style differences; no theme chosen.", ""];
 if(response.criteria)lines.push("Criteria: `"+JSON.stringify(response.criteria)+"`","",
  "Matches: "+response.totalMatches,"");
 if(!response.results.length)lines.push("No matching registered styles. Broaden constraints, inspect available styles, or design a new theme; do not silently fall back.","");
 for(const item of response.results){
  lines.push("## "+item.id+" · "+item.label,"",
   "- Asset: `"+item.assetId+"` · React theme compatible: "+(item.reactThemeCompatible?"yes":"no — adaptation required"),
   "- Design: "+(item.visualDNA||[]).join(" / "),
   "- Layout: "+(item.layout||item.layouts||[]).join(", "),
   "- Materials: "+item.materials.join(", ")+" · interaction: "+item.interactions.join(", "),
   "- Preview: `"+item.preview+"` · Spec: `"+(item.source||item.documentation)+"`",
   "- Caution: "+item.caution);
  if(item.evidence)lines.push("- Explicit matches: "+item.evidence.join("；")+" (match points "+item.matchPoints+", **not a quality score**)");
  lines.push("");
 }
 return lines.join("\n");
}
export function runCLI(argv,root=process.cwd()){
 const opts=parseArgs(argv);
 const styles=read(root,"styles.json"),facets=read(root,"style-facets.json"),components=read(root,"components.json");
 const format=opts.format||"json";
 let output;
 if(opts.compare){
  if(Object.keys(opts).some(key=>!["compare","format"].includes(key)))throw Error("Compare mode cannot be mixed with selection criteria");
  const ids=opts.compare.split(",").map(x=>x.trim());
  output={mode:"comparison",note:"Side-by-side descriptive differences, not an aesthetic or usability ranking.",results:compareThemes(styles,facets,components,ids)};
 }else{
  const {format:unused,...criteria}=opts;
  output={mode:"selection",...rankThemes(styles,facets,components,criteria)};
 }
 return format==="markdown"?toMarkdown(output):JSON.stringify(output,null,2);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{console.log(runCLI(process.argv.slice(2)));}
 catch(e){console.error("Theme selection blocked: "+e.message);process.exitCode=1;}
}
