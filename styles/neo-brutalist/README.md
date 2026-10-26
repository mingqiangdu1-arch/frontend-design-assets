# DT-005 · Neo Brutalist / Bold Grid

**New independent visual study, not a theme replacement for other applications.** Useful as an optional direction for events, creative portfolios, indie consumer brands, campaigns and expressive landing pages.

## Source and design provenance

- [Webflow Web Design Lookbook – Brutalism](https://webdesignlookbook.webflow.io/) distinguishes exposed structure, strong grids, oversized grotesk typography and conspicuous edges. This is descriptive inspiration; no third-party artwork, colors, font binaries, components or implementation code are copied.

## Visual system

- Ink `#171717`, paper `#F5F1E7`, bright citrus `#D8F35D`, lilac/pink secondary panels.
- Black 2–3px structural rules, square controls, deliberately offset card shadows, big condensed/extra-bold display type.
- Graphic shapes from CSS or original vector primitives; no borrowed brand marks.
- CTA should remain clearly labeled and accessible; playful asymmetry must not hide actions or reading order.
- Heading hierarchy, contrast and focus are more important than simply adding black borders.
- No global `:root` Tokens. All values live in `[data-design-theme="neo-brutalist"]`.
- Use touch-friendly buttons with adequate hit areas and a calmer mobile layout.

## Behavior specimen

[Bold Grid Landing Lab](../../playground/bold-grid/index.html) demonstrates original product/campaign tiles, local category filter, saved-state toggle, progressive-enhancement same-document View Transitions and reduced-motion fallback. Filter uses native buttons with `aria-pressed`, and updated result count uses an aria-live status.

## Files

- [Style profile](style.json)
- [Design Token JSON](tokens.json)
- [Scoped CSS Tokens](tokens.css)
- [Browser prototype](../../playground/bold-grid/index.html)

## Known limits

Original exploratory values; no real store/catalog, licensed images, analytics, checkout, production product, screen-reader or full cross-browser validation. This style is deliberately **not** applied to the existing SaaS component gallery until a dedicated compatibility contract is built and tested.

## Asset catalog entry

[Notion DT-005 visual direction]([private-notion-link-redacted]) · [V0.7 research summary]([private-notion-link-redacted]).
