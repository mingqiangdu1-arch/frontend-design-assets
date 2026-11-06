import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const get=relative=>fs.readFileSync(path.join(root,relative),"utf8");
const manifest=JSON.parse(get("registry/components.json"));
const assets=JSON.parse(get("registry/assets.json")).assets;
const styles=JSON.parse(get("registry/styles.json")).styles.map(s=>s.id);
const source=get("packages/ui/src/index.tsx");
if(new Set(manifest.entries.map(x=>x.id)).size!==manifest.entries.length)throw Error("Duplicate component ID");
if(new Set(manifest.entries.map(x=>x.exportName)).size!==manifest.entries.length)throw Error("Duplicate component export");
for(const item of manifest.entries){
 const found=assets.find(x=>x.id===item.id);
 if(!found)throw Error("Missing indexed asset: "+item.id);
 if(found.exportName!==item.exportName)throw Error(item.id+" has mismatched export");
 const fileSource=get(item.source||"packages/ui/src/index.tsx");
 if(!new RegExp("export (?:const|function) "+item.exportName+"\\b").test(fileSource))
  throw Error(item.id+" is not implemented in "+item.source);
 if(item.source!=="packages/ui/src/index.tsx"&&!new RegExp(
  "export \\{[^}]*\\b"+item.exportName+"\\b[^}]*\\} from [\\\"']\\./advanced[\\\"']"
 ).test(source))throw Error(item.id+" is not re-exported by the public UI index");
 if(found.stage==="production-ready")throw Error("Component incorrectly declared production ready: "+item.id);
}
for(const style of manifest.styleIds)if(!styles.includes(style))throw Error("Undeclared style "+style);
if(/(^|\n)\s*:root\s*\{/.test(get("packages/ui/src/themes.css")))throw Error("Global default theme tokens not allowed");
console.log("Validated "+manifest.entries.length+" exported React components, "+manifest.styleIds.length+" explicit themes and registry links.");
