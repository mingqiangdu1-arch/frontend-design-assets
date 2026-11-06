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
| Data | Avatar, DataList, **DataTable**, **FilterableDataTable**, **ActivityTimeline** |
| Navigation & hierarchy | **TreeView**, **Breadcrumb**, **Pagination**, **SidebarNav** |
| Advanced input | **Combobox**, **DualRangeField** |
| Interactive overlays | **Popover** |
| Commands | **CommandMenu** |
| Disclosure & help | **Accordion**, **Tooltip** |
| Complex forms | **FormWizard**, **RepeatableFields**, **ValidationSummary** |
| Workflow boards | **KanbanBoard** |
| Data visualization | **Sparkline**, **InteractiveBarChart** |
| Date & file input | **DatePicker**, **FileUpload** |
| Layout | **ResizablePanels**, **DashboardGrid** |

**41 exported React components (including four new in V0.23).** All use style-scoped `fda-` CSS rather than globally overwriting buttons, forms, cards, etc. The names are also discoverable in `registry/components.json`.

## V0.23 filtering, kanban, activity and interactive data visualization

Four original React/TypeScript components are implemented in [`src/data-ops.tsx`](src/data-ops.tsx), exported from the public package index, and styled through the **same four supported scoped UI themes**. No external UI code or new runtime dependencies are included.

| Export | Host-controlled API | Implemented behavior and limits |
| --- | --- | --- |
| `FilterableDataTable<T>` (`UI-052`) | `rows`, `columns`, `query/onQueryChange`, `getSearchText`, optional `category/onCategoryChange`, `sort/onSortChange` and `sortComparators` | Local keyword and category filtering composed with the existing semantic DataTable; optional comparator-driven local sorting. **No server query, virtualized rendering, sorting without a comparator, or persistence.** Host resets pagination when filters change. |
| `KanbanBoard` (`UI-053`) | `columns`, `cards`, `onMove(cardId,columnId)` | Controlled multi-column board, HTML5 drag/drop and **per-card native select as keyboard/touch alternative**. Validates unique column/card IDs and column references. **Only moves a card to another column, no within-column reordering, undo, API writes or auth.** |
| `ActivityTimeline` (`UI-054`) | ordered `events`, optional `selectedId/onSelect` | Semantic ordered list with optional `<time>` values, complete/current/upcoming visual markers and controlled event selection. The host owns date ordering and event source; **not a Gantt/scheduling or audit immutability engine**. |
| `InteractiveBarChart` (`UI-055`) | nonnegative finite numeric `data`, controlled `selectedId/onSelect`, `unit` | Interactive CSS bars with readable numeric button labels, selected state and arrow/Home/End focus navigation. **No axes, zoom, animation library, data feed, inference or automatic analytics.** Host owns data provenance and meaning. |

### Controlled filter and board usage

```tsx
import {useState} from 'react';
import {FilterableDataTable,KanbanBoard} from '@frontend-design-assets/ui';

function Sample({rows,columns,kanbanColumns,initialCards}) {
 const [query,setQuery]=useState('');
 const [cards,setCards]=useState(initialCards);
 return <>
   <FilterableDataTable label='Records' rows={rows} columns={columns}
     query={query} onQueryChange={setQuery} getSearchText={row=>row.title}/>
   <KanbanBoard label='Tasks' columns={kanbanColumns} cards={cards}
     onMove={(id,dest)=>setCards(previous=>previous.map(card=>
       card.id===id?{...card,columnId:dest}:card))}/>
 </>;
}
```

Example is illustrative: supply TypeScript row/card types, app permissions and persistence. The component package is not published on npm. **Data examples in the Gallery are fictional test fixtures**; never present them as actual business results. Tests cover key Chromium interactions, not production cross-browser or screen-reader certification.

## V0.22 complex forms, workflow, data and responsive layout

Five **original implemented** React/TypeScript/CSS reference components live in [`src/workflows.tsx`](src/workflows.tsx) and are exported from the public index. They support the existing four explicit UI themes and have interactive Gallery fixtures, without any added dependencies.

