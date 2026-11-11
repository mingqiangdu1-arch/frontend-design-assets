# V0.43 · Eight independent original CSS component atoms

These are **source-level design materials**. They are not a unified UI package, installer, published React exports or a built product. Use only the chosen CSS class and its optional custom variables; preserve its reduced-motion / forced-colors fallback.

| Asset | Source class | Original visual idea | Context / theme guidance |
| --- | --- | --- | --- |
| FX-007 | `.fx43-topographic` | Topographic contour surface | Map narratives, technical reports; signal-noir / organic-tactile |
| FX-008 | `.fx43-arch-window` | Arched media crop (no mask image download) | Culture, lifestyle, gallery; editorial-warm / organic-tactile |
| FX-009 | `.fx43-folded-paper` | Physical folded-corner sheet | Notes and archives; paper-rebellion / editorial-warm |
| FX-010 | `.fx43-ribbon-tile` | Corner ribbon via optional `data-ribbon` | Commerce and event discovery; commerce-atelier / playful-pop |
| FX-011 | `.fx43-reveal-figure` | Hover/focus-only caption with always-visible non-hover fallback | Portfolio/media catalog; type-led-minimal / signal-noir |
| FX-012 | `.fx43-switch` | Native checkbox with mechanical slider appearance | Device settings or game configuration; precision-dark / signal-noir |
| FX-013 | `.fx43-ink-link` | Responsive ink underline interaction | Editorial navigation; editorial-warm / type-led-minimal |
| FX-014 | `.fx43-isometric-grid` | Static isometric drafting material | 3D/workflow and creative tools; aether-orbit / precision-dark |

- **Source:** [`creative-components.css`](creative-components.css); all original browser-native CSS, no external font, images, JS runtime, copied vendor components or global theme.
- **Preview:** [`playground/creative-components-v043/index.html`](../../../playground/creative-components-v043/index.html) (`npm run dev:catalog`; open `http://127.0.0.1:8009/playground/creative-components-v043/`).
- FX-012 uses real `input[type=checkbox]` markup inside its label, not a fake visual-only switch. FX-011 shows caption on focus and devices without hover; its demo adds `tabindex` for keyboard discovery, but real accessible interactive media should have a useful action/alt description.
- FX-010 `data-ribbon` text is cosmetic; duplicate essential information in actual accessible text. For SVG/image-based containers, provide actual alt descriptions in target application.
- CSS uses `prefers-reduced-motion` and `forced-colors` fallbacks. Production browsers, a11y and detailed target-app compatibility are not certified by these reference files.