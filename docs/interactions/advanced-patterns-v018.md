# V0.18 · Six independent advanced interaction references

**Status:** IP-025/027/029/030 = analyzed specifications only; IP-026/028 = original headless Node reference models with deterministic tests, **not production UI widgets**. No browser demonstration, integration with React `packages/ui`, target backend, product API or real-media source is present.

These six contracts complement, rather than duplicate, V0.14 spatial canvas / radial menu / before-after scrubber, V0.15 cross-container drag / FLIP, and V0.16 multi-track timeline / scroll narrative.

## IP-025 · Hierarchical treegrid with keyboard navigation and controlled row expansion

**Use:** file explorer with editable columns, dataset hierarchy, organization/asset tree or mail threads with cell-level actions. If cells are not interactive, prefer simpler `tree` or nested list semantics.

- **State:** normalized `nodes={id,parentId,hasChildren,expanded,disabled,...}`; selected ID(s), active row/cell, editing state and persisted expansion preference are separate. Invalid parent references and cycles are rejected before rendering.
- **Entry:** one announced navigation model is chosen, e.g. row-first with a single roving Tab stop: Up/Down move across **visible rows**, Right expands or enters child, Left collapses or returns to parent, Home/End reach visible boundaries. Enter activates the row action or enters cell edit explicitly.
- **Transition:** expanding reveals descendants with correct hierarchical order; collapsed descendants are removed from keyboard navigation, not from the data model. Selection and focus remain distinct; avoid moving focus behind a collapsed branch. When focus would disappear, return it to the collapsing parent.
- **Edit/failure:** Escape cancels edits without committing; Enter saves only validated values. Async mutations need loading, error, retry and revert with server authorization. Virtualized rows must expose accurate row index/count to assistive technology.
- **Fallback:** semantic nested list and explicit expand/inspect buttons on touch screens. Do not promise screen reader support from a visual `aria-expanded` attribute alone.
- **Evaluate:** tree depth 4+, collapsed active child, keyboard only, pending save, duplicate/invalid nodes, 200% zoom, screen reader announcement.

**Source:** W3C [Treegrid APG](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/), which describes multiple possible keyboard models. This proposed row-first convention is **our choice**, not a universal built-in browser behavior.

## IP-026 · Cross-linked brushing between chart/map and result list

**Use:** exploratory data stories, research plots, geographic summaries and dashboards where a user needs the **same selected observations** across multiple views. Unlike ordinary table filters, one shared selection state coordinates several independently rendered surfaces.

- **State contract:** stable unique record IDs, separately chosen visible IDs per view, persistent selected IDs and a separate focused ID. Store IDs, not pixel positions or selection rectangles. Brush geometry is the **view adapter's** responsibility.
- **Operations:** `replace`, `add`, `remove`, `toggle` selection; incoming IDs validated against the known universe. A new replace brush intentionally clears previous cross-filter selections; an additive operation must not erase hidden selected IDs.
- **After:** chart highlights, map symbols, list badges and grouped selected counts update from the same controlled state. If only some selected records are currently visible, show a clear "N selected, M outside this view" status.
- **Keyboard/fallback:** list of labeled records with checkboxes or selection buttons and selection-clear controls; a spatial brush alone is never mandatory. A chart/table alternative preserves exact values, categories and source notes.
- **Failure:** empty selection, new dataset invalidating old IDs, zero-result filter, contradictory chart scales, stale async fetch, potentially huge selections and selection leakage between tenants require explicit handling in the target product.
- **Model:** `interactions/research/linked-brush.mjs` exports `createLinkedState`, `applyLinkedBrush`, `projectLinkedSelection`, `summarizeLinkedGroups`. **This does not draw a chart or coordinate pointers.**

