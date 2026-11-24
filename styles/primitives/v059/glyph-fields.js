/* V0.59 · Four wholly original deterministic character-field studies.
 * One opt-in helper for FX-124..127. No canvas, network, timers or global state.
 * Renders visual text with textContent; accessible explanation lives in figcaption.
 */
(() => {
  const glyphs = " .:-=+*#%@";
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const TAU = Math.PI * 2;

  // Each mode is a distinct bounded, authored procedural field on a 0..1 domain.
  const fields = {
    wave(x, y, phase) {
      return .5 + .48 * Math.sin(x * .3 + Math.sin(y * .47 + phase) * 2.2 + phase) * Math.cos(y * .22);
    },
    moire(x, y, phase) {
      const u = Math.sin(x * .28 + y * .13 + phase);
      const v = Math.sin(x * .21 - y * .18 - phase * .7);
      return .5 + .5 * u * v;
    },
    fan(x, y, phase) {
      const a = Math.atan2(y, x);
      const radius = Math.hypot(x, y);
      return .5 + .5 * Math.sin(a * 9 + radius * .24 - phase * 1.7);
    },
    strata(x, y, phase) {
      const line = y - Math.sin(x * .16 + phase) * 3.2 - Math.cos(x * .08 - phase) * 2;
      const bands = Math.floor((line + 35) / 3);
      return clamp(.16 + ((bands % 7 + 7) % 7) / 7 + Math.sin(x * .3 + phase) * .09, 0, 1);
    }
  };

  function render(root) {
    const mode = root.dataset.glyphMode;
    const field = fields[mode];
    const pre = root.querySelector("[data-fx59-canvas]");
    const slider = root.querySelector('input[type="range"]');
    const output = root.querySelector("output");
    if (!field || !pre || !slider || !output) return;

    let phase = 0;
    const draw = () => {
      const columns = clamp(Math.round(Number(slider.value) || 44), 24, 72);
      const rows = 18;
      const lines = [];
      for (let row = 0; row < rows; row++) {
        let line = "";
        for (let col = 0; col < columns; col++) {
          const x = (col - columns / 2) * (44 / columns);
          const y = (row - rows / 2) * 1.8;
          const value = clamp(field(x, y, phase), 0, 1);
          line += glyphs[clamp(Math.floor(value * glyphs.length), 0, glyphs.length - 1)];
        }
        lines.push(line);
      }
      pre.textContent = lines.join("\n");
      output.textContent = String(columns);
      output.value = String(columns);
    };
    slider.addEventListener("input", draw);
    const seed = root.querySelector("[data-fx59-phase]");
    if (seed) seed.addEventListener("click", () => {
      phase = (phase + TAU / 7) % TAU;
      draw();
    });
    draw();
  }

  document.querySelectorAll("[data-fx59-glyph]").forEach(render);
})();
