# Research source register · 2026-10-23

**Research ≠ licensing.** URLs below are inspiration/documentation sources. No source's screenshots, trademarks, paid library code or font binaries are included without separate permission.

| Ref | Source | Use | Access |
|---|---|---|---|
| REF-001 | [Attio Record Page redesign](https://attio.com/changelog/2026/record-page-redesign) | shallow backgrounds, adjustable panel layout, density | product documentation |
| REF-002 | [Vercel Geist](https://vercel.com/geist/introduction) | component behavior, typography, tokens, accessibility | official public design system |
| REF-004 | [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) | interaction/motion rules and resilience | guidelines |
| REF-005 | [Linear Peek](https://linear.app/docs/peek) | contextual keyboard preview | official behavior docs |
| REF-006 | [Linear issue selection](https://linear.app/docs/select-issues) | multi-select, keyboard efficiency | official behavior docs |
| REF-007 | [Mobbin](https://mobbin.com/) | screen and animation references | partial paywall; not fully audited |
| REF-008 | [Refero](https://refero.design/apps) | real SaaS screenshots and flows | may require login |
| REF-003 | [60fps.design](https://60fps.design/) | animation mechanics and inspiration | visual collection |
| REF-009 | [Design Spells](https://designspells.com/?tag=interaction) | microinteraction inspiration | creative showcases |
| REF-010 | [Motion examples](https://motion.dev/examples/react-smooth-tabs) | live tabs, layout transitions | demos; some paid content |
| REF-011 | [Microinteractions.dev](https://microinteractions.dev/) | targeted UI feedback experiments | interactive showcase |
| REF-012 | [SaaSUI Attio](https://www.saasui.design/application/attio) | screenshots/cross-page visual benchmarking | screenshots |
| REF-013 | [Radix Primitives](https://www.radix-ui.com/primitives) | accessibility behavior foundation | open-source dependency; verify license/version |
| REF-014 | [shadcn/ui](https://ui.shadcn.com/) | component architecture reference | open-source; verify license/version |
| REF-015 | [Lucide](https://lucide.dev/) | consistent outline icon vocabulary | verify icon license/version |

## Selection criteria

Prefer source with real, observable interaction or official documentation over shots with no behavior. Store observed facts and proposed adaptations separately. Do not assert exact measured duration/frames without video or code inspection.

## Notion sources

- [Research collection]([private-notion-link-redacted])
- [Living asset catalog]([private-notion-link-redacted])

## SaaS-focused source review (2026-10-23)

- [Geist Table](https://vercel.com/geist/table) — semantic data rows, sortable header buttons, relative time, empty state.
- [Geist Skeleton](https://vercel.com/geist/skeleton) — loading vs empty, layout stability, reduced motion.
- [Geist Menu](https://vercel.com/geist/menu) / [Context Menu](https://vercel.com/geist/context-menu) — local actions, keyboard and disabled/permission behavior.
- [Attio Understanding Records](https://attio.com/help/reference/attio-101/attios-data-model/understanding-records) — sorting, filtering, saved views and personal changes.
- [Attio Configure Record Pages](https://attio.com/help/reference/managing-your-data/records/configure-record-pages) — tabs, layout, sections and contextual hierarchy.
- [Attio 2026 Record Page](https://attio.com/changelog/2026/record-page-redesign) — compact vs standard lists, resizable panels.

These links evidence principles and observed behavior, not production code or exact source Tokens.

## SaaS editing and advanced-filter study (2026-10-23)

- [Atlassian Inline Edit](https://atlassian.design/patterns/inline-edit/) — read/edit/confirm/cancel state and accessible action affordances.
- [Atlassian Inline Editable Text Field](https://atlassian.design/components/inline-edit/inline-editable-textfield/usage) — when inline edit is appropriate; avoid editing a whole-page primary document inline.
- [Vercel Geist Input](https://vercel.com/geist/input) — blur validation, helper text, keyboard and form input.
- [Vercel Geist Error](https://vercel.com/geist/error) — field/action/section-level error distinctions.
- [Linear Advanced Filters](https://linear.app/docs/filters) — AND/OR nested group behavior.
- [Linear Custom Views](https://linear.app/docs/custom-views) — temporary filter vs saved/shareable views.
- [NN/g Expectations of Save](https://www.nngroup.com/articles/efficiency-vs-expectations/) — explicit saving and user mental models.

## Independent visual styles V0.4

- Precision Dark: [Linear design refresh](https://linear.app/now/behind-the-latest-design-refresh), [Raycast Themes](https://manual.raycast.com/themes). Keyboard-first compact professional workspace reference.
- Editorial Warm: [Notion content styling]([private-notion-link-redacted]), [Substack theme help](https://support.substack.com/hc/en-us/articles/360055169471-How-do-I-set-a-custom-theme-for-my-Substack). Reading-first, serif-led publication direction.
- Playful Pop: [Duolingo visual shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/), [Duolingo core tabs redesign](https://blog.duolingo.com/core-tabs-redesign/). Rounded/tactile/feedback-oriented design direction.

These references do not license copying vendors' UI, artwork, trademarks or fonts; generated screens and numeric token suggestions are original proposals.

## V0.7 visual, accessibility and motion evidence

- [Webflow Web Design Lookbook / Brutalism](https://webdesignlookbook.webflow.io/) — descriptive high-contrast layout and exposed structure research. No copying of official visual assets.
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) and [Usage](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using) — same-document transitions and fallback semantics.
- [W3C WAI-ARIA APG listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) / [rearrangeable examples](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-rearrangeable/) — focus/reordering and why nested interactive listbox options are not appropriate.
- [Google Chrome modern web guidance](https://github.com/GoogleChrome/modern-web-guidance/blob/main/skills/modern-web-guidance/guides/ui-behaviors/same-document-transitions.md) — reduced motion and DOM focus after transitions.
