# Evidence & severity / 证据等级

| Level | Source available | What can be said | What remains unknown |
| --- | --- | --- | --- |
| E0 description | user-provided requirements only | likely concerns, recommended checks | all implementation behavior |
| E1 static screenshot | visible pixels/design only | visual hierarchy, spacing, clipping in shown viewport, apparent contrast | actual DOM semantics, keyboard, states, other widths |
| E2 inspected source | code and files | present handlers, structure, state guards, imports, CSS definitions | runtime integration, real device rendering and correctness |
| E3 exercised demo | browser interaction / captured behavior | specific observed actions and viewport results | untested flows, real-world scale |
| E4 integrated target evidence | host app tests + deployment evidence | precisely tested paths and environment | all paths not exercised, unknown product outcomes |

These levels are **descriptive**, not certification badges or numerical quality scores.

| Severity | When to use | Example |
| --- | --- | --- |
| Blocker | core workflow impossible, high-risk semantic failure, or data integrity issue | user cannot complete submit; destructive action has no acknowledgement |
| Major | important task degraded or inaccessible to a substantial input method | keyboard can't reach crucial gallery or actions |
| Minor | polish defect without blocking principal task | noncritical spacing issue in narrow footer |

## Example review entry (based on evidence, not a real bug claim)

- **Target**: hypothetical narrow-screen figure grid.
- **Evidence**: E1, screenshot at 375 CSS pixels only.
- **Finding**: caption appears clipped at the right edge in provided screenshot.
- **Impact**: users may miss required image context.
- **Severity**: major if caption essential; minor if decorative.
- **Smallest fix**: set child `min-width: 0`, allow label wrap and re-evaluate with the actual host font; verify 320px and long CJK labels.
- **Unknown**: keyboard access, focus styles, WCAG contrast conformance and all runtime states.

Do not claim automated audits, color contrast measurements or “pass” unless run and recorded. Observed sources and performed tests belong in every conclusion.
