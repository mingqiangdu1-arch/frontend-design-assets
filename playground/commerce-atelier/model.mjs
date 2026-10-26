export const products=[
{id:"CA-01",name:"Luma 柔光桌灯",category:"lighting",material:"metal",price:429,shape:"lamp",tone:"sage",sizes:[{name:"标准版",available:true},{name:"大号",available:false}],description:"柔和桌面照明与简洁灯罩比例的原创样品。"},
{id:"CA-02",name:"Vera 便携水瓶",category:"daily",material:"metal",price:159,shape:"bottle",tone:"sand",sizes:[{name:"500 mL",available:true},{name:"750 mL",available:true}],description:"轻便直筒容器，演示容量选择和商品可用状态。"},
{id:"CA-03",name:"Fold 纸质手帐",category:"desk",material:"paper",price:89,shape:"notebook",tone:"ivory",sizes:[{name:"A5",available:true},{name:"A4",available:false}],description:"纯色封面纸本，适合日常规划与记录。"},
{id:"CA-04",name:"Arc 桌面收纳",category:"desk",material:"wood",price:249,shape:"tray",tone:"stone",sizes:[{name:"自然木",available:true},{name:"深木",available:true}],description:"模拟木制浅托盘与小物分区。"},
{id:"CA-05",name:"Sol 陶瓷花器",category:"living",material:"ceramic",price:299,shape:"vase",tone:"sand",sizes:[{name:"小号",available:true},{name:"中号",available:false}],description:"平衡形态与功能的原创陶瓷花器概念。"},
{id:"CA-06",name:"Nido 香氛杯",category:"living",material:"ceramic",price:139,shape:"cup",tone:"sage",sizes:[{name:"岩白",available:true},{name:"烟绿",available:true}],description:"用于测试规格和轻量购物状态的容器造型。"}
];
export const categoryLabels={lighting:"灯具",daily:"日用",desk:"桌面",living:"家居"};
export const materialLabels={metal:"金属",paper:"纸品",wood:"木材",ceramic:"陶瓷"};
export function selectCatalog(items,{categories=[],materials=[],sort="featured",query=""}={}){
 const cat=new Set(categories),mat=new Set(materials),q=String(query).trim().toLocaleLowerCase();
 const selected=items.filter(p=>(!cat.size||cat.has(p.category))&&(!mat.size||mat.has(p.material))&&(!q||[p.name,p.description,p.id].some(v=>v.toLocaleLowerCase().includes(q))));
 if(sort==="price-low")selected.sort((a,b)=>a.price-b.price||a.id.localeCompare(b.id));
 else if(sort==="price-high")selected.sort((a,b)=>b.price-a.price||a.id.localeCompare(b.id));
 else if(sort==="featured")selected.sort((a,b)=>a.id.localeCompare(b.id));
 else throw Error("Unknown sort");
 return selected;
}
export function toggleFacet(values,value){const next=new Set(values);if(next.has(value))next.delete(value);else next.add(value);return [...next].sort();}
export function toggleSaved(values,id){const next=new Set(values);if(next.has(id))next.delete(id);else next.add(id);return next;}
export function addToBag(lines,product,variant){
 const choice=product?.sizes.find(x=>x.name===variant);
 if(!choice?.available)return {lines,added:false,reason:"This variant is not available"};
 const key=product.id+"|"+variant;
 const match=lines.find(x=>x.key===key);
 const next=match?lines.map(x=>x.key===key?{...x,quantity:x.quantity+1}:x):[...lines,{key,id:product.id,variant,price:product.price,quantity:1}];
 return {lines:next,added:true};
}
export function bagTotal(lines){return lines.reduce((sum,x)=>sum+x.price*x.quantity,0);}
export function bagCount(lines){return lines.reduce((sum,x)=>sum+x.quantity,0);}
