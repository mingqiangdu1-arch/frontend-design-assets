import {assembleStyleBrief,toAssemblyMarkdown} from "../../scripts/style-assembly.mjs";

// Separate from Style Atlas selection. No theme or page template is selected implicitly.
const $=id=>document.getElementById(id);
const el=(tag,text,cls)=>{
 const node=document.createElement(tag);
 if(cls)node.className=cls;
 if(text!==undefined)node.textContent=text;
 return node;
};
let registry=null,lastBrief=null,lastMarkdown="";
function fill(select,options,placeholder){
 select.replaceChildren(el("option",placeholder));
 select.firstChild.value="";
 for(const [value,label] of options){
  const option=el("option",label);option.value=value;select.append(option);
 }
}
function allowedContexts(style){
 const templates=registry.assembly.recipes.find(r=>r.styleId===style)?.templateIds||[];
 const original=registry.styles.styles.find(s=>s.id===style);
 return [...new Set([...(original?.categories||[]),
  ...registry.templates.templates.filter(t=>templates.includes(t.id)).flatMap(t=>t.applicationContexts)])].sort();
}
function onStyleChanged(id,{updateURL=true}={}){
 const match=registry.styles.styles.find(s=>s.id===id);
 $("assemblyStyle").value=match?id:"";
 const templateSelect=$("assemblyTemplate"),contextSelect=$("assemblyContext");
 const priorContext=contextSelect.value;
 const recipe=registry.assembly.recipes.find(x=>x.styleId===id);
 fill(contextSelect,id?allowedContexts(id).map(x=>[x,x]):[],"不指定，保留开放判断");
 if(priorContext&&allowedContexts(id).includes(priorContext))contextSelect.value=priorContext;
 fill(templateSelect,(recipe?.templateIds||[]).map(tId=>{
  const t=registry.templates.templates.find(x=>x.id===tId);
  return [t.id,t.id+" · "+t.name+" ["+t.implementation+"]"];
 }),"不绑定真实模板，仅生成结构配方");
 lastBrief=null;lastMarkdown="";$("copyAssembly").disabled=true;
 $("assemblyResult").replaceChildren();
 $("assemblyMessage").textContent=match?"已指定 "+match.label+"。填写目标后生成页面搭建清单。":"请先选择一套主题，不设默认方案。";
 if(updateURL){
  const url=new URL(location.href);
  if(match)url.searchParams.set("briefStyle",id);
  else url.searchParams.delete("briefStyle");
  history.replaceState(history.state,"",url);
 }
}
function render(brief){
 const root=$("assemblyResult");root.replaceChildren();
 root.append(el("h3",brief.request.title));
 const badges=el("div",undefined,"assembly-metadata");
 for(const text of [brief.theme.assetId,brief.page.structureId,
  brief.integration.targetStack,
  brief.theme.reactCompatible?"React 包兼容候选":"需自行适配的独立主题"])
  badges.append(el("span",text));
 root.append(badges,el("p",brief.request.goal||brief.page.focus,"assembly-focus"));
 const source=el("div",undefined,"assembly-source");
 source.append(el("strong","已登记素材路径"));
 for(const [label,value] of [
  ["风格说明",brief.theme.source.documentation],
  ["Scoped Token",brief.theme.source.tokenCss],
  ["真实 Demo",brief.theme.source.interactiveDemo]
 ]){
  const row=el("div");row.append(el("b",label+"："),el("code",value));source.append(row);
 }
 root.append(source,el("h4","页面分区与交互职责"));
 const list=el("ol",undefined,"assembly-sections");
 for(const section of brief.page.sections){
  const item=el("li");
  item.append(el("b",section.order+". "+section.label),
   el("p",section.purpose),el("small","布局："+section.layout),
   el("small","交互："+section.behavior));
  list.append(item);
 }
 root.append(list);
 const references=el("div",undefined,"assembly-source");
 references.append(el("strong","实际模板关联（必须明确选择，不自动绑定）"));
 if(brief.templates.options.length){
  for(const t of brief.templates.options)
   references.append(el("div",t.id+" · "+t.name+" · "+t.implementation+" · "+t.selection));
 }else references.append(el("div","当前风格没有已登记的可运行页面模板；上述为研究结构。"));
 references.append(el("div","React 导出："+
  (brief.reactComponents.length?brief.reactComponents.map(x=>x.exportName+" ["+x.status+"]").join("、"):"未声明本次可直接复用的组件")));
 root.append(references);
 if(brief.integration.themePortRequired||brief.integration.templatePortRequired){
  const notice=el("div",undefined,"assembly-issue");
  notice.append(el("strong","需要人工代码适配"));
  if(brief.integration.themePortRequired)notice.append(el("div","当前主题不是 React 组件库已声明兼容的四套主题之一。"));
  if(brief.integration.templatePortRequired)notice.append(el("div","所选真实模板与目标栈不同，不能直接调用。"));
  root.append(notice);
 }
 root.append(el("h4","验收与风险"));
 const warnings=el("div",undefined,"assembly-issue");
 warnings.append(el("strong","以下边界需要宿主项目完成"));
 for(const item of brief.warnings)warnings.append(el("div","• "+item));
 root.append(warnings,el("p",brief.note,"assembly-footer-note"));
}
async function boot(){
 try{
  const names=["styles.json","style-facets.json","style-assembly.json","components.json",
   "page-templates.json","experience-compositions.json","assets.json"];
  const responses=await Promise.all(names.map(name=>fetch("../../registry/"+name)));
  if(responses.some(r=>!r.ok))throw Error("缺少页面搭建配方的注册数据");
  const docs=await Promise.all(responses.map(r=>r.json()));
  registry=Object.fromEntries(["styles","facets","assembly","components","templates","experiences","assets"]
   .map((key,i)=>[key,docs[i]]));
  const styles=registry.styles.styles;
  fill($("assemblyStyle"),styles.map(x=>[x.id,x.label]),"先选择主题，不设默认");
  onStyleChanged(new URLSearchParams(location.search).get("briefStyle")||"",{updateURL:false});
  $("assemblyStyle").addEventListener("change",()=>onStyleChanged($("assemblyStyle").value));
  document.addEventListener("style-assembly:select",event=>{
   const id=event.detail?.styleId;
   if(!styles.some(s=>s.id===id))return;
   onStyleChanged(id);
   $("assembly").scrollIntoView({behavior:"smooth",block:"start"});
   $("assemblyStyle").focus({preventScroll:true});
  });
  $("assemblyForm").addEventListener("submit",event=>{
   event.preventDefault();
   const request={
    style:$("assemblyStyle").value,
    context:$("assemblyContext").value,
    stack:$("assemblyStack").value,
    device:$("assemblyDevice").value,
    template:$("assemblyTemplate").value,
    title:$("assemblyTitleInput").value,
    goal:$("assemblyGoal").value
   };
   try{
    lastBrief=assembleStyleBrief(registry,request);
    lastMarkdown=toAssemblyMarkdown(lastBrief);
    render(lastBrief);
    $("copyAssembly").disabled=false;
    $("assemblyMessage").textContent="已生成 "+lastBrief.page.sections.length+
     " 个页面分区的研究级搭建简报；不是可执行网站。";
   }catch(error){
    lastBrief=null;lastMarkdown="";$("copyAssembly").disabled=true;
    $("assemblyResult").replaceChildren();
    $("assemblyMessage").textContent="无法生成："+error.message;
   }
  });
  $("copyAssembly").addEventListener("click",async()=>{
   if(!lastMarkdown)return;
   if(!navigator.clipboard?.writeText){
    $("assemblyMessage").textContent="浏览器未开放剪贴板，请通过 CLI 导出 Markdown。";return;
   }
   try{
    await navigator.clipboard.writeText(lastMarkdown);
    $("assemblyMessage").textContent="已复制搭建简报，包括结构、源码、复用限制和验收清单。";
   }catch{$("assemblyMessage").textContent="复制失败，可通过 build-style-brief.mjs 导出。";}
  });
 }catch(e){
  $("assemblyMessage").textContent="无法读取主题搭建数据："+e.message;
  $("buildAssembly").disabled=true;
 }
}
boot();
