# Page Blueprints · V0.8

This is a **multi-application page template catalog**, not a single visual design system or production-ready site builder. Four separate runnable prototypes, four selected contexts and visual profiles.

| ID | Layout | Style | Demo |
| --- | --- | --- | --- |
| TPL-001 | Operational list workbench | Refined Light SaaS | [SaaS Patterns](../saas-patterns/index.html) |
| TPL-002 | Editorial reading library (new) | Editorial Warm | [Folio](editorial-library/index.html) |
| TPL-003 | Mobile daily habits (new) | Playful Pop | [Poppy](mobile-habits/index.html) |
| TPL-004 | Creative campaign landing | Neo Brutalist | [Bold Grid](../bold-grid/index.html) |
| TPL-005 | Professional workbench (real React composition) | Precision Dark | [Orbit Vite app](../precision-workbench/README.md) |

[Browsable page catalog](index.html) · [Machine template registry](../../registry/page-templates.json) · [Assembly CLI](../../docs/assembly/README.md).

## Local preview

From repository root: \`python3 -m http.server 8009 --bind 127.0.0.1\`. Navigate to \`http://127.0.0.1:8009/playground/page-blueprints/\`.

New demos have original mock content and functional local interactions. No third-party imagery, backend services, real published articles, persistent accounts, production status or broad browser certification. Reuse only after selecting a specific style/profile and reading implementation boundaries.

## React integration boundary · V0.9

TPL-005 is **different** from the previous four: it imports 11 real components from `packages/ui` and runs as a Vite React/TSX application on port 5175. The static page-gallery card links to a static [launch guide](../precision-workbench/preview.html); it must not pretend the uncompiled React HTML works on the Python server.

Run `npm run dev:workbench` for the actual demo. Integration and screenshot QA: `npm run test:workbench:browser`.

| TPL-006 | Product-first retail discovery (new) | Commerce Atelier | [Product Collection](../commerce-atelier/README.md) |

**V0.11:** TPL-006 is a sixth *standalone HTML/CSS/JS* design direction. It is not wired to the four-theme React package. It has real local filtering, availability semantics and simulated bag state but no commerce backend or checkout.
