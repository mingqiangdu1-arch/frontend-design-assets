# Publication readiness / 发布门禁与核查清单

This document defines the release hygiene, licensing, privacy, and verification gates for public snapshots of `frontend-design-assets`. Passing automated checks supports quality governance and does not replace independent legal, security, or accessibility review.

## Release gates

| Gate | Requirement | Verification |
| --- | --- | --- |
| Licensing & attribution | Root `LICENSE` (MIT for owner-authored original materials), `NOTICE.md`, `package.json` `license` field, and 100% populated `registry/assets.json` license metadata | `node scripts/check-public-snapshot.mjs --release` |
| Third-party skill boundaries | Only pinned upstream skills with verified license files are bundled; external-only references remain links | `node scripts/check-public-snapshot.mjs --release` |
| Privacy & secret hygiene | Zero tracked `.env`/key files, private workspace mappings, personal emails, or internal-only fixture data | `node scripts/check-public-snapshot.mjs --release` |
| Registry & runtime checks | All referenced asset paths exist, style contrast & token checks pass, unit tests pass, React UI typechecks and builds | `npm run test:registry`, `npm run test:unit`, `npm run check:components` |
| Reproducible graphics | Generated SVGs match canonical registries | `node scripts/generate-public-overview.mjs && node scripts/generate-public-visuals.mjs` |
| Public showcase & live preview | Curated viewport screenshots (`docs/media/screenshots/*.png`) and GitHub Pages build pass cleanly | `npm run build:pages` & `npm run screenshots:public` |

## Run preflight checks

Run on Node.js 22+ from a clean checkout:

```sh
node scripts/generate-public-overview.mjs
node scripts/generate-public-visuals.mjs
git diff --exit-code -- docs/media/inventory.svg docs/media/cover.svg docs/media/style-atlas.svg
node scripts/check-public-snapshot.mjs --release
npm run test:registry
npm run test:unit
npm run check:components
npm run build:pages
```

## Public repository initialization guidance

- When publishing from a private research repository with legacy history or internal branches, prefer initializing a clean public repository from an approved tracked-files snapshot rather than exposing old internal branches, PR logs, or personal commit metadata.
- After publishing, verify GitHub repository metadata (About description, Topics, Social Preview), enable **Private vulnerability reporting**, **Secret scanning**, **Push protection**, **Branch protection** on `main`, and **GitHub Pages (GitHub Actions)** for live interactive previews.
- See [licensing](licensing.md), [visual showcase](visual-showcase.md), and [release maintenance](release-maintenance.md) for ongoing workflows.
