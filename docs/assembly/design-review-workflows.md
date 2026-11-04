# Optional Unslop × Hallmark design workflow router

Version: V0.13.1 · 2026-11-04. This is **local, original routing code and a planning handoff**, not a vendored copy or an installed version of either external Skill.

## What is now usable

From repository root (Node.js 22+):

```bash
npm run design:plan -- --mode=new-page --context="indie-game event landing" --format=markdown
npm run design:plan -- --mode=redesign --target="./src/app/page.tsx" --context="sci-fi game dashboard" --style=signal-noir
npm run design:plan -- --mode=audit --target="./index.html" --format=json
```

- **new-page → Hallmark (optional):** use existing Creative Director first when visual direction is open; only opt in to the upstream Skill for a separate design experiment.
- **redesign → Unslop (optional):** baseline source, content, actions and screenshots first; request a design argument and redline before editing.
- **audit → Hallmark (optional):** explicitly use its audit-only mode. Findings are extra evidence, not a mandatory replacement for WCAG, target behavior or the repository's independent art directions.

The planner produces structured JSON or a copyable Markdown design brief. It makes no source edits, installs no dependencies and accesses no network. Calling it does **not** prove the third-party tools are installed.

## Running the actual upstream Skills (separate, opt-in)

After inspecting upstream code/permissions, run external tools **in the intended target project's isolated branch/worktree**, not in this asset repository by default.

- Unslop: [source, installation and attribution](https://github.com/heydamir/unslop). Follow its official Codex or Claude Code install instructions, then invoke `$unslop` / `/unslop` with a concrete target.
- Hallmark: [source, installation and license](https://github.com/Nutlope/hallmark). Its upstream documentation provides `npx skills add nutlope/hallmark --agent codex` for project-local installation; use `$hallmark <prompt>` or the upstream audit mode only when intentionally selected.
- **Unslop CC BY 4.0**: credit the author for reproduced/adapted licensed material. **Hallmark MIT**: preserve required notices for copied code. Referenced photographs have separate rights.

Review commands and exact upstream paths against the installed version rather than assuming they never change. Do not auto-install globally, auto-invoke model-generated edits or auto-apply Hallmark's house-style lint to all local styles.

## Role in the asset repository

1. Determine the target user job, content, constraints, device and selected style, if any.
2. Use `npm run creative:brief -- --style=surprise --context="..." --seed=1` if you want diverse **research briefs**. It is not a page generator.
3. Generate a workflow handoff with `npm run design:plan -- ...`; give that brief to the agent operating on the **target application**, not to an unattended runner.
4. If external Skills are explicitly adopted there, keep source snapshot, functional checklist and before/after screenshots. Preserve API wiring, headings/actions, keyboard order and state.
5. Run project build/type/unit/browser checks plus 390/768/1440px visual review; disclose which checks were not performed. `npm run visual:capture` creates **unapproved** evidence, not a passing visual regression gate.

## Design-rule priority

Hard constraints: truthfulness, accessibility, functional preservation, licenses, responsive behavior. Contextual rules: typography, glow, experimental gradients, collages, pixel blocks and Hallmark's style-specific aesthetic bans. Human judgment: appropriateness, originality, hierarchy, brand and finish.

Related: [research comparison](../research/unslop-hallmark.md), [PR-013 contextual review](../../recipes/contextual-design-review.md), [design style matrix](../styles/decision-matrix.md).

## Verification

```bash
node --test tests/design-workflow-router.test.mjs
npm run test:registry
npm run test:unit
```

No upstream Skill or external UI was executed or installed by this change. Browser/screen-reader tests are not inferred from the planner tests.
