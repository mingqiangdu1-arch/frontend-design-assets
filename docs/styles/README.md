# Multi-style research collection · V0.13

The repository **does not have a default visual theme**. Visual styles are explicit, independently scoped alternatives. Shared UI behavior can be researched across styles, but implementation and layout are not assumed portable.

## Current independent style collections

| ID | Style | Visual grammar | Intended context | Current status |
| --- | --- | --- | --- | --- |
| `refined-light-saas` | [Refined Light SaaS](../../styles/refined-light-saas/README.md) | cool off-white, low-contrast rails, tight typographic hierarchy, 1px borders | workspaces and operations | Existing reference-implementation study |
| `precision-dark` | [Precision Dark](../../styles/precision-dark/README.md) | dense charcoal workstation, short motion, subtle violet focus | developer tools, desktop editors, pro dashboards | Proposed Tokens + demo |
| `editorial-warm` | [Editorial Warm](../../styles/editorial-warm/README.md) | cream paper, serif typography, reading column, editorial rule | publications, knowledge, reading and portfolios | Proposed Tokens + demo |
| `playful-pop` | [Playful Pop](../../styles/playful-pop/README.md) | bright friendly surfaces, chunky touch targets, feedback and progress | learning, consumer, gamified utilities | Proposed Tokens + demo |
| `neo-brutalist` | [Neo Brutalist / Bold Grid](../../styles/neo-brutalist/README.md) | poster-scale type, exposed thick grids, loud graphic blocks, offset shadows | events, indie-brand pages, creative portfolios, campaigns | Proposed Tokens + standalone demo |

## Comparison

These are **distinct screen compositions**, not five CSS color themes placed onto the same SaaS dashboard:
- Precision Dark: 3-column compact professional workspace + action palette + focus control.
- Editorial Warm: reading-first masthead, long-form content column, aside, save/reading toggle.
- Playful Pop: progress-driven quiz, tactile selection, success/failure feedback.
- Neo Brutalist / Bold Grid: striking hero, high-contrast poster cards and filterable collection; does not inherit the SaaS app shell.

See [Style Explorer](../../playground/style-explorer/index.html), [Demo README](../../playground/style-explorer/README.md), [style decision matrix](decision-matrix.md) and [quality checklist](../quality/README.md).

## Token and visual governance

- Every theme has an explicit `styleId`, own `style.json`, `tokens.json`, `tokens.css`, design `README.md`.
- Import styles only inside `[data-design-theme="<styleId>"]` containers. **Never write design values into global `:root`**.
- Different fonts, control heights, density, layout and motion are first-class, not just colors.
- No official product tokens, vendor icons, proprietary artwork or external font files are bundled.
- All new styles remain proposals/prototypes; automated semantic-token contrast checks and limited Chromium browser smoke checks are **not** screen-reader, cross-browser, target-project or real-world usability certification.

## Future study shortlist (not implemented)

Alternative professional light/dark, bold brutalist web, commerce-focused product visual, glass/ambient creative tool, mobile native minimalist. Research only when explicitly requested; do not automatically build.

## References and attribution

- [Linear](https://linear.app/now/behind-the-latest-design-refresh) / [Raycast Themes](https://manual.raycast.com/themes)
- [Notion content styling]([private-notion-link-redacted]) / [Substack theming](https://support.substack.com/hc/en-us/articles/360055169471-How-do-I-set-a-custom-theme-for-my-Substack)
- [Duolingo shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/) / [Core tabs redesign](https://blog.duolingo.com/core-tabs-redesign/)

These links support studying aesthetic direction. **All new numeric values are our design proposals**, not claimed as observed values of those products.

**Component library compatibility:** Existing React `packages/ui` explicitly supports the earlier four themes only. The fifth theme is its own original static/interactive page prototype, not integrated in the React theme bridge. No automatic cross-style promise.

## Sixth independent visual direction (V0.11)

| ID | Style | Visual grammar | Intended context | Current status |
| --- | --- | --- | --- | --- |
| `commerce-atelier` | [Commerce Atelier](../../styles/commerce-atelier/README.md) | warm stone/moss sans catalog aesthetic, big product visual slots, deliberate prices and filter states | retail storefront, visual product discovery | Standalone proposed Tokens and demo; not React package integrated |

Do not promote glassmorphism, bento layouts, 3D effects or dynamic typography to separate repository-wide styles merely because they trend in 2026. They are **optional cross-style techniques** with performance/accessibility obligations; new styles require genuinely different user tasks and composition grammar. The original React component package still lists four supported themes only.

## V0.18 adjacent visual grammar research — not registered styles

[Atlas Ledger / Evidence Cartography](visual-studies-v018.md#vs-001--atlas-ledger--evidence-cartography) and [Tactile Instrument / Precision Workshop](visual-studies-v018.md#vs-002--tactile-instrument--precision-workshop) add two original design directions and scoped *partial* token sketches. They are **not added to `registry/styles.json`**, so the full independent style count remains ten. Do not present a visual study as a working theme or implied React component support.
