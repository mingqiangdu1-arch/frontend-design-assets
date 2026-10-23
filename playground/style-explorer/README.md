# Style Explorer · V0.4 · three independent directions

Stand-alone visual and interaction study for **Precision Dark**, **Editorial Warm**, and **Playful Pop**. This is a **portfolio of alternate ideas**, not a universal theme switcher for an existing product.

### Start

From repo root:

```sh
python -m http.server 8009
```

Visit `http://127.0.0.1:8009/playground/style-explorer/`.

### What to try

- **Precision Dark:** select work items, use focus mode, open command menu with visible button or `Ctrl/⌘+K`; `↑↓` select work items outside fields.
- **Editorial Warm:** toggle focus reading mode; save/unsave reading item (local only).
- **Playful Pop:** choose a quiz answer, confirm, read success/failure, proceed and reset at end. All points are fictional local demo state.
- **Cross-style:** switch among three designs from the top menu to see different layouts, fonts, spacing, interaction rhythms. The style selector is not intended as a component-level theming system.

### Verification boundaries

`model.mjs` has pure-state unit tests in `tests/style-explorer.test.mjs`; GitHub CI checks source syntax and catalog consistency. This does **not** establish reliable keyboard behavior across browsers, screen-reader usability, reduced-motion full compliance, screenshots, UI integration or production readiness.

Do not copy third-party logos/illustrations. All screens in this demo were authored for this research repository.
