# V0.18 · Two visual studies outside the existing 10 styles

These are **original research sketches with scoped sample tokens**, not registered `styleId` values, complete CSS themes, production UI, or React integrations. `registry/styles.json` still contains ten independent, explicitly selected styles. Neither visual study becomes a default.

## VS-001 — Atlas Ledger / Evidence Cartography

**Question:** How can a data-rich, geographically grounded argument feel like an atlas rather than a SaaS dashboard? Suitable for climate explainers, cultural maps, public datasets, travel narratives, historical archives and editorial reports. In a dense operations tool, prefer an actual table/workbench.

- **Composition:** a small editorial masthead and issue/date marker; a dominant map/data plate; a margin legend with source note; a split narrative and comparison strip; endnotes and methodology in a visibly separate footer. Primary data first, secondary controls recede.
- **Grid:** measured columns inspired by print mapping, with labels aligned to a geographic/data frame. Use asymmetric annotation margins and keyed plate numbers, not rounded cards everywhere.
- **Typography:** a calm editorial display for argument headings, highly legible system sans for legends/captions, tabular numeric figures and small but readable source notes.
- **Material study:** parchment-neutral canvas, dark blue-grey ink, one rust/copper emphasis, topographic ruling/contour motifs rendered **purely decorative**. Sample scoped token starting points are in `styles/research/atlas-ledger.tokens.css`; none are claimed from a third-party product.
- **Interaction examples:** `IP-026` chart/list brushing tied to a visible legend and data table; `IP-027` source-linked pins; `IP-025` nested layer explorer when the hierarchy warrants it. A map is not required: a table and a prose summary must remain sufficient.
- **Responsive structure:** at narrow widths put the legend and selected dataset **before** the map, show evidence as ordered caption rows and expose a simple result list. Never hide selected filters inside an inaccessible hover tooltip.
- **Avoid:** decorative fantasy cartography masquerading as measured geography; real-looking boundaries or values without source/data; low-contrast contour lines containing information; pin-only navigation.

**One screen specimen:** [Issue marker + central map/data plate + legend] → [Linked result list + selected observation] → [Methods and citations]. This is a composition brief, not a built page.

### Adaptation boundaries

A map projection, geocoding, geographic source provenance, data sampling and screen-reader data alternative are **real product concerns**, not solved by tokens. For an exploratory chart implementation, [Observable Plot](https://github.com/observablehq/plot) is a possible separate dependency under ISC; nothing has been installed. A chart library does not automatically provide an accessible table or keyboard brush.

## VS-002 — Tactile Instrument / Precision Workshop

**Question:** Can expressive physical-control affordances support precise work without faking hardware? Suitable for sound synthesis, color grading, creative effects, instrument simulators, art toys and optional control surfaces.

- **Composition:** a restrained dark instrument chassis and single dominant control/preview; secondary channel strips with labels; restrained meter bars; calibration and source-of-truth numeric values; undo/reset visible near each editable group.
- **Grid:** intentional panel seams, circular control wells and aligned scales. A dial is one type of control, not the entire navigation system; reserve ample room for text labels.
- **Typography:** concise legible equipment-like labels, tabular numeric outputs, clearly separated units and calibrated ranges; avoid novelty fonts for critical controls.
- **Material study:** desaturated deep mineral surface, warm amber selected values, soft raised ridges and subtle inset track line, no fake light refraction that obscures state. Sample tokens: `styles/research/tactile-instrument.tokens.css`.
- **Interaction examples:** `IP-028` constrained two-handle range for parameter bands; `IP-030` rotary control with a numeric/keyboard alternative; `IP-029` branching presets/experiments when state choice must remain reversible.
- **Responsive structure:** replace spatial knob banks with labeled sliders/number inputs in a logical group order; use visible units and range limits, not tiny rotary gestures on touchscreens.
- **Avoid:** fake audio/lighting output; rotating controls without keyboard/input alternatives; endless inert canvas motion; visual precision unsupported by underlying data or frame resolution.

**One screen specimen:** [Mode and selected channel] → [Main visualization with scale] → [Four parameter controls + numeric values] → [Preset compare/revert]. This is a design reference only.

### Cross-project use

A physical-control motif should not be forced onto transaction forms, administrative tables or a reading app. An exact input contract, step size, orientation, pointer-to-value transform, save/rollback semantics and reduced-motion behavior must be designed for the actual product. Consider [Leva](https://github.com/pmndrs/leva) for separate reference on precision input affordances; no code was copied.

## Decision matrix

| Task | Atlas Ledger | Tactile Instrument |
| --- | --- | --- |
| Explain evidence or tell a data story | Strong candidate; source and legend hierarchy | Weak; instrument metaphor distracts |
| Tune a creative parameter precisely | Weak; map symbols obscure control semantics | Strong candidate; direct numeric control |
| Dense transactional administration | Neither a default | Neither a default |
| Accessible mobile reading | Possible with table/legend-first restructuring | Only if gestures are replaced with native controls |

Both studies share the rule: **information remains legible with motion off, decoration removed and pointer-only actions unavailable**. Sample tokens are original, intentionally partial and not a visual regression sign-off.
