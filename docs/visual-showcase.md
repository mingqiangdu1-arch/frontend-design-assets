# Visual showcase and evidence / 视觉展示与证据

## Live interactive preview (GitHub Pages)

When GitHub Pages is enabled (Source: **GitHub Actions**), `.github/workflows/deploy-pages.yml` builds and publishes:

- Landing index (`index.html`) linking all major interactive labs
- **Theme Atlas** (`./playground/style-atlas/`) for side-by-side comparison of 14 visual directions
- **React Component Gallery** (`./component-gallery/`) for all 48 React/TSX exports across four explicit themes
- Native ESM demos (`spatial-composition-v064`, `editing-controls-v062`, `print-patterns-v061`, `commerce-atelier`, `trend-style-lab`, `creative-style-lab`, `asset-explorer`)

Build the exact Pages bundle locally with:

```sh
npm run build:pages
```

## Documentation graphics

| File | Basis | Regenerate |
| --- | --- | --- |
| [cover.svg](media/cover.svg) | Original abstract identity composition; not a product screen | `node scripts/generate-public-visuals.mjs` |
| [style-atlas.svg](media/style-atlas.svg) | 14 registered style IDs and actual semantic color tokens, illustrated compositions | same command |
| [inventory.svg](media/inventory.svg) | Canonical asset and component registries | `node scripts/generate-public-overview.mjs` |
| [Gallery](gallery.md) | Actual original SVGs, curated screenshots and source/demo links | Update references after adding or moving assets |

All generated SVGs are self-contained with no external fonts, scripts, images, or network dependencies.

## Curated real UI screenshots (`1280 × 800`)

Generate clean viewport-cropped (`1280 × 800`) Chromium screenshots of key demos into `docs/media/screenshots/`:

```sh
npm install
npx playwright install chromium
npm run screenshots:public
```

Or run the **Prepare Public Showcase** GitHub Actions workflow (`.github/workflows/prepare-public-showcase.yml`) manually from the Actions tab to capture all six showcase screenshots directly in CI:

| Screenshot file | Target demo |
| --- | --- |
| `docs/media/screenshots/style-atlas-1280x800.png` | Theme Atlas — 14-style filter & comparison |
| `docs/media/screenshots/component-gallery-light-1280x800.png` | React Component Gallery (`refined-light-saas`) |
| `docs/media/screenshots/component-gallery-dark-1280x800.png` | React Component Gallery (`precision-dark`) |
| `docs/media/screenshots/spatial-composition-1280x800.png` | V0.64 Spatial Composition Atoms |
| `docs/media/screenshots/editing-controls-1280x800.png` | V0.62 Creative Editing Micro-Controls |
| `docs/media/screenshots/commerce-atelier-1280x800.png` | Commerce Atelier standalone storefront reference |

Review generated PNGs before committing to ensure synthetic fixture data, clean framing, and accurate visual labels.

## Open local demos directly

Run `npm run dev:catalog` at repository root and open paths under `http://127.0.0.1:8009/`:

| Style | Local path |
| --- | --- |
| `refined-light-saas` | `playground/initial-interaction-lab.html` |
| `precision-dark` | `playground/style-explorer/index.html?style=precision-dark` |
| `editorial-warm` | `playground/style-explorer/index.html?style=editorial-warm` |
| `playful-pop` | `playground/style-explorer/index.html?style=playful-pop` |
| `neo-brutalist` | `playground/bold-grid/index.html` |
| `commerce-atelier` | `playground/commerce-atelier/index.html` |
| `pixel-arcade` | `playground/creative-style-lab/index.html?style=pixel-arcade` |
| `signal-noir` | `playground/creative-style-lab/index.html?style=signal-noir` |
| `paper-rebellion` | `playground/creative-style-lab/index.html?style=paper-rebellion` |
| `aether-orbit` | `playground/creative-style-lab/index.html?style=aether-orbit` |
| `liquid-layer` | `playground/trend-style-lab/index.html?style=liquid-layer` |
| `shape-expressive` | `playground/trend-style-lab/index.html?style=shape-expressive` |
| `type-led-minimal` | `playground/trend-style-lab/index.html?style=type-led-minimal` |
| `organic-tactile` | `playground/trend-style-lab/index.html?style=organic-tactile` |

Interactive two-theme comparison: `http://127.0.0.1:8009/playground/style-atlas/?left=editorial-warm&right=liquid-layer`.
