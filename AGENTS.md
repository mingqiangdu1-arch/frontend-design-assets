# Frontend Design Assets · Agent Rules

This repository is a **living multi-style, cross-application design asset library** — not an AI WORKFLOW PLATFORM kit.

## Prior to any reuse or implementation

1. Read `README.md`, `docs/multi-context-architecture.md`, `registry/assets.json` and `registry/styles.json`.
2. Ask which app/product category and UX goal the request concerns **only if it truly cannot be inferred**. Never assume the answer is SaaS, enterprise, desktop, light theme, or React.
3. Determine application constraints: user group, devices, density, brand/style direction, localization, accessibility, performance and technology.
4. Search references and behavior patterns independently of stylistic implementation. Compare tradeoffs.
5. Choose or define the `styleId` for this application. If multiple candidates fit, compare; do not force Refined Light just because it is currently the only implemented style.
6. Only load tokens/CSS/components whose compatibility and dependencies fit the selected direction. Theme-specific components MUST NOT silently set global `:root` variables or overwrite another theme.
7. Preserve existing business APIs, data, app navigation and persistence when only asked about UI.

## Three different kinds of reuse

- **Inspiration:** product/screenshot/information architecture; requires independent adaptation, attribution and license review.
- **Behavior pattern:** interaction contracts, states, keyboard, touch, undo/cancel, reduced-motion; can migrate if the context fits.
- **Styled implementation:** actual TSX/CSS/HTML; explicitly bound to a style and stack; may need redesign rather than mechanical copy.

## Asset workflow

Capture → de-duplicate → dissect → compare → optionally prototype → test → promote → reuse. New inspiration need not turn into code immediately. Stable IDs do not change when asset grows.

Lifecycle: `captured`, `analyzed`, `prototype`, `reference-implemented`, `validated`, `production-ready`, `deprecated`. A reference snippet or a rendered demo is not production ready.

Every material asset addition updates `registry/assets.json` and related docs; new design languages require a Style Profile and `registry/styles.json` entry. Use application profiles in `applications/`, not a new project-specific global default.

## Safety and quality

Never bulk copy third-party proprietary UI, commercial assets, trademarks, font files or paid-source snippets. Record original URL and license decision. Verify responsive/keyboard/touch/focus, empty/loading/error/success/cancel, reduced motion and actual target behavior before release.

## Existing first style

`refined-light-saas` is a **scoped example collection**, not the repository theme. Its CSS variables activate only under `[data-design-theme="refined-light-saas"]`. `playground/initial-interaction-lab.html` is an independent old proof-of-concept. `components/reference/` consists of non-production reference implementations.

Use local HTTP to inspect prototype files in a browser agent. No autonomous background crawling, updating or deploying is implied.
