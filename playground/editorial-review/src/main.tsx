import * as React from "react";
import {createRoot} from "react-dom/client";
import {ThemeSurface,Button,Badge,Card,TextField,Tabs,Dialog,Toast,Avatar,Progress,EmptyState} from "../../../packages/ui/src/index";
import "../../../styles/editorial-warm/tokens.css";
import "./styles.css";
import {articles,statusLabels,filterArticles,setStatus,undoStatus,readyRate,type Article,type Status} from "./model";

type Filter="all"|Status;
const statuses:Filter[]=["all","draft","review","ready"];
const labels:{[K in Filter]:string}={all:"All stories",draft:"Draft",review:"In review",ready:"Ready"};
const tones:{[K in Status]:"neutral"|"warning"|"success"}={draft:"neutral",review:"warning",ready:"success"};
function App(){
 const [items,setItems]=React.useState<Article[]>(articles);
 const [query,setQuery]=React.useState("");
 const [filter,setFilter]=React.useState<Filter>("all");
 const [selectedId,setSelectedId]=React.useState(articles[0].id);
 const [tab,setTab]=React.useState("summary");
 const [preview,setPreview]=React.useState(false);
 const [toast,setToast]=React.useState<string|null>(null);
 const [change,setChange]=React.useState<{id:string;from:Status;to:Status}|null>(null);
 const selected=items.find(x=>x.id===selectedId);
 const list=filterArticles(items,query,filter);
 function update(next:Status){
  if(!selected)return;
  const outcome=setStatus(items,selected.id,next);
  if(!outcome.undo)return;
  setItems(outcome.items);setChange(outcome.undo);
  setToast(selected.id+" moved to "+statusLabels[next]+" (local only)");
 }
 function undo(){
  setItems(current=>undoStatus(current,change));
  setChange(null);setToast("Last status change reversed locally");
 }
 return <ThemeSurface theme="editorial-warm" className="folio-root">
  <a href="#stories" className="folio-skip">跳转至稿件目录</a>
  <header className="folio-header">
   <div className="folio-brand">folio<span>·</span> <small>EDITORIAL ROOM</small></div>
   <nav aria-label="站内导航"><a href="#stories">稿件目录</a><a href="#guidelines">编辑原则</a></nav>
   <span className="folio-context">A REACT COMPOSITION / V0.12</span>
  </header>
  <main>
   <section className="folio-hero"><span className="folio-kicker">THE WORK BEHIND THE WORDS / VOL. 01</span>
    <h1>Good writing deserves<br/><em>room to breathe.</em></h1>
    <p>把文字、审阅与下一步选择放在一个安静的空间。这里是内容团队的页面结构实验，不是真正的发布系统。</p>
    <div className="folio-stripe"><span>EDITORIAL SYSTEMS</span><span>RESEARCH IN PROGRESS · 2026</span></div>
   </section>
   <section id="stories" tabIndex={-1} className="folio-content" aria-label="稿件工作区">
    <div className="folio-section-head"><div><span className="folio-kicker">THE READING DESK / 01</span><h2>稿件与审阅</h2></div><p>编辑状态会即时变化，但不会写入任何服务器。</p></div>
    <div className="folio-metrics">
     <Card><div><small>IN REVIEW</small><strong>{items.filter(x=>x.status==="review").length}</strong></div></Card>
     <Card><div><small>READY TO REVIEW</small><strong>{items.filter(x=>x.status==="ready").length}</strong></div></Card>
     <Card><Progress label="Ready for review" value={readyRate(items)}/><small>Prepared stories of {items.length}</small></Card>
    </div>
    <div className="folio-layout">
     <section className="folio-library" aria-labelledby="libraryTitle">
      <header className="folio-list-head"><h3 id="libraryTitle">The collection</h3><span>{list.length} / {items.length} pieces</span></header>
      <div className="folio-controls"><TextField label="Search stories" placeholder="Title, author, section..." value={query} onChange={e=>setQuery(e.target.value)}/>
       <div role="group" aria-label="Filter article status" className="folio-filters">{statuses.map(s=><button key={s} data-filter={s} type="button" aria-pressed={filter===s} onClick={()=>setFilter(s)}>{labels[s]}</button>)}</div></div>
      <div className="folio-list" aria-label="Filtered editorial stories">
       {list.length?list.map((item,i)=><button type="button" key={item.id} data-story-id={item.id} aria-pressed={selectedId===item.id}
        className="folio-story" onClick={()=>{setSelectedId(item.id);setTab("summary");}}>
        <span className="folio-story-order">{String(i+1).padStart(2,"0")}</span>
        <span className="folio-story-copy"><small>{item.section.toUpperCase()} / {item.minutes} MIN READ</small><strong>{item.title}</strong><span>{item.excerpt}</span>
        <em>{item.author} · {item.date}</em></span>
        <Badge tone={tones[item.status]}>{statusLabels[item.status]}</Badge>
       </button>):<EmptyState title="没有符合条件的稿件" description="清除搜索词或重新选择筛选。" action={<Button variant="secondary" size="sm" onClick={()=>{setQuery("");setFilter("all");}}>清除筛选</Button>}/>}
      </div>
     </section>
     <aside className="folio-review" aria-label="Selected story inspector">
      <span className="folio-kicker">EDITOR'S NOTES / 02</span>
      {selected?<div key={selected.id}>
       <h3>{selected.title}</h3><p>{selected.excerpt}</p>
       <div className="folio-byline"><Avatar name={selected.author}/><span>{selected.author}<small>Contributing author · {selected.section}</small></span></div>
       <Tabs label="Story information" value={tab} onValueChange={setTab} items={[
        {value:"summary",label:"Summary",content:<div className="folio-facts"><span>Reference ID</span><b>{selected.id}</b><span>Reading time</span><b>{selected.minutes} minutes</b><span>Status</span><Badge tone={tones[selected.status]}>{statusLabels[selected.status]}</Badge></div>},
        {value:"notes",label:"Review notes",content:<p className="folio-muted">This example has no connected comments or saved review history. A real CMS would require permissions and a revision trail.</p>}
       ]}/>
       <div className="folio-review-actions"><h4>Local status decision</h4><div role="group" aria-label="Set story status"><Button size="sm" variant="secondary" disabled={selected.status==="draft"} onClick={()=>update("draft")}>Draft</Button><Button size="sm" variant="secondary" disabled={selected.status==="review"} onClick={()=>update("review")}>In review</Button><Button size="sm" disabled={selected.status==="ready"} onClick={()=>update("ready")}>Ready</Button></div></div>
       <Button variant="secondary" onClick={()=>setPreview(true)}>Read full sample ↗</Button>
       <p className="folio-disclaimer">状态修改和阅读预览仅发生在浏览器内存中，不表示内容已发布。</p>
      </div>:<EmptyState title="请选择稿件" description="从左侧目录选择一篇文章。"/>}
     </aside>
    </div>
   </section>
   <section className="folio-principles" id="guidelines"><span className="folio-kicker">EDITORIAL INTENT</span><h2>A clearer page,<br/>a quieter decision.</h2><p>这套 React 页面复用了真正的按钮、输入、标签、卡片、进度、弹窗与反馈组件，但不复用 Precision Dark 专业工作台的应用外壳。不同应用，必须拥有独立的信息架构。</p></section>
  </main>
  <footer className="folio-footer"><span>folio· / ORIGINAL DESIGN RESEARCH</span><span>NO LIVE CMS · NO PUBLISHING</span></footer>
  <Dialog open={preview} onOpenChange={setPreview} title={selected?.title||"Sample preview"} description="Local mock article · not published"
   footer={<Button onClick={()=>setPreview(false)}>返回审阅</Button>}>
    <div className="folio-dialog-body">{selected?.body.map((p,i)=><p key={i}>{p}</p>)}</div>
  </Dialog>
  <Toast open={toast!==null} message={toast||""} onDismiss={()=>{setToast(null);setChange(null);}} action={change?{label:"Undo",onClick:undo}:undefined}/>
 </ThemeSurface>;
}
const mount=document.getElementById("root");if(!mount)throw Error("Missing root");
createRoot(mount).render(<App/>);
