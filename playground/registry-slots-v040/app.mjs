import {listCuratedMappings} from "./registry-adapter.mjs";
import {createCommandSession,previewCommand,confirmCommand} from "./command-preview.mjs";
import {describeSlotTree} from "./slot-tree.mjs";
const $=id=>document.getElementById(id);
let session=createCommandSession(),plan=null;
const status=(message)=>{$("status").textContent=message;};
for(const m of listCuratedMappings()){
 const op=document.createElement("option");
 op.value=m.sourceId;op.textContent=m.label+" · "+m.sourceId;
 $("source").append(op);
}
$("source").value="fixture.feature";
const target=value=>{
 const at=value.indexOf(":");
 if(at<0)throw Error("Invalid slot target");
 return {parentId:value.slice(0,at),slot:value.slice(at+1)};
};
function render(){
 $("revision").textContent="Revision "+session.revision;
 const lines=describeSlotTree(session.doc);
 const frag=document.createDocumentFragment();
 for(const line of lines){
  const item=document.createElement("li");
  const spaces=line.match(/^ */)[0].length;
  item.dataset.depth=String(spaces/2+1);
  item.textContent=line.trim();
  item.dataset.nodeId=line.trim().split(" · ").at(-1);
  frag.append(item);
 }
 $("tree").replaceChildren(frag);
 $("currentJSON").textContent=JSON.stringify({revision:session.revision,roots:session.doc.roots,nodes:session.doc.nodes.map(n=>({id:n.id,type:n.type,slots:n.slots}))},null,2);
 $("preview").textContent=plan?JSON.stringify({kind:plan.command.kind,revision:plan.expectedRevision,resultNodes:plan.proposedDoc.nodes.length,roots:plan.proposedDoc.roots,tree:describeSlotTree(plan.proposedDoc)},null,2):"尚未生成预览。";
 $("confirm").disabled=!plan;$("discard").disabled=!plan;
}
function perform(cmd,label){
 try{
  plan=previewCommand(session,cmd);
  render();status("已预览 "+label+"，尚未修改本地当前文档；需要明确确认。");
 }catch(err){plan=null;render();status("操作被拒绝："+String(err.message||err));}
}
$("previewInsert").addEventListener("click",()=>{
 const t=target($("insertTarget").value);
 perform({kind:"insert",sourceId:$("source").value,instanceId:$("newId").value,...t}, "素材映射");
});
$("previewMove").addEventListener("click",()=>{
 const t=target($("moveTarget").value);
 perform({kind:"move",nodeId:$("moveId").value,...t},"区块移动");
});
$("previewEdit").addEventListener("click",()=>{
 perform({kind:"edit",nodeId:"section-one",props:{layout:$("layout").value}},"布局属性");
});
$("confirm").addEventListener("click",()=>{
 try{session=confirmCommand(session,plan,{confirm:true});plan=null;render();status("本地内存操作已确认，Revision "+session.revision+"；没有服务端写入。");}
 catch(err){plan=null;render();status("确认失败："+String(err.message||err));}
});
$("discard").addEventListener("click",()=>{plan=null;render();status("预览已丢弃，当前文档不变。");});
$("reset").addEventListener("click",()=>{session=createCommandSession();plan=null;render();status("已重置本地 Fixture；外部文件从未修改。");});
render();status("已加载原创本地 Registry Fixture 和 Slot 树。");
