# Bold Grid · independent visual lab

V0.7 original neo-brutalist direction. Uses exposed bold grids, high-contrast typography, square UI and offset shadows, unlike existing SaaS/pro-reader/Playful page patterns.

Run from root:

```sh
python3 -m http.server 8009 --bind 127.0.0.1
```

Navigate to `http://127.0.0.1:8009/playground/bold-grid/`.

Interact with category filters, saved-state buttons and same-document View Transitions (if supported and not reduced-motion); otherwise state changes immediately. All data is local; no checkout, accounts, tracking or persistence.

Tests: `node --test tests/bold-grid.test.mjs` and `npm run test:browser` for Chromium. Prototype only. CSS-drawn illustrative blocks; no third-party images or proprietary fonts. [Reference study](../../styles/neo-brutalist/README.md).
