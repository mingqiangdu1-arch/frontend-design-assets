# Interaction Atelier III · V0.16

Original static, interactive, style-agnostic behavior research with a distinct experimental visual wrapper. The **two interaction models are independently reusable as specifications**, not production-ready React exports.

## IP-023 · Frame-based multitrack timeline with magnetic snapping

- Three tracks, six original fictional clips, **24 FPS × 12 seconds = 288 integer frames**.
- Pointer drag previews real clip motion; drop applies a new frame and/or target track only when collision constraints allow.
- Magnetic priority: nearby clip edges, playhead, 1-second marks within ±5 frames. Toggle snapping via a native checkbox or hold Alt during pointer drag.
- Native slider moves the local playback head. No real audio/video is being rendered or played.
- Keyboard focusing any clip: Left/Right moves one frame, Shift+Left/Right moves 12 frames, Alt+Up/Down moves across tracks. A visible detail panel exposes precise ±1-frame and track up/down buttons.
- Local history (20 snapshots), redo, reset, focus restoration, no silent server writes. Collision and no-op are announced without fake success.

## IP-024 · Scroll-driven editorial narrative

- Four fully readable, semantic original chapters with links between them, not animated text gated on progression.
- Scroll progress is computed using a passive `scroll` listener and `requestAnimationFrame`; a sticky original CSS illustration responds with optional decorative motion.
- Current chapter name, numbered stage, native `role=progressbar`/ARIA progress, next/previous chapter buttons, `aria-current=step` on the active article.
- Reduced-motion mode removes CSS transforms/transitions and uses instant navigation while preserving chapter switching and text visibility.
- This is a first-party progressive JS scroll implementation; it does **not** claim to use browser-native CSS `animation-timeline` or ScrollTimeline API.

## Run locally

```sh
npm install --no-audit --no-fund
npm run dev:catalog
# http://127.0.0.1:8009/playground/advanced-interactions-v3/
node --test tests/advanced-interactions-v3.test.mjs
npm run test:browser
```

[Full behavior contract](../../docs/interactions/advanced-interactions-v3.md) · [Interaction Lab II](../advanced-interactions-v2/README.md) · [Quality requirements](../../docs/quality/advanced-interaction-acceptance-v016.md).

Everything is in-memory and uses invented content. This prototype includes **no user media, actual timeline playback, collaboration, backend save, export, analytics, external images or vendor code**. The demo's visual theme is not a default for other products. Screenshots are capture-only, not formally approved visual baselines.


## Dedicated multi-engine smoke (V0.16 QA extension)

The separate `playwright.interaction-v3.crossbrowser.config.mjs` suite runs Playwright Chromium, Firefox and WebKit on Linux headless plus Chromium touch emulation at 390px. It checks genuine pointer drag, frame snapping, cross-track transfer, keyboard precision, focus, semantic controls, scroll chapter reading and reduced-motion fallback. The mobile touch project exercises visible button alternatives through `tap()`, **not** physical multi-finger gestures.

```sh
npx playwright install --with-deps chromium firefox webkit
npx playwright test -c playwright.interaction-v3.crossbrowser.config.mjs
```

See [cross-engine acceptance matrix](../../docs/quality/advanced-interaction-acceptance-v016.md). A green Playwright result is **not** physical iOS/Android QA, actual OS Safari/Firefox certification, VoiceOver/NVDA signoff, or a production ready claim.
