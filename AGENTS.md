# Frontend Design Assets · Agent Operating Guide

**Repo purpose:** a living, multi-style, multi-application frontend asset library. It is **not** an AI WORKFLOW PLATFORM implementation, universal UI theme, npm-published product, or collection of production-certified components.

**Start with [CATALOG.md](CATALOG.md).** It routes user tasks to relevant assets, while machine-readable registries remain authoritative. Do not read every historical note, gallery or demo up front.

## 1. Retrieve before generating

1. Identify the user's **task** (visual direction, React implementation, interaction behavior, page composition, quality review), **application context**, **device**, **stack** and any existing style; avoid questions when the information is already supplied.
2. Read only the matching index:
   - `registry/assets.json`: all stable IDs, lifecycle stages, tags/aliases, contexts, styles, provenance, `reuseKind`, dependency and handoff metadata.
   - `registry/components.json`: actual exported React reference components, public export name and source.
   - `registry/styles.json` + `registry/creative-directions.json`: distinct visual languages; `defaultStyleId: null` is intentional.
   - `registry/page-templates.json`: page blueprints and whether the demo is static or React.
   - `docs/interactions/`: reusable behavior contracts; `docs/assembly/`: composition and handoff guidance.
3. If Node is available, use `node scripts/find-assets.mjs --intent="可编辑表格" --type=component --goal=implementation --json`, or filter by `--style`, `--context`, `--reuse`, `--stage`. GitHub-only reading of matching registry entries is equally valid.
4. Inspect the selected item's **source + specification + demo**, as appropriate. Read `styleIds`, `stage`, `reuseKind`, `dependencies` and `verified` before suggesting reuse. Prefer explicit IDs and paths over guesses.
5. Handoff a **small shortlist**: IDs, why each fits, exact source paths, compatible themes, required adaptation, validation gaps and alternative options. Do not pretend the selection tool generated or modified a target app.

## 2. Know exactly what can be reused

| Kind / stage | What it provides | What it does **not** prove |
| --- | --- | --- |
| `design-reference`, `research-only` | inspiration, external source, researched patterns | license to copy third-party material, implemented code |
| `behavior-pattern`, `adapt-required` | interaction invariants, accessible alternatives, cancel/undo rules | drop-in React component or functional backend |
| `composition-recipe`, `adapt-required` | layout structure and planning guidance | compiled page or production integration |
| `styled-implementation`, `copyable-source` | original inspectable TSX/CSS/HTML reference | npm distribution, production readiness, compatible style in every app |
| `style-token`, `copyable-source` | scoped visual values | globally safe theme or cross-style compatibility |
| `snapshot`, `research-only` | historical evidence | current implementation recommendation |

`reference-implemented` is **not** `production-ready`. A browser smoke test or captured screenshot does not establish a human-approved visual baseline, full accessibility, mobile/touch behavior, security or backend semantics.

## 3. Respect style, context and source boundaries

- **Never choose a default house style** merely because one example was developed first. There are independent visual profiles for SaaS, content, commerce, games, portfolios and more. Choose by product context and user intent.
- `packages/ui/` is the **current multi-style React/TypeScript reference package**; load only one *explicitly compatible* token/CSS scope through `ThemeSurface`. The authoritative supported themes are `registry/components.json.styleIds`. `components/reference/` is an **older single-style** research package.
- A blank asset `styleIds` means conceptual neutrality, **not** automatic compatibility. Do not inject `:root` variables or overwrite a host app's global styling.
- Static `playground/` demos and research interactions are independent experiments. Check `registry/page-templates.json.implementation`; do not describe every demo as React.
- Flow editors, sortable lists, local Kanban, CRUD-like tables and filter panels implement **UI behaviors only**. The destination app owns actual API calls, permission controls, server validation, persistence, collaboration, error recovery and business rules.
- Preserve the target app's content, routes, data semantics and real user-visible functionality during visual improvements.

## 4. Maintain stable, searchable assets

- **Capture → compare → classify → prototype (optional) → validate → promote → reuse.** Not every reference should become a component.
- Keep IDs stable; use the existing `REF-xxx`, `DT-xxx`, `UI-xxx`, `IP-xxx`, `AN-xxx`, `PR-xxx`, `KIT-xxx` families and any established series. Do not reassign IDs or conceal replacements.
- Add **truthful** `aliases` (Chinese and English where helpful), `tags`, `applicationContexts`, `styleIds`, provenance, license status and a precise `path/spec/demo` for any implementation. Prefer clear limitations to exaggerated maturity.
- For a new React export, update **both** `registry/components.json` and `registry/assets.json`, the gallery specimen, documentation and focused tests. A catalog entry alone is not code.
- If promoting/relocating history, keep registry paths, references and tests synchronized. `archive/` is public-visible history, **never a storage location for private Notion mappings, personal/customer data or unlicensed media**. See [archive/README.md](archive/README.md).
- New art directions need separate style profiles; never overwrite an unrelated existing style or force a SaaS shell onto game/content/campaign layouts.

## 5. Quality, attribution and execution

- For affected registry/search logic run `npm run test:registry` and `npm run test:unit`; for React exports run `npm run check:components` and `npm run test:components:browser`. Run appropriate workflow-specific browser checks for touched demos.
- Browser evidence is not production acceptance. Inspect keyboard/focus and touch alternatives, reduced motion, responsive layout, loading/empty/error/cancel/success, and target integration before publishing to real users. Visual capture requires separate human approval.
- Third-party design libraries, screenshots, artwork, logos, premium fonts and external Skills are **references, not vendored assets by default**. Confirm their respective licenses before reproduction; do not silently install or run Unslop/Hallmark. Context-specific art direction matters more than imposing one universal aesthetic ban.
- In limited GitHub-only environments, **prefer index/docs/source review over unnecessary installs, screenshot automation or server boot**. Never claim tests ran when they did not.
- **Before changing repo visibility**, use [docs/publication-readiness.md](docs/publication-readiness.md); moving a sensitive file to `archive/` does not remove it from Git history.

## 6. Short reference map

| Need | Read next |
| --- | --- |
| Task-based discovery | [CATALOG.md](CATALOG.md) / [asset handoff](docs/assembly/asset-handoff.md) |
| React component API and demo | [packages/ui/README.md](packages/ui/README.md) / [component gallery](playground/component-gallery/README.md) |
| Distinct visual directions | [docs/styles/README.md](docs/styles/README.md) / [decision matrix](docs/styles/decision-matrix.md) |
| Advanced interaction contracts | [docs/interactions/](docs/interactions/) |
| Page assembly | [docs/assembly/README.md](docs/assembly/README.md) |
| Design critique (optional Skills) | [design review workflow](docs/assembly/design-review-workflows.md) |
| Quality evidence | [docs/quality/README.md](docs/quality/README.md) |
| Architecture and governance | [multi-context architecture](docs/multi-context-architecture.md) / [governance](docs/governance.md) |
| Version-by-version decisions | [CHANGELOG.md](CHANGELOG.md) and Git history; historical feature-specific details live in their linked `docs/` files |

**Do not copy the old version-by-version AGENTS narrative into this entrypoint.** Future changes belong in `CHANGELOG.md` and the relevant asset documentation. This file only contains stable operating rules.
