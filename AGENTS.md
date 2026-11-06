# Frontend Design Assets · Agent Rules

This repository is a **living multi-style, cross-application design asset library** — not an AI WORKFLOW PLATFORM kit.

## V0.22 workflow, complex-form, data and layout extension

- Real React library now has **37** actual exported components. The five new V0.22 original exports in `packages/ui/src/workflows.tsx` are `FormWizard`, `RepeatableFields`, `ValidationSummary`, `Sparkline`, and `DashboardGrid` (UI-047..051). Asset registry has 172 entries. React support remains **four explicitly selected theme scopes** only.
- `FormWizard` is a controlled UI flow, **not** server-backed process orchestration or approval. `RepeatableFields` demands stable host IDs. `ValidationSummary` only invokes a caller-provided focus callback. `Sparkline` draws supplied finite numbers with an SVG summary; do not invent chart data or cite fixture numbers as real metrics. `DashboardGrid` provides responsive CSS spans, not drag-and-drop or saved layout.
- Full Gallery fixtures and limited browser tests are separate from the historical selected-state matrix. Keep the latter's uncovered IDs honest; do not claim screenshot baseline, screen-reader/cross-browser proof, production certification or npm publication.

## V0.21 navigation and disclosure extension

- Five original **implemented** React exports in `packages/ui/src/navigation.tsx`: `Tooltip`, `Breadcrumb`, `Pagination`, `Accordion`, `SidebarNav` (UI-042..046). Total real React exports 32; asset index 167; four compatible UI theme scopes unchanged.
- `Tooltip` is informational only, not an interactive floating dialog. `Breadcrumb` and `SidebarNav` do not invent application routing. `Pagination` does not fetch remote pages. `Accordion` only manages disclosed content via controlled IDs. All five require target-project behavior/a11y review.
- Reuse the actual components through the public index or adapt original code, not the earlier research-only UI-028..032 archetypes. Avoid adding new orchestrators, new theme defaults, or global styles while growing this reusable component corpus.

## V0.20 actual React utility extension

- The real React catalog now includes 27 exports, adding four V0.20 implementations in `packages/ui/src/utilities.tsx`: `CommandMenu`, `DatePicker`, `ResizablePanels`, `FileUpload` (`UI-038..041`). No new dependency or unregistered design style.
- `CommandMenu` uses opt-in controlled open state and local command groups; it never executes a command unless the host application responds to `onSelect`. `DatePicker` deliberately uses a **native date input**; do not advertise a custom calendar. `ResizablePanels` is a single keyboard/pointer split with percentage state, not docking layout. `FileUpload` is only file selection, validation and removal—not upload transport or security validation.
- Preserve the four existing React-supported style scopes and explicit dependency boundaries. The historical state matrix still covers only selected older exports; new browser smoke fixtures do not imply screen-reader, physical mobile or product certification.

## V0.19 actual React UI component extension

- The real React component catalog now has **23 exports**, including five new V0.19 implementations in `packages/ui/src/advanced.tsx`: `DataTable`, `TreeView`, `Combobox`, `Popover`, `DualRangeField`. The previously listed `UI-028..032` remain **research-only component anatomy**, NOT these production implementations.
- Read `packages/ui/README.md` for controlled props, accessibility/input paths and limitations. Preserve explicit theme scope to the original four React-supported styles; other styles have no promised compatibility.
- Browser and TypeScript CI cover a **limited reference implementation** with local fixtures only. DataTable does not sort its own data or fetch pages; TreeView lacks server/virtual hierarchy; Combobox is local-only; Popover is not portaled or collision-aware; DualRangeField uses independent native sliders, not a bespoke two-thumb canvas.
- Make non-UI data/permission logic explicit in each real app. Do not claim npm publication, cross-browser/screen-reader coverage or production certification.

## V0.18 asset expansion — prefer source material over more orchestration

- Browse the [new material index](docs/research/external-catalog-v018.md), [independent visual grammar studies](docs/styles/visual-studies-v018.md), [advanced interaction specs](docs/interactions/advanced-patterns-v018.md), and [component archetypes](docs/components/advanced-patterns-v018.md). These increase **actual creative/behavior vocabulary**; do not replace this round with a new scoring/planning tool.
- VS-001/002 are original, **research-only** visual studies with partial CSS token sketches under `[data-style-study]`. They are **not** registered `styleId` themes, not complete app skins, and not compatible with `packages/ui` by implication. Keep the existing 10 style IDs and no default.
- UI-028..032 are component anatomy and state references, **not** new React exports. IP-026 and IP-028 provide only two headless Node models under `interactions/research/`, not browser widgets. Other IP specs are text-only. Do not claim external libraries installed or copy components from MIT + Commons Clause sources into a redistributed library.
- For direct retrieval use `node scripts/find-assets.mjs --intent=linked --goal=behavior --json` or search `REF-039`, `IP-028`, `UI-031` in `registry/assets.json`. Read the exact spec and source/link before adopting one into an application; preserve license, keyboard/fallback, and limited test evidence.
- GitHub-first validation: use existing registry + deterministic Node CI only for this research batch. Do not add a new browser demo, visual-quality approval or target-project integration just to expand the archive.

