# Commerce Atelier product collection — original runnable demonstration

Independent static page for **Style DT-006** and **Blueprint TPL-006**.

Run from the repository root:

    npm run dev:catalog

Open http://127.0.0.1:8009/playground/commerce-atelier/ .

The full example intentionally differs from internal SaaS dashboards, Editorial Warm's writing-first pages and Bold Grid's promotional storytelling. The interface uses original CSS geometry for six fictitious everyday products. No stock photos, borrowed brand trademarks, online payments or actual SKUs.

## Locally working interactions

- Multiple category and material checkboxes; combined filter semantics.
- Explicit selected-filter chips, search, empty results and price sorting.
- Bookmark/wishlist states and keyboard-operable modal quick view.
- Clearly disabled unavailable variants.
- Add available variants to a **simulated-only local bag**, with quantity totals and no checkout or persistence.
- Responsive 390, 768, 1440 px smoke/screenshots.

Run tests:

    node --test tests/commerce-atelier.test.mjs
    npm run test:browser

Prototype QA does not certify real conversion performance, image metadata, screen-reader compatibility, cross-browser behavior, taxes/shipping, inventory or transaction flows. Before real ecommerce integration, validate media rights, inventory/variant contracts, accessibility and checkout separately.
