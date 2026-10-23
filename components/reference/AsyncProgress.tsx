import * as React from 'react';
import {StatusBadge,StatusTone} from './StatusBadge';
export type ExecutionState='idle'|'running'|'completed'|'failed'|'cancelled';
const labels:Record<ExecutionState,string>={idle:'未启动',running:'执行中',completed:'已完成',failed:'执行失败',cancelled:'已中止'};
const tones:Record<ExecutionState,StatusTone>={idle:'neutral',running:'info',completed:'success',failed:'danger',cancelled:'warning'};
export interface AsyncProgressProps{state:ExecutionState;currentStep:number;steps:string[];onCancel?:()=>void}
export function AsyncProgress({state,currentStep,steps,onCancel}:AsyncProgressProps){
  const completed=state==='completed'?steps.length:Math.min(Math.max(currentStep,0),steps.length);
  return <section className="aw-panel" aria-label="执行状态">
    <div className="aw-row-between"><strong>任务执行过程</strong><StatusBadge tone={tones[state]}>{labels[state]}</StatusBadge></div>
    <div className="aw-progress-track" role="progressbar" aria-label="已完成步骤" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={completed}>
      <div className="aw-progress-fill" style={{width:(steps.length?completed/steps.length*100:0)+'%'}}/></div>
    <ol className="aw-steps">{steps.map((step,i)=><li key={i} className={i<completed?'is-done':state==='running'&&i===completed?'is-current':''}>{step}</li>)}</ol>
    {state==='running'&&onCancel&&<button type="button" className="aw-button aw-button--secondary aw-button--md" onClick={onCancel}>中止执行</button>}
  </section>;
}
