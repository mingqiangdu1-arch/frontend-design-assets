// IP-065: ORIGINAL local preview/confirm boundary. NOT an authorization or secure execution API.
import {mapRegistryIntent} from "./registry-adapter.mjs";
import {seedSlotDocument,validateSlotDocument,moveIntoSlot,insertIntoSlot,updateSlotProps} from "./slot-tree.mjs";
const clone=x=>JSON.parse(JSON.stringify(x));
export function createCommandSession(doc=seedSlotDocument()){
 validateSlotDocument(doc);
 return {doc:clone(doc),revision:1};
}
const apply=(doc,c)=>{
 if(!c||typeof c!=="object"||Array.isArray(c))throw Error("Invalid command");
 if(c.kind==="move"&&Object.keys(c).every(k=>["kind","nodeId","parentId","slot","index"].includes(k)))
  return moveIntoSlot(doc,c.nodeId,c.parentId,c.slot,c.index);
 if(c.kind==="insert"&&Object.keys(c).every(k=>["kind","sourceId","instanceId","parentId","slot","index","props"].includes(k)))
  return insertIntoSlot(doc,mapRegistryIntent({sourceId:c.sourceId,instanceId:c.instanceId,props:c.props||{}}),c.parentId,c.slot,c.index);
 if(c.kind==="edit"&&Object.keys(c).every(k=>["kind","nodeId","props"].includes(k)))
  return updateSlotProps(doc,c.nodeId,c.props);
 throw Error("Unsupported or unsafe command");
};
export function previewCommand(session,command){
 if(!Number.isSafeInteger(session?.revision)||session.revision<1)throw Error("Invalid session revision");
 validateSlotDocument(session.doc);
 const source=JSON.stringify(session.doc),candidate=apply(session.doc,command);
 if(candidate===session.doc||JSON.stringify(candidate)===source)throw Error("No effective command change");
 validateSlotDocument(candidate);
 return {kind:"local-preview",expectedRevision:session.revision,sourceSnapshot:source,command:clone(command),proposedDoc:clone(candidate),summary:command.kind+" · preview only",requiresExplicitConfirmation:true};
}
export function confirmCommand(session,plan,{confirm=false}={}){
 if(confirm!==true)throw Error("Explicit local confirmation required");
 if(!plan||plan.kind!=="local-preview"||plan.requiresExplicitConfirmation!==true)throw Error("Unrecognized preview");
 if(session.revision!==plan.expectedRevision||JSON.stringify(session.doc)!==plan.sourceSnapshot)throw Error("Stale preview / revision conflict");
 const recalculated=previewCommand(session,plan.command);
 if(JSON.stringify(recalculated.proposedDoc)!==JSON.stringify(plan.proposedDoc))throw Error("Preview tampering or outdated mapping");
 return {doc:clone(recalculated.proposedDoc),revision:session.revision+1};
}
