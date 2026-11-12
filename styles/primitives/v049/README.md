# V0.49 · Seven independently extractable creative controls / motion accents

[Original opt-in CSS](creative-controls.css) · [Local native-JS adapters](creative-controls.js) · [Semantic HTML specimen](../../../playground/creative-controls-v049/index.html). These are **not** one integrated editor, SDK, application, production package or React export.

| ID | Class | Real source behavior | Unsupported / host boundary |
| --- | --- | --- | --- |
| FX-063 | `.fx49-gradient-angle` | Native range and CSS gradient change | Native range 0–360 drives CSS gradient angle and output via tiny original local JS. No gradient-stop editor or saved configuration. |
| FX-064 | `.fx49-focal-target` | Two native range fields and live marker | Two native range fields update CSS 2D focal marker and percent outputs; demo uses original gradients, not image cropping or object recognition. |
| FX-065 | `.fx49-palette-choice` | Three native radios and CSS :has state | CSS :has radio state changes a sample artboard; no theme persistence or external document writes. Requires browser support for :has. |
| FX-066 | `.fx49-safe-area` | Native checkbox toggles print-guide layer | Native checkbox toggles sample guide overlay locally, not a calibrated print trim/bleed validator or a document layout editor. |
| FX-067 | `.fx49-blend-lab` | Native select changes CSS blend-mode | Native select switches CSS mix-blend-mode among explicit safe options; background is original gradients, not image compositing/export. |
| FX-068 | `.fx49-grid-density` | Native range changes visible grid spacing | Native range adjusts repeat-grid CSS background-size and text output; not a snapping, alignment or vector editor engine. |
| FX-069 | `.fx49-orbit-tracer` | Real focusable native button with hover/focus decoration | Original self-contained CSS animated dot travels around a rounded path only when button is hovered/focused; no timeline, background effect or service API. |

**Extraction instructions:** CSS selectors under the chosen class plus corresponding media-query fallback; matching semantic HTML from specimen; for FX-063/064/067/068 also include **only the applicable for-loop** from `creative-controls.js`, or the tiny source file. `CSS :has` is used for palette and print safety overlays and needs appropriate target-browser support checks.

**Accessibility and security:** Native range, select, checkbox and radio controls are keyboard accessible; output and marker values are meaningful samples. The CSS path tracer does not provide a backend action. JS uses bounded numbers and an allow-list for blend modes, local DOM traversal only, and no network/persistence/file APIs. Motion has `prefers-reduced-motion` static fallback; forced-colors is explicitly handled. Verify all semantics on target browsers/devices before actual use.
