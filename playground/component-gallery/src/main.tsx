import * as React from "react";
import {createRoot} from "react-dom/client";
import {ThemeSurface,Button,Badge,Card,TextField,TextAreaField,SelectField,CheckboxField,SwitchField,
 Tabs,Alert,Progress,Skeleton,Dialog,EmptyState,Avatar,DataList,Toast,type ThemeId,type Tone} from "../../../packages/ui/src/index";
import "../../../tokens/refined-light.css";
import "../../../styles/precision-dark/tokens.css";
import "../../../styles/editorial-warm/tokens.css";
import "../../../styles/playful-pop/tokens.css";
import "./gallery.css";

const themes:{id:ThemeId;label:string;description:string}[]=[
 {id:"refined-light-saas",label:"Refined Light",description:"结构清晰的 SaaS 产品"},
 {id:"precision-dark",label:"Precision Dark",description:"紧凑的专业工具"},
 {id:"editorial-warm",label:"Editorial Warm",description:"文字优先的阅读体验"},
 {id:"playful-pop",label:"Playful Pop",description:"鲜活的互动产品"}
];
const rows=[
 {id:"R-01",title:"用户研究与需求",subtitle:"产品团队 · 2026/10/26",meta:"今日",badge:<Badge tone="info">进行中</Badge>},
 {id:"R-02",title:"导航与视觉规范",subtitle:"设计团队 · 2026/10/24",meta:"2 天前",badge:<Badge tone="success">已完成</Badge>},
 {id:"R-03",title:"组件库验收",subtitle:"研发团队 · 2026/10/22",meta:"4 天前",badge:<Badge tone="warning">待验证</Badge>}
];
function Specimen({title,id,caption,children}:{
 title:string;id:string;caption?:string;children:React.ReactNode
}){
 return <div className="cg-spec" id={id}>
 <header className="cg-spec__head"><div><span>{id.toUpperCase()}</span><h2>{title}</h2></div>{caption&&<small>{caption}</small>}</header>
 <div className="cg-spec__body">{children}</div></div>;
}
function App(){
 const [theme,setTheme]=React.useState<ThemeId>("refined-light-saas");
 const [name,setName]=React.useState("");
 const [notes,setNotes]=React.useState("不同设计语言可以复用行为，却不需要复用相同的视觉外观。");
 const [select,setSelect]=React.useState("workspace");
 const [agreed,setAgreed]=React.useState(false);
 const [enabled,setEnabled]=React.useState(true);
 const [tab,setTab]=React.useState("overview");
 const [dialog,setDialog]=React.useState(false);
 const [toast,setToast]=React.useState(false);
 const [alert,setAlert]=React.useState(true);
 const [selected,setSelected]=React.useState("R-01");
 const [progress,setProgress]=React.useState(65);
 const [loading,setLoading]=React.useState(false);
 const [busy,setBusy]=React.useState(false);
 const [noticeTone,setNoticeTone]=React.useState<Tone>("info");
 const validated=name.length>0&&name.trim().length<3;
 const runLoading=()=>{
  if(busy)return;setBusy(true);setLoading(true);
  window.setTimeout(()=>{setLoading(false);setBusy(false);setToast(true);},550);
 };
 return <div className="cg-app">
 <header className="cg-top">
  <div className="cg-brand"><span className="cg-mark">◈</span><div><strong>Component Library</strong><small>Frontend Design Assets / v0.6</small></div></div>
  <a href="https://github.com/mingqiangdu1-arch/frontend-design-assets/tree/main/packages/ui" target="_blank" rel="noreferrer">GitHub 源码 ↗</a>
 </header>
 <div className="cg-picker" role="group" aria-label="选择组件预览风格">
  {themes.map(item=><button type="button" data-theme-button={item.id} key={item.id} className={theme===item.id?"chosen":""}
    aria-pressed={theme===item.id} onClick={()=>setTheme(item.id)}>
    <span className={"cg-dot cg-dot--"+item.id}/><span>{item.label}<small>{item.description}</small></span></button>)}
 </div>
 <ThemeSurface theme={theme} className="cg-surface">
  <div className="cg-intro"><div><small>LIVE REACT / TYPESCRIPT COMPONENTS</small>
    <h1>组件不仅要好看，也要能直接组装。</h1>
    <p>16 个可交互的基础组件，覆盖操作、输入、选择、信息呈现、数据与反馈。当前是参考实现，尚未进行生产集成认证。</p>
   </div><Badge tone="neutral">{themes.find(x=>x.id===theme)?.label}</Badge>
  </div>
  <div className="cg-grid">
   <Specimen id="buttons" title="Buttons" caption="Button / loading / disabled">
    <div className="cg-row">
     <Button onClick={()=>setToast(true)}>主要操作</Button>
     <Button variant="secondary" onClick={()=>setDialog(true)}>次要操作</Button>
     <Button variant="ghost" onClick={()=>setToast(true)}>文本操作</Button>
     <Button variant="danger" onClick={()=>setDialog(true)}>危险操作</Button>
    </div>
    <div className="cg-row"><Button size="sm">小号</Button><Button size="md">标准</Button><Button size="lg">大号</Button>
      <Button loading={loading} onClick={runLoading}>{loading?"执行中":"模拟异步"}</Button><Button disabled>已禁用</Button></div>
   </Specimen>
   <Specimen id="badges" title="Badges & Avatars" caption="Status / identity">
     <div className="cg-row"><Badge>默认</Badge><Badge tone="info">信息</Badge><Badge tone="success">已完成</Badge>
       <Badge tone="warning">需注意</Badge><Badge tone="danger">错误</Badge></div>
     <div className="cg-row"><Avatar name="Will" size="sm"/><Avatar name="李明" size="md"/><Avatar name="Design Team" size="lg"/><span className="cg-hint">无外部头像时显示姓名首字母</span></div>
   </Specimen>
   <Specimen id="forms" title="Text Fields" caption="label / hint / validation">
     <div className="cg-form-grid">
      <TextField label="项目名称" placeholder="输入不少于 3 个字符" value={name} onChange={e=>setName(e.target.value)}
       error={validated?"至少需要 3 个字符":undefined} hint="试试输入短名称以触发错误" required/>
      <SelectField label="工作空间" value={select} onChange={e=>setSelect(e.target.value)}
       options={[{value:"workspace",label:"产品工作台"},{value:"creative",label:"创意空间"},{value:"ops",label:"运营中心"}]}/>
      <TextAreaField label="设计说明" value={notes} onChange={e=>setNotes(e.target.value)} hint="此字段中的更改仅保留在当前页面"/>
     </div>
   </Specimen>
   <Specimen id="choices" title="Checkbox & Switch" caption="native keyboard + controlled state">
    <div className="cg-stack"><CheckboxField label="我已审核当前视觉方案" description="勾选后可开启下一阶段验收" checked={agreed} onChange={e=>setAgreed(e.target.checked)}/>
     <SwitchField label="启用通知" description="使用 Switch 控制单项开关" checked={enabled} onCheckedChange={setEnabled}/>
     <span className="cg-hint">当前选择：{agreed?"已审核":"未审核"} · 通知{enabled?"开启":"关闭"}</span>
    </div>
   </Specimen>
   <Specimen id="tabs" title="Tabs" caption="Arrow keys / Home / End">
    <Tabs label="信息面板" value={tab} onValueChange={setTab} items={[
     {value:"overview",label:"概览",content:"将组件用于不同页面时，内容层级由业务决定。"},
     {value:"activity",label:"活动记录",content:"通过左右方向键切换标签页，聚焦内容后使用 Tab 导航。"},
     {value:"settings",label:"配置",content:"标签页语义与视觉风格保持独立。"},
     {value:"disabled",label:"不可用",disabled:true,content:"此页面被禁用。"}
    ]}/>
   </Specimen>
   <Specimen id="feedback" title="Alerts & Toast" caption="visible recovery and status">
    <div className="cg-stack">
      <div className="cg-row"><Button variant="secondary" size="sm" onClick={()=>{setAlert(true);setNoticeTone("info");}}>信息</Button>
      <Button variant="secondary" size="sm" onClick={()=>{setAlert(true);setNoticeTone("success");}}>成功</Button>
      <Button variant="secondary" size="sm" onClick={()=>{setAlert(true);setNoticeTone("warning");}}>警告</Button>
      <Button variant="secondary" size="sm" onClick={()=>{setAlert(true);setNoticeTone("danger");}}>错误</Button></div>
      {alert?<Alert title="状态反馈示例" tone={noticeTone} dismiss={()=>setAlert(false)}>
        这个提示能够关闭；危险状态使用 alert 角色，普通状态保持 status 语义。</Alert>:
       <Button variant="ghost" size="sm" onClick={()=>setAlert(true)}>恢复提示</Button>}
      <Button variant="ghost" onClick={()=>setToast(true)}>触发 Toast →</Button>
    </div>
   </Specimen>
   <Specimen id="progress" title="Progress & Skeleton" caption="determinate / loading placeholder">
    <div className="cg-stack"><Progress value={progress} label="构建进度"/>
      <div className="cg-row"><Button variant="secondary" size="sm" onClick={()=>setProgress(Math.max(0,progress-10))}>−10%</Button>
      <Button variant="secondary" size="sm" onClick={()=>setProgress(Math.min(100,progress+10))}>+10%</Button></div>
      <Skeleton width="72%" height={12}/><Skeleton width="96%" height={12}/><Skeleton width="44%" height={12}/>
    </div>
   </Specimen>
   <Specimen id="data" title="Data List" caption="selectable records / empty state">
      <DataList items={rows} selectedId={selected} onSelect={setSelected} label="项目记录"/>
      <span className="cg-hint">当前选择：{rows.find(x=>x.id===selected)?.title}</span>
   </Specimen>
   <Specimen id="cards" title="Cards & Empty" caption="modular composition">
     <Card heading="可组合信息卡片" description="不同风格的卡片有不同的信息密度和结构" footer={<><Button size="sm">创建</Button><Button size="sm" variant="ghost">了解更多</Button></>}>
       <p className="cg-text">卡片负责组织局部内容，不能代替整套页面的信息架构。</p>
     </Card>
     <EmptyState title="目前没有更多记录" description="空态需要描述原因，并提供下一步操作。" action={<Button variant="secondary" size="sm">浏览参考案例</Button>}/>
   </Specimen>
  </div>
  <div className="cg-end">本展厅展示的是组件级的四主题视觉映射；完整页面排版差异请参阅 Style Explorer。未经生产集成验收。</div>
  <Dialog open={dialog} onOpenChange={setDialog} title="确认当前操作"
   description="原生 dialog 提供焦点与 Escape 基础行为。"
   footer={<><Button variant="secondary" onClick={()=>setDialog(false)}>取消</Button><Button onClick={()=>{setDialog(false);setToast(true);}}>确认</Button></>}>
    <p className="cg-text">所有操作均为本地模拟。关闭弹窗后可继续体验其他组件。</p>
  </Dialog>
  <Toast open={toast} message="操作已完成（本地演示）" onDismiss={()=>setToast(false)}
   action={{label:"撤销",onClick:()=>setToast(false)}}/>
 </ThemeSurface>
 </div>;
}
const root=document.getElementById("root");
if(!root)throw new Error("Gallery root missing");
createRoot(root).render(<App/>);
