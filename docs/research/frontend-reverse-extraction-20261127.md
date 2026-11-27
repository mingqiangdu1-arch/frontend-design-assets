# Frontend reverse extraction research / 前端逆向提取调研

**Reviewed:** 2026-11-27  
**Scope:** extracting reusable components and design-system facts from an authorized existing frontend into this repository.  
**Disposition:** two local skills and one shared evidence protocol; no upstream source files or runtime dependencies copied/installed.

## Findings and source roles

| Source (pinned revision) | Useful idea | Adopted locally | Boundary / rights |
| --- | --- | --- | --- |
| [Impeccable Extract](https://github.com/pbakaus/impeccable/tree/2fc5e1459efbbf06d92c7306517c286bf12490cf/.agents/skills/impeccable/reference/extract.md) | Repeated components, inconsistent variants, hard-coded values, composition patterns, incremental extraction | Candidate triage, minimum useful boundary, avoid premature abstraction | Root Apache-2.0. No text/scripts copied; 3+ usage is a signal, not a rigid threshold. |
| [Vercel DS Skills Pipeline](https://github.com/vercel-labs/design-systems-to-agent-skills/tree/0e541bc7a8eb8e86e6b1c93fac7cf21588d487da) | Staged interview, verified source facts, optional usage analysis, persisted artifacts and mechanical verification | Pin revisions; separate verified facts from proposed abstractions; validate exports/paths | Root MIT. No commands/templates/code copied; full multi-session pipeline not needed here. |
| [Dembrandt](https://github.com/dembrandt/dembrandt/tree/61d8aa4adc8c8725eca00d6d46abda3bd913155b) | DOM/computed-style and CSSOM extraction, multi-page/mobile/dark sampling, DTCG/DESIGN.md/Tailwind/HTML exports | Optional browser-side design-system extraction reference | MIT root license; separate Node CLI/MCP tool with dependencies and first-run Chromium download. Not installed or executed. |
| [StyleLift](https://github.com/sreenathmmenon/stylelift/tree/7c976f86cb6a037dfc3d37fb17da1640488d97b4) | Browser-side computed styles, CSSOM and custom properties; DESIGN.md, DTCG, CSS and preview artifacts | Optional research reference for sampling and handoff | No root license file found in inspected tree. No code copied or installed. |
| [Storybook](https://github.com/storybookjs/storybook/tree/deb929b1e1a943a37da82946fa11b42b983d704e) | Isolated component stories, states and component-level testing/documentation | Optional downstream verification when target already uses Storybook | Root MIT. Not an extractor; no dependency added. |
| [shadcn Registry](https://github.com/shadcn-ui/ui/tree/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4) | Registry item metadata for files, dependencies and component delivery | Optional handoff-shape reference, not a universal registry contract | Root LICENSE.md is MIT. Individual source/assets still require review. No source copied. |
| [DTCG Format 2025.10](https://www.designtokens.org/tr/2025.10/format/) · [official repo snapshot](https://github.com/design-tokens/community-group/tree/882ebd6716abef9a46d8ef5fb12e82009d6cee2e) | Stable exchange format for typed tokens, groups and aliases/references | Optional `tokens.dtcg.json` export; keep separate from existing native token JSON | W3C Community Group Final Specification Agreement. Stable, but not a W3C Standard or W3C Standards Track document. No spec text copied. |

## Decisions

1. **Two workflows:** `frontend-component-extraction` and `frontend-design-system-extraction`. Outputs and verification differ, so keep them separate.
2. **One shared protocol:** source identity, authorization, evidence labels, safe inspection and promotion rules live in `.agents/skills/shared/extraction-protocol.md`.
3. **Source first, browser second, screenshot last.** Source identifies actual exports and declared tokens; browser records rendered behavior/computed values; screenshots support visual inference only.
4. **No arbitrary frequency threshold.** Repetition is evidence of reuse value, not a mandatory three-instance rule. Keep distinct business intent separate.
5. **Keep current registries.** `assets.json` is the broad asset index; `components.json` lists actual public React exports only; `styles.json` and `style-facets.json` remain the style layer. No new registry schema or global default.
6. **Do not convert every extraction into a new style.** Extend an existing style when supported; create a new one only with multi-page/component evidence, documented tokens and a preview.
7. **No automatic tooling install.** Dembrandt/StyleLift are optional references; Storybook is optional verification. No dependencies or browser binaries are added.

## Repository fit

- Component extraction: standalone HTML/CSS/JS → existing primitive conventions; behavior contract → `docs/interactions/`; page composition → `recipes/`; real React export → `packages/ui/src/` plus both canonical registries, gallery, docs and tests.
- Design-system extraction: retain existing token schema; optionally add a separate DTCG export; update `styles.json`/facets only for a coherent style profile. Keep React theme compatibility explicit and preserve `defaultStyleId: null`.
- Existing `frontend-component-adaptation` remains downstream from library asset to target app. The new component extraction skill is upstream from source project to this library.

## Validation and limits

- Documentation/workflow addition only. No asset ID, React export, visual style, package, script, npm dependency or browser runtime added.
- Current inventory remains 620 asset entries, 48 React exports and 15 styles.
- JSON syntax and path/registry consistency should be checked after integration. Runtime extraction quality still requires a later test against an authorized source project and representative live page.
