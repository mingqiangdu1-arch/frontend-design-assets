# Reuse and integration checklist

This is a source/reference workspace; the live AI WORKFLOW PLATFORM is not modified.

## Selecting assets

1. Identify the application profile: product category, audience, platform, interaction goal, brand direction, required density and runtime stack. No default theme is implied.
2. Search `registry/assets.json` for tags / IDs; inspect at least one alternative.
3. Select an explicit style via `registry/styles.json`, or define a new one; record chosen versions, source URLs, licenses and dependencies.
4. Map theme-specific semantics via its scoped tokens. Never load a different application's theme globally or hand-copy arbitrary styling.
5. Start isolated playground; only then wrap/adapt to target framework.
6. Validate keyboard, touch, aria roles, focus and reduced motion.
7. Test state lifecycle: empty, loading, success, error, canceled and undo where applicable.
8. Verify integration does not alter business rules, APIs, auth, routing or data persistence.
9. Mark `production-ready` only after actual target project acceptance.

## Release boundaries

- Third-party inspiration is not a reusable implementation.
- Prototype HTML is not equivalent to a typed, tested React component.
- Unproven integrations cannot have green production badges.
- Sources and design decisions retain traceability through stable asset IDs and changelog.
