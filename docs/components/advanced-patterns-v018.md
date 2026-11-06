# V0.18 · Advanced component morphology / design contracts

These five `UI-028..032` entries are **research component archetypes**, not additional exports in `packages/ui/src/index.tsx` and not already wired to any of the ten visual styles. Their purpose is to make Codex consider alternative UI **structures and states**, not force a single shadcn/SaaS-looking widget library.

## UI-028 · Hierarchy Explorer Row

**Anatomy:** depth indent + expand button + accessible label + optional status + per-row action. For treegrid, actual roles and roving focus depend on an explicitly chosen navigation model (see IP-025); do not automatically apply grid ARIA to a simple nested list.

- **Variants:** compact explorer; touch-first nested list; editable row/cell; async-loading child branch.
- **States:** selected ≠ focused; collapsed/expanded; loading children; disabled action; unsaved edit; stale item.
- **Contract:** stable row identity, scope-respecting keyboard model, explicit drag alternatives; focus returns to parent when active child collapses.
- **Not a component:** reference markup/behavior decisions only, no TSX/CSS implementation.

## UI-029 · Linked Data Legend Rail

**Anatomy:** named series/region chips + persistent selected count + filters + remove/clear button + exact-value table link. Can live beside a map, a chart or a data grid.

- **Variants:** editorial right-margin legend, horizontal mobile filter strip, detailed table-first layout.
- **States:** selected, hidden-but-selected, disabled/unavailable, zero results, stale data, mixed source units.
- **Contract:** shared record IDs as a single source of truth; legible group color + text; keyboard filter and full data table.
- **Use with:** IP-026 and VS-001. Not a data-visualization library itself.

## UI-030 · Annotation & Provenance Drawer

**Anatomy:** ordered note list, anchor IDs, selected note body, author/source label, evidence link, status and close control.

- **Variants:** document margin notes, chart evidence inspector, mobile modal note sheet.
- **States:** selected, unread, edited, orphaned anchor, save error/retry, private and read-only.
- **Contract:** stable anchor origin, focus restoration, untrusted input safety, authorization and clear source citation.
- **Use with:** IP-027. Not a permission model or backend database.

## UI-031 · Dual-Range Band Editor

**Anatomy:** lower/upper labeled values with units, optional two-handle visual band, minSpan indication, reset button, clamp explanation and save status.

- **Variants:** data filter band, calibrated creative parameter envelope, constrained schedule range.
- **States:** idle, low/high focused, drag preview, valid clamped, invalid config, pending save, server rollback.
- **Contract:** enforce step lattice/minimum separation in a headless model. For accessible UI, provide two labeled numeric alternatives and actual tested thumb keyboard semantics.
- **Use with:** IP-028 + `interactions/research/constraint-range.mjs`. No ready React range slider provided.

## UI-032 · Parameter Control Rack

**Anatomy:** section label, parameter title, dial or native slider, stable numeric readout, min/max/unit hints, optional presets, Reset and undo feedback.

- **Variants:** tonal studio, instrument face, color-control rack, mobile stacked slider group.
- **States:** idle/focused/modified, out-of-range rejected, disabled, slow device, control connection lost.
- **Contract:** number is the source of truth; knob angle is derived display only. Coarse-pointer and assistive-technology users must reach the same state via native controls.
- **Use with:** IP-030 and VS-002. No audio engine, hardware interface or production TSX export exists.

## Anti-clone guidance

When building a new app, choose a control **because it fits the user job**, not because an animated component gallery looks impressive. An advanced widget may be a bad fit for transactional forms or dense screen-reader work. Always record real stack, styleId (if any), required behaviors, fallback, source/license and current integration maturity.

**External research:** [Leva](https://github.com/pmndrs/leva) for parameter GUI, [Animate UI](https://github.com/imskyleen/animate-ui) for motion-bearing primitives (MIT + Commons Clause), [Motion-Primitives](https://github.com/ibelick/motion-primitives) for permissive MIT motion UI, and [React Bits](https://github.com/DavidHDev/react-bits) for creative animation ideas (MIT + Commons Clause). Their existence does **not** authorize redistribution as a component library or imply these archetypes are integrated.
