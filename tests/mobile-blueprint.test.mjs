import test from "node:test";
import assert from "node:assert/strict";
import {tasks,toggleTask,stats,selectTasks} from "../playground/page-blueprints/mobile-habits/model.mjs";
test("mobile progress and points derive from known tasks",()=>{assert.deepEqual(stats(tasks,new Set(["t1","t2"])),{completed:2,total:4,points:35,percent:50});assert.equal(stats([],new Set()).percent,0);});
test("mobile toggles safely, without mutating original input",()=>{const a=new Set(["t1"]);const b=toggleTask(a,"t1");assert.ok(!b.has("t1"));assert.ok(a.has("t1"));assert.deepEqual([...toggleTask(a,"unknown")],["t1"]);});
test("mobile status filtering and invalid filters",()=>{const rows=tasks.map(t=>({...t,done:t.id==="t1"}));assert.equal(selectTasks(rows,"pending").length,3);assert.equal(selectTasks(rows,"done").length,1);assert.throws(()=>selectTasks(rows,"bad"),/Unknown task/);});
