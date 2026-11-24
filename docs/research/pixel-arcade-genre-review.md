# Pixel Arcade · Intentional genre protection during design review

Date: 2026-11-05 · Third controlled experiment, separate branch / draft PR. Not a production deployment.

## Why this counterexample matters

The first two design reviews used **Precision Dark** (developer workbench) and **Editorial Warm** (reading/review). Pixel Arcade is a deliberately expressive game-like scene in the original four-scene Creative Style Lab, **not** an interchangeable React theme. It should not be converted into generic minimal SaaS, editorial typography or flat marketing aesthetics.

Original baseline: `main@eb758304190538f0e88fd22e299c65b675468296`.

### Protected intentional expression

- Square cartridge-style chapter buttons and chunky 3–4px frames; stepped shadows are an intentional 8-bit cue.
- Original CSS illustration: clipped sun and terrain, pictorial gradient inside a world scene.
- Monospace block display, short uppercase in-world labels, numerical XP/stage HUD and stylized accent.
- All four independent scenes and their URL deep links must keep working. Signal Noir, Paper Rebellion and Aether Orbit are not targets.

### Usability problems that are not exceptions

The original Pixel quest subtitle was 11px, key HUD labels were around 11px and narrative text 13px. Color-shifted selected buttons already use `aria-pressed` and a live `role=status`, but their selected state deserved a more distinct non-color visual signal.

Implemented an explicitly scoped intervention:

- Quest metadata 11→12px; contextual HUD labels 11→12px; paragraph 13→14px; small stat label 10→11px.
- Chapter buttons min-height 104→112px; pressed chapter adds a visible **▸** mark after the label while retaining original feedback and `aria-pressed`.
- No modifications to game fixtures, local XP/stage logic, illustration shapes, tokens, other visual styles, or imaginary versus real-data disclaimers.
- Chromium Playwright tests measure pixel readability at 390/768/1440 and ensure that the original game-art gradient, clipped sun, monospace display, square controls and thick frames remain intact. An additional keyboard test verifies focus, selected marker and status change.

## Real upstream checker + reasoned interpretation

The optional [Hallmark](https://github.com/Nutlope/hallmark) source-only static audit runs pinned official `sloplint.mjs` from commit `52328cb3129135499e4e178d4864ee90029dea2b` with `--genre playful`. Both baseline and candidate are scanned with the same command against `playground/creative-style-lab/index.html` and `lab.css`.

**Important scope warning:** these are shared multi-scene files. Raw lint counts include all FOUR different styles and global lab chrome; they are not a Pixel-only defect count and cannot alone judge this project's art direction.

The new first-party `scripts/triage-genre-audit.mjs` reads original JSON, retains **every upstream finding**, and annotates only exact matches for file + gate + evidence from `registry/genre-review-decisions.json`. An annotation is a **human review candidate** and cannot hide, waive, downgrade or approve any FAIL. Preserved original source, image and interaction requirements are independently verified through browser tests. This is an Unslop-informed manual review, **not** automatic execution of the upstream Unslop Agent.

## Acceptance

- Run unit/registry/contrast checks and real four-scene Chromium functional tests.
- Inspect actual Pixel Arcade screenshots at 390/768/1440. Original images are CSS-generated; no external stock, font or image licensing burden added.
- Confirm visible quest selection independent of color, focus and dynamic status. Preserve all other scene interactions and no horizontal overflow.
- Keep Hallmark raw output, contextual review and CI logs as advisory evidence. Do not equate fewer/larger rule counts with better/worse style.
- **Not completed:** formal screenshot goldens, screen-reader check, Safari/Firefox, physical touch performance and real application integration.

Related: [Unslop/Hallmark reference](unslop-hallmark.md), [current review policy](../quality/visual-review.md), [Pixel Arcade style DNA](../../styles/pixel-arcade/README.md).


## Actual execution evidence · 2026-11-05

- Draft PR #3 (historical private pull/3) preserves an independently reviewable experiment. `main` remains unchanged.
- Real pinned upstream Hallmark audit + raw JSON artifacts (historical private actions/runs/41977358623): baseline and candidate each **240 findings**: 141 FAIL, 88 REFLEX, 11 WARN. Both upstream lint exits nonzero; the advisory Action succeeded by generating a valid comparison, **not by passing all Hallmark style rules**.
- Narrow contextual annotations match exactly **2 findings out of 240** (gate 67, uppercase in-world HUD at `index.html:21–22`); each remains a raw FAIL, and other categories of findings remain unfiltered.
- Full four-scene Chromium browser smoke (historical private actions/runs/41977358598) passed, including the new Pixel-specific art, computed-font, selected-state and keyboard checks at 390/768/1440.
- Registry and deterministic unit tests (historical private actions/runs/41977358622) passed; proposed new asset `PR-016` yields 122 assets **only on the experiment branch**, not `main`.
- Downloaded the previously approved-as-capture-only main-branch and candidate **CI screenshots** and manually inspected Pixel Arcade at 390px and 1440px. Pixel landscape, square frames, typesetting and original page identity remain intact; text is somewhat larger, and active quest receives the visible arrow. A slight increase in page height is expected due to the changed text/controls. No obvious newly clipped content observed. These are **unapproved before/after captures**, not a reviewer-signed golden.
- Remaining boundaries: the original scan spans a shared four-scene source, **not a Pixel-only defect report**; 240 counts are not a quality metric. Read raw findings before assigning severity; no claim of 0 accessibility faults, Safari/Firefox compliance, physical touch, or real game-server integration.

**Decision:** keep explicit design intent and task-based browser checks as first-class evidence. Candidate aesthetic exemptions must remain visible and narrow, not global lint suppression. Future merging should respect the independently pending `PR-015` in the Editorial Warm draft PR.
