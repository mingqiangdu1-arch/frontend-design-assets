# Creative Style Lab · V0.13

Four original independent design worlds live in one **static interactive research showroom**. This is not a universal 4-theme React component library, and the four scenes are **not** interchangeable CSS skins of one layout.

## Run

At the repository root:

\`\`\`sh
npm run dev:catalog
# http://127.0.0.1:8009/playground/creative-style-lab/
\`\`\`

Deep link to each scene with \`?style=pixel-arcade\`, \`?style=signal-noir\`, \`?style=paper-rebellion\`, \`?style=aether-orbit\`. Browser back/forward restores the chosen scene. The first scene is a local showroom preview choice, not a repository-wide default.

### Live interactions

- Pixel Arcade: choose 3 story quests; current stage, XP and accessible text status update.
- Signal Noir: switch fictional channels, tune a labeled frequency slider and inspect the readout. **This is invented telemetry**, not real location, health or safety data.
- Paper Rebellion: reshuffle paper layout without changing semantic DOM order, filter topic-specific notes and retain usable focus.
- Aether Orbit: select Dawn/Twilight/Nebula with visible \`aria-pressed\` state. No sound, WebGL or external images; reduced-motion stops ambient transforms.

## Scope and verification

- The tokens and CSS art are completely original. No external screenshots, borrowed photos or copyright-protected fonts have been bundled.
- Static/browser smoke tests check keyboard, state changes, responsive 390/768/1440 layouts and screenshot capture, not full screen-reader, Safari or Firefox certification.
- Each style has an independent machine brief at [creative-directions.json](../../registry/creative-directions.json). The generator outputs research-only art direction, not final source code.
- Before real product usage: validate performance, copy readability, sensitive flows, WCAG controls, motion preferences, asset rights and browser/device support.

## Pixel Arcade genre-sensitive review · 2026-11-05

In the third controlled review, Pixel Arcade retains its original square cartridge buttons, hard offset shadows, monospace HUD, landscape gradient and clipped pixel sun. Key small labels and controls gained readable sizes, and the selected quest now has a visible `▸` cue in addition to `aria-pressed` and the live status. The CSS and JavaScript for other scenes were not redesigned.

The optional official Hallmark lint comparison covers shared four-scene source files and is advisory, **not a Pixel-only defect count**. The original [genre triage tool](../../scripts/triage-genre-audit.mjs) never removes upstream findings. See [experiment documentation](../../docs/research/pixel-arcade-genre-review.md).
