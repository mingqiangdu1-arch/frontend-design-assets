import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {buildHandoff} from "./find-assets.mjs";
import {validateFitProfile,rankExperienceRecipes,validateFitConstraints} from "./evaluate-experience.mjs";

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const experienceRegistry=JSON.parse(fs.readFileSync(path.join(root,"registry/experience-compositions.json"),"utf8"));

export function validateExperienceRegistry(registry,assets){
 if(registry.defaultRecipeId!==null)throw Error("Experience recipes must not have a default");
 if(!Array.isArray(registry.recipes)||!registry.recipes.length)throw Error("Experience registry empty");
 const seen=new Set(),contexts=new Map(),byAsset=new Map(assets.map(a=>[a.id,a]));
 for(const recipe of registry.recipes){
  if(!/^XC-\d{3}$/.test(recipe.id)||seen.has(recipe.id))throw Error("Duplicate/invalid recipe ID: "+recipe.id);
  seen.add(recipe.id);
  if(!Array.isArray(recipe.contexts)||!recipe.contexts.length||
    new Set(recipe.contexts).size!==recipe.contexts.length)throw Error("Invalid recipe contexts: "+recipe.id);
  for(const field of ["title","structure","navigation","interaction","mobile","accessibility","visual","avoid"]){
   if(typeof recipe[field]!=="string"||!recipe[field].trim())throw Error("Missing "+field+" for "+recipe.id);
  }
  for(const field of ["priority","sections"]){
   if(!Array.isArray(recipe[field])||recipe[field].length<3||
      recipe[field].some(x=>typeof x!=="string"||!x.trim()))throw Error("Incomplete "+field+" for "+recipe.id);
  }
  if(recipe.stage!=="research-brief-only")throw Error("Invalid maturity for "+recipe.id);
  validateFitProfile(recipe.fitProfile,recipe.id);
  if(!Array.isArray(recipe.assetIds)||!recipe.assetIds.length||
     new Set(recipe.assetIds).size!==recipe.assetIds.length)throw Error("Invalid interaction assets for "+recipe.id);
  for(const id of recipe.assetIds){
   const asset=byAsset.get(id);
   if(!asset||asset.type!=="interaction")throw Error("Unknown/non-interaction reference: "+recipe.id+" "+id);
   if(asset.styleIds?.length)throw Error("Style-bound behavior in neutral recipe: "+recipe.id+" "+id);
  }
  for(const context of recipe.contexts){
   const items=contexts.get(context)||[];
   items.push(recipe);
   contexts.set(context,items);
  }
 }
 for(const [context,items] of contexts){
  if(items.length<2)throw Error("Need two architectures for context "+context);
  if(new Set(items.map(r=>r.structure)).size!==items.length)throw Error("Duplicated structure for context "+context);
 }
 return {recipes:registry.recipes.length,contexts:contexts.size};
}

export function createExperienceDirections({context="",templateContexts=[],styleId="",limit=2,fit={}}={},assets,policies={},source=experienceRegistry){
 if(!Number.isInteger(limit)||limit<0||limit>4)throw Error("concept count must be between 0 and 4");
 const criteria=validateFitConstraints(fit);
 if(limit===0)return [];
 const contexts=context?[context]:templateContexts;
 if(!Array.isArray(contexts)||!contexts.length)return [];
 const lookup=new Map(assets.map(a=>[a.id,a]));
 return rankExperienceRecipes(source.recipes.filter(r=>r.contexts.some(x=>contexts.includes(x)))
  .sort((a,b)=>a.id.localeCompare(b.id)),criteria).slice(0,limit).map(recipe=>({
   id:recipe.id,title:recipe.title,source:"registry/experience-compositions.json",
   fitProfile:recipe.fitProfile,fitEvaluation:recipe.fitEvaluation,
   status:recipe.stage,mode:"architecture-reference",styleId:styleId||null,
   styleNote:"An architectural alternative only; no cross-style token, HTML, or React compatibility is implied.",
   contexts:recipe.contexts,
   spatialModel:recipe.structure,contentPriority:recipe.priority,sections:recipe.sections,
   navigation:recipe.navigation,primaryInteraction:recipe.interaction,
   mobileAdaptation:recipe.mobile,accessibleFallback:recipe.accessibility,
   visualHierarchy:recipe.visual,avoid:recipe.avoid,
   behaviorReferences:recipe.assetIds.map(id=>{
    const asset=lookup.get(id);
    if(!asset)throw Error("Missing recipe behavior reference: "+recipe.id+" "+id);
    return {id,name:asset.name,status:"adapt-required",
     fit:contexts.some(c=>asset.applicationContexts.includes(c))?"declared-context":"manual-context-adaptation",
     handoff:buildHandoff(asset,policies)};
   })
  }));
}
