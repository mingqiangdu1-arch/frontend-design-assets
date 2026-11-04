# DT-008 · Signal Noir

未来仪器 / 信号科幻 — **independent experimental style proposal**, not a general-purpose SaaS theme.

## Design DNA

mission instruments and navigable technical readouts, angular divisions, subdued phosphor-inspired glow.

**Layout grammars:** radar centerpiece and telemetry sidecars; asymmetric multi-channel spectrum; map with sparse operational telemetry.

**Typography:** monospaced readouts; compact spaced section labels; oversized frequency numerals. Body content stays readable even if display forms are expressive.

**Texture:** reticle rings; ruled measurement lines; thin technical strokes.

**Motion:** slow scanner arc when permitted; short chart interpolation; solid static target on reduced motion. Observe reduced-motion preferences; never convey state only via color or movement.

**Interaction:** channel selection; frequency control; status changes with text descriptions.

## Where it can be used

fictional-mission-control, data-art, sci-fi-game, music-visualizer, technical-exhibition. A designer or model must still assess real task complexity, content density and operating constraints.

## Do NOT use as

- constant flashing
- security-critical operation mimicry
- neon-only signal coding
- washed out low contrast text

**Specific caution:** No real-world mission-critical use; expose values as text and do not rely on color alone.

## Creative extrapolations

- instrument UI for a music archive
- fictional weather station atlas
- deep-sea expedition notebook

## Usage & evidence

- [Interactive mini-scene](../../playground/creative-style-lab/index.html) with explicit scoped style; theme can be selected with `?style=signal-noir`.
- [Machine-readable creative brief](../../registry/creative-directions.json) and [deterministic art-direction CLI](../../scripts/creative-director.mjs).
- Independent Token JSON/CSS; **not** part of the four compatible themes of `packages/ui` React components.
- Illustrations and graphics are CSS-only original constructions; no external stock images, fonts, screenshot reproductions or source code.
- Not production-ready. Before adoption run text/controls contrast checks, responsive QA, true content, keyboards, assistive technologies and performance on physical devices.

## Research influences (not copied designs)

- https://www.figma.com/resource-library/web-design-trends/
- https://www.adobe.com/express/learn/blog/design-trends-2026
- https://pros.squarespace.com/blog/design-trends
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions
