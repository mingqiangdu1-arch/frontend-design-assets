import {samples,categories,selectCategory,toggleSaved,shouldAnimate} from "./model.mjs";
const $=id=>document.getElementById(id);
let active="all";
let saved=new Set();
function newEl(tag,className,text){
 const node=document.createElement(tag);
 if(className)node.className=className;
 if(text!==undefined)node.textContent=text;
 return node;
}
function buildCard(item){
 const article=newEl("article","product");article.dataset.id=item.id;
 const media=newEl("div","product-media");
 media.style.background=item.color;
 media.append(newEl("span","symbol",item.icon),newEl("span","sticker","ORIGINAL"));
 const body=newEl("div","product-body");
 body.append(newEl("span","code",item.id+" / "+item.tag),newEl("h3","",item.name),newEl("p","",item.desc));
 const foot=newEl("div","product-foot");
 foot.append(newEl("span","tag",item.category.toUpperCase()));
 const save=newEl("button","",saved.has(item.id)?"★ 已收藏":"☆ 收藏");
 save.type="button";save.dataset.save=item.id;
 save.setAttribute("aria-pressed",String(saved.has(item.id)));
 save.setAttribute("aria-label",(saved.has(item.id)?"取消收藏 ":"收藏 ")+item.name);
 foot.append(save);body.append(foot);article.append(media,body);return article;
}
function render(){
 const records=selectCategory(samples,active);
 const frag=document.createDocumentFragment();
 records.forEach(r=>frag.append(buildCard(r)));
 $("catalogGrid").replaceChildren(frag);
 $("resultStatus").textContent=active==="all"?"显示全部 "+records.length+" 个设计样本":"筛选完成 · 显示 "+records.length+" 个设计样本";
 $("empty").hidden=records.length!==0;
 document.querySelectorAll("[data-filter]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.filter===active)));
}
function updateWithTransition(update){
 if(shouldAnimate(window.matchMedia("(prefers-reduced-motion: reduce)").matches,
 typeof document.startViewTransition==="function")){
  document.startViewTransition(update);
 }else update();
}
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
 const next=btn.dataset.filter;
 if(!categories.includes(next))return;
 active=next;
 updateWithTransition(render);
}));
$("catalogGrid").addEventListener("click",e=>{
 const button=e.target.closest("button[data-save]");if(!button)return;
 saved=toggleSaved(saved,button.dataset.save);
 const item=samples.find(x=>x.id===button.dataset.save);
 button.setAttribute("aria-pressed",String(saved.has(button.dataset.save)));
 button.textContent=saved.has(button.dataset.save)?"★ 已收藏":"☆ 收藏";
 button.setAttribute("aria-label",(saved.has(button.dataset.save)?"取消收藏 ":"收藏 ")+item.name);
});
$("allCount").textContent=String(samples.length).padStart(2,"0");
render();
