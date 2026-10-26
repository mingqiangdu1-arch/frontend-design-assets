export type Status="open"|"review"|"done";
export type Item={id:string;title:string;team:string;status:Status;owner:string;priority:string;updated:string;description:string};
export const initial:Item[]=[
{id:"FD-128",title:"Audit token contrast on dense views",team:"Design Systems",status:"open",owner:"Mei",priority:"Critical",updated:"Today",description:"Check foreground contrast and visible keyboard focus at narrow widths."},
{id:"FD-127",title:"Review editable table interactions",team:"Product",status:"review",owner:"Will",priority:"High",updated:"Today",description:"Validate edits, errors and undo before extending to a full data grid."},
{id:"FD-125",title:"Document async request states",team:"Engineering",status:"open",owner:"Ari",priority:"Normal",updated:"Yesterday",description:"Define loading, retry and cancellation for real product contracts."},
{id:"FD-124",title:"Map keyboard commands",team:"Research",status:"done",owner:"Jo",priority:"High",updated:"Oct 22",description:"Create discoverable shortcuts and predictable focus restoration."},
{id:"FD-122",title:"Check mobile inspector layout",team:"Design Systems",status:"review",owner:"Mei",priority:"Normal",updated:"Oct 20",description:"Ensure details are legible and closeable on small screens."},
{id:"FD-120",title:"Review onboarding content",team:"Content",status:"done",owner:"Ari",priority:"Normal",updated:"Oct 18",description:"Finalize writing and hierarchy for onboarding."}
];
export const labels:Record<Status,string>={open:"Open",review:"In review",done:"Done"};
export const statusList:Status[]=["open","review","done"];
export function filterItems(items:Item[],query:string,status:"all"|Status){
 const q=query.trim().toLowerCase();
 return items.filter(x=>(status==="all"||x.status===status)&&(!q||[x.id,x.title,x.team,x.owner].some(s=>s.toLowerCase().includes(q))));
}
export function completion(items:Item[]){return items.length?Math.round(items.filter(x=>x.status==="done").length/items.length*100):0;}
export type UndoSnapshot={id:string;previous:Status;next:Status};
export function updateStatus(items:Item[],id:string,next:Status){
 const existing=items.find(x=>x.id===id);
 if(!existing||!statusList.includes(next)||existing.status===next)return {items,snapshot:null};
 return {items:items.map(x=>x.id===id?{...x,status:next}:x),snapshot:{id,previous:existing.status,next}};
}
export function rollback(items:Item[],snapshot:UndoSnapshot|null){
 if(!snapshot)return items;
 return items.map(x=>x.id===snapshot.id&&x.status===snapshot.next?{...x,status:snapshot.previous}:x);
}