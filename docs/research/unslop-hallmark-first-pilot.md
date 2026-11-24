# Unslop × Hallmark · First controlled pilot (TPL-005)

**Status:** real source modification and automated checks proposed in a dedicated PR, 2026-11-04. This is not a claim of production integration or certified visual quality.

## Target and baseline

- Source: `playground/precision-workbench/src/main.tsx`, `src/styles.css`, `styles/precision-dark/tokens.css`
- Context: a dense, fictional developer work queue with six issues, status filtering, keyboard commands, detail inspector and in-memory undo.
- Reference baseline: Git commit `eb758304190538f0e88fd22e299c65b675468296` on `main`.
- Product contract: retain all six issue records, copy, navigation, search/filter behavior, inspector, mobile focus trap, status undo and local-only disclaimers.
- Design direction: **Precision Dark is deliberately a compact, muted professional workbench**. Keep its accent and command-driven UX; do not erase the genre for a universal minimalist look.

## Source audit (Unslop-inspired, independently interpreted)

The original stylesheet used 11px issue titles and 10px status-filter labels inside 32px-tall targets, with several 9–11px work labels and sidebar text. Those values are legible for some users at browser defaults but provide weak affordance and poor comfort for a primary work queue. Focus styles were not explicitly defined for the app's native status filters, issue rows and sidebar navigation, making visibility depend on user-agent defaults.

Other generic-ai look indicators (e.g. purple accent, uppercase micro-labels, three compact metrics) are **not automatically defects** here; the page's use is an inspection-heavy developer console. A product-specific review should retain useful density while clearly prioritizing issue titles, states and actions.

## Intervention

- Issue title 11→14px; filter label 10→12px and minimum filter target 32→40px.
- Improved sidebar/team, metric, issue metadata, toolbar and inspector text hierarchy with targeted CSS adjustments.
- Added explicit 2px token-colored `:focus-visible` outlines to app-owned clickable elements. Buttons in library components keep their own focus behavior.
- Moved page-specific team/overlay colors into scoped Precision Dark JSON+CSS tokens, replaced an unscoped body background literal with a token fallback, and avoided `100vw` for narrow inspector width.
- Did **not** rename the app, introduce decorative gradients, generate claims, touch React business logic, change issue fixture data or install any upstream Skill.

## External Hallmark lint pilot

The optional GitHub Action `design-review-pilot.yml` checks out upstream [Nutlope/hallmark](https://github.com/Nutlope/hallmark) at pinned SHA `52328cb3129135499e4e178d4864ee90029dea2b` (2026-11-03). Its actual `sloplint.mjs` runs in CI on both baseline and candidate source, source-only/JSON mode. It does not invoke the generator, fetch images, authenticate to model APIs, run Puppeteer, or modify the inspected sources.

Raw JSON evidence and a short gate summary are uploaded as CI artifacts. This is *advisory*: Hallmark `FAIL` and `REFLEX` may encode its own immutable editorial house rules rather than WCAG violations. A reduction in gate counts would not itself prove superior design; review concrete rules and screenshots.

Unslop is a prompt-driven design Skill, not a standalone guaranteed-redesign CLI. Here its upstream instructions guide a manual, scoped critique and real CSS patch; **the upstream Unslop agent was not invoked**.

## Verification

- Unit/type/build/browser jobs must pass; this PR adds a real browser test measuring issue title font size, filter-label size, hit-box height and keyboard focus outline at 390/768/1440px.
- Existing tests must still verify six issues, search/filter, command keys, inspector, status update/undo, responsive overflow and mobile focus return.
- Screenshot capture in CI provides evidence, *not* an approved visual baseline. Pixel review by a person, Firefox/Safari and assistive technology remain open.

## Long-term asset decision

Keep extracted **design-review heuristics** independent of style aesthetics: prioritize primary work content, visible keyboard focus, sufficient hit areas, preserved behavior and before/after evidence. Do not add a new visual Style Profile. If browser checks pass, the experiment can be referenced as a repeatable before/after case, not as a universal design patch.

Related: [PR-013](../../recipes/contextual-design-review.md), [V0.13.1 routing](../assembly/design-review-workflows.md), [existing visual acceptance policy](../quality/visual-review.md).

## First CI evidence (2026-11-04)

- Pinned Hallmark baseline/candidate audit (historical private actions/runs/41810639853) completed. The tool itself returned nonzero in both cases; the advisory workflow successfully retained JSON output rather than treating aesthetic rules as hard universal failures.
- Baseline: **75 findings** (19 FAIL, 54 REFLEX, 2 WARN). First candidate: **73 findings** (18 FAIL, 53 REFLEX, 2 WARN). An explicit `:focus-visible` rule removed a material failure.
- Some outstanding warnings are Hallmark house rules, including its CSS stamp, eyebrow headings and uppercase micro-labels. They are not automatically defects in Precision Dark.
- The audit also identified a potential `100vw` scrollbar overflow and hardcoded page-specific colors. A second iteration addresses both with local tokens and tests. Compare against the latest CI run for the final measurements; these counts describe the **first candidate only**.
- First audit evidence artifact (historical private actions/runs/41810639853) includes raw JSON and stderr for baseline/candidate.
