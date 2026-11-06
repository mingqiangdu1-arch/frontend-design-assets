# Page composition CLI · V0.8

This is a **deterministic asset selection and assembly-brief generator**, NOT a one-click app builder. It does not run AI, install dependencies, edit an application or generate compiled frontend code.

## Commands

```bash
node scripts/compose-page.mjs --list
node scripts/compose-page.mjs --list --context=reading
node scripts/compose-page.mjs --template=TPL-002 --format=markdown
node scripts/compose-page.mjs --template=TPL-003 --format=json
node scripts/compose-page.mjs --style=neo-brutalist --context=campaign --format=markdown
node scripts/compose-page.mjs --template=TPL-002 --format=markdown > my-page-brief.md
```

Output: explicit template/style binding, source and demo, Token CSS, reference IDs, layout sections, optional React component candidates (clearly marked *not wired*), implementation steps and human acceptance checklist.

**Never infer a default** or silently replace an unsupported style. `precision-dark` now has TPL-005, an actual React/Vite page built using existing component exports. `--template=TPL-005` includes explicit `npm run dev:workbench` and component integration statuses; any other missing style/context match still rejects. React component library supports only its four declared themes; the fifth theme has no declared React package support. All four template demos are standalone HTML/CSS/JS, **not** bundled implementations of the React component package.

Run `node scripts/check-page-templates.mjs`, `node --test tests/compose-page.test.mjs` and `npm run test:browser` to inspect supported checks.

Codex input is in [REUSE-PROMPT.md](REUSE-PROMPT.md). Production review and target platform integration remain manual.

## V0.9 real React page

`node scripts/compose-page.mjs --template=TPL-005 --format=json` now reports `demoActuallyUsesReactLibrary: true`, and per-component `wired-in-demo`/`candidate-not-wired` statuses. Execute `npm run dev:workbench` (port 5175). **Only TPL-005** has verified source-level integration; TPL-001–004 remain independent static prototypes.

## V0.28 · selected style → page construction brief

[Theme-to-page handoff](style-assembly-v028.md) joins fourteen visual styles, seven registered runnable templates, sixteen conceptual XC plans and real React export references. Use `node scripts/build-style-brief.mjs --style=editorial-warm --context=publication --template=TPL-007 --stack=react --format=markdown`. Theme Atlas also offers an interactive form; no theme or template is auto-selected and missing React theme bridges remain manual work.

## V0.17 lightweight handoff (GitHub-first)

[Asset selection and reuse levels](asset-handoff.md) explains `find-assets --goal`, `--reuse`, the resolved source entry and technology limits. This is a reference/agent handoff, **not an automatically generated app**. For a remote GitHub-only workflow, use the existing registry/CI rather than requiring a local preview at every research step.

## V0.17 multi-asset composition planning

[Design selection and composition](design-composition.md) introduces a **planning-only** combination of registered style, page blueprint, React exports and optional interaction contracts. Example: `npm run design:compose -- --context=knowledge-base --stack=react --format=markdown`. No page code is generated; the tool intentionally leaves style unselected when the user did not select it.

## Creative structure alternatives

[Experience composition grammar](experience-compositions.md) adds two distinct task-first layouts to the existing `design:compose` response (default), without creating a new demo or additional runtime.

## Explainable conditional comparison

The same `design:compose` command accepts optional density/device/complexity/expression preferences. Its architecture results include preference-alignment evidence and tradeoffs; absence of preferences means no ranking. [Rubric](experience-compositions.md#v017-preference-aware-explainable-concept-comparison-2026-11-06).
