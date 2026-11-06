# V0.28 · Theme → Page Assembly Handoff

The repository contains 14 original visual styles, seven registered runnable page templates and 16 **research-only** experience composition concepts. These are separate layers. This capability joins them **without falsely claiming** that a conceptual plan is a deployed page or a theme is supported by the existing React package.

## What is new

- [Machine-readable style grammars](../../registry/style-assembly.json): **14 original, one-to-one style assemblies** containing 57 distinct page sections; each section specifies purpose, layout and interaction behavior. Typography, spacing, motion, accessibility, responsive and negative constraints vary by actual visual language.
- [Pure assembly model](../../scripts/style-assembly.mjs): loads exact registered styles, scoped Tokens, source demos, existing templates, actual React export IDs and related experience research, then produces a deterministic plan.
- [CLI](../../scripts/build-style-brief.mjs): returns complete Markdown or JSON. No AI API, page code generation, filesystem writes or target app modification.
- [Theme Atlas → 03 · Page Assembly](../../playground/style-atlas/README.md): explicitly pick a theme (or use a theme card shortcut), provide goal/context/stack/device/template, view sections and integration risks, then copy the generated Markdown handoff.

## Recommended process

1. First select the visual direction based on real product requirements with [Theme Atlas](../../playground/style-atlas/) or [V0.27 no-default selector](../styles/theme-selection-v027.md).
2. Choose the style ID explicitly. Do **not** infer from prior user projects, personal preference, overall trend popularity or repository defaults.
3. Add declared application context, device and target stack. Explicit incompatible contexts **fail**; unknown devices are flagged for review. React may be a desired target but the result must disclose whether it needs manual theme porting.
4. If one of the **seven actual runnable page templates** is relevant, explicitly specify the exact `TPL-xxx` ID. Matching templates are listed as *candidate-not-selected* until chosen.
5. Inspect the resulting section architecture, typography/material/motion, relevant source files and limitations. An implementing Agent must fetch and adapt actual code **after** this planning stage.
6. Fill real data contracts, loading/empty/error/retry/undo states and accessibility tests before shipping. The generated brief is not a production certification.

## GitHub-only / Node commands

```bash
# Independent style: React requested, manual port clearly flagged
node scripts/build-style-brief.mjs --style=liquid-layer --context=media-gallery --stack=react --device=mobile --format=markdown

# Existing React template: only explicit selection reports wired-in exports
node scripts/build-style-brief.mjs --style=editorial-warm --context=publication --template=TPL-007 --stack=react --title="内容审核" --format=json

# Consumer task-oriented style without claiming a built page
node scripts/build-style-brief.mjs --style=shape-expressive --context=consumer-mobile --stack=static --format=markdown

# Existing independent storefront example ported to React: both theme + template ports required
node scripts/build-style-brief.mjs --style=commerce-atelier --context=product-catalog --template=TPL-006 --stack=react --format=markdown
```

For interactive use, run `npm run dev:catalog` from the root and visit `http://127.0.0.1:8009/playground/style-atlas/`. All seven registries are fetched locally; the UI neither uploads user goals nor makes remote model requests.

## Boundaries / common mistakes

| Fact | Correct interpretation |
| --- | --- |
| Style Profile has `tokens.css` | CSS is available for inspection; **not** proof of React `ThemeSurface` compatibility |
| V0.28 has 14 section grammars | These are code-generation guidance, **not** fourteen compiled websites or runnable templates |
| Registered template ID appears as candidate | A runnable reference exists, but **not selected** until requested; a React/Static port may be necessary |
| Real `packages/ui` exports are listed | Candidates must be **wired only when the selected existing template truly lists their IDs** |
| A related XC experience recipe appears | Conceptual information architecture cross-reference, **not** a live demo |
| A brief is successfully generated | No target repository, account, backend, live data or UI has been generated/edited |
| CLI says port required | The port is **not implemented**; inspect licenses, styles and run new tests after adaptation |

The `style-assembly.json` entries reference known page templates, existing cross-scene XC recipes and real component export names only. Stable IDs `DT-001..014` and `TPL-001..007` remain unchanged; the system does not add another application-dependent default.

## Verification / maintenance

```bash
npm run test:registry
npm run test:unit
npm run test:browser
```

The existing registry validator now checks one-to-one coverage for the fourteen styles and validates template references, actual component hints, stage links, unique section IDs, safe source paths and strict default-null policy. Browser checks cover the explicit selection, no-template default, React port warnings, actual selected React template wiring, style switching and mobile overflow.

On adding a theme, extend [`style-facets.json`](../../registry/style-facets.json) and [`style-assembly.json`](../../registry/style-assembly.json) together with the actual source/profile/demo. Only add template IDs if a runnable page has been registered in `page-templates.json`. Only add component export hints for themes listed in `components.json.styleIds`. CI will fail closed on stale references.

**Not performed here:** real physical touch, full screen reader review, copy/design production verification, target application API integration or CDN deployment.
