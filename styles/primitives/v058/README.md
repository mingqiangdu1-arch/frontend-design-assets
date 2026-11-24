# V0.58 · Object-display and merchandise source material

Six independent **original HTML/CSS visual specimens** for portfolio, product display, small-brand editorial and ecommerce visual exploration. These are **not** a storefront, product data model, a warehouse app, an image AI model or a manufacturing template.

| ID | Copy CSS family | Purpose | Boundary |
| --- | --- | --- | --- |
| FX-118 | .fx58-plinth | Floating plinth stage and replaceable object image | CSS staging illusion, not a real 3D scene or photo lighting engine |
| FX-119 | .fx58-finish-ledger | Readable static finishes with illustrative CSS swatches | Never a purchase variant selector or measured PBR material |
| FX-120 | .fx58-zoom, zoom.js | Working native range input (100–200%) controls center zoom of image | Not a pointer loupe, pinch/pan, image enhancement or resolution increase |
| FX-121 | .fx58-measure | Visually annotated object dimensions | All demo numbers are fictional and geometry is not scaled to mm |
| FX-122 | .fx58-surface-proof | Matte/glaze procedural visual pair with labels | Not physically accurate materials, measured colorimetry or material testing |
| FX-123 | .fx58-sleeve | CSS faux-three-sided packaging sleeve illustration | Not a real die-line, print specification or printable box template |

Source: [object-display.css](object-display.css). To use FX-120 include the small opt-in [zoom.js](zoom.js) after its semantic HTML. The script operates only on data-fx58-zoom roots, updates the range output and a local CSS custom property; the native range stays keyboard operable. Its preview starts at 100% before JavaScript loads.

Independent minimal HTML snippets, all six families and image references are in [the material gallery](../../../playground/object-studies-v058/index.html). Extract only one class family, its matching semantic HTML and optional zoom helper. Four independent transparent SVG illustrations are in [graphics/v058](../../../graphics/v058/README.md).

**Provenance and caution:** every product name is fictional; images are hand-authored SVG concepts; dimensional labels are invented; the finish/paper/material effects are graphical approximations. No external fonts, images, CDN, data sources or third-party source code. No global theme styles, dependencies or React package exports. Check the target host's mobile display, actual accessibility, labels, user content and localized overflow before production use. Source/structure checks are not equivalent to real browser, contrast or screen-reader audits.
