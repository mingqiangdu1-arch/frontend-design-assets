# Asset quality and retrieval · V0.5

## What this stage improves

Before adding further styles, establish a repeatable quality gate across the four design directions:

1. **Token consistency:** style IDs, scoped selectors, CSS values and JSON values must agree.
2. **WCAG contrast baseline:** primary/secondary/muted text on core surfaces (4.5:1) and primary action text against its designated background must pass. This only verifies specified token pairs, not every pixel of the rendered app.
3. **Scoped keyboard behavior:** command palette and row navigation stay inside the intended interaction surface; keyboard events must not hijack style selectors or reading controls.
4. **Design portability:** assets are selected by explicit style + application context + intent. A theme-free interaction description does not imply copy-and-paste compatibility.
5. **Browser smoke (Chromium):** interaction paths and narrow/wide viewport smoke checks in CI. This is limited coverage, not screen-reader or full cross-browser certification.

## Commands

From repository root (Node.js 22+):

\`\`\`bash
node scripts/check-registry.mjs
node scripts/contrast-audit.mjs
node scripts/find-assets.mjs --style=precision-dark --context=developer-tool --intent=dark
node scripts/find-assets.mjs --style=refined-light-saas --context=b2b-saas --intent=table --json
node --test tests/*.test.mjs
\`\`\`

Optional browser tests require Playwright:

\`\`\`bash
npm install
npx playwright install chromium
npm run test:browser
\`\`\`

The Playwright config starts a local static server; it never opens or alters a real product backend.

## Results to review

- \`contrast-audit.mjs\` only inspects the theme's designated critical semantic color pairs. Decorative illustrations, graph colors, token combinations not declared and rendered CSS overrides are outside the automated check.
- \`find-assets.mjs\` produces **candidates**, not warranties. Always read \`sources/license\`, \`styleIds\`, \`applicationContexts\`, \`dependencies\`, \`stage\` and \`verified\`.
- Browser smoke focuses on the Style Explorer (not every component and SaaS playground). Test artifacts are for inspection; no automatic \`production-ready\` promotion.

## Manual evaluation still necessary

- 320 / 390 / 768 / 1440px visual hierarchy and clipping on Chrome, Edge, Firefox and Safari.
- Screen reader navigation, focus management and dialog semantics.
- Touch targets, high contrast modes and RTL/CJK typography.
- Real project API/security/performance and usability validation.

## Next phase

Extend browser smoke to SaaS v0.2/v0.3; standardize reusable style specimens, add screenshot approvals, and audit popup/focus management. Do not claim these are finished in V0.5.

## V0.6 React component package

- [Source / integration](../../packages/ui/README.md) · [catalog](../../registry/components.json) · [gallery](../../playground/component-gallery/README.md)
- Quality: `npm run check:components` and `npm run test:components:browser` (Chromium only).
- A component-level visual mapping does not make four style systems share a single page layout. The gallery shows appearance and behavior, while the style explorer shows independent compositions.
