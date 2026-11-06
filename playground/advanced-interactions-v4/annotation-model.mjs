// IP-027 / source-anchored annotation model, with intentional orphan recovery.
export const ANCHORS=Object.freeze(["paragraph-a","paragraph-b","paragraph-c"]);
export const NOTES=Object.freeze([
 {id:"note-1",anchorId:"paragraph-a",label:"01",author:"类型 · 文案",content:"这段介绍可以进一步说明操作场景。",revision:1,status:"open"},
 {id:"note-2",anchorId:"paragraph-b",label:"02",author:"类型 · 术语",content:"请统一“结构配方”在页面中的含义。",revision:2,status:"resolved"},
 {id:"note-3",anchorId:"missing-source",label:"03",author:"类型 · 来源",content:"原始锚点已移除，保留孤立标注供人工处理。",revision:1,status:"orphan"}
]);
export function validateAnnotations(notes){
 if(!Array.isArray(notes))throw Error("Missing notes");
 const ids=new Set();
 for(const n of notes){
  if(!n.id||ids.has(n.id)||!n.anchorId||typeof n.content!=="string"||!Number.isInteger(n.revision)||n.revision<1)throw Error("Invalid annotation");
  ids.add(n.id);
 }
 return true;
}
export function projectAnnotations(notes,anchors){
 validateAnnotations(notes);
 const valid=new Set(anchors);
 return notes.map(n=>({...n,orphan:!valid.has(n.anchorId)}));
}
export function findAnnotation(notes,id){return notes.find(n=>n.id===id)||null;}
export function placeAnnotationOverlay(anchor,container,overlay,{gap=12}={}){
 const finite=v=>Number.isFinite(v);
 if(![anchor.left,anchor.right,anchor.top,anchor.bottom,container.left,container.right,container.top,container.bottom,overlay.width,overlay.height,gap].every(finite))throw Error("Invalid geometry");
 const roomRight=container.right-anchor.right-gap;
 const roomLeft=anchor.left-container.left-gap;
 const roomBelow=container.bottom-anchor.bottom-gap;
 const roomAbove=anchor.top-container.top-gap;
 let side="right",left=anchor.right+gap,top=anchor.top;
 if(roomRight>=overlay.width)side="right";
 else if(roomLeft>=overlay.width){side="left";left=anchor.left-overlay.width-gap;}
 else if(roomBelow>=overlay.height){side="below";left=anchor.left;top=anchor.bottom+gap;}
 else if(roomAbove>=overlay.height){side="above";left=anchor.left;top=anchor.top-overlay.height-gap;}
 else {side="clamped";left=anchor.left;top=anchor.bottom+gap;}
 // Constrain to the viewport/scroll container. Overlay may overflow only if larger than container.
 const maxX=Math.max(container.left,container.right-overlay.width);
 const maxY=Math.max(container.top,container.bottom-overlay.height);
 return {side,left:Math.min(maxX,Math.max(container.left,left)),
  top:Math.min(maxY,Math.max(container.top,top))};
}
