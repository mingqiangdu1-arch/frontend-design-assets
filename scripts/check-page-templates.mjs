import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
export function validatePageRegistry(root=process.cwd()){
 const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
 const pages=read("registry/page-templates.json"),styles=read("registry/styles.json"),
 assets=read("registry/assets.json"),components=read("registry/components.json");
 const isFile=p=>fs.statSync(path.join(root,p),{throwIfNoEntry:false})?.isFile();
 const styleIds=new Set(styles.styles.map(s=>s.id)),assetIds=new Set(assets.assets.map(a=>a.id));
 const ids=new Set();
 if(pages.defaultTemplateId!==null)throw Error("Implicit default not allowed");
 for(const page of pages.templates){
  if(ids.has(page.id))throw Error("Duplicate template "+page.id);
  ids.add(page.id);
  if(!styleIds.has(page.styleId))throw Error("Unknown style "+page.id);
  if(!["prototype","reference-implemented","validated"].includes(page.status))throw Error("Invalid stage "+page.id);
  if(!page.applicationContexts?.length||!page.sections?.length||!page.requiredChecks?.length)throw Error("Incomplete entry "+page.id);
  for(const field of ["demo","source","tokens"])if(!isFile(page[field]))throw Error("Missing "+field+": "+page[field]);
  for(const id of page.assetIds)if(!assetIds.has(id))throw Error("Missing referenced asset "+id);
  if(page.implementation==="react-vite"){
   if(!page.wiredUIExportIds?.length)throw Error("React page missing explicit wired exports "+page.id);
   const sourcePath=path.posix.join(path.posix.dirname(page.demo),"src/main.tsx");
   if(!isFile(sourcePath))throw Error("Missing real React page source "+sourcePath);
   const source=fs.readFileSync(path.join(root,sourcePath),"utf8");
   if(!source.includes('from "../../../packages/ui/src/index"'))throw Error("React page "+page.id+" does not import real UI library");
   for(const id of page.wiredUIExportIds){
    const entry=components.entries.find(item=>item.id===id);
    if(!entry||!new RegExp("\\b"+entry.exportName+"\\b").test(source))throw Error("React page missing wired component "+id);
   }
  }
  const asset=assets.assets.find(a=>a.id===page.id);
  if(!asset||asset.styleIds.length!==1||asset.styleIds[0]!==page.styleId)throw Error("Wrong indexed template "+page.id);
 }
 const gallery=fs.readFileSync(path.join(root,"playground/page-blueprints/index.html"),"utf8");
 for(const id of ids)if(!gallery.includes('data-template="'+id+'"'))throw Error("Missing gallery card "+id);
 if(components.styleIds.includes("neo-brutalist"))throw Error("Unverified fifth style React mapping");
 return {templates:ids.size,styles:styleIds.size,assets:assetIds.size};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const result=validatePageRegistry();console.log("PASS "+result.templates+" templates, "+result.styles+" styles, "+result.assets+" indexed assets.");
}
