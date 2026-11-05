import test from "node:test";
import assert from "node:assert/strict";
import {LANES,CARDS,START_BOARD,transfer,locateCard,initialTransferState,commitTransfer,undoTransfer,redoTransfer,moveLane,orderShowcase} from "../playground/advanced-interactions-v2/model.mjs";

test("move across named lanes is immutable, never duplicates cards or changes unrelated order",()=>{
 const base=initialTransferState(),original=JSON.parse(JSON.stringify(base.board));
 const x=transfer(base.board,"ST-01","ready");
 assert.equal(x.changed,true);
 assert.deepEqual(x.board.inbox,["ST-02"]);
 assert.deepEqual(x.board.ready,["ST-05","ST-01"]);
 assert.deepEqual(base.board,original);
 const after=LANES.flatMap(l=>x.board[l.id]);
 assert.equal(new Set(after).size,CARDS.length);
 assert.deepEqual(after.sort(),CARDS.map(c=>c.id).sort());
});
test("invalid source, target and no-op movement do not alter board",()=>{
 const base=initialTransferState();
 for(const [id,target] of [["MISSING","ready"],["ST-01","garbage"],["ST-01","inbox"]]){
  const r=transfer(base.board,id,target);
  assert.equal(r.changed,false);
  assert.strictEqual(r.board,base.board);
 }
 assert.deepEqual(START_BOARD.inbox,["ST-01","ST-02"]);
});
test("undo redo history preserves before and after; new move clears redo",()=>{
 let state=initialTransferState();
 state=commitTransfer(state,"ST-02","progress").state;
 state=commitTransfer(state,"ST-05","inbox").state;
 assert.equal(locateCard(state.board,"ST-05").lane,"inbox");
 state=undoTransfer(state);
 assert.equal(locateCard(state.board,"ST-05").lane,"ready");
 assert.equal(state.future.length,1);
 state=redoTransfer(state);
 assert.equal(locateCard(state.board,"ST-05").lane,"inbox");
 state=undoTransfer(state);
 state=commitTransfer(state,"ST-01","ready").state;
 assert.equal(state.future.length,0);
 assert.strictEqual(redoTransfer(state),state);
});
test("undo history bounded to twenty records",()=>{
 let state=initialTransferState();
 for(let i=0;i<28;i++){
  const target=i%2===0?"ready":"inbox";
  state=commitTransfer(state,"ST-01",target).state;
 }
 assert.equal(state.past.length,20);
});
test("lane movement enforces boundaries without wrapping",()=>{
 assert.equal(moveLane("inbox",-1),null);
 assert.equal(moveLane("inbox",1),"progress");
 assert.equal(moveLane("ready",1),null);
 assert.equal(moveLane("missing",1),null);
});
test("FLIP collection ordering is deterministic and does not mutate seed fixture",()=>{
 assert.deepEqual(orderShowcase("priority").map(x=>x.id),["VECTOR","FORM","PRISM","TIDAL"]);
 assert.deepEqual(orderShowcase("name").map(x=>x.id),["FORM","PRISM","TIDAL","VECTOR"]);
 assert.deepEqual(orderShowcase("priority").map(x=>x.id),["VECTOR","FORM","PRISM","TIDAL"]);
 assert.throws(()=>orderShowcase("none"),/Unknown sort/);
});
