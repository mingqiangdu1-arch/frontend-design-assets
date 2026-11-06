// Original stepped dual-handle constraint model for IP-028.
// No rendered slider, pointer geometry, ARIA, server saving or gesture promise.
const finite=value=>typeof value==="number"&&Number.isFinite(value);
const round=n=>Number(n.toFixed(9));
export function validateRangeConfig({min,max,step,minSpan=0}={}){
 if(![min,max,step,minSpan].every(finite)||max<=min||step<=0||minSpan<0||minSpan>max-min)
  throw Error("Invalid numeric range configuration");
 const steps=(max-min)/step,gapSteps=minSpan/step;
 if(Math.abs(steps-Math.round(steps))>1e-7||Math.abs(gapSteps-Math.round(gapSteps))>1e-7)
  throw Error("Range bounds and minSpan must be step-aligned");
 return {min,max,step,minSpan};
}
const clamp=(v,lo,hi)=>Math.min(hi,Math.max(lo,v));
function align(value,config){
 const {min,max,step}=config;
 return round(min+clamp(Math.round((value-min)/step),0,Math.round((max-min)/step))*step);
}
export function validateRange(values,config){
 const c=validateRangeConfig(config);
 if(!Array.isArray(values)||values.length!==2||!values.every(finite))
  throw Error("Range must contain two finite values");
 const [low,high]=values;
 if(low<c.min||high>c.max||high-low+1e-9<c.minSpan||low>high)
  throw Error("Invalid range bounds or minimum span");
 if(Math.abs(align(low,c)-low)>1e-7||Math.abs(align(high,c)-high)>1e-7)
  throw Error("Range values must align to step");
 return [round(low),round(high)];
}
export function moveRangeHandle(values,handle,requested,config){
 const c=validateRangeConfig(config);
 const [low,high]=validateRange(values,c);
 if(!["low","high"].includes(handle))throw Error("Unknown range handle");
 if(!finite(requested))throw Error("Requested value must be finite");
 const snapped=align(requested,c);
 if(handle==="low"){
  const limit=align(high-c.minSpan,c);
  return [round(clamp(snapped,c.min,limit)),high];
 }
 const limit=align(low+c.minSpan,c);
 return [low,round(clamp(snapped,limit,c.max))];
}
export function stepRangeHandle(values,handle,direction,config,{large=false}={}){
 const c=validateRangeConfig(config);
 const [low,high]=validateRange(values,c);
 if(!Number.isInteger(direction)||![-1,1].includes(direction))throw Error("direction must be -1 or +1");
 if(typeof large!=="boolean")throw Error("large must be boolean");
 const current=handle==="low"?low:handle==="high"?high:NaN;
 if(!finite(current))throw Error("Unknown range handle");
 return moveRangeHandle(values,handle,current+direction*c.step*(large?10:1),c);
}
