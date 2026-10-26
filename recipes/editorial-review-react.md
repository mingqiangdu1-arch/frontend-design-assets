# PR-011 · Editorial Warm Review Room / Real React composition

Selected style: `editorial-warm`. Page ID: `TPL-007`.

Unlike the original `TPL-002` static reading library, this is an **actual Vite/React page importing the existing `packages/ui` exports** for form input, actions, badges, cards, tabs, dialog, progress, empty state, avatars and toasts.

## Distinct editorial page grammar

- Manuscript-style hero and navigational masthead, serif text hierarchy.
- Scannable story index with content category and length, not SaaS record density.
- Constrained review panel, selected story information, status controls and excerpt preview.
- Real controlled React state for search, status filters, local changes and one-step Undo.
- Native dialog reading experience.

## Verification

```sh
npm run typecheck:ui
npm run build:editorial-react
npm run test:editorial-react:browser
```

Screenshots at 390/768/1440 are capture-only until signed visual baselines exist. Publishing, permissions, server persistence, concurrent editing, real activity history and browser accessibility validation remain unimplemented.
