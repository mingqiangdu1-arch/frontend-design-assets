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
