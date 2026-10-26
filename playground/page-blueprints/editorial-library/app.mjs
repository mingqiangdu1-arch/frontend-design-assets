import {articles,tags,filterArticles,toggleBookmark} from "./model.mjs";
const $=id=>document.getElementById(id);
let query="",tag="all",saved=new Set(),onlySaved=false,active=null,lastTrigger=null;
function render(){
 const rows=filterArticles(articles,query,tag).filter(x=>!onlySaved||saved.has(x.id));
 const frag=document.createDocumentFragment();
 for(const item of rows){
  const a=document.createElement("article");a.className="entry";
  const s=document.createElement("small");s.textContent=item.tag.toUpperCase()+" / "+item.read;a.append(s);
  const h=document.createElement("h3");h.textContent=item.title;a.append(h);
  const p=document.createElement("p");p.textContent=item.excerpt;a.append(p);
  const actions=document.createElement("div");actions.className="entry-actions";
  const open=document.createElement("button");open.type="button";open.dataset.open=item.id;open.textContent="阅读全文 ↗";
  const save=document.createElement("button");save.type="button";save.dataset.save=item.id;
  save.setAttribute("aria-pressed",String(saved.has(item.id)));
  save.textContent=saved.has(item.id)?"★ 已收藏":"☆ 收藏";
  actions.append(open,save);a.append(actions);frag.append(a);
 }
 if(!rows.length){const p=document.createElement("p");p.textContent="没有符合条件的文章。";frag.append(p);}
 $("articleList").replaceChildren(frag);$("resultCount").textContent="显示 "+rows.length+" 篇文章";
 document.querySelectorAll("[data-tag]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.tag===tag)));
 $("savedOnly").setAttribute("aria-pressed",String(onlySaved));
}
function updateReaderSave(){const on=saved.has(active);$("readerSave").setAttribute("aria-pressed",String(on));$("readerSave").textContent=on?"★ 已收藏":"☆ 收藏";}
function openReader(id){
 const item=articles.find(x=>x.id===id);if(!item)return;
 active=id;lastTrigger=document.activeElement;
 $("readerTag").textContent=item.tag.toUpperCase()+" / "+item.read;$("readerTitle").textContent=item.title;$("readerExcerpt").textContent=item.excerpt;
 const frag=document.createDocumentFragment();for(const para of item.text){const p=document.createElement("p");p.textContent=para;frag.append(p);}
 $("readerText").replaceChildren(frag);updateReaderSave();$("reader").hidden=false;document.body.style.overflow="hidden";$("readerClose").focus();
}
function closeReader(){
 $("reader").hidden=true;document.body.style.overflow="";active=null;render();
 if(lastTrigger?.isConnected)lastTrigger.focus();else $("search").focus();
}
$("articleList").addEventListener("click",e=>{
 const open=e.target.closest("[data-open]"),bookmark=e.target.closest("[data-save]");
 if(open)openReader(open.dataset.open);
 if(bookmark){saved=toggleBookmark(saved,bookmark.dataset.save);const id=bookmark.dataset.save;render();$("articleList").querySelector('[data-save="'+id+'"]')?.focus();}
});
$("search").addEventListener("input",e=>{query=e.target.value;render();});
document.querySelectorAll("[data-tag]").forEach(b=>b.addEventListener("click",()=>{if(tags.includes(b.dataset.tag)){tag=b.dataset.tag;render();}}));
$("savedOnly").addEventListener("click",()=>{onlySaved=!onlySaved;render();});
$("readerSave").addEventListener("click",()=>{if(active){saved=toggleBookmark(saved,active);updateReaderSave();}});
$("readerClose").addEventListener("click",closeReader);
$("readerShade").addEventListener("click",closeReader);
document.addEventListener("keydown",e=>{
 if($("reader").hidden)return;
 if(e.key==="Escape"){e.preventDefault();closeReader();return;}
 if(e.key==="Tab"){const buttons=[$("readerClose"),$("readerSave")],index=buttons.indexOf(document.activeElement);
 if(e.shiftKey&&index===0){e.preventDefault();buttons[1].focus();}
 if(!e.shiftKey&&index===1){e.preventDefault();buttons[0].focus();}
 }
});
render();