## V0.17 evidence-limited creative comparison (GitHub-first)

- Before selecting among different `XC-xxx` layouts, read [the preference fit rubric](docs/assembly/experience-compositions.md). Where the actual product brief supplies preferences, call `npm run design:compose -- --context=<context> --device=mobile --density=low --complexity=simple --expression=restrained --format=markdown` with only truly grounded dimensions.
- Every `fitEvaluation` is ordinal alignment of **declared research profiles** to **explicit user inputs**. If preferences are omitted, preserve unranked alternatives. Never invent a global default, calibrated UX score, aesthetic certification, performance result or automatically selected style.
- Explain the leading/tied/weak hypothesis through the comparison's axis-by-axis matches and tradeoffs. Contrast information hierarchy, navigation effort and alternative strengths; keep contextual keyboard/mobile/reduced-motion and backend risks visible. Only empirical validation in the target product can confirm actual quality.

## V0.17 task-first creative alternatives (GitHub-first)

- Read [docs/assembly/experience-compositions.md](docs/assembly/experience-compositions.md), then run `npm run design:compose -- --context=<declared-context> --concepts=2 --format=markdown`. The 16 original `XC-xxx` concepts are architecture **research**, not new React components, runnable templates or brand styles.
- For the same product goal, show at least two viable **information architecture and interaction** directions when indexed. Compare hierarchy, navigation, mobile reflow and accessibility; changing only colors, gradients, card radius or hero imagery does not create a second concept.
- A design context can have relevant architectural options without a registered visual style; **leave the style unselected**. Never default to SaaS or claim an architecture idea is implemented in the referenced template.
- All behavior IDs refer to indexed source/specs requiring adaptation. Do not invent remote APIs, product metrics, real images or production-readiness. For this catalog-only iteration, rely on Node/registry CI and existing checks, not a new running browser or deployed demo.

## V0.17 design-combination planning (GitHub-first)

- For a new product design request, read [docs/assembly/design-composition.md](docs/assembly/design-composition.md) and use `npm run design:compose -- --context=<declared-context> --intent="<task>" --stack=any|react|static --format=json` to compare candidates; or pass `--template=TPL-xxx` for an explicit blueprint. This is **planning-only**: no code generation, rendering, install, target writes or default theme selection.
- Without an explicit `--style`/`--template`, the tool gives **alternatives** and does not make a style decision. It uses declared contexts and deterministic keyword matches, not AI understanding; an unsupported context must remain open rather than falling back to SaaS.
- Distinguish an actual React-wired template from static demos that could be **ported**. Shared React components only support the four declared themes. A neutral interaction spec is never a drop-in styled component; adapt its state/keyboard/failure semantics to the chosen stack.
- To reduce GitHub-only execution friction, rely on the existing registry and Node unit checks for metadata/planner changes; avoid creating playground or browser test infrastructure just to deliver a design handoff.

## V0.17 lightweight GitHub-first handoff

- Start with [docs/assembly/asset-handoff.md](docs/assembly/asset-handoff.md) before reuse. The CLI `node scripts/find-assets.mjs --goal=implementation|behavior|visual --intent="..." --json` now returns `handoffResolved` (exact entry, related files, stack, instructions, limitations and dependencies). Use `--reuse=copyable-source|adapt-required|research-only` for focused results.
- Handoff mode is **not** the maturity stage: copyable-source is still unverified in a target product, adapt-required is not React code, and research-only never authorizes copying third-party media.
- For registry/docs/agent-instruction-only changes, prefer existing static/Node CI. Do not impose new local servers, screenshots, full browser E2E, or human golden approval as a per-asset prerequisite. If target code changes, use relevant existing checks and report untested cases honestly.
- Keep this growing multi-style library open to novel genres. Use explicit style compatibility, not a mandatory SaaS shell. Preserve every asset's original license/source and test claims.

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

## V0.13 Creative direction / anti-homogenization

- Do not automatically select a SaaS shell or refit all applications to the same information architecture. For exploratory design start at `docs/styles/creative-art-direction.md` and `registry/creative-directions.json`.
- New experimental profiles: `pixel-arcade`, `signal-noir`, `paper-rebellion`, `aether-orbit`. Each owns an independent Token scope, composition grammar, motion language and explicit anti-patterns.
- To request **multiple diverse ideas**, run `npm run creative:brief -- --style=surprise --seed=<stable-seed> --context="<real user task>" --count=4` then critically choose/adapt a candidate. Do not paste a demo screen unchanged. CLI outputs research briefs, **not generated production code**.
- These four styles are **not compatible React package themes**. The `packages/ui` library still supports only its four previously declared themes; do not silently share styling or components.
- Reference no external screenshot/font binaries; the Creative Style Lab illustrations and interaction logic must be original.
- Honor keyboard focus, readable body copy, reduced motion, no autoplay sound, and explicit fictional data disclaimers. Validate style-specific product requirements before delivery.
- Run `node scripts/check-creative-directions.mjs`, `node scripts/contrast-audit.mjs`, `npm run test:unit`, `npm run test:browser`. Screenshot capture is evidence only, not approved visual regression.

