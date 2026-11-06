import * as React from "react";

// These are original, controlled reference components. No hidden data fetching,
// virtualization, keyboard framework or production accessibility certification.

export interface DataTableColumn<T>{
 key:string;header:string;cell:(row:T)=>React.ReactNode;sortable?:boolean;
}
export type DataTableSort={key:string;direction:"asc"|"desc"}|null;
export interface DataTableProps<T extends {id:string}>{
 rows:T[];columns:DataTableColumn<T>[];label:string;emptyMessage?:string;
 sort?:DataTableSort;onSortChange?:(sort:NonNullable<DataTableSort>)=>void;
 selectedIds?:string[];onSelectedIdsChange?:(ids:string[])=>void;
 selectLabel?:(row:T)=>string;className?:string;
}
export function DataTable<T extends {id:string}>({
 rows,columns,label,emptyMessage="没有符合条件的记录",sort=null,onSortChange,
 selectedIds=[],onSelectedIdsChange,selectLabel,className
}:DataTableProps<T>){
 const selectable=Boolean(onSelectedIdsChange);
 const selected=new Set(selectedIds),ids=new Set(rows.map(r=>r.id));
 const count=rows.filter(r=>selected.has(r.id)).length;
 const all=rows.length>0&&count===rows.length;
 const toggleAll=(checked:boolean)=>{
  const next=new Set(selectedIds);
  for(const id of ids){if(checked)next.add(id);else next.delete(id);}
  onSelectedIdsChange?.([...next]);
 };
 const toggle=(id:string,checked:boolean)=>{
  const next=new Set(selectedIds);if(checked)next.add(id);else next.delete(id);
  onSelectedIdsChange?.([...next]);
 };
 return <div className={["fda-table-scroll",className].filter(Boolean).join(" ")}>
  <table className="fda-table" aria-label={label}>
   <thead><tr>
    {selectable&&<th scope="col" className="fda-table__checkbox">
      <input type="checkbox" aria-label={"选择全部可见"+label} checked={all}
       ref={el=>{if(el)el.indeterminate=count>0&&!all;}}
       onChange={e=>toggleAll(e.target.checked)} disabled={!rows.length}/>
    </th>}
    {columns.map(column=><th key={column.key} scope="col"
     aria-sort={column.sortable&&sort?.key===column.key?
       sort.direction==="asc"?"ascending":"descending":undefined}>
     {column.sortable&&onSortChange?
      <button type="button" className="fda-table__sort"
       onClick={()=>onSortChange({key:column.key,
        direction:sort?.key===column.key&&sort.direction==="asc"?"desc":"asc"})}>
       {column.header}<span aria-hidden="true">{sort?.key===column.key?sort.direction==="asc"?" ↑":" ↓":" ↕"}</span>
      </button>:column.header}
    </th>)}
   </tr></thead>
   <tbody>{rows.length?rows.map(row=><tr key={row.id} data-selected={selected.has(row.id)||undefined}>
    {selectable&&<td className="fda-table__checkbox"><input type="checkbox"
     aria-label={"选择"+(selectLabel?.(row)||row.id)} checked={selected.has(row.id)}
     onChange={e=>toggle(row.id,e.target.checked)}/></td>}
    {columns.map(column=><td key={column.key}>{column.cell(row)}</td>)}
   </tr>):<tr><td colSpan={columns.length+(selectable?1:0)}
    className="fda-table__empty">{emptyMessage}</td></tr>}</tbody>
  </table>
 </div>;
}

