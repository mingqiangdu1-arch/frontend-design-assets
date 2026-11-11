import {parseRegistryMetadata} from "./registry-item-parser.mjs";
import {buildRegistryDependencyGraph,compareDependencySnapshots} from "./dependency-graph.mjs";
import {makeInternalSnapshot,migrateInternalSnapshot,compareInternalSnapshots} from "./metadata-migration.mjs";
const $=id=>document.getElementById(id);
const el=(tag,text,cls)=>{const x=document.createElement(tag);x.textContent=text;if(cls)x.className=cls;return x;};
let fixtures=null,records=[],selected=null;
const announce=s=>{$("status").textContent=s;};
function render(){
 selected=records.find(x=>x.name===$("itemSelect").value);
 if(!selected)return;
 const item=selected;
 $("typeLine").textContent=item.name+" · "+item.type+" · "+item.files.length+" source path(s) · 无组件代码";
 const frag=document.createDocumentFragment();
 for(const f of item.files){
  const row=el("div",f.path,"rm41-file");
  row.append(el("span","类型："+f.type+(f.target?" · 标记目标："+f.target:" · 无显式 target")));
  frag.append(row);
 }
 $("fileList").replaceChildren(frag);
 $("upstream").href="https://github.com/"+item.provenance.repository+"/blob/"+item.provenance.commit+"/"+item.provenance.sourceFile;
 const graph=buildRegistryDependencyGraph(records,item.name);
 $("localCount").textContent=String(graph.orderedLocalItems.length);
 $("unresolvedCount").textContent=String(graph.unresolved.length);
 const details=document.createDocumentFragment();
 details.append(el("div","本地拓扑顺序："+graph.orderedLocalItems.join(" → "),"rm41-deps"));
 details.append(el("div","npm 包（仅记录）："+(graph.packages.map(x=>x.name+(x.version?"@"+x.version:"")).join("、")||"无"),"rm41-deps"));
 for(const m of graph.unresolved)details.append(el("div",m.address+" · "+m.reason,"rm41-deps"));
 $("dependencyDetails").replaceChildren(details);
 $("analysisOutput").textContent=JSON.stringify({name:item.name,type:item.type,reviewReasons:item.reviewReasons,codeImported:item.codeImported,canInstall:item.canInstall},null,2);
 announce("已解析 "+item.name+" 的本地固定版本元数据。未请求外部代码或安装组件。");
}
function run(fn){
 try{$("analysisOutput").textContent=JSON.stringify(fn(),null,2);announce("仅在本地完成静态分析。");}
 catch(e){announce("分析失败："+String(e.message||e));}
}
$("itemSelect").addEventListener("change",render);
$("migrate").addEventListener("click",()=>run(()=>{
 const metadata=selected,original=makeInternalSnapshot(metadata);
 const old={formatVersion:"1.0",itemName:original.identity.name,itemType:original.identity.type,
  npm:original.dependencies.packages,development:original.dependencies.development,registry:original.dependencies.registry,
  filePaths:original.filePaths,provenance:original.provenance};
 const migrated=migrateInternalSnapshot(old);
 return {source:"original internal format v1 (synthetic)",output:migrated,changeSummary:compareInternalSnapshots(migrated,original),note:"No shadcn upstream schema migration or installation"};
}));
$("diff").addEventListener("click",()=>run(()=>{
 const before=selected;
 const after=structuredClone(selected);
 after.dependencies.packages.push({name:"example-diff-only",version:"1.0.0",raw:"example-diff-only@1.0.0"});
 return {source:"synthetic test change, NOT upstream fact",diff:compareDependencySnapshots(before,after)};
}));
$("resetOutput").addEventListener("click",render);
async function init(){
 try{
  const response=await fetch("./official-metadata-fixtures.json");
  if(!response.ok)throw Error("Local metadata fixture not found");
  fixtures=await response.json();
  if(fixtures.schemaVersion!=="1.0"||fixtures.records?.length!==3)throw Error("Unexpected fixture registry version");
  records=fixtures.records.map(entry=>parseRegistryMetadata(entry.item,{repository:fixtures.upstream,commit:fixtures.commit,sourceFile:entry.sourceFile}));
  const select=$("itemSelect");select.replaceChildren();
  for(const record of records){const option=el("option",record.name);option.value=record.name;select.append(option);}
  select.disabled=false;select.value="alert-dialog";
  $("commitId").textContent=fixtures.commit.slice(0,12);
  $("sourceNotice").textContent="仅固定版本元数据 · 3 官方条目 · 代码未复制";
  render();
 }catch(e){announce("本地 Fixture 加载失败："+String(e.message||e));}
}
init();
