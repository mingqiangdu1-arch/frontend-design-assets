# V0.57 · Analytical micro-visualization materials

This batch adds **six original, individually extractable CSS/HTML visualization specimens**, not another React charting library. The diagrams use **explicit, fictional, manually synchronized** sample values. Every sample has a real semantic text/table counterpart to avoid encoding meaning in pixels only.

| ID | CSS family | Distinct visual question | Non-claim |
| --- | --- | --- | --- |
| FX-112 | `.fx57-waterfall` | How do positive and negative contributions produce a total? | Manual cumulative positions; no calculation or imported chart package |
| FX-113 | `.fx57-diverge` | How large are favorable vs unfavorable groups around a true zero midpoint? | Each side uses absolute percent of all respondents; neutral responses are listed, not painted |
| FX-114 | `.fx57-bullet` | How far is actual performance from target? | Colored bands illustrative; no automatic target tracking |
| FX-115 | `.fx57-cohort` | How does retention change by cohort and age? | Real HTML `table` with `caption`, headers, explicit missing cells; percentages are fixture data |
| FX-116 | `.fx57-quadrant` | Where do 2D qualitative options fall relative to thresholds? | Coordinates and axis interpretation supplied manually; no interaction, clustering or analysis engine |
| FX-117 | `.fx57-treemap` | What are the proportions of four editorial groups? | Explicit `grid-area` visual composition; **not** an area-accurate treemap algorithm |

All six are inside [analytical-atoms.css](analytical-atoms.css) with corresponding semantic data/graphic examples in [the independent gallery](../../../playground/analytics-v057/index.html). Extract a single class family and its matching markup, not the surrounding gallery or other families.

**Source vs actual analytics:** data in the gallery is synthetic and is **not** real market, survey, retention, performance, or research evidence. CSS values are handwritten to match nearby text. Replacing data requires independently checking visual position/area, domain bounds and appropriate labeling; do not present a static sample as a data-binding component.

- Every chart is a noninteractive reference. The actual data is reproduced in plain accessible HTML next to the decorative graphic, not inferred from colors/position alone.
- No global CSS resets, arbitrary external font, third-party code, CDN, network fetch, app backend, runtime dependency, or React public export.
- Four **separate original SVG decorative abstractions** are listed in [graphics/v057](../../../graphics/v057/README.md); no genuine data are represented.
- Browser/contrast/screen-reader/mobile/visual production QA is not claimed; `color-mix()` and CSS variable math need actual target support verification.
