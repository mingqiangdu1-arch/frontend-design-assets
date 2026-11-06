import * as React from "react";

// V0.25 cross-context controls: original UI references with no hidden network access,
// media manipulation, storage, permissions or unreviewed third-party assets.

export interface BeforeAfterCompareProps {
 label:string;before:React.ReactNode;after:React.ReactNode;
 value:number;onValueChange:(percentage:number)=>void;
 beforeLabel?:string;afterLabel?:string;disabled?:boolean;className?:string;
}
const clampPercentage=(value:number)=>Number.isFinite(value)?Math.max(0,Math.min(100,Math.round(value))):50;

/**
 * Compares two supplied visual panels. Pointer drag on the illustration or the
 * native range control changes one parent-controlled percentage (0..100).
 * The visual layers are deliberately noninteractive; don't place live form
 * controls inside them. The host supplies and licenses the content.
 */
export function BeforeAfterCompare({
 label,before,after,value,onValueChange,beforeLabel="Before",afterLabel="After",
 disabled=false,className
}:BeforeAfterCompareProps){
 const id=React.useId();
 const stage=React.useRef<HTMLDivElement>(null);
 const current=clampPercentage(value);
 const move=(clientX:number)=>{
  const rect=stage.current?.getBoundingClientRect();
  if(!rect||rect.width<=0)return;
  onValueChange(clampPercentage((clientX-rect.left)/rect.width*100));
 };
 const pointerDown=(event:React.PointerEvent<HTMLDivElement>)=>{
  if(disabled||event.button!==0)return;
  event.currentTarget.setPointerCapture(event.pointerId);
  move(event.clientX);
 };
 const pointerMove=(event:React.PointerEvent<HTMLDivElement>)=>{
  if(!disabled&&event.currentTarget.hasPointerCapture(event.pointerId))move(event.clientX);
 };
 const release=(event:React.PointerEvent<HTMLDivElement>)=>{
  if(event.currentTarget.hasPointerCapture(event.pointerId)){
   event.currentTarget.releasePointerCapture(event.pointerId);
  }
 };
 return <section className={["fda-before-after",className].filter(Boolean).join(" ")}
  aria-label={label}>
  <div className="fda-before-after__head">
   <strong>{label}</strong>
   <output htmlFor={id}>{current}% {beforeLabel}</output>
  </div>
  <div ref={stage} className="fda-before-after__stage" data-disabled={disabled||undefined}
   onPointerDown={pointerDown} onPointerMove={pointerMove}
   onPointerUp={release} onPointerCancel={release}>
   <div className="fda-before-after__panel fda-before-after__panel--after" aria-hidden="true">{after}</div>
   <div className="fda-before-after__panel fda-before-after__panel--before"
    style={{clipPath:`inset(0 ${100-current}% 0 0)`}} aria-hidden="true">{before}</div>
   <div className="fda-before-after__divider" style={{left:current+"%"}} aria-hidden="true">
    <span className="fda-before-after__handle">↔</span>
   </div>
  </div>
  <div className="fda-before-after__footer">
   <span>{beforeLabel}</span>
   <label htmlFor={id} className="fda-before-after__range-label">比较位置
    <input id={id} type="range" min={0} max={100} step={1} value={current}
     disabled={disabled} aria-label={label+" 比较位置"} aria-valuetext={current+"% "+beforeLabel}
     onChange={e=>onValueChange(clampPercentage(e.target.valueAsNumber))}/>
   </label>
   <span>{afterLabel}</span>
  </div>
 </section>;
}

export interface TagInputProps {
 label:string;tags:readonly string[];onTagsChange:(tags:string[])=>void;
 placeholder?:string;maxTags?:number;validate?:(tag:string)=>string|undefined;
 disabled?:boolean;className?:string;
}

/**
 * Controlled tag editor. Enter/comma adds, Escape cancels draft and Backspace
 * on an empty field removes the last tag. Native input supports IME composition.
 * Duplicate tags are rejected case-insensitively; no persistence is performed.
 */
