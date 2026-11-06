import * as React from "react";

// V0.21 original reference components: interaction primitives, not an application
// router, popper engine, global shortcut framework or screen-reader certification.

export interface TooltipProps {
 label:string;content:string;disabled?:boolean;className?:string;
 placement?:"top"|"bottom";
}
export function Tooltip({label,content,disabled=false,className,placement="top"}:TooltipProps){
 const id=React.useId(),[open,setOpen]=React.useState(false);
 const reveal=()=>{if(!disabled)setOpen(true);};
 return <span className={["fda-tooltip",className].filter(Boolean).join(" ")}
  onMouseEnter={reveal} onMouseLeave={()=>setOpen(false)}>
  <button className="fda-tooltip__trigger" type="button" disabled={disabled}
   onFocus={reveal} onBlur={()=>setOpen(false)}
   onKeyDown={e=>{if(e.key==="Escape"){e.preventDefault();setOpen(false);}}}
   aria-describedby={open?id:undefined}>{label}</button>
  {open&&<span id={id} role="tooltip" className="fda-tooltip__bubble"
   data-placement={placement}>{content}</span>}
 </span>;
}

export interface BreadcrumbItem {
 id:string;label:string;href?:string;onSelect?:()=>void;disabled?:boolean;
}
export interface BreadcrumbProps {
 items:BreadcrumbItem[];label?:string;separator?:string;className?:string;
}
export function Breadcrumb({items,label="面包屑导航",separator="›",className}:BreadcrumbProps){
 return <nav aria-label={label} className={["fda-breadcrumb",className].filter(Boolean).join(" ")}>
  <ol>{items.map((item,index)=>{
   const current=index===items.length-1;
   return <li key={item.id}>
    {index>0&&<span aria-hidden="true" className="fda-breadcrumb__sep">{separator}</span>}
    {current?<span aria-current="page" className="fda-breadcrumb__current">{item.label}</span>:
     item.disabled?<span aria-disabled="true" className="fda-breadcrumb__disabled">{item.label}</span>:
     item.href?<a href={item.href} onClick={item.onSelect}>{item.label}</a>:
     item.onSelect?<button type="button" onClick={item.onSelect}>{item.label}</button>:
     <span>{item.label}</span>}
   </li>;
  })}</ol>
 </nav>;
}

export interface PaginationProps {
 page:number;pageSize:number;totalItems:number;
 onPageChange:(page:number)=>void;label?:string;className?:string;
}
export function Pagination({page,pageSize,totalItems,onPageChange,
 label="分页导航",className}:PaginationProps){
 if(!Number.isInteger(page)||!Number.isInteger(pageSize)||!Number.isInteger(totalItems)||
  pageSize<1||totalItems<0)throw Error("Invalid Pagination page size or item count");
 const count=Math.max(1,Math.ceil(totalItems/pageSize));
 if(page<1||page>count)throw Error("Pagination page is out of bounds");
 const options=new Set<number>([1,count]);
 for(let n=Math.max(1,page-1);n<=Math.min(count,page+1);n++)options.add(n);
 const sorted=[...options].sort((a,b)=>a-b);
 const display:(number|string)[]=[];
 for(let i=0;i<sorted.length;i++){
  if(i>0){const gap=sorted[i]-sorted[i-1];
   if(gap===2)display.push(sorted[i]-1);
   else if(gap>2)display.push("gap-"+i);
  }
  display.push(sorted[i]);
 }
 const first=totalItems===0?0:(page-1)*pageSize+1;
 const last=Math.min(totalItems,page*pageSize);
 return <nav aria-label={label} className={["fda-pagination",className].filter(Boolean).join(" ")}>
  <span className="fda-pagination__summary">{first}–{last} / {totalItems} 项</span>
  <div className="fda-pagination__actions">
   <button type="button" aria-label="上一页" disabled={page<=1}
    onClick={()=>onPageChange(page-1)}>上一页</button>
   {display.map(token=>typeof token==="number"?
    <button type="button" key={token} aria-label={"第 "+token+" 页"}
     aria-current={page===token?"page":undefined}
     onClick={()=>onPageChange(token)} disabled={page===token}>{token}</button>:
    <span key={token} aria-hidden="true" className="fda-pagination__ellipsis">…</span>)}
   <button type="button" aria-label="下一页" disabled={page>=count}
    onClick={()=>onPageChange(page+1)}>下一页</button>
  </div>
 </nav>;
}

