# REF-031 / REF-032 · Unslop and Hallmark research review

Reviewed: 2026-11-04. This document is an **original comparative analysis** of two external AI/frontend design skills. It links to original sources but **does not vendor, install, execute, or reproduce** either external Skill or its binaries.

## Why these two references matter

The repository already maintains **ten independent art-direction profiles**, seven full-page blueprints, an asset explorer, a seeded creative-director research CLI, plus React UI state and screenshot evidence tools. The gap is a repeatable **aesthetic critique and review workflow**. More palettes alone do not prevent templated design.

| Dimension | [heydamir/unslop](https://github.com/heydamir/unslop) | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) |
| --- | --- | --- |
| Best role | Revise existing AI-looking UI with a product-specific design direction | Build a page from a design brief, or explicitly audit/redesign an existing page |
| Mechanism | Screenshot/source inspection, slop audit, directional redline, sequential refinement | ~50 independent material themes, layout anatomy, rule tiers, Node-based sloplint and browser review |
| Agent support | Claude Code and Codex skill | Claude Code, Codex, Cursor and OpenCode |
| Output | Actual edits to user's source when access exists; optional snapshot/story video | Design artifacts, audit findings and optional in-place redesign; source/render lint |
| External dependencies | Browser capture via Playwright; story videos use ffmpeg; optional paid image generation by separate consent | Node 18+; optional puppeteer-core + Chrome for browser checks; photo references have separate licenses |
| License | [CC BY 4.0](https://github.com/heydamir/unslop/blob/main/LICENSE), keep author attribution for adapted/reproduced licensed material | [MIT](https://github.com/Nutlope/hallmark/blob/main/LICENSE), preserve copyright/license notice for reused code |
| Repo integration | Link as external audit Skill, not automatically run on every output | Link as optional design generator and checker, not a global policy replacement |

Primary code reviewed: [Unslop SKILL.md](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md), [Hallmark SKILL.md](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/SKILL.md), [Hallmark gates](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/gates.md), [Hallmark review](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/review-finish.md), [Hallmark sloplint](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/scripts/sloplint.mjs). Verify source version before installing: the projects may change.

## What to learn (without wholesale adoption)

### Unslop: contextual correction, not a universal minimalist style

- Treat obvious AI defaults as possible symptoms: indiscriminate glow, generic purple gradients, repeated "hero + three cards", emoji labels, inconsistent spacing and unsubstantiated claims.
- Inspect screenshots and the true user action before changing code. Keep actual features, important user content and navigation.
- Propose a product-specific design argument before the cosmetic passes. Rework hierarchy, typography, layout and motion in a controlled sequence; compare actual screenshots afterward.
- **Aesthetic exceptions matter**: neon and glow can be essential to a science-fiction game, pixel labels are appropriate to an arcade, and a collage may deliberately overlap. Reject generic treatment, not stylistic expression.

### Hallmark: generative variety plus structured review

- Strong contribution: a diversity of **style materials** and **page anatomy** rather than 50 shades of the same SaaS shell.
- Strong engineering idea: separate *hard usability and honesty failures* from *model default habits* and *finish/craft observations*. Combine automated source/browser evidence with a fresh-context visual review.
- The released Skill defines its own stricter **house rules**. Several are aesthetic mandates rather than general accessibility laws: bans on eyebrow labels, tracked capitals, gradients, or italics may make sense for its anti-template brief but conflict with Pixel Arcade, Signal Noir or a commissioned experimental editorial design.
- Therefore **do not apply Hallmark's full Floor tier as the repository's mandatory global lint**. Use its checker only in a deliberately Hallmark-targeted workflow; report any theme-specific exceptions and evaluate actual usability independently.
- Hallmark's photos include a separate attribution/usage inventory. Its MIT license does *not* automatically grant commercial rights to all linked photographs and external source content.

## Relationship to current internal assets

| Existing local asset | What remains | What these references can complement |
| --- | --- | --- |
| `registry/creative-directions.json` / `scripts/creative-director.mjs` | Reproducible idea generation across independent genres | Hallmark's broad material library and layout-anatomy thinking |
| `styles/*` / `playground/creative-style-lab` | Original code and experimental interactions | Contrast product-specific signature elements with anti-template criteria |
| `registry/component-states.json` | Real React controlled states; 12 of 18 selected exports covered | Audit UI feedback states rather than merely page aesthetics |
| `scripts/visual-evidence.mjs` | SHA-256 screenshot evidence, **not human-approved pixel baselines** | Provide before/after screenshots and evidence for independent human review |
| `scripts/check-registry.mjs`, `scripts/contrast-audit.mjs` | Machine asset integrity and certain solid-text contrast pairs | External lint remains complementary, never an authority on image semantics or design taste |

## Engineering/security boundaries

- **No silent global Skill installation.** These tools may edit files, run child processes or load live pages; review source and install into a scratch project or isolated branch first.
- **No unapproved external media.** Do not bundle Hallmark image catalogs or Unslop sample art into this repository without applicable attribution and usage review.
- **No blind re-layout.** Existing design must preserve functionality, business copy, keyboard/semantic paths and source compatibility; tests before/after are required.
- **No one-score aesthetics certification.** Automated lints flag symptoms and accessibility candidates; actual composition, appropriateness and human preference require a reviewer.
- No source dependency was added for these external projects. This evaluation is a reference only.

## Practical decision

1. **New original design:** start with the project's user/job/context and our Creative Director; optionally use Hallmark in an opt-in branch to generate alternate visual approaches.
2. **Already built AI-looking page:** apply Unslop after recording baseline screenshots, and request an explicit design direction/redline before allowing edits.
3. **Independent QA:** run the existing browser/type/token checks and a fresh-context human review. Use Hallmark lint as extra evidence only where the chosen design scope allows its house rules.
4. **Long-term governance:** cite the skill origins in an optional workflow guide. Do not elevate either repository into a mandatory dependency.
