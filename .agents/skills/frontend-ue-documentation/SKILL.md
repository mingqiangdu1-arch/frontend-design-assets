---
name: frontend-ue-documentation
description: Document an existing frontend as a user-experience handoff, connecting actual UI screens with interaction rules, navigation, state changes and data boundaries. Use for reverse UE documentation, frontend-to-UE, product handoff, as-built prototypes and portfolio walkthroughs; not for new product design or release certification.
---
# Frontend UE documentation / 前端逆向交互说明

## Purpose
Turn an existing interface into a readable as-built product reference. Work in the destination project or an explicitly authorized output directory, not in this asset library. Keep redesign recommendations separate from the record of current behavior.

## Workflow
1. **Establish scope.** Record source revision or capture date, target role/device, accessible routes and intended output. Inspect routes, components, event handlers and data calls; if a safe test environment is available, exercise the task paths. A screenshot alone supports visible UI, not inferred functionality. Never bypass authentication or perform real destructive/financial operations to collect evidence.
2. **Inventory screens and meaningful states.** Assign durable IDs. Include screens or overlays needed to understand the task; represent small control-state differences inline. Record coverage and intentionally excluded paths. Preserve actual visual hierarchy, visible labels, responsive constraints and scroll ownership. Keep the target project unchanged unless requested.
3. **Attach rules to UI.** For each meaningful control, document its location/label, action, prerequisites, immediate feedback, resulting screen or state, and recovery where known. Link source and destination IDs for navigation; show local updates without creating fictitious pages. Record what is read or changed, when a change becomes durable, and whether it is client-only, mock, or confirmed server-side.
4. **Track evidence.** Use `observed` (exercised in runtime), `code` (inspected but not exercised), `simulated` (controlled fixture), or `unknown` per material claim; separately label proposed changes. Cite relative source locations or safe test/capture references. If code and runtime disagree, record both. Do not infer authorization, validation, persistence or backend effects from a successful UI toast.
5. **Produce the handoff.** Default to a Markdown screen inventory, annotated screenshots or schematic placeholders when available, and a linked transition table. An independent local HTML overview is optional for larger products; use a static safe copy or capture, not a live production form. Only create Figma frames when requested and supported; check that any promised editable elements really are editable. Reuse existing target-project design tokens for representations, not this repository's arbitrary styles. See [handoff template](references/ue-handoff.md).
6. **Verify proportionately.** Check required screens and states against scope; ensure IDs and navigation resolve, annotations match visible labels, and rules distinguish observed facts from unknowns. Where authorized, exercise representative success and failure/return paths. Confirm the actual requested export opens and remains readable. Report passed, failed, unverified and excluded scope; do not claim runtime verification from source review.

## Data and publication boundary
Use synthetic test data and redact screenshots, text, paths, URLs and metadata before sharing. Do not export secrets, real customer records or private source. Do not execute unreviewed third-party scripts or publish a handoff without authorization.

## Routing
- For specifying or improving interaction behavior: [frontend-interaction-contract](../frontend-interaction-contract/SKILL.md).
- For defect severity and quality review: [frontend-quality-audit](../frontend-quality-audit/SKILL.md).
- For this task, read the template only when needed; no registry lookup or third-party runtime is required.

## Research provenance
Conceptual reference: [BadbotAI/BadGoods frontend-to-ue v4.1, pinned source](https://github.com/BadbotAI/BadGoods/tree/5e583c3a8866af190b75146f43d717fa87ddd8aa/skills/frontend-to-ue). This repository-authored workflow is independently expressed for the asset library's handoff use case. No upstream text, renderer, template or executable is bundled; redistribution permission has not been established.
