import {rankThemes,compareThemes,previewPath} from "../../scripts/style-match.mjs";

const $=id=>document.getElementById(id);
const mk=(tag,cls="",value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
const rel=path=>"../../"+path;
const validColor=color=>/^#[0-9a-f]{6}$/i.test(color||"");
const state={styles:null,facets:null,components:null,swatches:new Map(),left:null,right:null};
const filterIds=["search","context","layout","material","interaction","density","device","stack"];
const option=(select,value,label)=>{const el=mk("option","",label);el.value=value;select.append(el);};
function filters(){return {task:$("search").value.trim(),context:$("context").value,
 layout:$("layout").value,material:$("material").value,interaction:$("interaction").value,
 density:$("density").value,device:$("device").value,stack:$("stack").value};}
function matches(e,s,o){
 const term=o.task.toLocaleLowerCase().normalize("NFKC");
 if(term){
  const words=[e.id,e.asset,e.labelCN,e.summary,s.label,...e.keywords,...e.dna,...s.categories]
   .map(x=>String(x).toLocaleLowerCase().normalize("NFKC"));
  if(!words.some(x=>x.includes(term)||(x.length>=3&&term.includes(x))))return false;
 }
 if(o.context&&!s.categories.includes(o.context))return false;
 if(o.layout&&!e.layouts.includes(o.layout))return false;
 if(o.material&&!e.materials.includes(o.material))return false;
 if(o.interaction&&!e.interactions.includes(o.interaction))return false;
 if(o.density&&e.density!==o.density)return false;
 if(o.device&&!e.devices.includes(o.device)&&
   !((o.device==="mobile"||o.device==="desktop")&&e.devices.includes("responsive")))return false;
 return o.stack!=="react"||state.components.styleIds.includes(e.id);
}
function miniature(e,palette){
 const el=mk("div","mini-visual");el.dataset.style=e.id;
 const col=palette?.colors||{};
 for(const key of ["canvas","surface","text","accent","border"]){
  if(validColor(col[key]))el.style.setProperty("--thumb-"+key,col[key]);
 }
 const head=mk("div","mini-head");
 head.append(mk("b","",e.labelCN),mk("i"));
 const art=mk("div","mini-shape");
 for(let i=0;i<3;i++)art.append(mk("i"));
 el.append(head,art,mk("div","mini-footer",e.id.toUpperCase().replaceAll("-"," / ")));
 return el;
}
function updateUrl(){
 const url=new URL(location.href);
 for(const side of ["left","right"]){if(state[side])url.searchParams.set(side,state[side]);else url.searchParams.delete(side);}
 history.replaceState({left:state.left,right:state.right},"",url);
}
function setPair(side,id){
 const other=side==="left"?"right":"left";
 if(id&&state[other]===id){
  $("compareMessage").textContent="左右不能选择同一主题，请选择另一套设计。";
  renderCompare();return;
 }
 if(id&&!state.facets.entries.some(x=>x.id===id))return;
 state[side]=id||null;
 updateUrl();renderCompare();renderCards();
}
function makeCard(e,s){
 const article=mk("article","theme-card");article.dataset.themeId=e.id;
 article.dataset.selected=String(state.left===e.id||state.right===e.id);
 article.append(miniature(e,state.swatches.get(e.id)));
 const head=mk("div","card-head");
 head.append(mk("span","",e.asset),mk("small","",
  state.components.styleIds.includes(e.id)?"React 已适配":"独立研究"));
 article.append(head,mk("h3","",s.label),mk("p","",e.summary));
 const pills=mk("div","card-pills");
 const values=[state.facets.dimensions.layouts[e.layouts[0]],
  state.facets.dimensions.materials[e.materials[0]],
  state.facets.dimensions.density[e.density]];
 for(const name of values)pills.append(mk("span","",name));
 article.append(pills);
 const actions=mk("div","card-actions");
 for(const side of ["left","right"]){
  const button=mk("button","",side==="left"?"放到左侧":"放到右侧");
  button.type="button";button.setAttribute("aria-pressed",String(state[side]===e.id));
  button.setAttribute("aria-label","将 "+s.label+" 放到"+(side==="left"?"左":"右")+"侧对比");
  button.addEventListener("click",()=>setPair(side,e.id));actions.append(button);
 }
 const link=mk("a","","查看主题规范");link.href=rel(s.documentation);actions.append(link);
 article.append(actions);return article;
}
function renderRecommendations(o){
 const root=$("recommendations");root.replaceChildren();
 if(!["task","context","layout","material","interaction"].some(key=>o[key])){
  root.append(mk("p","","输入任务、选择应用场景或构图/材质/交互后才推荐候选；没有默认主题。"));return;
 }
 let matched;
 try{matched=rankThemes(state.styles,state.facets,state.components,{...o,limit:3});}
 catch(e){root.append(mk("p","",e.message));return;}
 if(!matched.results.length){
  root.append(mk("p","","当前条件没有可靠候选。请放宽条件或建立新风格研究，不自动回退。"));return;
 }
 const items=mk("div","recommendation-list");
 for(const r of matched.results){
  const card=mk("article","recommendation");
  card.append(mk("strong","",r.label),mk("span","",r.assetId+
   (r.reactThemeCompatible?" / React 已声明兼容":" / 独立 Demo 参考")));
  card.append(mk("p","",r.evidence.join("；")));
  const b=mk("button","","放到左侧对比");b.type="button";b.addEventListener("click",()=>setPair("left",r.id));
  card.append(b);items.append(card);
 }
 root.append(items);
}
function renderCards(){
 const o=filters(),styleById=new Map(state.styles.styles.map(s=>[s.id,s]));
 const list=state.facets.entries.filter(e=>matches(e,styleById.get(e.id),o));
 const frag=document.createDocumentFragment();
 for(const e of list)frag.append(makeCard(e,styleById.get(e.id)));
 $("cardGrid").replaceChildren(frag);
 $("resultCount").textContent="显示 "+list.length+" / "+state.facets.entries.length+" 套主题";
 $("emptyResult").hidden=list.length!==0;renderRecommendations(o);
}
function drawPane(side){
 const node=$(side==="left"?"leftPane":"rightPane"),id=state[side];node.replaceChildren();
 if(!id){node.append(mk("div","compare-placeholder",side==="left"?"尚未选择左侧主题":"尚未选择右侧主题"));return;}
 const e=state.facets.entries.find(v=>v.id===id),s=state.styles.styles.find(v=>v.id===id);
 const head=mk("div","pane-head"),title=mk("div");
 title.append(mk("h3","",s.label),mk("small","",e.asset+" / "+e.labelCN));
 const link=mk("a","","在独立窗口打开 Demo");link.href=rel(previewPath(e));
 link.target="_blank";link.rel="noopener noreferrer";head.append(title,link);
 const detail=mk("div","pane-details");
 const rows=[
  ["构图",e.layouts.map(v=>state.facets.dimensions.layouts[v]).join(" / ")],
  ["材质",e.materials.map(v=>state.facets.dimensions.materials[v]).join(" / ")],
  ["交互",e.interactions.map(v=>state.facets.dimensions.interactions[v]).join(" / ")],
  ["设备",e.devices.join(" / ")],
  ["代码复用",state.components.styleIds.includes(id)?"原有 React 包显式支持":"独立 HTML/CSS 参考；接入 React 需适配"]
 ];
 for(const [key,value] of rows){
  const p=mk("p");p.append(mk("b","",key+"："),document.createTextNode(value));detail.append(p);
 }
 const preview=mk("div","pane-preview"),frame=mk("iframe");
 frame.title=s.label+" 原始互动 Demo";frame.src=rel(previewPath(e));frame.loading="lazy";
 preview.append(frame);
 node.append(head,detail,preview,mk("div","pane-caution","复用限制："+e.caution));
}
function handoffText(){
 if(!state.left||!state.right)return "";
 const results=compareThemes(state.styles,state.facets,state.components,[state.left,state.right]);
 const lines=["# Theme Atlas / 主题对比交接","","此为人工指定的两套风格比较，不代表偏好或设计质量评分。",""];
 for(const x of results){
  lines.push("## "+x.id+" · "+x.label,"",
   "- Asset: "+x.assetId+"; spec: "+x.documentation+"; demo: "+x.preview,
   "- Layout: "+x.layouts.join(", ")+"; materials: "+x.materials.join(", "),
   "- Interactions: "+x.interactions.join(", ")+"; visual grammar: "+x.visualDNA.join(" / "),
   "- React theme supported: "+(x.reactThemeCompatible?"yes":"no, adaptation required"),
   "- Caution: "+x.caution,"");
 }
 lines.push("下一步：根据真实业务需求选择并验证 Token、源码、布局、键盘与触摸；不要把实验 Demo 当生产代码。");
 return lines.join("\n");
}
function renderCompare(){
 $("compareLeft").value=state.left||"";$("compareRight").value=state.right||"";
 const paired=Boolean(state.left&&state.right);
 $("swap").disabled=!paired;$("copyHandoff").disabled=!paired;
 drawPane("left");drawPane("right");
 if(paired)$("compareMessage").textContent="正在对比 "+state.left+" ↔ "+state.right+"；均为原始 Demo，而非质量优劣排序。";
 else $("compareMessage").textContent="尚未选满两套主题。已选的一侧仍可单独查看真实 Demo。";
}
async function boot(){
 try{
  const resources=["../../registry/styles.json","../../registry/style-facets.json","../../registry/components.json"];
  const res=await Promise.all(resources.map(x=>fetch(x)));
  if(res.some(r=>!r.ok))throw Error("主题注册表读取失败，请使用仓库静态预览服务");
  [state.styles,state.facets,state.components]=await Promise.all(res.map(x=>x.json()));
  const idSet=new Set(state.styles.styles.map(x=>x.id));
  if(state.styles.defaultStyleId!==null||state.facets.defaultStyleId!==null||
   idSet.size!==state.facets.entries.length||
   state.facets.entries.some(e=>!idSet.has(e.id)))throw Error("主题数据不一致，已停止错误推荐");
  const tokenEntries=await Promise.all(state.styles.styles.map(async s=>{
   const response=await fetch(rel(s.tokens.json));
   if(!response.ok)throw Error("缺少主题 Token: "+s.id);
   return [s.id,await response.json()];
  }));
  state.swatches=new Map(tokenEntries);
  $("styleCount").textContent=String(state.facets.entries.length);
  const contexts=[...new Set(state.styles.styles.flatMap(s=>s.categories))].sort();
  for(const name of contexts)option($("context"),name,name);
  for(const [key,dim] of [
    ["layout","layouts"],["material","materials"],["interaction","interactions"],
    ["density","density"],["device","devices"]
  ])for(const [value,label] of Object.entries(state.facets.dimensions[dim]))option($(key),value,label);
  for(const s of state.styles.styles){
   for(const side of ["left","right"])option($(side==="left"?"compareLeft":"compareRight"),s.id,s.label);
  }
  const params=new URLSearchParams(location.search),left=params.get("left"),right=params.get("right");
  state.left=idSet.has(left)?left:null;
  state.right=idSet.has(right)&&right!==state.left?right:null;
  $("compareLeft").addEventListener("change",()=>setPair("left",$("compareLeft").value));
  $("compareRight").addEventListener("change",()=>setPair("right",$("compareRight").value));
  $("swap").addEventListener("click",()=>{
   if(!state.left||!state.right)return;
   [state.left,state.right]=[state.right,state.left];updateUrl();renderCompare();renderCards();
  });
  $("copyHandoff").addEventListener("click",async()=>{
   if(!state.left||!state.right)return;
   if(!navigator.clipboard?.writeText){
    $("compareMessage").textContent="当前环境无法使用剪贴板；请使用 CLI 输出 Markdown 交接。";return;
   }
   try{await navigator.clipboard.writeText(handoffText());
    $("compareMessage").textContent="主题差异和复用限制已复制。";}
   catch{$("compareMessage").textContent="复制失败，可改用命令行生成交接说明。";}
  });
  for(const id of filterIds)$(id).addEventListener(id==="search"?"input":"change",renderCards);
  $("clearFilters").addEventListener("click",()=>{
   for(const id of filterIds)$(id).value=id==="stack"?"any":"";
   renderCards();
  });
  renderCompare();renderCards();
 }catch(e){
  $("resultCount").textContent="加载失败";
  $("recommendations").textContent=e.message;
  $("emptyResult").hidden=false;
 }
}
boot();
