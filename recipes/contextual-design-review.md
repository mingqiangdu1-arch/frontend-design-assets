# PR-013 · Contextual anti-template design review (optional agent workflow)

Status: analyzed research recipe. **Not an executable installed Skill**, not a production UI quality certification.

Purpose: allow AI-powered frontend work to express a distinctive and appropriate design language **without** reverting to the same safe composition or banning purposeful experimental motifs. Based on original repository experience plus [Unslop](../../docs/research/unslop-hallmark.md) and [Hallmark](../../docs/research/unslop-hallmark.md), with credit and links to original projects.

## Phase A — Capture the actual problem

Record: target application, primary audience and job-to-be-done, tech stack, agreed content, interactions/API wiring that cannot change, style selected (if any), intended devices, and important design constraints. Inspect source *and* rendered screens; save screenshots in CI artifacts or a temporary review folder with context and dates. Do not invent content metrics or assets.

## Phase B — Generate sufficiently different directions

- If user explicitly chose a style, respect it; do not auto-swap it for a default. If open-ended, use `node scripts/creative-director.mjs --style=surprise --seed=<stable> --context="<product job>" --count=3` to create research briefs.
- Require each proposed direction to state one clear design idea, distinctive layout grammar, typography and one or two memorable signature moments.
- Ask **why this is appropriate to the task**. A generic clean page with a new accent color is not a new direction.
- External Hallmark may offer additional layout/material exploration, **only if explicitly enabled**. Its 50 themes are external references, not 50 new local Style Profiles.

## Phase C — Protect function, remove generic repetition

Review the actual output against:
1. **Job:** Can the visitor complete the primary task without guessing? Is the content real and sufficiently complete?
2. **Hierarchy:** Does the important information become clear in the first relevant viewport, not buried under decorative hero chrome?
3. **Craft:** Is spacing/typography/iconography consistent? Does the imagery actually show this product's world?
4. **Deliberate expression:** Can a reviewer name the one distinctive composition choice? Are unusual effects justified by the product or story?
5. **Accessibility:** Does the content have semantic order, keyboard paths, focus, text contrast, meaningful labels and reduced-motion behavior?
6. **Truth and safety:** No invented claims, fabricated metrics, fake submission success, fake checkout, unauthorized art or false "real data" indicators.

**Rule classification:**
- **Required guardrails:** truthful content/state, keyboard usability, text readability, no unexpected destructive actions, preservation of functional contracts, attribution/media permissions.
- **Negotiable heuristics:** "no eyebrow headings", "no tracking", "no glowing surfaces", "no unusual gradients", "never use emoji" and other anti-template aesthetics. They may improve generic dashboards but must be challenged against genre, audience and visual intent.
- **Human finish:** visual rhythm, memorability, originality, brand congruence, coherence across viewport widths.

## Phase D — Controlled revision

- For an existing page, make a before/after list of user-visible features, headings, actions and data dependencies. Preserve all unless the user requested product changes.
- Implement on a branch. An Unslop pass is **opt-in**, not a background auto-edit. Inspect any skill scripts and keep attribution if copying licensed material.
- Run: project-specific unit/build/type tests, keyboard and responsive smoke, 390/768/1440 screenshots, and `npm run visual:capture`. Add direct human screenshot comparison; raw SHA hashes only establish file identity.
- Review whether any new shape/animation introduced layout or assistive-technology regressions; document remaining unknowns.

## Phase E — Handoff

Return:
- The chosen direction and why it fits the use case.
- Changes made, or explicit recommended changes if this was audit-only.
- Features and interactions preserved; regressions/unknowns.
- Test evidence and **unapproved** screenshots.
- Credits and licensing notes for reused external artifacts.

### Example opt-in agents

- **Unslop on existing code:** the upstream project's `$unslop` Skill, run manually in a worktree after code and screenshot snapshot.
- **Hallmark to design or audit:** upstream `$hallmark` Skill, respecting its scope and aesthetic house rules. Do not apply its linter to every repository style.
- **Local first:** `node scripts/creative-director.mjs --style=surprise --seed=<seed> --context="<task>" --count=3`.

Upstream projects are **not installed or vendored** in this repository. See [comparative research](../docs/research/unslop-hallmark.md) for licensing and source links.
