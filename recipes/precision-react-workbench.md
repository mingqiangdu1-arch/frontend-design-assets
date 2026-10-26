# PR-008 · Precision Dark React Workbench

**Usage:** professional internal tools for specialists handling many operational records. The scene is intentionally distinct from promotional pages, reading-first products and consumer habit apps.

## Layout

1. Utility header with brand, current space and command launcher.
2. Compact workspace navigation, contextual search and status filters.
3. Three concise metric panels for scanning progress.
4. Issue list with clear selected state and keyboard-activatable native buttons.
5. Inspector with existing Tabs, owner summary, status actions and honest feedback/undo.
6. At <=1180px, inspector becomes a dismissible overlay rather than compressing the list into unreadable columns.

## Verified implementation boundary

- [React source](../playground/precision-workbench/src/main.tsx) imports **11 actual React components** from `packages/ui/src/index.tsx`.
- [Scoped Precision Dark tokens](../styles/precision-dark/tokens.css) provide the visual language.
- [Behavior model](../playground/precision-workbench/src/model.ts) has immutable filter/update/rollback functions; all data is local.
- [Dedicated QA](../tests/browser/precision-workbench.spec.mjs) runs on port 5175 with a dedicated Playwright config; screenshots at 390, 768, 1440 attached to CI.

This demonstrates component integration, not React production-readiness or the ability to automatically compose any future page. No real backend, authorization, async failures, virtualization, user data or release-level accessibility validation.
