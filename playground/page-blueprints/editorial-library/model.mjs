export const articles=[
{id:"a1",tag:"product",title:"好设计是一种持续的选择",excerpt:"从密度到反馈时机，决定界面性格的往往是细微选择。",read:"6 min",text:["一个界面不只是元素的集合。它首先是一套关于内容优先级的决定。","为了快速复用，我们沉淀 Button、Table 或 Drawer。但缺乏上下文的复用，容易让所有产品都变成同一种工作台。"]},
{id:"a2",tag:"culture",title:"留白不是空白，而是节奏",excerpt:"阅读时，一条细线可能比一张新卡片更有用。",read:"4 min",text:["阅读界面需要让内容站在前面。过密装饰会打断段落节奏。","稳定行宽、段落间距和清晰层级让思考更专注。"]},
{id:"a3",tag:"product",title:"每个操作都需要合理回应",excerpt:"Undo、失败提示与焦点恢复，构成界面可靠感。",read:"7 min",text:["用户完成操作之后，需要知道接下来发生了什么。","异步状态不应假装已成功。恢复和重试应是可见的下一步。"]},
{id:"a4",tag:"research",title:"让素材真正能够再次使用",excerpt:"按任务、风格与技术边界检索设计资料。",read:"5 min",text:["积累素材不是堆叠截图，每个条目都需要来源、复用范围和实施边界。","从案例研究进入组件实现，应当有明确可验证的阶段。"]}
];
export const tags=["all","product","culture","research"];
export function filterArticles(items,term="",tag="all"){
 if(!tags.includes(tag))throw Error("Unknown tag");
 const q=String(term).trim().toLowerCase();
 return items.filter(x=>(tag==="all"||x.tag===tag)&&(!q||[x.title,x.excerpt].some(t=>t.toLowerCase().includes(q))));
}
export function toggleBookmark(saved,id){const next=new Set(saved);next.has(id)?next.delete(id):next.add(id);return next;}
