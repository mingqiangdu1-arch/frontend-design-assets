// IP-067 · Pure, offline dependency graph over already parsed read-only Registry metadata.
const object=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
export function buildRegistryDependencyGraph(records,rootName){
 if(!Array.isArray(records)||records.length<1||records.length>30)throw Error("Expected 1–30 metadata records");
 const byName=new Map();
 for(const r of records){
  if(!object(r)||r.schemaVersion!=="v041-readonly-1"||typeof r.name!=="string"||byName.has(r.name))throw Error("Invalid or duplicated record");
  byName.set(r.name,r);
 }
 if(!byName.has(rootName))throw Error("Unknown graph root");
 const visited=new Set(),visiting=new Set(),order=[],unresolved=[],edges=[];
 const visit=name=>{
  if(visiting.has(name))throw Error("Registry dependency cycle");
  if(visited.has(name))return;
  visiting.add(name);
  const item=byName.get(name);
  for(const dep of item.dependencies.registry){
   edges.push({from:name,to:dep.raw,kind:dep.kind,pinned:dep.pinned});
   if(dep.kind==="builtin"&&byName.has(dep.raw))visit(dep.raw);
   else unresolved.push({from:name,address:dep.raw,kind:dep.kind,reason:dep.kind==="builtin"?"missing-reviewed-local-record":"external-resolution-disabled"});
  }
  visiting.delete(name);visited.add(name);order.push(name);
 };
 visit(rootName);
 const packageMap=new Map();
 const conflicts=[];
 for(const name of order){
  const item=byName.get(name);
  for(const dep of [...item.dependencies.packages,...item.dependencies.development]){
   const prev=packageMap.get(dep.name);
   if(prev&&prev.version!==dep.version)conflicts.push({package:dep.name,first:prev.version,other:dep.version,source:name});
   else if(!prev)packageMap.set(dep.name,{name:dep.name,version:dep.version});
  }
 }
 return {root:rootName,orderedLocalItems:order,registryEdges:edges,unresolved,packages:[...packageMap.values()],conflicts,canInstall:false,networkRequests:0};
}
export function compareDependencySnapshots(earlier,later){
 if(!object(earlier)||!object(later)||earlier.schemaVersion!=="v041-readonly-1"||later.schemaVersion!=="v041-readonly-1")throw Error("Only normalized metadata can be compared");
 if(earlier.name!==later.name)throw Error("Snapshot identity mismatch");
 const list=r=>[...r.dependencies.packages.map(d=>"npm:"+d.raw),...r.dependencies.development.map(d=>"dev:"+d.raw),...r.dependencies.registry.map(d=>"registry:"+d.raw)].sort();
 const before=new Set(list(earlier)),after=new Set(list(later));
 return {name:earlier.name,added:[...after].filter(d=>!before.has(d)),removed:[...before].filter(d=>!after.has(d)),commitChanged:earlier.provenance.commit!==later.provenance.commit,installationTested:false};
}
