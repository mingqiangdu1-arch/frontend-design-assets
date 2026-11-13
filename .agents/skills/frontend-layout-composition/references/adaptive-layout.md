# Adaptive layout reference / 响应式构图

This is a **decision worksheet**, not a generic CSS boilerplate to paste everywhere.

## Sequence
1. List content blocks in semantic DOM order: heading → primary task → critical data/media → secondary context → supplementary controls.
2. For wide viewport, name regions and relationships. For narrow viewport, identify *which* content must move; hiding essential tasks is not responsive design.
3. Test long labels, untranslated text, zoom, 200% text scaling, mixed card heights, empty list and missing images.
4. On touch, avoid hover-only actions; for horizontal galleries make scrollability visually discoverable and keyboard-focusable.

## Original intrinsic-grid pattern (optional source)

```css
/* Illustrative isolated wrapper: adapt selectors and breakpoint to content. */
.layout-sample {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(16rem, .75fr);
  gap: clamp(.75rem, 2vw, 2rem);
}
.layout-sample > * { min-width: 0; }
@media (max-width: 45rem) {
  .layout-sample { grid-template-columns: minmax(0, 1fr); }
}
```

The breakpoint means “two content columns cease to fit,” **not** “mobile means 720px.” Verify with real content and host font metrics.

## Source map
- Image + narrative: `FX-094` / `.fx53-offset-stage`.
- Three-part visual route: `FX-095` / `.fx53-wayfinding`.
- Overflow media gallery: `FX-096` / `.fx53-media-reel`; source includes keyboard-focusable container in HTML specimen.
- Image mosaic: `FX-097`; verify which figure spans rows/columns when narrow.
- Two contrasting viewpoints: `FX-098`; stacks at narrow widths.
- Ordered sequence: `FX-099`; preserves real list order.

These atoms are references to adapt; don't add a second set of functionally duplicate layout sources without a demonstrated need.
