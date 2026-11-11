import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {OFFICIAL_SCHEMA,parseRegistryMetadata,parseNpmDependency,classifyRegistryAddress} from "../playground/registry-metadata-v041/registry-item-parser.mjs";
import {buildRegistryDependencyGraph,compareDependencySnapshots} from "../playground/registry-metadata-v041/dependency-graph.mjs";
import {makeInternalSnapshot,migrateInternalSnapshot,compareInternalSnapshots} from "../playground/registry-metadata-v041/metadata-migration.mjs";
const f=JSON.parse(fs.readFileSync("playground/registry-metadata-v041/official-metadata-fixtures.json","utf8"));
const provenance=e=>({repository:f.upstream,commit:f.commit,sourceFile:e.sourceFile});
const parse=e=>parseRegistryMetadata(e.item,provenance(e));
const records=f.records.map(parse);
const byName=new Map(records.map(r=>[r.name,r]));
test("official metadata evidence has 3 exact pinned, code-free Registry items",()=>{
 assert.equal(f.records.length,3);
 assert.match(f.commit,/^[a-f0-9]{40}$/);
 assert.equal(f.upstream,"shadcn-ui/ui");
 assert.deepEqual(records.map(r=>r.name),["button","alert-dialog","login-04"]);
 assert.ok(f.records.every(r=>r.item.$schema===OFFICIAL_SCHEMA));
 assert.ok(f.records.every(r=>r.item.files.every(file=>!Object.hasOwn(file,"content"))));
 assert.ok(records.every(r=>r.metadataOnly&&!r.canInstall&&!r.codeImported));
});
test("official button and alert-dialog dependencies match pinned upstream registry metadata",()=>{
 const b=byName.get("button"),a=byName.get("alert-dialog");
 assert.deepEqual(b.dependencies.packages.map(d=>d.raw),["radix-ui"]);
 assert.deepEqual(a.dependencies.packages.map(d=>d.raw),["radix-ui"]);
 assert.deepEqual(a.dependencies.registry.map(d=>d.raw),["button"]);
 assert.deepEqual(a.files.map(x=>x.path),["ui/alert-dialog.tsx"]);
 assert.deepEqual(a.files.map(x=>x.contentOmitted),[true]);
});
test("official login block records target paths and unresolved registry deps, never installs",()=>{
 const p=byName.get("login-04");
 assert.equal(p.type,"registry:block");
 assert.deepEqual(p.dependencies.registry.map(x=>x.raw),["button","card","input","label","field"]);
 assert.equal(p.files[0].type,"registry:page");
 assert.equal(p.files[0].target,"app/login/page.tsx");
 assert.equal(p.files[1].target,null);
 assert.equal(p.categories[0],"authentication");
});
test("registry metadata extracts but never preserves or executes embedded vendor code",()=>{
 const item={...f.records[0].item,files:[{path:"ui/button.tsx",type:"registry:ui",content:"<img src=x onerror=alert(1)>"}]};
 const result=parseRegistryMetadata(item,provenance(f.records[0]));
 assert.equal(result.files[0].contentPresent,true);
 assert.equal(result.files[0].contentOmitted,true);
 assert.equal(JSON.stringify(result).includes("onerror"),false);
 assert.ok(result.reviewReasons.some(x=>x.startsWith("embedded-code-omitted")));
});
test("strict parser rejects source path traversal and unsafe target paths",()=>{
 const base=f.records[2];
 assert.throws(()=>parseRegistryMetadata({...base.item,files:[{path:"../evil.tsx",type:"registry:component"}]},provenance(base)),/Invalid or duplicated file/);
 assert.throws(()=>parseRegistryMetadata({...base.item,files:[{path:"blocks/login/page.tsx",type:"registry:page",target:"../../secret"}]},provenance(base)),/Unsafe/);
 assert.throws(()=>parseRegistryMetadata({...base.item,files:[{path:"blocks/login/page.tsx",type:"registry:page"}]},provenance(base)),/Explicit target/);
 assert.throws(()=>parseRegistryMetadata(base.item,{repository:"x",commit:"main",sourceFile:"src.ts"}),/Pinned provenance/);
});
test("registry parser fails closed on malformed item identity or foreign schema URI",()=>{
 const base=f.records[0];
 assert.throws(()=>parseRegistryMetadata({...base.item,name:"<script>"},provenance(base)),/identity/);
 assert.throws(()=>parseRegistryMetadata({...base.item,type:"unknown-type"},provenance(base)),/identity/);
 assert.throws(()=>parseRegistryMetadata({...base.item,$schema:"https://evil.example/schema"},provenance(base)),/Unsupported Registry schema/);
 assert.throws(()=>parseRegistryMetadata("{bad",provenance(base)),/Invalid Registry JSON/);
});
test("unsupported registry item fields and CSS metadata are flagged not applied",()=>{
 const base=f.records[0];
 const result=parseRegistryMetadata({...base.item,unknownFutureProperty:1,cssVars:{light:{brand:"#fff"}},tailwind:{config:{}}},provenance(base));
 assert.ok(result.reviewReasons.includes("unsupported-item-field:unknownFutureProperty"));
 assert.ok(result.reviewReasons.includes("style-metadata-not-applied:cssVars"));
 assert.ok(result.reviewReasons.includes("style-metadata-not-applied:tailwind"));
 assert.equal(result.canInstall,false);
});
test("dependency address classifier distinguishes bare, namespace, HTTPS, GitHub and local",()=>{
 assert.equal(classifyRegistryAddress("button").kind,"builtin");
 assert.equal(classifyRegistryAddress("@acme/forms").kind,"namespace");
 assert.equal(classifyRegistryAddress("https://example.com/r/demo.json").kind,"url");
 assert.equal(classifyRegistryAddress("./demo.json").kind,"local");
 const repo=classifyRegistryAddress("acme/ui/forms/login#v1.2.0");
 assert.equal(repo.kind,"github");assert.equal(repo.pinned,true);assert.equal(repo.ref,"v1.2.0");
 assert.throws(()=>classifyRegistryAddress("http://example.com/r/demo.json"),/Invalid|Unsupported/);
});
test("npm classifier distinguishes scoped package and pinned versions",()=>{
 assert.deepEqual(parseNpmDependency("@scope/button@^3.1.0"),{raw:"@scope/button@^3.1.0",name:"@scope/button",version:"^3.1.0"});
 assert.equal(parseNpmDependency("radix-ui").version,null);
 assert.equal(parseNpmDependency("motion@2.1.3").name,"motion");
 assert.throws(()=>parseNpmDependency("bad package"),/Invalid/);
});
test("dependency graph resolves only local reviewed items in topological order",()=>{
 const g=buildRegistryDependencyGraph(records,"alert-dialog");
 assert.deepEqual(g.orderedLocalItems,["button","alert-dialog"]);
 assert.equal(g.unresolved.length,0);
 assert.deepEqual(g.packages.map(p=>p.name),["radix-ui"]);
 assert.equal(g.networkRequests,0);assert.equal(g.canInstall,false);
});
test("block graph lists missing builtin records as unresolved, not installed",()=>{
 const g=buildRegistryDependencyGraph(records,"login-04");
 assert.deepEqual(g.orderedLocalItems,["button","login-04"]);
 assert.deepEqual(g.unresolved.map(x=>x.address),["card","input","label","field"]);
 assert.ok(g.unresolved.every(x=>x.reason==="missing-reviewed-local-record"));
});
test("graph rejects cycles and duplicate normalized item names",()=>{
 const a=structuredClone(byName.get("button")),b=structuredClone(byName.get("alert-dialog"));
 a.dependencies.registry.push({raw:"alert-dialog",kind:"builtin",pinned:false});
 assert.throws(()=>buildRegistryDependencyGraph([a,b],"button"),/cycle/);
 assert.throws(()=>buildRegistryDependencyGraph([a,a],"button"),/duplicated/);
});
test("graph detects differing npm version specs without installing either",()=>{
 const a=structuredClone(byName.get("button")),b=structuredClone(byName.get("alert-dialog"));
 b.dependencies.packages=[{raw:"radix-ui@2.0.0",name:"radix-ui",version:"2.0.0"}];
 const g=buildRegistryDependencyGraph([a,b],"alert-dialog");
 assert.equal(g.conflicts.length,1);
 assert.equal(g.conflicts[0].package,"radix-ui");
});
test("normalized dependency diff differentiates synthetic changes from pinned source",()=>{
 const a=byName.get("button"),b=structuredClone(a);
 b.dependencies.packages.push({raw:"example-only@1.0.0",name:"example-only",version:"1.0.0"});
 const result=compareDependencySnapshots(a,b);
 assert.deepEqual(result.added,["npm:example-only@1.0.0"]);
 assert.deepEqual(result.removed,[]);
 assert.equal(result.commitChanged,false);
 assert.equal(result.installationTested,false);
});
test("internal V1-to-V2 migration is explicit; no claim about upstream schema upgrades",()=>{
 const n=makeInternalSnapshot(byName.get("alert-dialog"));
 const legacy={formatVersion:"1.0",itemName:n.identity.name,itemType:n.identity.type,npm:n.dependencies.packages,development:n.dependencies.development,registry:n.dependencies.registry,filePaths:n.filePaths,provenance:n.provenance};
 const migrated=migrateInternalSnapshot(legacy);
 assert.equal(migrated.formatVersion,"2.0");
 assert.equal(migrated.identity.name,"alert-dialog");
 assert.equal(migrated.mode,"metadata-only");
 assert.equal(migrated.needsReview,true);
 assert.deepEqual(migrated.dependencies,n.dependencies);
 assert.deepEqual(migrateInternalSnapshot(n),n);
});
test("internal migrator rejects unknown versions/fields and reports file/commit diffs",()=>{
 const original=makeInternalSnapshot(byName.get("login-04"));
 assert.throws(()=>migrateInternalSnapshot({formatVersion:"3.0"}),/Unsupported/);
 assert.throws(()=>migrateInternalSnapshot({...original,execute:"javascript"}),/Malformed/);
 const later=structuredClone(original);later.filePaths.pop();later.provenance.commit="a".repeat(40);
 const d=compareInternalSnapshots(original,later);
 assert.deepEqual(d.removedFiles,["blocks/login-04/components/login-form.tsx"]);
 assert.equal(d.pinnedCommitChanged,true);assert.equal(d.installable,false);
});
