/* V0.49 • Original optional adapters for 4 independent CSS materials.
 * Scoped queries only; no localStorage, network, clipboard, globals, deps,
 * state manager, canvas editor, data writes or imported assets.
 */
for (const root of document.querySelectorAll(".fx49-gradient-angle")) {
  const slider=root.querySelector('input[type="range"]'), output=root.querySelector("output");
  if (!slider || !output) continue;
  const sync=()=>{const degrees=Math.max(0,Math.min(360,Number(slider.value)||0));root.style.setProperty("--fx49-angle",degrees+"deg");output.value=degrees+"°";output.textContent=degrees+"°";};
  slider.addEventListener("input",sync);sync();
}
for (const root of document.querySelectorAll(".fx49-focal-target")) {
  for (const axis of ["x","y"]) {
    const slider=root.querySelector('[data-axis="'+axis+'"]'), output=root.querySelector('[data-output="'+axis+'"]');
    if (!slider || !output) continue;
    const sync=()=>{const pct=Math.max(0,Math.min(100,Number(slider.value)||0));root.style.setProperty("--fx49-focal-"+axis,pct+"%");output.value=pct+"%";output.textContent=pct+"%";};
    slider.addEventListener("input",sync);sync();
  }
}
const allowedModes=new Set(["normal","multiply","screen","overlay"]);
for (const root of document.querySelectorAll(".fx49-blend-lab")) {
  const select=root.querySelector("select");if(!select)continue;
  const sync=()=>root.style.setProperty("--fx49-blend",allowedModes.has(select.value)?select.value:"normal");
  select.addEventListener("change",sync);sync();
}
for (const root of document.querySelectorAll(".fx49-grid-density")) {
  const slider=root.querySelector('input[type="range"]'),output=root.querySelector("output");if(!slider||!output)continue;
  const sync=()=>{const px=Math.max(8,Math.min(64,Number(slider.value)||24));root.style.setProperty("--fx49-cell",px+"px");output.value=px+" px";output.textContent=px+" px";};
  slider.addEventListener("input",sync);sync();
}
