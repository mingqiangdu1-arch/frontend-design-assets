# Editorial Warm · Second controlled Unslop/Hallmark pilot

Date: 2026-11-05 · **Prototype PR, not main/production**.

## Baseline and differentiated purpose

- Page: `TPL-007`, `playground/editorial-review`, editorial-warm.
- Baseline: `main@eb758304190538f0e88fd22e299c65b675468296`.
- Different from the first Precision Dark pilot: the selected product's job is **editorial reading, selection, review and local decision-making**; the intended style is airy, serif-led and genuinely editorial.
- Preserve: four fictional articles, article copy/hero, browsing/search/status filter, selected review inspector, preview Dialog, keyboard controls, local update + Undo and explicit no-publishing disclaimer. Do not copy the developer console's sidebar or dense list shell.

## Context-based source review (Unslop-informed)

Observed source issues: status filter labels at **10px** and 35px min target, small metadata near 9–11px, no keyboard skip link across header navigation. These affect usability and high-frequency scanning more than the presence of serif italics, uppercase publication metadata or atmospheric whitespace. The latter are intentional editorial craft and **not universal anti-slop targets**.

## Changes

- Increase filter labels 10→12px and targets 35→44px; improve clearly secondary text hierarchy without resizing the serif headlines or changing layout structure.
- Add a focus-visible, keyboard-first jump link to the actual story directory; make its section programmatically focusable. Existing header navigation remains.
- Fix literal Markdown syntax rendered as `**不复用**` inside JSX body copy.
- Add Playwright computed-style checks across 390/768/1440px, keyboard skip-link operation and preservation of serif/actual body copy.
- No third-party Skill installed in the product, no invented images or claim of external agent running.

## Reusable evidence: independent upstream checker, optional semantics

The repository adds original `scripts/report-design-audit.mjs` plus focused tests. It consumes **actual upstream Hallmark JSON findings**, counts each grade and gate delta independently of the upstream summary, produces a Markdown audit table, and refuses missing/malformed JSON. It **does not** classify aesthetic preferences as WCAG defects, emit a product quality score or silently approve changes.

A dedicated opt-in GitHub Action runs pinned official [Nutlope/hallmark](https://github.com/Nutlope/hallmark) `sloplint.mjs` `--genre editorial --json` against baseline and changed editorial source. Both tool exit codes are advisory; report parsing failure fails the workflow. Pinned upstream SHA: `52328cb3129135499e4e178d4864ee90029dea2b`.

Aesthetic lint findings remain subject to project-specific human review. Hallmark's genre selector is not an accessibility standard; Unslop is used as review guidance, **not an automatically executed AI Agent**.


## Real second-pilot results

- Baseline **72 findings** (17 FAIL, 53 REFLEX, 2 WARN); first candidate **73** (17 FAIL, 54 REFLEX, 2 WARN).
- Identified the only newly introduced flag: Hallmark **24b / REFLEX**, because the new keyboard skip link had 10px vertical padding outside Hallmark's preferred 4px scale.
- Replaced the link padding with 12px and aligned left inset to 16px, both consistent with this page's own spacing scheme. [Final Hallmark comparison](https://github.com/mingqiangdu1-arch/frontend-design-assets/actions/runs/41948868445) now shows **72 vs 72**, with no changed gate counts; this is **not** a 0-defect design result.
- Both versions still trigger aesthetic house rules, which are not automatically relevant to an editorial publication. The actual usability difference is captured by explicit font/target/skip-link browser tests and screenshots, not the unchanged lint total.
- [Draft PR #2](https://github.com/mingqiangdu1-arch/frontend-design-assets/pull/2) is intentionally separate from [Precision Dark Draft PR #1](https://github.com/mingqiangdu1-arch/frontend-design-assets/pull/1), making the two genre pilots independently reviewable.

## Verification contract

- [x] Typecheck/build, existing search/filter/preview/status + Undo/browser screenshots — [Editorial React CI](https://github.com/mingqiangdu1-arch/frontend-design-assets/actions/runs/41948860839)
- [x] New keyboard skip & font/target tests across 390/768/1440px — included in the same passing Chromium run
- [x] Registry/unit tests including JSON report parser — [registry/test CI](https://github.com/mingqiangdu1-arch/frontend-design-assets/actions/runs/41948868306)
- [x] Actual Hallmark baseline-to-candidate run, artifact and delta — [advisory CI run](https://github.com/mingqiangdu1-arch/frontend-design-assets/actions/runs/41948868445)
- [x] Reviewed generated 390px and 1440px Chromium screenshots, with side-by-side 390px baseline/candidate comparison. No obvious cropping; changes are concentrated in filter/readability affordances. This is **not** a formally approved visual baseline.
- [ ] Formal approved screenshots, Safari/Firefox, screen reader and physical-touch validation remain outside scope

Do not merge solely because an advisory lint count decreases. If verification passes, consider this a second **cross-genre case**, not a generic global CSS recipe.

Related: [first Precision Dark pilot](https://github.com/mingqiangdu1-arch/frontend-design-assets/pull/1), [contextual design review](../../recipes/contextual-design-review.md).
