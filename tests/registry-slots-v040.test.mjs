import test from "node:test";
import assert from "node:assert/strict";
import {listCuratedMappings,mapRegistryIntent,inspectExternalRegistry} from "../playground/registry-slots-v040/registry-adapter.mjs";
import {seedSlotDocument,validateSlotDocument,insertIntoSlot,moveIntoSlot,updateSlotProps,describeSlotTree} from "../playground/registry-slots-v040/slot-tree.mjs";
import {createCommandSession,previewCommand,confirmCommand} from "../playground/registry-slots-v040/command-preview.mjs";
const ids=d=>d.nodes.map(n=>n.id);
const input={sourceId:"fixture.feature",instanceId:"feature-new"};
test("V0.40 curated fixture mappings are stable metadata, not vendor code",()=>{
 const entries=listCuratedMappings();
 assert.equal(entries.length,3);
 assert.ok(entries.every(e=>e.status==="original-fixture-only"&&e.source==="original-fixture-v040"));
 const node=mapRegistryIntent(input);
 assert.equal(node.type,"feature");
 assert.equal(node.props.title,"可复用的区块");
 assert.deepEqual(node.slots,{});
});
test("V0.40 reject unreviewed registry names, unmapped props and instance ID injection",()=>{
 assert.throws(()=>mapRegistryIntent({sourceId:"shadcn/dashboard-01",instanceId:"blocked"}),/Unreviewed/);
 assert.throws(()=>mapRegistryIntent({...input,props:{execute:"evil"}}),/Unknown mapped prop/);
 assert.throws(()=>mapRegistryIntent({...input,instanceId:"<script>"}),/Invalid instance/);
 assert.throws(()=>mapRegistryIntent({...input,remoteUrl:"https://example.org"}),/Unknown registry intent/);
 assert.throws(()=>mapRegistryIntent({...input,props:{title:""}}),/Invalid title/);
});
test("V0.40 external descriptor is review-only, never an installed component",()=>{
 const result=inspectExternalRegistry({name:"Unknown Registry component",files:["not-copied.tsx"]});
 assert.equal(result.importable,false);
 assert.equal(result.executable,false);
 assert.equal(result.sourceCodeCopied,false);
 assert.match(result.status,/review/);
});
test("V0.40 seed slot tree preserves two sections and bounded three-level nesting",()=>{
 const doc=seedSlotDocument();
 assert.equal(validateSlotDocument(doc),true);
 assert.deepEqual(doc.roots,["section-one","section-two"]);
 assert.equal(doc.nodes.length,7);
 assert.equal(describeSlotTree(doc).filter(x=>x.includes("feature-one")).length,1);
});
test("V0.40 rejects unknown slot, invalid parent-child typing and oversize capacity",()=>{
 const doc=seedSlotDocument();
 const hero=mapRegistryIntent({sourceId:"fixture.hero",instanceId:"hero-new"});
 assert.throws(()=>insertIntoSlot(doc,hero,"stack-one","items"),/Slot rejects child type/);
 assert.throws(()=>insertIntoSlot(doc,hero,"feature-one","items"),/Invalid target slot/);
 const more=mapRegistryIntent(input);
 const full=insertIntoSlot(doc,more,"stack-one","items");
 assert.equal(full.nodes.length,8);
 assert.throws(()=>insertIntoSlot(full,mapRegistryIntent({sourceId:"fixture.feature",instanceId:"feature-extra"}),"stack-one","items"),/Slot capacity/);
 assert.deepEqual(doc.nodes.find(x=>x.id==="stack-one").slots.items,["feature-one","quote-one"]);
});
test("V0.40 explicitly rejects duplicate references and orphan nodes",()=>{
 const doc=seedSlotDocument();
 doc.nodes.find(x=>x.id==="section-two").slots.content.push("hero-one");
 assert.throws(()=>validateSlotDocument(doc),/Duplicate parent/);
 const orphan=seedSlotDocument();
 orphan.nodes.find(x=>x.id==="stack-one").slots.items.pop();
 assert.throws(()=>validateSlotDocument(orphan),/Unreachable/);
});
test("V0.40 rejects unknown node type, duplicate IDs, root injection and unknown props",()=>{
 const doc=seedSlotDocument();
 doc.nodes[0].props.extra="evil";
 assert.throws(()=>validateSlotDocument(doc),/Invalid container/);
 const duplicate=seedSlotDocument();
 duplicate.nodes.push({...duplicate.nodes[1]});
 assert.throws(()=>validateSlotDocument(duplicate),/Duplicate/);
 const wrongRoot=seedSlotDocument();
 wrongRoot.roots.push("hero-one");
 assert.throws(()=>validateSlotDocument(wrongRoot),/Invalid root/);
});
test("V0.40 move between containers is immutable, preserves IDs and sibling order",()=>{
 const doc=seedSlotDocument();
 const moved=moveIntoSlot(doc,"feature-two","stack-one","items",1);
 assert.deepEqual(moved.nodes.find(n=>n.id==="stack-one").slots.items,["feature-one","feature-two","quote-one"]);
 assert.deepEqual(doc.nodes.find(n=>n.id==="stack-one").slots.items,["feature-one","quote-one"]);
 assert.deepEqual(moved.nodes.find(n=>n.id==="section-two").slots.content,[]);
 assert.equal(new Set(ids(moved)).size,moved.nodes.length);
});
test("V0.40 roots may not be nested and illegal cycle-like placement is blocked",()=>{
 const doc=seedSlotDocument();
 assert.throws(()=>moveIntoSlot(doc,"section-one","section-two","content"),/Root sections/);
 assert.throws(()=>moveIntoSlot(doc,"stack-one","stack-one","items"),/Slot rejects/);
 assert.throws(()=>moveIntoSlot(doc,"feature-one","not-found","content"),/Invalid target/);
});
test("V0.40 typed props update validates both leaf and container without changing source",()=>{
 const doc=seedSlotDocument();
 const edited=updateSlotProps(doc,"section-one",{layout:"split"});
 assert.equal(edited.nodes[0].props.layout,"split");
 assert.equal(doc.nodes[0].props.layout,"vertical");
 assert.throws(()=>updateSlotProps(doc,"section-one",{layout:"javascript"}),/Invalid container/);
 assert.throws(()=>updateSlotProps(doc,"hero-one",{title:""}),/Invalid title/);
 assert.equal(updateSlotProps(doc,"section-one",{layout:"vertical"}),doc);
});
test("V0.40 preview insert does not modify active document until explicit confirmation",()=>{
 const original=createCommandSession();
 const planned=previewCommand(original,{kind:"insert",...input,parentId:"stack-one",slot:"items"});
 assert.equal(original.doc.nodes.length,7);
 assert.equal(planned.proposedDoc.nodes.length,8);
 assert.equal(planned.requiresExplicitConfirmation,true);
 assert.throws(()=>confirmCommand(original,planned),/Explicit/);
 const accepted=confirmCommand(original,planned,{confirm:true});
 assert.equal(accepted.doc.nodes.length,8);
 assert.equal(accepted.revision,2);
 assert.equal(original.revision,1);
});
test("V0.40 stale preview fails if document or revision has changed",()=>{
 const original=createCommandSession();
 const plan=previewCommand(original,{kind:"move",nodeId:"feature-two",parentId:"stack-one",slot:"items"});
 const next=confirmCommand(original,plan,{confirm:true});
 assert.throws(()=>confirmCommand(next,plan,{confirm:true}),/Stale preview/);
});
test("V0.40 preview tampering is detected and invalid commands fail closed",()=>{
 const s=createCommandSession();
 const plan=previewCommand(s,{kind:"edit",nodeId:"section-one",props:{layout:"split"}});
 plan.proposedDoc.nodes[0].props.layout="vertical";
 assert.throws(()=>confirmCommand(s,plan,{confirm:true}),/Preview tampering/);
 assert.throws(()=>previewCommand(s,{kind:"eval",script:"alert(1)"}),/Unsupported/);
 assert.throws(()=>previewCommand(s,{kind:"insert",...input,parentId:"stack-one",slot:"items",dangerousHTML:"<script>"}),/Unsupported/);
 assert.throws(()=>previewCommand(s,{kind:"edit",nodeId:"section-one",props:{layout:"vertical"}}),/No effective/);
});
test("V0.40 previewed move and edit are local deterministic state changes",()=>{
 const s=createCommandSession();
 const m=previewCommand(s,{kind:"move",nodeId:"feature-two",parentId:"stack-one",slot:"items"});
 const afterMove=confirmCommand(s,m,{confirm:true});
 assert.equal(afterMove.revision,2);
 const e=previewCommand(afterMove,{kind:"edit",nodeId:"section-one",props:{layout:"split"}});
 const done=confirmCommand(afterMove,e,{confirm:true});
 assert.equal(done.revision,3);
 assert.equal(done.doc.nodes.find(n=>n.id==="section-one").props.layout,"split");
});
