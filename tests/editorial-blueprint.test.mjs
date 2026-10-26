import test from "node:test";
import assert from "node:assert/strict";
import {articles,filterArticles,toggleBookmark} from "../playground/page-blueprints/editorial-library/model.mjs";
test("four distinct editorial records",()=>{assert.equal(articles.length,4);assert.equal(new Set(articles.map(x=>x.id)).size,4);});
test("editorial filter correctly intersects term and category",()=>{
 assert.deepEqual(filterArticles(articles,"留白").map(x=>x.id),["a2"]);
 assert.deepEqual(filterArticles(articles,"细微选择","product").map(x=>x.id),["a1"]);
 assert.deepEqual(filterArticles(articles,"zzmissing"),[]);
 assert.throws(()=>filterArticles(articles,"","bad"),/Unknown tag/);
});
test("bookmark toggles immutably",()=>{const a=new Set(["a1"]);const b=toggleBookmark(a,"a1");assert.ok(a.has("a1"));assert.ok(!b.has("a1"));assert.ok(toggleBookmark(b,"a1").has("a1"));});
