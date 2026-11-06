import * as React from "react";
import {DataTable,type DataTableColumn,type DataTableSort} from "./advanced";

// Original, controlled reference components. No API fetch, persistent board,
// dynamic chart data source, server authorization or production a11y certification.

export interface DataFilterOption {value:string;label:string;}
export interface FilterableDataTableProps<T extends {id:string}> {
 label:string;rows:readonly T[];columns:DataTableColumn<T>[];
 query:string;onQueryChange:(query:string)=>void;
 getSearchText:(row:T)=>string;
 category?:string;onCategoryChange?:(category:string)=>void;
 categories?:DataFilterOption[];getCategory?:(row:T)=>string;
 sort?:DataTableSort;onSortChange?:(sort:NonNullable<DataTableSort>)=>void;
 sortComparators?:Record<string,(a:T,b:T)=>number>;
 selectedIds?:string[];onSelectedIdsChange?:(ids:string[])=>void;
 emptyMessage?:string;className?:string;
}
export function FilterableDataTable<T extends {id:string}>({
 label,rows,columns,query,onQueryChange,getSearchText,
 category="all",onCategoryChange,categories=[],getCategory,
 sort=null,onSortChange,sortComparators,
 selectedIds,onSelectedIdsChange,emptyMessage="没有匹配记录",className
}:FilterableDataTableProps<T>){
 const id=React.useId();
 const clean=query.trim().toLocaleLowerCase();
 const visible=rows.filter(row=>
  (!clean||getSearchText(row).toLocaleLowerCase().includes(clean))&&
  (category==="all"||!getCategory||getCategory(row)===category));
 const compare=sort&&sortComparators?.[sort.key];
 const sorted=compare?[...visible].sort((a,b)=>{
  const value=compare(a,b);
  return sort?.direction==="desc"?-value:value;
 }):visible;
 const canCategory=Boolean(getCategory&&onCategoryChange&&categories.length);
 const reset=()=>{onQueryChange("");if(canCategory)onCategoryChange?.("all");};
 return <section aria-label={label}
  className={["fda-filter-table",className].filter(Boolean).join(" ")}>
  <div className="fda-filter-table__toolbar">
   <label htmlFor={id+"-query"}>搜索记录
    <input id={id+"-query"} type="search" value={query}
     placeholder="输入关键词过滤当前数据"
     onChange={e=>onQueryChange(e.target.value)}/>
   </label>
   {canCategory&&<label htmlFor={id+"-category"}>分类
    <select id={id+"-category"} value={category}
     onChange={e=>onCategoryChange?.(e.target.value)}>
     <option value="all">全部</option>
     {categories.filter(option=>option.value!=="all").map(option=>
      <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
   </label>}
   <button type="button" onClick={reset}
    disabled={!query&&(!canCategory||category==="all")}>重置</button>
  </div>
  <p role="status" className="fda-filter-table__count">
   显示 {sorted.length} / {rows.length} 条记录
  </p>
  <DataTable label={label+"结果"} rows={sorted} columns={columns}
   sort={sort} onSortChange={onSortChange}
   selectedIds={selectedIds} onSelectedIdsChange={onSelectedIdsChange}
   emptyMessage={emptyMessage}/>
 </section>;
}

export interface KanbanColumn {id:string;title:string;description?:string;}
export interface KanbanCard {
 id:string;title:string;columnId:string;description?:string;disabled?:boolean;
}
export interface KanbanBoardProps {
 label:string;columns:readonly KanbanColumn[];cards:readonly KanbanCard[];
 onMove:(cardId:string,columnId:string)=>void;className?:string;
}
export function KanbanBoard({label,columns,cards,onMove,className}:KanbanBoardProps){
 const colIds=new Set(columns.map(c=>c.id)),cardIds=new Set(cards.map(c=>c.id));
 if(!columns.length||colIds.size!==columns.length||cardIds.size!==cards.length||
  columns.some(c=>!c.id.trim()||!c.title.trim())||
  cards.some(c=>!c.id.trim()||!c.title.trim()||!colIds.has(c.columnId)))
  throw Error("KanbanBoard requires unique column/card IDs and valid column references");
 const [draggedId,setDraggedId]=React.useState<string|null>(null);
 const move=(cardId:string,columnId:string)=>{
  const card=cards.find(c=>c.id===cardId);
  if(card&&!card.disabled&&colIds.has(columnId)&&card.columnId!==columnId)
   onMove(cardId,columnId);
 };
 const drop=(e:React.DragEvent<HTMLElement>,columnId:string)=>{
  e.preventDefault();const cardId=e.dataTransfer.getData("text/plain");
  move(cardId,columnId);setDraggedId(null);
 };
 return <section aria-label={label}
  className={["fda-kanban",className].filter(Boolean).join(" ")}>
  {columns.map(column=>{
   const inColumn=cards.filter(card=>card.columnId===column.id);
   return <section key={column.id} aria-label={column.title}
    className="fda-kanban__column" data-drop-active={draggedId||undefined}
    onDragOver={e=>{if(draggedId){e.preventDefault();e.dataTransfer.dropEffect="move";}}}
    onDrop={e=>drop(e,column.id)}>
    <header><h3>{column.title}<span>{inColumn.length}</span></h3>
     {column.description&&<p>{column.description}</p>}</header>
    <ol>{inColumn.map(card=><li key={card.id}
     className="fda-kanban__card" data-disabled={card.disabled||undefined}
     draggable={!card.disabled}
     onDragStart={e=>{if(card.disabled)return;e.dataTransfer.effectAllowed="move";
      e.dataTransfer.setData("text/plain",card.id);setDraggedId(card.id);}}
     onDragEnd={()=>setDraggedId(null)}>
     <strong>{card.title}</strong>
     {card.description&&<p>{card.description}</p>}
     <label>移动卡片 {card.title}
      <select value={card.columnId} disabled={card.disabled}
       onChange={e=>move(card.id,e.target.value)}>
       {columns.map(option=><option value={option.id} key={option.id}>{option.title}</option>)}
      </select>
     </label>
    </li>)}</ol>
    {inColumn.length===0&&<p className="fda-kanban__empty">暂无卡片</p>}
   </section>;
  })}
 </section>;
}

export type TimelineStatus="complete"|"current"|"upcoming";
export interface ActivityTimelineEvent {
 id:string;date:string;title:string;description?:string;
 status?:TimelineStatus;dateTime?:string;
}
export interface ActivityTimelineProps {
 label:string;events:readonly ActivityTimelineEvent[];
 selectedId?:string;onSelect?:(id:string)=>void;className?:string;
}
export function ActivityTimeline({label,events,selectedId,onSelect,className}:ActivityTimelineProps){
 if(new Set(events.map(e=>e.id)).size!==events.length||
  events.some(e=>!e.id.trim()||!e.title.trim()||!e.date.trim()))
  throw Error("ActivityTimeline requires nonempty unique events");
 return <section aria-label={label}
  className={["fda-timeline",className].filter(Boolean).join(" ")}>
  <ol>{events.map(event=><li key={event.id}
   className="fda-timeline__event" data-status={event.status||"complete"}>
   <span className="fda-timeline__marker" aria-hidden="true"/>
   <div className="fda-timeline__body">
    <time dateTime={event.dateTime}>{event.date}</time>
    {onSelect?<button type="button" aria-pressed={event.id===selectedId}
     onClick={()=>onSelect(event.id)}>{event.title}</button>:
     <strong>{event.title}</strong>}
    {event.description&&<p>{event.description}</p>}
   </div>
  </li>)}</ol>
  {events.length===0&&<p className="fda-timeline__empty">暂无活动记录</p>}
 </section>;
}

export interface BarChartDatum {id:string;label:string;value:number;}
export interface InteractiveBarChartProps {
 label:string;data:readonly BarChartDatum[];selectedId?:string;
 onSelect:(id:string)=>void;unit?:string;className?:string;
}
export function InteractiveBarChart({label,data,selectedId,onSelect,
 unit="",className}:InteractiveBarChartProps){
 if(!data.length||new Set(data.map(d=>d.id)).size!==data.length||
  data.some(d=>!d.id.trim()||!d.label.trim()||!Number.isFinite(d.value)||d.value<0))
  throw Error("InteractiveBarChart requires unique IDs and finite nonnegative values");
 const actualMax=Math.max(...data.map(d=>d.value));
 const scaleMax=actualMax>0?actualMax:1;
 const refs=React.useRef<Record<string,HTMLButtonElement|null>>({});
 const onKey=(event:React.KeyboardEvent<HTMLButtonElement>,index:number)=>{
  let next:number|undefined;
  if(event.key==="ArrowRight"||event.key==="ArrowDown")next=(index+1)%data.length;
  else if(event.key==="ArrowLeft"||event.key==="ArrowUp")next=(index+data.length-1)%data.length;
  else if(event.key==="Home")next=0;
  else if(event.key==="End")next=data.length-1;
  if(next!==undefined){event.preventDefault();refs.current[data[next].id]?.focus();}
 };
 return <section className={["fda-bars",className].filter(Boolean).join(" ")}
  aria-label={label}>
  <div className="fda-bars__plot" role="group" aria-label={label+"数据列"}>
   {data.map((item,index)=><button key={item.id} ref={node=>{refs.current[item.id]=node;}}
    type="button" className="fda-bars__item" aria-pressed={selectedId===item.id}
    aria-label={item.label+"："+item.value+unit}
    onClick={()=>onSelect(item.id)} onKeyDown={e=>onKey(e,index)}>
    <span className="fda-bars__value" aria-hidden="true">{item.value}{unit}</span>
    <span className="fda-bars__track" aria-hidden="true">
     <span className="fda-bars__fill" style={{height:(item.value===0?0:item.value/scaleMax*100)+"%"}}/>
    </span>
    <span className="fda-bars__label" aria-hidden="true">{item.label}</span>
   </button>)}
  </div>
  <p className="fda-bars__summary">共 {data.length} 项；最高值 {actualMax}{unit}</p>
 </section>;
}
