import * as React from "react";

// Original, controlled reference components. The host app owns validation,
// persistence, data queries and routing. No third-party widget source is copied.

export interface WizardStep {
 id:string;title:string;description?:string;content:React.ReactNode;
}
export interface FormWizardProps {
 label:string;steps:WizardStep[];currentStepId:string;
 onStepChange:(id:string)=>void;canAdvance?:boolean;
 onComplete?:()=>void;completeLabel?:string;busy?:boolean;
 className?:string;
}
export function FormWizard({label,steps,currentStepId,onStepChange,
 canAdvance=true,onComplete,completeLabel="完成",busy=false,className}:FormWizardProps){
 if(!steps.length||new Set(steps.map(s=>s.id)).size!==steps.length||
  steps.some(s=>!s.id.trim()||!s.title.trim()))
  throw Error("FormWizard requires distinct nonempty step IDs and titles");
 const index=steps.findIndex(s=>s.id===currentStepId);
 if(index<0)throw Error("FormWizard currentStepId must match a step");
 const current=steps[index],last=index===steps.length-1;
 const next=()=>{
  if(busy||!canAdvance)return;
  if(last)onComplete?.();
  else onStepChange(steps[index+1].id);
 };
 return <section aria-label={label}
  className={["fda-wizard",className].filter(Boolean).join(" ")}>
  <ol className="fda-wizard__steps">
   {steps.map((step,i)=><li key={step.id}
    data-status={i===index?"current":i<index?"previous":"upcoming"}>
    {i<index?<button type="button" disabled={busy}
      onClick={()=>onStepChange(step.id)} aria-label={"返回"+step.title}>
      <span className="fda-wizard__number">{i+1}</span><span>{step.title}</span></button>:
     <div aria-current={i===index?"step":undefined}>
      <span className="fda-wizard__number">{i+1}</span><span>{step.title}</span>
     </div>}
   </li>)}
  </ol>
  <div className="fda-wizard__body">
   <header><h3>{current.title}</h3>{current.description&&<p>{current.description}</p>}</header>
   <div className="fda-wizard__content">{current.content}</div>
  </div>
  <div className="fda-wizard__actions">
   <button type="button" disabled={index===0||busy}
    onClick={()=>onStepChange(steps[index-1].id)}>上一步</button>
   <span aria-live="polite">{index+1} / {steps.length}</span>
   <button type="button" disabled={busy||!canAdvance||last&&!onComplete}
    aria-busy={busy||undefined} onClick={next}>
    {busy?"处理中…":last?completeLabel:"下一步"}
   </button>
  </div>
 </section>;
}

export interface RepeatableFieldItem {id:string;value:string;}
export interface RepeatableFieldsProps {
 label:string;items:readonly RepeatableFieldItem[];
 onAdd:()=>void;onChange:(id:string,value:string)=>void;onRemove:(id:string)=>void;
 minItems?:number;maxItems?:number;disabled?:boolean;required?:boolean;
 inputLabel?:string;placeholder?:string;className?:string;
}
export function RepeatableFields({label,items,onAdd,onChange,onRemove,
 minItems=0,maxItems=10,disabled=false,required=false,
 inputLabel="项目",placeholder="",className}:RepeatableFieldsProps){
 if(!Number.isInteger(minItems)||!Number.isInteger(maxItems)||
  minItems<0||maxItems<1||minItems>maxItems||items.length>maxItems||
  new Set(items.map(item=>item.id)).size!==items.length||
  items.some(item=>!item.id.trim()))
  throw Error("Invalid RepeatableFields configuration or duplicate IDs");
 const id=React.useId();
 return <fieldset className={["fda-repeat",className].filter(Boolean).join(" ")}
  disabled={disabled}>
  <legend>{label}</legend>
  <div className="fda-repeat__items">
   {items.map((item,index)=><div className="fda-repeat__row" key={item.id}>
    <label htmlFor={id+"-"+index}>{inputLabel} {index+1}</label>
    <input type="text" id={id+"-"+index} value={item.value}
     required={required} placeholder={placeholder}
     onChange={e=>onChange(item.id,e.target.value)}/>
    <button type="button" disabled={items.length<=minItems}
     aria-label={"移除"+inputLabel+" "+(index+1)}
     onClick={()=>onRemove(item.id)}>移除</button>
   </div>)}
  </div>
  <button type="button" disabled={items.length>=maxItems}
   onClick={onAdd}>添加{inputLabel}</button>
  <small className="fda-hint">已添加 {items.length} / {maxItems}，最少保留 {minItems}</small>
 </fieldset>;
}

