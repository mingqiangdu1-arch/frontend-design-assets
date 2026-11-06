# Task-first experience composition grammar · V0.17

**16 original research recipes, 8 product families, 24 indexed context tags.** This is an architecture and interaction idea bank, not a new set of visual styles, registered page templates, React exports, or production-ready demos.

## Design alternatives within the same product

| Product family | Direction A | Direction B |
| --- | --- | --- |
| Operations | Scan-first exception console | Guided case resolution |
| Mobile learning | Single meaningful daily action | Chapter progress journey |
| Knowledge / reading | Searchable topic atlas | Guided long-form chapters |
| Commerce | Media-led browse and filter | Evidence-first product comparison |
| Campaign / portfolio | Bold statement poster | Process-and-results case story |
| Creative tool | Spatial design studio | Frame-accurate timeline |
| Fictional game | Mission world map and HUD | Adventure chapter chronicle |
| Digital exhibition | Exploratory constellation | Curator-led narrative visit |

These are deliberately **different information structures**, not two color or font treatments of the same UI. Each catalog entry records content priority, ordered sections, navigation, primary behavior, mobile reflow, keyboard/accessibility fallback, visual hierarchy, and anti-patterns.

## Existing CLI: no new toolchain

```sh
npm run design:compose -- --context=consumer-mobile --concepts=2 --format=markdown
npm run design:compose -- --context=creative-tool --concepts=2 --format=json
npm run design:compose -- --context=sci-fi-game --style=signal-noir --concepts=2 --format=markdown
npm run design:compose -- --template=TPL-005 --concepts=2 --format=json
```

The option `--concepts=0..4` controls the number of source-grounded alternatives; default is **2**. Output is found in `options[].creativeAlternatives[]`. If no existing visual style or page template fits, architecture-only research can appear under `architectureAlternatives[]`, **without inventing a style or a runnable page**. If even the architecture context is unindexed, return no candidates instead of forcing a default.

Each idea has an `XC-xxx` ID and real indexed interaction references. These **refer to adaptable behavior descriptions**, not imported React components; `fit=manual-context-adaptation` marks a behavior borrowed from another task context. The working design and all user-facing claims must still be decided and tested in the target app.

## Codex design review rubric

1. Identify user goal, actual data/content, device/input, technical stack, permissions, and primary action.
2. Create two alternatives that differ by **layout model, information order, navigation, or major interaction**, not merely palette or decoration.
3. Explain why one fits better for the actual constraints; cite `XC-xxx` and `IP-xxx` / `SAAS-xxx` as references, not as working modules.
4. Select a single local style deliberately. Keep scoped tokens independent; a style-neutral recipe does not establish cross-theme CSS or React compatibility.
5. Specify narrow-screen restructuring, keyboard/no-motion fallback, empty/error/cancel/undo handling, and honest backend/data boundaries.
6. Keep the rejected alternative and the reason, so the next model can improve rather than repeat the same visual shell.

## Verification and evolution

The registry check validates uniqueness, required fields, at least two distinct architectures per context, referenced interaction IDs and the absence of a global default. Node tests cover known/unknown contexts, deterministic output and explicit style boundaries. **These checks do not certify visual quality or accessibility**. Actual product adoption requires device, usability and platform testing; asset collection does not require new browsers, Demo pages or deployments.

Sources: [registry/experience-compositions.json](../../registry/experience-compositions.json) · [Existing planner](design-composition.md) · [Creative style grammar](../styles/creative-art-direction.md).

## V0.17 preference-aware, explainable concept comparison (2026-11-06)

This is a **conditional fit comparison**, not a prediction of conversion, a universal UX quality score, aesthetic measurement or an accessibility audit. Each of the 16 `XC-xxx` architecture research recipes declares an editable `fitProfile`:

| Dimension | Accepted user constraint | What it means |
| --- | --- | --- |
| Content density | `--density=low|medium|high` | Amount of competing visible content the layout is intended to organize |
| Device | `--device=mobile|responsive|desktop` | Design's primary spatial/input target, not a browser support guarantee |
| Interaction complexity | `--complexity=simple|guided|expert` | User operation pattern; expert isn't inherently better than simple |
| Visual expression | `--expression=restrained|expressive|immersive` | Proposed visual character; **not** a measured uniqueness or quality metric |

All constraints are **optional and have no hidden defaults**. A profile includes a short catalog evidence note and a concrete tradeoff. Matches award 2 ordinal points per dimension, adjacent levels 1 point and opposite levels 0. Unspecified dimensions are excluded from the denominator. A request with one preference has maximum 2 points; four preferences have maximum 8. The score is deliberately called `fitEvaluation`, never a production quality or visual assessment.

With no preferences, the existing recipe order is preserved, `fitEvaluation.score=null`, and the candidates are unranked. With user preferences, alternatives are ranked **within the matched context** and each criterion shows requested/declared level, fit (aligned/partial/conflict), evidence and tradeoff. Ties are explicit; a unique leader remains only a **conditional hypothesis**, not a chosen design. Weak or incompatible candidates cannot be presented as confident winners.

```sh
npm run design:compose -- --context=consumer-mobile --density=low --device=mobile --complexity=simple --expression=restrained --format=markdown
npm run design:compose -- --context=consumer-mobile --density=medium --device=mobile --complexity=guided --expression=expressive --format=markdown
npm run design:compose -- --context=creative-tool --device=desktop --complexity=expert --format=json
```

For the same mobile-learning context, the first request favors `XC-003` (one meaningful action) while the second favors `XC-004` (chapter progression). That reversal comes from **declared layout suitability**, not from an AI image comparison or collected user study. Each output preserves the less-fit design, its concrete alternative strengths, and target-app QA gaps.

**Use in Codex:** articulate the user job and constraints, inspect both results, compare criterion-by-criterion, and explicitly justify which design direction to develop. Never equate the highest fit points with approval or erase the alternatives. Add real evidence (screenshots, usability research, accessibility testing, metrics) only when the target environment supports it.
