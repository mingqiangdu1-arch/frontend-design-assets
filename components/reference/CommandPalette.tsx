import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Search} from 'lucide-react';
export interface CommandItem{id:string;label:string;keywords?:string[];group?:string;action:()=>void}
export interface CommandPaletteProps{items:CommandItem[];open:boolean;onOpenChange:(open:boolean)=>void}
/** Mount exactly once at app-shell level. Screen-reader and key behavior require app-level QA. */
export function CommandPalette({items,open,onOpenChange}:CommandPaletteProps){
  const [query,setQuery]=React.useState('');
  const [selected,setSelected]=React.useState(0);
  const visible=React.useMemo(()=>items.filter(item=>(item.label+' '+(item.keywords||[]).join(' ')).toLowerCase().includes(query.trim().toLowerCase())),[items,query]);
  React.useEffect(()=>setSelected(0),[query]);
  React.useEffect(()=>{
    const handle=(e:KeyboardEvent)=>{
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();onOpenChange(!open);}
    };
    window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle);
  },[open,onOpenChange]);
  const run=(item:CommandItem)=>{onOpenChange(false);item.action()};
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal><Dialog.Overlay className="aw-dialog-overlay"/>
      <Dialog.Content className="aw-dialog-content aw-command">
        <Dialog.Title className="aw-visually-hidden">全局命令菜单</Dialog.Title>
        <Dialog.Description className="aw-visually-hidden">搜索命令，方向键选择，回车执行，Escape 关闭。</Dialog.Description>
        <div className="aw-command-search"><Search size={16}/><input autoFocus className="aw-command-input" value={query} onChange={e=>setQuery(e.target.value)} role="combobox" aria-label="搜索命令" aria-controls="aw-command-list" aria-expanded="true" aria-activedescendant={visible[selected]?'aw-cmd-'+visible[selected].id:undefined}
          onKeyDown={e=>{
            if(e.key==='ArrowDown'){e.preventDefault();setSelected(i=>(i+1)%Math.max(visible.length,1))}
            if(e.key==='ArrowUp'){e.preventDefault();setSelected(i=>(i+Math.max(visible.length,1)-1)%Math.max(visible.length,1))}
            if(e.key==='Enter'&&visible[selected]){e.preventDefault();run(visible[selected])}
          }} placeholder="搜索页面或命令…"/></div>
        <div id="aw-command-list" role="listbox" className="aw-command-results">
        {visible.length===0?<p className="aw-caption">没有找到相应命令</p>:visible.map((item,i)=>
          <button type="button" key={item.id} id={'aw-cmd-'+item.id} role="option" aria-selected={i===selected} className="aw-command-option" onMouseEnter={()=>setSelected(i)} onClick={()=>run(item)}>
          <span>{item.label}</span><span className="aw-caption">{item.group}</span></button>)}
        </div>
        <footer className="aw-dialog-foot"><span>↑↓ 选择 · Enter 执行</span><span>Esc 关闭</span></footer>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
