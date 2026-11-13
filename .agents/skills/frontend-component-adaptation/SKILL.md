---
name: frontend-component-adaptation
description: Adapt an existing frontend asset or React component into another project's stack while preserving semantics, source provenance, explicit style compatibility, dependencies and API/state ownership. Use when integrating an identified CSS/SVG/JS/TSX asset into React/Next/Vue/plain HTML or when comparing a reference with an actual exported component.
---
# Frontend component adaptation / 跨项目复用

## Goal
Transfer **only what is supported by an inspected source** into the target repository. This skill is for downstream application projects; do not put a customer-specific implementation back into the asset library.

## Steps
1. Read the specific asset ID and exact original source, not just a registry title. Cross-check [components registry](../../../registry/components.json) for true public React exports; a `type: component` in `assets.json` alone proves nothing.
2. Classify source: public React export, standalone CSS/HTML, headless JS state model, SVG media or research-only external link.
3. Create a dependency and boundary inventory: imports, CSS scope, DOM structure, themes, state, events, async calls, data source, licensing and original version.
4. Choose **copy scoped original**, **adapt structure**, **rewrite for host semantics**, or **research only**. Do not silently promote prototypes or copy third-party designs.
5. For React/Next/Vue: preserve semantic markup, accessibility, key/focus semantics and state ownership; convert only required scoped styles/API bindings. Keep vendor-specific adapters separate from the original reference.
6. When relevant, examine [original FX-094..099 styles](../../../styles/primitives/v053/composition-atoms.css) plus [markup specimen](../../../playground/composition-v053/index.html), or exact exported TSX. Don't import all themes or all materials.
7. Provide a focused diff or exact files changed **in the destination repo**, a short invocation example, known limitations, and validation performed versus pending. If the target repo is unavailable, produce an integration plan rather than claiming edits.

Use [handoff template](references/handoff-template.md) for the evidence-based transfer record.

## Hard boundaries
No global theme default; no import of unreviewed fonts/media; no invented API or persisted state; no “production-ready” label unless target checks support it.
