# Component Gallery · V0.6

React/TypeScript gallery for [41 UI components](../../packages/ui/README.md), with four independent style scopes.

## Run (Node 22+)

```bash
npm install
npm run dev:components
```

Open `http://127.0.0.1:5174/`.

Try switching styles, changing input values, validation, native select, checkbox/switch, tabs with arrow keys, dialog Escape, toast dismissal, data list selection and progress. **Everything is local/ephemeral**.

## Tests

```bash
npm run typecheck:ui
npm run build:ui
npm run build:components
npm run test:components:browser
```

V0.6 CI successfully completed TypeScript and both builds, plus **8/8 Chromium gallery smoke tests** ([GitHub Actions](https://github.com/mingqiangdu1-arch/frontend-design-assets/actions/runs/40284518385)). These test the current source's TypeScript, distribution bundle, gallery build and limited Chromium flows. No screenshot approval, Safari/Firefox, physical mobile, assistive tech or target project compatibility certification. Component version is reference-implemented, not production ready.

Historical [SaaS Labs](../saas-patterns/README.md) and [Style Explorer](../style-explorer/README.md) remain separate; this gallery is not an automatic replacement.

## V0.12 Selected Component State Matrix

Run `npm run dev:components`, then open `http://127.0.0.1:5174/?view=matrix`. The matrix tests **selected states for 12 of 41 actual React exports** across all four declared package themes. The twenty-nine uncovered exports are listed in `registry/component-states.json`. It also includes a separate request-state fixture (idle/loading/empty/error/success), which is not a package export.

Browser tests capture 12 screenshots at 390/768/1440 in `test-results/`. Use `npm run visual:capture` to produce unapproved SHA256 evidence; explicit human inspection and approval are still required. Read [Visual QA policy](../../docs/quality/visual-review.md).

## V0.19 advanced component specimen coverage

Five actual React/TypeScript exports added: `UI-033 DataTable`, `UI-034 TreeView`, `UI-035 Combobox`, `UI-036 Popover`, `UI-037 DualRangeField`. Each has a working local-state gallery specimen, four declared style scopes and dedicated Chromium smoke paths for sorting/selection, tree keyboard navigation, combobox disabled options, Escape/outside dismissal and range clamping. These **are not the research-only UI-028..032 sketches**. The selected-state matrix is still partial; five new exports are explicitly uncovered there.

## V0.20 utility specimens

New gallery entries: `UI-038 CommandMenu`, `UI-039 DatePicker`, `UI-040 ResizablePanels` and `UI-041 FileUpload`. Their live fixtures exercise command search/keyboard choices, native date bounds/clear action, keyboard-driven split width and local file validation/removal. Browser checks cover all four supported themes and 390/768/1440px page overflow. The old state matrix is intentionally still partial: it does not claim these four new exports as reviewed.

## V0.21 navigation and disclosure gallery

Five actual React exports: `Tooltip` (UI-042), `Breadcrumb` (UI-043), `Pagination` (UI-044), `Accordion` (UI-045), `SidebarNav` (UI-046). Each has its own controlled/local Gallery fixture, with Chromium tests for pointer/focus Escape, semantic current page, sparse pagination boundaries, accordion keyboard movement and nested sidebar navigation. These fixtures use all four declared themes and narrow widths; the historic selected-state matrix still only covers the 12 original exports.

## V0.22 complex-form, visualization and layout Gallery

Added five actually implemented UI components: `FormWizard` (UI-047), `RepeatableFields` (UI-048), `ValidationSummary` (UI-049), `Sparkline` (UI-050), and `DashboardGrid` (UI-051). Gallery fixtures are local only. Playwright checks cover wizard input gating and completion, field list add/remove constraints, host focus callbacks from validation errors, real finite SVG path and 4→2→1 responsive grid columns across four supported themes. Historical state matrix remains transparently partial (now 25 uncovered exports).

## V0.23 data operations specimens

Real implemented exports `UI-052 FilterableDataTable`, `UI-053 KanbanBoard`, `UI-054 ActivityTimeline` and `UI-055 InteractiveBarChart` are shown with local fictional fixtures. Browser scenarios cover keyword/category filtering with controlled comparator sorting, native drag/drop and per-card select movement, timeline selection/dates, keyboard bar selection and four-theme 390/768/1440px overflow. The historical selected-state matrix continues to cover only 12 older components, explicitly leaving 29 unreviewed there.
