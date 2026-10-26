# IP-015 — Retail discovery facets, variants and reversible local states

**Why:** Ecommerce discovery needs multi-select faceting, visible selected conditions, explicit stock and pricing information, and predictable variant selection. This is a behavior pattern reusable separately from the Commerce Atelier theme.

## Functional behavior

1. Category OR within category, material OR within material; AND between category and material; text query additionally intersects.
2. Display selected filters as removable controls. Reset returns all products. Zero results show a clear explanatory empty state.
3. Sorting operates on a derived list and never mutates the original product catalog.
4. Product detail uses native `<dialog>` with keyboard-close and return focus. Label radio variant choices; disabled variants remain visible.
5. Wishlist and bag are local demo states. Quantity aggregates for same product+variant; total is sum of sample prices, not a real quote.
6. All purchase-adjacent feedback must clearly state **simulated**; never imply authorization, charge, reservation or stock commitment.

References: [Baymard product list](https://baymard.com/research-articles/current-state-product-list-and-filtering), [2026 product filters](https://www.shopify.com/blog/ecommerce-filters), [2026 Ecommerce UX](https://www.shopify.com/blog/ecommerce-ux).

## Still open

Real image thumbnails/zoom, per-unit pricing, consumer taxes, shipping cost breakdown, screen-reader validation, touch performance, real basket reconciliation, network and inventory/authorization. It is **not** a production checkout implementation.
