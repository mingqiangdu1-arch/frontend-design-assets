# Frontend Design Assets · Agent Rules

This repository is a **living multi-style, cross-application design asset library** — not an AI WORKFLOW PLATFORM kit.

## Prior to any reuse or implementation

1. Read `README.md`, `docs/multi-context-architecture.md`, `registry/assets.json` and `registry/styles.json`. For exact retrieval run `node scripts/find-assets.mjs --style=<id> --context=<context> --intent=<terms> --json`; candidates still need review.
2. Ask which app/product category and UX goal the request concerns **only if it truly cannot be inferred**. Never assume the answer is SaaS, enterprise, desktop, light theme, or React.
3. Determine application constraints: user group, devices, density, brand/style direction, localization, accessibility, performance and technology.
4. Search references and behavior patterns independently of stylistic implementation. Compare tradeoffs.
5. Choose or define the `styleId` for this application. If multiple candidates fit, compare; do not force Refined Light just because it is currently the only implemented style.
6. Only load tokens/CSS/components whose compatibility and dependencies fit the selected direction. Theme-specific components MUST NOT silently set global `:root` variables or overwrite another theme.
7. Preserve existing business APIs, data, app navigation and persistence when only asked about UI.

## Reusable React/TypeScript components · V0.6

- Inspect `packages/ui/README.md` and `registry/components.json` before proposing new generic components. The old `components/reference/` remains the original **Refined Light SaaS only** study, not the new multi-style package.
- `packages/ui/src/index.tsx` exports 18 components. Use `ThemeSurface theme=<explicit-style-id>` and load the chosen source Token CSS. No implicit fallback theme or global `:root`.
- Run `npm run check:components` and `npm run test:components:browser` before claiming the new React gallery works. Component CI is a limited smoke test only; do not claim all apps and screen readers validated.
- Treat a `reference-implemented` asset as reference implementation, not production ready. When adding a component, update `registry/components.json`, `registry/assets.json`, gallery specimen, tests and docs, then check `scripts/check-components.mjs`.

## Three different kinds of reuse

- **Inspiration:** product/screenshot/information architecture; requires independent adaptation, attribution and license review.
- **Behavior pattern:** interaction contracts, states, keyboard, touch, undo/cancel, reduced-motion; can migrate if the context fits.
- **Styled implementation:** actual TSX/CSS/HTML; explicitly bound to a style and stack; may need redesign rather than mechanical copy.

## Asset workflow

Capture → de-duplicate → dissect → compare → optionally prototype → test → promote → reuse. New inspiration need not turn into code immediately. Stable IDs do not change when asset grows.

Lifecycle: `captured`, `analyzed`, `prototype`, `reference-implemented`, `validated`, `production-ready`, `deprecated`. A reference snippet or a rendered demo is not production ready.

Before promoting a visual component run `node scripts/check-registry.mjs`, `node scripts/contrast-audit.mjs`, and `node --test tests/*.test.mjs`; if modifying Style Explorer, run the Playwright browser smoke workflow. Inspect `docs/quality/README.md` for still-uncovered checks. Every material asset addition updates `registry/assets.json` and related docs; new design languages require a Style Profile and `registry/styles.json` entry. Use application profiles in `applications/`, not a new project-specific global default.

## Safety and quality

Never bulk copy third-party proprietary UI, commercial assets, trademarks, font files or paid-source snippets. Record original URL and license decision. Verify responsive/keyboard/touch/focus, empty/loading/error/success/cancel, reduced motion and actual target behavior before release.

## Style references

See `docs/styles/README.md`. New style IDs: `precision-dark`, `editorial-warm`, `playful-pop`. Their tokens and demos are separate and not production-ready. Never hardcode `refined-light-saas` as the fallback for an unrelated application. New styles are `design-proposal` and should pass visual/keyboard tests before integration.

## Existing first style

`refined-light-saas` is a **scoped example collection**, not the repository theme. Its CSS variables activate only under `[data-design-theme="refined-light-saas"]`. `playground/initial-interaction-lab.html` is an independent old proof-of-concept. `components/reference/` consists of non-production reference implementations.

Use local HTTP to inspect prototype files in a browser agent. No autonomous background crawling, updating or deploying is implied.

## V0.7 scope boundaries

