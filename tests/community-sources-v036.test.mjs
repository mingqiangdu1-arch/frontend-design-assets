import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync, existsSync} from "node:fs";
const source=JSON.parse(readFileSync("registry/community-sources-v036.json","utf8"));
const assets=JSON.parse(readFileSync("registry/assets.json","utf8"));
const byId=new Map(assets.assets.map(a=>[a.id,a]));
test("V0.36 source-watchlist identity, provenance and license boundaries",()=>{
  assert.equal(source.sources.length,12);
  assert.equal(source.patterns.length,4);
  assert.equal(source.status,"research-only");
  const ids=new Set();
  for (const item of [...source.sources,...source.patterns]){
    assert.ok(!ids.has(item.id),item.id+" duplicated");ids.add(item.id);
    assert.ok(/^https:\/\//.test(item.source));
    assert.ok(item.relatedAssets.every(id=>byId.has(id)),item.id+" broken related ID");
    const asset=byId.get(item.id);
    assert.ok(asset,item.id+" absent from registry");
    assert.equal(asset.source,item.source);
    assert.equal(asset.stage,"analyzed");
    assert.equal(asset.handoff?.mode,"research-only");
    assert.equal(asset.spec,"registry/community-sources-v036.json");
    assert.ok(existsSync(asset.details),item.id+" missing documentation");
  }
  for (const item of source.sources){
    assert.equal(item.redistributableCodeVerified,false);
    assert.equal(item.previewMediaRightsVerified,false);
    assert.ok(item.licenseScope&&item.rightsBoundary&&item.distinctFrom);
    assert.ok(item.sampleDirections.length>=2);
  }
  for (const item of source.patterns){
    assert.equal(item.implementation,"research-brief-only");
    for (const p of ["designContract","stateContract","accessibleFallback","failureModes","distinctFrom"])
      assert.ok(item[p],item.id+" missing "+p);
  }
});

test("V0.36 concrete case studies have public provenance and do not claim redistributable assets",()=>{
 assert.equal(source.curatedCases.length,7);
 const keys=new Set();
 for(const c of source.curatedCases){
  assert.ok(!keys.has(c.key));keys.add(c.key);
  assert.ok(source.sources.some(s=>s.id===c.sourceId),c.key+" missing parent source");
  assert.ok(c.evidenceUrl.startsWith("https://"));
  assert.ok(c.visibleEvidence && c.study && c.reviewState && c.rights);
  assert.ok(c.distinctFrom.length && c.distinctFrom.every(id=>byId.has(id)));
  assert.ok(!c.rights.includes("verified-redistribution"));
 }
});
