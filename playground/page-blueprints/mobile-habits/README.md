# Mobile Daily Habits — TPL-003

An original **Playful Pop** mobile-first activity page blueprint. Contains tactile task selection, score/progress calculation, pending/done filters, adaptive reward card, and bottom navigation at mobile sizes.

Run static server from repository root (`python3 -m http.server 8009 --bind 127.0.0.1`) and open `http://127.0.0.1:8009/playground/page-blueprints/mobile-habits/`.

Everything is local mock state. Scores are *not* externally awarded; task completion is not persisted across reloads. No login, push notifications, actual streaks or analytics. Keyboard/touch focus after a task disappears under an active filter requires further manual accessibility work.

[Page registry](../../../registry/page-templates.json) · [Compose brief CLI](../../../docs/assembly/README.md) · [Playful Pop style](../../../styles/playful-pop/README.md).
