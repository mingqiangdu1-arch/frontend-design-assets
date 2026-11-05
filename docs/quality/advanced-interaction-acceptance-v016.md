# V0.16 verification and limits · Advanced Interaction Atelier III

Status is **experimental**, not a production-readiness or WCAG certificate.

| What to test | Automated evidence | Meaningful limit |
| --- | --- | --- |
| Frame integrity | Node unit tests: integer FPS, bounds, unique clip IDs, non-overlap, touching edges | No actual audio/video or timebase sync |
| Magnetic editing | Pointer test: drag to a near-second position → actual snapped frame + Undo | Mouse emulation is not all touch/pen gestures |
| Cross-track change and conflict | Alt+Up/Down keyboard transfer, collision rejection preserves existing state | No multiuser permissions/concurrent saves |
| Recoverability | Undo/Redo, native toggle, slider, reset, focus restoration | No persistence/reload recovery |
| Narrative scrolling | Scroll to chapter, stage data and ARIA percent change, all text remains available | No guarantee of native CSS ScrollTimeline support |
| Reduced motion | Test no transformed stage core under `prefers-reduced-motion:reduce` | Human visual comfort assessment remains |
| Responsive | Browser screenshots 390/768/1440; no document overflow | Inner timeline rail intentionally horizontally scrollable on mobile |
| Cross-browser | Chromium regression plus dedicated Playwright Linux Chromium/Firefox/WebKit and touch emulation | Real OS/device test and screen-reader narration pending |

## Run

```sh
node --test tests/advanced-interactions-v3.test.mjs
npm run test:browser
```

`tests/browser/advanced-interactions-v3.spec.mjs` asserts actual pointer, frame, scroll and keyboard effects. Screenshots generated to `test-results/advanced-v3-{390,768,1440}.png` are **unapproved capture evidence**.

Before production adaptation, insist on real-device touch/pen evaluation, a keyboard audit across scroll transitions, VoiceOver/NVDA, dynamic toolbars, zoom/large fonts, long duration and large data, frame/timestamp integration, physical performance, network error rollback and signed visual baselines. A test passing on a fake local dataset is not evidence of server success.


## Additional multi-engine command

```sh
npx playwright install --with-deps chromium firefox webkit
npx playwright test -c playwright.interaction-v3.crossbrowser.config.mjs
```

The dedicated [workflow](../../.github/workflows/interaction-v3-crossbrowser.yml) is scoped to the Atelier III app/tests/config. Chromium phone touch emulation tests the **button** path; desktop Pointer tests emulate mouse drag. Neither is certified hardware input.
