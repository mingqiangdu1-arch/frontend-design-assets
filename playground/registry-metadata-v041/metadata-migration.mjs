// IP-068 · Internal normalized metadata format migration only. Does not migrate upstream shadcn schema.
const copy=x=>JSON.parse(JSON.stringify(x));
const object=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const V1_KEYS=new Set(["formatVersion","itemName","itemType","npm","development","registry","filePaths","provenance"]);
const V2_KEYS=new Set(["formatVersion","identity","dependencies","filePaths","provenance","mode","needsReview"]);
export function makeInternalSnapshot(metadata){
 if(!object(metadata)||metadata.schemaVersion!=="v041-readonly-1")throw Error("Normalized metadata required");
 return {formatVersion:"2.0",identity:{name:metadata.name,type:metadata.type},
  dependencies:copy(metadata.dependencies),
  filePaths:metadata.files.map(f=>({path:f.path,type:f.type,target:f.target})),
  provenance:copy(metadata.provenance),
  mode:"metadata-only",
  needsReview:metadata.reviewReasons.length>0};
}
export function migrateInternalSnapshot(snapshot){
 if(!object(snapshot))throw Error("Invalid internal snapshot");
 if(snapshot.formatVersion==="2.0"){
  if(Object.keys(snapshot).some(k=>!V2_KEYS.has(k))||!object(snapshot.identity)||!object(snapshot.dependencies)||
   !Array.isArray(snapshot.filePaths)||snapshot.mode!=="metadata-only"||typeof snapshot.needsReview!=="boolean")throw Error("Malformed v2 snapshot");
  return copy(snapshot);
 }
 if(snapshot.formatVersion!=="1.0"||Object.keys(snapshot).some(k=>!V1_KEYS.has(k)))throw Error("Unsupported internal snapshot version");
 if(typeof snapshot.itemName!=="string"||typeof snapshot.itemType!=="string"||
  !Array.isArray(snapshot.npm)||!Array.isArray(snapshot.development)||
  !Array.isArray(snapshot.registry)||!Array.isArray(snapshot.filePaths)||
  !object(snapshot.provenance))throw Error("Malformed v1 snapshot");
 return {formatVersion:"2.0",identity:{name:snapshot.itemName,type:snapshot.itemType},
  dependencies:{packages:copy(snapshot.npm),development:copy(snapshot.development),registry:copy(snapshot.registry)},
  filePaths:copy(snapshot.filePaths),provenance:copy(snapshot.provenance),
  mode:"metadata-only",needsReview:true};
}
export function compareInternalSnapshots(left,right){
 const a=migrateInternalSnapshot(left),b=migrateInternalSnapshot(right);
 if(a.identity.name!==b.identity.name)throw Error("Snapshot identity mismatch");
 return {name:a.identity.name,
  changedTypes:a.identity.type!==b.identity.type,
  addedFiles:b.filePaths.filter(x=>!a.filePaths.some(y=>y.path===x.path)).map(x=>x.path),
  removedFiles:a.filePaths.filter(x=>!b.filePaths.some(y=>y.path===x.path)).map(x=>x.path),
  pinnedCommitChanged:a.provenance.commit!==b.provenance.commit,
  changedDependencies:JSON.stringify(a.dependencies)!==JSON.stringify(b.dependencies),
  migrationApplied:false,installable:false};
}
