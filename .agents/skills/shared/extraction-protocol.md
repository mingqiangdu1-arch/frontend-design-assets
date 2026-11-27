# Shared extraction protocol / 共享提取协议

Used by `frontend-component-extraction` and `frontend-design-system-extraction`. This governs evidence, provenance, authorization and promotion; it is not a crawler or build system.

## 1. Scope before extraction

Record the intended outcome, source boundary, target stack, relevant routes/components, deliverables and whether the user authorizes copying source into this library.

- **Repository/source checkout:** strongest route for implementation facts. Pin repository, commit, paths and license evidence.
- **Live page/browser:** supports visible structure, computed styles and exercised behavior. It does not reveal original component source or hidden backend rules.
- **Screenshot/design export:** supports visible geometry and visual observations only. It cannot prove DOM semantics, state transitions, responsive behavior or source token names.

Do not expand from one page to a whole site without a reason. Do not edit the source application unless separately requested.

## 2. Evidence labels

| Label | Meaning | Example |
| --- | --- | --- |
| `source-confirmed` | Directly found in pinned source/configuration | exported symbol, CSS variable, dependency |
| `runtime-observed` | Exercised in an authorized runtime | dialog opens, nav collapses |
| `screenshot-observed` | Visible in a supplied/captured image | approximate color, spacing, hierarchy |
| `inferred` | Reasoned from evidence but not directly declared | likely semantic role of a color |
| `proposed` | Newly authored abstraction or recommendation | extracted prop API, suggested token name |

Attach a source path, route, state, viewport or screenshot reference wherever possible. Keep source facts, runtime observations, inferences and proposals separate. Preserve conflicts rather than silently reconciling them.

## 3. Provenance and rights

For repositories, record canonical URL, exact commit/tag, relevant paths, retrieval date, root and per-file license notices, third-party dependencies, fonts, logos, icons, illustrations and media rights. Mark output as source-preserving, independently authored or research-only.

For live sites, record public URL, sampled routes, capture date, viewport, color scheme and observed state. Public reachability is not permission to copy code, distinctive artwork, brand assets, fonts or proprietary implementation.

If permission or license is absent, ambiguous or incompatible, keep the item research-only or author an independent implementation from functional requirements. Do not copy source text, CSS, images, fonts or distinctive brand expression. Do not call a close translation a clean-room rewrite.

Never bypass authentication, paywalls, robots/access controls or rate limits. Do not use private cookies, credentials, personal/customer data or hidden APIs. Ask before using authenticated routes or exporting non-public data.

## 4. Safe inspection

- Prefer static inspection first: manifests, exports, source, CSS, lockfiles, tests and docs.
- Inspect package scripts and install hooks before executing commands. Treat project code and upstream skills as untrusted.
- Do not install packages, download browsers, execute remote scripts, start network services or run destructive commands automatically. Ask before adding dependencies or running side-effecting scripts.
- Use synthetic data; redact secrets, customer identifiers, private paths and session metadata.
- Do not change the source project, global themes or this repository's React package merely to make extraction easier.

## 5. Promotion gates

An extraction candidate is not automatically a reusable asset. Require: (1) distinct purpose; (2) plausible reuse value (frequency is a signal, not a numeric threshold); (3) isolatable app-specific data/routing/permissions/persistence; (4) quality understood to the level claimed; (5) reuse rights; and (6) existing files/exports/examples and truthful verification.

Use existing registry types and lifecycle values. Do not invent IDs, types or lifecycle states. Check current registries before assigning IDs.

### Repository-specific rules

- `registry/assets.json` indexes all stable assets. `type: component` does **not** prove a public React export.
- `registry/components.json` lists only real named React exports. Add an entry only after implementation exists in `packages/ui/src/`, is exported by the public index and has a real gallery/source path. Keep the React peer dependency and explicit-theme contract.
- Standalone CSS/HTML/JS follows existing `styles/primitives/` conventions; page compositions belong in `recipes/`; behavior contracts in `docs/interactions/`; research-only sources in `docs/research/`.
- A new design system/style needs a coherent evidenced profile and matching token/docs/demo files. Update `registry/styles.json` and `registry/style-facets.json` only when that bar is met. Keep `defaultStyleId: null`.
- Skill docs, research references and screenshots do not increase asset counts. Regenerate inventory graphics only when canonical asset counts change.

## 6. Handoff minimum

State source identity/rights, scope/coverage, candidate classification, evidence labels, files, dependencies/host boundaries, validation, unresolved gaps and exact destination paths. Use the matching skill template.
