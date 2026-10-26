export const samples=[
 {id:"BG-01",name:"LOUD TYPE",category:"identity",icon:"Aa",color:"#D8F35D",tag:"IDENTITY",desc:"字体成为视觉主角，而不只是内容载体。"},
 {id:"BG-02",name:"GOOD VIBES",category:"campaign",icon:"✳",color:"#F7A9C9",tag:"CAMPAIGN",desc:"像海报一样表达活动的情绪与目标。"},
 {id:"BG-03",name:"PIXEL PUSH",category:"tool",icon:"▦",color:"#B4DDF5",tag:"TOOL",desc:"给创作工具建立有记忆点的操作层级。"},
 {id:"BG-04",name:"TYPE CLUB",category:"identity",icon:"✶",color:"#D9CDFB",tag:"IDENTITY",desc:"品牌视觉系统中的粗细、对比与节奏。"},
 {id:"BG-05",name:"SUMMER LAB",category:"campaign",icon:"☼",color:"#F4CF8F",tag:"CAMPAIGN",desc:"色块、节奏和清楚的活动引导。"},
 {id:"BG-06",name:"SHAPE EDITOR",category:"tool",icon:"◩",color:"#CBF0CF",tag:"TOOL",desc:"为视觉创作界面设计可预期的反馈。"}
];
export const categories=["all","identity","campaign","tool"];
export function selectCategory(records,category){
 if(!categories.includes(category))throw Error("Unknown category: "+category);
 return category==="all"?records.slice():records.filter(x=>x.category===category);
}
export function toggleSaved(savedIds,id){
 const next=new Set(savedIds);
 if(next.has(id))next.delete(id);else next.add(id);
 return next;
}
export function shouldAnimate(prefersReducedMotion,supportsViewTransition){
 return !prefersReducedMotion&&supportsViewTransition;
}
