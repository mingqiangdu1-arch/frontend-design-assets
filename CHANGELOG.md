# Changelog

## 2026-10-26 · V0.11 product-first Commerce Atelier independent style

- Researched 2025/2026 official design materials and ecommerce usability guidance to justify one missing commerce visual system; deferred glass/3D/bento as optional context-driven techniques.
- Added original scoped Commerce Atelier theme, Token JSON/CSS, six fictitious CSS-only product shapes, standalone catalog with multiselect filters, removable chips, sorting, accessible variants, wishlist and simulated-only bag.
- Added TPL-006, DT-006, IP-015, PR-010, KIT-010, REF-029 with source/QA/provenance boundaries, page gallery entry and focused tests.
- No real product SKU, paid checkout, inventory API, external artwork or component-library six-theme compatibility claims.


## 2026-10-26 · V0.10 live asset search, portable preview and keyboard quality

- Added a neutral, responsive Asset Explorer over canonical JSON registries with search/style/type/stage/context filters, details, source/Notion links, deep links and a multi-selection Markdown export for Codex.
- Added three indexed assets (KIT-009, IP-014, PR-009), pure-model tests, and Chromium responsive smoke/screenshots.
- Added a Node built-in static preview server (`npm run dev:catalog`) for Windows/macOS/Linux; static smoke tests use it instead of relying on Python.
- Repaired Precision Dark command search test to expect the actual filter semantics, and improved responsive inspector keyboard modal semantics and focus restoration.
- Maintained explicit source/production boundaries: export briefs are references, screenshots are not approved visual-diff baselines, no actual product integration.


## 2026-10-26 · V0.9 Precision Dark actual React composition and visual capture

- Added Orbit Workbench as first full-page composition importing 11 React components from `packages/ui`, with an independent Precision Dark layout, in-memory status actions, undo, inspector and command palette.
- Added TPL-005 to five-page template gallery and machine registry, plus PR-008 recipe and KIT-008 implementation entry.
- Upgraded assembly brief to distinguish React exports actually wired in the demo from candidate-only references; includes Vite run/build commands.
- Added dedicated React Playwright workflow and screenshot capture at 390/768/1440. Static gallery continues to serve only a safe launch guide for the uncompiled React app.
- Screenshot capture is evidence for visual review, not a passing visual-regression baseline; real backend, screen readers and cross-browser QA remain open.


## 2026-10-26 · V0.8 independent page blueprints and deterministic composition

- Added editorial reading library and mobile habit/planning page as original interactive HTML/CSS/JS prototypes, preserving distinct typographic/layout grammars.
- Created four-entry machine-readable page template registry and a filterable catalog that also indexes existing SaaS operational list and Bold Grid campaign demos.
- Added a deterministic CLI to select a page explicitly by template/style/context and output JSON/Markdown implementation briefs with paths, responsive/interaction checks and React compatibility caveats.
- Added registry consistency and unit/browser smoke tests, new documentation and Codex handoff instructions.
- No implicit default style, production-ready claim or business code changes.


## 2026-10-26 · V0.7 independent style and interaction patterns

- Added fifth *independent* style: Neo Brutalist / Bold Grid with original scoped Tokens, poster landing/campaign layout and interactive six-sample catalog.
- Added reversible archive, preserved-draft wizard, button-based reorder with focus restoration, and native range dual-pane experiments in a standalone Interaction Lab.
- Added cross-style motion semantics and progressive-enhancement View Transition guidance, page recipes, source references and machine asset registry entries.
- React component library remains explicitly limited to its four previously supported style IDs; no universal default theme.
- Added logic and Chromium smoke tests; external browser, screen-reader and target-product validation remain open.


## 2026-10-26 · V0.6 multi-style React component library

