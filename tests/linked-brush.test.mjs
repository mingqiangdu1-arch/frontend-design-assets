import test from "node:test";
import assert from "node:assert/strict";
import {createLinkedState,applyLinkedBrush,projectLinkedSelection,summarizeLinkedGroups} from "../interactions/research/linked-brush.mjs";
const rows=[{id:"a",group:"East"},{id:"b",group:"West"},{id:"c",group:"East"},{id:"d",group:"West"}];
test("replace, add, remove and toggle are deterministic and immutable",()=>{
 const start=createLinkedState(rows,["a"],"b");
 const added=applyLinkedBrush(rows,start,["d","c"],"add");
 assert.deepEqual(added,{selectedIds:["a","c","d"],focusId:"b"});
 assert.deepEqual(start,{selectedIds:["a"],focusId:"b"});
 assert.deepEqual(applyLinkedBrush(rows,added,["a","c"],"remove").selectedIds,["d"]);
 assert.deepEqual(applyLinkedBrush(rows,added,["a","b"],"toggle").selectedIds,["b","c","d"]);
 assert.deepEqual(applyLinkedBrush(rows,added,["b"],"replace").selectedIds,["b"]);
});
test("hidden selected records remain counted without invented chart geometry",()=>{
 const state=createLinkedState(rows,["a","b","d"],"a");
 assert.deepEqual(projectLinkedSelection(rows,state,["a","c"]),{
  highlightIds:["a"],hiddenSelectedCount:2,focusId:"a",selectionCount:3
 });
 assert.deepEqual(summarizeLinkedGroups(rows,state),[
  {group:"East",total:2,selected:1},{group:"West",total:2,selected:2}
 ]);
});
test("unknown IDs and invalid state cannot silently move selection",()=>{
 assert.throws(()=>createLinkedState(rows,["z"]),/Unknown selection/);
 assert.throws(()=>applyLinkedBrush(rows,createLinkedState(rows),["z"]),/unknown/);
 assert.throws(()=>applyLinkedBrush(rows,createLinkedState(rows),["a"],"upsert"),/Unknown brush/);
 assert.throws(()=>projectLinkedSelection(rows,createLinkedState(rows),["z"]),/Unknown visible/);
 assert.throws(()=>createLinkedState([...rows,rows[0]]),/distinct/);
});
