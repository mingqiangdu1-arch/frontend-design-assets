# Registry Metadata Compatibility Lab · V0.41

**Original read-only shadcn Registry metadata interoperability reference**, not an installer, component mirror, UI package, production parser or complete web editor. Three source-pinned metadata-only official item examples (`button`, `alert-dialog`, `login-04`) are manually transcribed from the MIT-repository's V4 registry lists at Git commit `8ab27715521cbd4f87ae6886cd989cbb678f6de7`. No upstream source code, images, fonts or file contents are copied.

| New ID | Original ESM source | What actually works | What is intentionally unsupported |
| --- | --- | --- | --- |
| IP-066 | [registry-item-parser.mjs](registry-item-parser.mjs) | Subset of official `registry-item.json` common fields, npm/dev/Registry dependencies, file paths/targets, pinned provenance, content stripping and unsafe path rejection | Runtime/code import, complete official JSON Schema verification, target path installation, remote source fetching or license authorization |
| IP-067 | [dependency-graph.mjs](dependency-graph.mjs) | Topological ordering among **only the three reviewed local records**, unresolved/remote address classification, npm version conflict evidence and synthetic snapshot diffs | Network traversal, external dependency resolution, npm security scanning or package installation |
| IP-068 | [metadata-migration.mjs](metadata-migration.mjs) | This library's own normalized snapshot `formatVersion` 1.0→2.0 migration and read-only file/version/dependency comparisons | Upstream shadcn schema migration, compatible component versions, source-code migrations or project files modification |

## Reproducible official source evidence

- [Pinned UI registry list](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui/_registry.ts): `button`, `alert-dialog`.
- [Pinned block registry list](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/blocks/_registry.ts): `login-04`.
- [Official registry-item schema reference](https://ui.shadcn.com/docs/registry/registry-item-json): dependencies, registryDependencies, devDependencies, files, target, cssVars.
- [Parent repository MIT license](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/LICENSE.md): repository-scoped evidence only. It does not clear rights for embedded media or independently licensed packages.
- [Local curated metadata-only fixture](official-metadata-fixtures.json): does not contain JSX/CSS, bundled `files[].content`, images or binary artifacts.

## Preview

From repository root run:
```sh
npm run dev:catalog
```
Then open `http://127.0.0.1:8009/playground/registry-metadata-v041/`. Switch between three reviewed items to view source file metadata and their read-only dependency graph. Click internal V1→V2 migration (this repository's format only) or simulate an added npm dependency; simulated content is labeled as not an upstream fact. Browser page requests only its local static metadata JSON, not external code or registries.

## Testing

```sh
node --test tests/registry-metadata-v041.test.mjs
npm run test:registry
npm run test:browser
```

Node tests cover pinned official values, provenance, metadata content stripping, path traversal, unknown fields, HTTPS-only address classification, npm scopes, graph traversal, unresolved packages, cycles, version conflicts, internal snapshot migration and diff. Browser tests cover item selection, file/target display, unresolved dependencies, migration and synthetic diff at 390px.

## Safety and limitations

- Parser is a **deliberate read-only subset**. Unknown item fields and CSS/tailwind metadata are tagged for review rather than applied. File target aliases are preserved as labels only, never converted into writable target paths.
- External Registry addresses (`@namespace`, GitHub refs, HTTPS URLs and local files) are classified but never recursively accessed; unreviewed dependencies and unresolved builtins are not treated as installed.
- `files[].content`, when present, is discarded and flagged; it cannot be rendered, written, executed or exported from normalized output.
- Upstream Registry entries have no usable version-migration contract in this sample. Source reproducibility comes from a pinned Git commit; **`formatVersion: 1.0/2.0` means only the repository's own metadata envelope**.
- Stage `prototype / behavior-pattern / adapt-required`, no React public export, no new theme, no npm dependency, no third-party UI code imported and no production target-app compatibility claim.

[Machine catalog](../../registry/registry-metadata-v041.json) · [Research crosswalk](../../docs/research/registry-metadata-v041.md)