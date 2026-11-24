// Original formulas and classic 4x4 ordered threshold matrix. No external code or network.
export function loopCurve(order){const k=Math.max(3,Math.min(11,Math.round(Number(order)||7)));let d="";for(let i=0;i<=480;i++){const t=2*Math.PI*i/480;d+=(i?"L":"M")+(160+86*Math.cos(t)+26*Math.cos(k*t)).toFixed(2)+" "+(110+59*Math.sin(t)-23*Math.sin(k*t)).toFixed(2)+" ";}return d+"Z";}
export function thresholdField(level){const bias=Math.max(-32,Math.min(32,Math.round(Number(level)||0)));const rank=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];const width=96,height=64,values=new Uint8Array(width*height);for(let y=0;y<height;y++)for(let x=0;x<width;x++){const dx=(x-48)/48,dy=(y-32)/32;const tone=128+75*Math.cos(7*Math.hypot(dx,dy*.8)+dx*2)+32*Math.sin(dx*7-dy*3)+bias;values[y*width+x]=tone>((rank[y%4][x%4]+.5)*16)?1:0;}return {width,height,values};}
export function mountPrintAtoms(root=document){
  for(const card of root.querySelectorAll('[data-fx61-loop]')){
    const range=card.querySelector('input'),path=card.querySelector('[data-fx61-path]'),out=card.querySelector('output');if(!range||!path||!out)continue;
    const render=()=>{path.setAttribute('d',loopCurve(range.value));out.value=range.value;};range.addEventListener('input',render);render();
  }
  for(const card of root.querySelectorAll('[data-fx61-dither]')){
    const range=card.querySelector('input'),canvas=card.querySelector('canvas'),out=card.querySelector('output');if(!range||!canvas||!out)continue;
    const ctx=canvas.getContext('2d');if(!ctx){range.disabled=true;continue;}
    const render=()=>{const {width,height,values}=thresholdField(range.value);canvas.width=width;canvas.height=height;const pixels=ctx.createImageData(width,height);for(let i=0;i<values.length;i++){const c=values[i]?[29,49,47]:[244,230,199];pixels.data.set([...c,255],i*4);}ctx.putImageData(pixels,0,0);out.value=range.value;};range.addEventListener('input',render);render();
  }
}
