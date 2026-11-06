import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
import {assembleStyleBrief,toAssemblyMarkdown} from "./style-assembly.mjs";

const allowed=new Set(["style","context","stack","device","template","title","goal","format"]);
export function parseStyleBriefArgs(args){
 const opts={};
 for(const arg of args){
  if(!arg.startsWith("--")||!arg.includes("="))throw Error("Usage: --style=... [--context=...] [--stack=react|static|unspecified] [--device=...] [--template=TPL-NNN] [--title=...] [--goal=...] [--format=markdown|json]");
  const index=arg.indexOf("="),key=arg.slice(2,index),value=arg.slice(index+1);
  if(!allowed.has(key))throw Error("Unknown argument: "+key);
  if(Object.hasOwn(opts,key))throw Error("Duplicate argument: "+key);
  if(!value.trim())throw Error("Empty "+key+" is not allowed");
  opts[key]=value;
 }
 if(opts.format&&!["json","markdown"].includes(opts.format))throw Error("Unsupported format: "+opts.format);
 return opts;
}
export function runCLI(argv,root=process.cwd()){
 const opts=parseStyleBriefArgs(argv);
 const read=name=>JSON.parse(fs.readFileSync(path.join(root,"registry",name),"utf8"));
 const data={styles:read("styles.json"),facets:read("style-facets.json"),
  assembly:read("style-assembly.json"),components:read("components.json"),
  templates:read("page-templates.json"),experiences:read("experience-compositions.json"),
  assets:read("assets.json")};
 const {format="markdown",...request}=opts;
 const brief=assembleStyleBrief(data,request);
 return format==="json"?JSON.stringify(brief,null,2):toAssemblyMarkdown(brief);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{console.log(runCLI(process.argv.slice(2)));}
 catch(e){console.error("Style brief blocked: "+e.message);process.exitCode=1;}
}
