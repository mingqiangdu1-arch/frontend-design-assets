# DT-013 · Type-led Minimal · 2026 trend study

**Independent experimental visual theme**. Radically concise content, oversized graphic typography and asymmetrical white-space-led product storytelling

## Current trend evidence

- https://webflow.com/blog/web-design-trends-2026
- https://www.figma.com/resource-library/web-design-trends/

These sources motivate the direction but do not license copying product UI, typography binaries, artwork or brand names. Trend visibility is not a measurement of adoption share.

## Distinct grammar

**Layout:** - single statement hero with exaggerated scale and asymmetric margin
- structured TLDR strip before selectively expanded details
- letterform-led grid with large whitespace and small independent index

**Typography:** - display: very large compressed sans-serif typography; manual line breaks by content
- body: 16px readable neutral sans with short meaningful lines
- micro: caps index labels spaced with clear text alternatives

**Material:** Typography and spacing replace excessive cards; substantive details stay reachable through explicit disclosure.

**Motion:** modest line reveal when supported; no autoplay kinetic headline necessary for meaning; static headline under reduced-motion.

**Behavior:** indexed story selection; native details disclosure for deeper reading; keyboard-first CTA with visible focus.

## Do not do

- empty layouts without useful information
- inaccessible kinetic text
- all navigation replaced with hidden gestures
- truncated content solely to look minimal

## Where it fits

brand-landing, creative-portfolio, studio-site, product-story. Evaluate the actual audience and product workflow rather than blindly applying a trend.

## Real files and reuse boundary

- [Token data](tokens.json) and [scoped CSS](tokens.css) — CSS values bound to `[data-design-theme="type-led-minimal"]` only.
- [Original interactive scene](../../playground/trend-style-lab/index.html?style=type-led-minimal) — standalone HTML/CSS/JavaScript.
- `packages/ui` React library still supports its existing **four explicit styles only**. This is not an npm ThemeSurface mapping and must not be attached to React components without implementing/testing a theme bridge.
- Source visual treatments are original CSS and text. No stock photos, copyrighted product screenshots, copied vendor token sets, WebGL or external UI runtime.
- Validate real-device touch, keyboard, focus, contrast, legibility, reduced motion/transparency, performance, asset rights and target integration before release.
