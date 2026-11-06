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
