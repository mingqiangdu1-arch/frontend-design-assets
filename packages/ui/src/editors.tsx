import * as React from "react";

// V0.24: original, controlled advanced editing reference components.
// Persisting data, permission checks, async validation and business rules belong to the host.

export interface EditableTableColumn<T>{
 key:string;header:string;getValue:(row:T)=>string;
 editable?:boolean;validate?:(next:string,row:T)=>string|undefined;
}
export interface EditableDataTableProps<T extends {id:string}>{
 label:string;rows:readonly T[];columns:readonly EditableTableColumn<T>[];
 onCellCommit:(rowId:string,columnKey:string,value:string)=>void;
 emptyMessage?:string;className?:string;
}
export function EditableDataTable<T extends {id:string}>({
 label,rows,columns,onCellCommit,emptyMessage="没有可编辑记录",className
}:EditableDataTableProps<T>){
 const [edit,setEdit]=React.useState<{rowId:string;key:string;value:string}|null>(null);
 const [error,setError]=React.useState("");
 const input=React.useRef<HTMLInputElement>(null);
 React.useEffect(()=>{if(edit)input.current?.focus();},[edit?.rowId,edit?.key]);
 const begin=(row:T,col:EditableTableColumn<T>)=>{
  setError("");setEdit({rowId:row.id,key:col.key,value:col.getValue(row)});
 };
 const cancel=()=>{setEdit(null);setError("");};
 const commit=(row:T,col:EditableTableColumn<T>)=>{
  if(!edit)return;
  const err=col.validate?.(edit.value,row);
  if(err){setError(err);return;}
  onCellCommit(row.id,col.key,edit.value);cancel();
 };
 return <div className={["fda-editable-table",className].filter(Boolean).join(" ")}>
  <table aria-label={label}>
   <thead><tr>{columns.map(col=><th key={col.key} scope="col">{col.header}</th>)}</tr></thead>
   <tbody>{rows.length?rows.map(row=><tr key={row.id}>{columns.map(col=>{
    const active=edit?.rowId===row.id&&edit.key===col.key;
    return <td key={col.key}>
     {active?<div className="fda-editable-table__editor">
      <input ref={input} value={edit.value} aria-label={"编辑"+col.header+" "+row.id}
       aria-invalid={Boolean(error)||undefined}
       onChange={e=>{setEdit({...edit,value:e.target.value});setError("");}}
       onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();commit(row,col);}
        else if(e.key==="Escape"){e.preventDefault();cancel();}}}/>
      <button type="button" onClick={()=>commit(row,col)}>保存</button>
      <button type="button" onClick={cancel}>取消</button>
      {error&&<small role="alert">{error}</small>}
     </div>:
      <div className="fda-editable-table__value">
       <span>{col.getValue(row)||"—"}</span>
       {col.editable&&<button type="button" aria-label={"编辑"+col.header+" "+row.id}
         onClick={()=>begin(row,col)}>编辑</button>}
      </div>}
    </td>;
   })}</tr>):<tr><td colSpan={Math.max(1,columns.length)}
    className="fda-editable-table__empty">{emptyMessage}</td></tr>}</tbody>
  </table>
 </div>;
}

