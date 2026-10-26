import {STYLE_ANY,NO_STYLE,filterAssets,facetValues,toggleSelection,formatBundle,safeRepoPath} from "./model.mjs";
const $=id=>document.getElementById(id);
const repoBase="https://github.com/mingqiangdu1-arch/frontend-design-assets/blob/main/";
let assets=[],styles=[],selected=new Set(),active=null,shown=[],limit=18,lastDetailTrigger=null;
const mk=(tag,cls="",txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
function options(select,values){const fragment=document.createDocumentFragment();for(const value of values){const option=mk("option","",value);option.value=value;fragment.append(option);}select.append(fragment);}
function state(){
 return {query:$("query").value,style:$("style").value,type:$("type").value,stage:$("stage").value,context:$("context").value,includeAgnostic:$("agnostic").checked};
}
function tags(parent,values,max=3){
 for(const tag of values.slice(0,max))parent.append(mk("span","tag",tag));
 if(values.length>max)parent.append(mk("span","tag","+"+(values.length-max)));
}
function renderList(resetPage=false){
 if(resetPage)limit=18;
 shown=filterAssets(assets,state());
 const items=shown.slice(0,limit),fragment=document.createDocumentFragment();
 for(const item of items){
  const row=mk("article","asset");row.dataset.id=item.id;
  const top=mk("div","asset-top");top.append(mk("span","asset-id",item.id),mk("span","stage",item.stage));
  const h=mk("h3","",item.name);
  const meta=mk("p","asset-meta",item.type+" · "+(item.styleIds.length?item.styleIds.join(" / "):"Style-agnostic"));
  const badges=mk("div","asset-tags");tags(badges,item.applicationContexts.length?item.applicationContexts:item.tags);
  const controls=mk("div","asset-controls");
  const inspect=mk("button","inspect","查看详情");inspect.type="button";inspect.dataset.inspect=item.id;inspect.setAttribute("aria-pressed",String(active===item.id));
  const label=mk("label","pick");const input=mk("input");input.type="checkbox";input.dataset.pick=item.id;input.checked=selected.has(item.id);
  input.setAttribute("aria-label","加入交接清单 "+item.id);label.append(input,mk("span","","加入清单"));
  controls.append(inspect,label);
  row.append(top,h,meta,badges,controls);fragment.append(row);
 }
 if(!items.length)fragment.append(mk("p","no-results","没有匹配的素材。请调整筛选或选择其他风格。"));
 $("assetList").replaceChildren(fragment);
 $("resultsCount").textContent="找到 "+shown.length+" 条素材，显示 "+items.length+" 条";
 $("selectionCount").textContent=String(selected.size);
 $("overview").textContent=assets.length+" 条索引资产 · "+styles.length+" 套独立视觉风格 · "+new Set(assets.map(x=>x.type)).size+" 种素材类型";
 $("more").hidden=shown.length<=limit;
}
function detailRow(title,text){const dt=mk("dt","",title),dd=mk("dd","",text);return [dt,dd];}
function link(target,title,href){
 const a=mk("a","detail-link",title+" ↗");
 a.href=href;a.target="_blank";a.rel="noopener noreferrer";target.append(a);
}
function renderDetail(){
 const body=$("detailBody");body.replaceChildren();
 if(!active){body.append(mk("h2","", "选择素材查看详情"),mk("p","","点击素材卡片检查复用范围、来源、依赖及成熟度。"));return;}
 const item=assets.find(a=>a.id===active);
 if(!item){active=null;renderDetail();return;}
 const title=mk("h2","",item.name);title.id="detailTitle";title.tabIndex=-1;
 body.append(mk("span","asset-id",item.id),title,mk("p","detail-description",item.reuseKind||"Design reference / research asset"));
 const list=mk("dl","detail-list");
 [
 ["类型",item.type||"未分类"],["阶段",item.stage||"未标注"],
 ["支持风格",item.styleIds?.join("、")||"不限定风格"],
 ["适用场景",item.applicationContexts?.join("、")||"暂无明确场景"],
 ["依赖资产",item.dependencies?.join("、")||"未列出"],
 ["验证范围",item.verified||"未记录"]
 ].forEach(([heading,value])=>{list.append(...detailRow(heading,value));});
 body.append(list);
 const urls=mk("div","detail-links");
 if(safeRepoPath(item.path))link(urls,"打开源码 / 说明",repoBase+encodeURI(item.path));
 if(safeRepoPath(item.demo))link(urls,"查看示例入口",repoBase+encodeURI(item.demo));
 if(item.notion?.startsWith("https://app.notion.com/"))link(urls,"Notion 研究记录",item.notion);
 if(item.source?.startsWith("https://"))link(urls,"参考来源",item.source);
 body.append(urls);
 const add=mk("button","detail-select",selected.has(item.id)?"从清单移除":"加入交接清单");
 add.type="button";add.dataset.detailpick=item.id;body.append(add);
}
function inspect(id,trigger=null,{updateUrl=true,focus=true}={}){
 if(!assets.some(a=>a.id===id))return;
 active=id;lastDetailTrigger=trigger;
 if(updateUrl){const url=new URL(window.location.href);url.searchParams.set("asset",id);window.history.pushState({asset:id},"",url);}
 renderDetail();renderList();
 if(focus){$("detailTitle")?.focus({preventScroll:true});$("detail").scrollIntoView({block:"nearest",behavior:"instant"});}
}
function deselectDetail(){
 active=null;const url=new URL(location.href);url.searchParams.delete("asset");history.replaceState(null,"",url);
 renderDetail();renderList();
 if(lastDetailTrigger?.isConnected)lastDetailTrigger.focus();else $("query").focus();
}
$("assetList").addEventListener("click",event=>{
 const btn=event.target.closest("[data-inspect]");
 if(btn)inspect(btn.dataset.inspect,btn);
});
function pick(id){selected=toggleSelection(selected,id);$("selectionCount").textContent=String(selected.size);renderList();renderDetail();if(!$("bundle").hidden)updateBundle();}
$("assetList").addEventListener("change",event=>{const input=event.target.closest("input[data-pick]");if(input)pick(input.dataset.pick);});
$("detailBody").addEventListener("click",event=>{const el=event.target.closest("[data-detailpick]");if(el)pick(el.dataset.detailpick);});
$("closeDetail").addEventListener("click",deselectDetail);
for(const id of ["query","style","type","stage","context","agnostic"]){
 $(id).addEventListener(id==="query"?"input":"change",()=>renderList(true));
}
$("reset").addEventListener("click",()=>{for(const id of ["query"])$(id).value="";for(const id of ["style","type","stage","context"])$(id).value="all";$("agnostic").checked=false;renderList(true);$("query").focus();});
$("more").addEventListener("click",()=>{limit+=18;renderList();});
$("clearSelection").addEventListener("click",()=>{selected.clear();renderList();renderDetail();if(!$("bundle").hidden)updateBundle();});
function updateBundle(){
 $("bundleText").value=formatBundle(assets,selected,{repo:"mingqiangdu1-arch/frontend-design-assets"});
}
$("showBundle").addEventListener("click",()=>{
 $("bundle").hidden=false;updateBundle();$("copyStatus").textContent="";
 $("bundleTitle").tabIndex=-1;$("bundleTitle").focus({preventScroll:true});$("bundle").scrollIntoView({block:"start"});
});
$("closeBundle").addEventListener("click",()=>{$("bundle").hidden=true;$("showBundle").focus();});
$("copyBundle").addEventListener("click",async()=>{
 const content=$("bundleText").value;
 try{
  if(!navigator.clipboard?.writeText)throw Error("clipboard unavailable");
  await navigator.clipboard.writeText(content);$("copyStatus").textContent="已复制 Markdown 清单";
 }catch(_){
  $("bundleText").focus();$("bundleText").select();
  $("copyStatus").textContent="当前环境不支持自动复制，已选中文本；请手动复制。";
 }
});
document.addEventListener("keydown",e=>{
 const element=e.target,typing=element instanceof HTMLInputElement||element instanceof HTMLTextAreaElement||element instanceof HTMLSelectElement;
 if(e.key==="/"&&!typing){e.preventDefault();$("query").focus();}
 if(e.key==="Escape"&&active&&!typing){deselectDetail();}
});
window.addEventListener("popstate",()=>{
 const id=new URL(location.href).searchParams.get("asset");
 active=assets.some(a=>a.id===id)?id:null;renderDetail();renderList();
});
async function init(){
 try{
  const [assetsResp,stylesResp]=await Promise.all([fetch("../../registry/assets.json"),fetch("../../registry/styles.json")]);
  if(!assetsResp.ok||!stylesResp.ok)throw Error("Registry HTTP response not OK");
  const records=await assetsResp.json(),stylesRegistry=await stylesResp.json();
  if(!Array.isArray(records.assets)||!Array.isArray(stylesRegistry.styles))throw Error("Registry schema not recognized");
  assets=records.assets;styles=stylesRegistry.styles;
  options($("style"),styles.map(s=>s.id));
  options($("type"),facetValues(assets,"type"));
  options($("stage"),facetValues(assets,"stage"));
  options($("context"),facetValues(assets,"applicationContexts"));
  const requested=new URL(location.href).searchParams.get("asset");
  active=assets.some(a=>a.id===requested)?requested:null;
  renderList(true);renderDetail();
 }catch(error){
  $("overview").textContent="无法读取仓库索引。请从仓库根目录启动静态 HTTP 服务（不要通过 file:// 直接打开）。";
  $("resultsCount").textContent="加载失败";
  $("assetList").replaceChildren(mk("p","no-results","索引加载失败："+error.message));
 }
}
init();
