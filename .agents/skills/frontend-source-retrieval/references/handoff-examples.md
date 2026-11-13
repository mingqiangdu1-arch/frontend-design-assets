# Source handoff examples / 可追踪交接

## Exact source vs inspiration

| User request | Find first | Accurate wording | Never claim |
| --- | --- | --- | --- |
| 可操作图片前后比较 | `UI-060` in `registry/components.json`; `packages/ui/src/cross-context.tsx` | Real React reference export; inspect props and host events | Browser-verified cross-app behavior |
| 简洁图注作品拼版 | `FX-097`; `styles/primitives/v053/composition-atoms.css` | Original source CSS + semantic figure markup from local specimen | Installed React gallery |
| 创作过程插画 | `VG-088`; `graphics/v053/editorial/studio-pinboard.svg` | Original static editable vector illustration | Editable moodboard |
| 区块拖拽排序 | `IP-060`; `playground/visual-editor-v039/reorder-model.mjs` | Original prototype-level headless behavior model | Working production page editor |
| 外部浮岛动效 | `REF-124`; `docs/research/material-expansion-v043.md` | Third-party research dossier with source link | Locally installed or licensed code |

## Copyable response

**Intent**: short portfolio gallery with labeled visuals.

- **A / FX-097** — precise source: `styles/primitives/v053/composition-atoms.css` (class `.fx53-caption-mosaic`), specimen: `playground/composition-v053/index.html`. Responsive grid of semantic figures. Requires real media/alt text; original contains generated CSS shapes rather than user photos. No React export.
- **B / FX-096** — same source file (class `.fx53-media-reel`). Keyboard-focusable, touch-scrollable horizontal strip; not JS carousel with controls. Better when the user's assets need sequential browsing.
- **Choice**: choose A for overview, B for sequential reading. Do not combine without a task-specific reason.
- **Verification**: presence of repo files and CSS source only; actual target viewport and keyboard testing remain pending.

## No-hit response
When no precise match exists: give search terms tried, closest related asset (if meaningful), clear “not present/confirmed in inspected index,” and the minimal new original needed. Do not synthesize a fake ID.
