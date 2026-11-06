// Pure, browser-and-Node compatible theme selection. Deterministic *evidence matching*,
// not semantic search, empirical usability scoring or a personal/default preference.
const clean=value=>String(value??"").trim().toLocaleLowerCase().normalize("NFKC");
const has=(value,phrase)=>value.includes(phrase);
export const STACKS=Object.freeze(["any","react","static"]);
export const FACET_KEYS=Object.freeze({layout:"layouts",material:"materials",interaction:"interactions",density:"density",device:"devices"});
export function validateCriteria(criteria={},manifest){
 if(!manifest||!manifest.dimensions||!Array.isArray(manifest.entries))throw Error("Theme facets registry missing");
 const allowed=new Set(["context","task","layout","material","interaction","density","device","stack","limit"]);
 for(const key of Object.keys(criteria))if(!allowed.has(key))throw Error("Unknown criterion: "+key);
 for(const [key,dimension] of Object.entries(FACET_KEYS)){
  const value=clean(criteria[key]);if(value&&!Object.hasOwn(manifest.dimensions[dimension],value))throw Error("Unknown "+key+": "+value);
 }
 if(criteria.stack&&!STACKS.includes(clean(criteria.stack)))throw Error("Unknown stack: "+criteria.stack);
 const limit=criteria.limit===undefined?5:Number(criteria.limit);
 if(!Number.isInteger(limit)||limit<1||limit>14)throw Error("Limit must be an integer in 1..14");
 if(!["context","task","layout","material","interaction"].some(key=>clean(criteria[key])))throw Error("Provide a task, context, layout, material or interaction: there is no default style");
 return {...criteria,limit};
}
export function previewPath(entry){
 // Registry paths are allowlisted static demo paths. Reject protocols, traversal, absolute paths and query injection.
 const path=String(entry?.preview??"");
 if(!/^playground\/[a-z0-9/-]+\.html(?:\?style=[a-z0-9-]+)?$/.test(path)||path.includes(".."))throw Error("Unsafe theme preview path");
 return path;
}
const deviceMatch=(entry,requested)=>!requested||entry.devices.includes(requested)||
 (requested==="mobile"&&entry.devices.includes("responsive"))||
 (requested==="desktop"&&entry.devices.includes("responsive"));
export function rankThemes(styleRegistry,facetRegistry,components,criteria={}){
 const opts=validateCriteria(criteria,facetRegistry);
 const styleById=new Map(styleRegistry.styles.map(s=>[s.id,s]));
 const supported=new Set(components.styleIds);
 const query=clean(opts.task),context=clean(opts.context);
 const selected={layout:clean(opts.layout),material:clean(opts.material),
  interaction:clean(opts.interaction),density:clean(opts.density),device:clean(opts.device)};
 const stack=clean(opts.stack)||"any";
 const candidate=[];
 for(const entry of facetRegistry.entries){
  const style=styleById.get(entry.id);
  if(!style)continue;
  if(stack==="react"&&!supported.has(entry.id))continue;
  if(selected.layout&&!entry.layouts.includes(selected.layout))continue;
  if(selected.material&&!entry.materials.includes(selected.material))continue;
  if(selected.interaction&&!entry.interactions.includes(selected.interaction))continue;
  if(selected.density&&entry.density!==selected.density)continue;
  if(!deviceMatch(entry,selected.device))continue;
  let points=0;
  const evidence=[];
  const exactContext=context&&style.categories.some(x=>clean(x)===context);
  const aliasContext=context&&!exactContext&&entry.keywords.some(x=>clean(x)===context);
  // Explicit application contexts are hard constraints, never rescued by other facet points.
  if(context&&!exactContext&&!aliasContext)continue;
  if(exactContext){points+=9;evidence.push("场景匹配: "+context);}
  else if(aliasContext){points+=5;evidence.push("场景词项匹配: "+context);}
  if(query){
   const hits=entry.keywords.filter(word=>{
    const term=clean(word);
    if(!term||term.length<3)return false;
    // English and CJK phrases must match a registered phrase, not an invented semantic relation.
    return has(query,term);
   }).slice(0,3);
   if(hits.length){points+=Math.min(12,hits.length*6);evidence.push("任务词项: "+hits.join("、"));}
  }
  if(selected.layout){points+=5;evidence.push("构图类型: "+selected.layout);}
  if(selected.material){points+=5;evidence.push("材质表达: "+selected.material);}
  if(selected.interaction){points+=5;evidence.push("交互方式: "+selected.interaction);}
  if(selected.density){points+=2;evidence.push("信息密度: "+selected.density);}
  if(selected.device){points+=2;evidence.push("设备覆盖: "+selected.device);}
  if(points===0)continue;
  candidate.push({
   id:entry.id,assetId:entry.asset,label:style.label,labelCN:entry.labelCN,
   matchPoints:points,evidence,
   visualSummary:entry.summary,visualDNA:entry.dna,
   layout:entry.layouts,materials:entry.materials,interactions:entry.interactions,
   density:entry.density,devices:entry.devices,
   reactThemeCompatible:supported.has(entry.id),
   maturity:"design-proposal / inspect original asset stage before reuse",
   source:style.documentation,tokens:style.tokens,preview:previewPath(entry),
   caution:entry.caution
  });
 }
 candidate.sort((a,b)=>b.matchPoints-a.matchPoints||a.id.localeCompare(b.id));
 return {criteria:{context:context||null,task:query||null,...Object.fromEntries(
  Object.entries(selected).map(([key,value])=>[key,value||null])),stack,limit:opts.limit},
  note:"Match points only count explicit registry evidence, not popularity, visual quality or user preference. No theme is selected automatically.",
  totalMatches:candidate.length,results:candidate.slice(0,opts.limit)};
}
export function compareThemes(styleRegistry,facetRegistry,components,ids){
 if(!Array.isArray(ids)||ids.length!==2||ids[0]===ids[1])throw Error("Choose two distinct style IDs");
 const byId=new Map(facetRegistry.entries.map(x=>[x.id,x]));
 const byStyle=new Map(styleRegistry.styles.map(x=>[x.id,x]));
 const supported=new Set(components.styleIds);
 return ids.map(id=>{
  const entry=byId.get(id),style=byStyle.get(id);
  if(!entry||!style)throw Error("Unknown style: "+id);
  return {id,assetId:entry.asset,label:style.label,labelCN:entry.labelCN,
   visualDNA:entry.dna,summary:entry.summary,layouts:entry.layouts,materials:entry.materials,
   interactions:entry.interactions,density:entry.density,devices:entry.devices,
   contexts:style.categories,reactThemeCompatible:supported.has(id),
   preview:previewPath(entry),documentation:style.documentation,caution:entry.caution};
 });
}
