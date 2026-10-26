import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
export function validateMatrix(root=process.cwd()){
 const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
 const matrix=read("registry/component-states.json");
 const components=read("registry/components.json");
 const styles=new Set(read("registry/styles.json").styles.map(x=>x.id));
 const known=new Set(components.entries.map(x=>x.id));
 const reviewed=new Set();
 if(matrix.maturity==="production-ready"||matrix.visualBaselineStatus!=="unapproved")throw Error("Matrix cannot self-approve visual readiness");
 if(new Set(matrix.styleIds).size!==matrix.styleIds.length)throw Error("Duplicate style in matrix");
 for(const id of matrix.styleIds){
  if(!styles.has(id)||!components.styleIds.includes(id))throw Error("Undeclared React-supported style "+id);
 }
 for(const group of matrix.stateCases){
  if(reviewed.has(group.id))throw Error("Duplicate group "+group.id);reviewed.add(group.id);
  if(!known.has(group.id)&&group.id!=="STATE-REQUEST")throw Error("Unknown component "+group.id);
  if(!group.states?.length||new Set(group.states).size!==group.states.length)throw Error("Missing/duplicate states "+group.id);
 }
 const declaredUncovered=matrix.uncoveredComponentIds;
 if(new Set(declaredUncovered).size!==declaredUncovered.length)throw Error("Duplicate uncovered component");
 for(const id of declaredUncovered)if(!known.has(id)||reviewed.has(id))throw Error("Invalid uncovered item "+id);
 if(components.entries.length!==declaredUncovered.length+reviewed.size-1)throw Error("Every export must be covered or explicitly listed uncovered");
 const source=fs.readFileSync(path.join(root,"playground/component-gallery/src/StateMatrix.tsx"),"utf8");
 for(const group of matrix.stateCases)if(!source.includes('id="'+group.id+'"'))throw Error("No rendered state group "+group.id);
 const baselines=read("registry/visual-baselines.json");
 if(baselines.status!=="unapproved")throw Error("Visual policy cannot automatically approve");
 if(Object.keys(baselines.approved||{}).length)throw Error("Repository has signed images; require separate controlled visual verification");
 return {declaredGroups:matrix.stateCases.length,coveredExports:reviewed.size-1,explicitUncovered:declaredUncovered.length,styles:matrix.styleIds.length};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const r=validateMatrix();console.log("PASS matrix: "+r.coveredExports+" exports, "+r.explicitUncovered+" uncovered, "+r.styles+" React themes; snapshots UNAPPROVED");
}
