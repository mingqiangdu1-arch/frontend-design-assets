# Creative Art Direction · V0.13 / Experimental style library

This is a **model-facing toolbox for original art direction**, not a new compulsory visual default. It complements, but never replaces, the six pre-existing application styles.

## Four new design worlds

| ID | Aesthetic system | Signature layout | Functional experiment | Do not confuse with |
| --- | --- | --- | --- | --- |
| pixel-arcade | pixel/8-bit game world | cartridge quest map, chunked HUD and tile motifs | chapter selection and XP | Playful Pop's generic bright UI |
| signal-noir | fictional instrument / sci-fi telemetry | ruled panels, polar reticle, frequency readouts | channel switching and scalar control | Precision Dark SaaS record tables |
| paper-rebellion | physical collage / independent zine | overlapping torn notes, tape and annotation | controlled paper shuffle and topic filters | Editorial Warm long-form prose / Neo Brutalist graphic posters |
| aether-orbit | atmospheric spatial / lightweight orbital visual | spacious narrative with CSS depth and luminous object | day/twilight/nebula ambient switch | blurred SaaS glass panels / animation-first UI |

Each has an original \`tokens.json\`, scoped CSS, a structured \`style.json\`, a detailed README with visual DNA and anti-patterns, plus an **actual interactive scene** in [Creative Style Lab](../../playground/creative-style-lab/README.md).

## Model usage: generate *different* art direction, not another cloned landing page

1. Choose style intentionally by task, emotion, audience and usage environment. For surprise research, explicitly pass \`--style=surprise\`; the repository keeps \`defaultStyleId:null\`.
2. Ask the generator for several **reproducible** concept briefs, not raw code:

\`\`\`sh
node scripts/creative-director.mjs --style=surprise --seed=2026-exploration --context="independent music website" --count=4
node scripts/creative-director.mjs --style=paper-rebellion --seed=7 --context="science museum" --count=3 --format=json
\`\`\`

3. Read the selected \`styles/<id>/README.md\`, \`tokens.json\` and the proposed \`creative-directions.json\` layout, type, texture, motion, interaction and negatives.
4. Reinterpret the layout for the actual task. Do not implement the demonstration verbatim, and never paste borrowed screenshots/source code or brand assets. The same style can support a museum, a game or a portfolio through different hierarchies.
5. Inspect device widths, zoom, keyboard focus, reduced motion, text contrast, state semantics, runtime performance, content rights and real API contracts before adoption.

## Suggested creative dimensions

Compose on **five independent axes**, rather than only changing accent colors:

- **Information architecture:** linear read, radial exploration, quest flow, poster-board, technical instrument
- **Typography:** oversized display/compact mono, serif juxtaposition, bounded paragraphs
- **Material:** step pixels, ruled metal, torn paper, luminous volume
- **Interaction grammar:** chapter selection, tuning knobs, card reordering, ambient presets
- **Motion:** stepped, procedural/radar, tactile lift, ambient slow drift, or none

Use one primary style profile, then **at most one optional gesture/material influence from another** if coherent. Do not mix incompatible token systems or mark static research motifs as React library modules.

## Accessibility and performance

- Prefer meaningful body copy at readable sizes; decorative letterforms must not reduce navigational clarity.
- Observe \`prefers-reduced-motion: reduce\`; no essential state may depend on animation and do not use flashing. Motion-heavy scenes should be opt-in and paused where needed.
- For Aether transparent/depth elements, text and action areas remain opaque and readable. \`prefers-reduced-transparency\` is optional progressive enhancement, **not universal browser support**.
- W3C calls for **4.5:1 text** and **3:1 meaningful non-text controls** in applicable WCAG 2.2 success criteria; automated token checks cover only selected solid color pairs, not gradient compositing, dynamic layers, zoom or screen readers.
- The demo has no WebGL, remote product imagery, third-party fonts, autoplay audio, actual geolocation or network telemetry.

## External reading used as principles (not assets)

- [Figma 2026 experimental navigation, retrofuturism, typography and 3D](https://www.figma.com/resource-library/web-design-trends/)
- [Adobe 2026 collage, zine and analog visual forecasting](https://www.adobe.com/express/learn/blog/design-trends-2026)
- [Squarespace Circle 2026 motion narrative and creative process](https://pros.squarespace.com/blog/design-trends)
- [WAI WCAG 2.2 animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)
- [WAI WCAG 2.2 non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
