# TPL-005 · Precision Dark React Workbench (V0.9)

The first **complete page composition that actually imports React/TypeScript components from this repository's `packages/ui/src`**. Unlike older TPL-001–004 HTML/JS prototypes, this is built by Vite and React 19 with the explicit `precision-dark` theme scope.

## Start

From repository root:

```bash
npm install
npm run dev:workbench
# open http://127.0.0.1:5175/
```

Do not open `index.html` through the Python static server: it imports uncompiled TSX. The static [preview page](preview.html) includes launch instructions.

## Actual reused components

`ThemeSurface`, `Button`, `Badge`, `Card`, `TextField`, `Tabs`, `Progress`, `Avatar`, `Toast`, `Dialog`, and `Alert` from `packages/ui/src/index.tsx`. Original page composition and data/interaction models live here.

## Features

- Independent desktop dark professional tool layout: workspace rail, compact metrics, issue list and a responsive inspector.
- In-memory search and status filtering, detail tabs, editable status and one-action undo.
- Keyboard shortcuts: Ctrl/⌘ K opens quick commands; / focuses issue search.
- Local, simulated issue content and transparent notification about non-persistence.
- Responsive desktop/narrow/mobile layout and reusable scoped design tokens.

## 2026-11-04 design review pilot

An Unslop-inspired **real readability/focus CSS improvement** and a separate pinned upstream Hallmark **advisory static audit** were proposed in a controlled PR. See [pilot scope, boundaries and verification](../../docs/research/unslop-hallmark-first-pilot.md). This is not a claim that the external Unslop agent ran or that Hallmark opinions are universally binding.

## Verification and visual evidence

```bash
npm run typecheck:ui
npm run build:workbench
npm run test:workbench:browser
```

Playwright generates screenshot artifacts at 390, 768 and 1440 px. This is **capture-and-inspect**, not approved visual baseline comparison; review the CI screenshots manually. Type checking and limited Chromium flows are not screen-reader, Safari/Firefox, touch hardware, actual product integration or production certification.

No real permissions, asynchronous API, server persistence, undo concurrency or analytics are implemented.
