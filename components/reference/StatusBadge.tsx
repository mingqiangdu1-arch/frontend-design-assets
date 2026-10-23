import * as React from 'react';
export type StatusTone='success'|'info'|'warning'|'danger'|'neutral';
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement>{tone?:StatusTone}
export function StatusBadge({tone='neutral',className='',...rest}:StatusBadgeProps){
  return <span className={['aw-badge','aw-badge--'+tone,className].filter(Boolean).join(' ')} {...rest}/>;
}
