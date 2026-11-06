// Four independent task-specific visual grammars; no timers, network calls or persistence.
export const directionIds=Object.freeze(["liquid-layer","shape-expressive","type-led-minimal","organic-tactile"]);
export const stories=Object.freeze([
 {name:"Purpose",number:"01",headline:"Less<br>noise.<br><em>More meaning.</em>",description:"一个明确的信息，比十个争夺注意力的卡片更有力量。保留可见导航和完整的深入阅读路径。"},
 {name:"Method",number:"02",headline:"Edit first.<br>Then<br><em>design.</em>",description:"先删掉无关句子，再决定字重、节奏和留白；避免把没有内容的页面误认成极简。"},
 {name:"Impact",number:"03",headline:"A clear<br>idea<br><em>travels.</em>",description:"内容可被扫描，也可以展开深入阅读。突出行动和可达性，而不是依赖滚动动画来传递意思。"}
]);
export const availableMaterial=new Set(["moss","clay","linen"]);
export function validStyle(id){return directionIds.includes(id)?id:null}
export function storyFor(index){return stories[index]||null}
export function materialName(id){return ({moss:"苔藓",clay:"陶土",linen:"亚麻"})[id]||null}

if(typeof document!=="undefined"){
 const el=id=>document.getElementById(id);
 const params=new URLSearchParams(location.search);
 function selectStyle(id,{historyMode="replace"}={}){
  if(!validStyle(id))return;
  document.querySelectorAll("[data-direction]").forEach(button=>{
   button.setAttribute("aria-pressed",String(button.dataset.direction===id));
  });
  document.querySelectorAll("[data-scene]").forEach(section=>{
   section.hidden=section.dataset.scene!==id;
  });
  if(historyMode!=="none"){
   const url=new URL(location.href);url.searchParams.set("style",id);
   window.history[historyMode+"State"]({style:id},"",url);
  }
 }
 document.querySelectorAll("[data-direction]").forEach(button=>
  button.addEventListener("click",()=>selectStyle(button.dataset.direction,{historyMode:"push"})));
 window.addEventListener("popstate",()=>{
  selectStyle(validStyle(new URLSearchParams(location.search).get("style"))||directionIds[0],{historyMode:"none"});
 });
 selectStyle(validStyle(params.get("style"))||directionIds[0],{historyMode:"none"});

 const ll=document.querySelector(".ll-shell"),glass=el("llGlass");
 function updateLiquid(){
  const mode=ll.dataset.mode,translucent=glass.checked;
  ll.dataset.glass=translucent?"on":"off";
  document.querySelectorAll("[data-landscape]").forEach(button=>
   button.setAttribute("aria-pressed",String(button.dataset.landscape===mode)));
  el("llFeedback").textContent=(mode==="dusk"?"黄昏":"海岸日间")+
   " · 功能层"+(translucent?"半透明":"不透明");
 }
 document.querySelectorAll("[data-landscape]").forEach(button=>button.addEventListener("click",()=>{
  ll.dataset.mode=button.dataset.landscape;updateLiquid();
 }));
 glass.addEventListener("change",updateLiquid);

 const shapes={plan:{label:"规划 · 先明确一件事",word:"PLAN"},move:{label:"行动 · 用下一步验证想法",word:"MOVE"},rest:{label:"休息 · 为持续行动留出空间",word:"PAUSE"}};
 const se=document.querySelector(".se-shell");
 document.querySelectorAll("[data-shape-choice]").forEach(button=>button.addEventListener("click",()=>{
  const id=button.dataset.shapeChoice;if(!shapes[id])return;
  se.dataset.focus=id;
  document.querySelectorAll("[data-shape-choice]").forEach(other=>
   other.setAttribute("aria-pressed",String(other===button)));
  el("seFeedback").textContent="当前重点："+shapes[id].label;
  el("seFocus").textContent=shapes[id].word;
 }));

 document.querySelectorAll("[data-type-story]").forEach(button=>button.addEventListener("click",()=>{
  const story=storyFor(Number(button.dataset.typeStory));if(!story)return;
  document.querySelectorAll("[data-type-story]").forEach(other=>
   other.setAttribute("aria-pressed",String(other===button)));
  // Only trusted static strings authored here are assigned HTML markup.
  el("tmHeadline").innerHTML=story.headline;
  el("tmDescription").textContent=story.description;
  el("tmPosition").textContent=story.number;
  el("tmFeedback").textContent="当前故事："+story.name;
 }));

 const ot=document.querySelector(".ot-shell");
 document.querySelectorAll("button[data-material]").forEach(button=>button.addEventListener("click",()=>{
  const material=button.dataset.material;if(!availableMaterial.has(material))return;
  ot.dataset.material=material;
  document.querySelectorAll("button[data-material]").forEach(other=>
   other.setAttribute("aria-pressed",String(other===button)));
  el("otFeedback").textContent="当前色调："+materialName(material)+" · 原创 CSS 材质示意";
 }));
}
