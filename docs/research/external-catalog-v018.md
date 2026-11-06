# V0.18 · External component & interaction references (2026-11-06)

This is a **source comparison for future asset creation**, not an installation log or a copied UI package. No third-party code, imagery, paid effects or fonts have been imported into `frontend-design-assets`.

| Ref | Source | What is worth studying | Observed public license / boundary | Decision |
| --- | --- | --- | --- | --- |
| REF-033 | [Animate UI](https://github.com/imskyleen/animate-ui) | Animated Radix/Base/React Aria primitives with state continuity and controlled motion | MIT + Commons Clause; commercial app use described, component-library resale/redistribution restricted | Reference only; do **not** bulk-import into our asset library |
| REF-034 | [Motion-Primitives](https://github.com/ibelick/motion-primitives) | Motion hierarchy, text and disclosure transitions with portable composition | MIT; retain notice if source ever imported | Good candidate for **future individual adaptation**, no copy this round |
| REF-035 | [React Bits](https://github.com/DavidHDev/react-bits) | Experimental backgrounds, text effects, CSS/JS variations, original expression | MIT + Commons Clause; free use as part of apps, **no standalone component resale/redistribution** | Reference only; avoid rehosting components as our pack |
| REF-036 | [Leva](https://github.com/pmndrs/leva) | Precision numeric, range, color and grouped parameter inputs for creator panels | MIT; project says it is under active development; verify framework/version before integration | Reference for UI-032 and IP-030, not a dependency |
| REF-037 | [W3C WAI-ARIA Treegrid APG](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) | Keyboard and row/cell behavior for hierarchical interactive data | Standards and accessibility design documentation; attribution, not a copied implementation | Behavior source for IP-025 |
| REF-038 | [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) | Focus/reading-order risks, DOM-based transitions and graceful fallbacks | API documentation; browser features depend on engine/version | Reference for optional transitions, not license to force motion |
| REF-041 | [Observable Plot](https://github.com/observablehq/plot) | Layered marks, exploration and structured graphic data | ISC; retain license notice if code reused | Possible future data visualization adapter for VS-001/IP-026 |

**Selection logic:** seek behavior or composition gaps not already covered by the 18 existing React exports and ten independent styles. For research-only references, link the upstream repo and license; if a target project later uses a dependency, confirm its then-current license, API, security posture, user experience and performance separately.

**New original studies produced here:** VS-001 Atlas Ledger, VS-002 Tactile Instrument, IP-025..030 behavior references, UI-028..032 archetypes, and two small, unit-testable pure JS models. These studies are original prose/token sketches; they are not extracted vendor designs.
