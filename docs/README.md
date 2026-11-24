# Documentation / 文档导航

[Home](../README.md) · [中文指南](../README.zh-CN.md)

| Section | Purpose |
| --- | --- |
| [Gallery](gallery.md) · [Visual evidence](visual-showcase.md) | Style atlas, original artwork, selected components and runnable references |
| [Discovery](../DISCOVER.md) · [Catalog](../CATALOG.md) | Task-first discovery and precise source lookup |
| [Styles](styles/) | Visual systems, tokens, comparison and selection |
| [Assembly](assembly/) · [Interactions](interactions/) | Layout recipes and behavior contracts |
| [Research](research/) | Pinned external sources and exploratory studies |
| [Quality](quality/) | Evidence, test boundaries and limitations |
| [Governance](governance.md) · [Licensing](licensing.md) · [Release maintenance](release-maintenance.md) · [Publication readiness](publication-readiness.md) | Maintenance, attribution and release gates |

## Inventory

Source of truth: [assets](../registry/assets.json), [React exports](../registry/components.json), [styles](../registry/styles.json), [templates](../registry/page-templates.json). The [SVG snapshot](media/inventory.svg) is generated from those files. Regenerate after changing an inventory count:

```sh
node scripts/generate-public-overview.mjs
```

Current snapshot: 2026-11-24; 619 asset entries, 48 React exports, 14 styles, 7 templates. Component-type entries and React exports are not synonymous.

| Asset type | Count |
| --- | ---: |
| component | 323 |
| reference | 160 |
| interaction | 79 |
| recipe | 18 |
| archive | 16 |
| token | 14 |
| page-template | 7 |
| motion | 2 |

| Lifecycle stage | Count |
| --- | ---: |
| reference-implemented | 319 |
| analyzed | 200 |
| prototype | 99 |
| captured | 1 |
| validated | 0 |
| production-ready | 0 |
| deprecated | 0 |

The tables are a dated explanatory snapshot; regenerate the graphic after registry changes and update this snapshot if the counts change. Never interpret an entry as production-certified solely because it is registered.
