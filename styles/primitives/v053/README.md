# V0.53 · Original composition atoms

Six independently scoped HTML/CSS layout primitives, emphasizing **information arrangement**, not isolated decoration or a full page template. All markup specimens are inside [the local gallery](../../../playground/composition-v053/index.html). Copy one `.fx53-*` family from [composition-atoms.css](composition-atoms.css) and the matching specimen HTML rather than importing a full UI system.

| ID | CSS family | Use when | Real behavior / important limit |
| --- | --- | --- | --- |
| FX-094 | `.fx53-offset-stage` | editorial intro, split hero with deliberate image-to-copy offset | Decorative gradient/shape is sample art; replace with actual licensed media where needed |
| FX-095 | `.fx53-wayfinding` | short decision paths, campaign section navigation, structured narrative | Three cards with intentional desktop stagger; no click/navigation logic |
| FX-096 | `.fx53-media-reel` | portable visual references or project image strips | **Native horizontal overflow and scroll snap**; keyboard focus on scroll container, no carousel buttons or JS |
| FX-097 | `.fx53-caption-mosaic` | portfolio image wall with linked evidence labels | Semantic ordered figures via normal CSS grid, **not** masonry or image asset loader |
| FX-098 | `.fx53-tension-panel` | contrasting editorial positions and two-tone narratives | Two parallel panels, **not** interactive before/after slider |
| FX-099 | `.fx53-field-notes` | short ordered research or process narrative | Real `ol/li` reading order, rotated paper note effect, **no dynamic workflow engine** |

- Scoped CSS only; no global typography reset, dependencies, imported fonts, APIs, autoplay or motion loop.
- Explicit responsive layouts at 760px and 480px, with native scroll-snap overflow for FX-096; keyboard and narrow-screen integration should be verified in the target.
- All prose, visual shapes and colors are synthetic specimens. Set real document titles, image alt text, and applicable contrast in host.
- **Research/illustration is not production QA**; no design system, React export, templates or page generation workflow added.
