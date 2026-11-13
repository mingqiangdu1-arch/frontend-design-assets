# Component reuse handoff / 复用记录模板

Copy and complete only fields relevant to the actual asset.

| Field | Example: caption mosaic |
| --- | --- |
| Asset ID | `FX-097` |
| Authoritative source | `styles/primitives/v053/composition-atoms.css` |
| Example DOM | `playground/composition-v053/index.html` |
| Actual kind | original scoped CSS/HTML specimen, **not** React export |
| Reuse boundary | reference CSS + semantic figure markup; real images/data are supplied by target |
| Host assumptions | CSS support for modern grid; no JS dependencies |
| Target adaptation | map figures to actual media and alt/caption; isolate CSS scope; preserve DOM order |
| Test evidence | source inspected; no host browser tests yet |
| Open risks | longest captions, very small viewport, license of user-supplied images |

## Decision table
- `UI-xxx` **and** exported in `registry/components.json`: inspect TSX source, props, theme compatibility and host providers; may adapt typed API.
- `FX-xxx`: copy only required scoped CSS and specimen HTML; adapt host semantics and app state.
- `VG-xxx`: reference only the actual SVG file; do not recode it into a stateful component unless needed.
- `IP-xxx`: use the headless model or state contract if implemented; otherwise specification-only.
- `REF-xxx`: research-only; do not install or copy unreviewed third-party code.

## Minimum destination review
- Confirm actual file/import compilation; actual component props where relevant.
- Verify host theme boundaries and typography inheritance.
- Check pointer/keyboard/touch/assistive use for interactive components.
- Compare observed target rendering and narrow-width behavior.
- Record exact tests run and remaining risk. No inferred production sign-off.