## External design-skills research (2026-11-04)

- Optional references: `REF-031` [Unslop](docs/research/unslop-hallmark.md), `REF-032` [Hallmark](docs/research/unslop-hallmark.md), and original `PR-013` [contextual design-review recipe](recipes/contextual-design-review.md).
- **Do not automatically install, execute or vendor either third-party Skill.** User/job-specific request and reviewed source scripts are prerequisites to an external invocation.
- Hallmark's optional aesthetic house rules are **not** equivalent to universal WCAG/quality requirements. No automatic prohibition against deliberate pixel block typography, fictional radar glow, editorial annotations or genre-specific gradients.
- When improving existing UI, preserve user-visible features, controls, data paths and semantic reading order; use before/after screenshots and tests. Attribute any actual copied material according to its license (Unslop CC BY 4.0; Hallmark MIT; external photos separate).
- Prefer existing local creative direction briefs and independently verified build/a11y/browser checks over unreviewed generative changes.


## V0.13.1 optional design workflow handoff

- Before new-page design / existing-interface polish / audit requests, read `docs/assembly/design-review-workflows.md`. `npm run design:plan -- --mode=<new-page|redesign|audit> ...` creates a **planning-only** Markdown/JSON handoff.
- New page may opt in to Hallmark; existing UI redesign may opt in to Unslop; audit-only may opt in to Hallmark. Neither external Skill is installed, called, vendored or globally enforced by the router.
- Existing style IDs always take precedence over upstream aesthetic defaults. An unspecified style is intentionally left open, not silently set to SaaS/Minimal.
- Run project-level checks and preserve all user-visible functionality if a target-project agent separately invokes upstream code.


## Cross-genre review pilot (PR-015)

For existing-page critique, run the context-aware `design:plan` route before edits; **choose the target page's style**, not the most recently tested one. Optional Hallmark CI is per-target and advisory. `scripts/report-design-audit.mjs` summarizes actual upstream JSON counts but does not assign a quality score or normalize house-style preferences into global standards. `docs/research/editorial-design-review-pilot.md` documents the light editorial counterexample to Precision Dark. Preserve real copy/behavior, keyboard flow, screenshots and original design direction.

## Advanced interaction research (V0.14)

Reusable interaction primitives are documented at `docs/interactions/special-interactions.md` and exercised by `playground/advanced-interactions/`. Before borrowing spatial selection, radial menus, or continuous comparison, identify the real product's devices, task frequency, history semantics, focus behavior, permission boundaries and motion policy. Copy behavior selectively, never the dark sample wrapper as a global theme. The examples are local-only and not production library components. Verify actual keyboard alternatives, touch cancellation and viewport behavior before release.

## Integrated research policy (main merged via PR #5)

The four originally independent pilots were combined into `main` via PR #5, as recorded in `docs/research/design-review-integration-20261105.md`, without changing their distinct functionality. Do not equate a successful build, an unfiltered Hallmark advisory scan or a captured screenshot with production-ready visual/accessibility approval. Preserve Pixel Arcade deliberate art and the local-only nature of the three advanced controls. Register new work using unique IP/PR/KIT IDs and validate entire dependency graph.


## Advanced cross-container and FLIP interactions (V0.15, experimental)

Before reusing IP-021 or IP-022 read `docs/interactions/advanced-interactions-v2.md`: the real Pointer stream, keyboard pickup/drop, explicit movement buttons, undo history, focus restoration, reduced motion and immutable data model are the reusable behavior contracts. `playground/advanced-interactions-v2/` is a locally simulated example only. No real backend, synced collaboration, cross-browser, multi-touch or production a11y signoff is implied.


## Frame timeline and scroll-led storytelling (V0.16 experimental)

Read `docs/interactions/advanced-interactions-v3.md` before adapting IP-023 or IP-024. The timeline uses **integer 24-fps frames**, explicit overlap/bounds validation, clip-edge/playhead/second snapping and user controlled Undo/Redo, not real media manipulation. The story keeps semantic paragraphs fully readable, scroll+requestAnimationFrame visual feedback optional, and instant reduced-motion fallback. Preserve keyboard fine/coarse movement, collision refusal, focus, ARIA feedback and no false backend save. `playground/advanced-interactions-v3/` is an independent research demonstration with a distinct visual wrapper, not a global app theme or production component.
