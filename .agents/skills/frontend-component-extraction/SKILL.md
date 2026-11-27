---
name: frontend-component-extraction
description: Extract reusable frontend components and interaction primitives from an authorized existing codebase into this asset library. Use when identifying, isolating, documenting or validating components from React/TSX, HTML/CSS/JS or a design-system repository; not for adapting a registered asset into a target app.
---
# Frontend component extraction / 前端转组件资产

## Purpose

Turn a useful implementation in an existing project into a bounded, searchable asset. This is the **upstream** direction: source project → asset library. For the reverse direction (library asset → target application), use [frontend-component-adaptation](../frontend-component-adaptation/SKILL.md).

Follow the [shared extraction protocol](../shared/extraction-protocol.md) before handling source code or rights.

## Workflow

1. **Define the boundary.** Identify source project, pinned revision, relevant component/screen, target consumers, expected output (React export, native CSS/HTML/JS, behavior contract, composition recipe or research note) and copying authorization. If only a URL or screenshot is supplied, do not claim access to original component source.
2. **Check duplicates first.** Read [DISCOVER](../../../DISCOVER.md), the [real React export index](../../../registry/components.json) and only relevant candidates in [assets.json](../../../registry/assets.json). When Node is available, use `node scripts/find-assets.mjs --intent="<component intent>" --type=component --limit=5 --json`. A component-type asset is not necessarily a public React export; verify its source and export map.
3. **Inventory source architecture.** Inspect package manager/version, framework, entrypoints, exports, aliases, component directories, style strategy, tests/stories, theme/provider setup and dependencies. For React, follow imports and re-exports to the actual public API. For native web, locate the smallest HTML/CSS/JS boundary. Do not read or copy the entire app when a focused path suffices.
4. **Triage candidates.** Look for coherent responsibilities: form controls, navigation, data display, overlays, editor controls, status feedback, repeated compositions or interaction primitives. Evaluate stable intent, plausible reuse, comprehensible API/state ownership, manageable dependencies/style scope, keyboard/touch/focus and meaningful states, and source/media rights. Repetition is a useful signal, not a mandatory three-use threshold. Do not abstract similar-looking elements with different business intent or promote a whole page without identifying its composition role.
5. **Map hidden coupling.** Record imports, hooks, context/providers, global stores, router, query/cache clients, API calls, server actions, permissions, environment variables, CSS globals, fonts, icons and build assumptions. Separate:
   - **Portable UI/behavior:** props, callbacks, slots, local state, markup and scoped styles.
   - **Host-owned services:** data fetching, authorization, persistence, navigation, analytics and business rules.
   - **Optional adapters:** integration wrappers supplied by the consuming application.
   
   Replace host-owned services with explicit props/callbacks only when behavior remains truthful. Never replace a real backend with a fake success state.
6. **Choose reuse form.**
   - **Source-preserving copy:** only when exact source and included dependencies/assets are licensed for intended redistribution; retain attribution and notices.
   - **Independent adaptation:** author a new implementation from observed requirements/behavior; label it as an adaptation and retain source references.
   - **Behavior/composition reference:** record the pattern without shipping code.
   - **Research-only:** preserve link and limitations when rights or facts are insufficient.
7. **Extract the smallest useful boundary.** Preserve semantic HTML, controlled/uncontrolled contract, refs, keyboard operation, focus management, ARIA, loading/error/empty/disabled states and responsive behavior where they exist. Scope styles; avoid `:root`, broad element selectors and host globals. Prefer composition/slots over an oversized prop surface. Do not add dependencies to normalize a one-off.
8. **Integrate after gates pass.**
   - Native HTML/CSS/JS follows existing `styles/primitives/` family conventions, with focused README and runnable demo when warranted.
   - Page layout recipe → `recipes/`; behavior contract → `docs/interactions/`.
   - A real React reference export may enter `packages/ui/src/` only if it fits React 19+ and explicit theme scoping. Then update `registry/components.json`, `registry/assets.json`, Component Gallery, usage docs and focused tests together.
   - Research-only material stays in `docs/research/`; do not create a fake React export or asset ID.
9. **Verify proportionately.** When a suitable local runtime exists, run `npm run check:components` for React type/build, `npm run test:components:browser` for browser behavior, and `npm run test:registry` + `npm run test:unit` after registry changes. For native assets, check relevant desktop/mobile widths and primary, keyboard and failure/empty states. A Chromium smoke test is not cross-browser, screen-reader or production certification.
10. **Handoff.** Use [component handoff template](references/component-handoff.md). State copied vs independently authored vs reference-only, exact source/destination paths, dependencies, evidence, checks and excluded candidates.

## Required output

A concise candidate table, then the selected component's interface/dependency/evidence record and exact files added. If no candidate passes, return a research-only shortlist rather than manufacturing a component.

## Boundaries

- This skill does not refactor or migrate the source project. Use [frontend-component-adaptation](../frontend-component-adaptation/SKILL.md) downstream.
- Do not add a React component merely to increase export count. The package is a reference library, not a published universal UI kit.
- A static screenshot supports a visual reference or independently authored prototype, not an extracted working component.
