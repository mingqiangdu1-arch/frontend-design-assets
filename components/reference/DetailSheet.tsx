import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {X} from 'lucide-react';
import {Button} from './Button';
export interface DetailSheetProps{open:boolean;onOpenChange:(open:boolean)=>void;title:string;description?:string;footer?:React.ReactNode;children:React.ReactNode}
export function DetailSheet({open,onOpenChange,title,description,footer,children}:DetailSheetProps){
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal><Dialog.Overlay className="aw-dialog-overlay"/>
      <Dialog.Content className="aw-sheet-content">
      <header className="aw-sheet-head"><div><Dialog.Title className="aw-dialog-title">{title}</Dialog.Title>
      <Dialog.Description className="aw-caption">{description||'详细信息'}</Dialog.Description></div>
      <Dialog.Close asChild><Button variant="ghost" iconOnly aria-label="关闭详情"><X size={18}/></Button></Dialog.Close></header>
      <div className="aw-sheet-body">{children}</div>
      {footer&&<footer className="aw-dialog-foot">{footer}</footer>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
