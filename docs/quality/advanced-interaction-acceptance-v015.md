# Advanced Interaction Lab II · Cross-browser and accessibility acceptance

This verification document belongs to **V0.15 research prototypes**, not production accessibility certification. It covers IP-021 (cross-container transfer) and IP-022 (FLIP layout reflow). The code is static, local-only and independent of the repo's visual themes.

## Test dimensions

| Layer | Tool / environment | Required evidence | What it cannot prove |
| --- | --- | --- | --- |
| Pure state model | Node test runner, `tests/advanced-interactions-v2.test.mjs` | Immutable transfer, IDs, undo/redo, lane bounds and deterministic sort | Device events, focus and any backend concurrency |
| Existing UI regression | Playwright Chromium, `advanced-interactions-v2.spec.mjs` | Pointer movement, keyboard pickup/drop/cancel, focus, reduced motion, three viewports | All browser engines, real device gestures and screen-reader speech |
| Multi-engine browser smoke | Playwright Chromium + Firefox + WebKit | Accessible landmarks/groups, labelled buttons, keyboard semantics, no-op state, DOM identity, pointer path, reduced-motion | An end-user version of Safari/Firefox in all operating systems |
| Emulated touch | Chromium `hasTouch` / `isMobile` and Playwright `tap()` | On-screen button-only transfer and undo work without mouse or drag | Real iOS/Android touch, multi-finger drag, palm rejection, assistive touch |
| Manual accessibility / visual | Not yet certified | VoiceOver, NVDA, actual device touch, keyboard and visual review | Must never mark this complete from CI or screenshots alone |

## Fixes from the V0.15 review

- Name the board and collection as **explicit `role="group"` regions**. An `aria-label` on an unclassified generic `div` does not reliably create an accessible group.
- If the keyboard drops onto its original lane, reset `aria-pressed` and restore the handle's focus. Do not leave an uncommitted item visually or semantically 'picked up'.
- When focus leaves the picked handle, cancel pickup and provide an audible live-region explanation. This avoids a stale hidden drag mode while interacting with another control.
- Reflow checks must compare references to **the same DOM elements**, not merely whether four cards remain after a sort.
- Preserve the original keyboard-first explicit move buttons at 390 px, independent of Pointer Events.

## How to run

```sh
npm install --no-audit --no-fund
npx playwright install --with-deps chromium firefox webkit
npx playwright test -c playwright.interaction-crossbrowser.config.mjs
npm run test:browser
npm run test:unit
```

The dedicated GitHub workflow is `.github/workflows/interaction-crossbrowser.yml`. Its Playwright projects are `chromium`, `firefox`, `webkit` and `chromium-touch-emulation`. The touch project is a browser emulator, **not** a claim of actual device access. Normal Chromium smoke continues to run via the existing browser workflow.

## Manual sign-off still required before production reuse

1. Real-device touch and pen interaction, including canceled gestures, scrolling while holding a handle, orientation changes and mobile viewport scaling.
2. Screen-reader traversal with NVDA/Firefox, VoiceOver/Safari and actual live announcements of pickup/target/drop/cancel.
3. Firefox and WebKit on representative end-user OS/browser versions, not only CI Linux headless engines.
4. Shared-state permissions, optimistic server failure rollback and concurrency. None of these exist in the demo.
5. Visually approved snapshots at narrow/wide viewport sizes, text-size zoom, contrast, system fonts and reduced motion.

**Decision rule:** Successful cross-browser CI permits merging as a **research prototype** with explicit unverified boundaries. It does not permit marking an IP/KIT registry asset `production-ready` or advertising WCAG compliance.
