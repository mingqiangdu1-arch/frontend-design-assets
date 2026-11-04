# DT-010 · Aether Orbit

氛围空间 / 光感轨道 — **independent experimental style proposal**, not a general-purpose SaaS theme.

## Design DNA

atmospheric space and luminous orbits with large readable anchors and gently shifting viewpoints.

**Layout grammars:** floating center-stage orb with narrative anchors; constellation-like story stops; layered ambient poster with clear lower controls.

**Typography:** elegant high-contrast display and quiet narrow labels; open line-height; minimal high-salience controls. Body content stays readable even if display forms are expressive.

**Texture:** soft CSS radial glow; orbit arcs and depth layers; sparse star-field dots.

**Motion:** very slow transform when permitted; scene preset transitions; static layered rings on reduced motion. Observe reduced-motion preferences; never convey state only via color or movement.

**Interaction:** scene switching; story chapter stepper; color temperature choice.

## Where it can be used

ambient-experience, soundscape, concept-exhibition, meditation-visualization, future-portfolio. A designer or model must still assess real task complexity, content density and operating constraints.

## Do NOT use as

- WebGL dependence for essential tasks
- strobing lights
- transparent text over glowing background
- autoplay sound

**Specific caution:** Meaningful controls must remain opaque and contrasting, no autoplay audio or vestibular-heavy effects.

## Creative extrapolations

- ambient travel itinerary
- slow reading gallery of poems
- interactive music moodboard

## Usage & evidence

- [Interactive mini-scene](../../playground/creative-style-lab/index.html) with explicit scoped style; theme can be selected with `?style=aether-orbit`.
- [Machine-readable creative brief](../../registry/creative-directions.json) and [deterministic art-direction CLI](../../scripts/creative-director.mjs).
- Independent Token JSON/CSS; **not** part of the four compatible themes of `packages/ui` React components.
- Illustrations and graphics are CSS-only original constructions; no external stock images, fonts, screenshot reproductions or source code.
- Not production-ready. Before adoption run text/controls contrast checks, responsive QA, true content, keyboards, assistive technologies and performance on physical devices.

## Research influences (not copied designs)

- https://www.figma.com/resource-library/web-design-trends/
- https://www.adobe.com/express/learn/blog/design-trends-2026
- https://pros.squarespace.com/blog/design-trends
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions
