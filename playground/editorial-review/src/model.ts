export type Status="draft"|"review"|"ready";
export type Article={id:string;title:string;section:string;status:Status;excerpt:string;author:string;minutes:number;date:string;body:string[]};
export const articles:Article[]=[
{id:"ED-101",title:"时间、界面与人的注意力",section:"Design",status:"review",excerpt:"当每一个按钮都可以被看到，真正重要的是什么？",author:"Mei",minutes:6,date:"10.26",body:["我们为速度设计，也为停顿设计。一个信息产品需要决定何时发声、何时安静。","不同用途的页面，应当保留各自的内容秩序。"]},
{id:"ED-102",title:"为阅读留一段距离",section:"Culture",status:"draft",excerpt:"行宽、段落节奏与留白如何影响阅读体验。",author:"Ari",minutes:4,date:"10.25",body:["长文本不是看板上的另一张卡片。它有自己的节奏和层次。","清晰的正文与充足的间距，能让内容保持主角地位。"]},
{id:"ED-103",title:"可以解释的设计选择",section:"Design",status:"ready",excerpt:"把设计语言沉淀为能够再次判断的原则。",author:"Will",minutes:8,date:"10.23",body:["一个设计资源库的价值不在于无限堆叠图片，而在于保留上下文。","每一次复用都应重新确认用户、设备和技术边界。"]},
{id:"ED-104",title:"小型团队的编辑流程",section:"Notes",status:"review",excerpt:"让草稿、审阅与准备完成的状态被清晰区分。",author:"Jo",minutes:5,date:"10.20",body:["本示例探索透明的编辑协作，而不是一个虚构的真实 CMS。","所有状态修改都保存在浏览器内存里，不会产生实际发布。"]}
];
export const statusLabels:Record<Status,string>={draft:"Draft",review:"In review",ready:"Ready"};
export function filterArticles(items:Article[],query:string,status:"all"|Status){
 const q=query.trim().toLocaleLowerCase();
 return items.filter(x=>(status==="all"||x.status===status)&&(!q||[x.title,x.excerpt,x.section,x.author].some(value=>value.toLocaleLowerCase().includes(q))));
}
export function setStatus(items:Article[],id:string,next:Status){
 const found=items.find(x=>x.id===id);
 if(!found||found.status===next||!Object.hasOwn(statusLabels,next))return {items,undo:null};
 return {items:items.map(x=>x.id===id?{...x,status:next}:x),undo:{id,from:found.status,to:next}};
}
export function undoStatus(items:Article[],change:{id:string;from:Status;to:Status}|null){
 if(!change)return items;
 return items.map(x=>x.id===change.id&&x.status===change.to?{...x,status:change.from}:x);
}
export function readyRate(items:Article[]){return items.length?Math.round(items.filter(x=>x.status==="ready").length/items.length*100):0;}
