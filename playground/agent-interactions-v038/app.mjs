import {createTimeline,applyToolEvent,timelineSummary} from "./timeline-model.mjs";
import {createApproval,proposePatch,decidePatch,markPatchResult} from "./approval-model.mjs";
import {createClarification,changeDraft,askQuestion,chooseAnswer,submitAnswer,finishQuestion,dismissQuestion} from "./clarification-model.mjs";
const $=id=>document.getElementById(id);
const statusWords={queued:"排队中",running:"运行中",succeeded:"已成功",failed:"失败",cancelled:"已取消"};
const phaseWords={"idle":"尚未开始","running":"执行中","succeeded":"全部成功","failed":"全部失败","partial-failure":"部分失败","partial-cancelled":"部分取消","cancelled":"已取消"};
let timeline=createTimeline(),eventSeq=0;
let approval=createApproval();
let clarification=createClarification($("draftText").value,["design-notes.md"]);
let answerNonce=0;
const perform=(fn,feedback)=>{
 try{fn();feedback.textContent="操作已记录（仅本地演示）。";}
 catch(err){feedback.textContent=String(err.message||err);}
};
function renderTimeline(){
 const s=timelineSummary(timeline);
 $("timelinePhase").textContent=phaseWords[s.phase];
 $("timelineCounts").textContent=s.done+" / "+s.total+" 已结束";
 for(const tool of timeline.tools){
  $("tool-"+tool.id).textContent=statusWords[tool.status];
  for(const btn of document.querySelectorAll('[data-tool-id="'+tool.id+'"]')){
   const action=btn.dataset.next;
   btn.disabled=["succeeded","failed","cancelled"].includes(tool.status) ||
    (action==="running"&&tool.status!=="queued") ||
    (action!=="running"&&tool.status!=="running");
  }
 }
}
for(const b of document.querySelectorAll("[data-tool-id]")){
 b.addEventListener("click",()=>{
  perform(()=>{timeline=applyToolEvent(timeline,{id:b.dataset.toolId,status:b.dataset.next,seq:++eventSeq});},$("timelineFeedback"));
  renderTimeline();
 });
}
$("timelineReset").addEventListener("click",()=>{timeline=createTimeline();eventSeq=0;renderTimeline();$("timelineFeedback").textContent="已重置，历史结果不会保留。";});
const approvalWords={draft:"未发起提案",proposed:"待审批",approved:"已同意 · 未写入",rejected:"已拒绝",applied:"已记录模拟写入",conflict:"版本冲突 · 未写入"};
const PATCH={id:"demo-patch-01",baseVersion:"v1",patchHash:"sha256:aa11bb22cc33dd44",summary:"改善虚构配置的对比度与动效降级"};
function renderApproval(){
 $("approvalPhase").textContent=approvalWords[approval.phase];
 $("approvalReceipt").textContent=approval.receipt?.operationId?"本地回执: "+approval.receipt.operationId:
  approval.receipt?.kind==="conflict"?"冲突: "+approval.receipt.expected+" ≠ "+approval.receipt.actual:"无执行回执";
 $("approvalPropose").disabled=approval.phase!=="draft";
 $("approvalApprove").disabled=approval.phase!=="proposed";
 $("approvalReject").disabled=approval.phase!=="proposed";
 $("approvalApply").disabled=approval.phase!=="approved";
}
$("approvalPropose").addEventListener("click",()=>{perform(()=>{approval=proposePatch(approval,PATCH);},$("approvalFeedback"));renderApproval();});
$("approvalApprove").addEventListener("click",()=>{perform(()=>{approval=decidePatch(approval,{...PATCH,decision:"approve"});},$("approvalFeedback"));renderApproval();});
$("approvalReject").addEventListener("click",()=>{perform(()=>{approval=decidePatch(approval,{...PATCH,decision:"reject"});},$("approvalFeedback"));renderApproval();});
$("approvalApply").addEventListener("click",()=>{
 perform(()=>{approval=markPatchResult(approval,{...PATCH,currentVersion:$("approvalVersion").value,operationId:"LOCAL-DEMO-001"});},$("approvalFeedback"));
 renderApproval();
});
$("approvalReset").addEventListener("click",()=>{approval=createApproval();renderApproval();$("approvalFeedback").textContent="已重置模拟审批，未触碰任何真实文件。";});
function renderQuestion(){
 const active=clarification.status!=="idle";
 $("questionPhase").textContent=active?"进行中 · "+clarification.status:"待激活";
 $("questionPrompt").hidden=!active;
 $("draftText").disabled=active;
 $("draftText").value=clarification.draft;
 $("draftAttachment").textContent=clarification.attachments.join("、")||"无";
 $("questionAsk").disabled=active;
 $("questionSubmit").disabled=!["question","answering","error"].includes(clarification.status);
 $("questionAccept").disabled=clarification.status!=="submitted";
 $("questionDismiss").disabled=!active;
 $("questionResponse").textContent=clarification.receipts.length?
  "已确认回答："+String(clarification.receipts[clarification.receipts.length-1].value):"尚无回答回执。";
}
$("draftText").addEventListener("input",e=>{try{clarification=changeDraft(clarification,e.target.value);}catch(err){$("questionFeedback").textContent=err.message;}});
$("questionAsk").addEventListener("click",()=>{
 perform(()=>{clarification=askQuestion(clarification,{id:"q-accessibility",prompt:"是否优先考虑键盘可访问性？",kind:"single",options:["优先","稍后"]});},$("questionFeedback"));renderQuestion();
});
$("questionSubmit").addEventListener("click",()=>{
 perform(()=>{
  const selected=document.querySelector('input[name="clarificationAnswer"]:checked');
  if(!selected)throw Error("请选择一个选项");
  clarification=chooseAnswer(clarification,{questionId:"q-accessibility",value:selected.value});
  clarification=submitAnswer(clarification,{questionId:"q-accessibility",nonce:"local-"+(++answerNonce)});
 },$("questionFeedback"));renderQuestion();
});
$("questionAccept").addEventListener("click",()=>{
 perform(()=>{clarification=finishQuestion(clarification,{questionId:"q-accessibility",result:"accepted"});},$("questionFeedback"));renderQuestion();
});
$("questionDismiss").addEventListener("click",()=>{
 clarification=dismissQuestion(clarification);
 const radio=document.querySelector('input[name="clarificationAnswer"]:checked');if(radio)radio.checked=false;
 renderQuestion();$("questionFeedback").textContent="已退出，草稿和附件名称均未丢失。";
});
renderTimeline();renderApproval();renderQuestion();
