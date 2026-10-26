import test from "node:test";
import assert from "node:assert/strict";
import {products,selectCatalog,toggleFacet,toggleSaved,addToBag,bagCount,bagTotal} from "../playground/commerce-atelier/model.mjs";
test("commerce product samples have unique IDs, visible prices and variants",()=>{
 assert.equal(products.length,6);assert.equal(new Set(products.map(p=>p.id)).size,6);
 assert.ok(products.every(p=>p.price>0&&p.sizes.some(v=>v.available)));
});
test("multi-category/material filters intersect and sort does not mutate originals",()=>{
 const initial=products.map(p=>p.id).join(",");
 assert.equal(selectCatalog(products,{categories:["desk"]}).length,2);
 assert.equal(selectCatalog(products,{categories:["desk","living"],materials:["paper","ceramic"]}).length,3);
 assert.equal(selectCatalog(products,{categories:["lighting"],materials:["paper"]}).length,0);
 const ascending=selectCatalog(products,{sort:"price-low"});assert.equal(ascending[0].price,89);
 const descending=selectCatalog(products,{sort:"price-high"});assert.equal(descending[0].price,429);
 assert.equal(products.map(p=>p.id).join(","),initial);
 assert.throws(()=>selectCatalog(products,{sort:"bogus"}),/Unknown sort/);
});
test("filter toggles and favorites are immutable and reversible",()=>{
 const x=["wood"];const y=toggleFacet(x,"ceramic");
 assert.deepEqual(x,["wood"]);assert.deepEqual(y,["ceramic","wood"]);
 assert.deepEqual(toggleFacet(y,"wood"),["ceramic"]);
 const start=new Set(["CA-01"]);const removed=toggleSaved(start,"CA-01");
 assert.ok(start.has("CA-01"));assert.ok(!removed.has("CA-01"));
});
test("bag blocks unavailable variants and calculates simulated totals",()=>{
 const first=products[0];
 const bad=addToBag([],first,"大号");
 assert.equal(bad.added,false);assert.equal(bad.lines.length,0);
 const one=addToBag([],first,"标准版");
 assert.equal(one.added,true);assert.equal(bagCount(one.lines),1);assert.equal(bagTotal(one.lines),429);
 const two=addToBag(one.lines,first,"标准版");
 assert.equal(bagCount(two.lines),2);assert.equal(bagTotal(two.lines),858);
 assert.equal(bagCount(one.lines),1);
});
