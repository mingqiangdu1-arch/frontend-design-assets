const buttons=Array.from(document.querySelectorAll("[data-mode]")),cards=Array.from(document.querySelectorAll("[data-context]")),status=document.getElementById("count");
for(const btn of buttons)btn.addEventListener("click",()=>{
 const mode=btn.dataset.mode;let count=0;
 for(const tile of cards){const visible=mode==="all"||tile.dataset.context===mode;tile.hidden=!visible;if(visible)count++;}
 for(const button of buttons)button.setAttribute("aria-pressed",String(button===btn));
 status.textContent=count+" 个页面模板";
});
