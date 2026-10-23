# Repository architecture

**One topic, three different artifacts:**

| Surface | Stores | Does not claim |
| --- | --- | --- |
| Notion | research, screenshots, comparison, source attribution, status decisions | source of runnable component code |
| GitHub / docs+registry | stable IDs, change history, recipes, implementation requirements | every catalog item is implemented |
| GitHub / playground+code | original demos, verified reference components, integration guides | automatic compatibility with AI WORKFLOW PLATFORM |

## Information architecture

- `docs/visual/`: design directions and rules; token rationale.
- `docs/interactions/`: behavioral specifications and comparison notes.
- `docs/research/`: source links and extraction notes.
- `tokens/`: portable design constants, strongly semantic.
- `registry/`: searchable machine index. The `id` never changes when reclassified.
- `playground/`: standalone demos and isolated experiments.
- `components/`: portable original components **only when implemented**, not placeholders.
- `interactions/`: behavior-level reusable modules **when implemented**.
- `recipes/`: combinatorial assembly specifications; some may be design-only.
- `templates/`: repeatable case entry structure.
- `archive/`: earlier iterations, not replacement for the living index.

## Contribution flow

**Capture → Compare → Dissect → Prototype → Validate → Promote → Reuse.**

Adding a Notion design reference may be enough; code is optional until that pattern is selected for implementation. When code is implemented, store dependency versions and exact reproduction steps; add error/cancel/keyboard acceptance criteria.

## Stable identity rules

Use `REF-xxx` for design references, `IP-xxx` for interaction patterns, `AN-xxx` for animation references, `DT-xxx` for token sets, `UI-xxx` for components, `PR-xxx` for page recipes, and `KIT-xxx` for historical snapshots. IDs are repo-wide unique. Do not reuse retired IDs.

## Default boundaries

The AI platform is a **future consumer**, not this repository's runtime. API endpoints, workflows, requirements, authentication, database schemas and implementation schedule are outside scope.
