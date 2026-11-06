# DT-011 · Liquid Layer · 2026 trend study

**Independent experimental visual theme**. Translucent floating navigation over an opaque, content-first visual field; restrained glass is a functional layer, not a universal card treatment

## Current trend evidence

- https://developer.apple.com/design/human-interface-guidelines/materials
- https://www.figma.com/resource-library/web-design-trends/
- https://webflow.com/blog/web-design-trends-2026

These sources motivate the direction but do not license copying product UI, typography binaries, artwork or brand names. Trend visibility is not a measurement of adoption share.

## Distinct grammar

**Layout:** - open scene or media field with floating functional control island
- anchored opaque content blocks below translucent navigation
- adaptive bottom command rail without translucent article backgrounds

**Typography:** - display: wide airy sans; concise titles anchored outside glass controls
- body: 13–16px system sans on opaque content layers
- micro: visible high-contrast control labels

**Material:** Glass/blur may appear only in the functional floating control layer; content surfaces remain opaque, with CSS transparency fallbacks.

**Motion:** short floating-control position shift only on request; subtle hover lift without perpetual animation; instant switch when reduced motion.

**Behavior:** scene mode toggle with pressed state; native range for blur/transparency preference; accessible fallback to opaque navigation.

## Do not do

- all cards frosted glass
- blurred body text
- glass on glass with illegible labels
- transparency required for operation

## Where it fits

media-gallery, spatial-dashboard, creative-tool, travel-experience. Evaluate the actual audience and product workflow rather than blindly applying a trend.

## Real files and reuse boundary

- [Token data](tokens.json) and [scoped CSS](tokens.css) — CSS values bound to `[data-design-theme="liquid-layer"]` only.
- [Original interactive scene](../../playground/trend-style-lab/index.html?style=liquid-layer) — standalone HTML/CSS/JavaScript.
- `packages/ui` React library still supports its existing **four explicit styles only**. This is not an npm ThemeSurface mapping and must not be attached to React components without implementing/testing a theme bridge.
- Source visual treatments are original CSS and text. No stock photos, copyrighted product screenshots, copied vendor token sets, WebGL or external UI runtime.
- Validate real-device touch, keyboard, focus, contrast, legibility, reduced motion/transparency, performance, asset rights and target integration before release.
