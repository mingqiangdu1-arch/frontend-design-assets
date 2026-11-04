const $=id=>document.getElementById(id);
const styles=["pixel-arcade","signal-noir","paper-rebellion","aether-orbit"];
const params=new URLSearchParams(location.search);
function selectStyle(id,{historyMode="replace"}={}){
 if(!styles.includes(id))return;
 document.querySelectorAll("[data-direction]").forEach(button=>{
  button.setAttribute("aria-pressed",String(button.dataset.direction===id));
 });
 document.querySelectorAll("[data-scene]").forEach(section=>{section.hidden=section.dataset.scene!==id;});
 if(historyMode!=="none"){
  const url=new URL(location.href);url.searchParams.set("style",id);
  window.history[historyMode+"State"]({style:id},"",url);
 }
}
document.querySelectorAll("[data-direction]").forEach(button=>button.addEventListener("click",()=>selectStyle(button.dataset.direction,{historyMode:"push"})));
window.addEventListener("popstate",()=>selectStyle(new URLSearchParams(location.search).get("style"),{historyMode:"none"}));
selectStyle(styles.includes(params.get("style"))?params.get("style"):styles[0],{historyMode:"none"});
const questData={
 "1":{xp:25,label:"FIRST CONTACT",feedback:"Chapter 01 selected · First Contact"},
 "2":{xp:50,label:"THE UNKNOWN",feedback:"Chapter 02 selected · The Unknown"},
 "3":{xp:90,label:"RETURN HOME",feedback:"Chapter 03 selected · Return Home"}
};
document.querySelectorAll("[data-quest]").forEach(btn=>btn.addEventListener("click",()=>{
 const id=btn.dataset.quest,quest=questData[id];if(!quest)return;
 document.querySelectorAll("[data-quest]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
 $("pixelXP").textContent=String(quest.xp).padStart(3,"0");
 $("pixelStage").textContent="0"+id+" / 03";
 $("pixelFeedback").textContent=quest.feedback;
}));
let channel="ORBIT";
const freq=$("signalFreq");
function syncSignal(){
 const value=Number(freq.value);
 $("signalFreqValue").textContent=String(value);
 $("signalChannel").textContent=channel;
 $("signalMessage").textContent=channel+" channel tuned to "+value+" MHz (simulated).";
}
document.querySelectorAll("[data-channel]").forEach(btn=>btn.addEventListener("click",()=>{
 channel=btn.dataset.channel;
 document.querySelectorAll("[data-channel]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
 syncSignal();
}));
freq.addEventListener("input",syncSignal);
let boardMode=0;
$("paperShuffle").addEventListener("click",()=>{
 boardMode=(boardMode+1)%3;$("paperBoard").dataset.layout=String(boardMode);
 $("paperFeedback").textContent="Collage arrangement "+(boardMode+1)+" of 3; readable order unchanged.";
});
document.querySelectorAll("[data-topic-filter]").forEach(btn=>btn.addEventListener("click",()=>{
 const topic=btn.dataset.topicFilter;let count=0;
 document.querySelectorAll(".paper-note").forEach(note=>{
  note.hidden=topic!=="all"&&note.dataset.topic!==topic;
  if(!note.hidden)count++;
 });
 document.querySelectorAll("[data-topic-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
 $("paperFeedback").textContent="Showing "+count+" handmade note"+(count===1?"":"s")+".";
}));
const moods=["dawn","twilight","nebula"];
document.querySelectorAll("[data-mood-preset]").forEach(btn=>btn.addEventListener("click",()=>{
 const mood=btn.dataset.moodPreset;if(!moods.includes(mood))return;
 document.querySelector(".aether-shell").dataset.mood=mood;
 document.querySelectorAll("[data-mood-preset]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
 $("aetherFeedback").textContent=mood[0].toUpperCase()+mood.slice(1)+" · ambient scene preview, no audio.";
}));
