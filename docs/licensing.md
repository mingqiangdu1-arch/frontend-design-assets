# Licensing and attribution / 授权与来源审查

**Root license: MIT, owner-authorized for original material on 2026-11-24.** Read [LICENSE](../LICENSE) together with [NOTICE](../NOTICE.md). Third-party material is not relicensed. Publication and content-level rights checks remain separate.

| Material | Rights boundary |
| --- | --- |
| Owner-authored original code, scripts, tokens, examples, documentation, diagrams and SVG artwork | MIT |
| Research links and external design references | Upstream rights retained; only original local commentary falls within the root grant |
| Seven bundled upstream skills and dependencies | Their respective license and copyright notices govern |
| Two Vercel skill sources | Pinned external links only; local mirrors excluded |
| Unknown or conflicting rights | Do not redistribute until resolved |

## Registry metadata

All registered entries in `registry/assets.json` declare an explicit `license` field distinguishing owner-authored original materials from upstream research references (including non-MIT upstream licenses such as Shopify's theme license or ELv2/SSPL, which are strictly `research-only` with no copied upstream source).

**100% metadata coverage is enforced by CI, and records stated boundaries rather than granting third-party rights.** Always verify upstream terms, trademarks, fonts, and media separately before reusing external references in a target product.

## Third-party skills

Seven pinned upstream skill license files match their upstream Git blob SHA and text. Both Vercel skill mirrors have been excluded and retained solely as pinned upstream references. See [third-party notices](../.agents/skills/THIRD_PARTY_NOTICES.md) and [external source manifest](../.agents/skills/EXTERNAL_SOURCES.json) for exact provenance.

## Checkout preflight

```sh
node scripts/check-public-snapshot.mjs
node scripts/check-public-snapshot.mjs --release
```

The release mode checks root license, scope notice, `package.json` license metadata, registry license coverage, excluded skill paths, approved showcase binaries, and privacy/secret patterns. Passing these mechanical checks does not constitute independent legal clearance.
