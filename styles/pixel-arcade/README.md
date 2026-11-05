# DT-007 · Pixel Arcade

游戏化像素世界 — **independent experimental style proposal**, not a general-purpose SaaS theme.

## Design DNA

8-bit quest terminal with crisp modular pixel objects, readable status and visible buttons.

**Layout grammars:** quest map with status rail; cartridge-grid chapter selection; RPG profile and inventory collage.

**Typography:** monospace stair-step display; grid-locked uppercase labels; numerical HUD with generous tracking. Body content stays readable even if display forms are expressive.

**Texture:** stepped borders; tiny tile grid; pixel sun/heart shapes.

**Motion:** one-step discrete highlight; short position snap; no perpetual blinking. Observe reduced-motion preferences; never convey state only via color or movement.

**Interaction:** chapter choice; experience meter; inventory selection.

## Where it can be used

indie-game, game-companion, arcade-event, gamified-learning, interactive-portfolio. A designer or model must still assess real task complexity, content density and operating constraints.

## Do NOT use as

- blurred neon glass
- smooth rounded SaaS cards
- fake retro OS browser security UI
- unlabeled icon-only controls

**Specific caution:** Keep reading text modern and legible; never render body content in tiny unreadable bitmap text.

## Creative extrapolations

- arcade UI for a cookbook
- 8-bit visual language for a museum microsite
- pixel diary for sustainable travel

## Usage & evidence

- [Interactive mini-scene](../../playground/creative-style-lab/index.html) with explicit scoped style; theme can be selected with `?style=pixel-arcade`.
- [Machine-readable creative brief](../../registry/creative-directions.json) and [deterministic art-direction CLI](../../scripts/creative-director.mjs).
- Independent Token JSON/CSS; **not** part of the four compatible themes of `packages/ui` React components.
- Illustrations and graphics are CSS-only original constructions; no external stock images, fonts, screenshot reproductions or source code.
- Not production-ready. Before adoption run text/controls contrast checks, responsive QA, true content, keyboards, assistive technologies and performance on physical devices.

## Research influences (not copied designs)

- https://www.figma.com/resource-library/web-design-trends/
- https://www.adobe.com/express/learn/blog/design-trends-2026
- https://pros.squarespace.com/blog/design-trends
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions

## Genre-sensitive audit experiment

Do not treat Pixel Arcade's intended monospace uppercase HUD, CSS illustrated gradient terrain, hard shadows and square panel frames as generic AI-template defects. A separate [controlled review](../../docs/research/pixel-arcade-genre-review.md) improves body and quest-label readability while preserving these visual decisions. Upstream aesthetic checker warnings remain reviewable, not automatically waived. This is not a claim of production or screen-reader certification.
