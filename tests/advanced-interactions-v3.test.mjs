import test from "node:test";
import assert from "node:assert/strict";
import {FPS,DURATION,TRACKS,SEED_CLIPS,CHAPTERS,SNAP_THRESHOLD,clamp,timecode,overlaps,validateClips,initialTimeline,trackIndex,moveDestination,placeClip,commitClip,undoClip,redoClip,scrollProgress,chapterAt} from "../playground/advanced-interactions-v3/model.mjs";

test("timeline uses real integer frames and starts with six non-overlapping clips",()=>{
 assert.equal(FPS,24);assert.equal(DURATION,288);assert.equal(SEED_CLIPS.length,6);assert.equal(TRACKS.length,3);
 assert.equal(validateClips(SEED_CLIPS),true);
 assert.equal(timecode(0),"00:00:00");assert.equal(timecode(24),"00:01:00");assert.equal(timecode(287),"00:11:23");assert.equal(timecode(DURATION),"00:12:00");
});
test("adjacent clips may touch but not intersect; duplicate IDs and invalid bounds reject",()=>{
 const base=[{id:"a",track:"visual",start:0,duration:24},{id:"b",track:"visual",start:24,duration:24}];
 assert.equal(validateClips(base),true);
 assert.equal(overlaps(base[0],base[1]),false);
 assert.equal(validateClips([{...base[0]},{...base[1],start:23}]),false);
 assert.equal(validateClips([{...base[0]},{...base[1],id:"a"}]),false);
 assert.equal(validateClips([{...base[0],start:-1}]),false);
 assert.equal(validateClips([{...base[0],duration:0}]),false);
 assert.equal(validateClips([{...base[0],start:288}]),false);
});
test("frame snap resolves nearest 24-fps beat, clip edge, and optional no-snap mode",()=>{
 assert.equal(SNAP_THRESHOLD,5);
 const b=initialTimeline();
 const nearBeat=placeClip(b.clips,"VIS-B","visual",94,{snap:true,playhead:120});
 assert.deepEqual({start:nearBeat.to.start,snap:nearBeat.snap},{start:96,snap:"second"});
 const off=placeClip(b.clips,"VIS-B","visual",94,{snap:false});
 assert.equal(off.to.start,94);assert.equal(off.snap,null);
 const nearEdge=placeClip(b.clips,"VIS-B","visual",86,{snap:true});
 assert.deepEqual({start:nearEdge.to.start,snap:nearEdge.snap},{start:84,snap:"clip-end"});
 assert.equal(b.clips.find(c=>c.id==="VIS-B").start,132);
});
test("collision rejection does not produce history or ghost success",()=>{
 const b=initialTimeline();
 const result=commitClip(b,"VIS-B","visual",50,{snap:true});
 assert.equal(result.changed,false);assert.equal(result.reason,"overlap");
 assert.strictEqual(result.state,b);
 assert.equal(b.past.length,0);assert.equal(b.future.length,0);
});
test("cross-track transfer is real, preserving identity, same-track non-overlap and undo/redo",()=>{
 const original=initialTimeline();
 let state=commitClip(original,"CAP-B","visual",240,{snap:false});
 assert.equal(state.changed,true);assert.equal(state.to.track,"visual");
 assert.equal(validateClips(state.state.clips),true);
 assert.equal(original.clips.find(c=>c.id==="CAP-B").track,"captions");
 state=state.state;
 state=undoClip(state);
 assert.equal(state.clips.find(c=>c.id==="CAP-B").track,"captions");
 state=redoClip(state);
 assert.equal(state.clips.find(c=>c.id==="CAP-B").track,"visual");
 state=undoClip(state);
 state=commitClip(state,"VIS-B","visual",96,{snap:false}).state;
 assert.equal(state.future.length,0);
 assert.strictEqual(redoClip(state),state);
});
test("keyboard fine and coarse edits, bounds and unmapped track reject",()=>{
 const b=initialTimeline();
 const fine=placeClip(b.clips,"VIS-A","visual",1,{snap:false});
 assert.equal(fine.to.start,1);
 const coarse=placeClip(b.clips,"VIS-A","visual",12,{snap:false});
 assert.equal(coarse.to.start,12);
 const clampNeg=placeClip(b.clips,"VIS-A","visual",-99,{snap:false});
 assert.equal(clampNeg.reason,"same-position");
 assert.equal(trackIndex("audio"),2);assert.equal(moveDestination("captions",1),"audio");
 assert.equal(moveDestination("visual",-1),null);
 assert.equal(placeClip(b.clips,"VIS-A","fake",12).reason,"invalid");
});
test("history is bounded at 20 reversible edits",()=>{
 let state=initialTimeline();
 for(let i=0;i<30;i++){
  state=commitClip(state,"VIS-A","visual",i%2===0?12:0,{snap:false}).state;
 }
 assert.equal(state.past.length,20);
});
test("scroll progress maps to finite clamped fractional position; stories include four real chapters",()=>{
 assert.equal(CHAPTERS.length,4);
 assert.equal(scrollProgress(5,0,10),.5);
 assert.equal(scrollProgress(-5,0,10),0);
 assert.equal(scrollProgress(15,0,10),1);
 assert.equal(scrollProgress(5,10,10),0);
 assert.equal(scrollProgress(Number.NaN,0,10),0);
 assert.equal(chapterAt(0).id,"origin");
 assert.equal(chapterAt(.30).id,"structure");
 assert.equal(chapterAt(.6).id,"rhythm");
 assert.equal(chapterAt(1).id,"resolve");
 assert.equal(clamp(-5,0,100),0);
});
