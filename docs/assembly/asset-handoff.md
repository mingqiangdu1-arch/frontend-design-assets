# Lightweight asset handoff for Codex and project agents · V0.17

This repository is a living design reference library, not a source of certified installable production modules. This path is intended for **GitHub-only / remote agent workflows** with limited local browser access. It avoids a mandatory demo/server/build cycle for every research item.

## 1. Select on user job, not a global house style

Identify the task, users, device, interaction mode and target stack. Keep style optional until the page's visual direction is chosen. Use the existing registries:

```sh
node scripts/find-assets.mjs --intent=拖拽 --goal=behavior --json
node scripts/find-assets.mjs --style=precision-dark --goal=implementation --limit=10 --json
node scripts/find-assets.mjs --reuse=research-only --goal=visual --intent=editorial --json
node scripts/compose-page.mjs --template=TPL-005 --format=markdown
```

The `--goal` option **re-ranks** matching candidates: `implementation` prefers source references, `behavior` prefers interaction contracts, `visual` prefers art-direction references. It does not override `styleIds` or prove compatibility. `--reuse` filters by the registry's handoff policy.

## 2. Understand reuse modes

| Mode | Meaning | Never assume |
| --- | --- | --- |
| `copyable-source` | Existing CSS/TSX/other source can be inspected and adapted | Published package, runtime interoperability, a validated target page |
| `adapt-required` | Transfer behavior rules or page recipe into target architecture | Demo is a drop-in React component or backend workflow |
| `research-only` | Design reference, motion study, or historical snapshot | Permission to copy brand imagery/code, or product compatibility |

Modes are derived from `reuseKind` via `registry/assets.json.reusePolicies`; asset-specific `handoff` supplies a tested file entry and scope. `stage` remains independent evidence of maturity. **No asset is currently marked production-ready.**

## 3. Minimal reproducible handoff

For the chosen candidates, pass these exact fields to the implementing agent: `id`, `name`, `_reuseMode`, `handoffResolved.entry`, `relatedFiles`, `stack`, `instructions`, `limitations`, `styleIds`, `dependencies`, `stage`, `verified`, `source/license`.

Then ask the agent to:

1. Read the selected entry and linked specs/demos; do not copy the entire playground.
2. Choose **one** explicit local style or document separate visual scopes; load only matching tokens/components. An empty style list is conceptual independence, not a universal style implementation.
3. Preserve actual product data, API, permissions, shortcuts and content. Port only needed logic and markup.
4. State clearly which portions are reuse, adaptation, new code, and unverified. Never invent a working server, real media, or approved screenshot.
5. Use the **existing CI** for touched code. Add a focused unit test for any altered classifier/registry contract. Manual visual or physical-device QA is optional during collection and required **before product release**, not to catalog an idea.

## 4. Example: behavior vs implementation

- `IP-021`: open `playground/advanced-interactions-v2/model.mjs` and `docs/interactions/advanced-interactions-v2.md`. Reuse transfer invariants and keyboard fallbacks, not the sample art direction; implement its UI in the target stack.
- `UI-011`: open `packages/ui/src/index.tsx` and `packages/ui/README.md`. It is real React reference code but needs an explicitly supported scoped style and target-level validation.
- `TPL-005`: open `playground/precision-workbench/src/main.tsx` and page README. It actually uses the React component package, but has fictional local data.
- `PR-014`: open `scripts/plan-design-review.mjs`. It creates an optional plan; it does not run Unslop/Hallmark or edit an app.

## 5. Scope of this repository change

Only registry metadata, retrieval priority, agent instructions, documentation and deterministic tests. **No new demo project, browser runtime, dependency installation, external Skill execution, screenshot approval or production integration** is part of this milestone.
