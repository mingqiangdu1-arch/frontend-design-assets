import * as React from "react";
import {createRoot} from "react-dom/client";
import {ThemeSurface,Button,Badge,Card,TextField,Tabs,Progress,Avatar,Toast,Dialog,Alert} from "../../../packages/ui/src/index";
import "../../../styles/precision-dark/tokens.css";
import "./styles.css";
import {initial,labels,statusList,filterItems,completion,updateStatus,rollback,type Item,type Status,type UndoSnapshot} from "./model";

type Filter="all"|Status;
const tones:{[K in Status]:"neutral"|"info"|"success"}={open:"neutral",review:"info",done:"success"};
function App(){
 const [items,setItems]=React.useState<Item[]>(initial);
 const [query,setQuery]=React.useState("");
 const [filter,setFilter]=React.useState<Filter>("all");
 const [selectedId,setSelectedId]=React.useState(initial[0].id);
 const [inspector,setInspector]=React.useState(false);
 const [commandsOpen,setCommandsOpen]=React.useState(false);
 const [commandSearch,setCommandSearch]=React.useState("");
 const [detailTab,setDetailTab]=React.useState("details");
 const [toast,setToast]=React.useState<string|null>(null);
 const [snapshot,setSnapshot]=React.useState<UndoSnapshot|null>(null);
 const searchRef=React.useRef<HTMLInputElement>(null);
 const commandRef=React.useRef<HTMLInputElement>(null);
 const shown=React.useMemo(()=>filterItems(items,query,filter),[items,query,filter]);
 const selected=items.find(x=>x.id===selectedId);
 React.useEffect(()=>{
  const onKey=(event:KeyboardEvent)=>{
   const target=event.target;
   const typing=target instanceof HTMLInputElement||target instanceof HTMLTextAreaElement||(target instanceof HTMLElement&&target.isContentEditable);
   if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){
    event.preventDefault();setCommandsOpen(true);return;
   }
   if(!typing&&!commandsOpen&&event.key==="/"){event.preventDefault();searchRef.current?.focus();}
  };
  window.addEventListener("keydown",onKey);
  return()=>window.removeEventListener("keydown",onKey);
 },[commandsOpen]);
 React.useEffect(()=>{if(commandsOpen)commandRef.current?.focus();else setCommandSearch("");},[commandsOpen]);
 function choose(id:string){setSelectedId(id);setInspector(true);setDetailTab("details");}
 function change(status:Status){
  if(!selected)return;
  const result=updateStatus(items,selected.id,status);
  if(!result.snapshot)return;
  setItems(result.items);setSnapshot(result.snapshot);setToast(selected.id+" moved to "+labels[status]+" · Local demo");
 }
 function undo(){setItems(current=>rollback(current,snapshot));setSnapshot(null);setToast("Latest change reversed · Local demo");}
 const commands=[
  {id:"search",title:"Focus search",hint:"/",run:()=>searchRef.current?.focus()},
  {id:"open",title:"Show open issues",hint:"Filter",run:()=>setFilter("open")},
  {id:"all",title:"Show all issues",hint:"Filter",run:()=>setFilter("all")},
  {id:"first",title:"Open first issue",hint:"Navigate",run:()=>choose(items[0].id)}
 ].filter(c=>c.title.toLowerCase().includes(commandSearch.toLowerCase()));
 const active=items.filter(x=>x.status!=="done").length,review=items.filter(x=>x.status==="review").length;
 return <ThemeSurface theme="precision-dark" className="orbit-root">
  <header className="orbit-top">
   <a className="orbit-brand" href="#main"><span className="orbit-mark">◈</span><span><strong>orbit</strong><small>REFERENCE / 0.9</small></span></a>
   <span className="orbit-breadcrumb">Workspaces <i>/</i> Product engineering</span>
   <div className="orbit-topright"><Button variant="secondary" size="sm" onClick={()=>setCommandsOpen(true)} aria-label="Open command palette">⌘ K <span>Commands</span></Button><Avatar name="Will" size="sm"/></div>
  </header>
  <div className="orbit-layout">
   <aside className="orbit-sidebar" aria-label="Workspace navigation">
    <div className="orbit-team"><span className="orbit-team-mark">P</span><span><strong>Product Lab</strong><small>Reference workspace</small></span><span>⌄</span></div>
    <span className="orbit-nav-caption">WORKSPACE</span>
    <nav aria-label="Sections">
     <button className={filter==="all"?"is-active":""} type="button" onClick={()=>{setFilter("all");setQuery("");}}>▣ <span>All work</span><small>{items.length}</small></button>
     <button className={filter==="open"?"is-active":""} type="button" onClick={()=>setFilter("open")}>◌ <span>Open queue</span><small>{items.filter(x=>x.status==="open").length}</small></button>
     <button className={filter==="review"?"is-active":""} type="button" onClick={()=>setFilter("review")}>◇ <span>In review</span></button>
     <button className={filter==="done"?"is-active":""} type="button" onClick={()=>setFilter("done")}>✓ <span>Completed</span></button>
    </nav>
    <div className="orbit-sidebar-footer"><strong>RESEARCH PROTOTYPE</strong><p>No backend, no persistence, no approval claims.</p></div>
   </aside>
   <main id="main" className="orbit-main">
    <div className="orbit-intro"><div><span className="orbit-eyebrow">ENGINEERING / WORK QUEUE</span><h1>Work items <span>{items.length}</span></h1><p>Keep decisions visible. Inspect without leaving the context.</p></div><Button variant="secondary" size="md" onClick={()=>setCommandsOpen(true)}>⌕ Quick actions</Button></div>
    <div className="orbit-stats">
     <Card><div className="orbit-stat"><span>Active</span><strong>{active}</strong><small>Open + in review</small></div></Card>
     <Card><div className="orbit-stat"><span>In review</span><strong>{review}</strong><small>Needs a decision</small></div></Card>
     <Card><div className="orbit-stat"><span>Completed</span><strong>{items.length-active}<small> / {items.length}</small></strong><Progress value={completion(items)} label="Work completion"/></div></Card>
    </div>
    <section className="orbit-board" aria-labelledby="board-heading">
     <div className="orbit-board-header"><h2 id="board-heading">Current issues</h2><p>{shown.length} matching records · Local sample data</p></div>
     <div className="orbit-controls">
      <div className="orbit-find"><TextField ref={searchRef} label="Search issues" value={query} onChange={e=>setQuery(e.target.value)} placeholder="ID, title, owner, team…"/><kbd>/</kbd></div>
      <div role="group" aria-label="Filter by status" className="orbit-filters">
       {(["all",...statusList] as Filter[]).map(key=><button key={key} type="button" data-filter={key} aria-pressed={filter===key} onClick={()=>setFilter(key)}>{key==="all"?"All":labels[key]}</button>)}
      </div>
     </div>
     <div className="orbit-issues" aria-label="Filtered issues">
     {shown.length?shown.map(item=><button className="orbit-issue" key={item.id} data-item-id={item.id} type="button" aria-pressed={selectedId===item.id} onClick={()=>choose(item.id)}>
      <span className="orbit-issue-icon">{item.status==="done"?"✓":item.status==="review"?"◇":"◌"}</span>
      <span className="orbit-issue-main"><strong>{item.title}</strong><small>{item.id}<i>·</i>{item.team}</small></span>
      <Badge tone={tones[item.status]}>{labels[item.status]}</Badge><span className="orbit-issue-date">{item.updated}</span>
     </button>):<div className="orbit-empty"><strong>No matching issues</strong><p>Try a different search or reset your filters.</p><Button size="sm" variant="secondary" onClick={()=>{setFilter("all");setQuery("");}}>Clear filters</Button></div>}
     </div>
     <footer className="orbit-board-footer"><span>Ctrl/⌘ K for commands</span><span>{shown.length} of {items.length} visible</span></footer>
    </section>
   </main>
   <aside className={"orbit-inspector "+(inspector?"orbit-inspector--mobile-visible":"")} aria-label="Issue inspector" data-inspector-open={inspector}>
    <div className="orbit-inspector-header"><span>INSPECTOR</span><Button size="sm" variant="ghost" aria-label="Close inspector" onClick={()=>setInspector(false)}>×</Button></div>
    {selected?<div className="orbit-inspector-body"><span className="orbit-eyebrow">ISSUE / {selected.id}</span><h2>{selected.title}</h2><p>{selected.description}</p>
      <div className="orbit-owner"><Avatar name={selected.owner}/><div><strong>{selected.owner}</strong><small>{selected.team}</small></div></div>
      <Tabs label="Issue detail tabs" value={detailTab} onValueChange={setDetailTab} items={[
       {value:"details",label:"Details",content:<div className="orbit-details"><span>Priority</span><strong>{selected.priority}</strong><span>Updated</span><strong>{selected.updated}</strong><span>Status</span><Badge tone={tones[selected.status]}>{labels[selected.status]}</Badge></div>},
       {value:"activity",label:"Activity",content:<p className="orbit-muted">No real activity history is connected in this prototype.</p>}
      ]}/>
      <section className="orbit-update"><h3>Update status</h3><div role="group" aria-label="Set issue status" className="orbit-state-buttons">
        {statusList.map(s=><Button size="sm" key={s} variant={selected.status===s?"primary":"secondary"} disabled={selected.status===s} onClick={()=>change(s)}>{labels[s]}</Button>)}
      </div></section>
      <Alert tone="info" title="Prototype scope">Status edits are local only. A real app needs authorization, server confirmation and rollback.</Alert>
     </div>:<p className="orbit-muted">Select an issue to inspect.</p>}
   </aside>
  </div>
  {inspector&&<button type="button" aria-label="Close mobile inspector" onClick={()=>setInspector(false)} className="orbit-mobile-shade"/>}
  <Dialog open={commandsOpen} onOpenChange={setCommandsOpen} title="Quick commands" description="Choose an action. Ctrl/⌘ K opens this menu." footer={<span className="orbit-muted">Local-only commands</span>}>
    <TextField ref={commandRef} label="Search commands" value={commandSearch} onChange={e=>setCommandSearch(e.target.value)} placeholder="Find an action"/>
    <div className="orbit-commands">{commands.length?commands.map(c=><button key={c.id} type="button" onClick={()=>{setCommandsOpen(false);c.run();}}><span>{c.title}</span><small>{c.hint}</small></button>):<p className="orbit-muted">No matching commands</p>}</div>
  </Dialog>
  <Toast open={toast!==null} message={toast||""} onDismiss={()=>{setToast(null);setSnapshot(null);}} action={snapshot?{label:"Undo",onClick:undo}:undefined}/>
 </ThemeSurface>;
}
const root=document.getElementById("root");if(!root)throw Error("Missing root");
createRoot(root).render(<App/>);
