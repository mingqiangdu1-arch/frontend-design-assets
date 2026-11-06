# Theme selection policy · V0.27

This is a durable guide to **selecting**, not automatically applying, a frontend design language. Its purpose is to avoid three recurring failure modes: a one-style-default bias; "all styles are just color swaps"; and false claims that static research means a drop-in React theme.

## Search/compare entrypoints

- **14-theme interactive atlas:** [Theme Atlas](../../playground/style-atlas/README.md). Abstract original thumbnails can be filtered; selected pairs load *real* existing demo pages.
- **Authoritative style list:** [styles.json](../../registry/styles.json) with exactly one record per registered style, `defaultStyleId: null`.
- **Task-to-grammar facets:** [style-facets.json](../../registry/style-facets.json), plus matching source [style-match.mjs](../../scripts/style-match.mjs) and [CLI](../../scripts/select-style.mjs).
- **Asset handoff:** [assets.json](../../registry/assets.json). Inspect `DT-001..014` for source paths, lifecycle and reuse boundaries.
- **React compatibility:** [components.json](../../registry/components.json). This is the explicit set of supported package themes, **not** the 14-theme count.

## An independent selection procedure

1. Identify the user's real task, application context, technical stack, primary device, information density and necessary behaviors; use named constraints before stylistic assumptions.
2. Query the registered context and/or bounded lexical task phrases. An explicit context is a hard constraint. No keyword match is not evidence that the design doesn't exist — inspect the catalog and consider new sources.
3. Narrow by structural layout, material, interaction and optionally device/density. If you request React source compatibility, do not return a theme that the package does not declare supported. Adaptation of standalone CSS is **a future implementation task**, not current compatibility.
4. Compare **at least two plausible candidates** where possible, using full original demos and the `dna`, `caution` and source docs. Do not replace genuine comparison with score-only recommendations.
5. Record tradeoffs, content/copy and accessibility concerns, plus target app validation gaps. Make a final choice **only after task-specific judgment**; the algorithm itself never selects one.

## Following selection: plan a real page

Once the theme is **explicitly** chosen, use [V0.28 theme-to-page handoff](../assembly/style-assembly-v028.md) or the Theme Atlas third panel to generate source-linked page architecture, interaction and acceptance requirements. A research plan must not be presented as an implemented React page.

## What a match score means

`matchPoints` = sum of weighted matches to **explicit registered fields only**. It measures neither popularity nor beauty nor empirically validated usability. No user preferences or personal profile is used. Tie-breaking is deterministic for repeatable output and has **no quality significance**.

## Example no-match cases

- `--context=media-gallery --stack=react`: may return no result because the relevant visual research styles are not wired into the existing React theme package.
- `--context=media-gallery --layout=mobile-task`: should return none because no registered style actually supports **both** constraints.
- Unrecognized `material`, `layout`, `device` or `stack`: fail with a clear error rather than ignoring the requested filter.
- Blank query and blank structural constraints: no default recommendation.

## Source and maturity boundaries

The atlas wraps older standalone demos and some share a common underlying page with explicit `?style=id` deep links. A visual miniature represents **an original abstract layout motif**, not a screenshot of that demo. Iframes present existing experiment states, which may predate newer component versions. The React library is intentionally still compatible with **four** declared themes. Trend source links do not authorize copying third-party artwork, fonts, code or official design systems.

Recheck claims during future research, and do not claim full screen-reader, browser, physical touch, visual approval or target-app integration from a smoke-test screenshot.
