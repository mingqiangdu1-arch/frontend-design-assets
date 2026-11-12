/* FX-050: original bounded pointer interaction.  Avoids global listeners and
 * honors reduced-motion and keyboard focus. Host owns actual navigation. */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
for (const card of document.querySelectorAll(".fx47-holo-card")) {
  const reset = () => {
    card.style.setProperty("--fx47-rx", "0deg");
    card.style.setProperty("--fx47-ry", "0deg");
    card.style.setProperty("--fx47-x", "50%");
    card.style.setProperty("--fx47-y", "50%");
  };
  card.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    const bounds = card.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    card.style.setProperty("--fx47-ry", ((x - 0.5) * 12).toFixed(2) + "deg");
    card.style.setProperty("--fx47-rx", ((0.5 - y) * 12).toFixed(2) + "deg");
    card.style.setProperty("--fx47-x", (x * 100).toFixed(1) + "%");
    card.style.setProperty("--fx47-y", (y * 100).toFixed(1) + "%");
  });
  card.addEventListener("pointerleave", reset);
  card.addEventListener("blur", reset);
  reducedMotion.addEventListener?.("change", reset);
}