- Created `packages/ui` with 18 original React/TypeScript components and explicit scoped semantic CSS bridges for four distinct visual styles.
- Added Vite-powered interactive component gallery, variant/state demonstrations and keyboard/overlay/form interaction examples.
- Registered UI-010–UI-027 and KIT-005 with export names, style dependencies, provenance, and reference maturity.
- Added TypeScript declaration/library build, component registry consistency checks and Playwright Chromium component-gallery smoke tests.
- Kept legacy single-style `components/reference/` unchanged. Public npm publishing and real product integration are not implied.


## 2026-10-26 · V0.5 reliability and reuse pass

- Added machine-readable contrast audit across four scoped visual styles; fixed muted foreground contrast in Editorial Warm and Playful Pop and corrected Playful's primary CTA to use its accessible accent text color.
- Scoped keyboard navigation to focused work rows; improved command palette arrow-key navigation and removed duplicate playful quiz feedback assignment.
- Added `find-assets.mjs` candidate search by style, application context, intent and reuse kind, with tests and no universal-theme fallback.
- Added Chromium Playwright smoke checks for three distinct Style Explorer scenes across desktop/mobile with retained screenshots and workflow artifacts.
- Added explicit style decision matrix and manual accessibility/open gaps. All implementations remain prototypes, not target-app production components.


## 2026-10-23 · Style Explorer v0.4 (stage close)

- Added independent Precision Dark, Editorial Warm and Playful Pop design directions, each with scoped original Token CSS/JSON, Style Profile and design documentation.
- Added three distinct screen compositions (professional workstation, editorial long-form reader, playful challenge UI) in a standalone Style Explorer with small interaction examples.
- Added machine-readable style/assets registry entries and pure state tests; enforced no repository-wide default.
- **Stage boundary:** these styles and demo are prototypes; browser and accessibility QA and production integration remain for future work. No further style expansion in this stage.


## 2026-10-23 · SaaS editing & advanced filters v0.3

- Researched Atlassian Inline Edit, Geist Input/Error, Linear filters and custom views, and expectations around explicit save.
- Catalogued 5 new source references, 5 SaaS interaction patterns, PR-005 composition and KIT-003 prototype snapshot.
- Added a standalone SaaS Edit + Filter Lab: inline read/edit mode, field validation, unsaved guard, simulated save failure, scoped shortcuts and AND/OR filter builder.
- Added pure state model unit tests; browser and full accessibility integration remain outstanding.


## 2026-10-23 · SaaS focused asset expansion v0.2

- Reviewed Attio record layouts and views, Vercel Geist table/skeleton/menu and Linear bulk selection as source-grounded patterns.
- Added independent SaaS behavior catalog, visual recipes and PR-004 operational list composition.
- Added 13 research/pattern/recipe/demo entries to the machine-readable registry; no global theme change.
- Added a standalone SaaS experiment and Node model tests; interaction fidelity still requires browser/manual review.


## 2026-10-23 · Multi-style / multi-application architecture correction

- Removed Refined Light SaaS as implicit **repository-wide default**.
- Introduced independent `styles/` Style Profiles, `applications/` Application Profiles and explicit asset reuse/style/app metadata.
- Kept the original Attio × Vercel study as the `refined-light-saas` collection without forcing future apps into it.
- Scoped the Refined Light CSS design tokens with `data-design-theme`; existing standalone HTML demo remains unchanged.
- Extended registry checks and Codex reuse rules to reject accidental global theme assumptions and incompatible references.

The existing React examples remain style-bound and **not production validated**. Portal style scoping is a known integration gap.

---

## 2026-10-23 · Repository initialization

- Established a living asset repository independent of AI WORKFLOW PLATFORM.
- Collected visual direction, color/typography/layout tokens, component and interaction research, source registry, Notion links and reuse policies.
- Imported the standalone HTML interaction lab as an **initial prototype** (not production code).
- Introduced machine-readable registry, asset template, page recipes and validation script.
- Also committed 9 React/TSX reference components with separate CSS and dependency declarations. These are examples and have **not** passed target-project integration tests.
- Initial archived UI Kit V0.1.0 remains historic; previous PNG screenshots and full ZIP are not included.

Subsequent commits should describe **what changed**, **which asset IDs**, **how verified**, and **why**.
