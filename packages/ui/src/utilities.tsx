import * as React from "react";

// V0.20 original reference controls. These own no remote data or upload transport.
// Consumers own command effects, date validation, persisted layout, file uploads.

export interface CommandItem {
 id:string;label:string;description?:string;keywords?:string[];disabled?:boolean;
}
export interface CommandGroup {
 id:string;heading:string;items:CommandItem[];
}
export interface CommandMenuProps {
 label:string;triggerLabel:string;open:boolean;onOpenChange:(open:boolean)=>void;
 groups:CommandGroup[];onSelect:(id:string)=>void;emptyMessage?:string;className?:string;
}
export function CommandMenu({label,triggerLabel,open,onOpenChange,groups,onSelect,
 emptyMessage="没有匹配的命令",className}:CommandMenuProps){
 const id=React.useId();
 const dialog=React.useRef<HTMLDialogElement>(null);
 const input=React.useRef<HTMLInputElement>(null);
 const trigger=React.useRef<HTMLButtonElement>(null);
 const [query,setQuery]=React.useState("");
 const [highlighted,setHighlighted]=React.useState(0);
 const normalized=query.trim().toLocaleLowerCase();
 const filtered=groups.map(group=>({...group,items:group.items.filter(item=>
  [item.label,item.description||"",...(item.keywords||[])].join(" ")
    .toLocaleLowerCase().includes(normalized)
 )})).filter(group=>group.items.length>0);
 const flattened=filtered.flatMap(group=>group.items);
 const enabled=flattened.map((item,index)=>item.disabled?-1:index).filter(i=>i>=0);
 const active=enabled.includes(highlighted)?highlighted:enabled[0];
 React.useEffect(()=>{
  const el=dialog.current;
  if(!el)return;
  if(open&&!el.open){el.showModal();input.current?.focus();}
  else if(!open&&el.open){el.close();trigger.current?.focus();}
 },[open]);
 const close=()=>{onOpenChange(false);setQuery("");setHighlighted(0);};
 const select=(item:CommandItem)=>{
  if(item.disabled)return;
  onSelect(item.id);close();
 };
 const move=(direction:1|-1)=>{
  if(!enabled.length)return;
  const current=enabled.indexOf(active);
  setHighlighted(enabled[(current+direction+enabled.length)%enabled.length]);
 };
 const onKey=(event:React.KeyboardEvent<HTMLInputElement>)=>{
  if(event.key==="ArrowDown"||event.key==="ArrowUp"){
   event.preventDefault();move(event.key==="ArrowDown"?1:-1);
  }else if(event.key==="Enter"){
   event.preventDefault();if(active!==undefined)select(flattened[active]);
  }else if(event.key==="Escape"){
   event.preventDefault();close();
  }
 };
 let cursor=-1;
 return <>
  <button ref={trigger} type="button" className={["fda-command__trigger",className].filter(Boolean).join(" ")}
   aria-haspopup="dialog" aria-expanded={open}
   onClick={()=>onOpenChange(true)}>{triggerLabel}<span aria-hidden="true">⌕</span></button>
  <dialog ref={dialog} aria-label={label} className="fda-command__dialog"
   onCancel={e=>{e.preventDefault();close();}}
   onClick={e=>{if(e.target===e.currentTarget)close();}}>
   <div className="fda-command__surface">
    <input ref={input} type="search" role="combobox" autoComplete="off"
     aria-label={"搜索"+label} aria-expanded={open} aria-controls={id+"-results"}
     aria-activedescendant={active===undefined?undefined:id+"-item-"+active}
     aria-autocomplete="list" value={query} placeholder="输入命令或关键词"
     onChange={e=>{setQuery(e.target.value);setHighlighted(0);}}
     onKeyDown={onKey}/>
    <div id={id+"-results"} className="fda-command__results" role="listbox" aria-label={label+"命令列表"}>
     {!flattened.length?<p role="status" className="fda-command__empty">{emptyMessage}</p>:
      filtered.map(group=><div role="group" aria-label={group.heading} key={group.id}>
       <h3>{group.heading}</h3>
       {group.items.map(item=>{
        const index=++cursor;
        return <div key={item.id} id={id+"-item-"+index} role="option"
         aria-disabled={item.disabled||undefined} aria-selected={active===index}
         data-highlighted={active===index||undefined}
         className="fda-command__item"
         onMouseDown={e=>e.preventDefault()}
         onClick={()=>select(item)}>
         <span>{item.label}{item.description&&<small>{item.description}</small>}</span>
         </div>;
       })}
      </div>)}
    </div>
    <div className="fda-command__footer">↑↓ 选择 · Enter 执行 · Esc 关闭</div>
   </div>
  </dialog>
 </>;
}

