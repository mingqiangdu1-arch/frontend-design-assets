---
name: frontend-design-system-extraction
description: Extract an evidenced design system from an authorized frontend codebase or sampled live interface, including tokens, typography, color roles, layout, component styling and responsive/motion rules. Use when turning an existing product UI into DESIGN.md, token files or a reusable style profile; not for inventing a new visual direction from a vague brief.
---
# Frontend design system extraction / 前端转设计系统

## Purpose

Recover visual rules actually present in a project and package them as reusable, evidence-scoped assets. This is a **reverse analysis workflow**, not a redesign or website-cloning tool.

Follow the [shared extraction protocol](../shared/extraction-protocol.md) for evidence, provenance, authorization and promotion.

## Workflow

1. **Set sampling scope.** Record source repository/revision or public site URL, representative routes, component families, themes/color schemes, viewport sizes, interaction states and requested output. Prefer a small representative sample over an indiscriminate crawl. One screenshot is a partial visual sample, not a site-wide design system.
2. **Inspect existing definitions first.** For source repositories, locate token files, CSS custom properties, SCSS variables, Tailwind config, theme providers, CSS modules, component styles, typography assets and docs. Preserve declared names and hierarchy where meaningful. Read the [style registry](../../../registry/styles.json), [style facets](../../../registry/style-facets.json) and relevant token files before proposing a new style.
3. **Collect runtime evidence when authorized.** Sample representative pages and meaningful states in a browser. Inspect computed styles and CSSOM for rendered values, pseudo-state rules, media queries, font declarations, keyframes and CSS variables. Record route, viewport, color scheme and state. Computed styles prove what rendered, not necessarily the original token name or intent.
4. **Use screenshot-only inference honestly.** Describe approximate color, spacing, typography, hierarchy and layout. Do not claim exact CSS values, font files, breakpoints, hover/focus behavior, semantic token names or responsive rules unless another source confirms them.
5. **Normalize findings into layers.**
   - **Primitive tokens:** raw palette, spacing scale, type ramp, radii, shadows, durations, breakpoints and other low-level values.
   - **Semantic tokens:** role-based values such as surface, text, border, action, focus and status.
   - **Component tokens:** values applied to a component family, such as button height, input border or dialog shadow.
   
   Preserve source variable names and aliases when available. Semantic naming is an interpretation unless declared in source; label it `inferred` or `proposed`. Do not tokenize every isolated value, infer brand primary from frequency alone, or flatten meaningful light/dark/brand modes into one palette.
6. **Describe the design language.** Capture typography roles and font fallback, density, grid/container rules, spacing rhythm, surfaces/materials, borders, elevation, icon treatment, motion/easing, reduced-motion behavior, responsive breakpoints and exceptions. Include representative component recipes and anti-patterns only when supported.
7. **Choose output format.**
   - `DESIGN.md`: human/agent-readable design intent, coverage, token usage, component recipes and known gaps.
   - Existing repository token JSON/CSS: preserve the current native schema and naming when extending an existing style.
   - Optional `tokens.dtcg.json`: use stable DTCG 2025.10 for cross-tool exchange. Keep separate from this repository's existing custom `tokens.json` unless a deliberate migration is approved. DTCG is a W3C Community Group specification, not a W3C Standard.
   - Optional Tailwind adapter: generate only for an identified Tailwind version; never assume v4.
   - Optional preview: token swatches, type ramp and representative components; mark inferred values and sampled coverage.
8. **Integrate without flattening the repository.**
   - If findings clearly extend an existing style, update only its documented tokens/profile and relevant evidence.
   - Add a new `styles/<style-id>/` profile only when multiple representative pages/components support a coherent, distinct design language. One screenshot, one page or one palette is not enough.
   - A complete new style normally needs `style.json`, `README.md`, token source(s), representative demo/preview and appropriate `registry/styles.json` + `registry/style-facets.json` entries. Add assembly metadata only when a real page-structure recipe exists.
   - Keep React theme compatibility separate. Update `registry/components.json.styleIds` or `packages/ui/src/themes.css` only when components actually support and have been checked against that theme.
   - Never set a repository-wide default; `registry/styles.json.defaultStyleId = null` is intentional.
9. **Validate.** Check source values, token names/types/units, alias resolution/cycles, semantic consistency, CSS scope and theme separation. If DTCG is produced, validate against pinned 2025.10 with an available validator; otherwise label it structurally reviewed but not schema-validated. Compare previews against source at matching viewports where possible. Report contrast only for identified foreground/background pairs; a palette alone cannot prove WCAG conformance.
10. **Handoff.** Use [design-system handoff template](references/design-system-handoff.md). State coverage, exact vs inferred values, theme exceptions, generated files, validation and gaps.

## Optional extraction tools

These are research references, not installed dependencies:
- [Dembrandt](https://github.com/dembrandt/dembrandt) can inspect rendered DOM/computed styles and CSSOM and export DTCG, DESIGN.md, Tailwind or HTML reports. Its documented CLI installs dependencies and downloads matching Chromium on first use. Do not install or execute automatically; use only after explicit approval, against an authorized public URL, in an isolated environment, without private cookies or credentials.
- [StyleLift](https://github.com/sreenathmmenon/stylelift) documents browser-side computed-style/CSSOM extraction and design-artifact handoff. Its inspected repository tree had no license file; do not vendor its code or assume redistribution rights.

## Boundaries

- Use [frontend-art-direction](../frontend-art-direction/SKILL.md) for new visual concepts, not reverse extraction.
- Use [frontend-ue-documentation](../frontend-ue-documentation/SKILL.md) for page-level UI and interaction handoff.
- Use [frontend-component-extraction](../frontend-component-extraction/SKILL.md) when a specific component is the desired asset.
- Extracting values does not grant permission to reproduce a site's distinctive brand identity, media, logos, images or fonts.
