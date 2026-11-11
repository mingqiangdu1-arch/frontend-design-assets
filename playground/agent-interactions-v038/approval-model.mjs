// IP-058 · Original local approval state model. NEVER use client approval as authorization.
const required=(v,name)=>{if(typeof v!=="string"||!v.trim())throw Error(name+" required");return v.trim();};
export function createApproval(){return {phase:"draft",proposal:null,receipt:null};}
export function proposePatch(state,{id,baseVersion,patchHash,summary}={}){
 if(state.phase!=="draft")throw Error("Reset before another proposal");
 const proposal={
  id:required(id,"ID"),baseVersion:required(baseVersion,"Base version"),
  patchHash:required(patchHash,"Patch hash"),summary:required(summary,"Summary")
 };
 if(!/^sha256:[0-9a-f]{8,64}$/.test(proposal.patchHash))throw Error("Invalid patch hash format");
 return {phase:"proposed",proposal,receipt:null};
}
export function decidePatch(state,{id,patchHash,decision}={}){
 if(!["approve","reject"].includes(decision))throw Error("Invalid decision");
 const p=state.proposal;
 if(!p||id!==p.id||patchHash!==p.patchHash)throw Error("Proposal identity/hash mismatch");
 const result=decision==="approve"?"approved":"rejected";
 if(state.phase===result)return state;
 if(state.phase!=="proposed")throw Error("Decision no longer permitted");
 return {...state,phase:result};
}
export function markPatchResult(state,{id,patchHash,currentVersion,operationId}={}){
 const p=state.proposal;
 if(!p||id!==p.id||patchHash!==p.patchHash)throw Error("Proposal identity/hash mismatch");
 if(state.phase!=="approved")throw Error("Approved proposal required");
 const version=required(currentVersion,"Current version");
 if(version!==p.baseVersion)return {...state,phase:"conflict",receipt:{kind:"conflict",expected:p.baseVersion,actual:version}};
 const op=required(operationId,"Operation receipt");
 return {...state,phase:"applied",receipt:{kind:"local-demo-only",operationId:op,baseVersion:version,patchHash}};
}
