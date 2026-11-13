---
name: frontend-interaction-contract
description: Specify robust frontend interaction behavior before or alongside implementation, including states, keyboard/touch input, transitions, undo, asynchronous failure, reduced motion and accessible alternatives. Use for menus, dialogs, drag-and-drop, editable grids, workflows, selectors, microinteractions, or agent-generated UI behavior review.
---
# Frontend interaction contract / 交互契约

## Scope
Capture the **actual behavior** of a reusable interaction. A beautiful screenshot or CSS animation is not a complete interaction design.

## Method
1. Define user intent, triggering element, input methods (pointer, keyboard, touch), controlled data, owner of persistence and any permission boundary.
2. List **real states** and transitions: idle, focused, active, pending, success, empty, error, cancelled/undoable, disabled. Skip irrelevant states rather than inventing fake backend behavior.
3. For each transition specify trigger, guard, feedback, resulting state, reversible action and observable semantics. Require meaningful labels, focus management and reduced-motion fallback.
4. Find the closest existing contract or original:
   - `UI-060` before/after control: `packages/ui/src/cross-context.tsx`.
   - `IP-060` immutable visual-block ordering: `playground/visual-editor-v039/reorder-model.mjs`.
   - `IP-057..059` agent status and approval specimens: `playground/agent-interactions-v038/`.
   - `FX-096` native scroll-snap reel: `styles/primitives/v053/composition-atoms.css`.
   - Additional original contracts in [interaction docs](../../../docs/interactions/).
5. Distinguish **visual effect** from **logical event**. E.g. a hover treatment cannot be the sole way to discover an action; a simulated progress bar cannot imply completed server work.
6. State boundary honestly: no server writes, auth, sync or durable undo unless a real implementation is present in the destination.
7. Produce a **state-transition table** plus keyboard/touch alternatives, error behavior and 2–3 meaningful validation scenarios.

Reference: [minimal state contract](references/state-contract.md).

## Do not
- Copy arbitrary third-party interaction code without license review.
- Infer keyboard, screen-reader, touch or persistence success from a static demo.
- Introduce global event listeners or hardcoded host app state into a material snippet.
