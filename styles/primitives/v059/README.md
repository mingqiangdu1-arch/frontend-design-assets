# V0.59 · Original ASCII/glyph-field visual specimens

These are six **separately retrievable actual source-level materials**, not a research link or copied BoldKit/pixelfx code. There is one shared, local [glyph-fields.js](glyph-fields.js) containing **four distinct original mathematical field algorithms**. They render deterministic text to `textContent` with native range density controls; an optional phase button changes the field. The two remaining assets are plain HTML/CSS.

| ID | Source family | Distinct usage | What it does not do |
| --- | --- | --- | --- |
| FX-124 | `.fx59-glyph--wave` / JS mode `wave` | Interference-like sine wave in a glyph matrix | No real sound data, media playback or shader GPU pipeline |
| FX-125 | `.fx59-glyph--moire` / mode `moire` | Crossed sine wave interference forming lattice moiré | Not a physically measured moiré sample or raster photo converter |
| FX-126 | `.fx59-glyph--fan` / mode `fan` | Angular rays created from atan2 and radius | Not star mapping, geometry measurement or an interactive orbit control |
| FX-127 | `.fx59-glyph--strata` / mode `strata` | Discrete contour bands in generated text | Not real terrain, elevation mapping or source data visualization |
| FX-128 | `.fx59-stitch-atlas` | Three decorative literal ASCII textile-like micro-patterns | Not encoded data, QR, real Braille or a text-to-image algorithm |
| FX-129 | `.fx59-density-book` | A semantic DL of real glyph-density samples | Not font calibration or pixel-accurate print halftoning |

Exact sample markup and per-asset usage: [independent gallery](../../../playground/glyph-fields-v059/index.html). For FX-124..127, copy only the matching `.fx59-glyph` family, `data-fx59-glyph` markup and opt-in [glyph-fields.js](glyph-fields.js). The helper does not use Canvas, external packages, network requests, timers or reflection; the visual field is merely sampled from original formulas with no data loading.

The `pre` pixel-like grid is marked `aria-hidden=true` in the demo to prevent reading hundreds of meaningless glyphs aloud; the user-facing caption names the actual mode and purpose. Native range/button controls are labeled; any host integration should revalidate keyboard access, mobile overflow, font glyph width and legibility. Characters' apparent aspect ratio varies with local monospaced fonts. Screen-reader/browser QA is not claimed.

SVG artwork is independent: [graphics/v059](../../../graphics/v059/README.md). They are self-contained and decorative, not a computed output of these algorithms.

No global resets, forced theme, font file, image download, copied third-party code, React export, app product or test framework.
