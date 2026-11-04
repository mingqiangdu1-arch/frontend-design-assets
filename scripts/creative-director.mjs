import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const registry=JSON.parse(fs.readFileSync(path.join(root,"registry/creative-directions.json"),"utf8"));
function fnv32(value){
 let h=2166136261;for(const char of String(value)){h^=char.codePointAt(0);h=Math.imul(h,16777619);}
 return h>>>0;
}
function sample(array,seed,key){
 if(!Array.isArray(array)||array.length===0)throw Error("Empty creative grammar: "+key);
 return array[fnv32(String(seed)+"|"+key)%array.length];
}
export function generateDirection({style,seed="1",context="experimental website",variation=1}={}){
 if(!style)throw Error("Explicit --style=<id> or --style=surprise is required; no universal default");
 const choices=registry.styles;
 if(!choices?.length)throw Error("Creative registry empty");
 if(!Number.isInteger(variation)||variation<1||variation>1000)throw Error("variation must be integer between 1 and 1000");
 const chosen=style==="surprise"?sample(choices,seed,"style:"+variation):choices.find(x=>x.id===style);
 if(!chosen)throw Error("Unknown style: "+style);
 const salt=String(seed)+"/"+variation+"/"+chosen.id;
 const selectedLayout=sample(chosen.layout,salt,"layout");
 const selectedType=sample(chosen.typography,salt,"type");
 const selectedTexture=sample(chosen.texture,salt,"texture");
 const selectedMotion=sample(chosen.motion,salt,"motion");
 const selectedInteraction=sample(chosen.interactions,salt,"interaction");
 const unexpected=sample(chosen.surprise,salt,"twist");
 return {schemaVersion:"1.0",styleId:chosen.id,styleName:chosen.label,conceptId:chosen.id+"-"+fnv32(salt).toString(36),
  seed:String(seed),variation,context:String(context),origin:"original prompt guidance, not generated page code",
  artDirection:chosen.archetype,chosenLayout:selectedLayout,typography:selectedType,signatureTexture:selectedTexture,
  interaction:selectedInteraction,motion:selectedMotion,creativeTwist:unexpected,
  avoid:chosen.negative,qualityCaution:chosen.caution,
  modelTask:"Invent an original layout for the requested context using this visual grammar. Preserve content hierarchy, keyboard access, color contrast, reduced motion and explicit task-specific information. Do not recreate the demo composition, borrow third-party design assets or imply production readiness.",
  styleTokens:"styles/"+chosen.id+"/tokens.json",
  status:"research-brief-only",
  reactPackageCompatible:false};
}
export function generateCollection({style,seed="1",context="experimental website",count=3}={}){
 if(!Number.isInteger(count)||count<1||count>12)throw Error("count must be between 1 and 12");
 return Array.from({length:count},(_,i)=>generateDirection({style,seed,context,variation:i+1}));
}
export function toMarkdown(items){
 return ["# Creative direction candidates","",
 "Research-only art-direction briefs. Each suggestion must be critically adapted, not copied as a template.","",
 ...items.flatMap(item=>[
 "## "+item.conceptId+" · "+item.styleName,
 "- Context: "+item.context,
 "- Visual argument: "+item.artDirection,
 "- Composition: "+item.chosenLayout,
 "- Typography: "+item.typography,
 "- Texture: "+item.signatureTexture,
 "- Interaction: "+item.interaction,
 "- Motion: "+item.motion,
 "- Creative challenge: "+item.creativeTwist,
 "- Avoid: "+item.avoid.join("; "),
 "- Caution: "+item.qualityCaution,
 "- Tokens: "+item.styleTokens,
 "- Implement as: "+item.modelTask,""
 ])].join("\n");
}
export function runCLI(argv){
 const args=Object.fromEntries(argv.filter(x=>x.startsWith("--")).map(x=>{
  const i=x.indexOf("=");return i<0?[x.slice(2),true]:[x.slice(2,i),x.slice(i+1)];
 }));
 if(args.help)return "Usage: node scripts/creative-director.mjs --style=<pixel-arcade|signal-noir|paper-rebellion|aether-orbit|surprise> --context=<task> --seed=<text> --count=<1..12> --format=<markdown|json>\\nNo implicit default style.";
 const count=args.count===undefined?3:Number(args.count);
 const collection=generateCollection({style:args.style,seed:args.seed??"1",context:args.context??"experimental website",count});
 const outputFormat=args.format??"markdown";
 if(outputFormat==="json")return JSON.stringify({count:collection.length,briefs:collection,warning:"Model guidance only, not automatically installable style modules"},null,2);
 if(outputFormat!=="markdown")throw Error("Unsupported output format "+outputFormat);
 return toMarkdown(collection);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{console.log(runCLI(process.argv.slice(2)));}
 catch(error){console.error("Creative direction blocked: "+error.message);process.exitCode=1;}
}
