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

**Never infer a default** or silently replace an unsupported style. `precision-dark` now has TPL-005, an actual React/Vite page built using existing component exports. `--template=TPL-005` includes explicit `npm run dev:workbench` and component integration statuses; any other missing style/context match still rejects. React component library supports only its four declared themes; the fifth theme has no declared React package support. All four template demos are standalone HTML/CSS/JS, **not** bundled implementations of the React component package.

Run `node scripts/check-page-templates.mjs`, `node --test tests/compose-page.test.mjs` and `npm run test:browser` to inspect supported checks.

Codex input is in [REUSE-PROMPT.md](REUSE-PROMPT.md). Production review and target platform integration remain manual.

## V0.9 real React page

`node scripts/compose-page.mjs --template=TPL-005 --format=json` now reports `demoActuallyUsesReactLibrary: true`, and per-component `wired-in-demo`/`candidate-not-wired` statuses. Execute `npm run dev:workbench` (port 5175). **Only TPL-005** has verified source-level integration; TPL-001–004 remain independent static prototypes.