| Export | Controlled API | User-visible behavior and honest limitations |
| --- | --- | --- |
| `FormWizard` (`UI-047`) | `steps`, `currentStepId/onStepChange`, `canAdvance`, `onComplete` | Three or more form phases with named steps, previous-step access, gated Next and final completion callback. **No implicit form schema, persistence, requests or trustworthy backend approval**; validate before moving ahead. |
| `RepeatableFields` (`UI-048`) | `items`, `onAdd/onChange/onRemove`, `minItems/maxItems` | Labeled native repeatable text inputs, stable IDs and quantity limits. **Caller generates stable IDs** and owns data validation; not a JSON-schema form renderer. |
| `ValidationSummary` (`UI-049`) | `issues`, `onNavigate(fieldId)` | Concise visible form error summary with clickable links; caller handles actual focus/scroll for the chosen field. **No automatic DOM focus or server validation**. |
| `Sparkline` (`UI-050`) | `values`, `label`, `height`, `summary` | Lightweight original SVG path from finite numeric values; announces a range and start/end, renders a point-count trend. **Not an analytics engine**, axis, sourced metric system or full chart package. Do not fabricate real data from fixtures. |
| `DashboardGrid` (`UI-051`) | `items`, per-item `span:1..4` | Explicit 4-column → 2-column → 1-column layout and titled cards using semantic articles. **No draggable dashboard, saved layout, async query or virtualization**. |

### Simple locally controlled wizard

```tsx
import {useState} from 'react';
import {FormWizard} from '@frontend-design-assets/ui';

function Setup(){
 const [step,setStep]=useState('identity');
 const [name,setName]=useState('');
 return <FormWizard label='项目设置向导' currentStepId={step} onStepChange={setStep}
   canAdvance={name.trim().length>=3}
   onComplete={()=>{/* host app validates & persists here */}}
   steps={[
     {id:'identity',title:'命名',content:<input aria-label='项目名称' value={name}
        onChange={e=>setName(e.target.value)}/>},
     {id:'review',title:'复核',content:<p>名称：{name}</p>}
   ]}/>;
}
```

These are reference implementations for adaptation to your own application, **not an npm-published component suite or a production a11y certification**. The Gallery uses local demo values and fake trend points explicitly labeled as fixtures.

## V0.21 navigation and disclosure exports — real React components

Five original reference components live in [`src/navigation.tsx`](src/navigation.tsx), are re-exported in the package public entry, and reuse the **same four explicitly supported themes**. The behaviors use controlled inputs or native browser semantics; no new runtime dependency, default theme or third-party UI code is added.

| Export | Main props | Practical behavior and boundary |
| --- | --- | --- |
| `Tooltip` (`UI-042`) | `label`, `content`, optional `placement/disabled` | A **noninteractive text tooltip** on hover/focus; Escape dismisses. Does not support HTML/tooltips with links, portal placement or collision avoidance. Use visible labels for critical instructions. |
| `Breadcrumb` (`UI-043`) | `items`, optional `label/separator` | Semantic `nav`/ordered list, current-page marker, optional link or controlled action for ancestors. The app supplies routes or `onSelect`. |
| `Pagination` (`UI-044`) | controlled `page`, `pageSize`, `totalItems`, `onPageChange` | Prev/Next, sparse page buttons, bounded counts and empty-state range. **Does not fetch or slice rows**; parent owns the data query and page state. |
| `Accordion` (`UI-045`) | `items`, controlled `openIds/onOpenIdsChange` | Native buttons and labeled regions; Arrow Up/Down/Home/End focus navigation, multiple simultaneous expansion, disabled rows. Caller owns persistence and content. |
| `SidebarNav` (`UI-046`) | hierarchical `items`, controlled `activeId/onNavigate`, `expandedIds/onExpandedIdsChange` | Nested semantic nav with independent disclosure controls and current-page selection. Native Tab/Enter operate the buttons; **not a treegrid, a router or mobile drawer**. |

### Example controlled composition

```tsx
import {useState} from 'react';
import {Accordion,Pagination} from '@frontend-design-assets/ui';

function Page(){
 const [expanded,setExpanded]=useState<string[]>([]);
 const [page,setPage]=useState(1);
 return <>
   <Accordion items={[{id:'about',title:'About',content:'Details'}]}
      openIds={expanded} onOpenIdsChange={setExpanded}/>
   <Pagination label='Items' page={page} pageSize={10}
      totalItems={87} onPageChange={setPage}/>
 </>;
}
```

Use the actual local package or monorepo alias; the package is **private/unpublished**. The example has local data only, not product routing. No production/a11y, screen-reader or mobile-device certification is implied.

## V0.20 utility exports — implemented code, local-only effects

Four new original reference components live in [src/utilities.tsx](src/utilities.tsx) and are re-exported in the public package index. They work with the same four declared theme scopes; no new runtime dependencies or default theme are introduced.

