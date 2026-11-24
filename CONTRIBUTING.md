# Contributing / 贡献指南

Contribute independently useful frontend materials, evidence-backed research or corrections. The repository is an asset library, not a place to develop a complete business application.

## Submit a useful contribution

1. Search [DISCOVER](DISCOVER.md) and [CATALOG](CATALOG.md) for related assets. Explain the gap or a genuinely distinct visual/behavioral approach.
2. Use a stable ID and add/update the canonical [registry](registry/README.md). Include precise source, documentation and demo paths; lifecycle, reuse boundary, style applicability, dependencies, provenance and license evidence.
3. Prefer small extractable source or original SVG. External material may be cited as research, but never copy code/media/paid UI/skills unless its redistribution rights are confirmed and attribution is retained.
4. Provide proportionate evidence: a minimal example, relevant checks, and explicit limitations. Research does not need fabricated runtime evidence.
5. Update the changelog and, if counts changed, regenerate the inventory graphic and update the dated table in [docs](docs/README.md).

```sh
npm run test:registry
npm run test:unit
# For React changes:
npm run check:components
node scripts/generate-public-overview.mjs
```

Use the repository issue templates to suggest a material, report a bug or give design feedback. Use the [pull request checklist](.github/pull_request_template.md) for a focused contribution describing added/changed IDs, sources and test scope. Avoid unrelated application development or wholesale directory moves. Preserve public links and stable IDs.

## Licensing and privacy

Original contributions for which you hold the necessary rights are submitted under the repository's [MIT License](LICENSE), subject to [license scope and attribution](NOTICE.md). Do not submit third-party content under MIT unless you have the right to do so; disclose its separate terms. Do not submit material that you cannot legally contribute. Preserve upstream license notices and do not include secrets, customer data, private workspace links, internal paths or personal project configuration. Publication gates are tracked in [docs/publication-readiness.md](docs/publication-readiness.md). See [community conduct](CODE_OF_CONDUCT.md), [security reporting](SECURITY.md), and [release maintenance](docs/release-maintenance.md).