export interface SortableListItem {id:string;label:string;disabled?:boolean;description?:string;}
export interface SortableListProps {
 label:string;items:readonly SortableListItem[];
 onReorder:(orderedIds:string[])=>void;className?:string;
}
export function SortableList({label,items,onReorder,className}:SortableListProps){
 const [dragged,setDragged]=React.useState<string|null>(null);
 if(new Set(items.map(i=>i.id)).size!==items.length||items.some(i=>!i.id.trim()))
  throw Error("SortableList requires nonempty unique IDs");
 const reorder=(from:number,to:number)=>{
  if(from===to||from<0||to<0||from>=items.length||to>=items.length||
   items[from].disabled||items[to].disabled)return;
  const next=items.map(item=>item.id);
  next.splice(to,0,next.splice(from,1)[0]);
  onReorder(next);
 };
 const move=(id:string,target:string)=>{
  reorder(items.findIndex(i=>i.id===id),items.findIndex(i=>i.id===target));
 };
 return <section className={["fda-sortable",className].filter(Boolean).join(" ")}
  aria-label={label}>
  <ol>{items.map((item,i)=><li key={item.id} className="fda-sortable__item"
   data-disabled={item.disabled||undefined} data-dragged={dragged===item.id||undefined}
   draggable={!item.disabled}
   onDragStart={e=>{if(item.disabled)return;setDragged(item.id);
    e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",item.id);}}
   onDragEnd={()=>setDragged(null)}
   onDragOver={e=>{if(dragged&&!item.disabled){e.preventDefault();e.dataTransfer.dropEffect="move";}}}
   onDrop={e=>{e.preventDefault();move(e.dataTransfer.getData("text/plain"),item.id);setDragged(null);}}>
   <span className="fda-sortable__grip" aria-hidden="true">⋮⋮</span>
   <div className="fda-sortable__content"><strong>{item.label}</strong>
    {item.description&&<small>{item.description}</small>}</div>
   <div className="fda-sortable__actions">
    <button type="button" aria-label={"上移"+item.label}
     disabled={item.disabled||i===0||items[i-1]?.disabled} onClick={()=>reorder(i,i-1)}>↑</button>
    <button type="button" aria-label={"下移"+item.label}
     disabled={item.disabled||i===items.length-1||items[i+1]?.disabled}
     onClick={()=>reorder(i,i+1)}>↓</button>
   </div>
  </li>)}</ol>
  {!items.length&&<p className="fda-sortable__empty">暂无可排序项目</p>}
 </section>;
}

export interface FlowNode {id:string;label:string;x:number;y:number;disabled?:boolean;}
export interface FlowEdge {id:string;from:string;to:string;}
export interface FlowEditorProps {
 label:string;nodes:readonly FlowNode[];edges:readonly FlowEdge[];
 selectedId?:string;onSelect:(id:string)=>void;
 onNodesChange:(nodes:FlowNode[])=>void;
 onAddEdge:(from:string,to:string)=>void;className?:string;
}
const clampFlow=(n:number)=>Math.round(Math.max(10,Math.min(90,n)));
export function FlowEditor({label,nodes,edges,selectedId,onSelect,
 onNodesChange,onAddEdge,className}:FlowEditorProps){
 const nodeMap=new Map(nodes.map(n=>[n.id,n])),drag=React.useRef<string|null>(null);
 const root=React.useRef<HTMLDivElement>(null);
 const [from,setFrom]=React.useState(nodes[0]?.id||"");
 const [to,setTo]=React.useState(nodes[1]?.id||nodes[0]?.id||"");
 if(nodeMap.size!==nodes.length||nodes.some(n=>!n.id.trim()||!n.label.trim()||
  !Number.isFinite(n.x)||!Number.isFinite(n.y)||n.x<10||n.x>90||n.y<10||n.y>90)||
  new Set(edges.map(e=>e.id)).size!==edges.length||
  edges.some(e=>!nodeMap.has(e.from)||!nodeMap.has(e.to)||e.from===e.to))
  throw Error("FlowEditor requires unique valid nodes, bounds and edge endpoints");
 const update=(node:FlowNode,x:number,y:number)=>{
  if(node.disabled)return;
  onNodesChange(nodes.map(n=>n.id===node.id?{...n,x:clampFlow(x),y:clampFlow(y)}:n));
 };
 const point=(e:React.PointerEvent<HTMLButtonElement>,node:FlowNode)=>{
  const rect=root.current?.getBoundingClientRect();
  if(!rect||!rect.width||!rect.height)return;
  update(node,(e.clientX-rect.left)/rect.width*100,(e.clientY-rect.top)/rect.height*100);
 };
 const add=()=>{
  if(from&&to&&from!==to&&nodeMap.has(from)&&nodeMap.has(to)&&
   !edges.some(e=>e.from===from&&e.to===to))onAddEdge(from,to);
 };
 return <section aria-label={label}
  className={["fda-flow",className].filter(Boolean).join(" ")}>
  <div className="fda-flow__canvas" ref={root}>
   <svg aria-hidden="true" viewBox="0 0 1000 600" preserveAspectRatio="none"
    className="fda-flow__edges">
    {edges.map(e=>{
     const a=nodeMap.get(e.from)!,b=nodeMap.get(e.to)!;
     return <line key={e.id} x1={a.x*10} y1={a.y*6} x2={b.x*10} y2={b.y*6}
      stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke"/>;
    })}
   </svg>
   {nodes.map(node=><button key={node.id} type="button"
    className="fda-flow__node" style={{left:node.x+"%",top:node.y+"%"}}
    aria-label={"节点 "+node.label} aria-pressed={selectedId===node.id}
    disabled={node.disabled}
    onClick={()=>onSelect(node.id)}
    onKeyDown={e=>{
     const delta=e.shiftKey?10:5;let x=node.x,y=node.y;
     if(e.key==="ArrowRight")x+=delta;
     else if(e.key==="ArrowLeft")x-=delta;
     else if(e.key==="ArrowDown")y+=delta;
     else if(e.key==="ArrowUp")y-=delta;
     else return;
     e.preventDefault();update(node,x,y);
    }}
    onPointerDown={e=>{if(e.button!==0||node.disabled)return;
     drag.current=node.id;e.currentTarget.setPointerCapture(e.pointerId);}}
    onPointerMove={e=>{if(drag.current===node.id)point(e,node);}}
    onPointerUp={e=>{if(drag.current===node.id){drag.current=null;
     if(e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);}}}
    onPointerCancel={()=>{drag.current=null;}}>
    {node.label}
   </button>)}
  </div>
  <div className="fda-flow__link-controls">
   <label>起点<select value={nodeMap.has(from)?from:""} onChange={e=>setFrom(e.target.value)}>
    {nodes.map(n=><option key={n.id} value={n.id}>{n.label}</option>)}
   </select></label>
   <label>终点<select value={nodeMap.has(to)?to:""} onChange={e=>setTo(e.target.value)}>
    {nodes.map(n=><option key={n.id} value={n.id}>{n.label}</option>)}
   </select></label>
   <button type="button" onClick={add} disabled={!nodeMap.has(from)||!nodeMap.has(to)||
    from===to||edges.some(e=>e.from===from&&e.to===to)}>添加连接</button>
  </div>
  <p className="fda-flow__hint">节点支持拖动及方向键移动（Shift 加速）；连线为宿主管理的有向关系，不执行流程。</p>
 </section>;
}

export type FilterRange={min:number|null;max:number|null};
export type AdvancedFilterValue=string|boolean|readonly string[]|FilterRange|undefined;
export interface AdvancedFilterOption {value:string;label:string;}
export interface AdvancedFilterField {
 id:string;label:string;kind:"text"|"select"|"multi"|"toggle"|"range";
 options?:readonly AdvancedFilterOption[];min?:number;max?:number;
}
export interface AdvancedFilterPanelProps {
 label:string;fields:readonly AdvancedFilterField[];
 values:Readonly<Record<string,AdvancedFilterValue>>;
 onChange:(fieldId:string,value:AdvancedFilterValue)=>void;
 onApply:()=>void;onReset:()=>void;disabled?:boolean;className?:string;
}
function isRange(v:AdvancedFilterValue):v is FilterRange{
 return Boolean(v&&typeof v==="object"&&!Array.isArray(v)&&"min" in v&&"max" in v);
}
export function AdvancedFilterPanel({label,fields,values,onChange,onApply,onReset,
 disabled=false,className}:AdvancedFilterPanelProps){
 const id=React.useId();
 if(new Set(fields.map(f=>f.id)).size!==fields.length||fields.some(f=>!f.id.trim()||!f.label.trim()||
  (f.kind==="range"&&f.min!==undefined&&f.max!==undefined&&f.min>f.max)))
  throw Error("AdvancedFilterPanel requires unique valid fields");
 const active=fields.filter(f=>{
  const v=values[f.id];
  if(typeof v==="boolean")return v;
  if(typeof v==="string")return v.trim().length>0;
  if(Array.isArray(v))return v.length>0;
  if(isRange(v))return v.min!==null||v.max!==null;
  return false;
 }).length;
 const invalid=fields.some(f=>{
  if(f.kind!=="range"||!isRange(values[f.id]))return false;
  const {min,max}=values[f.id] as FilterRange;
  return min!==null&&max!==null&&min>max||
   min!==null&&f.min!==undefined&&min<f.min||max!==null&&f.max!==undefined&&max>f.max;
 });
 return <section aria-label={label} className={["fda-advanced-filter",className].filter(Boolean).join(" ")}>
  <header><strong>{label}</strong><span>{active} 个筛选条件</span></header>
  <div className="fda-advanced-filter__fields">
   {fields.map((field,i)=>{
    const value=values[field.id],name=id+"-"+i;
    if(field.kind==="text")return <label key={field.id} htmlFor={name}>{field.label}
     <input id={name} type="search" disabled={disabled}
      value={typeof value==="string"?value:""}
      onChange={e=>onChange(field.id,e.target.value)}/></label>;
    if(field.kind==="select")return <label key={field.id} htmlFor={name}>{field.label}
     <select id={name} disabled={disabled} value={typeof value==="string"?value:""}
      onChange={e=>onChange(field.id,e.target.value)}>
      <option value="">全部</option>
      {field.options?.filter(o=>o.value!=="").map(o=><option key={o.value}
       value={o.value}>{o.label}</option>)}
     </select></label>;
    if(field.kind==="toggle")return <label key={field.id} className="fda-advanced-filter__toggle">
     <input type="checkbox" disabled={disabled} checked={value===true}
      onChange={e=>onChange(field.id,e.target.checked)}/>{field.label}</label>;
    if(field.kind==="multi"){
     const chosen=Array.isArray(value)?value:[];
     return <fieldset key={field.id}><legend>{field.label}</legend>
      {field.options?.map(o=><label key={o.value} className="fda-advanced-filter__toggle">
       <input type="checkbox" checked={chosen.includes(o.value)} disabled={disabled}
        onChange={e=>onChange(field.id,e.target.checked?
         [...chosen,o.value]:chosen.filter(x=>x!==o.value))}/>{o.label}</label>)}
     </fieldset>;
    }
    const range=isRange(value)?value:{min:null,max:null};
    return <fieldset key={field.id}><legend>{field.label}</legend>
     <div className="fda-advanced-filter__range">
      <label>最小值<input type="number" min={field.min} max={field.max}
       disabled={disabled} value={range.min??""}
       onChange={e=>onChange(field.id,{...range,min:e.target.value===""?null:e.target.valueAsNumber})}/></label>
      <label>最大值<input type="number" min={field.min} max={field.max}
       disabled={disabled} value={range.max??""}
       onChange={e=>onChange(field.id,{...range,max:e.target.value===""?null:e.target.valueAsNumber})}/></label>
     </div>
     {range.min!==null&&range.max!==null&&range.min>range.max&&
      <small role="alert">最小值不能超过最大值</small>}
    </fieldset>;
   })}
  </div>
  <footer><button type="button" onClick={onReset} disabled={disabled||active===0}>清除条件</button>
   <button type="button" onClick={onApply} disabled={disabled||invalid}>应用筛选</button></footer>
 </section>;
}
