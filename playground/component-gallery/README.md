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

These test the current source's TypeScript, distribution bundle, gallery build and limited Chromium flows. No screenshot approval, Safari/Firefox, physical mobile, assistive tech or target project compatibility certification. Component version is reference-implemented, not production ready.

Historical [SaaS Labs](../saas-patterns/README.md) and [Style Explorer](../style-explorer/README.md) remain separate; this gallery is not an automatic replacement.
