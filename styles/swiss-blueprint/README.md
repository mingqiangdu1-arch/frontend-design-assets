# DT-015 · Swiss Blueprint · 工程蓝图规格

**Independent experimental visual theme**. Cyanotype cobalt architectural drafting grid, hairline coordinate rules, chalk-white technical typography, and amber callout pins for specs, hardware documentation, and interactive schematics.

## Distinction from existing styles

- Unlike `precision-dark` (neutral charcoal developer console) and `signal-noir` (futuristic glowing telemetry HUD), `swiss-blueprint` draws from architectural cyanotype plates and ISO technical drawing sheets: flat hairline rules, sharp `2px` corners, numbered drawing title blocks, explicit unit/scale metadata, and high-contrast chalk-on-cobalt legibility without neon glow.
- Unlike `neo-brutalist` (loud offset-shadow campaign posters), every line and callout serves technical orientation and cross-referencing.

## Distinct grammar

- **Layout:** numbered drawing title block (`DWG NO.`, scale, revision) → primary interactive schematic plate with coordinate ticks → synchronized tabular specification ledger → revision/verification footer.
- **Typography:** crisp geometric sans headings paired with uppercase monospace drawing codes and `tabular-nums` measurements.
- **Material:** deep cobalt drafting canvas (`#0D2444`), elevated blueprint plate (`#132F57`), hairline steel-blue grid rules (`#4A78B5`), chalk-white ink (`#F2F7FF`), and drafting amber callout highlights (`#FFD166` / `#102038`).
- **Motion:** brisk mechanical snap (`100ms` / `180ms`) for active selection and unit conversion; zero continuous animation; collapses to `0ms` under `prefers-reduced-motion`.
- **Behavior:** bidirectional linking between numbered schematic callout buttons and tabular schedule rows, live `mm` / `in` unit conversion, subsystem filtering, and toggleable drafting grid.

## Do not do

- Never let decorative grid lines reduce text contrast over measurements or body copy.
- Never present illustrative schematic numbers as certified physical tolerances.
- Never rely on pointer-only diagram markers without a keyboard-accessible list/table equivalent.
- Never replace crisp chalk-on-cobalt rules with neon glow or fake sci-fi scanlines.

## Where it fits

`architecture-spec`, `hardware-docs`, `engineering-catalog`, `technical-blueprint`. Evaluate actual user tasks before applying to non-technical consumer flows.

## Real files and reuse boundary

- [Token data](tokens.json) and [scoped CSS](tokens.css) — CSS variables bound exclusively to `[data-design-theme="swiss-blueprint"]` (zero global `:root`).
- [Standalone interactive specimen](../../playground/swiss-blueprint/index.html) — zero-dependency HTML/CSS/ESM reference demo.
- `packages/ui` React library continues to declare **four explicit themes only**. Do not assume React `ThemeSurface` compatibility without building and verifying a dedicated theme bridge.
