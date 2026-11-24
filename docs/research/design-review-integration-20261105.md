# Frontend Design Assets · Four controlled pilots integrated into main (research prototypes)

Date: 2026-11-05. **Merged to `main` as research prototypes via PR #5 (historical private pull/5) (squash commit `2f0048f5832f1df1e7df2b82d02c59b3daabf420`).** Not production-ready; formal signed visual baselines and multi-browser/assistive-device QA remain pending.

## Origin and frozen inputs

All four Draft PRs were independently based on `main@eb758304190538f0e88fd22e299c65b675468296`. Preserve source files from their exact branch heads:

| Origin | Source commit | Scope | Proposed assets |
| --- | --- | --- | --- |
| PR #1 (historical private pull/1) | `e4d33ca39eb14493d9ba8084dffb5612fb298fd9` | Precision Dark / source-only Hallmark advisory and browser QA | No new IDs |
| PR #2 (historical private pull/2) | `e666e7553e0365edc1066bb61afefafe7d6568b1` | Editorial Warm / evidence reporter, keyboard skip, browser QA | PR-015 |
| PR #3 (historical private pull/3) | `f423b8c8523648a5d83a9e8d20f11f4829455338` | Pixel Arcade / genre protection, annotation, browser QA | PR-016 |
| PR #4 (historical private pull/4) | `2d80ff0665cba0dde43f7c8bed46f9837bde2d29` | Advanced Interaction Lab (canvas/radial/scrubber) | IP-018, IP-019, IP-020, KIT-014 |

## Conflict-resolution policy

- Only three relative paths overlapped: `CHANGELOG.md`, `AGENTS.md`, `registry/assets.json`.
- **35 of the 36 non-overlapping source paths** retain their exact originating Git blob IDs. The remaining file, `.github/workflows/design-review-pilot.yml`, adds a scoped `pull_request` trigger so the original Precision Dark Hallmark audit also runs on the integrated PR. Its checker command, pin and advisory behavior remain unchanged. No UI CSS, JS, TSX or browser tests are rewritten.
- Append the four dated changelog blocks ahead of the historic log. Retain both additive agent-instruction sections.
- Merge six distinct new registry entries. Keep `defaultStyleId = null`, original style profiles and all existing asset records unchanged.
- Registry total **127** (121 original + 6); verify IDs and dependency links are distinct. Registry success is necessary, not a production claim.

## Integration validation

- [x] Registry, source checks and unit tests (merged main and integration PR CI passed)
- [x] Static Chromium smoke tests, 47 passed (integration PR; main re-ran smoke successfully)
- [x] Precision Dark React build and keyboard/browser QA
- [x] Editorial Warm React build and keyboard/browser QA
- [x] Three upstream Hallmark source-only advisory workflows, pinned scripts and unfiltered reports; their nonzero source-lint exits are not equivalent to workflow failure
- [x] Representative screenshots reviewed in individual pilots (capture-only); [ ] human-signed golden visual baseline
- [ ] Formal visual baseline signoff, Safari/Firefox, screen readers and real touch are separately pending

The original four Draft PRs were closed as **superseded by the merged PR #5 (historical private pull/5)** without separate merges; their original CI and code review remain accessible. Merging research prototypes does **not** mean they passed production accessibility, Safari/Firefox, actual touch or visual-golden signoff. Main post-merge registry/React/Chromium workflows succeeded.
