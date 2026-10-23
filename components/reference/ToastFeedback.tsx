import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
export interface ToastItem{id:string;title:string;description?:string}
interface ToastAPI{notify:(title:string,description?:string)=>void}
const Context=React.createContext<ToastAPI|undefined>(undefined);
let sequence=0;
export function ToastFeedbackProvider({children}:{children:React.ReactNode}){
  const [queue,setQueue]=React.useState<ToastItem[]>([]);
  const notify=React.useCallback((title:string,description?:string)=>setQueue(old=>[...old,{id:'t'+(++sequence),title,description}]),[]);
  return <Context.Provider value={{notify}}><Toast.Provider swipeDirection="right" duration={3500}>
    {children}
    {queue.map(t=><Toast.Root key={t.id} className="aw-react-toast" onOpenChange={open=>{if(!open)setQueue(q=>q.filter(x=>x.id!==t.id));}}>
      <Toast.Title>{t.title}</Toast.Title>
      {t.description&&<Toast.Description className="aw-toast-description">{t.description}</Toast.Description>}
      <Toast.Close aria-label="关闭提示" className="aw-toast-close">×</Toast.Close>
    </Toast.Root>)}
    <Toast.Viewport className="aw-react-toast-viewport"/>
  </Toast.Provider></Context.Provider>;
}
export function useToastFeedback(){
  const api=React.useContext(Context);
  if(!api)throw Error('useToastFeedback must be inside ToastFeedbackProvider');
  return api.notify;
}
