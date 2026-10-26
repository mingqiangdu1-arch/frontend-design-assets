# Component Gallery · V0.6

React/TypeScript gallery for [18 UI components](../../packages/ui/README.md), with four independent style scopes.

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

Run `npm run dev:components`, then open `http://127.0.0.1:5174/?view=matrix`. The matrix tests **selected states for 12 of 18 actual React exports** across all four declared package themes. The six uncovered exports are listed in `registry/component-states.json`. It also includes a separate request-state fixture (idle/loading/empty/error/success), which is not a package export.

Browser tests capture 12 screenshots at 390/768/1440 in `test-results/`. Use `npm run visual:capture` to produce unapproved SHA256 evidence; explicit human inspection and approval are still required. Read [Visual QA policy](../../docs/quality/visual-review.md).
