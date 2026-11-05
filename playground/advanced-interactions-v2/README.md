# Advanced Interaction Lab II · V0.15

Two original, **theme-independent behavior prototypes** with a deliberately distinct editorial/utility visual wrapper. They augment V0.14's Spatial Canvas / Radial Context Menu / State Scrubber without rewriting them.

## IP-021 — Cross-container transfer board

- Pointer drag via `setPointerCapture` and `elementFromPoint` drop targeting; commits **only** on pointer-up on another lane.
- Keyboard drag handle: Space to pick up, ArrowLeft/ArrowRight to target, Enter/Space to drop, Escape to cancel. `aria-pressed` and a live status message communicate state.
- Explicit Left/Right move buttons remain available on every item, independent of drag support.
- Deterministic local undo/redo history (20 snapshots), local reset and focus restoration after a DOM re-render.
- No simulated network persistence, hidden server success, remote collaboration or permissions.

## IP-022 — FLIP collection reflow

- Sorting (priority/name) and layout (grid/stack) operate on **the same four existing DOM card nodes**.
- For motion-enabled Chromium, first/last bounds inform a transform-only Web Animations API transition; state and DOM order update synchronously before the optional animation.
- If `prefers-reduced-motion` is active or `Element.animate` is missing, the same state change occurs instantly.
- Keyboard focus must remain on the existing item when a script triggers a reorder. Rapid-change animations are canceled before the next transition.

## Run

```sh
npm run dev:catalog
# http://127.0.0.1:8009/playground/advanced-interactions-v2/
node --test tests/advanced-interactions-v2.test.mjs
npm run test:browser
```

[Behavior acceptance guide](../../docs/interactions/advanced-interactions-v2.md) · [V0.14 interaction lab](../advanced-interactions/README.md) · [asset registry](../../registry/assets.json).

Both are **research prototypes**, not production React exports. Testing must separately cover Safari/Firefox, mobile multitouch, touch/pen hardware, screen readers, long content, collaboration conflicts, and actual permissions. Browser screenshots remain capture-only and do not become approved goldens automatically.


## Cross-browser acceptance (V0.15 QA extension)

Dedicated Playwright config: `playwright.interaction-crossbrowser.config.mjs` and CI workflow `.github/workflows/interaction-crossbrowser.yml`. Test projects: Chromium, Firefox, WebKit (Linux headless) and **Chromium mobile touch emulation**. The checks exercise keyboard pickup/target/drop/cancel, same-lane no-op, focus departure, pointer transfer, original DOM identity after FLIP, named accessible groups, reduced motion, duplicate element IDs and touch-enabled button fallback.

Run with:

```sh
npx playwright install --with-deps chromium firefox webkit
npx playwright test -c playwright.interaction-crossbrowser.config.mjs
```

See [cross-browser and accessibility acceptance scope](../../docs/quality/advanced-interaction-acceptance-v015.md). **Automated semantics and emulator tests do not replace real phone/pen tests, screen-reader narration or WCAG certification.**
