/* FX-120 · Native range input controls one adjacent preview scale only. */
document.querySelectorAll("[data-fx58-zoom]").forEach((root) => {
  const slider = root.querySelector('input[type="range"]');
  const output = root.querySelector("output");
  if (!slider || !output) return;
  const update = () => {
    const min = Number(slider.min) || 100;
    const max = Number(slider.max) || 200;
    const value = Number(slider.value);
    const percent = Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
    root.style.setProperty("--fx58-scale", String(percent / 100));
    output.value = String(percent) + "%";
    output.textContent = String(percent) + "%";
  };
  slider.addEventListener("input", update);
  update();
});
