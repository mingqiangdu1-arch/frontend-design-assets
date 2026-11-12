/* FX-041: Original optional adapter for *local* range-to-reveal semantics.
   No audio/image loading, requests, persistence, animations, or global event traps. */
for (const root of document.querySelectorAll('.fx46-compare')) {
  const slider = root.querySelector('input[type="range"]');
  const output = root.querySelector('output');
  if (!slider || !output) continue;
  const sync = () => {
    const min = Number(slider.min || 0), max = Number(slider.max || 100);
    const value = Number(slider.value), ratio = max > min ? (value - min) / (max - min) : 0;
    const pct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    root.style.setProperty('--fx46-split', pct + '%');
    output.value = pct + '%';
    output.textContent = pct + '%';
  };
  slider.addEventListener('input', sync);
  sync();
}
