export const STYLE_ANY="all";
export const NO_STYLE="agnostic";
const field=(value)=>Array.isArray(value)?value.map(String):[];
export function normalizeAsset(asset){
 return {...asset,id:String(asset.id??""),name:String(asset.name??asset.id??""),type:String(asset.type??"uncategorized"),stage:String(asset.stage??"captured"),styleIds:field(asset.styleIds),applicationContexts:field(asset.applicationContexts),dependencies:field(asset.dependencies),tags:field(asset.tags)};
}
export function filterAssets(items,{query="",style="all",type="all",stage="all",context="all",includeAgnostic=false}={}){
 const q=String(query).trim().toLocaleLowerCase();
 return items.map(normalizeAsset).filter(a=>{
  const matchesText=!q||[a.id,a.name,a.type,a.stage,...a.tags,...a.styleIds,...a.applicationContexts].join(" ").toLocaleLowerCase().includes(q);
  const matchesStyle=style==="all"||(style===NO_STYLE?a.styleIds.length===0:a.styleIds.includes(style)||(includeAgnostic&&a.styleIds.length===0));
  return matchesText&&matchesStyle&&(type==="all"||a.type===type)&&(stage==="all"||a.stage===stage)&&(context==="all"||a.applicationContexts.includes(context));
 }).sort((a,b)=>a.id.localeCompare(b.id,"en",{numeric:true}));
}
export function facetValues(items,key){
 return [...new Set(items.flatMap(a=>Array.isArray(a[key])?a[key]:a[key]?[a[key]]:[]).map(String))].sort((a,b)=>a.localeCompare(b,"en"));
}
export function toggleSelection(ids,id){
 const next=new Set(ids);next.has(id)?next.delete(id):next.add(id);return next;
}
export function safeRepoPath(input){
 if(typeof input!=="string"||!input||input.startsWith("/")||input.includes("\\")||input.split("/").includes("..")||/^[a-z]+:/i.test(input))return null;
 return input;
}
export function formatBundle(items,selectedIds,{title="Frontend asset selection",repo="frontend-design-assets"}={}){
 const records=items.map(normalizeAsset).filter(a=>selectedIds.has(a.id)).sort((a,b)=>a.id.localeCompare(b.id,"en",{numeric:true}));
 const allStyles=[...new Set(records.flatMap(a=>a.styleIds))];
 const hasMixedStyles=allStyles.length>1;
 const lines=["# "+title,"","Source repository: "+repo,"",
 "Selected assets: "+records.length,
 "Visual profiles: "+(allStyles.join(", ")||"style-agnostic only"),
 hasMixedStyles?"Warning: multiple explicit style IDs; research references only. Do not auto-compose incompatible themes.":"No cross-style compatibility is implied.",
 "",
 "## Asset manifest"];
 for(const a of records){
  lines.push("### "+a.id+" · "+a.name,"- Type / stage: "+a.type+" / "+a.stage,
   "- Styles: "+(a.styleIds.join(", ")||"agnostic"),"- Contexts: "+(a.applicationContexts.join(", ")||"unspecified"),
   "- Dependencies: "+(a.dependencies.join(", ")||"none"),"- Local path: "+(safeRepoPath(a.path)||"not provided"),"");
 }
 lines.push("## Implementation handoff","- Resolve product task, audience, devices and target framework before choosing any visual system.",
 "- Inspect source/rights and check dependency IDs before implementation.",
 "- Use reference-implemented/validated assets only within documented boundaries.",
 "- Run keyboard, mobile, reduced-motion and failure-state acceptance checks.",
 "- No assets here are automatically production-certified or integrated into a target product.");
 return lines.join("\n");
}