**Source direction:** [Observable Plot](https://github.com/observablehq/plot) provides data visualization building blocks but does not itself establish these app-specific selection semantics.

## IP-027 · Source-linked annotation pins with collision-aware detail overlay

**Use:** document review, creative proofs, evidence dashboards and museum annotations. Distinct from a continuous before-after slider (IP-020).

- **State:** annotations `{id,anchorId,authorOrType,content,revision,status}`; anchors identify a semantic source unit, not only screen coordinates. Selected annotation ID and overlay position are derived state.
- **Trigger:** activating a numbered pin or item in a **parallel annotation index** selects the same annotation, scrolls to its anchored source without trapping the document, and opens a labeled `dialog` / nonmodal popover as appropriate.
- **Placement:** choose above/below/side with viewport collision handling and safe gaps; constrain to the scroll container. Recompute when zoom/layout changes, do not let hidden overflow mask focus.
- **Failure/recovery:** missing anchor becomes an "orphan note" in the index; failed autosave shows Retry/Discard. Closing returns focus to the originating pin or list item; don't rely on DOM nodes that were replaced.
- **Touch/mobile:** use the same indexed annotation list and a side sheet; avoid dozens of tiny overlapping hotspots. Decorative connector lines are not required to understand ownership.
- **Security:** annotation content is untrusted data; sanitize render output, enforce authorization and avoid exposing private notes across collaborators.

## IP-028 · Two-handle constrained parameter band

**Use:** color adjustment, tempo bounds, numeric eligibility/price filters, confidence interval editing and industrial/scientific simulations. Distinct from IP-020's **single** comparison scrubber.

- **State:** `{min,max,step,minSpan,values:[lower,upper]}`. Step lattice, bound order and minimum span are invariants. Define measurement units outside the numeric model.
- **Trigger:** low/high handle pointer move or keyboard Left/Right, Shift for a larger step; two labeled numeric inputs provide **equal control**. Keyboard input is authoritative and must preserve the same constraints.
- **Change:** snapping and clamping occur before commitment; handles never cross, the opposite handle stays put. The user sees the actual accepted number and any clamping explanation.
- **Failure:** reject invalid config, unaligned values, NaN, zero span when forbidden, out-of-bounds range, impossible minSpan and server-save failures.
- **Model:** `interactions/research/constraint-range.mjs` exports `validateRangeConfig`, `validateRange`, `moveRangeHandle`, `stepRangeHandle`; deterministic Node tests only. **No slider DOM, pointer capture, accessible handles or backend persistence is supplied.**
- **Fallback:** explicit Low/High number inputs with native labels and units; test fractional steps, locale decimal separators, zoom and assistive technology with actual UI.

## IP-029 · Branching decision/story graph with reversible navigation

**Use:** interactive museum story, educational decision scenario, game narrative or product onboarding where users need to explore consequences. Unlike IP-024's linear chapters, the path is a **directed graph**.

- **Data:** node IDs, labeled choice edges, optional irreversible checkpoints, authored prose and completion states. Validate that edges point to existing nodes; detect cycles and decide explicitly whether revisiting a node is permitted.
- **State:** current node, full choice path, backtrack stack, checkpoint version and optional save/sync status. Rewind restores the previous choice and removes downstream provisional decisions; do not pretend a real server-side action can be reversed.
- **Interaction:** choose a labeled option, read its consequences, use Back/Breadcrumb to revisit, compare two branches via a textual summary. Never auto-advance or simulate real user agreement.
- **Accessibility:** an ordered text outline of all reachable options and current position, headings and explicit back buttons; avoid hidden unlabeled graph nodes.
- **Boundary:** this is narrative navigation, not an approval engine, policy decision maker or secure workflow executor.

## IP-030 · Tactile rotary parameter control with numeric parity

**Use:** optional expressive audio/color/control panels, especially the Tactile Instrument study. A dial is a **metaphor**: it must not replace precision or readable value labels.

- **State:** real numeric `min/max/step/value`, units, a calibrated angle range and optional detents. Value → angle is derived by clamp/scale; rendering angle must never be authoritative state.
- **Pointer:** drag vertically/horizontally or rotate via intentional hit target; capture/cancel returns to last committed value and avoids sudden value jumps. Do not rely on endless circular gestures on mobile.
- **Keyboard:** arrow keys ±step, Shift±large step, Home/End limits, numeric text field and Reset. All modifiers must be visible in help text; provide correct slider semantics only after implementing the actual keyboard pattern.
- **Fallback:** same labeled range input or number input, including min/max/units, always available on coarse pointer and assistive technology.
- **Avoid:** haptic/audio claims without hardware/API; continuous blinking, minuscule labels, dial rotation that hides the actual number, uncontrolled per-frame saves.
- **Implementation:** research specification only. The range model in IP-028 may inform step validation, but **no dial widget or shared React API is implemented**.

## Reuse and quality rules

- First read the target input/device, data model, and actual API/permission boundary; then pick a **behavior** independent of visual style.
- Keep input source, selected data, focus, and pending saves separate. Pointer capture cancellation is not a save event.
- Cite real value/domain provenance for charts/maps. Screen reader support must be measured on a destination app, not inferred from this spec.
- W3C APG and MDN are technical references; **no external code was installed or copied**.
