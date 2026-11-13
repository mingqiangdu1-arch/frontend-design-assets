# State contract template / 状态契约

Use for one interaction at a time. Separate *implemented* behavior from *desired* behavior.

### Example: asynchronous filter apply (proposed contract only)

| Current | Event | Guard | Next | Visible feedback | Recovery |
| --- | --- | --- | --- | --- | --- |
| idle | change filter | valid option | dirty | pending selection announced | restore previous |
| dirty | apply | not already pending | pending | busy indicator + clear label | cancel if transport supports it |
| pending | success | response belongs to current query | success | results count and summary | edit filter / clear |
| pending | failure | stale/failure response | error | actionable error message | retry preserving selection |
| any | reset | allowed | idle | reset selection + content | undo reset if history supported |

Do not promise cancellation if request transport is not abortable; never mark network success simply because CSS animations finish. Real response ownership and permissions live in the host project.

### Input and accessibility clauses
- Keyboard: Enter/Space activates button-like controls; Tab order follows DOM, not decorative arrangement; visible focus styles.
- Touch: clear target and explicit selected state; never rely on hover alone.
- Assistive tech: meaningful control name, state text and error association. Add status announcement only when changes need notification; avoid repeated live-region spam.
- Motion: if used, decorative transitions should respect reduced-motion settings and not convey the only state signal.
- Dismissal/undo: define focus return, escape behavior where appropriate and whether undo affects local state only.

### Verification scenarios
1. Apply success and re-apply when results are empty.
2. Rapid successive filter edits with out-of-order responses.
3. Keyboard-only activation and error recovery, plus touch on a narrow viewport.

When adapting existing patterns, cite actual `IP-xxx` model tests or source file and distinguish them from this proposed contract.
