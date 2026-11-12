# V0.52 original deterministic Canvas art and faux-spatial CSS materials

Five genuinely executable original Canvas renderers share a small `seeded()` PRNG, backing canvas scaling (DPR capped at 2), a responsive ResizeObserver and local button seed changes. No external images, network requests, packages, WebGL or continuous frame loops. Each renderer independently selects its data-kind and redraws with a reproducible data-seed.

| ID | Original source algorithm | Limitation |
| --- | --- | --- |
| FX-085 | `contour` | Seeded static 2D harmonic paths, not GIS topography, height measurements or a shader. |
| FX-086 | `facets` | Triangles from a seeded jittered rectangular grid, not a Delaunay mesh solver or 3D object. |
| FX-087 | `lissajous` | Original parametric 2D curves, not an oscilloscope or audio-connected signal. |
| FX-088 | `stipple` | Seeded decorative particle density, not physical sand simulation or photograph. |
| FX-089 | `voxel` | Pseudodepth 2D isometric cube projection, not a 3D mesh engine. |

[Actual Canvas JS](procedural-figures.js) · [Sample HTML/CSS](../../../playground/procedural-depth-v052/index.html)

The four separate CSS materials demonstrate pseudo-3D perspective without a 3D library:

| ID | Class | Limitation |
| --- | --- | --- |
| FX-090 | `.fx52-acrylic-stack` | CSS-perspective translucent slabs, not optical refraction or a true 3D model. |
| FX-091 | `.fx52-fold-gate` | Native checkbox reveals an underlay by hinged CSS panels, not persisted document editing. |
| FX-092 | `.fx52-perspective-palette` | Three real radio states change a CSS material plate via :has; no WebGL or theme persistence. |
| FX-093 | `.fx52-anamorphic-title` | Single semantic heading with original CSS stacked shadow; no 3D mesh or external font. |

[Scoped CSS](procedural-and-depth.css). FX-091 is a real native checkbox opening a fold; FX-092 uses actual native radios and modern CSS :has. They have no persistent user account or theme system.

These are source materials, not production-certified components, and not a website generator. Copy an individual renderer or CSS family and its sample markup; retain the fallback rules and verify keyboard, visual, browser, device, performance and contrast in the destination.
