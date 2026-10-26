# Cross-application style decision matrix · V0.5

This matrix is a **reasoned selection guide**, not a rule engine or a claim that any style is universally best. First identify user tasks, platform and content, then select candidates.

| Dimension | Refined Light SaaS | Precision Dark | Editorial Warm | Playful Pop |
| --- | --- | --- | --- | --- |
| Primary task | structured records and operational clarity | dense keyboard-driven professional workflows | reading, learning by text, writing, editorial storytelling | touch-first short tasks and feedback |
| Default structure | nav + topbar + list/details | compact workspace + command/inspector | masthead + narrow longform + optional aside | focal task card + bright reward/progress |
| Density | medium, optionally compact | compact | spacious | comfortable with oversized touch targets |
| Typographic voice | clean system sans, quiet hierarchy | system sans + restrained monospace | serif headings/body, sans controls | rounded expressive titles, sans |
| Interaction character | quick contextual drill-down, neutral feedback | keyboard command and focused selection | read, bookmark, subtle reading mode | press, choice, reward and progress |
| Strengths | scanning and data editing | concentration on complex pro tasks | continuity and legibility of narrative | motivation and immediate action clarity |
| Watch-outs | over-carded dashboards, excessive global nav | low contrast, keyboard trap, density on mobile | CJK serif rendering, long labels, narrow screens | color overload, motion discomfort, contrast |
| Typical device | desktop web | primarily desktop | responsive web | mobile-first |

## Mix only with explicit boundary

A consumer app can have an **internal operations SaaS** panel; it might intentionally use Playful Pop for public consumer journeys and Refined Light SaaS for the administration console. That does not mean importing both themes globally; isolate areas or build a bridge design spec.

## Selection checklist

- What task must the user finish within the first 30 seconds?
- Does the product prioritize scanning, deep reading, creativity, or short-task motivation?
- Pointer, touch, keyboard, assistive tech: which are first-class inputs?
- Which information must remain visible versus available on demand?
- How does a narrow viewport reorganize, rather than merely shrink, the layout?
- Choose an explicit Style Profile from `registry/styles.json`; use the [candidate finder](../quality/README.md) to shortlist assets.
- Confirm label contrast, clickable targets, focus, empty/loading/error/retry/undo and reduced-motion.
- Keep provenance and license; sources are inspiration, not approval to copy vendor visuals.

## Examples (nonbinding)

- E-commerce internal order system → Refined Light candidate.
- Power-user analytics workbench → Precision Dark candidate.
- Reader-facing essay archive → Editorial Warm candidate.
- Daily learning challenge → Playful Pop candidate.

These are examples, not constraints. A brand could choose otherwise after visual/UX research.
