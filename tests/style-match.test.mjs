import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {rankThemes,compareThemes,validateCriteria,previewPath} from "../scripts/style-match.mjs";
import {runCLI,toMarkdown} from "../scripts/select-style.mjs";
import {validateRepo,validateStyleFacets} from "../scripts/check-style-facets.mjs";

const read=name=>JSON.parse(fs.readFileSync("registry/"+name,"utf8"));
const styles=read("styles.json"),facets=read("style-facets.json");
const components=read("components.json"),assets=read("assets.json");
const ids=facets.entries.map(x=>x.id);

test("all 15 theme facets match actual registered styles, tokens, assets and demo paths",()=>{
 assert.equal(styles.defaultStyleId,null);
 assert.equal(facets.defaultStyleId,null);
 assert.deepEqual(new Set(ids),new Set(styles.styles.map(s=>s.id)));
 assert.equal(validateRepo().styles,15);
 assert.equal(validateRepo().reactCompatible,4);
 assert.ok(facets.entries.every(x=>x.dna.length>=3));
});
test("agent requires meaningful task/layout/context rather than silently selecting a default",()=>{
 assert.throws(()=>rankThemes(styles,facets,components,{}),/no default style/);
 assert.throws(()=>rankThemes(styles,facets,components,{device:"mobile"}),/no default style/);
 assert.throws(()=>rankThemes(styles,facets,components,{context:"workspaces",layout:"not-registered"}),/Unknown layout/);
 assert.throws(()=>rankThemes(styles,facets,components,{task:"test",stack:"vue"}),/Unknown stack/);
 assert.throws(()=>rankThemes(styles,facets,components,{task:"test",limit:0}),/Limit/);
});
test("verified application context matches task-specific candidates without a user preference profile",()=>{
 const reading=rankThemes(styles,facets,components,{context:"knowledge-base"});
 assert.deepEqual(reading.results.map(x=>x.id),["editorial-warm"]);
 const mobile=rankThemes(styles,facets,components,{context:"consumer-mobile"});
 assert.deepEqual(mobile.results.map(x=>x.id).sort(),["playful-pop","shape-expressive"]);
 assert.ok(mobile.results.every(x=>x.evidence.some(e=>e.includes("场景匹配"))));
 assert.equal(mobile.note.includes("not popularity"),true);
});
test("natural-language Chinese task phrase can retrieve correct documented theme",()=>{
 const glass=rankThemes(styles,facets,components,{task:"我需要一个液态玻璃导航区域"});
 assert.equal(glass.results[0]?.id,"liquid-layer");
 assert.ok(glass.results[0].evidence.some(x=>x.includes("液态玻璃")));
 const commerce=rankThemes(styles,facets,components,{task:"希望搭建商品列表和购买决策页"});
 assert.equal(commerce.results[0]?.id,"commerce-atelier");
});
test("explicit facet filtering produces defensible intersections rather than hidden fallback",()=>{
 const pair=rankThemes(styles,facets,components,{layout:"campaign",material:"graphic"});
 assert.deepEqual(pair.results.map(x=>x.id).sort(),["neo-brutalist","type-led-minimal"]);
 const noMatch=rankThemes(styles,facets,components,{context:"media-gallery",layout:"mobile-task"});
 assert.equal(noMatch.results.length,0);
 assert.equal(noMatch.totalMatches,0);
 const mismatch=rankThemes(styles,facets,components,{context:"media-gallery",stack:"react"});
 assert.deepEqual(mismatch.results,[]);
});
test("React stack is strict to declared four compatible component package styles",()=>{
 const ranked=rankThemes(styles,facets,components,{layout:"workspace",stack:"react"});
 assert.ok(ranked.results.length>0);
 assert.ok(ranked.results.every(x=>components.styleIds.includes(x.id)&&x.reactThemeCompatible));
 const unsupported=rankThemes(styles,facets,components,{task:"液态玻璃",stack:"react"});
 assert.equal(unsupported.totalMatches,0);
});
test("pair comparison includes exact source/preview but no fabricated quality judgment",()=>{
 const pair=compareThemes(styles,facets,components,["editorial-warm","liquid-layer"]);
 assert.equal(pair.length,2);
 assert.equal(pair[0].assetId,"DT-003");
 assert.equal(pair[1].assetId,"DT-011");
 assert.equal(pair[0].reactThemeCompatible,true);
 assert.equal(pair[1].reactThemeCompatible,false);
 assert.match(pair[0].preview,/style=editorial-warm/);
 assert.match(pair[1].preview,/style=liquid-layer/);
 assert.throws(()=>compareThemes(styles,facets,components,["playful-pop","playful-pop"]),/distinct/);
 assert.throws(()=>compareThemes(styles,facets,components,["no-theme","liquid-layer"]),/Unknown style/);
 assert.throws(()=>previewPath({preview:"https://example.com/"}),/Unsafe/);
 assert.throws(()=>previewPath({preview:"playground/../../secret.html"}),/Unsafe/);
});
test("CLI prints deterministic grounded candidates and Markdown pair handoff",()=>{
 const json=JSON.parse(runCLI(["--task=液态玻璃导航","--format=json"]));
 assert.equal(json.mode,"selection");
 assert.equal(json.results[0].id,"liquid-layer");
 assert.ok(json.results[0].tokens.json.includes("liquid-layer"));
 const md=runCLI(["--compare=neo-brutalist,type-led-minimal","--format=markdown"]);
 assert.ok(md.includes("DT-005")&&md.includes("DT-013"));
 assert.ok(md.includes("ranking")||md.includes("ranking"));
 assert.throws(()=>runCLI([]),/no default/);
 assert.throws(()=>runCLI(["--compare=editorial-warm,liquid-layer","--task=test"]),/cannot be mixed/);
 assert.throws(()=>runCLI(["--material=neon-liquid"]),/Unknown material/);
});
test("facet validator rejects stale IDs, duplicate entry and missing preview sources",()=>{
 const broken=structuredClone(facets);broken.entries[0].id="invented";assert.throws(()=>validateStyleFacets(styles,broken,components,assets),/unknown atlas style/i);
 const dupe=structuredClone(facets);dupe.entries[1].id=dupe.entries[0].id;assert.throws(()=>validateStyleFacets(styles,dupe,components,assets),/Duplicate/);
 const lost=structuredClone(facets);lost.entries[0].preview="playground/never-created.html";assert.throws(()=>validateStyleFacets(styles,lost,components,assets),/Missing original interactive preview/);
});
