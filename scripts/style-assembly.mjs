// Deterministic style-to-page briefing for Node and the static browser.
// A research handoff, NOT an app generator, React theme bridge or approval system.
const clean=v=>String(v??"").trim();
const normalize=v=>clean(v).toLocaleLowerCase().normalize("NFKC");
const STACKS=new Set(["unspecified","static","react"]);
const DEVICES=new Set(["unspecified","mobile","desktop","responsive"]);
const knownPath=v=>typeof v==="string"&&/^(styles|playground|tokens|registry|docs|packages|recipes)\/[a-z0-9_./-]+(?:\?style=[a-z0-9-]+)?$/i.test(v)&&!v.includes("..");

export function validateStyleAssembly(data){
 const {styles,facets,assembly,components,templates,experiences,assets}=data;
 if(styles.defaultStyleId!==null||facets.defaultStyleId!==null||assembly.defaultStyleId!==null)throw Error("No default style permitted");
 if(!Array.isArray(assembly.recipes)||assembly.recipes.length!==styles.styles.length)throw Error("Style assembly must cover each theme exactly once");
 const styleById=new Map(styles.styles.map(x=>[x.id,x]));
 const facetById=new Map(facets.entries.map(x=>[x.id,x]));
 const assetById=new Map(assets.assets.map(x=>[x.id,x]));
 const tplById=new Map(templates.templates.map(x=>[x.id,x]));
 const expIds=new Set(experiences.recipes.map(x=>x.id));
 const exports=new Set(components.entries.map(x=>x.exportName));
 const supported=new Set(components.styleIds),seen=new Set();
 let sectionCount=0;
 for(const rec of assembly.recipes){
  const style=styleById.get(rec.styleId),facet=facetById.get(rec.styleId);
  if(!style||!facet||seen.has(rec.styleId))throw Error("Unknown/duplicate assembly theme: "+rec.styleId);
  seen.add(rec.styleId);
  const asset=assetById.get(facet.asset);
  if(!asset||!asset.styleIds?.includes(rec.styleId))throw Error("Missing theme asset for "+rec.styleId);
  for(const k of ["structureId","title","focus","typeRules","spacing","motion","responsive","a11y","avoid"]){
   if(typeof rec[k]!=="string"||rec[k].trim().length<8)throw Error("Missing assembly "+k+" for "+rec.styleId);
  }
  if(!Array.isArray(rec.sections)||rec.sections.length<4||rec.sections.length>7)throw Error("Wrong section count for "+rec.styleId);
  const sectionIds=new Set();
  for(const section of rec.sections){
   if(!section.id||sectionIds.has(section.id))throw Error("Duplicate/empty section for "+rec.styleId);
   sectionIds.add(section.id);sectionCount++;
   for(const key of ["label","purpose","layout","behavior"])
    if(typeof section[key]!=="string"||section[key].trim().length<(key==="label"?2:4))throw Error("Missing section "+key+" for "+rec.styleId);
  }
  for(const id of rec.templateIds||[]){
   const t=tplById.get(id);
   if(!t||t.styleId!==rec.styleId)throw Error("Template mismatch: "+id+" for "+rec.styleId);
  }
  for(const id of rec.relatedExperienceIds||[])if(!expIds.has(id))throw Error("Unknown research recipe "+id);
  for(const name of rec.componentHints||[])
   if(!exports.has(name)||!supported.has(rec.styleId))throw Error("Unsupported component hint "+name+" for "+rec.styleId);
  for(const p of [style.documentation,style.styleProfile,style.tokens?.json,style.tokens?.css,style.demo])
   if(p&&!knownPath(p))throw Error("Unsafe style source path "+p);
 }
 return {styles:seen.size,sections:sectionCount,defaultStyleId:null};
}

