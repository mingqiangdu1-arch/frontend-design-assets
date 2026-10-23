import * as React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import {motion,useReducedMotion} from 'motion/react';
export interface TabEntry{value:string;label:string;content:React.ReactNode}
export interface AnimatedTabsProps{tabs:TabEntry[];value:string;onChange:(value:string)=>void;id?:string}
export function AnimatedTabs({tabs,value,onChange,id='aw-tabs'}:AnimatedTabsProps){
  const reduceMotion=useReducedMotion();
  return <Tabs.Root value={value} onValueChange={onChange}>
    <Tabs.List className="aw-tabs" aria-label="内容视图">
    {tabs.map(tab=><Tabs.Trigger key={tab.value} value={tab.value} className="aw-react-tab">
      {tab.label}{tab.value===value&&<motion.span className="aw-react-tab-indicator" layoutId={id+'-indicator'} transition={reduceMotion?{duration:0}:{duration:.18,ease:[.2,.75,.25,1]}}/>}
    </Tabs.Trigger>)}</Tabs.List>
    {tabs.map(tab=><Tabs.Content key={tab.value} value={tab.value} className="aw-tab-content">{tab.content}</Tabs.Content>)}
  </Tabs.Root>;
}
