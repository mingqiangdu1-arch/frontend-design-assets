# DT-014 · Organic Tactile · 2026 trend study

**Independent experimental visual theme**. Biophilic, low-noise tactile surfaces with rounded organic cutouts, paper-clay material cues and warm high-legibility content

## Current trend evidence

- https://www.adobe.com/express/learn/blog/design-trends-2026
- https://business.adobe.com/resources/creative-trends-report.html
- https://webflow.com/blog/web-design-trends-2026

These sources motivate the direction but do not license copying product UI, typography binaries, artwork or brand names. Trend visibility is not a measurement of adoption share.

## Distinct grammar

**Layout:** - asymmetric soft-corner editorial product story
- alternating large photo/illustration island and compact note clusters
- breathing space around material samples and prominent task entry

**Typography:** - display: large humanist rounded sans or restrained serif accent
- body: 15–17px airy but high-contrast content
- micro: tactile labels paired with legible textual state

**Material:** Original CSS paper-clay texture and earth tones; no photographs or external font assets bundled.

**Motion:** slow deliberate interaction press instead of ambient breathing; soft material lift with short duration; static textures on reduced motion.

**Behavior:** choose material/palette with labeled swatches; explore tactile product story with semantic disclosure; native keyboard-toggle for visible detail choice.

## Do not do

- handdrawn typography for essential content
- fake sustainability claims
- heavy noise over reading text
- unlicensed nature photography

## Where it fits

wellbeing-app, sustainable-commerce, food-story, hospitality. Evaluate the actual audience and product workflow rather than blindly applying a trend.

## Real files and reuse boundary

- [Token data](tokens.json) and [scoped CSS](tokens.css) — CSS values bound to `[data-design-theme="organic-tactile"]` only.
- [Original interactive scene](../../playground/trend-style-lab/index.html?style=organic-tactile) — standalone HTML/CSS/JavaScript.
- `packages/ui` React library still supports its existing **four explicit styles only**. This is not an npm ThemeSurface mapping and must not be attached to React components without implementing/testing a theme bridge.
- Source visual treatments are original CSS and text. No stock photos, copyrighted product screenshots, copied vendor token sets, WebGL or external UI runtime.
- Validate real-device touch, keyboard, focus, contrast, legibility, reduced motion/transparency, performance, asset rights and target integration before release.
