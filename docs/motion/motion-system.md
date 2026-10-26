# Motion & transitions — V0.7

Timing values in [motion registry](../../registry/motion.json) are research proposals, not copied vendor values.

## References

- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [MDN Using View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- [Google Chrome same-document transitions guidance](https://github.com/GoogleChrome/modern-web-guidance/blob/main/skills/modern-web-guidance/guides/ui-behaviors/same-document-transitions.md)

## Six rules

1. Motion communicates state change, never fabricates server success.
2. Check prefers-reduced-motion before invoking View Transitions, and disable motion with CSS.
3. Keep instant DOM update fallback for unsupported browsers.
4. After a view replacement, restore meaningful DOM focus. View Transitions do not manage it.
5. Editorial, SaaS, desktop and playful contexts must have separately justified timings.
6. Performance or screenshot success in one browser is not general compatibility.

## Reusable proposals

| Preset | Meaning | Suggested duration |
| --- | --- | --- |
| feedback-quiet | confirm a local action | 100ms |
| overlay-context | open/close contextual layer | 180ms |
| selection-reflow | preserve filtering continuity | 150ms |
| reward-tactile | intentional playful reward | 220ms |
| reading-calm | quiet reading transition | 120ms |

[Bold Grid](../../playground/bold-grid/README.md) implements progressive same-document transition; the [Interaction Lab](../../playground/interaction-lab/README.md) covers behavior semantics independently.
