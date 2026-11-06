import fs from "node:fs";
import path from "node:path";
import {fileURLToPath,pathToFileURL} from "node:url";
import {previewPath} from "./style-match.mjs";

// Fail closed on stale asset IDs, missing demos, invented React compatibility, and facet drift.
export function validateStyleFacets(styles,facets,components,assets,root=process.cwd()){
 if(styles.defaultStyleId!==null||facets.defaultStyleId!==null)throw Error("Theme atlas must not choose a global default");
 if(!facets.dimensions||!Array.isArray(facets.entries))throw Error("Theme facets schema missing");
 const ids=new Set(styles.styles.map(s=>s.id)),assetsById=new Map(assets.assets.map(a=>[a.id,a]));
 if(styles.styles.length!==facets.entries.length)throw Error("All registered styles must appear exactly once in atlas");
 const seen=new Set(),allowed={layouts:"layouts",materials:"materials",interactions:"interactions",density:"density",devices:"devices"};
 for(const entry of facets.entries){
  if(seen.has(entry.id)||!ids.has(entry.id))throw Error("Duplicate or unknown atlas style: "+entry.id);
  seen.add(entry.id);
  const style=styles.styles.find(s=>s.id===entry.id),asset=assetsById.get(entry.asset);
  if(!asset||!asset.styleIds?.includes(entry.id)||asset.type!=="token")throw Error("Wrong style asset: "+entry.id);
  for(const key of ["labelCN","summary","caution"]){
   if(typeof entry[key]!=="string"||entry[key].trim().length<5)throw Error("Missing "+key+" for "+entry.id);
  }
  if(!Array.isArray(entry.keywords)||entry.keywords.length<4||
   !Array.isArray(entry.dna)||entry.dna.length<3)throw Error("Sparse search or visual DNA: "+entry.id);
  for(const [key,dimension] of Object.entries(allowed)){
   const values=entry[key];
   if(Array.isArray(values)){
    if(!values.length||new Set(values).size!==values.length)throw Error("Invalid "+key+" for "+entry.id);
    for(const v of values)if(!Object.hasOwn(facets.dimensions[dimension],v))throw Error("Unregistered "+key+": "+v);
   }else if(typeof values!=="string"||!Object.hasOwn(facets.dimensions[dimension],values)){
    throw Error("Invalid "+key+" for "+entry.id);
   }
  }
  if(!style.categories?.length)throw Error("No application contexts: "+entry.id);
  const preview=previewPath(entry),file=preview.split("?")[0];
  if(!fs.existsSync(path.join(root,file)))throw Error("Missing original interactive preview: "+entry.id+" -> "+file);
  if(!fs.existsSync(path.join(root,style.documentation))||
   !fs.existsSync(path.join(root,style.tokens.json)))throw Error("Missing original theme source: "+entry.id);
 }
 // Only four original package themes are permitted for direct React matching.
 if(components.styleIds.some(id=>!ids.has(id)))throw Error("React package declares an unknown theme");
 return {styles:seen.size,reactCompatible:components.styleIds.length,defaultStyleId:null};
}
export function validateRepo(root=process.cwd()){
 const read=file=>JSON.parse(fs.readFileSync(path.join(root,"registry",file),"utf8"));
 return validateStyleFacets(read("styles.json"),read("style-facets.json"),
  read("components.json"),read("assets.json"),root);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{const x=validateRepo();console.log("PASS theme atlas: "+x.styles+" registered style facets, "+x.reactCompatible+" explicit React themes, no default");}
 catch(error){console.error(error.message);process.exitCode=1;}
}
