# React / TypeScript Reference Implementations

**Status: `reference-implemented`, NOT production-ready.** These are stand-alone examples from the 2026-10-23 design exploration, built to demonstrate component APIs and interaction behavior. They have not been validated in AI WORKFLOW PLATFORM.

## Setup for isolated checking

```bash
cd components/reference
npm install
npm run typecheck
```

Import `../../tokens/refined-light.css` and `styles.css` from the hosting sample application (adjust relative path for your app); never assume the styles are globally present.

Dependencies include Radix (dialog/tabs/toast), Motion and Lucide. Versions are *proposals*, not verified exact production lock versions; inspect license, bundle weight, focus and accessibility before adoption.

## Components

`Button`, `StatusBadge`, `AppShell`, `AnimatedTabs`, `DetailSheet`, `CommandPalette`, `ToastFeedbackProvider`, `DataTable`, `AsyncProgress`.

**Known limits**: overlay history/focus behavior and complete keyboard/screen-reader coverage need application-level tests. CommandPalette requires one app-shell instance; disable competing Cmd/Ctrl+K handlers; asynchronous progress is descriptive, not a fake percentage of AI work. These samples are not an imported npm package.

For clickable standalone prototyping without Node/npm use [the HTML lab](../../playground/initial-interaction-lab.html).
