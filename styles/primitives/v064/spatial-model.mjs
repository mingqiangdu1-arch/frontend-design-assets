// V0.64 local models; no dependencies, external media or network.
export function clamp(n,min,max,fallback=min){n=Number(n);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback;}

export function seeded(seed){let state=(Math.trunc(clamp(seed,0,9999,1))>>>0)+1;return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};}

export function composition(gridSeed,contentSeed){const g=seeded(gridSeed),c=seeded(contentSeed);const columns=Array.from({length:4},()=>1+Math.floor(g()*4));const rows=Array.from({length:3},()=>1+Math.floor(g()*3));const order=[0,1,2,3,4,5];for(let i=order.length-1;i>0;i--){const j=Math.floor(c()*(i+1));[order[i],order[j]]=[order[j],order[i]];}return {columns,rows,order};}

export function arcOffsets(selected,count=5){const s=Math.round(clamp(selected,0,count-1,2));return Array.from({length:count},(_,i)=>{const d=i-s;return {offset:Math.min(54,d*d*8),rotation:clamp(d*8,-24,24),selected:i===s};});}

export function fitRect(viewW,viewH,artW,artH,left=0,right=0,top=0,bottom=0){const w=Math.max(1,viewW-left-right),h=Math.max(1,viewH-top-bottom);const scale=Math.min(w/artW,h/artH,1);return {scale,x:left+(w-artW*scale)/2,y:top+(h-artH*scale)/2};}

export function ribbonPath(pull){const p=clamp(pull,-30,30,0),x=y=>30+p*Math.sin(Math.PI*y/180)**2;return `M30 0 Q${30+p} 45 ${x(90)} 90 Q${30+p} 135 30 180 L90 180 Q${90+p} 135 ${x(90)+60} 90 Q${90+p} 45 90 0 Z`;}
export function mountSpatialAtoms(root=document){
 const cleanups=[];
 for(const card of root.querySelectorAll('[data-fx64]')){
 const mode=card.dataset.fx64,field=k=>card.querySelector('[data-field="'+k+'"]'),val=k=>field(k)?.value,out=(k,v)=>{const e=card.querySelector('[data-output="'+k+'"]');if(e)e.value=String(v);},write=(k,v)=>card.style.setProperty('--fx64-'+k,v);
 let selected=2;
 const render=()=>{
 if(mode==='seed'){
 const g=Math.round(clamp(val('grid'),0,9999,31)),c=Math.round(clamp(val('content'),0,9999,61)),v=composition(g,c),board=card.querySelector('[data-board]');board.style.gridTemplateColumns=v.columns.map(x=>x+'fr').join(' ');board.style.gridTemplateRows=v.rows.map(x=>x+'fr').join(' ');Array.from(board.children).forEach((el,i)=>{el.dataset.tone=String(v.order[i]);el.textContent=String(v.order[i]+1).padStart(2,'0');});out('result','Grid '+g+' / Content '+c+' · '+v.columns.join(':')+' · '+v.rows.join(':'));
 }else if(mode==='type'){
 const bend=clamp(val('bend'),-25,25,0);const lines=Array.from(card.querySelectorAll('[data-line]'));lines.forEach((el,i)=>{el.style.transform='translateX('+((i-(lines.length-1)/2)*bend)+'px)';});out('bend',bend+'px');
 }else if(mode==='arc'){
 const nodes=Array.from(card.querySelectorAll('[data-item]'));arcOffsets(selected,nodes.length).forEach((v,i)=>{const el=nodes[i];el.style.setProperty('--fx64-offset',v.offset+'px');el.style.setProperty('--fx64-rot',v.rotation+'deg');el.setAttribute('aria-pressed',String(v.selected));});out('selected',nodes[selected]?.dataset.title||'');
 }else if(mode==='fit'){
 const inset=Math.round(clamp(val('inset'),0,100,40)),view=card.querySelector('[data-view]'),art=card.querySelector('[data-art]'),panel=card.querySelector('[data-inset]');const w=view.clientWidth,h=view.clientHeight;if(!w||!h)return;const left=w*inset/100*0.45;const r=fitRect(w,h,240,150,left,0,0,0);panel.style.width=left+'px';art.style.transform='translate('+r.x+'px,'+r.y+'px) scale('+r.scale+')';out('inset',Math.round(left)+'px');out('scale',Math.round(r.scale*100)+'%');
 }else if(mode==='link'){
 const k=String(selected);card.querySelectorAll('[data-link]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.link===k)));card.querySelectorAll('[data-node]').forEach(e=>e.classList.toggle('fx64-linked__active',e.dataset.node===k));out('selected',['Frame / rect','Orbit / circle','Accent / path'][selected]||'');
 }else if(mode==='ribbon'){
 const p=clamp(val('pull'),-30,30);card.querySelector('[data-ribbon]').setAttribute('d',ribbonPath(p));out('pull',p+' units');
 }};
 const click=e=>{const button=e.target.closest('button');if(!button||!card.contains(button))return;
 if(mode==='seed'&&button.dataset.next){const k=button.dataset.next;if(k==='grid'||k==='content'){field(k).value=String((Math.round(clamp(val(k),0,9999))+1)%10000);render();}}
 if(mode==='arc'&&button.hasAttribute('data-item')){selected=Array.from(card.querySelectorAll('[data-item]')).indexOf(button);render();}
 if(mode==='link'&&button.hasAttribute('data-link')){selected=Math.round(clamp(button.dataset.link,0,2));render();}
 };if(mode==='link')selected=0;
 card.addEventListener('input',render);card.addEventListener('click',click);cleanups.push(()=>{card.removeEventListener('input',render);card.removeEventListener('click',click);});
 if(mode==='fit'&&typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(render);observer.observe(card.querySelector('[data-view]'));cleanups.push(()=>observer.disconnect());}
 render();
 }
 return ()=>cleanups.forEach(fn=>fn());
}
