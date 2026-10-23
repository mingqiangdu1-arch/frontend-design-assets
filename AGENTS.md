# AI / Codex Agent Instructions

This is a **living frontend asset repository**, not the AI WORKFLOW PLATFORM business application.

## Primary goal

Continually collect, evaluate, prototype, test and reuse visual/interaction patterns. **Never rewrite the entire library when adding one asset.**

## Before making changes

1. Read `README.md`, `registry/assets.json`, related design docs and existing assets.
2. Search for duplicate/similar items and link an existing asset or document the difference.
3. Distinguish inspiration (third-party product) from original code (repository).
4. Preserve stable asset IDs, filenames, references, and past snapshots unless a migration is explicitly requested.
5. Prefer narrow changes with a traceable commit.

## Asset lifecycle

- `captured`: URL / screenshots and description only.
- `analyzed`: documented trigger, states, transitions, accessibility and alternatives.
- `prototype`: standalone executable proof of concept, not production-ready.
- `reference-implemented`: implementation exists but target integration unverified.
- `validated`: repository tests and manual interaction checklist pass.
- `production-ready`: explicitly verified inside target project.

Never label an asset production-ready merely because it renders.

## Source and licensing

Keep source URLs, design references, author attribution and license notes. Do not bulk copy proprietary UI, logos, paid assets, font files, or screenshots without permission. Original reimplementations should not impersonate source brands. Every integration needs a license review.

## Visual baseline

Default: Refined Light SaaS, inspired by Attio's subtle space and Vercel's hierarchy; not an exclusive design constraint. New themes and patterns can coexist.

## Interactive behavior quality bar

Support keyboard navigation, focus restoration, Escape behavior where appropriate, empty/loading/error/success/cancel states, narrow widths, accessible names and reduced motion. Avoid animated ornamentation. No autoplay continuous UI flourishes.

## Working with current demo

Read `playground/initial-interaction-lab.html`. It is a standalone *prototype*. Run via local static HTTP server for browser-agent inspection; no external dependencies are required.

## Reusing in AI WORKFLOW PLATFORM

Do not touch the business project unless separately requested. Adopt one pattern at a time and preserve existing routes, auth, API, state machines, persistence, tests and rollout behavior. Compare candidate options and show tradeoffs before implementing.

## Recordkeeping

Update `registry/assets.json` + affected docs + `CHANGELOG.md` for a material new asset or change. Keep Notion entry URL when known. Existing Notion catalog: [private-notion-link-redacted] .
