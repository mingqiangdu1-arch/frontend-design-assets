// Original, bounded local editing models. No network or storage.
export function bounded(value,min,max,fallback=min){const n=Number(value);return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;}

export function hexColor(value,fallback="#315b72"){return /^#[0-9a-f]{6}$/i.test(String(value))?String(value).toLowerCase():fallback;}

export function hslToRgb(h,s,l){h=bounded(h,0,360,210);s=bounded(s,0,100,60)/100;l=bounded(l,0,100,50)/100;const a=s*Math.min(l,1-l);const c=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1))));};return [c(0),c(8),c(4)];}

export function rgbHex(rgb){return "#"+rgb.map(v=>Math.round(bounded(v,0,255)).toString(16).padStart(2,"0")).join("");}

export function stopGradient(a,b,c,position){return `linear-gradient(90deg,${hexColor(a)} 0%,${hexColor(b,"#d6a55d")} ${bounded(position,1,99,50)}%,${hexColor(c,"#d05c48")} 100%)`;}

export function compositeRgb(fg,bg,opacity){const a=bounded(opacity,0,100,50)/100;const parse=h=>hexColor(h).slice(1).match(/../g).map(x=>parseInt(x,16));const front=parse(fg),back=parse(bg);return front.map((v,i)=>Math.round(v*a+back[i]*(1-a)));}

export function bezierPath(x1,y1,x2,y2){const mapX=x=>20+240*bounded(x,0,100)/100,mapY=y=>160-140*bounded(y,0,100)/100;return `M20 160 C${mapX(x1)} ${mapY(y1)} ${mapX(x2)} ${mapY(y2)} 260 20`;}

export function insetMask(inset,radius){return `inset(${bounded(inset,0,40,10)}% round ${bounded(radius,0,50,10)}%)`;}

export function mountEditingAtoms(root=document){
 const cleanups=[];
 for(const card of root.querySelectorAll('[data-fx62]')){
  const mode=card.dataset.fx62, fields=Object.fromEntries(Array.from(card.querySelectorAll('[data-field]'),e=>[e.dataset.field,e]));
  const val=k=>fields[k]?.value, out=(k,value)=>{const e=card.querySelector('[data-output="'+k+'"]');if(e)e.value=String(value);};
  const write=(k,v)=>card.style.setProperty('--fx62-'+k,v);
  const render=()=>{
   if(mode==='hsl'){
    const h=bounded(val('h'),0,360),s=bounded(val('s'),0,100),l=bounded(val('l'),0,100),hex=rgbHex(hslToRgb(h,s,l));
    write('h',h);write('s',s+'%');write('l',l+'%');write('py',(100-l)+'%');write('color',hex);out('h',h+'°');out('s',s+'%');out('l',l+'%');out('result',hex);
    // The plane uses 21 rows of exact HSL lightness gradients, sampled every 5 percentage points.
    const plane=card.querySelector('[data-plane]');if(plane&&plane.dataset.hue!==String(h)){for(const row of plane.querySelectorAll('[data-lightness]')){const light=Number(row.dataset.lightness);row.style.background='linear-gradient(90deg,hsl('+h+' 0% '+light+'%),hsl('+h+' 100% '+light+'%))';}plane.dataset.hue=String(h);}
   }else if(mode==='stops'){
    const pos=bounded(val('pos'),1,99,50);write('gradient',stopGradient(val('a'),val('b'),val('c'),pos));write('pos',pos+'%');out('pos',pos+'%');out('result',stopGradient(val('a'),val('b'),val('c'),pos));
   }else if(mode==='alpha'){
    const a=bounded(val('alpha'),0,100,60),fg=hexColor(val('fg'));write('alpha',a/100);write('fg',fg);out('alpha',a+'%');out('light',rgbHex(compositeRgb(fg,'#f4efe4',a)));out('dark',rgbHex(compositeRgb(fg,'#202a32',a)));
   }else if(mode==='finish'){
    const r=bounded(val('rough'),0,100,45),tilt=bounded(val('tilt'),-45,45,0);write('blur',(r/12).toFixed(2)+'px');write('shine',(1-r*.008).toFixed(2));write('spread',(18+r*.65)+'%');write('tilt',tilt+'deg');out('rough',r+'%');out('tilt',tilt+'°');
   }else if(mode==='bezier'){
    const v=['x1','y1','x2','y2'].map(k=>bounded(val(k),0,100));const path=card.querySelector('[data-curve]');if(path)path.setAttribute('d',bezierPath(...v));const point=(x,y)=>[20+2.4*x,160-1.4*y];const [p1,p2]=[point(v[0],v[1]),point(v[2],v[3])];for(const [i,p] of [[1,p1],[2,p2]]){const dot=card.querySelector('[data-point="'+i+'"]'),line=card.querySelector('[data-handle="'+i+'"]');if(dot){dot.setAttribute('cx',p[0]);dot.setAttribute('cy',p[1]);}if(line){line.setAttribute('x2',p[0]);line.setAttribute('y2',p[1]);}}['x1','y1','x2','y2'].forEach((k,i)=>out(k,(v[i]/100).toFixed(2)));out('result','cubic-bezier('+v.map(x=>(x/100).toFixed(2)).join(', ')+')');
   }else if(mode==='mask'){
    const inset=bounded(val('inset'),0,40,8),radius=bounded(val('radius'),0,50,10);write('mask',insetMask(inset,radius));out('inset',inset+'%');out('radius',radius+'%');out('result',insetMask(inset,radius));
   }
  };
  card.addEventListener('input',render);cleanups.push(()=>card.removeEventListener('input',render));
  // Native sliders are the full keyboard alternative; the plane is a pointer shortcut only.
  const plane=card.querySelector('[data-plane]');if(mode==='hsl'&&plane&&fields.s&&fields.l){
   let active=null;
   const move=e=>{if(active!==e.pointerId)return;const rect=plane.getBoundingClientRect();if(!rect.width||!rect.height)return;fields.s.value=String(Math.round(bounded((e.clientX-rect.left)/rect.width*100,0,100)));fields.l.value=String(Math.round(bounded((1-(e.clientY-rect.top)/rect.height)*100,0,100)));render();};
   const down=e=>{if(active!==null||e.button!==0)return;active=e.pointerId;plane.setPointerCapture(e.pointerId);move(e);};
   const end=e=>{if(active===e.pointerId)active=null;};
   for(const [event,handler] of [['pointerdown',down],['pointermove',move],['pointerup',end],['pointercancel',end],['lostpointercapture',end]]){plane.addEventListener(event,handler);cleanups.push(()=>plane.removeEventListener(event,handler));}
  }
  render();
 }
 return ()=>cleanups.forEach(fn=>fn());
}
