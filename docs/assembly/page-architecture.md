# Page Architecture: layout composition is not universal

## Four different archetypes

| ID | Primary user job | Page structure | Interaction grammar | Non-goal |
| --- | --- | --- | --- | --- |
| TPL-001 | Find and act on records quickly | Navigation, dense list and contextual actions | selection, drill-down, bulk state | a generic consumer landing page |
| TPL-002 | Discover and read substantial content | Masthead, topical index, narrow reading sheet | search, bookmarks, Escape and focus | dashboard KPI cards |
| TPL-003 | Complete quick repeatable tasks on a phone | Greeting, progress card, task stack, mobile nav | tactile task toggle, progress, completion | professional grid-style analytics |
| TPL-004 | Experience a distinctive campaign identity | Giant hero, typographic strip, filterable graphic tiles | pressed filters, bookmark, progressive motion | a production checkout flow |

## Reuse boundary

These are independent working prototypes, not four style variants of the same UI shell. They do not share an application framework or real business APIs. The TypeScript React UI library (V0.6) supports four original themes as component-level candidates; the new Bold Grid page remains an independent style.

## Assembly sequence

1. Identify audience, device and first task.
2. Choose a style and template explicitly (do not select because it is newest).
3. Inspect original source and Token values.
4. Generate a machine-readable plan from [the assembly CLI](README.md).
5. Compose real app state, routing, backend contracts and responsive behaviors separately.
6. Prove behavior with tests and manual accessibility/visual QA.
7. Record integration evidence before upgrading lifecycle stage.

Template references without matching implementation have not been automatically generated. When no current template fits a style/context, the CLI should reject it and prompt new research, never silently fallback to an unrelated UI kit.

## TPL-005 · Precision Dark React Professional Workbench

Fifth distinct page composition uses a compact workspace rail, searchable status list, metrics and optional detail inspector. It is the first page here to import the actual React UI package; it runs through Vite on port 5175. Its semantics and responsiveness must be evaluated independently of the four standalone HTML demos. [Source & operations](../../playground/precision-workbench/README.md).
