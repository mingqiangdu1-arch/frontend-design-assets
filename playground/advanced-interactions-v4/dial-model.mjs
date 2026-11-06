// IP-030 / precise numerical dial state. Dial angle is *derived*, never the source of truth.
export const DIAL_CONFIG=Object.freeze({min:0,max:100,step:5,unit:"%",startAngle:-135,endAngle:135});
const close=(a,b)=>Math.abs(a-b)<1e-8;
export function validateDialConfig(c){
 if(!c||![c.min,c.max,c.step,c.startAngle,c.endAngle].every(Number.isFinite)||c.max<=c.min||c.step<=0||c.endAngle<=c.startAngle)throw Error("Invalid dial configuration");
 const intervals=(c.max-c.min)/c.step;
 if(!close(intervals,Math.round(intervals)))throw Error("Step must divide numeric range");
 return true;
}
export function dialSnap(value,c=DIAL_CONFIG){
 validateDialConfig(c);
 if(!Number.isFinite(value))throw Error("Value must be finite");
 const steps=Math.round((Math.max(c.min,Math.min(c.max,value))-c.min)/c.step);
 return Number((c.min+steps*c.step).toFixed(8));
}
export function valueAngle(value,c=DIAL_CONFIG){
 return c.startAngle+(dialSnap(value,c)-c.min)/(c.max-c.min)*(c.endAngle-c.startAngle);
}
export function dialStep(value,direction,{coarse=false,config=DIAL_CONFIG}={}){
 return dialSnap(value+Math.sign(direction)*config.step*(coarse?5:1),config);
}
export function dialKey(value,key,{shift=false,config=DIAL_CONFIG}={}){
 if(key==="Home")return config.min;
 if(key==="End")return config.max;
 if(["ArrowUp","ArrowRight"].includes(key))return dialStep(value,1,{coarse:shift,config});
 if(["ArrowDown","ArrowLeft"].includes(key))return dialStep(value,-1,{coarse:shift,config});
 return value;
}
export function dialDrag(value,pixels,{pixelsPerStep=12,config=DIAL_CONFIG}={}){
 if(!Number.isFinite(pixels)||!Number.isFinite(pixelsPerStep)||pixelsPerStep<=0)throw Error("Invalid drag delta");
 const delta=Math.sign(pixels)*Math.floor(Math.abs(pixels)/pixelsPerStep);
 return dialSnap(value+delta*config.step,config);
}
