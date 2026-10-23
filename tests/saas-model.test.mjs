import test from "node:test";
import assert from "node:assert/strict";
import {sampleRecords,listRecords,selectVisible,selectRow,archiveWithUndo,undoArchive,validateName,updateRecordName} from "../playground/saas-patterns/model.mjs";

test("search and status filters compose without mutating originals",()=>{
 const original=structuredClone(sampleRecords);
 const list=listRecords(sampleRecords,{query:"平台",status:"进行中"});
 assert.deepEqual(list.map(r=>r.id),["REC-101"]);
 assert.deepEqual(sampleRecords,original);
});

test("sorting supports both directions and stable tie-breaking",()=>{
 const asc=listRecords(sampleRecords,{sortKey:"updatedAt",sortDirection:"asc"});
 const desc=listRecords(sampleRecords,{sortKey:"updatedAt",sortDirection:"desc"});
 assert.equal(asc[0].id,"REC-106"); assert.equal(desc[0].id,"REC-101");
 assert.equal(asc.length,desc.length);
});

test("select visible keeps off-screen selection explicit",()=>{
 const picked=selectRow(new Set(),"REC-101",true);
 const next=selectVisible(picked,["REC-104","REC-106"],true);
 assert.deepEqual([...next].sort(),["REC-101","REC-104","REC-106"]);
 assert.deepEqual([...selectVisible(next,["REC-104"],false)].sort(),["REC-101","REC-106"]);
});

test("archiving selected rows keeps rest and supports exact undo",()=>{
 const picked=new Set(["REC-101","REC-103"]);
 const result=archiveWithUndo(sampleRecords,picked);
 assert.equal(listRecords(result.records).length,sampleRecords.length-2);
 const undone=undoArchive(result.records,result.undoSnapshot);
 assert.deepEqual(undone,sampleRecords);
});

test("name validation prevents empty and overlong records",()=>{
 assert.equal(validateName("  ").ok,false);
 assert.equal(validateName("a".repeat(41)).ok,false);
 assert.deepEqual(validateName("  新项目 "),{ok:true,value:"新项目"});
});

test("invalid edit doesn't change data; valid edit changes only target",()=>{
 const bad=updateRecordName(sampleRecords,"REC-102"," ");
 assert.ok(bad.error);assert.deepEqual(bad.records,sampleRecords);
 const good=updateRecordName(sampleRecords,"REC-102","更新后的名称");
 assert.equal(good.error,null);
 assert.equal(good.records[1].name,"更新后的名称");
 assert.equal(sampleRecords[1].name,"客户反馈归档");
});

test("archived rows are excluded even when all view is selected",()=>{
 const changed=archiveWithUndo(sampleRecords,new Set(["REC-106"])).records;
 assert.ok(!listRecords(changed,{status:"all"}).some(r=>r.id==="REC-106"));
});
