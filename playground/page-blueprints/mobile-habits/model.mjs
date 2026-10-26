export const tasks=[
 {id:"t1",name:"阅读 10 分钟",category:"mind",points:20,emoji:"📖"},
 {id:"t2",name:"起身活动",category:"energy",points:15,emoji:"🌿"},
 {id:"t3",name:"整理今天的计划",category:"mind",points:15,emoji:"✍️"},
 {id:"t4",name:"喝一杯水",category:"energy",points:10,emoji:"💧"}
];
export function toggleTask(completed,id){
 if(!tasks.some(t=>t.id===id))return new Set(completed);
 const next=new Set(completed);next.has(id)?next.delete(id):next.add(id);return next;
}
export function stats(items,completed){
 const done=items.filter(x=>completed.has(x.id));
 return {completed:done.length,total:items.length,points:done.reduce((a,b)=>a+b.points,0),percent:items.length?Math.round(done.length/items.length*100):0};
}
export function selectTasks(items,mode){
 if(mode==="all")return items.slice();
 if(mode==="pending")return items.filter(x=>!x.done);
 if(mode==="done")return items.filter(x=>x.done);
 throw Error("Unknown task filter");
}
