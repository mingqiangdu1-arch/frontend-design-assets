import * as React from "react";
import {ThemeSurface,Button,Badge,Card,TextField,CheckboxField,SwitchField,Tabs,Alert,Progress,Skeleton,Dialog,Toast,EmptyState,type ThemeId,type Tone} from "../../../packages/ui/src/index";
import "./matrix.css";
const themes:{id:ThemeId;name:string}[]=[{id:"refined-light-saas",name:"Refined Light"},{id:"precision-dark",name:"Precision Dark"},{id:"editorial-warm",name:"Editorial Warm"},{id:"playful-pop",name:"Playful Pop"}];
function Group({id,title,description,children}:{id:string;title:string;description:string;children:React.ReactNode}){
 return <section data-component-id={id} className="mx-panel"><header><span>{id}</span><h2>{title}</h2><p>{description}</p></header><div className="mx-states">{children}</div></section>;
}
function Cell({state,children}:{state:string;children:React.ReactNode}){
 return <div className="mx-cell" data-state={state}><small>{state}</small><div>{children}</div></div>;
}
export function StateMatrix(){
 const [theme,setTheme]=React.useState<ThemeId>("refined-light-saas");
 const [formValue,setFormValue]=React.useState("");
 const [checked,setChecked]=React.useState(false);
 const [enabled,setEnabled]=React.useState(true);
 const [tab,setTab]=React.useState("details");
 const [dialog,setDialog]=React.useState(false);
 const [toast,setToast]=React.useState(false);
 const [tone,setTone]=React.useState<Tone>("info");
 const [notice,setNotice]=React.useState("操作已完成（本地模拟）");
 const [progress,setProgress]=React.useState(60);
 const [request,setRequest]=React.useState<"idle"|"loading"|"empty"|"error"|"success">("idle");
 return <div className="mx-app">
  <header className="mx-global"><strong>◈ COMPONENT STATES</strong><nav><a href="./">组件展厅</a><a href="https://github.com/mingqiangdu1-arch/frontend-design-assets/blob/main/registry/component-states.json">状态规范 ↗</a></nav></header>
  <div className="mx-theme-picker" role="group" aria-label="选择状态矩阵风格">
   {themes.map(t=><button type="button" key={t.id} data-matrix-theme={t.id} aria-pressed={theme===t.id} onClick={()=>setTheme(t.id)}>{t.name}</button>)}
  </div>
  <ThemeSurface theme={theme} className="mx-surface">
   <div className="mx-intro"><div><span>23 REACT EXPORTS · 4 DECLARED THEMES · SELECTED STATE COVERAGE</span>
    <h1>Component State Matrix</h1><p>同一组真实 React 组件在四套兼容风格下检查默认、加载、禁用、空态、错误及恢复反馈。展示的是选定状态，不表示 23 个组件已全面验收。</p></div>
    <Badge tone="info">{themes.find(t=>t.id===theme)?.name}</Badge></div>
   <main className="mx-grid">
    <Group id="UI-011" title="Button" description="动作的默认、危险、加载与禁用"><>
     <Cell state="default"><Button onClick={()=>{setNotice("主要动作完成（本地模拟）");setToast(true);}}>Primary action</Button></Cell>
     <Cell state="secondary"><Button variant="secondary">Secondary</Button></Cell>
     <Cell state="danger"><Button variant="danger" onClick={()=>setDialog(true)}>Danger</Button></Cell>
     <Cell state="loading"><Button loading>Submitting…</Button></Cell>
     <Cell state="disabled"><Button disabled>Unavailable</Button></Cell>
    </></Group>
    <Group id="UI-014" title="TextField" description="输入、必填、错误关系以及辅助提示"><>
     <Cell state="default"><TextField label="Display name" placeholder="Type a name" value={formValue} onChange={e=>setFormValue(e.target.value)}/></Cell>
     <Cell state="required"><TextField label="Project code" required placeholder="e.g. FDS-101" hint="Required field"/></Cell>
     <Cell state="error"><TextField label="Email error state" defaultValue="invalid" error="Please provide a valid email" aria-label="Invalid email"/></Cell>
     <Cell state="disabled"><TextField label="Disabled input" disabled value="Read only state" readOnly/></Cell>
    </></Group>
    <Group id="UI-017" title="Checkbox" description="本地受控勾选与不可用"><>
     <Cell state="unchecked"><CheckboxField label="Review selection" checked={checked} onChange={e=>setChecked(e.target.checked)}/></Cell>
     <Cell state="disabled"><CheckboxField label="Locked selection" disabled checked readOnly/></Cell>
    </></Group>
    <Group id="UI-018" title="Switch" description="可切换与禁用"><>
     <Cell state="on"><SwitchField label="Notifications" checked={enabled} onCheckedChange={setEnabled}/></Cell>
     <Cell state="disabled"><SwitchField label="Blocked toggle" checked={false} disabled onCheckedChange={()=>{}}/></Cell>
    </></Group>
    <Group id="UI-012" title="Badge" description="仅使用已声明语义 Tone"><div className="mx-badges">{(["neutral","info","success","warning","danger"] as Tone[]).map(t=><Cell key={t} state={t}><Badge tone={t}>{t}</Badge></Cell>)}</div></Group>
    <Group id="UI-020" title="Alert" description="信息、成功、警告与可恢复错误"><>
     <Cell state="info"><Alert title="Ready to review" tone="info">Current content uses local fixtures.</Alert></Cell>
     <Cell state="warning"><Alert title="Action needs attention" tone="warning">Check details before continuing.</Alert></Cell>
     <Cell state="danger"><Alert title="Request failed" tone="danger">Retry safely; no server writes occurred.</Alert></Cell>
     <Cell state="success"><Alert title="Draft saved locally" tone="success">No remote persistence.</Alert></Cell>
    </></Group>
    <Group id="UI-021" title="Progress" description="有确定值的 0/60/100 进度"><>
     {[0,60,100].map(value=><Cell key={value} state={value+"-percent"}><Progress label={value+" percent progress"} value={value}/></Cell>)}
     <Cell state="interactive"><Progress label="Adjusted progress" value={progress}/><Button size="sm" variant="secondary" onClick={()=>setProgress(Math.max(0,progress-10))}>Reduce</Button><Button size="sm" onClick={()=>setProgress(Math.min(100,progress+10))}>Increase</Button></Cell>
    </></Group>
    <Group id="UI-022" title="Skeleton" description="视觉占位不是无障碍加载状态"><Cell state="loading"><div className="mx-skeletons"><Skeleton width="48%" height={14}/><Skeleton width="94%" height={12}/><Skeleton width="78%" height={12}/></div><small aria-live="polite">Loading placeholder · Please wait</small></Cell></Group>
    <Group id="UI-019" title="Tabs" description="方向键/Home/End 导航与禁用页签"><Cell state="controlled"><Tabs label="Matrix tabs" value={tab} onValueChange={setTab} items={[
     {value:"details",label:"Details",content:"Primary panel content."},{value:"history",label:"History",content:"Local placeholder only."},{value:"locked",label:"Locked",disabled:true,content:"Unreachable"}]}/></Cell></Group>
    <Group id="UI-024" title="EmptyState" description="明确空态原因与下一步"><Cell state="empty"><EmptyState title="Nothing matches" description="Try a different set of filters." action={<Button variant="secondary" size="sm">Reset filters</Button>}/></Cell></Group>
    <Group id="UI-023" title="Dialog" description="原生模态焦点与 Escape 关闭"><Cell state="modal-closed"><Button variant="secondary" onClick={()=>setDialog(true)}>Open confirmation</Button></Cell></Group>
    <Group id="UI-027" title="Toast" description="信息与失败的本地反馈"><Cell state="trigger"><Button variant="secondary" onClick={()=>{setTone("info");setNotice("Saved locally · Nothing sent");setToast(true);}}>Show feedback</Button><Button variant="danger" onClick={()=>{setTone("danger");setNotice("Local request error · Retry is available");setToast(true);}}>Show error</Button></Cell></Group>
    <Group id="STATE-REQUEST" title="Request state model" description="独立本地状态机，避免 Loading / Error / Empty 混淆"><>
     <Cell state="controls"><div className="mx-requests">{(["idle","loading","empty","error","success"] as const).map(s=><Button variant={request===s?"primary":"secondary"} size="sm" key={s} onClick={()=>setRequest(s)}>{s}</Button>)}</div></Cell>
     <Cell state={request}><div data-request-state={request} role="status" className="mx-request-result">{request==="idle"?"No request submitted":request==="loading"?"Fetching… local simulation":request==="empty"?"No matching records":request==="error"?"Could not load records. Use retry below.":"Data loaded from local fixture."}</div>{request==="error"&&<Button variant="secondary" size="sm" onClick={()=>setRequest("success")}>Retry</Button>}</Cell>
    </></Group>
   </main>
   <footer className="mx-footer">Source: packages/ui · This is reference coverage, not release qualification · V0.12</footer>
   <Dialog open={dialog} onOpenChange={setDialog} title="Confirm a local action" description="A native modal; no backend is contacted." footer={<Button onClick={()=>setDialog(false)}>Close</Button>}>
     <p>Escape or Close returns to the underlying matrix.</p>
   </Dialog>
   <Toast open={toast} tone={tone} message={notice} onDismiss={()=>setToast(false)} action={{label:"Dismiss",onClick:()=>setToast(false)}}/>
  </ThemeSurface>
 </div>;
}
