# Visual Editor Interaction Lab · V0.39

**Three original standalone, executable interaction references.** The shared specimen is deliberately *not* a product page builder, third-party block installer, production collaboration service, published React package or Agent execution environment.

| New ID | Original source model | Standalone capability | Prior research and distinct scope |
| --- | --- | --- | --- |
| IP-060 | [reorder-model.mjs](reorder-model.mjs) | Immutable block reorder before/after a target, keyboard up/down fallback | IP-021 cross-lane transfer + IP-050 registry mapping: here it is **flat document blocks** with stable IDs |
| IP-061 | [block-schema.mjs](block-schema.mjs) | Whitelisted types/props, typed validation, atomic property patch, bounded JSON import/export | REF-094/099 editor research: here a **minimal safe local schema** is actually executable |
| IP-062 | [editor-history.mjs](editor-history.mjs) | Selection independent of undo, transactional edit/reorder, bounded undo/redo and redo invalidation | IP-040 remote-vs-local transactions: here **only local** undo history has an executable example |

## Preview and usage

From repo root:
```sh
npm run dev:catalog
```
Open http://127.0.0.1:8009/playground/visual-editor-v039/.

Drag a block before another, or use its accessible Up/Down buttons. Select a block to edit only schema-known fields, save atomically, undo/redo and inspect a read-only JSON export. The default blocks are original sample text. Nothing is published, persisted, uploaded, installed or sent to a third-party URL.

## Verification

```sh
node --test tests/visual-editor-v039.test.mjs
npm run test:registry
npm run test:browser
```

Node tests cover unique block identities, strict props, document bounds, immutable drag/keyboard reordering, no-op history, bounded undo/redo, fork invalidation, JSON roundtrip, literal markup safety and malformed input rejection. Chromium browser tests cover real keyboard-compatible action buttons, HTML5 drag/drop, inspector saving, undo, invalid title, literal text escaping, JSON and 390px viewport. The interactive specimen is original DOM/CSS; UI data is assigned via textContent, never interpreted as HTML.

## Technical limitations / portable reuse

- Flat blocks only; no nested drop zones, reusable React components, contenteditable rich text, arbitrary HTML/JSX, remote design tokens, user accounts or saving to disk.
- HTML5 drag/drop is a desktop demonstration. Up/Down buttons are the keyboard and touch alternative. A true mobile drag gesture and assistive-technology audit are not provided.
- Schema/props are deliberately constrained to three fixture types, 1–12 blocks and short text, enums or booleans. Import/export is local function access, not a browser file upload, backend or compatible shadcn Registry.
- Only source modules and this independent specimen are copied into target apps after application-specific adaptation and testing. No new React public export, package, global style or default theme is introduced.
- Local undo history excludes selection-only changes, stores at most 30 transactions and drops redo on a divergent new edit. It cannot undo remote operations or recover after tab closure.

Related machine registry: [visual-editor-v039.json](../../registry/visual-editor-v039.json); [full research note](../../docs/research/visual-editor-v039.md).