export interface AccordionItem {
 id:string;title:string;content:React.ReactNode;disabled?:boolean;
}
export interface AccordionProps {
 items:AccordionItem[];openIds:readonly string[];
 onOpenIdsChange:(ids:string[])=>void;label?:string;className?:string;
}
export function Accordion({items,openIds,onOpenIdsChange,label="折叠内容",
 className}:AccordionProps){
 const prefix=React.useId(),refs=React.useRef<Record<string,HTMLButtonElement|null>>({});
 const enabled=items.filter(item=>!item.disabled);
 const toggle=(id:string)=>onOpenIdsChange(openIds.includes(id)?
  openIds.filter(x=>x!==id):[...openIds,id]);
 const handleKey=(event:React.KeyboardEvent<HTMLButtonElement>,id:string)=>{
  const at=enabled.findIndex(x=>x.id===id);
  if(at<0)return;
  let next:number|undefined;
  if(event.key==="ArrowDown")next=(at+1)%enabled.length;
  else if(event.key==="ArrowUp")next=(at+enabled.length-1)%enabled.length;
  else if(event.key==="Home")next=0;
  else if(event.key==="End")next=enabled.length-1;
  if(next!==undefined){event.preventDefault();refs.current[enabled[next].id]?.focus();}
 };
 return <section aria-label={label}
  className={["fda-accordion",className].filter(Boolean).join(" ")}>
  {items.map((item,index)=>{
   const opened=openIds.includes(item.id),heading=prefix+"-head-"+index,panel=prefix+"-panel-"+index;
   return <div className="fda-accordion__item" key={item.id}>
    <h3><button ref={node=>{refs.current[item.id]=node;}} id={heading}
     type="button" disabled={item.disabled} aria-controls={panel}
     aria-expanded={opened} onClick={()=>toggle(item.id)}
     onKeyDown={e=>handleKey(e,item.id)}>
     <span>{item.title}</span><span aria-hidden="true">{opened?"−":"+"}</span>
    </button></h3>
    <div role="region" id={panel} aria-labelledby={heading}
     className="fda-accordion__panel" hidden={!opened}>{item.content}</div>
   </div>;
  })}
 </section>;
}

export interface SidebarNavItem {
 id:string;label:string;description?:string;disabled?:boolean;
 children?:SidebarNavItem[];
}
export interface SidebarNavProps {
 label:string;items:SidebarNavItem[];activeId:string;
 onNavigate:(id:string)=>void;expandedIds:readonly string[];
 onExpandedIdsChange:(ids:string[])=>void;className?:string;
}
export function SidebarNav({label,items,activeId,onNavigate,expandedIds,
 onExpandedIdsChange,className}:SidebarNavProps){
 const prefix=React.useId(),expanded=new Set(expandedIds);
 const toggle=(id:string)=>onExpandedIdsChange(expanded.has(id)?
  expandedIds.filter(x=>x!==id):[...expandedIds,id]);
 const render=(nodes:SidebarNavItem[],depth=0,parentPath="root"):React.ReactNode=>
  nodes.map((item,index)=>{
   const path=parentPath+"-"+index,hasChildren=Boolean(item.children?.length);
   const open=expanded.has(item.id),subId=prefix+"-group-"+path;
   return <li key={item.id} className="fda-sidebar__item">
    <div className="fda-sidebar__row" style={{"--fda-sidebar-depth":depth} as React.CSSProperties}>
     {hasChildren?<button className="fda-sidebar__toggle" type="button"
      aria-label={(open?"折叠":"展开")+item.label} aria-expanded={open}
      aria-controls={subId} disabled={item.disabled}
      onClick={()=>toggle(item.id)}><span aria-hidden="true">{open?"▾":"▸"}</span></button>:
      <span className="fda-sidebar__spacer" aria-hidden="true"/>}
     <button type="button" className="fda-sidebar__link"
      disabled={item.disabled} aria-current={activeId===item.id?"page":undefined}
      onClick={()=>onNavigate(item.id)}>
      <span>{item.label}</span>{item.description&&<small>{item.description}</small>}
     </button>
    </div>
    {hasChildren&&<ul id={subId} hidden={!open}>{render(item.children||[],depth+1,path)}</ul>}
   </li>;
  });
 return <nav aria-label={label} className={["fda-sidebar",className].filter(Boolean).join(" ")}>
  <ul>{render(items)}</ul>
 </nav>;
}
