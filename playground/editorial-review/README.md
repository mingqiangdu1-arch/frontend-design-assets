# TPL-007 · Editorial Warm React Review Room (V0.12)

This is the **second full-page React composition** in frontend-design-assets, following TPL-005 Precision Dark. It reuses the **actual** `ThemeSurface`, `Button`, `Badge`, `Card`, `TextField`, `Tabs`, `Dialog`, `Toast`, `Avatar`, `Progress` and `EmptyState` exports from `packages/ui`.

**Unlike TPL-005**, its content architecture is editorial: large serif headline, story directory, narrow reading proportions, review inspector and meaningful article excerpts. No inherited dense SaaS sidebar or issue-table shell.

## Run

    npm install
    npm run dev:editorial-react
    # http://127.0.0.1:5176/

Validation:

    npm run typecheck:ui
    npm run build:editorial-react
    npm run test:editorial-react:browser

Local interactions: search by title/author/category, status filter, story selection, summary/notes tabs, modal full-content preview, draft/review/ready state changes with latest-change undo Toast.

Everything is an in-memory fixture. **Ready** is not "published"; there is no authentication, version history, collaboration, database, API, or real publishing. Screenshot artifacts at 390/768/1440 are capture-only and require human review before any formal visual baseline.

This React demo has no relationship to the standalone HTML editorial reading library `TPL-002` other than the **same explicitly selected visual style**.

## Controlled editorial design review · 2026-11-05

The second Unslop-inspired source review is a **distinct editorial genre test**, not a conversion to a dark SaaS layout. Status filter controls now have a 44px minimum height and 12px labels, small secondary text has a clearer hierarchy, and keyboard users receive a focus-visible skip link to the story collection. The typography, serif hero, long-form excerpts, original palette, article hierarchy and local-only interactions are preserved.

This branch also introduces [a small original Hallmark audit comparison reporter](../../scripts/report-design-audit.mjs) and [a pinned upstream Hallmark advisory workflow](../../.github/workflows/editorial-design-review-audit.yml) that compare current source with the main-branch baseline. This is source-only, not the upstream Hallmark generator or a universal aesthetic gate. See [research limitations](../../docs/research/editorial-design-review-pilot.md).
