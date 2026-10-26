# Cross-style interaction patterns V0.7

Reusable **behavior specifications**, not automatically compatible production components. [Interactive Lab](../../playground/interaction-lab/index.html) and [state tests](../../tests/interaction-lab.test.mjs).

## IP-009 — Reversible optimistic archive

Click Archive → remove record from visible list → persistent status with Undo. Undo returns the last record to original position; repeated Undo cannot duplicate it. Dismiss drops the snapshot. This demo handles ONE latest operation, with no time window. Real API integration must define concurrency, server failure/reconciliation, undo expiry and focus after removing the button (not implemented here). Live status is announced with role=status.

## IP-010 — Guided multi-step flow

Name → visual direction → confirmation. Step validation prevents invalid forward navigation; previous values survive Back. Final step says demo complete, not saved to server. Real product requires dirty-state protection, error summary and resume behavior.

## IP-011 — Button-based accessible reorder

Each row is a normal ordered-list item with Move up/Move down BUTTONS. Disabled at boundaries. Focus returns to an available button for moved item, with live updated position. Do not label this as draggable sort or incorrectly put interactive buttons inside an ARIA listbox option.

[W3C WAI-ARIA listbox guidance](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) explains why listbox options do not provide full semantics for interactive descendants, and [rearrangeable examples](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-rearrangeable/) explain focus and announcement considerations.

## IP-012 — Adjustable split via native range

Labeled range input (25–75% in increments of 5) controls a 2-panel CSS grid. Reset sets 50% and returns focus to range input. This is a simple responsive width control, **not an ARIA draggable separator widget**. It avoids mouse-only behavior.

## QA and scope

Pure logic and Chromium smoke only; real collaboration, persistence, timeout queues, touch, multiple browsers and screen readers remain unverified. Behavior can migrate to other Style Profiles only after deliberate matching of user/device needs.
