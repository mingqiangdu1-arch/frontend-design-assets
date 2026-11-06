# AI multi-asset design composition · GitHub-first V0.17

A **planning-only, deterministic** way for Codex to combine the existing multi-style research, page blueprints, reference React components and interaction contracts. No default SaaS shell, automatic React port, browser launch, model invocation or target project modification.

## Inputs

Run from repository root; no new package installation is required to execute this Node script when Node is already available. For a GitHub-only review, Codex may instead read this guide and the referenced JSON files directly.

```sh
npm run design:compose -- --context=consumer-mobile --stack=react --format=markdown
npm run design:compose -- --context=workspace --intent=跨容器拖放 --stack=react --format=json
npm run design:compose -- --template=TPL-005 --stack=react --behaviors=IP-021,IP-022 --format=json
npm run design:compose -- --context=sci-fi-game --style=signal-noir --format=markdown
```

| Flag | Meaning |
| --- | --- |
| `--context` | A **declared exact taxonomy tag**, such as `workspace`, `consumer-mobile`, `knowledge-base`, `sci-fi-game` |
| `--intent` | Optional keyword(s) to rank templates and retrieve matching interaction references; it is **not** semantic understanding |
| `--style` | Explicit style ID from `registry/styles.json`; never coerced to another style |
| `--template` | Explicit registered page template ID; fixes its style |
| `--stack` | `any` (default), `react`, or `static`. A mismatched example is flagged for a port, never mislabeled as reusable |
| `--behaviors` | Optional comma-separated **real interaction IDs**, e.g. `IP-021,IP-022`; invalid IDs and style conflicts fail closed |
| `--format` | `json` (default) or `markdown` |

At least one of `context`, `style`, `template` must be explicit. An unknown context may return zero matched options; the planner must not invent a similar template.

## Output and decision boundary

The JSON includes: `request`, `selection`, `options`, `behaviorCandidates`, `alternatives`, `warnings`. Each option contains the scoped Style Profile/Tokens, source-grounded page implementation and sections (if registered), components with **wired-in-reference-demo** versus **candidate-not-wired** status, behavioral asset handoffs, and stack/adaptation warnings.

- **No explicit style or template:** `selection.styleId = null` and `selection.templateId = null`. Options are alternatives for the **agent and user to judge**, not a selection. Their order reflects exact declared context matches and simple keyword hits, **not design quality**.
- **Explicit template:** its declared style becomes selected; a conflicting `--style` is rejected. If the context is inconsistent, the tool refuses the mismatched combination.
- **Explicit style without a matching blueprint:** return a **style-only** handoff and mark page architecture as unimplemented. Never invent a page template.
- **React and static:** only TPL-005 and TPL-007 are wired React examples today. Other templates are independent HTML/JS sketches. Four style IDs are declared in the shared React component catalog; other styles are not silently promoted.
- **Advanced interactions:** `styleIds: []` means the *behavior idea* is neutral, not that a demo's JS/CSS is a React drop-in. Always inspect the full spec, keyboard/touch fallbacks, state model, failure/undo behavior and backend requirements.

## Codex handoff procedure

1. Identify the primary user job, content, intended device, information density and stack.
2. Read `registry/styles.json`, `registry/page-templates.json`, `registry/components.json`, `registry/assets.json`, plus the candidate documentation.
3. Collect **at least two different options** for an open-ended design task, explaining why they differ in information architecture, visual grammar and interaction load. Do not force multiple options if only one is evidenced; state the gap.
4. Select one option only when the application brief or user choice warrants it. Record the selected style and scope boundary; do not mix independent theme CSS globally.
5. Reuse verified source references as *references*; port behavior patterns intentionally, without inventing React compatibility or server persistence.
6. Produce a brief with: chosen/alternative direction, section hierarchy, selected component and interaction IDs, exact paths, deliberate non-use, compatibility limitations, accessibility and test gaps.
7. For this **asset repository** iteration, CI registry/unit checks suffice. Real project validation happens when implementing the actual product, not while cataloging designs.

## Known limitations

This planner performs exact category matching and basic substring keyword ranking. It is **not a UX research engine**, an LLM, a production recommendation system, or a generator of executable apps. It cannot judge screenshot aesthetics, create new layouts automatically, resolve brand identity or certify UX. Emerging styles without templates remain legitimate candidates.

Related: [lightweight asset handoff](asset-handoff.md), [template-only CLI](README.md), [creative art direction](../styles/creative-art-direction.md), [context architecture](../multi-context-architecture.md).

## V0.17 task-first concept alternatives (2026-11-06)

Existing `design:compose` now outputs two **research-only structural alternatives** by default in `options[].creativeAlternatives`, driven by exact context tags. They differ in information priority, sections, navigation, behavior, responsive reflow and accessibility fallback, not only visual style. Use `--concepts=0..4` to set the count. If no matching style exists, `architectureAlternatives` can still expose context-specific ideas without a fabricated page or CSS theme.

See [experience recipes and examples](experience-compositions.md) and [the machine-readable index](../../registry/experience-compositions.json).

## V0.17 explainable suitability criteria

Use `--density=low|medium|high`, `--device=mobile|responsive|desktop`, `--complexity=simple|guided|expert` and `--expression=restrained|expressive|immersive` to compare the `XC-xxx` architecture ideas against **explicit user needs**. Omitted dimensions receive no points. The `fitEvaluation` output contains ordinal alignment details, profile evidence, tradeoffs, and honest tie/weak-fit labels. It does **not** choose a visual theme or establish usability quality. [Evaluation rubric and examples](experience-compositions.md).
