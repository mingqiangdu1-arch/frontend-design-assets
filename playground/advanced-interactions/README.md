# Advanced Interaction Laboratory · V0.14

Original **static, interactive, dependency-free** implementation research for three advanced interaction families. The visual style of the demo is an independent experimental wrapper; behaviors are transportable as a design specification, not production-ready library exports.

- **IP-018 Spatial Canvas**: pointer capture, node dragging, marquee selection, zoom anchor, pan, keyboard nudge and local undo/redo history.
- **IP-019 Contextual Orbit Menu**: right-click, Shift+F10, explicit trigger, Arrow/Enter/Escape keyboard cycle and focus restoration, responsive list-mode fallback.
- **IP-020 State Scrubber**: native keyboard/pointer/touch `<input type=range>`, real CSS-layer comparison, deterministic presets and no auto-playing motion.

All content, illustrations, seed objects and state are local-only demonstration fixtures. No clipboard, image upload, server, persistence, authentication, AI operation, real comparison dataset or multiuser collaboration exists. Browser snapshots are **capture-only**, not approved visual baselines.

## Run and test

```sh
npm run dev:catalog
# http://127.0.0.1:8009/playground/advanced-interactions/
node --test tests/advanced-interactions.test.mjs
npm run test:browser
```

Design, keyboard, touch, failure semantics, limitations and next-batch candidates: [Special Interactions Guide](../../docs/interactions/special-interactions.md).

In contrast with the old [Interaction Lab](../interaction-lab/README.md), this example doesn't reimplement reversible archive, wizard, button-based reorder or native-range split panel. The existing [Command Menu](../../docs/interactions/patterns.md) also remains the source of truth for general Cmd/Ctrl+K command search.

## Latest verified evidence

- Draft PR #4 (historical private pull/4), Chromium browser evidence (historical private actions/runs/41982369373) (45 tests passing), registry/unit checks (historical private actions/runs/41982369352) passing.
- Responsive window resizing re-fits the viewport before screenshots at 390, 768 and 1440; original local state and keyboard alternatives remain. Captured screenshots are not an approved visual golden.
- Notion archival analysis (private research record omitted) for future incremental additions and product-specific adaptations.
