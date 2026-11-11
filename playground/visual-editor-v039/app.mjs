import {BLOCK_DEFS,seedBlocks,exportBlockSchema} from "./block-schema.mjs";
import {createEditor,selectBlock,moveSelected,dropBlock,editSelectedProps,undoEditor,redoEditor,historySummary} from "./editor-history.mjs";
const $=id=>document.getElementById(id);
const el=(tag,text,cls)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x;};
let editor=createEditor(),dragging=null,exporting=false;
const current=()=>editor.blocks.find(b=>b.id===editor.selectedId);
const announce=s=>{$("historyStatus").textContent=s;};
function update(fn,success){
 try{
  const next=fn();
  if(next===editor){announce("未发生有效修改。");return false;}
  editor=next;render();announce(success);return true;
 }catch(e){announce(String(e.message||e));return false;}
}
function renderBlocks(){
 const frag=document.createDocumentFragment();
 editor.blocks.forEach((b,i)=>{
  const li=el("li",undefined,"ve39-block");li.dataset.blockId=b.id;li.draggable=true;
  li.setAttribute("aria-selected",String(b.id===editor.selectedId));
  const row=el("div",undefined,"ve39-block-head");
  const info=el("div");info.append(el("strong",BLOCK_DEFS[b.type].label),el("small","区块 "+(i+1)+" / "+editor.blocks.length+" · "+b.id+" · 可拖动"));
  const actions=el("div",undefined,"ve39-block-actions");
  for(const [action,label] of [["select","选中"],["up","上移"],["down","下移"]]){
   const btn=el("button",label);btn.type="button";btn.dataset.action=action;
   btn.setAttribute("aria-label",label+" "+BLOCK_DEFS[b.type].label);
   if(action==="select")btn.setAttribute("aria-pressed",String(b.id===editor.selectedId));
   if(action==="up"&&i===0)btn.disabled=true;
   if(action==="down"&&i===editor.blocks.length-1)btn.disabled=true;
   actions.append(btn);
  }
  row.append(info,actions);
  li.append(row,el("p",b.type==="quote"?b.props.quote:b.props.title));
  frag.append(li);
 });
 $("blockList").replaceChildren(frag);
}
function renderInspector(){
 const b=current();$("selectedInfo").textContent="当前区块："+b.id+"（"+BLOCK_DEFS[b.type].label+"）";
 const frag=document.createDocumentFragment();
 for(const [key,spec] of Object.entries(BLOCK_DEFS[b.type].fields)){
  const label=el("label",spec.label,"ve39-field");label.htmlFor="prop-"+key;
  let input;
  if(spec.kind==="select"){
   input=el("select");
   for(const value of spec.options){const opt=el("option",value==="left"?"左对齐":"居中");opt.value=value;input.append(opt);}
   input.value=b.props[key];
  }else{
   input=el("input");input.type=spec.kind==="boolean"?"checkbox":"text";
   if(spec.kind==="boolean")input.checked=b.props[key];
   else{input.value=b.props[key];input.maxLength=spec.max;}
  }
  input.id="prop-"+key;input.dataset.prop=key;input.dataset.kind=spec.kind;
  label.append(input);
  if(spec.kind==="text")label.append(el("small",String(spec.min)+"–"+spec.max+" 字"));
  frag.append(label);
 }
 $("propsFields").replaceChildren(frag);
}
function renderPreview(){
 const frag=document.createDocumentFragment();
 for(const b of editor.blocks){
  const article=el("article",undefined,"ve39-preview-item");
  article.dataset.previewId=b.id;
  if(b.type==="hero")article.dataset.align=b.props.align;
  if(b.type==="feature")article.dataset.emphasis=String(b.props.emphasis);
  article.append(el("small",BLOCK_DEFS[b.type].label+" · "+b.id));
  article.append(el("strong",b.type==="quote"?b.props.quote:b.props.title));
  article.append(el("p",b.type==="hero"?b.props.eyebrow:b.type==="feature"?b.props.description:b.props.source));
  frag.append(article);
 }
 $("previewBlocks").replaceChildren(frag);
 if(exporting)$("schemaOutput").textContent=exportBlockSchema(editor.blocks);
}
function render(){
 renderBlocks();renderInspector();renderPreview();
 const h=historySummary(editor);
 $("undoBtn").disabled=!h.canUndo;$("redoBtn").disabled=!h.canRedo;
 $("orderInfo").textContent="撤销 "+h.undoDepth+" / 重做 "+h.redoDepth;
}
$("blockList").addEventListener("click",e=>{
 const btn=e.target.closest("button[data-action]");const parent=btn?.closest("[data-block-id]");if(!btn||!parent)return;
 const id=parent.dataset.blockId,action=btn.dataset.action;
 if(action==="select")update(()=>selectBlock(editor,id),"已选中 "+id);
 else{
  update(()=>moveSelected(selectBlock(editor,id),action==="up"?-1:1),"已调整 "+id+" 的顺序");
  const candidate=$("blockList").querySelector('[data-block-id="'+id+'"] [data-action="'+action+'"]');
  if(candidate&&!candidate.disabled)candidate.focus({preventScroll:true});
 }
});
$("blockList").addEventListener("dragstart",e=>{
 const row=e.target.closest("[data-block-id]");if(!row)return;
 dragging=row.dataset.blockId;e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",dragging);
});
$("blockList").addEventListener("dragover",e=>{
 const row=e.target.closest("[data-block-id]");if(!dragging||!row||row.dataset.blockId===dragging)return;
 e.preventDefault();e.dataTransfer.dropEffect="move";
 for(const n of $("blockList").querySelectorAll(".ve39-drop"))n.classList.remove("ve39-drop");
 row.classList.add("ve39-drop");
});
$("blockList").addEventListener("drop",e=>{
 const row=e.target.closest("[data-block-id]");if(!dragging||!row)return;
 e.preventDefault();const id=dragging,target=row.dataset.blockId;dragging=null;
 update(()=>dropBlock(editor,id,target,"before"),"已将 "+id+" 移到 "+target+" 之前");
 for(const n of $("blockList").querySelectorAll(".ve39-drop"))n.classList.remove("ve39-drop");
});
$("blockList").addEventListener("dragend",()=>{
 dragging=null;for(const n of $("blockList").querySelectorAll(".ve39-drop"))n.classList.remove("ve39-drop");
});
$("propsForm").addEventListener("submit",e=>{
 e.preventDefault();const patch={};
 for(const input of $("propsFields").querySelectorAll("[data-prop]"))
  patch[input.dataset.prop]=input.dataset.kind==="boolean"?input.checked:input.value;
 const ok=update(()=>editSelectedProps(editor,patch),"属性已保存到本地状态");
 $("propsFeedback").textContent=ok?"已保存（只影响本地标本）":"未修改；请检查上方提示或当前字段。";
});
$("undoBtn").addEventListener("click",()=>update(()=>undoEditor(editor),"已撤销"));
$("redoBtn").addEventListener("click",()=>update(()=>redoEditor(editor),"已重做"));
$("resetBtn").addEventListener("click",()=>{editor=createEditor(seedBlocks());exporting=false;$("schemaOutput").hidden=true;render();announce("已重置虚构资料和历史记录。");});
$("exportBtn").addEventListener("click",()=>{
 exporting=!exporting;$("schemaOutput").hidden=!exporting;
 if(exporting)$("schemaOutput").textContent=exportBlockSchema(editor.blocks);
 announce(exporting?"已展示本地 Schema JSON，未保存到文件或服务器。":"已收起 JSON。");
});
render();announce("选择区块、使用上下移按钮或拖拽体验交互。");