export function assembleStyleBrief(data,request={}){
 validateStyleAssembly(data);
 const {styles,facets,assembly,components,templates,experiences,assets}=data;
 const id=clean(request.style);
 if(!id)throw Error("Explicit --style required; no default exists");
 const style=styles.styles.find(x=>x.id===id);
 const facet=facets.entries.find(x=>x.id===id);
 const grammar=assembly.recipes.find(x=>x.styleId===id);
 if(!style||!facet||!grammar)throw Error("Unknown style: "+id);
 const stack=clean(request.stack)||"unspecified";
 const device=clean(request.device)||"unspecified";
 const context=clean(request.context),templateId=clean(request.template);
 const title=clean(request.title)||grammar.title,goal=clean(request.goal);
 if(!STACKS.has(stack))throw Error("Unsupported stack: "+stack);
 if(!DEVICES.has(device))throw Error("Unsupported device: "+device);
 if(title.length>180||goal.length>1000)throw Error("Title or goal too long");
 const options=grammar.templateIds.map(id=>templates.templates.find(t=>t.id===id));
 const contextOk=style.categories.includes(context)||
  options.some(t=>t.applicationContexts.includes(context))||
  facet.keywords.some(k=>normalize(k)===normalize(context));
 if(context&&!contextOk)throw Error("Context "+context+" not declared for "+id+"; no silent fallback");
 let selected=null;
 if(templateId){
  selected=options.find(t=>t.id===templateId);
  if(!selected)throw Error("Template "+templateId+" is not bound to "+id);
  if(context&&!selected.applicationContexts.includes(context))throw Error("Template "+templateId+" does not support "+context);
 }
 const reactCompatible=components.styleIds.includes(id);
 const requiresThemePort=stack==="react"&&!reactCompatible;
 const requiresTemplatePort=Boolean(selected&&stack!=="unspecified"&&
  ((stack==="react"&&selected.implementation!=="react-vite")||
   (stack==="static"&&selected.implementation==="react-vite")));
 const ui=stack==="react"&&reactCompatible?grammar.componentHints.map(name=>{
  const entry=components.entries.find(c=>c.exportName===name);
  return {id:entry.id,exportName:name,source:entry.source,
   status:selected?.wiredUIExportIds?.includes(entry.id)?"wired-in-selected-demo":"candidate-not-wired"};
 }):[];
 const plans=grammar.relatedExperienceIds.map(id=>experiences.recipes.find(x=>x.id===id)).map(x=>({
  id:x.id,title:x.title,structure:x.structure,stage:x.stage,
  relation:"research concept only; not proven theme-compatible"
 }));
 const blueprints=options.map(x=>({id:x.id,name:x.name,implementation:x.implementation,
  contexts:x.applicationContexts,demo:x.demo,source:x.source,
  selection:selected?.id===x.id?"explicitly-selected":"not-selected"}));
 const warnings=[
  "Research brief only; no executable page, target-app edits, screenshot or backend integration is created.",
  "Inspect the original scoped CSS and real demo before reimplementing any section.",
  "Research composition references are conceptual, not executable page templates or React widgets.",
  "Real user content, licensed assets, keyboard/focus, reduced motion, mobile layout and failure states need target-app verification."
 ];
 if(requiresThemePort)warnings.push("React theme NOT supported in packages/ui; manual CSS/Token/component porting and tests required.");
 if(requiresTemplatePort)warnings.push("Selected example uses another stack; manual framework port required.");
 if(!selected&&options.length)warnings.push("Existing page templates are optional candidates, never auto-selected.");
 if(!options.length)warnings.push("No runnable page template registered for this theme; section plan is research-only.");
 if(device!=="unspecified"&&!facet.devices.includes(device)&&
   !(facet.devices.includes("responsive")&&["desktop","mobile"].includes(device)))
   warnings.push("Requested device is not explicitly covered in this theme's declared device set.");
 const asset=assets.assets.find(a=>a.id===facet.asset);
 return {schemaVersion:"1.0",kind:"style-assembly-brief",status:"research-handoff-not-code",
  request:{style:id,context:context||null,stack,device,title,goal:goal||null,template:templateId||null},
  theme:{id,label:style.label,assetId:facet.asset,stage:asset?.stage||"unknown",contexts:style.categories,
   reactCompatible,visualDNA:facet.dna,materials:facet.materials,interactions:facet.interactions,
   caution:facet.caution,avoid:grammar.avoid,
   source:{profile:style.styleProfile,documentation:style.documentation,tokenJson:style.tokens?.json,
    tokenCss:style.tokens?.css,interactiveDemo:facet.preview}},
  page:{structureId:grammar.structureId,title:grammar.title,focus:grammar.focus,
   sections:grammar.sections.map((section,i)=>({order:i+1,...section})),
   typography:grammar.typeRules,layout:grammar.spacing,motion:grammar.motion,
   responsive:grammar.responsive,accessibility:grammar.a11y},
  templates:{selected:selected?.id||null,options:blueprints,
   selectedSource:selected?{implementation:selected.implementation,demo:selected.demo,
    source:selected.source,requiredChecks:selected.requiredChecks||[]}:null},
  conceptualRecipes:plans,reactComponents:ui,
  integration:{targetStack:stack,themePortRequired:requiresThemePort,
   templatePortRequired:requiresTemplatePort,
   reactThemeCompatible:reactCompatible,productionReady:false},
  acceptance:[
   "All essential actions have visible keyboard focus and text feedback.",
   "Section hierarchy supports the actual task and data rather than the artwork alone.",
   "Check target device widths, text clipping, contrast, reduced motion and input methods.",
   "Define empty/loading/error/retry/undo and lawful media rights where needed.",
   ...(selected?.requiredChecks||[])
  ],
  warnings,note:"Explicit visual choice and evidence only; no default style, generated app or production certification."
 };
}
export function toAssemblyMarkdown(p){
 const q=String.fromCharCode(96);
 const lines=["# "+p.request.title,"",
  "## Explicit theme and actual source","",
  "- "+p.theme.id+" / "+p.theme.label+" · "+p.theme.assetId+" · "+p.theme.stage,
  "- Goal: "+(p.request.goal||p.page.focus),
  "- Context: "+(p.request.context||"not specified")+" · device: "+p.request.device+" · target stack: "+p.request.stack,
  "- React theme supported: "+(p.theme.reactCompatible?"declared; validate integration":"no; adaptation required"),
  "- Source: "+q+p.theme.source.documentation+q+" · "+q+p.theme.source.profile+q,
  "- Tokens: "+q+p.theme.source.tokenCss+q+" · "+q+p.theme.source.tokenJson+q,
  "- Original demo: "+q+p.theme.source.interactiveDemo+q,"",
  "## Page architecture · "+p.page.structureId,"",p.page.focus,""];
 for(const section of p.page.sections)lines.push("### "+section.order+". "+section.label,"",
  "- Purpose: "+section.purpose,"- Layout: "+section.layout,"- Behavior: "+section.behavior,"");
 lines.push("## Reproduction rules","",
  "- Visual DNA: "+p.theme.visualDNA.join(" / "),
  "- Typography: "+p.page.typography,
  "- Layout: "+p.page.layout,
  "- Motion: "+p.page.motion,
  "- Responsive: "+p.page.responsive,
  "- Accessibility: "+p.page.accessibility,
  "- Avoid: "+p.theme.avoid,
  "- Caution: "+p.theme.caution,"",
  "## Existing runnable blueprints (never auto-selected)","",
  "Explicit template: "+(p.templates.selected||"none"),"");
 if(!p.templates.options.length)lines.push("- No style-bound runnable page template.");
 for(const t of p.templates.options)
  lines.push("- "+t.id+" "+t.name+" ("+t.implementation+", "+t.selection+") · "+q+t.source+q+" · "+q+t.demo+q);
 lines.push("","## Real React component candidates","",
  p.reactComponents.length?"Only source-backed components listed here; nonwired candidates are NOT already implemented in this page.":"No React component library integration claimed.");
 for(const c of p.reactComponents)lines.push("- "+c.id+" "+c.exportName+" ("+c.status+") · "+q+c.source+q);
 lines.push("","## Conceptual composition references","");
 for(const x of p.conceptualRecipes)lines.push("- "+x.id+" "+x.title+" · "+x.structure+" (research only)");
 if(!p.conceptualRecipes.length)lines.push("- None");
 lines.push("","## Integration constraints","",
  "- Target: "+p.integration.targetStack,
  "- Manual theme port: "+(p.integration.themePortRequired?"required":"not requested"),
  "- Selected page needs framework port: "+(p.integration.templatePortRequired?"yes":"no"),
  "- Certified production code: **no**","",
  "## Acceptance checklist","");
 for(const item of p.acceptance)lines.push("- [ ] "+item);
 lines.push("","## Warnings","");
 for(const item of p.warnings)lines.push("- "+item);
 return lines.join("\n");
}
