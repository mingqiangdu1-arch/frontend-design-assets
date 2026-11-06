import * as React from "react";
import {StateMatrix} from "./StateMatrix";
import {createRoot} from "react-dom/client";
import {ThemeSurface,Button,Badge,Card,TextField,TextAreaField,SelectField,CheckboxField,SwitchField,
 Tabs,Alert,Progress,Skeleton,Dialog,EmptyState,Avatar,DataList,Toast,
 DataTable,TreeView,Combobox,Popover,DualRangeField,
 CommandMenu,DatePicker,ResizablePanels,FileUpload,
 Tooltip,Breadcrumb,Pagination,Accordion,SidebarNav,
 FormWizard,RepeatableFields,ValidationSummary,Sparkline,DashboardGrid,
 FilterableDataTable,KanbanBoard,ActivityTimeline,InteractiveBarChart,
 EditableDataTable,SortableList,FlowEditor,AdvancedFilterPanel,
 type RepeatableFieldItem,type KanbanCard,type EditableTableColumn,type SortableListItem,
 type FlowNode,type FlowEdge,type AdvancedFilterValue,type DataTableColumn,type DataTableSort,type ThemeId,type Tone} from "../../../packages/ui/src/index";
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
type ReviewRow={id:string;project:string;priority:number;state:string};
const reviewRows:ReviewRow[]=[
 {id:"Q-01",project:"Atlas Map",priority:3,state:"需审查"},
 {id:"Q-02",project:"Workshop",priority:1,state:"已核对"},
 {id:"Q-03",project:"Archive",priority:2,state:"待处理"}
];
const reviewColumns:DataTableColumn<ReviewRow>[]=[
 {key:"project",header:"项目",sortable:true,cell:r=>r.project},
 {key:"priority",header:"优先级",sortable:true,cell:r=>"P"+r.priority},
 {key:"state",header:"状态",cell:r=>r.state}
];
const folderTree=[
 {id:"docs",label:"设计资料",children:[
  {id:"visual",label:"视觉研究"},
  {id:"interaction",label:"高级交互",children:[
   {id:"brush",label:"联动刷选"},{id:"range",label:"范围调节"}]}
 ]},
 {id:"examples",label:"应用示例"},
 {id:"locked",label:"只读归档",disabled:true}
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
 const [tableSort,setTableSort]=React.useState<DataTableSort>(null);
 const [tableSelection,setTableSelection]=React.useState<string[]>([]);
 const [treeOpen,setTreeOpen]=React.useState<string[]>([]);
 const [treeSelected,setTreeSelected]=React.useState("docs");
 const [city,setCity]=React.useState("tokyo");
 const [popoverOpen,setPopoverOpen]=React.useState(false);
 const [band,setBand]=React.useState<[number,number]>([20,65]);
 const [commandOpen,setCommandOpen]=React.useState(false);
 const [lastCommand,setLastCommand]=React.useState("无");
 const [date,setDate]=React.useState("2026-11-06");
 const [splitSize,setSplitSize]=React.useState(45);
 const [localFiles,setLocalFiles]=React.useState<File[]>([]);
 const [crumbAction,setCrumbAction]=React.useState("未操作");
 const [currentPage,setCurrentPage]=React.useState(1);
 const [openAccordion,setOpenAccordion]=React.useState<string[]>(["usage"]);
 const [activeSection,setActiveSection]=React.useState("workspace");
 const [openSidebar,setOpenSidebar]=React.useState<string[]>(["workspace"]);
 const [wizardStep,setWizardStep]=React.useState("profile");
 const [wizardName,setWizardName]=React.useState("");
 const [wizardDone,setWizardDone]=React.useState(false);
 const [repeatEntries,setRepeatEntries]=React.useState<RepeatableFieldItem[]>([{id:"entry-1",value:"李明"}]);
 const repeatSeq=React.useRef(2);
 const [showValidation,setShowValidation]=React.useState(false);
 const [filterQuery,setFilterQuery]=React.useState("");
 const [filterCategory,setFilterCategory]=React.useState("all");
 const [filterSort,setFilterSort]=React.useState<DataTableSort>(null);
 const [boardCards,setBoardCards]=React.useState<KanbanCard[]>([
  {id:"task-1",title:"定义数据结构",columnId:"todo",description:"明确输入与输出"},
  {id:"task-2",title:"制作交互实例",columnId:"doing",description:"完成键盘与拖拽路径"},
  {id:"task-3",title:"合并前检查",columnId:"done",disabled:true}
 ]);
 const [selectedEvent,setSelectedEvent]=React.useState("event-2");
 const [selectedBar,setSelectedBar]=React.useState("week-2");
 const [editableRows,setEditableRows]=React.useState([
  {id:"E-01",name:"需求分析",state:"进行中"},
  {id:"E-02",name:"产品验收",state:"待开始"}
 ]);
 const editableColumns:EditableTableColumn<(typeof editableRows)[number]>[]=[
  {key:"name",header:"任务名称",getValue:r=>r.name,editable:true,
   validate:value=>value.trim().length<3?"任务名称至少 3 个字符":undefined},
  {key:"state",header:"状态",getValue:r=>r.state,editable:true}
 ];
 const [orderedItems,setOrderedItems]=React.useState<SortableListItem[]>([
  {id:"sort-1",label:"收集需求"},{id:"sort-2",label:"梳理流程"},
  {id:"sort-3",label:"设计交互"},{id:"sort-4",label:"完成复盘"}
 ]);
 const [flowNodes,setFlowNodes]=React.useState<FlowNode[]>([
  {id:"flow-1",label:"需求输入",x:20,y:30},
  {id:"flow-2",label:"人工确认",x:50,y:50},
  {id:"flow-3",label:"方案评审",x:80,y:30}
 ]);
 const [flowEdges,setFlowEdges]=React.useState<FlowEdge[]>([
  {id:"edge-1",from:"flow-1",to:"flow-2"}
 ]);
 const edgeSeq=React.useRef(2);
 const [activeFlowNode,setActiveFlowNode]=React.useState("flow-1");
 const [advancedValues,setAdvancedValues]=React.useState<Record<string,AdvancedFilterValue>>({
  keyword:"",status:"",tags:[],important:false,score:{min:null,max:null}
 });
 const [filterApplied,setFilterApplied]=React.useState(0);
 const sortedReviewRows=React.useMemo(()=>!tableSort?reviewRows:
  [...reviewRows].sort((a,b)=>{
   const diff=tableSort.key==="priority"?a.priority-b.priority:
    String(a[tableSort.key as "project"|"state"]).localeCompare(String(b[tableSort.key as "project"|"state"]));
   return tableSort.direction==="asc"?diff:-diff;
  }),[tableSort]);
 const validated=name.length>0&&name.trim().length<3;
 const runLoading=()=>{
  if(busy)return;setBusy(true);setLoading(true);
  window.setTimeout(()=>{setLoading(false);setBusy(false);setToast(true);},550);
 };
 return <div className="cg-app">
 <header className="cg-top">
  <div className="cg-brand"><span className="cg-mark">◈</span><div><strong>Component Library</strong><small>Frontend Design Assets / v0.24</small></div></div>
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
    <p>45 个实际 React 组件，本轮新增单元格编辑、拖拽与键盘排序、节点流程编辑器以及多条件筛选面板。当前是参考实现，尚未进行生产集成认证。</p>
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

   <Specimen id="data-table" title="DataTable" caption="Controlled sort / row selection / native table">
    <DataTable rows={sortedReviewRows} columns={reviewColumns} label="项目审查表"
     sort={tableSort} onSortChange={setTableSort}
     selectedIds={tableSelection} onSelectedIdsChange={setTableSelection}
     selectLabel={row=>row.project}/>
    <span className="cg-hint">当前已选：{tableSelection.join("、")||"无"} · 排序由上层控制，表格不执行远程查询</span>
   </Specimen>
   <Specimen id="tree-view" title="TreeView" caption="Controlled expand / keyboard tree navigation">
    <TreeView label="素材目录" items={folderTree} expandedIds={treeOpen}
     onExpandedIdsChange={setTreeOpen} selectedId={treeSelected} onSelect={setTreeSelected}/>
    <span className="cg-hint">当前节点：{treeSelected} · 方向键、Home/End、Enter 可操作</span>
   </Specimen>
   <Specimen id="combobox" title="Combobox" caption="Type to filter / Arrow + Enter / Escape">
    <Combobox label="目标城市" value={city} onValueChange={setCity}
     options={[{value:"tokyo",label:"东京 Tokyo"},{value:"singapore",label:"新加坡 Singapore"},
       {value:"shenzhen",label:"深圳 Shenzhen"},{value:"pending",label:"尚未开放",disabled:true}]}
     hint="搜索、方向键与禁用选项演示；只在页面内保存"/>
    <span className="cg-hint">已选择：{city}</span>
   </Specimen>
   <Specimen id="popover" title="Popover" caption="Controlled nonmodal dialog / Escape / outside click">
    <div className="cg-row">
     <Popover label="操作面板" trigger="更多操作" open={popoverOpen} onOpenChange={setPopoverOpen}>
      <strong>当前条目</strong>
      <p>此面板不是模态对话框，允许点击外部区域关闭。</p>
      <button type="button" onClick={()=>{setPopoverOpen(false);setToast(true);}}>确认本地操作</button>
     </Popover>
     <span className="cg-hint">弹层为主题作用域内的受控组件</span>
    </div>
   </Specimen>
   <Specimen id="dual-range" title="DualRangeField" caption="Min span / step clamp / native range and number">
    <DualRangeField label="参数区间" min={0} max={100} step={5} minSpan={15}
     value={band} onValueChange={setBand} unit="分"/>
    <span className="cg-hint">当前区间：{band[0]}–{band[1]}；两端不会交叉</span>
   </Specimen>

   <Specimen id="command-menu" title="CommandMenu" caption="Grouped command search / keyboard / modal">
    <div className="cg-stack">
     <CommandMenu label="快捷命令" triggerLabel="打开命令菜单" open={commandOpen}
      onOpenChange={setCommandOpen} onSelect={setLastCommand} groups={[
       {id:"create",heading:"创建",items:[
        {id:"new-project",label:"新建项目",description:"仅本地演示",keywords:["create","new"]},
        {id:"new-note",label:"新建笔记",keywords:["note"]}]},
       {id:"tools",heading:"工具",items:[
        {id:"search-assets",label:"查找素材",description:"搜索已登记资产",keywords:["search"]},
        {id:"restricted",label:"删除全部素材",disabled:true}]}
      ]}/>
     <span className="cg-hint">已执行命令：{lastCommand} · 此演示不触发实际数据库操作</span>
    </div>
   </Specimen>
   <Specimen id="date-picker" title="DatePicker" caption="Native date / bounds / clearable">
    <DatePicker label="计划日期" value={date} onValueChange={setDate}
     min="2026-11-01" max="2026-11-30" clearable
     hint="使用浏览器原生日期输入；仅允许 2026 年 11 月"/>
    <span className="cg-hint">当前日期：{date||"未选择"}</span>
   </Specimen>
   <Specimen id="resizable-panels" title="ResizablePanels" caption="Controlled split / pointer / Arrow + Shift">
    <ResizablePanels label="工作区分隔线" size={splitSize} onSizeChange={setSplitSize}
     minSize={25} maxSize={75}
     start={<><strong>素材目录</strong><p className="cg-text">可调整的左侧区域。</p></>}
     end={<><strong>预览内容</strong><p className="cg-text">调整仅保存在此页面。</p></>}/>
    <span className="cg-hint">左侧宽度：{splitSize}% · 分隔线可用方向键、Home/End 调整</span>
   </Specimen>
   <Specimen id="file-upload" title="FileUpload" caption="Native picker / drag drop / validation / no network">
    <FileUpload label="本地参考文件" files={localFiles} onFilesChange={setLocalFiles}
     accept=".txt,image/png" maxFiles={2} maxSizeBytes={1024}
     hint="最多 2 个文件，每个 ≤1KB，仅 TXT/PNG；不执行网络上传"/>
    <span className="cg-hint">已选文件数：{localFiles.length}</span>
   </Specimen>

   <Specimen id="tooltip" title="Tooltip" caption="Hover / focus / Escape / informational only">
    <div className="cg-row">
     <Tooltip label="查看说明" content="这是一段说明文字；悬停或聚焦显示，Escape 关闭。"/>
     <Tooltip label="不可用提示" content="不会显示。" disabled/>
     <span className="cg-hint">提示仅展示纯文本，不用于必需的交互操作</span>
    </div>
   </Specimen>
   <Specimen id="breadcrumb" title="Breadcrumb" caption="Semantic navigation / current page">
    <Breadcrumb label="素材路径" items={[
     {id:"home",label:"素材库",onSelect:()=>setCrumbAction("home")},
     {id:"components",label:"UI 组件",onSelect:()=>setCrumbAction("components")},
     {id:"current",label:"导航组件"}
    ]}/>
    <span className="cg-hint">点击路径：{crumbAction} · 示例仅更新本地状态</span>
   </Specimen>
   <Specimen id="pagination" title="Pagination" caption="Controlled page / ellipsis / boundaries">
    <Pagination label="素材分页" page={currentPage} pageSize={10} totalItems={87}
     onPageChange={setCurrentPage}/>
    <span className="cg-hint">当前页面：{currentPage} / 9 · 实际数据分页由业务层实现</span>
   </Specimen>
   <Specimen id="accordion" title="Accordion" caption="Controlled multi-open / Arrow, Home, End">
    <Accordion label="常见问题" openIds={openAccordion} onOpenIdsChange={setOpenAccordion}
     items={[
      {id:"usage",title:"如何复用组件？",content:<p>加载声明兼容的主题，并通过受控属性接入业务数据。</p>},
      {id:"quality",title:"组件通过什么验证？",content:<p>在仓库 CI 中完成 TypeScript、构建及关键浏览器测试。</p>},
      {id:"locked",title:"尚未开放的内容",content:<p>已禁用，不允许展开。</p>,disabled:true}
     ]}/>
    <span className="cg-hint">展开项：{openAccordion.join("、")||"无"}</span>
   </Specimen>
   <Specimen id="sidebar-nav" title="SidebarNav" caption="Independent active page / nested disclosure">
    <SidebarNav label="多级工作区导航" activeId={activeSection}
     onNavigate={setActiveSection} expandedIds={openSidebar}
     onExpandedIdsChange={setOpenSidebar} items={[
      {id:"workspace",label:"产品工作区",children:[
       {id:"design",label:"设计资产",children:[
        {id:"tokens",label:"设计变量"},
        {id:"interactive",label:"交互组件"}]},
       {id:"research",label:"研究材料"}]},
      {id:"archive",label:"历史归档",disabled:true}
     ]}/>
    <span className="cg-hint">当前页面：{activeSection} · 展开状态与页面选择相互独立</span>
   </Specimen>

   <Specimen id="form-wizard" title="FormWizard" caption="Controlled steps / guarded Next / host completion">
    <FormWizard label="项目建立向导" currentStepId={wizardStep} onStepChange={setWizardStep}
     canAdvance={wizardStep!=="profile"||wizardName.trim().length>=3}
     onComplete={()=>setWizardDone(true)} completeLabel="完成模拟流程"
     steps={[
      {id:"profile",title:"基本信息",description:"至少填写三个字符才能进入下一步",
       content:<label className="cg-local-field" htmlFor="wizard-project-name">
        项目名称<input id="wizard-project-name" value={wizardName}
         onChange={e=>setWizardName(e.target.value)} placeholder="至少三个字符"/></label>},
      {id:"details",title:"配置",description:"选择后由真实产品完成权限与数据校验",
       content:<p className="cg-text">此处展示配置说明，不会提交服务器。</p>},
      {id:"review",title:"复核",description:"提交之前需要真实业务方完成校验",
       content:<p className="cg-text">请确认项目名：{wizardName}</p>}
     ]}/>
    <span className="cg-hint">当前步骤：{wizardStep} · 完成回调：{wizardDone?"已触发":"未触发"}</span>
   </Specimen>
   <Specimen id="repeatable-fields" title="RepeatableFields" caption="Stable IDs / bounded add-remove / native inputs">
    <RepeatableFields label="参与人员名单" items={repeatEntries} minItems={1} maxItems={3}
     inputLabel="参与者" placeholder="填写姓名"
     onAdd={()=>{const id="entry-"+repeatSeq.current++;setRepeatEntries(v=>[...v,{id,value:""}]);}}
     onChange={(id,value)=>setRepeatEntries(v=>v.map(item=>item.id===id?{...item,value}:item))}
     onRemove={id=>setRepeatEntries(v=>v.filter(item=>item.id!==id))}/>
    <span className="cg-hint">当前字段 ID：{repeatEntries.map(item=>item.id).join("、")}</span>
   </Specimen>
   <Specimen id="validation-summary" title="ValidationSummary" caption="Error links / explicit host focus / no automatic form submission">
    <div className="cg-stack">
     <div className="cg-row"><label className="cg-local-field" htmlFor="v22-email">电子邮箱
      <input id="v22-email" type="email" placeholder="name@example.com"/></label>
      <label className="cg-local-field" htmlFor="v22-code">项目编号
       <input id="v22-code" placeholder="ABC-001"/></label></div>
     <button type="button" onClick={()=>setShowValidation(v=>!v)}>显示或隐藏错误摘要</button>
     <ValidationSummary label="有字段需要检查"
      issues={showValidation?[
       {id:"email",fieldId:"v22-email",message:"电子邮箱需要检查"},
       {id:"code",fieldId:"v22-code",message:"项目编号需要检查"}
      ]:[]} onNavigate={fieldId=>document.getElementById(fieldId)?.focus()}/>
    </div>
   </Specimen>
   <Specimen id="sparkline" title="Sparkline" caption="Original accessible SVG / supplied numeric values">
    <Sparkline label="审核处理趋势" values={[23,28,21,38,30,42,47,40,53]}
     summary="9 个模拟观测点 · 数据为测试夹具"/>
    <span className="cg-hint">曲线从真实传入数值计算；不连接外部行情或 API。</span>
   </Specimen>
   <Specimen id="dashboard-grid" title="DashboardGrid" caption="Responsive 4→2→1 columns / per-panel span">
    <DashboardGrid label="组件复用仪表盘" items={[
     {id:"overview",title:"资产概览",span:2,description:"本地测试布局，不是实时指标",
      content:<p>支持大卡片跨越两列，并保留语义化标题。</p>},
     {id:"build",title:"构建状态",content:<strong>通过</strong>},
     {id:"quality",title:"验证状态",content:<strong>参考级</strong>},
     {id:"timeline",title:"交付记录",span:4,
      content:<p>桌面跨四列，平板不超过两列，窄屏回到单列。</p>}
    ]}/>
   </Specimen>

   <Specimen id="filterable-data-table" title="FilterableDataTable" caption="Local keyword + category / controlled sort / table composition">
    <FilterableDataTable label="任务筛选表" rows={reviewRows} columns={reviewColumns}
     query={filterQuery} onQueryChange={setFilterQuery}
     category={filterCategory} onCategoryChange={setFilterCategory}
     categories={[{value:"需审查",label:"需审查"},{value:"已核对",label:"已核对"},
      {value:"待处理",label:"待处理"}]}
     getSearchText={row=>row.project+" "+row.state+" P"+row.priority}
     getCategory={row=>row.state}
     sort={filterSort} onSortChange={setFilterSort}
     sortComparators={{priority:(a,b)=>a.priority-b.priority,
      project:(a,b)=>a.project.localeCompare(b.project)}}/>
    <span className="cg-hint">搜索与分类仅过滤本地数据，不发起服务器查询。</span>
   </Specimen>
   <Specimen id="kanban-board" title="KanbanBoard" caption="Controlled columns / native drag-and-drop / select alternative">
    <KanbanBoard label="研发任务看板" columns={[
     {id:"todo",title:"待开始"},{id:"doing",title:"进行中"},{id:"done",title:"已完成"}
    ]} cards={boardCards}
     onMove={(cardId,columnId)=>setBoardCards(v=>
      v.map(card=>card.id===cardId?{...card,columnId}:card))}/>
    <span className="cg-hint">卡片位置由上层状态控制；原生下拉选择可代替拖拽。</span>
   </Specimen>
   <Specimen id="activity-timeline" title="ActivityTimeline" caption="Semantic events / current status / selectable record">
    <ActivityTimeline label="项目活动记录" selectedId={selectedEvent}
     onSelect={setSelectedEvent} events={[
      {id:"event-1",date:"11 月 1 日",dateTime:"2026-11-01",
       title:"整理需求",description:"完成范围确认",status:"complete"},
      {id:"event-2",date:"11 月 4 日",dateTime:"2026-11-04",
       title:"交互审核",description:"正在复核键盘与焦点行为",status:"current"},
      {id:"event-3",date:"11 月 8 日",dateTime:"2026-11-08",
       title:"项目复盘",description:"计划节点",status:"upcoming"}
     ]}/>
    <span className="cg-hint">当前选中事件：{selectedEvent}</span>
   </Specimen>
   <Specimen id="interactive-bar-chart" title="InteractiveBarChart" caption="Nonnegative values / arrow focus / selected bar">
    <InteractiveBarChart label="每周验证样例" selectedId={selectedBar} onSelect={setSelectedBar}
     unit="项" data={[
      {id:"week-1",label:"第1周",value:6},
      {id:"week-2",label:"第2周",value:11},
      {id:"week-3",label:"第3周",value:4},
      {id:"week-4",label:"第4周",value:15}
     ]}/>
    <span className="cg-hint">选中柱：{selectedBar} · 数字为演示样本，不代表真实业务统计。</span>
   </Specimen>

   <Specimen id="editable-data-table" title="EditableDataTable" caption="Explicit commit / field validation / Escape cancel">
    <EditableDataTable label="可编辑任务表" rows={editableRows} columns={editableColumns}
     onCellCommit={(rowId,key,value)=>setEditableRows(v=>v.map(row=>
      row.id===rowId?{...row,[key]:value}:row))}/>
    <span className="cg-hint">内容由页面状态维护；保存按钮只触发回调，不写入远程数据库。</span>
   </Specimen>
   <Specimen id="sortable-list" title="SortableList" caption="HTML drag / keyboard-accessible up-down actions">
    <SortableList label="可排序流程步骤" items={orderedItems}
     onReorder={ids=>setOrderedItems(v=>ids.map(id=>v.find(item=>item.id===id)!))}/>
    <span className="cg-hint">当前顺序：{orderedItems.map(x=>x.label).join(" → ")}</span>
   </Specimen>
   <Specimen id="flow-editor" title="FlowEditor" caption="Controlled positions / pointer and arrows / directed edges">
    <FlowEditor label="流程节点编辑器" nodes={flowNodes} edges={flowEdges}
     selectedId={activeFlowNode} onSelect={setActiveFlowNode}
     onNodesChange={setFlowNodes}
     onAddEdge={(from,to)=>setFlowEdges(v=>
      [...v,{id:"edge-"+edgeSeq.current++,from,to}])}/>
    <span className="cg-hint">节点：{activeFlowNode} · 连线：{flowEdges.length} 条 · 不执行实际工作流</span>
   </Specimen>
   <Specimen id="advanced-filter-panel" title="AdvancedFilterPanel" caption="Text / select / multi / toggle / bounded range">
    <AdvancedFilterPanel label="高级任务筛选" values={advancedValues}
     fields={[
      {id:"keyword",label:"关键词",kind:"text"},
      {id:"status",label:"处理状态",kind:"select",
       options:[{value:"pending",label:"待处理"},{value:"done",label:"已完成"}]},
      {id:"tags",label:"任务标签",kind:"multi",
       options:[{value:"design",label:"设计"},{value:"test",label:"测试"}]},
      {id:"important",label:"仅显示重要任务",kind:"toggle"},
      {id:"score",label:"评分区间",kind:"range",min:0,max:100}
     ]}
     onChange={(id,value)=>setAdvancedValues(v=>({...v,[id]:value}))}
     onApply={()=>setFilterApplied(v=>v+1)}
     onReset={()=>setAdvancedValues({keyword:"",status:"",tags:[],
      important:false,score:{min:null,max:null}})}/>
    <span className="cg-hint">已执行本地筛选动作：{filterApplied} 次；宿主应用负责真实筛选。</span>
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
createRoot(root).render(new URLSearchParams(window.location.search).get("view")==="matrix"?<StateMatrix/>:<App/>);
