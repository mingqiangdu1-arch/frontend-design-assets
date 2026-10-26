import {tasks,toggleTask,stats,selectTasks} from "./model.mjs";
const $=id=>document.getElementById(id);
let completed=new Set(),filter="all";
function render(){
 const current=stats(tasks,completed);
 $("score").firstChild.textContent=String(current.points)+" ";
 $("completionLabel").textContent="已完成 "+current.completed+" / "+current.total;
 $("percent").textContent=current.percent+"%";$("ring").style.setProperty("--pct",String(current.percent));
 $("rewards").classList.toggle("complete",current.percent===100);
 $("rewardsTitle").textContent=current.percent===100?"今天的目标全部完成！":"每一次完成都值得记录。";
 const rows=selectTasks(tasks.map(t=>({...t,done:completed.has(t.id)})),filter);
 const frag=document.createDocumentFragment();
 rows.forEach(item=>{
  const li=document.createElement("li"),button=document.createElement("button");button.type="button";button.dataset.task=item.id;button.setAttribute("aria-pressed",String(item.done));
  const icon=document.createElement("span");icon.className="icon";icon.setAttribute("aria-hidden","true");icon.textContent=item.emoji;
  const body=document.createElement("span");body.className="body";
  const title=document.createElement("strong");title.textContent=item.name;const subtitle=document.createElement("small");subtitle.textContent="完成获得 "+item.points+" 点";
  body.append(title,subtitle);const marker=document.createElement("span");marker.className="check";marker.setAttribute("aria-hidden","true");marker.textContent=item.done?"✓":"";
  button.append(icon,body,marker);li.append(button);frag.append(li);
 });
 if(!rows.length){const li=document.createElement("li");li.textContent="目前没有符合条件的任务。";frag.append(li);}
 $("taskList").replaceChildren(frag);
 document.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===filter)));
}
$("taskList").addEventListener("click",event=>{
 const button=event.target.closest("[data-task]");if(!button)return;
 const id=button.dataset.task;const item=tasks.find(t=>t.id===id);completed=toggleTask(completed,id);
 const finished=completed.has(id);render();$("feedback").textContent=item.name+(finished?" 已完成，获得 ":" 已恢复为待完成，减少 ")+item.points+" 点";
 $("taskList").querySelector('[data-task="'+id+'"]')?.focus();
});
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{filter=btn.dataset.filter;render();}));
render();
