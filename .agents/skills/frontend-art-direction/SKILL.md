---
name: frontend-art-direction
description: Generate grounded alternative visual directions for web or mobile product interfaces using the repository's style facets, previews, layouts, and original assets. Use when the user asks for a visual direction, art direction, style comparison, redesign options, moodboard or nonstandard frontend visual exploration before coding.
---
# Frontend art direction / 设计方向

## Goal
Offer **2–3 meaningfully different** task-fit directions with retrievable references, rather than reusing the repository's first or most popular theme.

## Workflow
1. Identify the real audience and task, device, content density, visual constraints and brand restrictions; inspect supplied screenshots or design references before proposing alternatives.
2. Read [style facets](../../../registry/style-facets.json) first: task keywords, materials, layout, interactions, device, density, previews and cautions. Then open only relevant [style definitions](../../../registry/styles.json), [creative grammars](../../../registry/creative-directions.json), or selected real demos.
3. Separate **structure**, **typography**, **color/material**, **interaction** and **graphic motifs**. The theme is a proposal, not a mandatory global import.
4. Deliberately contrast options on at least **two axes**, e.g. editorial versus immersive; compact versus spacious; static versus responsive microinteraction. Avoid presenting dark and light recolors of one layout as different concepts.
5. For each direction, attach 1–3 grounded paths or IDs, e.g. `FX-094` split cover, `FX-098` dual editorial plate, `VG-089` abstract signal loom. Link previews instead of declaring unseen examples “high quality”.
6. Explicitly name risks: legibility, contrast, dense Chinese text, content priority, reduced motion, assets licenses, mobile rearrangement and whether any React theme support has actually been declared.
7. Return a recommendation **conditional on stated goals**. If the task is open exploration, do not narrow to a single favorite without evidence.

## Required output
For each concept: **name + target experience + layout + material/typographic grammar + interaction rhythm + evidence paths + tradeoff**. Conclude with what the target application would still need to build.

Only selected skills/resources are loaded on demand. For a compact annotated output, read [direction brief sample](references/direction-brief.md).

## Guardrails
- No universal SaaS default. `registry/styles.json.defaultStyleId = null` is intentional.
- A standalone demo or stylesheet does **not** prove React compatibility, licensing of external references, production QA, or exact visual reproduction.
- Keep this skill for **direction ideation**; use `frontend-source-retrieval` only after the direction needs concrete assets.
