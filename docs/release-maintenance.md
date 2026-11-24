# Public release and maintenance / 公开发布与维护

## Repository presentation

Suggested GitHub About description (English):

> Multi-style frontend design assets, original SVGs, React reference components, and agent-friendly discovery.

Suggested topics: `frontend`, `design-assets`, `ui-design`, `design-system`, `design-tokens`, `react`, `css`, `svg`, `interaction-design`, `ui-components`, `ai-agents`, `agent-skills`.

Suggested Website URL (after enabling GitHub Pages): `https://mingqiangdu1-arch.github.io/frontend-design-assets/`.

Keep the repository name `frontend-design-assets`. Do not claim an official npm distribution, production-ready UI kit, page builder, or hosted SaaS service. Export [cover.svg](media/cover.svg) as a 1280 × 640 PNG for the repository Social Preview. Disable unused Wiki and Projects tabs to keep navigation clean.

## Contribution triage

| Issue | First decision | Outcome |
| --- | --- | --- |
| New asset or research | Distinct use, verified public source, reuse boundaries | Accept research or independently useful source; otherwise explain |
| Bug or documentation correction | Reproduction and affected stable ID | Small, evidence-backed correction |
| Visual or interaction feedback | Context, viewport, source and intended behavior | Scoped design or accessibility improvement |
| Private information, credentials or security | Do not discuss sensitive evidence publicly | Follow the private reporting route in [SECURITY](../SECURITY.md) |

Use the repository's issue/PR templates. Suggested labels: `asset-suggestion`, `bug`, `design-feedback`, `documentation`, `research-only`, `license-review`, `needs-reproduction`.

## Version semantics

- Asset collection expansion versions (for example V0.65) track research and material batches in [CHANGELOG](../CHANGELOG.md). The root package and component registry have separate historical version numbers; do not synchronize them cosmetically.
- Public snapshot releases are repository-level tags (such as `catalog-v0.65.0`), distinct from npm package releases.
- Keep `package.json` `"private": true` to prevent accidental npm publication.

## Release checklist

1. Ensure registry changes, changelog, and generated graphics are synchronized:
   ```sh
   node scripts/generate-public-overview.mjs
   node scripts/generate-public-visuals.mjs
   git diff --exit-code -- docs/media/inventory.svg docs/media/cover.svg docs/media/style-atlas.svg
   ```
2. Run full preflight and test checks on Node 22+:
   ```sh
   node scripts/check-public-snapshot.mjs --release
   npm run test:registry
   npm run test:unit
   npm run check:components
   npm run build:pages
   ```
3. Refresh curated `1280 × 800` screenshots via `npm run screenshots:public` (or `.github/workflows/prepare-public-showcase.yml`) when showcase demos change.
4. Confirm GitHub repository settings: **Private vulnerability reporting**, **Secret scanning**, **Push protection**, **Branch protection** on `main`, and **GitHub Pages (GitHub Actions)**.
5. Tag and publish release notes summarizing new/changed asset IDs, license exceptions, and verified checks.
