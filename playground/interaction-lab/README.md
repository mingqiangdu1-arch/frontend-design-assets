# Interaction Lab V0.7 — portable behavior research

An independent local-only experiment with four behavior primitives, presented in Refined Light solely for legibility:

- **IP-009** reversible optimistic archive with latest-operation snapshot (simulated, no server rollback semantics)
- **IP-010** multi-step wizard, adjacent validation, preserved draft while backtracking
- **IP-011** accessible reorder using explicit up/down buttons and live region; no pointer-only drag-and-drop
- **IP-012** responsive side-by-side workspace with keyboard-accessible range input

From repository root: `python3 -m http.server 8009 --bind 127.0.0.1`; open `http://127.0.0.1:8009/playground/interaction-lab/`.

Logic checks: `node --test tests/interaction-lab.test.mjs`; browser smoke: `npm run test:browser`.
See [full behavior specs and limits](../../docs/interactions/advanced-patterns.md). **Not a production UI library**.
