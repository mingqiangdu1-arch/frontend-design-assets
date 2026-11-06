import * as React from "react";
import "./themes.css";
import "./styles.css";
export type ThemeId="refined-light-saas"|"precision-dark"|"editorial-warm"|"playful-pop";
export type Tone="neutral"|"success"|"info"|"warning"|"danger";
export type Size="sm"|"md"|"lg";
export type ButtonVariant="primary"|"secondary"|"ghost"|"danger";
const cx=(...names:Array<string|boolean|undefined>)=>names.filter(Boolean).join(" ");

export function ThemeSurface({theme,className,children,...props}:React.HTMLAttributes<HTMLDivElement>&{theme:ThemeId}){
 return <div {...props} data-design-theme={theme} className={cx("fda-scope",className)}>{children}</div>;
}
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
 variant?:ButtonVariant;size?:Size;loading?:boolean;
}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(function Button({
 variant="primary",size="md",loading=false,disabled,className,children,type="button",...props
},ref){
 return <button {...props} ref={ref} type={type} disabled={disabled||loading} aria-busy={loading||undefined}
 className={cx("fda-button","fda-button--"+variant,"fda-button--"+size,className)}>
 {loading&&<span className="fda-spinner" aria-hidden="true"/>}{children}</button>;
});

export function Badge({tone="neutral",className,...props}:React.HTMLAttributes<HTMLSpanElement>&{tone?:Tone}){
 return <span {...props} className={cx("fda-badge","fda-badge--"+tone,className)}/>;
}
export function Card({heading,description,footer,children,className,...props}:
 React.HTMLAttributes<HTMLElement>&{heading?:React.ReactNode;description?:React.ReactNode;footer?:React.ReactNode}){
 return <section {...props} className={cx("fda-card",className)}>
 {(heading||description)&&<header className="fda-card__head">
 {heading&&<h3>{heading}</h3>}{description&&<p>{description}</p>}</header>}
 <div className="fda-card__body">{children}</div>{footer&&<footer className="fda-card__footer">{footer}</footer>}
 </section>;
}
type Chrome={label:string;hint?:string;error?:string};
export type TextFieldProps=Omit<React.InputHTMLAttributes<HTMLInputElement>,"size">&Chrome;
export const TextField=React.forwardRef<HTMLInputElement,TextFieldProps>(function TextField({
 label,hint,error,id,className,required,...props
},ref){
 const uid=React.useId(),controlId=id||uid,hintId=hint?controlId+"-hint":undefined,errorId=error?controlId+"-error":undefined;
 return <div className={cx("fda-field",className)}>
 <label htmlFor={controlId}>{label}{required&&<span aria-hidden="true"> *</span>}</label>
 <input {...props} ref={ref} id={controlId} required={required} className="fda-input" aria-invalid={error?true:undefined}
 aria-describedby={[props["aria-describedby"],hintId,errorId].filter(Boolean).join(" ")||undefined}/>
 {hint&&<small className="fda-hint" id={hintId}>{hint}</small>}
 {error&&<small className="fda-error" id={errorId} role="alert">{error}</small>}</div>;
});
export type TextAreaFieldProps=React.TextareaHTMLAttributes<HTMLTextAreaElement>&Chrome;
export const TextAreaField=React.forwardRef<HTMLTextAreaElement,TextAreaFieldProps>(function TextAreaField({
 label,hint,error,id,className,required,...props
},ref){
 const uid=React.useId(),controlId=id||uid,hintId=hint?controlId+"-hint":undefined,errorId=error?controlId+"-error":undefined;
 return <div className={cx("fda-field",className)}>
 <label htmlFor={controlId}>{label}{required&&<span aria-hidden="true"> *</span>}</label>
 <textarea {...props} ref={ref} id={controlId} required={required} className="fda-textarea" aria-invalid={error?true:undefined}
 aria-describedby={[props["aria-describedby"],hintId,errorId].filter(Boolean).join(" ")||undefined}/>
 {hint&&<small className="fda-hint" id={hintId}>{hint}</small>}
 {error&&<small className="fda-error" id={errorId} role="alert">{error}</small>}</div>;
});
export interface SelectOption{value:string;label:string;disabled?:boolean}
export type SelectFieldProps=Omit<React.SelectHTMLAttributes<HTMLSelectElement>,"size"|"children">&Chrome&{options:SelectOption[];placeholder?:string};
export const SelectField=React.forwardRef<HTMLSelectElement,SelectFieldProps>(function SelectField({
 label,hint,error,id,className,required,options,placeholder,...props
},ref){
 const uid=React.useId(),controlId=id||uid,hintId=hint?controlId+"-hint":undefined,errorId=error?controlId+"-error":undefined;
 return <div className={cx("fda-field",className)}>
 <label htmlFor={controlId}>{label}{required&&<span aria-hidden="true"> *</span>}</label>
 <select {...props} ref={ref} id={controlId} required={required} className="fda-select" aria-invalid={error?true:undefined}
 aria-describedby={[props["aria-describedby"],hintId,errorId].filter(Boolean).join(" ")||undefined}>
 {placeholder&&<option value="" disabled>{placeholder}</option>}
 {options.map(option=><option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
 </select>
 {hint&&<small className="fda-hint" id={hintId}>{hint}</small>}
 {error&&<small className="fda-error" id={errorId} role="alert">{error}</small>}</div>;
});

export function CheckboxField({label,description,className,id,...props}:
 Omit<React.InputHTMLAttributes<HTMLInputElement>,"type">&{label:string;description?:string}){
 const uid=React.useId(),controlId=id||uid;
 return <div className={cx("fda-choice",className)}>
 <input {...props} id={controlId} className="fda-checkbox" type="checkbox"
 aria-describedby={description?controlId+"-help":undefined}/>
 <div><label htmlFor={controlId}>{label}</label>{description&&<small id={controlId+"-help"}>{description}</small>}</div>
 </div>;
}
export interface SwitchFieldProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,"onChange">{
 label:string;description?:string;checked:boolean;onCheckedChange:(checked:boolean)=>void;
}
export function SwitchField({label,description,checked,onCheckedChange,disabled,className,onClick,...props}:SwitchFieldProps){
 const uid=React.useId();
 return <div className={cx("fda-switch-row",className)}>
 <div><span id={uid+"-label"}>{label}</span>{description&&<small id={uid+"-help"}>{description}</small>}</div>
 <button {...props} type="button" role="switch" className="fda-switch" disabled={disabled} aria-checked={checked}
 aria-labelledby={uid+"-label"} aria-describedby={description?uid+"-help":undefined}
 onClick={e=>{onClick?.(e);if(!e.defaultPrevented&&!disabled)onCheckedChange(!checked);}}>
 <span className="fda-switch__thumb"/></button></div>;
}
export type TabItem={value:string;label:string;content:React.ReactNode;disabled?:boolean};
export interface TabsProps{items:TabItem[];value:string;onValueChange:(value:string)=>void;label?:string;className?:string}
export function Tabs({items,value,onValueChange,label="页面标签",className}:TabsProps){
 const uid=React.useId(),refs=React.useRef<Record<string,HTMLButtonElement|null>>({});
 const available=items.filter(x=>!x.disabled),active=available.find(x=>x.value===value)||available[0];
 const activate=(next:string)=>{
  if(!available.some(x=>x.value===next))return;
  onValueChange(next);refs.current[next]?.focus();
 };
 const handleKey=(e:React.KeyboardEvent<HTMLButtonElement>,at:string)=>{
  const idx=available.findIndex(x=>x.value===at);if(idx<0)return;
  let next:number|undefined;
  if(e.key==="ArrowRight"||e.key==="ArrowDown")next=(idx+1)%available.length;
  else if(e.key==="ArrowLeft"||e.key==="ArrowUp")next=(idx+available.length-1)%available.length;
  else if(e.key==="Home")next=0;
  else if(e.key==="End")next=available.length-1;
  if(next!==undefined){e.preventDefault();activate(available[next].value);}
 };
 return <div className={cx("fda-tabs",className)}>
 <div role="tablist" aria-label={label} className="fda-tabs__list">
 {items.map(item=>{
 const selected=item.value===active?.value;
 return <button ref={el=>{refs.current[item.value]=el;}} type="button" key={item.value} role="tab"
 className="fda-tabs__tab" id={uid+"-tab-"+item.value} aria-controls={uid+"-panel-"+item.value}
 aria-selected={selected} tabIndex={selected?0:-1} disabled={item.disabled}
 onClick={()=>activate(item.value)} onKeyDown={e=>handleKey(e,item.value)}>{item.label}</button>;
 })}
 </div>
 {items.map(item=><div key={item.value} role="tabpanel" tabIndex={0} hidden={item.value!==active?.value}
 className="fda-tabs__panel" id={uid+"-panel-"+item.value} aria-labelledby={uid+"-tab-"+item.value}>{item.content}</div>)}
 </div>;
}
export function Alert({tone="info",title,dismiss,children,className,...props}:
 React.HTMLAttributes<HTMLDivElement>&{tone?:Tone;title:string;dismiss?:()=>void}){
 return <div {...props} role={tone==="danger"?"alert":"status"} className={cx("fda-alert","fda-alert--"+tone,className)}>
 <div><strong>{title}</strong>{children&&<p>{children}</p>}</div>
 {dismiss&&<button aria-label="关闭提示" type="button" className="fda-alert__dismiss" onClick={dismiss}>×</button>}</div>;
}
export function Progress({value,max=100,label,showValue=true,className,...props}:
 Omit<React.HTMLAttributes<HTMLDivElement>,"children">&{value:number;max?:number;label:string;showValue?:boolean}){
 const bound=Math.max(1,Number.isFinite(max)?max:100),current=Math.max(0,Math.min(bound,Number.isFinite(value)?value:0));
 return <div {...props} className={cx("fda-progress",className)}>
 <div className="fda-progress__labels"><span>{label}</span>{showValue&&<span>{Math.round(current/bound*100)}%</span>}</div>
 <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={bound} aria-valuenow={current}
 className="fda-progress__track"><span style={{width:String(current/bound*100)+"%"}}/></div></div>;
}
export function Skeleton({width="100%",height=14,className,style,...props}:
 React.HTMLAttributes<HTMLSpanElement>&{width?:number|string;height?:number|string}){
 return <span {...props} aria-hidden="true" className={cx("fda-skeleton",className)} style={{width,height,...style}}/>;
}
export interface DialogProps{
 open:boolean;onOpenChange:(open:boolean)=>void;title:string;description?:string;
 children:React.ReactNode;footer?:React.ReactNode;className?:string;
}
export function Dialog({open,onOpenChange,title,description,children,footer,className}:DialogProps){
 const ref=React.useRef<HTMLDialogElement>(null),headingId=React.useId(),bodyId=React.useId();
 React.useEffect(()=>{
  const el=ref.current;if(!el)return;
  if(open&&!el.open)el.showModal();
  if(!open&&el.open)el.close();
 },[open]);
 return <dialog ref={ref} className={cx("fda-dialog",className)} aria-labelledby={headingId}
 aria-describedby={description?bodyId:undefined}
 onClose={()=>onOpenChange(false)} onCancel={e=>{e.preventDefault();onOpenChange(false);}}>
 <header className="fda-dialog__head"><div><h2 id={headingId}>{title}</h2>
 {description&&<p id={bodyId}>{description}</p>}</div>
 <button className="fda-dialog__close" type="button" aria-label="关闭对话框" onClick={()=>onOpenChange(false)}>×</button></header>
 <div className="fda-dialog__body">{children}</div>
 {footer&&<footer className="fda-dialog__footer">{footer}</footer>}</dialog>;
}
export function EmptyState({title,description,action,symbol="◇",className,...props}:
 React.HTMLAttributes<HTMLDivElement>&{title:string;description:string;action?:React.ReactNode;symbol?:React.ReactNode}){
 return <div {...props} className={cx("fda-empty",className)}>
 <span className="fda-empty__symbol" aria-hidden="true">{symbol}</span>
 <strong>{title}</strong><p>{description}</p>{action&&<div>{action}</div>}</div>;
}
export function Avatar({name,src,size="md",className,...props}:
 React.HTMLAttributes<HTMLSpanElement>&{name:string;src?:string;size?:Size}){
 const initials=name.trim().split(/\s+/).map(s=>s[0]).slice(0,2).join("").toUpperCase()||"?";
 return <span {...props} className={cx("fda-avatar","fda-avatar--"+size,className)} role="img" aria-label={name}>
 {src?<img src={src} alt="" loading="lazy"/>:initials}</span>;
}
export interface DataListItem{id:string;title:string;subtitle?:string;meta?:string;badge?:React.ReactNode}
export function DataList({items,selectedId,onSelect,label="数据列表"}:
 {items:DataListItem[];selectedId?:string;onSelect?:(id:string)=>void;label?:string}){
 if(!items.length)return <EmptyState title="暂无数据" description="没有可显示的记录。"/>;
 return <ul className="fda-data-list" aria-label={label}>
 {items.map(item=><li key={item.id}>
 {onSelect?<button className="fda-data-list__row" type="button" aria-pressed={selectedId===item.id}
 onClick={()=>onSelect(item.id)}>
 <span className="fda-data-list__main"><strong>{item.title}</strong>{item.subtitle&&<small>{item.subtitle}</small>}</span>
 {item.badge}<span className="fda-data-list__meta">{item.meta}</span></button>:
 <div className="fda-data-list__row"><span className="fda-data-list__main"><strong>{item.title}</strong>
 {item.subtitle&&<small>{item.subtitle}</small>}</span>{item.badge}
 <span className="fda-data-list__meta">{item.meta}</span></div>}
 </li>)}</ul>;
}
export function Toast({open,message,tone="neutral",onDismiss,action}:{
 open:boolean;message:string;tone?:Tone;onDismiss:()=>void;action?:{label:string;onClick:()=>void}
}){
 if(!open)return null;
 return <div className={cx("fda-toast","fda-toast--"+tone)} role={tone==="danger"?"alert":"status"}>
 <span>{message}</span>{action&&<button type="button" onClick={action.onClick}>{action.label}</button>}
 <button className="fda-toast__close" type="button" aria-label="关闭消息" onClick={onDismiss}>×</button></div>;
}

// Additional real React components; research-only UI-028..032 are separate assets.
export {DataTable,TreeView,Combobox,Popover,DualRangeField} from "./advanced";
export type {DataTableColumn,DataTableSort,DataTableProps,TreeViewItem,TreeViewProps,ComboboxOption,ComboboxProps,PopoverProps,DualRangeFieldProps} from "./advanced";
