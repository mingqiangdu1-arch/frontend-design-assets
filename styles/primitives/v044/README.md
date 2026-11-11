# V0.44 · 12 independent original navigation, utility and HUD atoms

All materials in [interface-atoms.css](interface-atoms.css) are **original, small, opt-in native CSS components**. They do not build a product, include JS/data APIs, install external code, or add a React export or global theme. Copy a selected `.fx44-*` class and its associated descendant selectors and fallbacks only.

| ID | Scoped class | Concrete real material | Semantic / usage boundary |
| --- | --- | --- | --- |
| FX-015 | `.fx44-cut-button` | Angular, clipped action button | Use on real button / link, with explicit action in host |
| FX-016 | `.fx44-segmented` | Native radio segmented picker | Fieldset + legend + radio inputs share a name; state works without JS |
| FX-017 | `.fx44-compass-nav` | Four-way compass navigation | Anchor links to real destinations, not keyboard arrow-key grid widget |
| FX-018 | `.fx44-progress-rail` | Connected ordered progress steps | `<ol>`; host updates `aria-current=step` and data-state |
| FX-019 | `.fx44-telemetry` | Status/KPI instrument card | Static sample values; use `<output>` and live source of truth in target |
| FX-020 | `.fx44-reticle` | Static crosshair/HUD indicator | Purely visual; target must add accessible text or decorative hiding |
| FX-021 | `.fx44-disclosure` | Native accordion/disclosure shell | `<details><summary>` works without JS |
| FX-022 | `.fx44-event-timeline` | Milestone rail and dated event labels | Semantic list + `<time>`; data supplied by host |
| FX-023 | `.fx44-filter-chip` | Checkbox-driven selectable chips | Native checkbox selection, no implicit backend filtering |
| FX-024 | `.fx44-terminal` | Terminal/log viewer shell | Use real `<pre><code>` content; never execute untrusted text |
| FX-025 | `.fx44-level-meter` | Five-segment game/telemetry level visual | Real `<meter>` displays accessible value; decorative segments mirror a provided `data-level` |
| FX-026 | `.fx44-pixel-badge` | Arcade pixel badge | Static ornament; essential status must also be in DOM text |

**Standalone specimen:** [playground/interface-atoms-v044/index.html](../../../playground/interface-atoms-v044/index.html). Run `npm run dev:catalog`, open `http://127.0.0.1:8009/playground/interface-atoms-v044/`. The specimen has **real anchor, radio, checkbox and details controls**; no JS, external assets, global theme or backend.

All 12 class families include optional `--fx44-*` variables and a scoped `forced-colors` fallback. Movement is limited to hover/color changes and can be disabled via `prefers-reduced-motion`. **This does not establish production keyboard/a11y/mobile certification**. Components are examples of markup and CSS for selective adaptation, not published packages.