# PR-002 · List ↔ Detail

**Status:** design recipe.

Combination: list toolbar + semantic table + optional `IP-002` Peek (fast preview) + `IP-003` Sheet (persistent detail) + `IP-006` Toast + `IP-008` resize if required.

Decision tree: use Peek for quick inspection, Sheet for related editing/detail, full page for deep independent workflow, Modal only when blocking confirmation is necessary. Do not implement every variation simultaneously without user testing.

Keyboard: row focus, Enter/Space meaning, Esc restore, arrow navigation if offered, visible focus, no keyboard trap. Mobile: full-height dialog or detail page as needed.