export interface DatePickerProps {
 label:string;value:string;onValueChange:(value:string)=>void;
 min?:string;max?:string;hint?:string;error?:string;disabled?:boolean;required?:boolean;
 clearable?:boolean;className?:string;
}
function validIsoDate(value:string):boolean{
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const [y,m,d]=value.split("-").map(Number);
 const test=new Date(Date.UTC(y,m-1,d));
 // UTC years 0..99 are remapped by Date.UTC; ordinary 100..9999 are supported here.
 return y>=100&&test.getUTCFullYear()===y&&test.getUTCMonth()===m-1&&test.getUTCDate()===d;
}
export function DatePicker({label,value,onValueChange,min,max,hint,error,disabled=false,
 required=false,clearable=false,className}:DatePickerProps){
 const id=React.useId();
 if(value&&!validIsoDate(value))throw Error("DatePicker value must be a valid YYYY-MM-DD date");
 if(min&&!validIsoDate(min))throw Error("DatePicker min must be a valid YYYY-MM-DD date");
 if(max&&!validIsoDate(max))throw Error("DatePicker max must be a valid YYYY-MM-DD date");
 if(min&&max&&min>max)throw Error("DatePicker min must not exceed max");
 const apply=(next:string)=>{
  if(next&&(!validIsoDate(next)||min&&next<min||max&&next>max))return;
  onValueChange(next);
 };
 return <div className={["fda-date",className].filter(Boolean).join(" ")}>
  <label htmlFor={id+"-date"}>{label}{required&&" *"}</label>
  <div className="fda-date__row">
   <input id={id+"-date"} type="date" className="fda-date__input" value={value}
    min={min} max={max} disabled={disabled} required={required}
    aria-invalid={Boolean(error)||undefined}
    aria-describedby={hint||error?id+"-help":undefined}
    onChange={e=>apply(e.target.value)}/>
   {clearable&&value&&<button type="button" disabled={disabled} onClick={()=>apply("")}
     aria-label={"清除"+label}>清除</button>}
  </div>
  {(hint||error)&&<small id={id+"-help"} className={error?"fda-error":"fda-hint"}>{error||hint}</small>}
 </div>;
}

export type ResizeOrientation="horizontal"|"vertical";
export interface ResizablePanelsProps {
 label:string;start:React.ReactNode;end:React.ReactNode;size:number;
 onSizeChange:(size:number)=>void;orientation?:ResizeOrientation;
 minSize?:number;maxSize?:number;disabled?:boolean;className?:string;
}
export function ResizablePanels({label,start,end,size,onSizeChange,
 orientation="horizontal",minSize=20,maxSize=80,disabled=false,className}:ResizablePanelsProps){
 if(![size,minSize,maxSize].every(Number.isFinite)||minSize<0||maxSize>100||
  minSize>=maxSize||size<minSize||size>maxSize||!["horizontal","vertical"].includes(orientation))
  throw Error("Invalid ResizablePanels bounds, size or orientation");
 const root=React.useRef<HTMLDivElement>(null);
 const dragging=React.useRef(false);
 const clamp=(value:number)=>Math.max(minSize,Math.min(maxSize,Math.round(value*10)/10));
 const update=(value:number)=>onSizeChange(clamp(value));
 const onPointerMove=(event:React.PointerEvent<HTMLDivElement>)=>{
  if(!dragging.current||disabled)return;
  const rect=root.current?.getBoundingClientRect();
  if(!rect)return;
  const distance=orientation==="horizontal"?event.clientX-rect.left:event.clientY-rect.top;
  const length=orientation==="horizontal"?rect.width:rect.height;
  if(length>0)update(distance/length*100);
 };
 const finish=(e:React.PointerEvent<HTMLDivElement>)=>{
  dragging.current=false;
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
 };
 const onKey=(e:React.KeyboardEvent<HTMLDivElement>)=>{
  if(disabled)return;
  const step=e.shiftKey?10:1;
  const back=orientation==="horizontal"?"ArrowLeft":"ArrowUp";
  const forward=orientation==="horizontal"?"ArrowRight":"ArrowDown";
  if(e.key===back){e.preventDefault();update(size-step);}
  else if(e.key===forward){e.preventDefault();update(size+step);}
  else if(e.key==="Home"){e.preventDefault();update(minSize);}
  else if(e.key==="End"){e.preventDefault();update(maxSize);}
 };
 return <div ref={root} className={["fda-resize",className].filter(Boolean).join(" ")}
  data-orientation={orientation} style={{"--fda-resize-size":size+"%"} as React.CSSProperties}>
  <div className="fda-resize__pane fda-resize__pane--start">{start}</div>
  <div className="fda-resize__handle" role="separator" tabIndex={disabled?-1:0}
   aria-label={label} aria-orientation={orientation==="horizontal"?"vertical":"horizontal"}
   aria-valuemin={minSize} aria-valuemax={maxSize} aria-valuenow={size}
   aria-disabled={disabled||undefined}
   onPointerDown={e=>{if(disabled||e.button!==0)return;dragging.current=true;
    e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault();}}
   onPointerMove={onPointerMove} onPointerUp={finish} onPointerCancel={finish}
   onKeyDown={onKey}>
   <span aria-hidden="true" className="fda-resize__grip">⋮</span>
  </div>
  <div className="fda-resize__pane fda-resize__pane--end">{end}</div>
 </div>;
}

