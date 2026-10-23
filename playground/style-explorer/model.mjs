/** Browser-independent behavior model for the style comparison lab. */
export const styleIds=["precision-dark","editorial-warm","playful-pop"];
export function selectStyle(requested,current=styleIds[0]){
 return styleIds.includes(requested)?requested:current;
}
export function filterCommands(items,query){
 const q=String(query??"").trim().toLocaleLowerCase();
 return items.filter(item=>(item.title+" "+item.meta).toLocaleLowerCase().includes(q));
}
export function markSelected(ids,nextId){return ids.includes(nextId)?nextId:ids[0]??null;}
export function toggleSaved(isSaved){return !Boolean(isSaved);}
export const lessons=[
 {title:"哪一种设计更适合长时间阅读？",options:["柔和底色、舒适行宽","尽量密集的所有卡片","持续闪动的背景"],correct:0,detail:"阅读要保持文字层级、行宽与视觉节奏。"},
 {title:"什么时候适合给按钮更强的反馈？",options:["每次滚动都播放","用户完成关键任务后","界面静止时不停动画"],correct:1,detail:"完成有意义的动作时，反馈帮助确认结果。"},
 {title:"怎样让趣味界面依然清晰？",options:["所有元素尽量鲜艳","一屏加入更多彩色 CTA","明确主操作与次要层级"],correct:2,detail:"趣味性可以服务于结构，而不是与信息竞争。"}
];
export function evaluateChoice(question,choice){
 if(!question||!Number.isInteger(choice)||choice<0||choice>=question.options.length){
  return {valid:false,correct:false,delta:0};
 }
 const correct=choice===question.correct;
 return {valid:true,correct,delta:correct?20:0};
}
export function progressPercent(index,total){
 if(!Number.isFinite(total)||total<=0)return 0;
 return Math.max(0,Math.min(100,Math.round(100*(index+1)/total)));
}
export function nextQuestionIndex(index,total){
 if(total<=0)return 0;
 return (index+1)%total;
}
