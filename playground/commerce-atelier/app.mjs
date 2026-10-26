import {products,categoryLabels,materialLabels,selectCatalog,toggleFacet,toggleSaved,addToBag,bagCount,bagTotal} from "./model.mjs";
const $=id=>document.getElementById(id);
const state={categories:[],materials:[],query:"",sort:"featured",saved:new Set(),bag:[],active:null,variant:null};
const create=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=String(text);return node;};
const price=n=>"¥"+n.toLocaleString("zh-CN");
function art(product){const visual=create("div","product-visual tone-"+product.tone);visual.setAttribute("role","img");visual.setAttribute("aria-label",product.name+"抽象造型示意图（非商品摄影）");visual.append(create("div","form form-"+product.shape));const label=create("span","image-mark","ATELIER / "+product.id);visual.append(label);return visual;}
function button(text,cls,handler){const b=create("button",cls,text);b.type="button";b.addEventListener("click",handler);return b;}
function productCard(p){
 const card=create("article","product-card");card.dataset.id=p.id;
 const media=create("div","product-media");media.append(art(p));
 const heart=button(state.saved.has(p.id)?"♥":"♡","save",()=>{state.saved=toggleSaved(state.saved,p.id);render(p.id);});
 heart.setAttribute("aria-label",(state.saved.has(p.id)?"取消收藏 ":"收藏 ")+p.name);
 heart.setAttribute("aria-pressed",String(state.saved.has(p.id)));media.append(heart);
 const open=button("查看规格 ↗","quick",()=>openProduct(p.id));media.append(open);
 const info=create("div","product-info");const head=create("div","product-head");head.append(create("h3","",p.name),create("strong","",price(p.price)));
 info.append(head,create("p","",categoryLabels[p.category]+" · "+materialLabels[p.material]));
 card.append(media,info);return card;
}
function render(focusSavedId=null){
 const matches=selectCatalog(products,state),list=create("div");
 for(const p of matches)list.append(productCard(p));
 if(!matches.length){const empty=create("div","empty");empty.append(create("h3","","没有符合条件的物件"),create("p","","请选择其他类别、材质或清除已选择筛选。"),button("重置筛选","primary-button",clearFilters));list.append(empty);}
 $("products").replaceChildren(...list.childNodes);
 $("resultCount").textContent="共 "+matches.length+" 件物件";
 $("bagCount").textContent=String(bagCount(state.bag));
 renderChips();
 if(focusSavedId)$("products").querySelector('[data-id="'+focusSavedId+'"] .save')?.focus();
}
function renderChips(){
 const wrap=$("activeFilters");const chips=[];
 for(const type of ["categories","materials"]){
  const labels=type==="categories"?categoryLabels:materialLabels;
  for(const val of state[type]){
   const chip=button(labels[val]+" ×","chip",()=>{
    state[type]=toggleFacet(state[type],val);syncChecks();render();
   });chip.setAttribute("aria-label","移除筛选 "+labels[val]);chips.push(chip);
  }
 }
 if(state.query)chips.push(button("搜索："+state.query+" ×","chip",()=>{state.query="";$("searchProducts").value="";render();}));
 wrap.replaceChildren(...chips);
}
function syncChecks(){document.querySelectorAll('input[name="category"],input[name="material"]').forEach(c=>{c.checked=state[c.name==="category"?"categories":"materials"].includes(c.value);});}
function clearFilters(){state.categories=[];state.materials=[];state.query="";$("searchProducts").value="";syncChecks();render();}
function openProduct(id){
 const p=products.find(item=>item.id===id);if(!p)return;
 state.active=id;state.variant=p.sizes.find(x=>x.available)?.name||null;
 const content=$("detailContent");content.replaceChildren();
 const figure=art(p);figure.classList.add("detail-visual");
 const desc=create("section","detail-description");
 desc.append(create("span","eyebrow",p.id+" / "+categoryLabels[p.category]),create("h2","",p.name),create("strong","detail-price",price(p.price)),create("p","",p.description));
 const field=create("fieldset","variants");field.append(create("legend","","规格 · VARIANT"));
 for(const variant of p.sizes){
  const label=create("label","variant"+(!variant.available?" unavailable":""));
  const input=create("input");input.type="radio";input.name="variant";input.value=variant.name;input.disabled=!variant.available;input.checked=state.variant===variant.name;
  input.addEventListener("change",()=>{state.variant=variant.name;});
  label.append(input,create("span","",variant.name+(variant.available?"":" · 暂不可用")));field.append(label);
 }
 desc.append(field);
 const cart=button("加入模拟购物袋","primary-button",()=>{
  const result=addToBag(state.bag,p,state.variant);
  if(!result.added){notify("规格暂不可用，无法添加");return;}
  state.bag=result.lines;render();notify(p.name+"已加入模拟购物袋（本地数据）");
  $("productDialog").close();
 });
 cart.disabled=!state.variant;
 desc.append(cart,create("small","demo-note","模拟操作 · 不会生成真实订单、付款或库存预留"));
 content.append(figure,desc);$("detailTitle").textContent=p.name; // ensure named dialog even while closing
 $("productDialog").showModal();
}
function notify(message){$("feedback").hidden=false;$("feedback").textContent=message;}
function renderBag(){
 const content=$("bagContents");content.replaceChildren();
 if(!state.bag.length){content.append(create("p","empty-bag","目前没有物件。你可以在商品详情里加入模拟购物袋。"));return;}
 const ul=create("ul","bag-lines");
 for(const line of state.bag){
  const product=products.find(p=>p.id===line.id);
  const li=create("li");li.append(create("span","",product.name+" · "+line.variant+" × "+line.quantity),create("strong","",price(line.price*line.quantity)));
  ul.append(li);
 }
 content.append(ul,create("p","bag-total","模拟小计："+price(bagTotal(state.bag))));
}
document.querySelectorAll('input[name="category"],input[name="material"]').forEach(input=>input.addEventListener("change",()=>{
 const key=input.name==="category"?"categories":"materials";
 state[key]=toggleFacet(state[key],input.value);render();
}));
$("searchProducts").addEventListener("input",e=>{state.query=e.target.value;render();});
$("sort").addEventListener("change",e=>{state.sort=e.target.value;render();});
$("clearFilters").addEventListener("click",clearFilters);
$("closeDetail").addEventListener("click",()=>$("productDialog").close());
$("productDialog").addEventListener("click",event=>{if(event.target===$("productDialog"))$("productDialog").close();});
$("closeBag").addEventListener("click",()=>$("bagDialog").close());
$("openBag").addEventListener("click",()=>{renderBag();$("bagDialog").showModal();});
$("bagDialog").addEventListener("click",event=>{if(event.target===$("bagDialog"))$("bagDialog").close();});
render();
