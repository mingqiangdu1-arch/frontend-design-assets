# Interaction Atelier IV · V0.29 · four standalone reference interactions

**Scope: reusable original frontend interaction materials only.** This lab implements four previously **analyzed-only** behavior contracts as isolated state models and standalone HTML/CSS/JS specimens. It is **not** a business app, page generator, React component export, published UI package, API client, or persistent collaboration service.

| Existing stable ID | Reference | Source | Behaviors demonstrated | Not included |
| --- | --- | --- | --- | --- |
| **IP-025** | [Treegrid](tree-model.mjs) | WAI-ARIA treegrid row-first *chosen convention* | visible-row arrow navigation, roving focus, Right expand/child, Left collapse/parent, F2 local rename, collapse-safe focus, selection distinct from focus | virtualization, server permissions, async save, audited screen-reader interoperability |
| **IP-027** | [Semantic annotation pins](annotation-model.mjs) | original source-linked note fixture | pin and parallel index, orphan note recovery, viewport-aware above/below/side positioning, Escape/close focus return, text-only note rendering | comments API, cross-document anchor migration, authorization/sanitization server |
| **IP-029** | [Branching story graph](story-model.mjs) | original fictional prose and bounded graph | explicit labeled choices, path breadcrumb, Back/Jump restore, cycle-protected paths, reset | real approvals, irreversible server actions, save/sync or user analytics |
| **IP-030** | [Precision rotary dial](dial-model.mjs) | original numeric model | single numeric source of truth, angle derived display, vertical pointer drag, pointer cancellation rollback, native range, number, keyboard arrows/Shift/Home/End | haptics, audio, physical rotary hardware, remote autosave |

## Preview

From repo root:

```bash
npm run dev:catalog
```

Open `http://127.0.0.1:8009/playground/advanced-interactions-v4/`.

All four scenes render without external media/assets/framework dependencies. The examples are locally authored dummy data. The tree has a depth-four branch with a fifth-level child in the source tree, the annotation list deliberately contains one missing semantic anchor, the story has a deliberately cyclic cross-link that the local path model refuses, and the dial starts at 40% with 0–100% in 5% steps.

This lab is purposely **an independent gallery of materials**. It does not add a universal product layout, an AI agent or a new `packages/ui` export. Copy or adapt only the relevant model, interaction state transitions and targeted DOM styles after selecting a real project elsewhere.

## Accessibility and behavioral boundaries

- **Treegrid:** row-first keyboard model is a documented convention, not browser-native. A real interactive grid would also need tab-cell/focus/screen-reader interoperability and permission-aware edits. When row actions are not needed, prefer nested lists or an accessible tree.
- **Annotations:** pinned notes have semantic source IDs, not brittle pixel-only IDs; every note remains discoverable from the parallel index, including orphans. Overlay placement clamps to viewport, and mobile uses a broad bottom-sheet presentation. The demo renders content via `textContent`; target apps must also sanitize and authorize their own note data.
- **Story:** the local path is reversible because the demo changes **only local navigation**; no real-world decision or server transaction is undone. The graph is a fiction example and does not implement a workflow engine.
- **Dial:** the numeric value is primary and angle is visual only. A native `input[type=range]` and a native number field remain exposed. Pointer capture cancellation and Escape restore the pre-drag value, and the internal control supports slider keyboard semantics; physical mobile and assistive-tech parity still need testing.

## Verification

```bash
npm run test:unit
npm run test:browser
```

Unit tests validate tree cycles/parent references, visible-row movement and collapse focus; orphan annotation detection and collision-aware placement; graph transitions/backtracking/cycle guard; dial bounds, step, angle mapping and keyboard increments. Chromium tests cover live browser controls, keyboard entry, focus return, local edit, orphan access, story rewinds, pointer cancel and reduced-motion 390/768/1440 widths.

**Maturity:** `prototype` means an original runnable local reference with browser/unit evidence once checks pass; **not** a certified React implementation, target app acceptance, cross-browser device test or human-approved visual baseline.

Historical research source: [Advanced Patterns V0.18](../../docs/interactions/advanced-patterns-v018.md). Other independent material collections: [Atelier II](../advanced-interactions-v2/) and [Atelier III](../advanced-interactions-v3/).