export interface ValidationIssue {id:string;fieldId:string;message:string;}
export interface ValidationSummaryProps {
 label?:string;issues:readonly ValidationIssue[];
 onNavigate:(fieldId:string)=>void;className?:string;
}
export function ValidationSummary({label="请检查以下字段",issues,onNavigate,
 className}:ValidationSummaryProps){
 if(!issues.length)return null;
 return <section role="alert" className={["fda-validation",className].filter(Boolean).join(" ")}>
  <strong>{label}（{issues.length} 项）</strong>
  <ul>{issues.map(issue=><li key={issue.id}>
   <button type="button" onClick={()=>onNavigate(issue.fieldId)}>{issue.message}</button>
  </li>)}</ul>
 </section>;
}

export interface SparklineProps {
 label:string;values:readonly number[];height?:number;
 summary?:string;className?:string;
}
export function Sparkline({label,values,height=60,summary,className}:SparklineProps){
 if(values.length<2||values.some(v=>!Number.isFinite(v))||
  !Number.isFinite(height)||height<24||height>400)
  throw Error("Sparkline requires at least two finite values and a valid height");
 const width=200,pad=6,lo=Math.min(...values),hi=Math.max(...values),range=hi-lo;
 const coords=values.map((value,i)=>({
  x:pad+i*(width-2*pad)/(values.length-1),
  y:pad+(range===0?0.5:(hi-value)/range)*(height-2*pad)
 }));
 const d=coords.map((p,i)=>(i===0?"M":"L")+p.x.toFixed(2)+" "+p.y.toFixed(2)).join(" ");
 const first=values[0],last=values[values.length-1];
 const trend=last>first?"上升":last<first?"下降":"持平";
 return <figure className={["fda-sparkline",className].filter(Boolean).join(" ")}>
  <figcaption><strong>{label}</strong>
   <span>{summary||"最新值 "+last+" · "+trend}</span>
  </figcaption>
  <svg role="img" aria-label={label+"，"+values.length+" 个数据点，从 "+first+" 到 "+last+
    "，范围 "+lo+" 至 "+hi} viewBox={"0 0 "+width+" "+height}
   preserveAspectRatio="none" width="100%" height={height}>
   <path d={d} fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
   <circle cx={coords[coords.length-1].x} cy={coords[coords.length-1].y}
    r="4" fill="currentColor"/>
  </svg>
 </figure>;
}

export interface DashboardGridItem {
 id:string;title:string;content:React.ReactNode;
 span?:1|2|3|4;description?:string;
}
export interface DashboardGridProps {
 label:string;items:readonly DashboardGridItem[];className?:string;
}
export function DashboardGrid({label,items,className}:DashboardGridProps){
 if(new Set(items.map(item=>item.id)).size!==items.length||
  items.some(item=>!item.id.trim()||!item.title.trim()||
    (item.span!==undefined&&![1,2,3,4].includes(item.span))))
  throw Error("DashboardGrid requires distinct IDs, titles and span 1..4");
 return <section aria-label={label} className={["fda-dashgrid",className].filter(Boolean).join(" ")}>
  {items.map(item=><article key={item.id} className="fda-dashgrid__panel"
   data-span={item.span||1}>
   <header><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}</header>
   <div className="fda-dashgrid__content">{item.content}</div>
  </article>)}
 </section>;
}
