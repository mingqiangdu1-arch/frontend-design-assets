// Original headless research model for linked map/chart/list brushing (IP-026).
// No DOM, chart package, map projection or persistence contract is implied.
const ensureIds=(ids,label)=>{
 if(!Array.isArray(ids)||ids.some(id=>typeof id!=="string"||!id.trim())||new Set(ids).size!==ids.length)
  throw Error(label+" must be distinct nonempty string IDs");
};
export function validateLinkedRecords(records){
 if(!Array.isArray(records))throw Error("records must be an array");
 ensureIds(records.map(r=>r?.id),"record IDs");
 for(const r of records){
  if(typeof r.group!=="string"||!r.group.trim())throw Error("record "+r.id+" has no group");
 }
 return records;
}
export function createLinkedState(records,selectedIds=[],focusId=null){
 validateLinkedRecords(records);
 ensureIds(selectedIds,"selectedIds");
 const known=new Set(records.map(r=>r.id));
 if(selectedIds.some(id=>!known.has(id)))throw Error("Unknown selection ID");
 if(focusId!==null&&!known.has(focusId))throw Error("Unknown focus ID");
 return {selectedIds:records.filter(r=>selectedIds.includes(r.id)).map(r=>r.id),focusId};
}
// The pointer/keyboard layer must calculate a brush's IDs independently.
// 'replace' intentionally clears hidden selection; add/remove/toggle preserve it.
export function applyLinkedBrush(records,state,brushIds,mode="replace"){
 validateLinkedRecords(records);
 ensureIds(brushIds,"brushIds");
 const known=new Set(records.map(r=>r.id));
 if(brushIds.some(id=>!known.has(id)))throw Error("Brush contains unknown record ID");
 if(!["replace","add","remove","toggle"].includes(mode))throw Error("Unknown brush mode");
 const old=createLinkedState(records,state?.selectedIds||[],state?.focusId??null);
 const selected=new Set(mode==="replace"?[]:old.selectedIds);
 for(const id of brushIds){
  if(mode==="replace"||mode==="add")selected.add(id);
  else if(mode==="remove")selected.delete(id);
  else if(selected.has(id))selected.delete(id);
  else selected.add(id);
 }
 return {selectedIds:records.filter(r=>selected.has(r.id)).map(r=>r.id),focusId:old.focusId};
}
export function projectLinkedSelection(records,state,visibleIds){
 validateLinkedRecords(records);
 ensureIds(visibleIds,"visibleIds");
 const known=new Set(records.map(r=>r.id));
 if(visibleIds.some(id=>!known.has(id)))throw Error("Unknown visible record");
 const valid=createLinkedState(records,state?.selectedIds||[],state?.focusId??null);
 const visible=new Set(visibleIds);
 const highlights=valid.selectedIds.filter(id=>visible.has(id));
 return {highlightIds:highlights,hiddenSelectedCount:valid.selectedIds.length-highlights.length,
  focusId:valid.focusId,selectionCount:valid.selectedIds.length};
}
export function summarizeLinkedGroups(records,state){
 validateLinkedRecords(records);
 const valid=createLinkedState(records,state?.selectedIds||[],state?.focusId??null);
 const selected=new Set(valid.selectedIds);
 return [...new Set(records.map(r=>r.group))].map(group=>({
  group,total:records.filter(r=>r.group===group).length,
  selected:records.filter(r=>r.group===group&&selected.has(r.id)).length
 }));
}
