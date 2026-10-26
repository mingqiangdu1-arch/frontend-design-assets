# Editorial Library — TPL-002

An original **Editorial Warm** page blueprint, independent of SaaS app shells. Browse a structured reading index, search/filter local article excerpts, bookmark locally, and open a focused reading sheet.

Run from repository root:

```bash
python3 -m http.server 8009 --bind 127.0.0.1
```

Open `http://127.0.0.1:8009/playground/page-blueprints/editorial-library/`.

Implementation: plain HTML, scoped Style Token CSS and local JavaScript. No account, persistent reading progress, real CMS, publishing or backend search. Native controls and a focused modal demo have limited Chromium smoke; full screen-reader and cross-browser QA remain open.

[Page registry](../../../registry/page-templates.json) · [Compose brief CLI](../../../docs/assembly/README.md) · [Editorial Warm style](../../../styles/editorial-warm/README.md).
