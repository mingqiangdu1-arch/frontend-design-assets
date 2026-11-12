/* V0.51 original opt-in local adapters: aperture mask and flip card.
 * No third-party code, window listeners, network, analytics, persistence or imports.
 */
for(const figure of document.querySelectorAll('.fx51-aperture-reveal')){
 const stage=figure.querySelector('.stage');
 if(!stage) continue;
 const reset=()=>{figure.style.setProperty('--fx51-ap-size','0%');};
 stage.addEventListener('pointermove',event=>{
  const box=stage.getBoundingClientRect();if(!box.width||!box.height)return;
  const x=Math.max(0,Math.min(100,(event.clientX-box.left)*100/box.width));
  const y=Math.max(0,Math.min(100,(event.clientY-box.top)*100/box.height));
  figure.style.setProperty('--fx51-ap-x',x.toFixed(1)+'%');
  figure.style.setProperty('--fx51-ap-y',y.toFixed(1)+'%');
  figure.style.setProperty('--fx51-ap-size','28%');
 });
 stage.addEventListener('pointerleave',reset);
 stage.addEventListener('blur',reset);
}
for(const tile of document.querySelectorAll('.fx51-flip-tile')){
 const button=tile.querySelector('button');
 if(!button) continue;
 const sync=()=>{
  const flipped=tile.dataset.flipped==='true';
  button.setAttribute('aria-pressed',String(flipped));
  button.setAttribute('aria-label',flipped?'背面信息已显示；点击返回正面':'正面信息已显示；点击翻至背面');
 };
 button.addEventListener('click',()=>{
  tile.dataset.flipped=String(tile.dataset.flipped!=='true');
  sync();
 });
 sync();
}