- New `neo-brutalist` style is a standalone page experiment; `packages/ui` and `registry/components.json` are STILL compatible only with their explicitly declared four themes. Never infer fifth-theme React support from the presence of Token CSS.
- Portable patterns IP-009..013 are behavior specs and independent HTML/JS samples; they are not production-ready React exports.
- Motion choices: check `docs/motion/motion-system.md`, respect reduced motion, provide fallback, and manage focus explicitly when replacing DOM.
- New repo quality checks include `tests/bold-grid.test.mjs`, `tests/interaction-lab.test.mjs`, and `tests/browser/creative-interactions.spec.mjs`.

## V0.8 page assembly entrypoint

- Read `registry/page-templates.json` and `playground/page-blueprints/README.md` before copying entire page structures.
- `node scripts/compose-page.mjs --list` enumerates options. `--template=TPL-002 --format=markdown` returns a deterministic design brief; it does NOT generate source code or integrate a target application.
- Never mix a template with a different style; the CLI and `scripts/check-page-templates.mjs` reject such mismatches.
- All four page-blueprint demos are **independent DOM/JS experiments**, not imports from `packages/ui`; candidate React components are explicitly marked not wired.
- For new archetypes, update `registry/page-templates.json`, `registry/assets.json`, gallery card, test cases, design docs and use `node scripts/check-page-templates.mjs` before claiming completeness.

## V0.9 React-composed page rules

- TPL-005 is the first full-page `react-vite` example with explicit Precision Dark style; start with `npm run dev:workbench` and `playground/precision-workbench/README.md`.
- Do not say all Page Blueprints are React-built. TPL-001–004 remain independent static HTML/JS.
- `node scripts/compose-page.mjs --template=TPL-005 --format=json` now marks actual React exports as `wired-in-demo` and includes the Vite run/build commands.
- Run `npm run typecheck:ui`, `npm run build:workbench`, `npm run test:workbench:browser`; inspect screenshot artifacts at three viewport sizes, and keep unverified accessibility/browser issues explicit.

## V0.10 catalog discovery / keyboard QA

- For a browsable registry use `npm run dev:catalog` and `/playground/asset-explorer/`. This reads `registry/assets.json` and `registry/styles.json` live; do not invent card data or default style.
- Selecting multiple assets exports a RESEARCH handoff Markdown brief. Do not treat different style IDs as automatically compatible implementation modules.
- `IP-014` describes faceted discovery semantics; `PR-009` documents the Codex handoff. A selected research reference is not release certification.
- Precision Workbench mobile inspector must trap focus, close with Escape and restore the originating row's focus; validate with its dedicated Playwright suite.
- Run `npm run test:unit`, `npm run test:browser`, `npm run test:workbench:browser`, and `npm run test:components:browser`; note that static, workbench and component suites use separate servers.

## V0.11 product-first style boundary

- `commerce-atelier` is a standalone sixth Style Profile. Do not conflate it with Editorial Warm or internal ecommerce SaaS. Use `playground/commerce-atelier` and `TPL-006` to inspect its real local HTML/JS behavior.
- No React `packages/ui` support is declared for the new theme. `--template=TPL-006` must show no wired React components.
- Product images in the demo are original CSS geometric illustrations, NOT authorized real product photographs. Prices and basket are fictional; do not show live checkout or guarantee stock.
- Run unit/filter/variant tests and Chromium 390/768/1440 smoke before promoting maturity. Do not automatically adopt glass/3D trends as styles without task evidence.

## V0.12 state coverage / visual evidence / real editorial React

- Do not infer a style from current popularity: React package supports **four** explicit themes; other two styles remain independent static demonstrations.
- `registry/component-states.json` explicitly distinguishes selected state coverage from the six UI exports not yet covered; a test passing does not imply production certification.
- `npm run visual:capture` emits only **unapproved** screenshot hashes. `npm run visual:verify` deliberately fails unless a reviewer has signed concrete image hashes and source commit in `registry/visual-baselines.json`.
- TPL-005 Precision Dark + TPL-007 Editorial Warm are actual React package compositions with different page grammars; do not use one shell for all application types.
- New full-page React blueprints require explicit UI imports, their own port/config, responsive smoke, source linkage, no fake server writes and honest technical maturity.
