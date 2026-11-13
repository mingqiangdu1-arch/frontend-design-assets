---
name: frontend-quality-audit
description: Evaluate frontend UI implementation or design evidence for responsive behavior, accessibility, interaction state completeness, visual integrity, performance, reuse boundary and licensing. Use when asked to review, critique, validate or compare a screenshot, live page, component, asset, PR or interaction before reuse or release.
---
# Frontend quality audit / 前端审查

## Goal
Report **evidence-backed defects and risks**, not a generic good/bad aesthetic score. Explicitly distinguish source inspection, static image, browser exercise and production evidence.

## Process
1. Define audit target (single component, page, route, design screenshot, PR), intended users and devices. Confirm what is actually accessible; do not pretend to operate a browser when no browser is available.
2. Record source or visual evidence first. Open the exact implementation or attachment and list scope. Existing asset previews may inform visual intent, not prove host behavior.
3. Review proportionately across:
   - **Structure**: hierarchy, information density, text wrapping, headings, reading and focus order.
   - **Responsive**: narrow viewport, overflow/clipping, touch spacing, critical controls.
   - **Interaction**: idle/loading/error/empty/disabled states, keyboard, touch, focus, undo and clear feedback.
   - **Accessibility**: semantic controls, labels, contrast, focus visibility, alt/decorative images, reduced motion.
   - **Technical**: scoped styles, unstable dependencies, render/pointer performance, real data and backend ownership.
   - **Provenance**: license, attribution and whether source is original versus research-only.
4. Classify each issue as **observed** or **risk to verify**. Give severity by effect on task: blocker, major, minor; avoid invented Lighthouse, WCAG conformance or runtime scores.
5. Give the **smallest practical fix** and how to validate it. Prefer a clear changed-state example over “make it more modern”.
6. When only a screenshot is available, assess visible layout and contrast concerns, explicitly mark keyboard, semantics and loading flows unverified.
7. Return a compact issue table plus short pass/fail/unknown summary, not a lengthy certification claim.

Use [evidence and severity matrix](references/review-matrix.md).

## Boundaries
Source presence ≠ executable; smoke test ≠ production approval; a static image cannot confirm interactions. Never edit the target unless requested.
