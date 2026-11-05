import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
import {buildHandoff,searchAssets} from "./find-assets.mjs";

// A deterministic planning helper, deliberately not a generative model,
// runtime page composer, framework bridge or visual approval system.
const STACKS=new Set(["any","react","static"]);
const FORMATS=new Set(["json","markdown"]);
const TARGET_COMPONENTS=new Set(["ThemeSurface","Button","Badge","Card","TextField","Tabs","Progress","Dialog","EmptyState","Toast"]);
const clean=value=>String(value??"").trim();
const words=value=>clean(value).toLocaleLowerCase().split(/\s+/).filter(Boolean);
const unique=items=>[...new Set(items)];

function matchingStyles(styles,templates,context,styleId){
 if(styleId)return styles.filter(x=>x.id===styleId);
 if(!context)return [];
 const templateStyleIds=new Set(templates.filter(x=>x.applicationContexts.includes(context)).map(x=>x.styleId));
 return styles.filter(x=>x.categories.includes(context)||templateStyleIds.has(x.id))
  .sort((a,b)=>{
   const aScore=(a.categories.includes(context)?3:0)+(templateStyleIds.has(a.id)?2:0);
   const bScore=(b.categories.includes(context)?3:0)+(templateStyleIds.has(b.id)?2:0);
   return bScore-aScore||a.id.localeCompare(b.id);
  });
}
function contextScore(template,context,intent,stack){
 const exact=context&&template.applicationContexts.includes(context)?40:0;
 const haystack=[template.name,...template.sections,...template.applicationContexts].join(" ").toLocaleLowerCase();
 const hits=words(intent).filter(term=>haystack.includes(term)).length;
 const stackFit=stack==="react"&&template.implementation==="react-vite"?6:stack==="static"&&template.implementation==="independent-static-js"?6:0;
 return exact+hits*5+stackFit;
}
function chooseBehaviors(registry,{intent,context,styleId,explicitIds=[],limit=3}){
 const byId=new Map(registry.assets.map(a=>[a.id,a]));
 const explicit=explicitIds.map(id=>{
  const a=byId.get(id);
  if(!a||a.type!=="interaction")throw Error("Unknown/non-interaction asset ID: "+id);
  if(styleId&&a.styleIds?.length&&!a.styleIds.includes(styleId))throw Error("Behavior "+id+" incompatible with style "+styleId);
  return a;
 });
 const suggested=intent?searchAssets(registry.assets,{
  intent,goal:"behavior",kind:"behavior-pattern",style:styleId,context,
  reusePolicies:registry.reusePolicies,limit:12
 }).filter(a=>a.type==="interaction"):
  context?registry.assets.filter(a=>a.type==="interaction"&&a.applicationContexts.includes(context)&&
   (!styleId||!a.styleIds?.length||a.styleIds.includes(styleId))):[];
 const candidates=unique([...explicit,...suggested].map(a=>a.id)).slice(0,Math.max(limit,explicit.length));
 return candidates.map(id=>{
  const a=byId.get(id);
  return {id,name:a.name,selection:explicitIds.includes(id)?"explicit":"suggested",
   handoff:buildHandoff(a,registry.reusePolicies),
   fit:context&&!a.applicationContexts.includes(context)?"context-adaptation-needed":"context-declared-or-unrestricted",
   caveat:"Behavior contracts must be adapted to the target platform; no React component or persisted backend is implied."};
 });
}
function buildOption(template,style,components,registry,request,interactions){
 const hasReactTheme=components.styleIds.includes(style.id);
 const isReactDemo=template?.implementation==="react-vite";
 const needsPort=template&&(request.stack==="react"&&!isReactDemo||
  request.stack==="static"&&isReactDemo);
 const componentIds=new Set(template?.wiredUIExportIds||[]);
 const candidates=(request.stack==="react"||request.stack==="any"&&isReactDemo)&&hasReactTheme?
  components.entries.filter(c=>componentIds.has(c.id)||
   request.stack==="react"&&TARGET_COMPONENTS.has(c.exportName)).map(c=>({
    id:c.id,exportName:c.exportName,
    status:isReactDemo&&componentIds.has(c.id)?"wired-in-reference-demo":"candidate-not-wired",
    source:c.source
   })): [];
 const templateAssets=(template?.assetIds||[]).map(id=>registry.assets.find(x=>x.id===id))
  .filter(Boolean).map(a=>({id:a.id,name:a.name,handoff:buildHandoff(a,registry.reusePolicies)}));
 const notes=[
  "Planning handoff only; no page code or target application has been generated or modified.",
  "Template and interaction demos use fictional local state until a product-specific data/API contract is supplied.",
  "Do not auto-compose style-neutral behavior source as globally compatible CSS or React.",
 ];
 if(!hasReactTheme)notes.push("This visual style is NOT a declared theme of the shared React component package.");
 if(needsPort)notes.push("Requested stack differs from the example page implementation; a manual framework port is required.");
 if(!template)notes.push("No matching registered page blueprint: design page sections from requirements; do not fabricate a template.");
 return {
  id:template?.id||"STYLE-"+style.id,kind:template?"page-blueprint":"style-only",
  style:{id:style.id,label:style.label,status:style.status,
   reason:request.style===style.id?"explicit-request":style.categories.includes(request.context)?"category-match":"template-context-match",
   documentation:style.documentation,styleProfile:style.styleProfile,tokens:style.tokens,
   demo:style.demo},
  page:template?{id:template.id,name:template.name,source:template.source,demo:template.demo,
   implementation:template.implementation,sections:template.sections,
   registeredAssets:templateAssets,requiredChecks:template.requiredChecks,
   note:template.note}:null,
  stack:{requested:request.stack,reactThemeSupported:hasReactTheme,
   exampleUsesReactLibrary:Boolean(isReactDemo),adaptation:
    !template?"page-design-required":needsPort?"framework-port-required":"reference-only-no-port-claim"},
  components:candidates,interactions,
  warnings:notes
 };
}
export function planComposition({context="",intent="",style="",template="",stack="any",behaviors=[]}={},data){
 const request={context:clean(context),intent:clean(intent),style:clean(style),template:clean(template),stack,behaviors};
 if(!STACKS.has(stack))throw Error("Unknown stack: "+stack);
 if(!Array.isArray(behaviors)||behaviors.some(id=>typeof id!=="string"||!id.trim())||
    new Set(behaviors).size!==behaviors.length)throw Error("Invalid behavior IDs");
 if(!request.context&&!request.style&&!request.template)throw Error("Specify --context, --style, or --template; no default visual direction");
 const {styles,templates,components,registry}=data;
 const styleById=new Map(styles.styles.map(s=>[s.id,s]));
 const chosenTemplate=request.template?templates.templates.find(t=>t.id===request.template):null;
 if(request.template&&!chosenTemplate)throw Error("Unknown template ID: "+request.template);
 if(request.style&&!styleById.has(request.style))throw Error("Unknown style ID: "+request.style);
 if(chosenTemplate&&request.style&&chosenTemplate.styleId!==request.style)
  throw Error("Incompatible style: "+request.template+" requires "+chosenTemplate.styleId+", not "+request.style);
 if(chosenTemplate&&request.context&&!chosenTemplate.applicationContexts.includes(request.context))
  throw Error("Context "+request.context+" not declared for "+request.template);
 const resolvedStyle=request.style||chosenTemplate?.styleId||null;
 // Explicit behavior requests are never silently reclassified or replaced.
 const interactions=chooseBehaviors(registry,{intent:request.intent,context:request.context,styleId:resolvedStyle,explicitIds:behaviors});
 const stylesFound=matchingStyles(styles.styles,templates.templates,request.context,resolvedStyle);
 let templatesFound=chosenTemplate?[chosenTemplate]:
  templates.templates.filter(t=>(!request.style||t.styleId===request.style)&&
   (!request.context||t.applicationContexts.includes(request.context)));
 templatesFound=templatesFound.sort((a,b)=>contextScore(b,request.context,request.intent,stack)-
  contextScore(a,request.context,request.intent,stack)||a.id.localeCompare(b.id));
 const optionTemplates=templatesFound.slice(0,4);
 const options=optionTemplates.map(t=>{
  const selectedStyle=styleById.get(t.styleId);
  const optInteractions=chooseBehaviors(registry,{intent:request.intent,context:request.context,
   styleId:t.styleId,explicitIds:behaviors});
  return {score:contextScore(t,request.context,request.intent,stack),
   ...buildOption(t,selectedStyle,components,registry,request,optInteractions)};
 });
 if(!options.length){
  for(const s of stylesFound.slice(0,4)){
   const subset=chooseBehaviors(registry,{intent:request.intent,context:request.context,
    styleId:s.id,explicitIds:behaviors});
   options.push({score:s.categories.includes(request.context)?30:0,
    ...buildOption(null,s,components,registry,request,subset)});
  }
 }
 const selected=chosenTemplate?{styleId:chosenTemplate.styleId,templateId:chosenTemplate.id,source:"explicit-template"}:
  request.style?{styleId:request.style,templateId:null,source:"explicit-style-only"}:
  {styleId:null,templateId:null,source:"alternatives-only"};
 const warnings=[
  "Deterministic context/keyword matching only: this is not semantic AI inference or an automatic design choice.",
  "Style alternatives are not interchangeable implementations. Only explicitly compatible React themes may suggest shared components.",
 ];
 if(!options.length)warnings.push("No registered style/template matches this context. Define a new art direction or provide --style explicitly; do not fall back to SaaS.");
 if(!request.template)warnings.push("No page template was selected. The options are candidates; confirm one before target implementation.");
 if(request.template&&request.stack==="react"&&chosenTemplate.implementation!=="react-vite")
  warnings.push("Selected page is static, and a React version would require a separate port.");
 return {schemaVersion:"1.0",status:"planning-only",request,selection:selected,
  options,behaviorCandidates:interactions,
  alternatives:stylesFound.map(s=>({id:s.id,label:s.label,categoryMatch:s.categories.includes(request.context),
   reactComponentThemeSupported:components.styleIds.includes(s.id),documentation:s.documentation})),
  warnings};
}
export function toMarkdown(plan){
 const lines=["# Design combination handoff","",
  "**Planning only** — no design selected without an explicit style/template, no app code generated.","",
  "Context: "+(plan.request.context||"not specified"),
  "Intent: "+(plan.request.intent||"not specified"),
  "Target stack: "+plan.request.stack,
  "Selection: "+(plan.selection.templateId||plan.selection.styleId||"unselected"),"",
  "## Candidate compositions"];
 for(const o of plan.options){
  lines.push("### "+o.id+" · "+o.style.label,
   "Style ID: "+o.style.id+" | type: "+o.kind+" | stack adaptation: "+o.stack.adaptation,
   "Scoped tokens: "+(o.style.tokens?.css||"not recorded"),
   "Style guide: "+o.style.documentation,
   "Page source: "+(o.page?.source||"no matching page blueprint"),
   "Page implementation: "+(o.page?.implementation||"none"),"",
   "Sections: "+(o.page?.sections.join(" / ")||"must be defined from user task"),"",
   "React exports: "+(o.components.length?o.components.map(c=>c.id+" "+c.exportName+" ("+c.status+")").join(", "):"none declared"),"",
   "Interactions: "+(o.interactions.length?o.interactions.map(b=>b.id+" "+b.name+" ("+b.selection+")").join(" / "):"none suggested"),"",
   "Cautions:",...o.warnings.map(w=>"- "+w),"");
 }
 lines.push("## Open decisions and constraints",...plan.warnings.map(w=>"- "+w),"",
  "Implementing agent must inspect selected source/specs, preserve task-specific user data and APIs, and report untested platform/accessibility paths.");
 return lines.join("\n");
}
function parseArgs(args){
 const out={};
 for(const arg of args){
  if(!arg.startsWith("--")||!arg.includes("="))throw Error("Usage: --context=... [--intent=...] [--style=...] [--template=...] [--stack=any|react|static] [--behaviors=IP-021,IP-022] [--format=json|markdown]");
  const i=arg.indexOf("="),key=arg.slice(2,i),value=arg.slice(i+1);
  if(!["context","intent","style","template","stack","behaviors","format"].includes(key))throw Error("Unknown option: "+key);
  if(Object.hasOwn(out,key))throw Error("Duplicate option: "+key);
  out[key]=value;
 }
 if(out.format&&!FORMATS.has(out.format))throw Error("Unknown format: "+out.format);
 const behaviors=out.behaviors?out.behaviors.split(",").map(clean):[];
 return {...out,behaviors};
}
export function runCLI(argv,root=process.cwd()){
 const request=parseArgs(argv);
 const read=name=>JSON.parse(fs.readFileSync(path.join(root,"registry",name),"utf8"));
 const data={styles:read("styles.json"),templates:read("page-templates.json"),
  components:read("components.json"),registry:read("assets.json")};
 const plan=planComposition(request,data);
 return request.format==="markdown"?toMarkdown(plan):JSON.stringify(plan,null,2);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{console.log(runCLI(process.argv.slice(2)));}
 catch(error){console.error("Composition blocked: "+error.message);process.exitCode=1;}
}