export interface TreeViewItem{
 id:string;label:string;disabled?:boolean;children?:TreeViewItem[];
}
export interface TreeViewProps{
 items:TreeViewItem[];label:string;expandedIds:string[];
 onExpandedIdsChange:(ids:string[])=>void;selectedId?:string;
 onSelect?:(id:string)=>void;className?:string;
}
type VisibleNode={item:TreeViewItem;parentId?:string;depth:number};
export function TreeView({items,label,expandedIds,onExpandedIdsChange,selectedId,onSelect,className}:TreeViewProps){
 const expanded=new Set(expandedIds);
 const visible:VisibleNode[]=[];
 const walk=(nodes:TreeViewItem[],parentId?:string,depth=1)=>{
  for(const item of nodes){
   visible.push({item,parentId,depth});
   if(item.children?.length&&expanded.has(item.id))walk(item.children,item.id,depth+1);
  }
 };
 walk(items);
 const eligible=visible.filter(x=>!x.item.disabled);
 const [focusedId,setFocusedId]=React.useState<string|undefined>();
 const activeId=eligible.some(x=>x.item.id===focusedId)?focusedId:
  eligible.find(x=>x.item.id===selectedId)?.item.id||eligible[0]?.item.id;
 const refs=React.useRef<Record<string,HTMLLIElement|null>>({});
 const focus=(id:string)=>{setFocusedId(id);refs.current[id]?.focus();};
 const setExpanded=(id:string,open:boolean)=>{
  onExpandedIdsChange(open?[...new Set([...expandedIds,id])]:expandedIds.filter(x=>x!==id));
 };
 const onKey=(event:React.KeyboardEvent<HTMLLIElement>,item:TreeViewItem)=>{
  const idx=eligible.findIndex(x=>x.item.id===item.id);
  let dest:string|undefined;
  switch(event.key){
   case "ArrowDown":dest=eligible[Math.min(idx+1,eligible.length-1)]?.item.id;break;
   case "ArrowUp":dest=eligible[Math.max(0,idx-1)]?.item.id;break;
   case "Home":dest=eligible[0]?.item.id;break;
   case "End":dest=eligible[eligible.length-1]?.item.id;break;
   case "ArrowRight":
    if(item.children?.length&&!expanded.has(item.id))setExpanded(item.id,true);
    else if(item.children?.length)dest=eligible.find(x=>x.parentId===item.id)?.item.id;
    break;
   case "ArrowLeft":
    if(item.children?.length&&expanded.has(item.id))setExpanded(item.id,false);
    else dest=visible.find(x=>x.item.id===item.id)?.parentId;
    break;
   case "Enter":case " ":
    if(!item.disabled)onSelect?.(item.id);break;
   default:return;
  }
  event.preventDefault();event.stopPropagation();
  if(dest)focus(dest);
 };
 const render=(nodes:TreeViewItem[],depth=1):React.ReactNode=>
  nodes.map(item=>{
   const expandable=Boolean(item.children?.length),open=expanded.has(item.id);
   return <li key={item.id} ref={el=>{refs.current[item.id]=el;}}
    role="treeitem" aria-level={depth} aria-expanded={expandable?open:undefined}
    aria-selected={selectedId===item.id} aria-disabled={item.disabled||undefined}
    tabIndex={!item.disabled&&activeId===item.id?0:-1}
    className="fda-tree__item" data-selected={selectedId===item.id||undefined}
    onFocus={e=>{if(e.target===e.currentTarget&&!item.disabled)setFocusedId(item.id);}}
    onKeyDown={e=>onKey(e,item)}
    onClick={e=>{if((e.target as HTMLElement).closest('[role="treeitem"]')===e.currentTarget&&!item.disabled){focus(item.id);onSelect?.(item.id);}}}>
    <div className="fda-tree__row" style={{paddingInlineStart:8+(depth-1)*18}}>
     {expandable?<button type="button" tabIndex={-1}
      className="fda-tree__toggle" aria-label={(open?"折叠":"展开")+item.label}
      onClick={e=>{e.stopPropagation();setExpanded(item.id,!open);focus(item.id);}}>
       <span aria-hidden="true">{open?"▾":"▸"}</span>
      </button>:<span className="fda-tree__spacer" aria-hidden="true"/>}
     <span className="fda-tree__label">{item.label}</span>
    </div>
    {expandable&&open&&<ul role="group" className="fda-tree__group">{render(item.children||[],depth+1)}</ul>}
   </li>;
  });
 return <ul role="tree" aria-label={label} className={["fda-tree",className].filter(Boolean).join(" ")}>
  {render(items)}</ul>;
}

