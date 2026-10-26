# Page composition CLI · V0.8

This is a **deterministic asset selection and assembly-brief generator**, NOT a one-click app builder. It does not run AI, install dependencies, edit an application or generate compiled frontend code.

## Commands

```bash
node scripts/compose-page.mjs --list
node scripts/compose-page.mjs --list --context=reading
node scripts/compose-page.mjs --template=TPL-002 --format=markdown
node scripts/compose-page.mjs --template=TPL-003 --format=json
node scripts/compose-page.mjs --style=neo-brutalist --context=campaign --format=markdown
node scripts/compose-page.mjs --template=TPL-002 --format=markdown > my-page-brief.md
```

Output: explicit template/style binding, source and demo, Token CSS, reference IDs, layout sections, optional React component candidates (clearly marked *not wired*), implementation steps and human acceptance checklist.

**Never infer a default** or silently replace an unsupported style. `precision-dark` has a dedicated Style Explorer but not yet a standalone Page Blueprint: this command rejects it rather than inventing a page. React component library supports only its four declared themes; the fifth theme has no declared React package support. All four template demos are standalone HTML/CSS/JS, **not** bundled implementations of the React component package.

Run `node scripts/check-page-templates.mjs`, `node --test tests/compose-page.test.mjs` and `npm run test:browser` to inspect supported checks.

Codex input is in [REUSE-PROMPT.md](REUSE-PROMPT.md). Production review and target platform integration remain manual.
