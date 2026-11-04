import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
export function validateCreative(root=process.cwd()){
 const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),"utf8"));
 const registry=read("registry/creative-directions.json");
 const styles=read("registry/styles.json");
 const assets=read("registry/assets.json");
 if(registry.defaultStyleId!==null||styles.defaultStyleId!==null)throw Error("Creative selection must not define a global default");
 if(registry.styles.length!==4)throw Error("Expected four staged experimental directions");
 const ids=new Set(),styleIds=new Set(styles.styles.map(x=>x.id)),assetIds=new Set(assets.assets.map(x=>x.id));
 const html=fs.readFileSync(path.join(root,"playground/creative-style-lab/index.html"),"utf8");
 for(const entry of registry.styles){
  if(ids.has(entry.id)||!styleIds.has(entry.id))throw Error("Duplicate or unregistered creative style: "+entry.id);
  ids.add(entry.id);
  const stylesEntry=styles.styles.find(x=>x.id===entry.id);
  const profile=read(stylesEntry.styleProfile);
  const tokens=read(stylesEntry.tokens.json);
  const css=fs.readFileSync(path.join(root,stylesEntry.tokens.css),"utf8");
  if(profile.id!==entry.id||tokens.id!==entry.id||profile.assetId!==entry.assetId)throw Error("Profile token or asset mismatch "+entry.id);
  if(!assetIds.has(entry.assetId))throw Error("Missing indexed style asset "+entry.assetId);
  if(!css.includes('[data-design-theme="'+entry.id+'"]'))throw Error("Creative tokens not scoped "+entry.id);
  if(!html.includes('data-scene="'+entry.id+'"'))throw Error("Missing full composition "+entry.id);
  for(const key of ["layout","typography","texture","motion","interactions","negative","surprise"]){
   if(!Array.isArray(entry[key])||entry[key].length<3)throw Error("Creative grammar too shallow: "+entry.id+" "+key);
  }
  if(!entry.caution||!Array.isArray(entry.contexts)||entry.contexts.length<3)throw Error("Missing accessible usage constraints "+entry.id);
 }
 const library=fs.readFileSync(path.join(root,"packages/ui/src/themes.css"),"utf8");
 if(!library.includes("precision-dark"))throw Error("Expected original UI package themes");
 for(const id of ids)if(library.includes('[data-design-theme="'+id+'"]'))throw Error("Experimental style incorrectly claimed as integrated React theme: "+id);
 return {directions:ids.size,registeredStyles:styleIds.size,assetCount:assets.assets.length,reactExperimentalThemes:0};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const data=validateCreative();
 console.log("PASS creative directions: "+data.directions+" new art-direction systems / "+data.registeredStyles+" total styles / "+data.assetCount+" indexed assets; no implicit defaults or new React theme claims");
}
