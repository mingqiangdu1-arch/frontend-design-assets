# IP-016 · React UI state matrix and classification

[Interactive state matrix](../../playground/component-gallery/README.md) / `?view=matrix` is the first broad **controlled-state catalogue** for the existing four-theme React component package.

- 12 of 18 existing React exports are represented by concrete state groups; the other six exports are explicitly listed in `registry/component-states.json` rather than silently marked complete.
- Additional `STATE-REQUEST` fixture differentiates idle/loading/empty/error/success without implying network calls.
- Material to check: button loading/disabled, form `aria-invalid`, required indicators, switch role and controlled value, tab keyboard semantics, feedback roles, determinate progress, dialog Escape and explicit local toast action.
- Evidence: Playwright captures 12 screenshots (4 supported themes × 3 widths), and `scripts/visual-evidence.mjs` writes hashes to a manifest marked **unapproved**.
- Advancement: review real screenshots by a human, complete screen-reader and browser QA, and distinguish feature reference completion from production adoption.

The six style profiles are **not** identical to the four compatible UI package themes. Commerce Atelier and Neo Brutalist remain independent until separately implemented and tested.
