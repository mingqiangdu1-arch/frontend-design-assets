# Asset Explorer · V1.0 catalog

An interactive browser for the live machine asset registry. Search by name, ID, type, stage, visual scope, tags and application context. Examine exact provenance, dependencies, validation maturity and public source links. Select references and export a Markdown handoff brief for Codex; mixed visual styles receive an explicit warning.

Local server from repository root:

    python3 -m http.server 8009 --bind 127.0.0.1

Open http://127.0.0.1:8009/playground/asset-explorer/ . Do not use file:// because it cannot reliably fetch JSON.

This is an original static app with no account, no tracking and no server writes. JSON is read from registry/assets.json and registry/styles.json at runtime, without duplicating asset metadata. URL detail links support ?asset=UI-019. Search uses "/" shortcut, clipboard copying requires localhost/HTTPS permission and has a manual text fallback.

Testing: node --test tests/asset-explorer.test.mjs and npm run test:browser. Capture-only screenshots are not approved visual baselines. No screen-reader or cross-browser certification.