export interface ComboboxOption{value:string;label:string;disabled?:boolean;}
export interface ComboboxProps{
 label:string;options:ComboboxOption[];value:string;onValueChange:(value:string)=>void;
 placeholder?:string;emptyMessage?:string;hint?:string;disabled?:boolean;className?:string;
}
export function Combobox({label,options,value,onValueChange,placeholder="搜索并选择",
 emptyMessage="没有匹配的选项",hint,disabled=false,className}:ComboboxProps){
 const id=React.useId(),input=React.useRef<HTMLInputElement>(null);
 const [open,setOpen]=React.useState(false),[query,setQuery]=React.useState("");
 const [highlighted,setHighlighted]=React.useState(0);
 const selected=options.find(x=>x.value===value);
 const results=options.filter(x=>x.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 const allowed=results.map((x,i)=>!x.disabled?i:-1).filter(i=>i>=0);
 const active=allowed.includes(highlighted)?highlighted:allowed[0];
 const choose=(option:ComboboxOption)=>{
  if(option.disabled)return;
  onValueChange(option.value);setOpen(false);setQuery("");input.current?.focus();
 };
 const navigate=(direction:1|-1)=>{
  if(!allowed.length)return;
  const current=allowed.indexOf(active);
  const next=allowed[(current+direction+allowed.length)%allowed.length];
  setHighlighted(next);
 };
 const onKey=(e:React.KeyboardEvent<HTMLInputElement>)=>{
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){
   e.preventDefault();if(!open){setQuery("");setHighlighted(0);setOpen(true);}
   else navigate(e.key==="ArrowDown"?1:-1);
  }else if(e.key==="Enter"&&open){
   e.preventDefault();
   if(active!==undefined)choose(results[active]);
  }else if(e.key==="Escape"&&open){
   e.preventDefault();setOpen(false);setQuery("");
  }
 };
 return <div className={["fda-combobox",className].filter(Boolean).join(" ")}
  onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setOpen(false);}}>
  <label htmlFor={id+"-input"}>{label}</label>
  <input ref={input} id={id+"-input"} role="combobox" type="text" autoComplete="off"
   className="fda-input" disabled={disabled} placeholder={placeholder}
   value={open?query:selected?.label||""} aria-autocomplete="list"
   aria-expanded={open} aria-controls={open?id+"-list":undefined}
   aria-activedescendant={open&&active!==undefined?id+"-option-"+active:undefined}
   aria-describedby={hint?id+"-hint":undefined}
   onFocus={()=>{setQuery("");setHighlighted(0);setOpen(true);}}
   onClick={()=>{setQuery("");setHighlighted(0);setOpen(true);}}
   onChange={e=>{setQuery(e.target.value);setHighlighted(0);setOpen(true);}}
   onKeyDown={onKey}/>
  {hint&&<small className="fda-hint" id={id+"-hint"}>{hint}</small>}
  {open&&!disabled&&<ul role="listbox" id={id+"-list" } aria-label={label+"选项"}
   className="fda-combobox__list">
    {results.length?results.map((option,index)=><li key={option.value} role="option"
     id={id+"-option-"+index} aria-selected={value===option.value}
     aria-disabled={option.disabled||undefined}
     data-active={active===index||undefined}
     className="fda-combobox__option"
     onMouseDown={e=>e.preventDefault()}
     onClick={()=>choose(option)}>{option.label}</li>):
     <li role="presentation" className="fda-combobox__empty">{emptyMessage}</li>}
  </ul>}
 </div>;
}

