// IP-066 · Original read-only shadcn Registry *metadata subset* parser.
// It deliberately discards file.content and NEVER fetches URLs or executes/transforms code.
export const OFFICIAL_SCHEMA="https://ui.shadcn.com/schema/registry-item.json";
const TYPES=new Set(["registry:ui","registry:block","registry:component","registry:hook","registry:lib","registry:page","registry:file","registry:item","registry:theme","registry:style"]);
const KEYS=new Set(["$schema","name","type","title","description","dependencies","devDependencies","registryDependencies","files","categories","cssVars","tailwind"]);
const SAFE_NAME=/^[a-z0-9][a-z0-9-]{0,79}$/;
const isObject=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const goodText=(value,max=200)=>typeof value==="string"&&value.length>0&&value.length<=max;
const safePath=path=>goodText(path,250)&&!path.startsWith("/")&&!path.startsWith("~")&&!path.includes("\\")&&!/^[A-Za-z]:/.test(path)&&!path.split("/").some(s=>!s||s==="."||s==="..")&&!/[\u0000-\u001f]/.test(path);
const uniqueStrings=(values,label,max=50)=>{
 if(values===undefined)return [];
 if(!Array.isArray(values)||values.length>max||values.some(x=>!goodText(x,250))||new Set(values).size!==values.length)throw Error("Invalid "+label);
 return [...values];
};
export function parseNpmDependency(raw){
 if(!goodText(raw,200)||/\s/.test(raw))throw Error("Invalid npm dependency");
 // Scoped packages split only on the second @.
 const match=raw.match(/^(@[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+|[a-zA-Z0-9_.-]+)(?:@(.+))?$/);
 if(!match||match[2]==="")throw Error("Invalid npm dependency");
 return {raw,name:match[1],version:match[2]||null};
}
export function classifyRegistryAddress(raw){
 if(!goodText(raw,250)||/\s/.test(raw))throw Error("Invalid registry dependency");
 if(/^[a-z][a-z0-9-]*$/.test(raw))return {raw,kind:"builtin",pinned:false};
 if(/^@[a-z0-9-]+\/[a-z0-9-/]+$/.test(raw))return {raw,kind:"namespace",pinned:false};
 if(/^https?:\/\//.test(raw)&&!raw.startsWith("https://"))throw Error("Unsupported insecure registry URL");
 if(raw.startsWith("https://")){const url=new URL(raw);if(url.username||url.password||url.hash)throw Error("Unsupported registry URL");return {raw,kind:"url",pinned:false};}
 if(/^\.\/[a-z0-9/_-]+\.json$/.test(raw)&&!raw.includes("../"))return {raw,kind:"local",pinned:false};
 const github=raw.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-/]+)(?:#([a-zA-Z0-9_.-]+))?$/);
 if(github&&!github[3].includes(".."))return {raw,kind:"github",pinned:!!github[4],ref:github[4]||null};
 // Preserve opaque address for review. Never resolve.
 return {raw,kind:"unrecognized",pinned:false};
}
export function parseRegistryMetadata(payload,provenance){
 let item=payload;
 if(typeof payload==="string"){
  if(payload.length>65536)throw Error("Registry JSON exceeds read-only metadata limit");
  try{item=JSON.parse(payload);}catch{throw Error("Invalid Registry JSON");}
 }
 if(!isObject(item)||!SAFE_NAME.test(item.name)||!TYPES.has(item.type))throw Error("Invalid Registry item identity/type");
 if(!isObject(provenance)||!goodText(provenance.repository,140)||!/^[a-f0-9]{40}$/.test(provenance.commit)||!safePath(provenance.sourceFile))throw Error("Pinned provenance required");
 if(item.$schema!==undefined&&item.$schema!==OFFICIAL_SCHEMA)throw Error("Unsupported Registry schema URI");
 const extraFields=Object.keys(item).filter(k=>!KEYS.has(k));
 const registryDeps=uniqueStrings(item.registryDependencies,"registryDependencies").map(classifyRegistryAddress);
 const npmDeps=uniqueStrings(item.dependencies,"dependencies").map(parseNpmDependency);
 const devDeps=uniqueStrings(item.devDependencies,"devDependencies").map(parseNpmDependency);
 if(!Array.isArray(item.files)||item.files.length>60||item.files.length<1)throw Error("Registry files must be 1–60 entries");
 const paths=new Set();
 const files=item.files.map(f=>{
  if(!isObject(f)||!safePath(f.path)||!TYPES.has(f.type)||paths.has(f.path))throw Error("Invalid or duplicated file path/type");
  paths.add(f.path);
  if(f.target!==undefined&&!safePath(f.target.replace(/^@(ui|lib|hooks|components)\//,"resolved/")))throw Error("Unsafe or unsupported file target");
  if((f.type==="registry:page"||f.type==="registry:file")&&!goodText(f.target,250))throw Error("Explicit target required for page/file");
  const extra=Object.keys(f).filter(k=>!["path","type","target","content"].includes(k));
  if(f.content!==undefined&&typeof f.content!=="string")throw Error("Invalid embedded file content");
  return {path:f.path,type:f.type,target:f.target||null,contentPresent:f.content!==undefined,contentOmitted:true,unparsedFields:extra};
 });
 const categories=uniqueStrings(item.categories,"categories",20);
 const nonExecutableFields=["cssVars","tailwind"].filter(k=>item[k]!==undefined);
 const reviewReasons=[
  ...extraFields.map(k=>"unsupported-item-field:"+k),
  ...nonExecutableFields.map(k=>"style-metadata-not-applied:"+k),
  ...files.flatMap(f=>f.unparsedFields.map(k=>"unsupported-file-field:"+k)),
  ...files.filter(f=>f.contentPresent).map(f=>"embedded-code-omitted:"+f.path),
  ...registryDeps.filter(d=>d.kind!=="builtin").map(d=>"external-dependency-unresolved:"+d.raw)
 ];
 return {
  schemaVersion:"v041-readonly-1",
  name:item.name,type:item.type,title:typeof item.title==="string"?item.title.slice(0,200):item.name,
  description:typeof item.description==="string"?item.description.slice(0,500):"",
  categories,
  dependencies:{packages:npmDeps,development:devDeps,registry:registryDeps},
  files,
  provenance:{repository:provenance.repository,commit:provenance.commit,sourceFile:provenance.sourceFile,licenseScope:"repository-only-review"},
  reviewReasons,
  canInstall:false,codeImported:false,metadataOnly:true,
  coverage:"official Registry item common fields; no schema validation claim for all items"
 };
}
