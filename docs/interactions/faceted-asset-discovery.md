# IP-014 · Faceted design asset search and handoff

Source: playground/asset-explorer (live asset browser). This interaction study combines multi-facet filtering, stage inspection, provenance, dependencies and a multi-selection review brief.

- Load the canonical registry instead of copying data into UI cards.
- Combine query, theme, type, maturity and context, with clear active result counts.
- Style agnostic assets must be opted into when filtering for one theme; do not assume code compatibility.
- On inspecting an item, focus a named heading and maintain linkable ?asset=ID.
- Use native checkboxes for reference collection and generate a reviewable Markdown manifest.
- If more than one explicit visual style is selected, warn that the assets are references, not directly composable production components.
- Copy requires a user action and has a manual text selection fallback.
- Continue to verify keyboard focus, reduced motion, responsive layout and error states.

WAI references:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum

Not a production UI framework or source rights/attribution clearance tool.
