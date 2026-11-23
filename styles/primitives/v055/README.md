# V0.55 · Tactile & physical-interface micro-materials

**Six new original, independently scoped CSS/HTML source atoms.** This batch emphasizes tactile materials, information hierarchy and real native controls. It complements V0.53 editorial composition and V0.54 external GPU/React references; it does not reproduce upstream components.

| ID | CSS family | Reuse intention | Honest behavior |
| --- | --- | --- | --- |
| FX-100 | `.fx55-etched-label` | Instrument panel / maker plaque / precision portfolio | Static, selectable type; CSS gradients, no external texture |
| FX-101 | `.fx55-signal-equalizer` | Music / creative tool / telemetry visual | **Static fictional sample**, not audio analysis; decorative bars are `aria-hidden` |
| FX-102 | `.fx55-selector` | Tactile, two-state visual choice | **Real native radio group** with checked, disabled and focus-visible; no persistence |
| FX-103 | `.fx55-museum-tag` | Cultural archive / editorial catalogue | Semantically ordered object label; no content repository |
| FX-104 | `.fx55-prism-edge` | Glass-like creative status / portfolio | CSS gradient treatment, **not** shader, refraction or GPU rendering |
| FX-105 | `.fx55-folded-panel` | Notes / detail disclosure / research item | **Real native details/summary** open-close; no server state |

**Original sources:** [tactile-atoms.css](tactile-atoms.css) and matching semantically correct HTML in the [independent specimen gallery](../../../playground/materials-v055/index.html). Extract only the selected `fx55-` family and markup, not the full gallery.

- Local CSS custom properties, no global selectors or `:root` token overrides; responsive at 420px.
- Static fiction is never presented as live data. Keyboard focus is visible on functional controls; reduced-motion rule included.
- Device/contrast/visual/browser integration is **not** production certified. No React public export, global theme, dependency, app or new test infrastructure.