export type FileRejectionReason="type"|"size"|"count"|"duplicate";
export interface FileRejection {name:string;reason:FileRejectionReason;}
export interface FileUploadProps {
 label:string;files:readonly File[];onFilesChange:(files:File[])=>void;
 accept?:string;multiple?:boolean;maxFiles?:number;maxSizeBytes?:number;
 onRejected?:(rejected:FileRejection[])=>void;
 disabled?:boolean;hint?:string;className?:string;
}
function allowedFile(file:File,accept:string):boolean{
 const types=accept.split(",").map(x=>x.trim().toLocaleLowerCase()).filter(Boolean);
 if(!types.length)return true;
 return types.some(type=>{
  if(type.startsWith("."))return file.name.toLocaleLowerCase().endsWith(type);
  const mime=file.type.toLocaleLowerCase();
  if(type.endsWith("/*"))return mime.startsWith(type.slice(0,-1));
  return mime===type;
 });
}
const fileKey=(f:File)=>[f.name,f.size,f.lastModified,f.type].join(":");
export function FileUpload({label,files,onFilesChange,accept="",multiple=true,
 maxFiles=10,maxSizeBytes=10*1024*1024,onRejected,disabled=false,hint,className}:FileUploadProps){
 if(!Number.isInteger(maxFiles)||maxFiles<1||!Number.isFinite(maxSizeBytes)||maxSizeBytes<=0)
  throw Error("Invalid FileUpload limits");
 const id=React.useId();
 const [dragOver,setDragOver]=React.useState(false);
 const [rejects,setRejects]=React.useState<FileRejection[]>([]);
 const add=(candidates:File[])=>{
  if(disabled)return;
  const next=[...files],keys=new Set(files.map(fileKey)),bad:FileRejection[]=[];
  for(const file of candidates){
   let reason:FileRejectionReason|undefined;
   if(keys.has(fileKey(file)))reason="duplicate";
   else if(!allowedFile(file,accept))reason="type";
   else if(file.size>maxSizeBytes)reason="size";
   else if(next.length>=maxFiles||!multiple&&next.length>=1)reason="count";
   if(reason)bad.push({name:file.name,reason});
   else{next.push(file);keys.add(fileKey(file));}
  }
  setRejects(bad);if(bad.length)onRejected?.(bad);
  if(next.length!==files.length)onFilesChange(next);
 };
 const message=(r:FileRejection)=>
  r.name+"："+({type:"文件类型不允许",size:"文件过大",count:"超过数量限制",duplicate:"已存在该文件"}[r.reason]);
 const remove=(target:number)=>{
  const next=files.filter((_,index)=>index!==target);
  onFilesChange([...next]);setRejects([]);
 };
 return <div className={["fda-upload",className].filter(Boolean).join(" ")}>
  <label htmlFor={id+"-input"}>{label}</label>
  <div className="fda-upload__drop" data-drag-over={dragOver||undefined}
   onDragOver={e=>{e.preventDefault();if(!disabled)setDragOver(true);}}
   onDragLeave={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setDragOver(false);}}
   onDrop={e=>{e.preventDefault();setDragOver(false);add(Array.from(e.dataTransfer.files));}}>
   <span>选择文件或拖放到这里（本地预览，不会上传）</span>
   <input id={id+"-input"} type="file" disabled={disabled} accept={accept||undefined}
    multiple={multiple} aria-describedby={hint?id+"-hint":undefined}
    onChange={e=>{add(Array.from(e.currentTarget.files||[]));e.currentTarget.value="";}}/>
  </div>
  {hint&&<small id={id+"-hint"} className="fda-hint">{hint}</small>}
  <ul className="fda-upload__list" aria-label={label+"已选文件"}>
   {files.map((file,index)=><li key={fileKey(file)+"-"+index}>
    <span>{file.name} <small>({Math.round(file.size/1024)} KB)</small></span>
    <button type="button" disabled={disabled} aria-label={"移除文件 "+file.name}
     onClick={()=>remove(index)}>移除</button>
   </li>)}
  </ul>
  {rejects.length>0&&<div role="alert" className="fda-upload__error">
   {rejects.map((r,i)=><div key={i}>{message(r)}</div>)}
  </div>}
 </div>;
}