| Component | Controlled contract | Important boundaries |
| --- | --- | --- |
| `CommandMenu` (`UI-038`) | `open/onOpenChange`, grouped `CommandItem[]`, `onSelect(id)` | Native modal dialog, searchable command list, Arrow/Enter/Escape and disabled options. No global hotkey, persistence or implicit execution. Caller owns the actual command action. |
| `DatePicker` (`UI-039`) | ISO `YYYY-MM-DD` string `value/onValueChange`, optional `min/max/clearable` | Uses native browser date picker. Calendar appearance and locale depend on browser/OS; invalid explicit dates rejected. Not a custom calendar popover. |
| `ResizablePanels` (`UI-040`) | `size` percentage, `onSizeChange`, `minSize/maxSize`, horizontal/vertical | Pointer capture and keyboard arrows/Shift/Home/End. Only one splitter/two panels; no persisted workspace layout, RTL-specific logic or nested docking. |
| `FileUpload` (`UI-041`) | controlled `files/onFilesChange`, `accept/maxFiles/maxSizeBytes`, `onRejected` | Native picker + drag/drop, reject disallowed types/sizes/count/duplicates, remove files. **Never sends files to a server**; `accept` is only a convenience, not server-side validation. |

### Reuse example

```tsx
import {useState} from 'react';
import {DatePicker,ResizablePanels} from '@frontend-design-assets/ui';

function Example(){
  const [date,setDate]=useState('2026-11-06');
  const [size,setSize]=useState(45);
  return <>
    <DatePicker label='计划日期' value={date} onValueChange={setDate} min='2026-11-01' clearable/>
    <ResizablePanels label='内容区分隔线' size={size} onSizeChange={setSize}
      start={<div>目录</div>} end={<div>内容</div>}/>
  </>;
}
```

The package remains local/unpublished, so consumers must configure its real workspace path and load the selected compatible theme tokens. Browser UI behavior is reference-level and does not establish a production accessibility audit. No cloud file upload is provided.

## V0.19 advanced exports — real code with controlled state

These five components live in [src/advanced.tsx](src/advanced.tsx), are re-exported from `index.tsx`, included in the ESM library build and shown in the four-theme gallery. They use original React/TypeScript + scoped token CSS; there is **no new dependency**.

| Export | Essential props | Implementation/failure boundary |
| --- | --- | --- |
| `DataTable<T>` | `rows`, `columns`, `label`, controlled `sort/onSortChange`, `selectedIds/onSelectedIdsChange` | Native table with header buttons and row checkboxes. **Parent sorts/loads/paginates rows**, not this package; wide tables scroll in their own region. |
| `TreeView` | `items`, `label`, `expandedIds/onExpandedIdsChange`, `selectedId/onSelect` | Roving focus, Up/Down/Left/Right/Home/End/Enter, controlled expansion; no treegrid editing, drag, async children or virtualization. |
| `Combobox` | `label`, `options`, controlled `value/onValueChange` | Filterable single selection, input/listbox, arrows/Enter/Escape and disabled results. **Local option arrays only**; not an async autocomplete or multi-select. |
| `Popover` | `label`, `trigger`, `open/onOpenChange`, `children` | Nonmodal anchored dialog; focuses first interactive child, Escape restores trigger and outside click closes. **No portal, collision detection or focus trap**; keep content in a non-clipping container. |
| `DualRangeField` | `label`, `min/max/step/minSpan`, controlled `value/onValueChange` | Two native sliders plus number inputs; clamps values before callback to preserve minSpan. **No overlaid dual-thumb gesture**, decimal entry UX beyond native input, or remote persistence. |

```tsx
import {DataTable,Combobox,DualRangeField} from "@frontend-design-assets/ui";

const [sort,setSort]=useState<DataTableSort>(null);
const [selectedIds,setSelectedIds]=useState<string[]>([]);
const [location,setLocation]=useState("tokyo");
const [bounds,setBounds]=useState<[number,number]>([20,65]);

<DataTable label="Records" rows={sortedRows} columns={columns}
 sort={sort} onSortChange={setSort}
 selectedIds={selectedIds} onSelectedIdsChange={setSelectedIds}/>
<Combobox label="Location" value={location} onValueChange={setLocation}
 options={[{value:"tokyo",label:"Tokyo"},{value:"seoul",label:"Seoul"}]}/>
<DualRangeField label="Confidence" min={0} max={100} step={5} minSpan={15}
 value={bounds} onValueChange={setBounds} unit="%"/>
```

The example assumes `useState`, `DataTableSort`, `columns` and `sortedRows` are imported/declared by the calling app. It illustrates an API contract, not an executable page. Import **only one** compatible theme's scoped tokens.

**Accessibility review remains open:** mouse and Chromium keyboard smoke only, not a screen-reader certification. Tree focus/expansion and combobox active-descendant are reference behavior; test against the target screen readers and data volumes before adoption.

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
