# Registry × Slot Contract Lab · V0.40

**Three original independent and executable contract models.** This is a small metadata adapter + slot-tree + preview/confirm *reference specimen*. It is **not** a website builder, shadcn registry installer, public UI component, Agent service or production authorization layer.

| New ID | Source ESM model | Verified reference behavior | Explicit non-capability |
| --- | --- | --- | --- |
| IP-063 | [registry-adapter.mjs](registry-adapter.mjs) | Maps three curated **original fixture** source keys to existing V0.39 `BLOCK_DEFS`; checks IDs/props; marks all unknown external Registry entries review-only | No fetching, code import, shadcn registry compatibility, dynamic rendering or third-party item license grant |
| IP-064 | [slot-tree.mjs](slot-tree.mjs) | Typed Section/Stack slots, max 3 levels, 12 nodes, ownership, capacity, immutable insert/move and typed prop editing | No nested visual drag, arbitrary JSX, portals, React Tree or persistence |
| IP-065 | [command-preview.mjs](command-preview.mjs) | Local dry-run previews for insert/move/edit and explicit confirmation with revision and snapshot recheck | No genuine signature, client-to-server authentication, remote transaction, cryptographic integrity, file I/O or Agent command execution |

## Preview

From repository root run:
```sh
npm run dev:catalog
```
Open `http://127.0.0.1:8009/playground/registry-slots-v040/`. Choose an approved fixture source + target slot, preview insertion, then confirm. Try mapping a Hero to Stack.items to observe a rejected type. Preview a move or section layout change; discard to preserve current state. The nested tree and read-only JSON make the behavior inspectable.

### Exact slot rules

- Root nodes: only `section` blocks, maximum four roots.
- `section.content`: accepts `hero`, `feature`, `stack`; maximum four children.
- `stack.items`: accepts `feature`, `quote`; maximum three children.
- `hero`, `feature`, `quote`: leaf nodes. Every ID is unique and reachable from exactly one root. Maximum depth three, maximum 12 nodes.
- Props of leaf blocks reuse existing `BLOCK_DEFS` validation. Container props have exact enum choices; unknown fields, unsupported types and malformed IDs fail closed.

### Preview is not authorization

`previewCommand` produces a local-only candidate object; `confirmCommand` recomputes it against the current local Revision and snapshot. The consumer can mutate or impersonate this client runtime: it is not an approval authority or secure command queue. A real destination must authenticate, authorize target scopes, verify schema and canonical revision on the server, write/audit there and return a verifiable result.

### Testing

```sh
node --test tests/registry-slots-v040.test.mjs
npm run test:registry
npm run test:browser
```

Node tests exercise curated-only mapping, unknown fields, slot/type/capacity, duplicate ownership, detached nodes, root placement, immutable reparenting and preview tamper/staleness. Playwright checks preview-before-confirm, illegal insertion, move, discard, repeated-ID rejection and small viewport. Browser CI results prove only tested scenarios, not external source compatibility or mobile/assistive-technology certification.

## Reuse and asset policy

New IP-063..065 are `prototype / adapt-required` original references; existing V0.36–V0.39 research/prototypes remain unchanged. Do not import this laboratory as a compiled UI component. No third-party source, images, fonts, scripts or dynamic host content are copied. There is no new React export or global theme. For third-party registries, only retain provenance and compare **metadata** until per-item code/media licenses and actual target schema have been reviewed.

[Machine manifest](../../registry/registry-slots-v040.json) · [Research notes](../../docs/research/registry-slots-v040.md).