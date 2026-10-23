import * as React from 'react';
import {Layers2,PanelLeftClose,PanelLeftOpen} from 'lucide-react';
export interface NavEntry{id:string;label:string;icon:React.ReactNode}
export interface AppShellProps{
 brand?:string;nav:NavEntry[];current:string;onNavigate:(id:string)=>void;
 header?:React.ReactNode;actions?:React.ReactNode;children:React.ReactNode
}
export function AppShell({brand='AI Workflow',nav,current,onNavigate,header,actions,children}:AppShellProps){
  const [collapsed,setCollapsed]=React.useState(false);
  return <div className={'aw-app '+(collapsed?'is-collapsed':'')}>
    <aside className="aw-sidebar" aria-label="主导航">
      <div className="aw-sidebar-brand"><span className="aw-brand-icon"><Layers2 size={16}/></span><span className="aw-brand-label">{brand}</span></div>
      <div className="aw-side-label">WORKSPACE</div>
      <nav className="aw-nav" aria-label="工作区导航">
      {nav.map(item=><button key={item.id} type="button" className="aw-nav-item" title={item.label} aria-current={item.id===current?'page':undefined} onClick={()=>onNavigate(item.id)}>
        <span className="aw-nav-icon">{item.icon}</span><span className="aw-nav-label">{item.label}</span>
      </button>)}</nav>
      <div className="aw-sidebar-spacer"/>
      <button className="aw-nav-item" type="button" onClick={()=>setCollapsed(v=>!v)} aria-label={collapsed?'展开侧栏':'折叠侧栏'}>
        <span className="aw-nav-icon">{collapsed?<PanelLeftOpen size={18}/>:<PanelLeftClose size={18}/>}</span><span className="aw-nav-label">折叠侧栏</span>
      </button>
    </aside>
    <div className="aw-main">
      <header className="aw-topbar"><div className="aw-breadcrumb">{header}</div><div className="aw-topbar-actions">{actions}</div></header>
      <main className="aw-content"><div className="aw-content-inner">{children}</div></main>
    </div>
  </div>;
}
