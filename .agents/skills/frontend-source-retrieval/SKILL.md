---
name: frontend-source-retrieval
description: Locate concrete, reusable frontend assets and references in this repository, including React exports, CSS, SVG, interactions, and external sources. Use when an agent needs an exact source file, demo, asset ID, licensing boundary, or shortlist rather than general design inspiration.
---
# Frontend source retrieval / 精确选材

## Goal
Return a small, verifiable selection of **existing originals or research** for a target task. Never present a research note as a copyable component.

## Process
1. Extract task intent, surface, stack, needed interaction, device and any user-specified style. Missing details are search constraints, not permission to choose a default theme.
2. Start at [repository quick discovery](../../../DISCOVER.md) and optionally [task-specific catalog](../../../CATALOG.md). Do **not** start by loading the entire large asset registry.
3. Retrieve candidates from the smallest indexed source:
   - React public exports: [components registry](../../../registry/components.json), then verify the exact file and exported symbol inside `packages/ui/src/`.
   - Native CSS/JS/Canvas: [material-family index](../../../registry/README.md), then a specific `FX-xxx` original in `styles/primitives/`.
   - SVG art/icons: specific `VG-xxx` paths under `graphics/`.
   - Interaction contracts: `IP-xxx` and its real `path/spec/demo`; unimplemented research is not executable.
   - Upstream references: `REF-xxx` dossier; external source ownership and license remain with their author.
4. When a task maps ambiguously to several IDs, shortlist 2–5 with explicit distinctions, not a giant source dump.
5. If Node and files are available, optionally run `node scripts/find-assets.mjs --intent="图片对比" --goal=implementation --limit=5 --json` from repository root. This is **lexical** search; zero hits does not prove absence. GitHub-only agents can inspect the indexed paths directly.
6. Check `stage`, `reuseKind`, `handoff`, `verified`, `styleIds`, dependencies, source path and provenance before choosing. `copyable-source` ≠ production certification; empty style IDs ≠ universal compatibility.
7. Provide a compact handoff with ID, exact path, source category (React/CSS/SVG/prototype/research), why it fits, reuse limit, and one alternative. If no accurate match, say so instead of inventing a file.

## Example
Request: “适合作品集的图片拼版和一个创作氛围插画。”
Candidate: `FX-097` → `styles/primitives/v053/composition-atoms.css` (responsive caption mosaic), plus `VG-088` → `graphics/v053/editorial/studio-pinboard.svg` (original illustration). Both are source-level references, not React components or an assembled portfolio.

For output fields and failure modes see [retrieval handoff examples](references/handoff-examples.md).