export interface PopoverProps{
 label:string;trigger:string;open:boolean;onOpenChange:(open:boolean)=>void;
 children:React.ReactNode;align?:"start"|"end";disabled?:boolean;className?:string;
}
export function Popover({label,trigger,open,onOpenChange,children,align="start",
 disabled=false,className}:PopoverProps){
 const id=React.useId(),root=React.useRef<HTMLDivElement>(null),
  button=React.useRef<HTMLButtonElement>(null),panel=React.useRef<HTMLDivElement>(null);
 React.useEffect(()=>{
  if(!open)return;
  const first=panel.current?.querySelector<HTMLElement>(
   'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),[tabindex="0"]');
  (first||panel.current)?.focus();
  const outside=(e:PointerEvent)=>{
   if(!root.current?.contains(e.target as Node))onOpenChange(false);
  };
  document.addEventListener("pointerdown",outside);
  return ()=>document.removeEventListener("pointerdown",outside);
 },[open,onOpenChange]);
 return <div ref={root} className={["fda-popover",className].filter(Boolean).join(" ")}
  onKeyDown={e=>{if(open&&e.key==="Escape"){
   e.preventDefault();e.stopPropagation();onOpenChange(false);button.current?.focus();
  }}}>
  <button ref={button} type="button" className="fda-popover__trigger" disabled={disabled}
   aria-haspopup="dialog" aria-expanded={open} aria-controls={open?id:undefined}
   onClick={()=>onOpenChange(!open)}>{trigger}</button>
  {open&&<div ref={panel} id={id} role="dialog" aria-label={label} tabIndex={-1}
   className="fda-popover__panel" data-align={align}>{children}</div>}
 </div>;
}

export interface DualRangeFieldProps{
 label:string;min:number;max:number;step:number;minSpan?:number;
 value:readonly [number,number];onValueChange:(value:[number,number])=>void;
 unit?:string;disabled?:boolean;className?:string;
}
const fixPrecision=(n:number)=>Number(n.toFixed(9));
export function DualRangeField({label,min,max,step,minSpan=0,value,onValueChange,
 unit="",disabled=false,className}:DualRangeFieldProps){
 if(![min,max,step,minSpan,...value].every(Number.isFinite)||min>=max||step<=0||minSpan<0||
  minSpan>max-min||Math.abs((max-min)/step-Math.round((max-min)/step))>1e-7||
  Math.abs(minSpan/step-Math.round(minSpan/step))>1e-7)
  throw Error("Invalid DualRangeField bounds or step");
 const [lower,upper]=value;
 if(lower<min||upper>max||lower>upper||upper-lower+1e-8<minSpan)
  throw Error("Invalid DualRangeField selected range");
 const snap=(v:number)=>fixPrecision(Math.max(min,Math.min(max,min+Math.round((v-min)/step)*step)));
 const update=(side:"lower"|"upper",raw:number)=>{
  if(!Number.isFinite(raw))return;
  const n=snap(raw);
  if(side==="lower")onValueChange([fixPrecision(Math.min(n,upper-minSpan)),upper]);
  else onValueChange([lower,fixPrecision(Math.max(n,lower+minSpan))]);
 };
 const id=React.useId();
 return <fieldset className={["fda-dual-range",className].filter(Boolean).join(" ")}
  disabled={disabled}>
  <legend>{label}</legend>
  <div className="fda-dual-range__controls">
   <label htmlFor={id+"-lower"}>下限 ({unit||"数值"})
    <input id={id+"-lower"} type="number" min={min} max={upper-minSpan}
     step={step} value={lower} onChange={e=>update("lower",e.target.valueAsNumber)}/></label>
   <label htmlFor={id+"-upper"}>上限 ({unit||"数值"})
    <input id={id+"-upper"} type="number" min={lower+minSpan} max={max}
     step={step} value={upper} onChange={e=>update("upper",e.target.valueAsNumber)}/></label>
  </div>
  <div className="fda-dual-range__sliders">
   <label>下限滑块
    <input type="range" min={min} max={fixPrecision(upper-minSpan)} step={step}
     value={lower} onChange={e=>update("lower",e.target.valueAsNumber)}/></label>
   <label>上限滑块
    <input type="range" min={fixPrecision(lower+minSpan)} max={max} step={step}
     value={upper} onChange={e=>update("upper",e.target.valueAsNumber)}/></label>
  </div>
  <small className="fda-hint">步长 {step}{unit} · 最小间隔 {minSpan}{unit} · 两个数值与滑块保持同步</small>
 </fieldset>;
}
