# V0.12 Visual QA: evidence is not an approved baseline

The [Component State Matrix](../../playground/component-gallery/README.md) renders 12 UI export groups plus an isolated request-state fixture. It is accessible at `http://127.0.0.1:5174/?view=matrix` after `npm run dev:components`.

## Three distinct gates

1. **Component behavior:** Node + Playwright test controlled props, disabled/loading state, aria-invalid, tabs, dialog Escape, error toast and recovery from a local failed request.
2. **Screenshot capture:** Chromium captures all four *declared* React themes at 390/768/1440 px (12 matrix PNGs). `node scripts/visual-evidence.mjs capture --dir=test-results` writes a SHA256 manifest marked `capture-only-unapproved`; CI archives it.
3. **Human-approved visual baseline:** an accountable reviewer inspects actual images, documents a stable source commit, signs exact screenshot SHA256 values in `registry/visual-baselines.json` under `approved`, and separately lands that file in a reviewed PR. Until this exists, `node scripts/visual-evidence.mjs verify` **fails closed**. A successful build or capture job is **not** visual regression approval.

### Review workflow

```sh
npm run test:components:browser
node scripts/visual-evidence.mjs capture --dir=test-results
node scripts/visual-evidence.mjs verify  # deliberately fails until a reviewer approves real pixels
```

Never automatically copy candidate screenshots to a committed golden folder or mark them approved inside CI. Manual review should check actual fonts, clipping, contrast, widget disabled behavior, native focus, reduced-motion rendering and screen-reader paths. Different Chromium versions/OS fonts may alter pixels; hashes are an *exact provenance check*, not a perceptual difference algorithm. For perceptual diff, add a separately versioned tolerance policy with owner sign-off.

## Scope limits

No automatic Playwright `toHaveScreenshot` baseline is installed yet; a pixel snapshot regression suite cannot legitimately claim to pass. Manual/a11y testing for screen readers, browser engines, actual product data and all component states remains pending.
