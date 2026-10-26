# @frontend-design-assets/ui · multi-style React reference library

**Status: reference implementation / experimental**, not npm-published and **not certified production-ready**. Unlike historical [single-style reference components](../../components/reference/README.md), this package uses one documented React/TypeScript API and explicitly selected **per-style visual mappings**.

## Run

From repository root, Node 22+:

```bash
npm install
npm run typecheck:ui
npm run build:ui
npm run dev:components
```

Gallery: `http://127.0.0.1:5174/`. Build bundle: `packages/ui/dist/index.js`, CSS `packages/ui/dist/ui.css`, declarations in `packages/ui/dist/types/`.

## Usage

The actual theme tokens are separate from the component bundle. The application must load **the chosen** style's token CSS, then the component CSS (included in the JS import for the development source; the library build exposes `ui.css`), and wrap the app subtree in `ThemeSurface`.

```tsx
import {ThemeSurface, Button, TextField, Tabs} from "@frontend-design-assets/ui";
import "@frontend-design-assets/ui/styles.css";
// Import only selected theme Tokens from this repository, not all four.
import "frontend-design-assets/styles/precision-dark/tokens.css";

function Settings() {
  return <ThemeSurface theme="precision-dark">
    <Button onClick={() => {}}>Save</Button>
    <TextField label="Workspace" defaultValue="Research" />
  </ThemeSurface>;
}
```

The illustrative import `frontend-design-assets/styles/...` above is a repository-relative integration placeholder, **not** a published npm path. In actual code, use a real relative/alias path to this repo or copy only this repository's original Token CSS with attribution. Bundle is private/unpublished; import from `packages/ui/dist/index.js` after building, or configure your monorepo workspace alias.

## Component index

| Group | Components |
| --- | --- |
| Foundation | ThemeSurface |
| Actions | Button |
| Layout | Card |
| Inputs | TextField, TextAreaField, SelectField, CheckboxField, SwitchField |
| Navigation | Tabs |
| Feedback | Badge, Alert, Progress, Skeleton, EmptyState |
| Overlays | Dialog, Toast |
| Data | Avatar, DataList |

**18 exported React components.** All use style-scoped `fda-` CSS rather than globally overwriting buttons, forms, cards, etc. The names are also discoverable in `registry/components.json`.

### Behavior decisions and limits

- **ThemeSurface:** Pass a `theme` explicitly; there is **no default** or auto-selection. Per-style Token files exist for Refined Light SaaS, Precision Dark, Editorial Warm and Playful Pop. Matching style ID changes not only colors but typography, density, border/shape, feedback.
- **Button:** Default native `type="button"` prevents accidental form submission. Set `type="submit"` explicitly for forms. Loading disables the button; parent controls async state.
- **Fields:** Stable label/input IDs, hint/error descriptions, `aria-invalid`; consumer provides validation and form control state. Native select is intentional to avoid premature custom combobox complexity.
- **Tabs:** Controlled and keyboard roving: Left/Right/Up/Down/Home/End; disabled tabs skipped. Caller must manage `value` and `onValueChange`.
- **Dialog:** Native HTML `<dialog>` for modal focus and backdrop; controlled `open`. `Escape` informs the owner through `onOpenChange(false)`. No nested modal or complex portal orchestration.
- **Toast/Alert:** No internal timers or notification queue. Toast is controlled; do not mistake `role=status` for complete screen-reader certification.
- **Progress:** Determinate only; do not use synthetic percentages as a claim of task execution.
- **DataList:** Small selectable data rows; no server pagination, complex table/grid keyboard semantics or virtualization.

## Quality

Check `npm run check:components` and `npm run test:components:browser`. Component tests include explicit theme switching, inputs, keyboard tabs, modal, progress, choice controls and narrow viewports. Visual review, touch, Safari/Firefox, screen reader and target-product integration remain outstanding.

These are original suggested values and implementations. No proprietary vendor UI code, trademarks, fonts, images or assets are included.
