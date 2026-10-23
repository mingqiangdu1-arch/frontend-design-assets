import * as React from 'react';
export interface Column<T>{id:string;title:string;cell:(row:T)=>React.ReactNode;width?:string}
export interface DataTableProps<T>{rows:T[];columns:Column<T>[];rowKey:(row:T)=>string;onOpen?:(row:T)=>void;emptyText?:string}
export function DataTable<T>({rows,columns,rowKey,onOpen,emptyText='暂无记录'}:DataTableProps<T>){
  return <div className="aw-table-wrap" role="region" aria-label="记录列表">
    <table className="aw-table"><thead><tr>{columns.map(col=><th scope="col" key={col.id} style={{width:col.width}}>{col.title}</th>)}</tr></thead>
    <tbody>{rows.length===0?<tr><td colSpan={columns.length} className="aw-table-empty">{emptyText}</td></tr>:
    rows.map(row=><tr key={rowKey(row)}>{columns.map((col,index)=><td key={col.id}>
      {onOpen&&index===0?<button type="button" className="aw-table-link" onClick={()=>onOpen(row)}>{col.cell(row)}</button>:col.cell(row)}
    </td>)}</tr>)}</tbody></table>
  </div>;
}
