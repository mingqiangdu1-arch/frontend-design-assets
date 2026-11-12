# V0.47 · Eight repeatable surface SVGs + four original scene compositions

These are **real, standalone, editable, original SVG files**. Pattern files are 256×256 with an embedded `patternUnits="userSpaceOnUse"` tile definition and an image-wide reference; use as `background-image` and adjust `background-size` in the target. They are not imported font files, screenshots or copied assets.

## Repeatable pattern sources

| ID | File | Tile grain | Suggested style |
| --- | --- | --- | --- |
| VG-023 | [microdot-field.svg](patterns/microdot-field.svg) | 32 SVG units | type-led-minimal / refined-light-saas |
| VG-024 | [herringbone-trace.svg](patterns/herringbone-trace.svg) | 32 SVG units | editorial-warm / organic-tactile |
| VG-025 | [diamond-lozenge.svg](patterns/diamond-lozenge.svg) | 64 SVG units | paper-rebellion / editorial-warm |
| VG-026 | [halfmoon-lattice.svg](patterns/halfmoon-lattice.svg) | 64 SVG units | organic-tactile / playful-pop |
| VG-027 | [crossstitch-pixels.svg](patterns/crossstitch-pixels.svg) | 32 SVG units | pixel-arcade / playful-pop |
| VG-028 | [modular-trace.svg](patterns/modular-trace.svg) | 64 SVG units | precision-dark / signal-noir |
| VG-029 | [broken-checker.svg](patterns/broken-checker.svg) | 64 SVG units | paper-rebellion / playful-pop |
| VG-030 | [contour-waves.svg](patterns/contour-waves.svg) | 64 SVG units | aether-orbit / organic-tactile |

## Independent hero/illustration SVGs

| ID | File | Visual direction |
| --- | --- | --- |
| VG-031 | [glass-relief.svg](scenes/glass-relief.svg) | Glass Relief / 浮雕玻璃形态 |
| VG-032 | [paper-architecture.svg](scenes/paper-architecture.svg) | Paper Architecture / 折纸建筑层景 |
| VG-033 | [pixel-flora.svg](scenes/pixel-flora.svg) | Pixel Flora / 像素植物机械 |
| VG-034 | [optical-portal.svg](scenes/optical-portal.svg) | Optical Portal / 视错觉空间入口 |

[Pattern repetition gallery](../../playground/surface-patterns-v047/index.html) · [Scene illustration gallery](../../playground/vector-scenes-v047/index.html).

All 12 visuals have `title`, `desc`, and `viewBox`, without external media, fonts, dependencies or scripts. A `pattern` element creates repeating artwork *within* the SVG itself; host-app background-size and media-fit decisions are not globally set. Pattern repetition is a code-level design intent and must still be visually inspected on target screens. Treat scenes as decorative conceptual art, not functional 3D models or validated real-world maps.
