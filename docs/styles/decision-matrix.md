# Cross-application style decision matrix · V0.26

This matrix is a **reasoned selection guide**, not a rule engine or a claim that any style is universally best. For the interactive **14-theme** catalog and original-demo comparisons, use [Theme Atlas](../../playground/style-atlas/README.md); for machine-assisted matching use [selection contract V0.27](theme-selection-v027.md). First identify user tasks, platform and content, then select candidates.

| Dimension | Refined Light SaaS | Precision Dark | Editorial Warm | Playful Pop |
| --- | --- | --- | --- | --- |
| Primary task | structured records and operational clarity | dense keyboard-driven professional workflows | reading, learning by text, writing, editorial storytelling | touch-first short tasks and feedback |
| Default structure | nav + topbar + list/details | compact workspace + command/inspector | masthead + narrow longform + optional aside | focal task card + bright reward/progress |
| Density | medium, optionally compact | compact | spacious | comfortable with oversized touch targets |
| Typographic voice | clean system sans, quiet hierarchy | system sans + restrained monospace | serif headings/body, sans controls | rounded expressive titles, sans |
| Interaction character | quick contextual drill-down, neutral feedback | keyboard command and focused selection | read, bookmark, subtle reading mode | press, choice, reward and progress |
| Strengths | scanning and data editing | concentration on complex pro tasks | continuity and legibility of narrative | motivation and immediate action clarity |
| Watch-outs | over-carded dashboards, excessive global nav | low contrast, keyboard trap, density on mobile | CJK serif rendering, long labels, narrow screens | color overload, motion discomfort, contrast |
| Typical device | desktop web | primarily desktop | responsive web | mobile-first |

## Mix only with explicit boundary

A consumer app can have an **internal operations SaaS** panel; it might intentionally use Playful Pop for public consumer journeys and Refined Light SaaS for the administration console. That does not mean importing both themes globally; isolate areas or build a bridge design spec.

## Selection checklist

- What task must the user finish within the first 30 seconds?
- Does the product prioritize scanning, deep reading, creativity, or short-task motivation?
- Pointer, touch, keyboard, assistive tech: which are first-class inputs?
- Which information must remain visible versus available on demand?
- How does a narrow viewport reorganize, rather than merely shrink, the layout?
- Choose an explicit Style Profile from `registry/styles.json`; use the [candidate finder](../quality/README.md) to shortlist assets.
- Confirm label contrast, clickable targets, focus, empty/loading/error/retry/undo and reduced-motion.
- Keep provenance and license; sources are inspiration, not approval to copy vendor visuals.

## Examples (nonbinding)

- E-commerce internal order system → Refined Light candidate.
- Power-user analytics workbench → Precision Dark candidate.
- Reader-facing essay archive → Editorial Warm candidate.
- Daily learning challenge → Playful Pop candidate.

These are examples, not constraints. A brand could choose otherwise after visual/UX research.

## V0.7 additive creative direction

| Dimension | Neo Brutalist / Bold Grid |
| --- | --- |
| Intended work | memorable campaign, event or indie-brand presentation |
| Structure | graphic hero + exposed grids + poster-like collection tiles |
| Type and density | oversized bold grotesk headlines, compact captions, intentional whitespace breaks |
| Interaction | explicit filter/pressed status, bookmarks, reduced-motion-aware transitions |
| Risks | loudness, CJK display line breaks, smaller screens, confusing decoration with actions |
| Not suitable as a default | dense operational SaaS tables or long uninterrupted academic text |

Do not assume the current React UI package supports this new style; use the standalone Bold Grid prototype as a design source and test new mappings first.

## V0.11 evidence-led decision: add exactly one Commerce visual direction

| Candidate | Decision | Why |
| --- | --- | --- |
| Commerce Atelier / product-first retail | Add sixth independent Style Profile | Existing profiles lack the image + variant + price + filter decision grammar of actual consumer shopping |
| Liquid Glass / glassmorphism | Research material/overlay modifier only | Apple HIG restricts use to restrained functional/control layers and honors reduced-transparency settings |
| Material 3 Expressive | Study motion/touch guidance | Existing Playful Pop and interaction modules can adapt principles without pretending to implement Google's framework |
| Bento, oversized typography, maximalism | Existing style layout/motion technique | No new user task or stable implementation boundary by itself |
| Immersive WebGL/3D/retro gaming | Defer until a grounded game/showcase use case | Performance, motion, and input constraints differ significantly; do not prematurely build a style |

