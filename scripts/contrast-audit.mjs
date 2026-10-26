import fs from "node:fs";
import {pathToFileURL} from "node:url";
import {fileURLToPath} from "node:url";
import path from "node:path";

export const ratio=(foreground,background)=>{
  const channel=x=>{const v=x/255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;};
  const luminance=hex=>{
    if(!/^#[0-9a-f]{6}$/i.test(hex))throw new Error("Unsupported color: "+hex);
    const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
    return rgb.map(channel).reduce((sum,val,i)=>sum+val*[0.2126,0.7152,0.0722][i],0);
  };
  const l1=luminance(foreground),l2=luminance(background);
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
};

export function inspectTheme(tokens){
 const color=tokens.colors;
 const checks=[
  ["normal text on surface",color.text,color.surface,4.5],
  ["secondary text on surface",color.textSecondary,color.surface,4.5],
  ["muted text on surface",color.textMuted,color.surface,4.5],
  ["normal text on canvas",color.text,color.canvas,4.5]
 ];
 if(color.accentText)checks.push(["accent button label",color.accentText,color.accent,4.5]);
 if(color.action&&color.surface)checks.push(["primary action label",color.surface,color.action,4.5]);
 return checks.map(([name,fg,bg,min])=>({
  name,foreground:fg,background:bg,required:min,ratio:+ratio(fg,bg).toFixed(2),
  pass:ratio(fg,bg)>=min
 }));
}
export function auditAll(root=process.cwd()){
 const styles=JSON.parse(fs.readFileSync(path.join(root,"registry/styles.json"),"utf8"));
 if(styles.defaultStyleId!==null)throw new Error("Global default theme is not allowed");
 const output=[];
 for(const style of styles.styles){
  const tokens=JSON.parse(fs.readFileSync(path.join(root,style.tokens.json),"utf8"));
  const css=fs.readFileSync(path.join(root,style.tokens.css),"utf8");
  const id=style.id;
  if(tokens.id&&tokens.id!==id)throw new Error(id+": token style mismatch");
  const scoped='[data-design-theme="'+id+'"]';
  if(!css.includes(scoped))throw new Error(id+": CSS missing scope selector");
  if(/(^|\n)\s*:root\s*\{/.test(css))throw new Error(id+": global root selector not allowed");
  for(const [name,value] of Object.entries(tokens.colors)){
   const cssName=(id==="refined-light-saas"?"--aw-":"--ds-")+name.replace(/[A-Z]/g,c=>"-"+c.toLowerCase());
   const re=new RegExp(cssName+"\\s*:\\s*"+value+"\\s*;","i");
   if(!re.test(css))throw new Error(id+": JSON/CSS token drift: "+name);
  }
  const result={styleId:id,checks:inspectTheme(tokens)};
  output.push(result);
 }
 return output;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const output=auditAll();
 for(const theme of output){
  for(const check of theme.checks)console.log(
    (check.pass?"PASS":"FAIL")+" | "+theme.styleId+" | "+check.name+" | "+check.ratio+":1 (min "+check.required+":1)"
  );
 }
 const failed=output.flatMap(x=>x.checks.filter(check=>!check.pass));
 if(failed.length){console.error(failed.length+" text contrast checks failed");process.exitCode=1;}
 else console.log("PASS "+output.length+" scoped styles; critical text contrast and JSON/CSS token consistency.");
}
