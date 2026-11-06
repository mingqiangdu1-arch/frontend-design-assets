# Theme Atlas · 14 independent styles, source-grounded comparison

**Scope:** V0.27 · original catalog UI and deterministic, evidence-only style selection. The repo remains private. This is not a popularity chart, a scoring model of visual quality, an auto-theme switcher or a new React style bridge.

## Open the visual catalog

From repository root:

```sh
npm run dev:catalog
```

Visit `http://127.0.0.1:8009/playground/style-atlas/`.

The catalog reads **live repository JSON** (not a second hardcoded list) from `registry/styles.json`, `registry/style-facets.json`, `registry/components.json` and each theme's existing `tokens.json`. If any required source is missing, loading fails closed instead of showing invented colors or fake previews.

There are 14 **original abstract miniatures**, each showing a distinctive composition grammar. **These are not screenshots or human-approved visual baselines.** Selecting left and right loads the repository's **actual independent interactive demo HTML** in two iframe panes, along with layout, material, interactions, devices, known React support and caution. Each pane also has an original-demo link. Query parameters `?left=editorial-warm&right=liquid-layer` can share a deliberate two-theme selection. No pair is preselected.

The three older scenes in `playground/style-explorer/` now accept `?style=precision-dark`, `?style=editorial-warm`, and `?style=playful-pop` without changing the default on the original page or the existing component API. The creative and 2026 trend labs already support deep links.

## Task-based selection for an Agent

The authoritative machine feature manifest is [`registry/style-facets.json`](../../registry/style-facets.json), joined **by `styleId`** to the registered style profile, asset ID and actual React compatibility list. It records:

- `layouts`: workspace, editorial, campaign, commerce, immersive, mobile-task
- `materials`: distinct decorative/material grammar (glass, pixel, paper, organic, etc.)
- `interactions`: working interface's primary interaction class (data, selection, reading, scene…)
- `density`, `devices`, registered task `keywords`, `summary`, distinct `dna`, `caution`, and safe original preview path

The matching algorithm is in [`scripts/style-match.mjs`](../../scripts/style-match.mjs), and the Node CLI is [`scripts/select-style.mjs`](../../scripts/select-style.mjs).

```sh
node scripts/select-style.mjs --context=knowledge-base --format=markdown
node scripts/select-style.mjs --task="我需要一个液态玻璃导航" --format=json
node scripts/select-style.mjs --context=consumer-mobile --material=colorful --format=markdown
node scripts/select-style.mjs --layout=campaign --material=graphic --format=markdown
node scripts/select-style.mjs --context=workspaces --stack=react --format=json
node scripts/select-style.mjs --compare=editorial-warm,liquid-layer --format=markdown
```

**Selection safety:** task keywords are lexical; no embedding/LLM is invoked. An explicitly supplied `context` must match the registered style context or a registered exact alias. Layout/material/interaction/density constraints do not yield unmatched styles. `--stack=react` is a strict whitelist of the **four actually declared** React theme IDs. The numeric `matchPoints` expresses weighted *registered criteria evidence*, **not a visual/usability/market quality score**. Tie-breaks are alphabetical and must not be treated as aesthetic rankings. A request with no meaningful theme/task/structure information throws instead of returning a default. No matches means no matches; never silently return a SaaS theme.

All fourteen themes remain separately scoped proposals; style data and demos cannot prove production integration, full mobile accessibility, or that a screenshot was approved. Read individual style docs and dependencies before adaptation.

## Validation

```sh
npm run test:registry
npm run test:unit
npm run test:browser
```

The registry validator rejects duplicate/phantom theme IDs, missing token/theme specs, unsupported facet values, unsafe or missing demo paths, and unregistered asset IDs. Unit tests cover context conflicts, natural language lexical retrieval, strict React compatibility, pair comparisons, no default and CLI output. Browser checks cover all fourteen cards, filters, previews, deep-linked original demos, keyboard choice, responsive 390/768/1440, and explicit empty states.

Automated Chromium screenshots are *capture evidence*, not human-approved design baselines. Manual visual, screen-reader, Safari/Firefox and device touch review remain future work.

### Maintenance rule

When adding a 15th theme, update **both** `registry/styles.json` and `registry/style-facets.json`, connect its asset ID and actual preview, ensure its actual Token JSON exists and CI passes. Do not add a style to `packages/ui/src/themes.css` without implementing and testing that scoped React theme separately.