Commerce Atelier is distinct from Editorial Warm: serif long-form reading vs. efficient sans product comparison. It is distinct from SaaS: consumer decisions and media hierarchy vs. operations data tables. Research: [Shopify ecommerce UX 2026](https://www.shopify.com/blog/ecommerce-ux), [Baymard listing UX 2025](https://baymard.com/research-articles/current-state-product-list-and-filtering), [Apple Liquid Glass materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Figma 2026 design directions](https://www.figma.com/resource-library/web-design-trends/).

## V0.13 new decision axis: creative / nonstandard expression

Earlier decisions deferred immersive WebGL/3D and retro-game-oriented styles without a concrete build. The new experiment **does not claim these are production ready**: it builds small CSS-only independent studies so future models have richer artistic vocabulary.

| Style | Creative intent | Good-fit projects | Constraint |
| --- | --- | --- | --- |
| Pixel Arcade | tactile game grammar / nonlinear task discovery | indie-game microsites, playful learning, arcade portfolios | keep body copy legible, no fake retro OS warnings |
| Signal Noir | instruments / fictional telemetry / technical narrative | sci-fi stories, music visualizations, exhibition interfaces | do not deploy as safety-critical telemetry; no flashing |
| Paper Rebellion | counter-grid collage / analog materiality | art zines, workshops, community storytelling | DOM reading order intact, no illegible overlaps |
| Aether Orbit | atmospheric spatial / quiet immersion | conceptual exhibitions, ambient portfolios, contemplative journeys | no WebGL dependency or autoplay, reduced motion |

Task and audience still take priority over style. [The generative model brief](creative-art-direction.md) selects composition, texture, typography and interaction independently from constrained per-style grammars, avoiding the temptation to use one default template for every application.

## V0.26 · 2026 trend-led expansion (independent theme proposals)

Following the new explicit request to study **current popular design directions irrespective of personal tastes**, four distinct, task-backed research themes were implemented. The earlier V0.11 "do not add from fashion alone" rule is retained: these were selected by a coverage-gap and functional composition review, **not a claim that they rank highest in measured popularity**.

| Theme | Task/structure priority | Visual/material grammar | Distinct from existing styles | Risk/required fallback |
| --- | --- | --- | --- | --- |
| `liquid-layer` / DT-011 | Visual scene + **floating functional navigation**, opaque below-the-fold information | Restrained translucent control material and large open scene | Aether Orbit is atmospheric storytelling, not accessible functional glass hierarchy | Prefer opaque nav when transparency is reduced or unsupported; don't blur article text |
| `shape-expressive` / DT-012 | Immediate one-of-three focus choice; dominant asymmetric decision grouping | Expressive colored silhouettes, high-salience copy | Playful Pop is gamified/reward-based, not task-first shape grouping | No shape-only state communication; protect focus order and contrast |
| `type-led-minimal` / DT-013 | Concise product narrative + side index + visible summary/depth | Oversized type and whitespace instead of routine cards | Editorial Warm optimizes deep reading, Neo Brutalist uses poster grid energy | Deep text must be available through semantic disclosure; no inaccessible kinetic text |
| `organic-tactile` / DT-014 | Object/material-focused story + short notes + palette controls | Earthy shades and original soft CSS clay forms | Paper Rebellion is deliberate chaotic collage, Commerce Atelier is structured retail comparison | Avoid texture over body text, false environmental claims and unlicensed imagery |

Source comparison and research confidence: [Trend research 2026](trend-research-2026.md). Implemented reference: [Trend Style Lab](../../playground/trend-style-lab/README.md). **All four are scoped original experimental HTML/CSS/JS, not React package themes**, and no default theme has been selected. Prefer full-page task selection over choosing a fashionable surface effect in isolation.
