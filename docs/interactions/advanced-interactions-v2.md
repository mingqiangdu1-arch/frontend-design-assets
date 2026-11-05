# V0.15 · Advanced special interactions II — Cross-container transfer + FLIP reflow

Status: experimental; original static HTML/CSS/JS and pure-state models. Application context and style are **separate**: adapt behavior, not the demo's palette, to any future app.

## IP-021 · Cross-container pointer/keyboard transfer

**Use cases:** creative asset queues, project boards, editorial workflows, media review bins and in-browser tools with a small number of categories.

**Before:** the card has a stable ID and a current lane; local past/future history stores frozen board snapshots. The operation is not a network request.

**Pointer trigger:** begin on the explicitly labeled move handle. A small travel threshold differentiates a gesture from an accidental click. `setPointerCapture` maintains pointer stream continuity while `document.elementFromPoint` finds the drop lane underneath. Highlight the chosen lane as feedback.

**Keyboard trigger:** focus the handle; Space picks up; Left/Right selects the destination; Enter or Space commits; Escape cancels without changing the data. The same transfer can be performed using explicit neighboring-lane buttons. Do not require a spatial gesture to do essential work.

**After:** update source and destination lists immutably; announce what moved and where via `role=status`. Restore focus to the moved card's new handle. Enable Undo/Redo according to real history; a fresh transfer clears Redo.

**Cancel/failure:** `pointercancel` and invalid/same-lane drops do not commit. If a future API fails, rollback and provide retry; the current demo does not send network traffic, so it must not claim the item was saved to a server.

**Constraints:** this is a three-lane, finite in-memory proof of interaction. It does not implement item order *within* a lane, window auto-scroll, large lists, multi-user conflicts, granular permissions or accessible touch screen-reader gesture certification. Pointer drag implementation deliberately lives on the dedicated handle, so scrolling the rest of the mobile page remains possible.

**Acceptance:** pointer transfer → exact destination + undo; keyboard pickup/drop/escape; boundary buttons disabled; focus restoration; labels/live announcements; three responsive widths; no lost IDs; immutability verified by unit tests.

## IP-022 · FLIP-preserving collection sort/layout

**Use cases:** visual search results, dashboards, graphic editors, curation views and card collection browsing.

**Before:** four existing DOM elements with stable `data-id` identity and deterministic sort keys.

**Trigger:** select priority/name ordering or grid/stack presentation using proper `aria-pressed` controls.

**Transition:** measure old bounding rectangles, reparent the SAME nodes in deterministic target order, measure new rectangles, and optionally animate each node from its old displacement to the new position using Web Animations API. The DOM state must not depend on animation completion. Reordering, focus restoration, pressed states and live status happen synchronously.

**Reduced motion / browser fallback:** when `prefers-reduced-motion:reduce` or no `Element.animate`, skip FLIP and update immediately. The script cancels older animations on rapid changes, rather than leaving duplicated ghosts.

**Constraints:** translate-only FLIP avoids text stretching. It intentionally does not animate cross-route navigation, shared-element hero transitions, virtualization or large lists. Performance in Firefox/Safari and low-end devices remains unverified.

**Acceptance:** new order matches deterministic model; original DOM nodes are reused, focus is maintained, layout mode and pressed states match; no animations under reduced-motion; browser screenshots at 390/768/1440 without horizontal overflow.

## Relationship to existing assets

The first [Advanced Interaction Lab V0.14](../../playground/advanced-interactions/README.md) already has a panning/zooming canvas, responsive radial menu and comparison scrubber. The original [V0.7 Interaction Lab](../../playground/interaction-lab/README.md) has undo archive, stepper, button-based reorder and range-based split. **IP-021 differs** by transferring objects *between containers* via actual pointer stream and a keyboard pickup state machine. **IP-022 differs** by preserving node identity during live collection reflow and demonstrating progressive motion with an instant fallback.

This is a first-party implementation; no vendor code, external images, font files, analytics, authentication or back-end services are included.

## Future work (not implemented)

Real hardware touch/pen tests, screen-reader announcement evaluation, Firefox/Safari motion support, pointer auto-scroll, cross-lane index placement, true persistence/concurrency and virtualized FLIP remain pending. Never mark a prototype production-ready based solely on Chromium smoke.


## Cross-browser and accessibility regression extension

The dedicated [cross-browser acceptance matrix](../quality/advanced-interaction-acceptance-v015.md) defines scope: three desktop Playwright browser engines plus Chromium touch emulation, checking named regions and controls, state/keyboard feedback, FLIP DOM identity and reduced motion. The implementation now clears `aria-pressed` after a **same-lane no-op drop** and cancels the pickup when keyboard focus moves elsewhere. The two named interaction containers expose `role="group"` for robust accessible labelling. These are research-level structural and behavioral checks, not verified screen-reader announcements on physical devices.
