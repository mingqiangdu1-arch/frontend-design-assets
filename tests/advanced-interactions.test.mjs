import test from 'node:test';
import assert from 'node:assert/strict';
import {seedNodes,WORLD,clampZoom,zoomAt,screenToWorld,boxHits,createBoard,moveNodes,commitNodes,undoNodes,redoNodes,clampCompare} from '../playground/advanced-interactions/model.mjs';

test('zoom anchored at pointer preserves world coordinate and enforces limits',()=>{
 const prior={zoom:1,panX:20,panY:-15},pt={x:235,y:120};
 const world=screenToWorld(pt,prior),next=zoomAt(prior,pt,1.6);
 assert.equal(next.zoom,1.6);
 assert.ok(Math.abs(screenToWorld(pt,next).x-world.x)<1e-8);
 assert.ok(Math.abs(screenToWorld(pt,next).y-world.y)<1e-8);
 assert.equal(clampZoom(100),1.8);assert.equal(clampZoom(0),.5);assert.equal(clampZoom('broken'),1);
});
test('marquee hit detection supports reversed rectangle and ignores far nodes',()=>{
 const a=boxHits(seedNodes,{x1:50,y1:50,x2:320,y2:260});
 const b=boxHits(seedNodes,{x1:320,y1:260,x2:50,y2:50});
 assert.deepEqual(a,['N-01']);assert.deepEqual(a,b);
 assert.deepEqual(boxHits(seedNodes,{x1:-100,y1:-100,x2:-20,y2:-20}),[]);
});
test('multi-node move is immutable, bounded, and reversible with redo',()=>{
 const initial=createBoard();const selected=['N-01','N-02'];
 const moved=moveNodes(initial.nodes,selected,14,27);
 assert.deepEqual(initial.nodes,seedNodes);assert.equal(moved[0].x,seedNodes[0].x+14);assert.equal(moved[1].y,seedNodes[1].y+27);
 assert.deepEqual(moved[2],initial.nodes[2]);
 const changed=commitNodes(initial,moved);assert.equal(changed.past.length,1);
 const undo=undoNodes(changed);assert.deepEqual(undo.nodes,initial.nodes);
 const redo=redoNodes(undo);assert.deepEqual(redo.nodes,moved);
 assert.equal(redo.future.length,0);
 const different=commitNodes(undo,moveNodes(undo.nodes,['N-01'],10,0));assert.equal(different.future.length,0);
});
test('position updates clamp within finite world and invalid updates are no-ops',()=>{
 const base=createBoard();const out=moveNodes(base.nodes,['N-03'],5000,-5000);
 assert.equal(out[2].x,WORLD.width-out[2].w);assert.equal(out[2].y,0);
 assert.deepEqual(moveNodes(base.nodes,['N-03'],NaN,10),base.nodes);
 assert.equal(commitNodes(base,base.nodes),base);
 assert.throws(()=>commitNodes(base,[]),/identity/);
});
test('history never exceeds 20 snapshots and undo stops at empty',()=>{
 let state=createBoard();for(let i=0;i<25;i++)state=commitNodes(state,moveNodes(state.nodes,['N-01'],1,0));
 assert.equal(state.past.length,20);
 for(let i=0;i<20;i++)state=undoNodes(state);
 assert.equal(undoNodes(state),state);
});
test('comparison values snap to safe keyboard steps',()=>{
 assert.equal(clampCompare(23),25);assert.equal(clampCompare(99),100);
 assert.equal(clampCompare(-4),0);assert.equal(clampCompare('no'),50);
});