export function TagInput({label,tags,onTagsChange,placeholder="输入标签并按 Enter",
 maxTags=8,validate,disabled=false,className}:TagInputProps){
 const id=React.useId(),input=React.useRef<HTMLInputElement>(null);
 const [draft,setDraft]=React.useState("");
 const [error,setError]=React.useState("");
 const limit=Number.isFinite(maxTags)?Math.max(0,Math.floor(maxTags)):8;
 const add=()=>{
  if(disabled)return;
  const next=draft.trim().replace(/,+$/,"").trim();
  if(!next){setDraft("");setError("");return;}
  if(tags.length>=limit){setError("最多添加 "+limit+" 个标签");return;}
  if(tags.some(t=>t.toLocaleLowerCase()===next.toLocaleLowerCase())){
   setError("标签已存在");return;
  }
  const validation=validate?.(next);
  if(validation){setError(validation);return;}
  onTagsChange([...tags,next]);setDraft("");setError("");
 };
 const remove=(index:number)=>{
  if(disabled)return;
  onTagsChange(tags.filter((_,i)=>i!==index));setError("");input.current?.focus();
 };
 return <div className={["fda-tag-input",className].filter(Boolean).join(" ")}>
  <div className="fda-tag-input__heading"><label htmlFor={id}>{label}</label>
   <small>{tags.length} / {limit}</small></div>
  <ul className="fda-tag-input__list" aria-label={label+" 已选标签"}>
   {tags.map((tag,index)=><li key={index} className="fda-tag-input__tag">
    <span>{tag}</span>
    <button type="button" aria-label={"移除标签 "+tag} disabled={disabled}
     onClick={()=>remove(index)}>×</button>
   </li>)}
  </ul>
  <div className="fda-tag-input__editor">
   <input ref={input} id={id} type="text" value={draft} placeholder={placeholder}
    disabled={disabled||tags.length>=limit}
    aria-invalid={Boolean(error)||undefined}
    aria-describedby={error?id+"-error":id+"-help"}
    onChange={e=>{setDraft(e.target.value);setError("");}}
    onKeyDown={e=>{
     if(e.nativeEvent.isComposing)return;
     if(e.key==="Enter"||e.key===","){e.preventDefault();add();}
     else if(e.key==="Escape"){e.preventDefault();setDraft("");setError("");}
     else if(e.key==="Backspace"&&!draft&&tags.length){e.preventDefault();remove(tags.length-1);}
    }}/>
   <button type="button" onClick={add} disabled={disabled||tags.length>=limit||!draft.trim()}>添加</button>
  </div>
  {error?<small className="fda-tag-input__error" role="alert" id={id+"-error"}>{error}</small>:
   <small className="fda-tag-input__hint" id={id+"-help"}>Enter / 逗号添加，空输入时 Backspace 删除最后一项。</small>}
 </div>;
}

export interface RatingInputProps {
 label:string;value:number;onValueChange:(rating:number)=>void;
 max?:number;disabled?:boolean;allowClear?:boolean;className?:string;
}
/** Native radio-group rating: keyboard Arrow keys and Tab work without custom handlers. */
export function RatingInput({label,value,onValueChange,max=5,disabled=false,
 allowClear=true,className}:RatingInputProps){
 const id=React.useId(),count=Number.isFinite(max)?Math.max(1,Math.min(10,Math.floor(max))):5;
 const selected=Number.isFinite(value)?Math.max(0,Math.min(count,Math.round(value))):0;
 return <fieldset className={["fda-rating",className].filter(Boolean).join(" ")} disabled={disabled}>
  <legend>{label}</legend>
  <div className="fda-rating__row">
   <div className="fda-rating__stars">
    {Array.from({length:count},(_,index)=>{
     const score=index+1;
     return <label key={score} className="fda-rating__option" data-active={score<=selected||undefined}
      title={score+" / "+count}>
      <input type="radio" name={id} value={score} checked={selected===score}
       onChange={()=>onValueChange(score)} aria-label={score+" 分"}/>
      <span aria-hidden="true">★</span>
     </label>;
    })}
   </div>
   <output className="fda-rating__result">{selected?selected+" / "+count:"尚未评分"}</output>
   {allowClear&&<button className="fda-rating__clear" type="button" disabled={selected===0||disabled}
    onClick={()=>onValueChange(0)}>清除</button>}
  </div>
 </fieldset>;
}
