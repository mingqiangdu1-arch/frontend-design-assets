// Transparent declared-fit heuristics, NOT an empirical quality measure.
// An absent user constraint is excluded from scoring (no secret defaults).
export const FIT_AXES=Object.freeze({
 density:["low","medium","high"],
 device:["mobile","responsive","desktop"],
 complexity:["simple","guided","expert"],
 expression:["restrained","expressive","immersive"]
});
export const FIT_BASIS="research-heuristic-from-declared-catalog-profiles";
const isObject=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);

export function validateFitProfile(profile,context="recipe"){
 if(!isObject(profile))throw Error("Missing fitProfile: "+context);
 for(const [axis,levels] of Object.entries(FIT_AXES)){
  if(!levels.includes(profile[axis]))throw Error("Invalid "+axis+" in fitProfile: "+context);
 }
 for(const field of ["evidence","tradeoff"]){
  if(typeof profile[field]!=="string"||!profile[field].trim())throw Error("Missing "+field+" in fitProfile: "+context);
 }
 return true;
}
export function validateFitConstraints(constraints={}){
 if(!isObject(constraints))throw Error("Fit constraints must be an object");
 const result={};
 for(const [axis,levels] of Object.entries(FIT_AXES)){
  const requested=constraints[axis]??"";
  if(typeof requested!=="string"||requested&&!levels.includes(requested))
   throw Error("Unknown "+axis+" preference: "+String(requested));
  result[axis]=requested;
 }
 for(const key of Object.keys(constraints)){
  if(!Object.hasOwn(FIT_AXES,key))throw Error("Unknown fit criterion: "+key);
 }
 return result;
}
export function evaluateFitProfile(profile,constraints={}){
 validateFitProfile(profile);
 const requested=validateFitConstraints(constraints);
 const details=[];
 for(const [axis,levels] of Object.entries(FIT_AXES)){
  if(!requested[axis])continue;
  // Adjacent ordinal fit is partial; extreme opposition scores zero.
  // These are explicitly labeled preference matches, never UX grade.
  const distance=Math.abs(levels.indexOf(profile[axis])-levels.indexOf(requested[axis]));
  const points=Math.max(0,2-distance);
  details.push({axis,requested:requested[axis],declared:profile[axis],fit:
   points===2?"aligned":points===1?"partial":"conflict",
   points,maxPoints:2});
 }
 if(!details.length)return {status:"not-assessed",score:null,maxScore:null,
  criteria:[],relative:"not-ranked",evidence:profile.evidence,tradeoff:profile.tradeoff,
  caveat:"No user preferences supplied. Alternatives remain unranked."};
 return {status:FIT_BASIS,score:details.reduce((total,d)=>total+d.points,0),
  maxScore:details.length*2,criteria:details,relative:"pending-comparison",
  evidence:profile.evidence,tradeoff:profile.tradeoff,
  caveat:"Heuristic fit to explicitly supplied preferences, not verified visual quality, usability, accessibility or production suitability."};
}
export function rankExperienceRecipes(recipes,constraints={}){
 const requested=validateFitConstraints(constraints);
 const evaluated=recipes.map(recipe=>({...recipe,fitEvaluation:evaluateFitProfile(recipe.fitProfile,requested)}));
 if(!Object.values(requested).some(Boolean))return evaluated;
 evaluated.sort((a,b)=>b.fitEvaluation.score-a.fitEvaluation.score||a.id.localeCompare(b.id));
 const firstScore=evaluated[0]?.fitEvaluation.score;
 const topCount=evaluated.filter(x=>x.fitEvaluation.score===firstScore).length;
 return evaluated.map((recipe,index)=>({
  ...recipe,fitEvaluation:{...recipe.fitEvaluation,
   relative:evaluated.length===1?"only-indexed-candidate":
    recipe.fitEvaluation.score===firstScore?
      firstScore<Math.ceil(recipe.fitEvaluation.maxScore/2)?"weak-fit-hypothesis":
      topCount>1?"tied-hypothesis":"leading-hypothesis":
    recipe.fitEvaluation.score===0?"conflicting-alternative":"tradeoff-alternative",
   rank:index+1, comparedAgainst:evaluated.length,
   decision:"Not a default selection. Inspect all constraints, evidence and tradeoffs before choosing a design."
  }
 }));
}
