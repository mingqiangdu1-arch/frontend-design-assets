# V0.42 · Six original CSS visual materials

This is a **collection of six independent, opt-in CSS visual atoms**. It does not introduce a default theme, a site/landing-page builder, a bundled component library, a React public export or an external asset dependency.

| ID | Class | Suggested explicit style compatibility | Usage |
| --- | --- | --- | --- |
| FX-001 | `.fx42-fluted-pane` | liquid-layer / organic-tactile | Ribbed/acrylic functional controls, layered navigation shell |
| FX-002 | `.fx42-prism-frame` | aether-orbit / signal-noir | Static prism-outline cards and motion-free focus areas |
| FX-003 | `.fx42-perforated-ticket` | commerce-atelier / organic-tactile | Ticket, coupon, event passes, barcode-free receipts |
| FX-004 | `.fx42-ink-stamp` | paper-rebellion / editorial-warm | Editorial selected marks, archive statuses, print callouts |
| FX-005 | `.fx42-orbit-marker` | aether-orbit / signal-noir | Section index, orbit-shaped navigation marker, status icon |
| FX-006 | `.fx42-margin-note` | editorial-warm / type-led-minimal | Journal note, pull-quote context, inline evidence |

Each is implemented in [material-effects.css](material-effects.css) using browser-native CSS, with no bitmap textures, third-party fonts, React, external requests, custom event loops or global `:root` overrides. Classes are entirely optional and style values are overridden with `--fx42-*` custom properties. Some effects use pseudo-elements; preserve logical DOM content and contrast. `@media(prefers-reduced-motion:reduce)` and `@media(forced-colors:active)` provide fallbacks.

Preview individual examples at [playground/material-effects-v042/index.html](../../../playground/material-effects-v042/index.html) with `npm run dev:catalog` (open `http://127.0.0.1:8009/playground/material-effects-v042/`).

**License:** original authored CSS and demo markup only; not derived from any linked third-party UI code. No source copying of the 13 external resources is implied by this specimen. These are standalone reference implementations to adapt, not checked/published library packages or production-certified visual components.