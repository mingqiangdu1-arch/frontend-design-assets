# DT-012 · Shape Expressive · 2026 trend study

**Independent experimental visual theme**. Purposeful variable silhouettes, emphatic type hierarchy and contextual color blocks for task-first mobile experiences without cloning Material 3

## Current trend evidence

- https://research.google/pubs/usability-hasnt-peaked-exploring-how-expressive-design-overcomes-the-usability-plateau/
- https://www.figma.com/resource-library/web-design-trends/

These sources motivate the direction but do not license copying product UI, typography binaries, artwork or brand names. Trend visibility is not a measurement of adoption share.

## Distinct grammar

**Layout:** - single dominant task zone with offset rounded action shapes
- responsive staggered grouped controls with clear reading order
- high-salience summary above supporting action clusters

**Typography:** - display: large expressive system sans with asymmetrical line grouping
- body: 15–17px with clear strong task labels
- micro: compact action metadata; never tiny control text

**Material:** Shape variation and filled color areas communicate priority and task action, never shape-only state.

**Motion:** shape changes for state transition only; short spatial expansion with static fallback; instant completion cues on reduced motion.

**Behavior:** single-choice action cluster with label and shape marker; task-progress step switch; clear selected state beyond color.

## Do not do

- shape change obscures focus
- shape-only state meaning
- competing large controls on one screen
- long-running decorative morph loops

## Where it fits

consumer-mobile, personal-finance, event-booking, wellbeing-app. Evaluate the actual audience and product workflow rather than blindly applying a trend.

## Real files and reuse boundary

- [Token data](tokens.json) and [scoped CSS](tokens.css) — CSS values bound to `[data-design-theme="shape-expressive"]` only.
- [Original interactive scene](../../playground/trend-style-lab/index.html?style=shape-expressive) — standalone HTML/CSS/JavaScript.
- `packages/ui` React library still supports its existing **four explicit styles only**. This is not an npm ThemeSurface mapping and must not be attached to React components without implementing/testing a theme bridge.
- Source visual treatments are original CSS and text. No stock photos, copyrighted product screenshots, copied vendor token sets, WebGL or external UI runtime.
- Validate real-device touch, keyboard, focus, contrast, legibility, reduced motion/transparency, performance, asset rights and target integration before release.
