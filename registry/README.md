# Registry · machine-readable asset contracts

This directory is the **authoritative index** for choosing existing design references, implemented React components, styles and page blueprints. It is not an automatically installable UI kit.

## Which file should an agent read?

| File | Source of truth for |
| --- | --- |
| `assets.json` | Every stable asset ID, its identity/type/lifecycle/source/reuse constraints, tags, aliases, context, style, dependencies, and handoff |
| `components.json` | **Actual public React component exports** (one entry per real component); source and gallery references |
| `styles.json` | Independent style IDs, token/spec/demo entrypoints; **no repository default** |
| `style-assembly.json` | Fourteen per-style page structure and interaction handoffs; real template, experience-recipe and React-export references. Used by `scripts/style-assembly.mjs`; not generated production pages. |
| `style-facets.json` | One-to-one theme selection facets: task aliases, structural layout, material, interaction, device and density; references real demo paths. Pair with `scripts/style-match.mjs` and `scripts/select-style.mjs` for explainable matching, not an ML style rank. |
| `specialized-resources-v030.json` | 17 个专项外部资源的来源、许可证、既有资产补位和可检索标签（REF-042..058）；与 assets.json 一一对应，只是研究来源，不是导出组件 |
| `page-templates.json` | Independent full-page references; inspect `implementation` to distinguish static JavaScript from React integration |
| `component-states.json` | Historical selected-state matrix, intentionally partial |
| `creative-directions.json` | Distinct expressive visual directions, not interchangeable CSS |
| `experience-compositions.json` | Research-stage task-first composition plans, not generated pages |
| Other JSON files | Focused motion/visual quality/research metadata |

Task-based entry: [../CATALOG.md](../CATALOG.md). Agent operating rules: [../AGENTS.md](../AGENTS.md).

## Do not confuse the three separate classifications

- `type` says **what an asset represents**: `component`, `interaction`, `reference`, `recipe`, `archive`, `token`, `page-template`, `motion`. A `type: "component"` record alone **does not prove** a React implementation exists; consult `components.json.entries`.
- `reuseKind` says **how it can be handed off**: `styled-implementation`, `behavior-pattern`, `design-reference`, `composition-recipe`, `style-token`, `snapshot`, `motion-reference`. Its associated `reusePolicies` determine `copyable-source`, `adapt-required`, or `research-only`.
- `stage` says **how far it has been developed**: `captured`, `analyzed`, `prototype`, `reference-implemented`, `validated`, `production-ready`, `deprecated`. `reference-implemented` is a real reference, not target-app certification.

These dimensions must remain independent; do not silently upgrade maturity or claim browser QA as full approval.

## Searchable metadata for new assets

- Keep `id` **unique and immutable**. When retiring/replacing content, use linked references and retain its provenance rather than reusing its ID.
- Provide specific, non-misleading `name`, `tags`, `applicationContexts` and, when useful, **short Chinese and English `aliases`** for how a developer might naturally request it. Never add a generic word to unrelated assets just to inflate search recall.
- `styleIds` must match compatible, explicitly declared style IDs. Empty `styleIds` may signify a conceptual pattern — **not** tested universal CSS/React compatibility.
- Link a precise `path`, `spec`, `details` and/or `demo` for materials that exist. `handoff.entry` should lead to the most relevant implementation file, not an unrelated research page.
- Preserve `source` and `license` when known; a missing license requires review, not inferred permission. `notion` links are private-workspace references to audit **before publication**.
- Use `verified` and `handoff.limitations` to state what evidence is missing; no invented production-ready status.
- Distinguish actual source implementation from research-only plans in names/descriptions and downstream handoffs.

## Selection examples

```sh
# implemented React entries only (not historical component sketches)
node scripts/find-assets.mjs --type=component --stage=reference-implemented --goal=implementation --json

# natural-language Chinese aliases can match as phrases inside longer requests
node scripts/find-assets.mjs --type=component --intent="我需要一个可编辑表格" --json

# interaction contracts, not components
node scripts/find-assets.mjs --type=interaction --intent="拖拽" --goal=behavior --json

# style compatibility is independent of asset type/maturity
node scripts/find-assets.mjs --style=precision-dark --type=component --reuse=copyable-source --json
```

`--type` matches `type`, `--stage` matches lifecycle stage, and existing `--kind` matches **reuseKind** (legacy name). `--goal` re-ranks, and `--reuse` filters handoff policy. Keyword search is deterministic and lexical, **not an embedding model or proof of exhaustive semantic coverage**.

## Validation

For edits to registries or selection logic: `npm run test:registry`, `npm run test:unit`; for changes to React component entries, also `npm run check:components` and the relevant Gallery/browser suite. In a GitHub-only environment, use existing CI rather than spinning up a full application just to inspect a reference.

See [../docs/governance.md](../docs/governance.md) for de-duplication and long-lived maintenance, and [../docs/publication-readiness.md](../docs/publication-readiness.md) before making the repository public.
