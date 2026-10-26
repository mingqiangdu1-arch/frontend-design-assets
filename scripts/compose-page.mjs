import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";

export function listTemplates(registry,{style=null,context=null}={}){
 return registry.templates.filter(t=>(!style||t.styleId===style)&&(!context||t.applicationContexts.includes(context)));
}
export function chooseTemplate(registry,{template=null,style=null,context=null}={}){
 const options=listTemplates(registry,{style,context});
 if(template){
  const found=registry.templates.find(t=>t.id===template);
  if(!found)throw Error("Unknown template: "+template);
  if(style&&found.styleId!==style)throw Error("Incompatible style: "+template+" requires "+found.styleId+", not "+style);
  if(context&&!found.applicationContexts.includes(context))throw Error("Context "+context+" not declared for "+template);
  return found;
 }
 if(!style)throw Error("Select explicit style or template. Use --list for options.");
 if(!options.length)throw Error("No blueprint for style="+style+" context="+(context||"any")+". No fallback.");
 if(options.length!==1)throw Error("Ambiguous blueprint: specify --template explicitly.");
 return options[0];
}
export function buildPlan(registry,components,selected,{title=""}={}){
 const compatible=components.styleIds.includes(selected.styleId);
 const candidates=compatible?components.entries.filter(c=>
 ["Button","Badge","TextField","Tabs","Card","DataList","Progress"].includes(c.exportName))
 .map(c=>({id:c.id,exportName:c.exportName,status:"candidate-not-wired"})):[];
 return {
 schemaVersion:"1.0",title:title.trim()||selected.name,
 selection:{templateId:selected.id,styleId:selected.styleId,contexts:selected.applicationContexts,status:selected.status,implementation:selected.implementation},
 assets:{demo:selected.demo,source:selected.source,tokenCss:selected.tokens,assetIds:selected.assetIds,
 relatedReactComponentCandidates:candidates,reactComponentPackageCompatible:compatible,demoActuallyUsesReactLibrary:false},
 sections:selected.sections.map((label,i)=>({order:i+1,label})),
 acceptance:selected.requiredChecks,
 implementationSteps:["Review user needs, devices, brand and accessibility constraints.",
  "Inspect the runnable example and the selected scoped Token stylesheet.",
  "Recreate the page architecture in the real target stack; do not assume demos share React internals.",
  "Connect authorized real data and handle loading, errors, rollback, empty states and retry.",
  "Test mobile/desktop keyboard, reduced motion and actual user outcomes before promotion."],
 cautions:[selected.note,"Generated output is an assembly brief, NOT compiled application code.",
 "No real product has been edited and no cross-browser or production approval is implied."]
 };
}
export function toMarkdown(plan){
 const title=plan.title.replace(/[<>]/g,"");
 return ["# "+title,"",
  "Page blueprint: "+plan.selection.templateId+" | Style: "+plan.selection.styleId+" | Stage: "+plan.selection.status,
  "","## Sources","- Demo: "+plan.assets.demo,"- Source: "+plan.assets.source,
  "- Scoped Token CSS: "+plan.assets.tokenCss,"- Assets: "+plan.assets.assetIds.join(", "),
  "- React component candidates: "+(plan.assets.reactComponentPackageCompatible?"theme supported; not wired":"theme not declared"),
  "","## Sections",...plan.sections.map(s=>s.order+". "+s.label),
  "","## Implementation",...plan.implementationSteps.map((s,i)=>(i+1)+". "+s),
  "","## Acceptance",...plan.acceptance.map(s=>"- [ ] "+s),
  "","## Boundaries",...plan.cautions.map(s=>"- "+s),
  "","## Optional component candidates (not wired to current demo)",
  ...(plan.assets.relatedReactComponentCandidates.map(c=>"- "+c.id+" "+c.exportName)),
  ...(plan.assets.relatedReactComponentCandidates.length?[]:["- None"]),""].join("\n");
}
function parse(args){
 const out={};
 for(const arg of args){
  if(arg==="--list"){out.list=true;continue;}
  const match=arg.match(/^--(style|context|template|format|title)=(.*)$/);
  if(!match)throw Error("Invalid argument: "+arg);
  out[match[1]]=match[2];
 }
 if(out.format&&!["json","markdown"].includes(out.format))throw Error("Unsupported format: "+out.format);
 return out;
}
export function runCLI(args,root=process.cwd()){
 const cfg=parse(args);
 const registry=JSON.parse(fs.readFileSync(path.join(root,"registry/page-templates.json"),"utf8"));
 const styles=JSON.parse(fs.readFileSync(path.join(root,"registry/styles.json"),"utf8"));
 const components=JSON.parse(fs.readFileSync(path.join(root,"registry/components.json"),"utf8"));
 if(cfg.style&&!styles.styles.some(t=>t.id===cfg.style))throw Error("Unknown style ID: "+cfg.style);
 if(cfg.list||(!cfg.template&&!cfg.style)){
  const rows=listTemplates(registry,{context:cfg.context||null,style:cfg.style||null});
  return cfg.format==="json"?JSON.stringify({count:rows.length,templates:rows,note:"No default; select style or template explicitly."},null,2):
  rows.map(t=>t.id+" | "+t.styleId+" | "+t.name+" | "+t.demo).join("\n")+"\nNo default theme/template.";
 }
 const selected=chooseTemplate(registry,cfg);
 const plan=buildPlan(registry,components,selected,{title:cfg.title||""});
 return cfg.format==="json"?JSON.stringify(plan,null,2):toMarkdown(plan);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{console.log(runCLI(process.argv.slice(2)));}
 catch(err){console.error("Composition blocked: "+err.message);process.exitCode=1;}
}
