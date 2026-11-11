import test from "node:test";
import assert from "node:assert/strict";
import {BLOCK_DEFS,seedBlocks,validateBlocks,updateBlockProps,exportBlockSchema,importBlockSchema} from "../playground/visual-editor-v039/block-schema.mjs";
import {reorderBlocks,stepBlock} from "../playground/visual-editor-v039/reorder-model.mjs";
import {createEditor,selectBlock,moveSelected,dropBlock,editSelectedProps,undoEditor,redoEditor,historySummary} from "../playground/visual-editor-v039/editor-history.mjs";
const ids=arr=>arr.map(x=>x.id);
test("V0.39 block schema accepts defined fixture types, rejects duplicate IDs and unknown fields",()=>{
 const seed=seedBlocks();
 assert.equal(validateBlocks(seed),true);
 assert.equal(Object.keys(BLOCK_DEFS).length,3);
 assert.throws(()=>validateBlocks([...seed,seed[0]]),/Duplicate/);
 assert.throws(()=>validateBlocks([{...seed[0],type:"javascript"}]),/Invalid/);
 assert.throws(()=>validateBlocks([{...seed[0],props:{...seed[0].props,code:"alert(1)"}}]),/Unknown/);
});
test("V0.39 schemas validate text length, select options, boolean and input count",()=>{
 const seed=seedBlocks();
 assert.throws(()=>updateBlockProps(seed,"hero-01",{title:""}),/Invalid title/);
 assert.throws(()=>updateBlockProps(seed,"hero-01",{title:"x".repeat(91)}),/Invalid title/);
 assert.throws(()=>updateBlockProps(seed,"hero-01",{align:"right"}),/Invalid align/);
 assert.throws(()=>updateBlockProps(seed,"feature-01",{emphasis:"yes"}),/Invalid emphasis/);
 assert.throws(()=>validateBlocks([]),/1–12/);
});
test("V0.39 prop patch is atomic, immutable and idempotent",()=>{
 const original=seedBlocks();
 const next=updateBlockProps(original,"hero-01",{title:"编辑后的标题",align:"center"});
 assert.equal(original[0].props.title,"让内容结构保持清晰");
 assert.equal(next[0].props.title,"编辑后的标题");
 assert.equal(next[0].props.align,"center");
 assert.equal(next[1],original[1]);
 assert.equal(updateBlockProps(next,"hero-01",{align:"center"}),next);
 assert.throws(()=>updateBlockProps(next,"hero-01",{javascript:"1"}),/Unknown/);
 assert.throws(()=>updateBlockProps(next,"missing",{title:"hello"}),/Unknown block/);
});
test("V0.39 reorder before and after target preserves identity without mutating source",()=>{
 const initial=seedBlocks();
 const before=reorderBlocks(initial,"quote-01","hero-01","before");
 assert.deepEqual(ids(before),["quote-01","hero-01","feature-01"]);
 assert.deepEqual(ids(initial),["hero-01","feature-01","quote-01"]);
 const after=reorderBlocks(initial,"hero-01","quote-01","after");
 assert.deepEqual(ids(after),["feature-01","quote-01","hero-01"]);
 assert.equal(reorderBlocks(initial,"hero-01","hero-01"),initial);
 assert.throws(()=>reorderBlocks(initial,"missing","hero-01"),/Unknown/);
 assert.throws(()=>reorderBlocks(initial,"hero-01","quote-01","middle"),/placement/);
});
test("V0.39 keyboard step handles first/last boundary and unknown move",()=>{
 const initial=seedBlocks();
 assert.equal(stepBlock(initial,"hero-01",-1),initial);
 assert.equal(stepBlock(initial,"quote-01",1),initial);
 assert.deepEqual(ids(stepBlock(initial,"hero-01",1)),["feature-01","hero-01","quote-01"]);
 assert.throws(()=>stepBlock(initial,"hero-01",2),/Direction/);
});
test("V0.39 selection does not produce history, and undo restores previous selection",()=>{
 const first=createEditor();
 const s=selectBlock(first,"feature-01");
 assert.equal(s.past.length,0);
 assert.equal(historySummary(s).canUndo,false);
 assert.throws(()=>selectBlock(s,"unknown"),/unknown/);
 const changed=editSelectedProps(s,{title:"新的特性"});
 assert.equal(changed.past.length,1);
 const undid=undoEditor(changed);
 assert.equal(undid.blocks[1].props.title,"可复用的区块");
 assert.equal(undid.selectedId,"feature-01");
 assert.equal(undid.future.length,1);
 const redid=redoEditor(undid);
 assert.equal(redid.blocks[1].props.title,"新的特性");
});
test("V0.39 move then undo/redo, new edit invalidates redo branch",()=>{
 const initial=createEditor();
 const moved=moveSelected(initial,1);
 assert.deepEqual(ids(moved.blocks),["feature-01","hero-01","quote-01"]);
 const previous=undoEditor(moved);
 assert.deepEqual(ids(previous.blocks),ids(initial.blocks));
 assert.deepEqual(ids(redoEditor(previous).blocks),ids(moved.blocks));
 const fork=editSelectedProps(previous,{title:"另一条修改分支"});
 assert.equal(fork.future.length,0);
 assert.equal(redoEditor(fork),fork);
});
test("V0.39 pointer drop makes one history transaction and preserves source selection",()=>{
 const initial=createEditor();
 const moved=dropBlock(initial,"quote-01","hero-01","before");
 assert.deepEqual(ids(moved.blocks),["quote-01","hero-01","feature-01"]);
 assert.equal(moved.selectedId,"quote-01");
 assert.equal(moved.past.length,1);
 const reverted=undoEditor(moved);
 assert.deepEqual(ids(reverted.blocks),ids(initial.blocks));
});
test("V0.39 no-op prop/ordering updates never pollute history",()=>{
 const state=createEditor();
 assert.equal(editSelectedProps(state,{title:state.blocks[0].props.title}),state);
 assert.equal(moveSelected(state,-1),state);
 assert.equal(commitAfterNoop(state),true);
 function commitAfterNoop(s){return historySummary(s).undoDepth===0;}
});
test("V0.39 bounded history is capped at 30 changes",()=>{
 let s=createEditor();
 for(let i=0;i<38;i++)s=editSelectedProps(s,{title:"第 "+(i+1)+" 次修改"});
 assert.equal(s.past.length,30);
 let count=0;while(historySummary(s).canUndo){s=undoEditor(s);count++;}
 assert.equal(count,30);
});
test("V0.39 stable JSON export/import roundtrips without importing executable content",()=>{
 const source=seedBlocks();
 const serialized=exportBlockSchema(source);
 const restored=importBlockSchema(serialized);
 assert.deepEqual(restored,source);
 assert.notEqual(restored,source);
 assert.throws(()=>importBlockSchema('{"schemaVersion":"2.0","blocks":[]}'),/Unsupported/);
 assert.throws(()=>importBlockSchema("{bad json"),/Invalid JSON/);
 assert.throws(()=>importBlockSchema("x".repeat(20000)),/too large/);
});
test("V0.39 template strings remain text data, not DOM or executable properties",()=>{
 const raw="<img src=x onerror=alert(1)>";
 const updated=updateBlockProps(seedBlocks(),"hero-01",{title:raw});
 assert.equal(updated[0].props.title,raw);
 assert.equal(validateBlocks(updated),true);
 assert.throws(()=>importBlockSchema(JSON.stringify({schemaVersion:"1.0",blocks:[{...seedBlocks()[0],props:{...seedBlocks()[0].props,onClick:"evil"}}]})),/Unknown/);
});
