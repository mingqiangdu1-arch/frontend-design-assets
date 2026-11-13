---
name: frontend-layout-composition
description: Design adaptable frontend information layout and responsive composition from content hierarchy, viewports, and input methods. Use when deciding mobile versus desktop structure, grids, breakpoints, typography scale, hero/content sections, image galleries, or reuse of the library's original layout atoms without building a whole app.
---
# Frontend layout composition / 响应式构图

## Goal
Define **what rearranges and why** when content and viewport change. Give transferable HTML/CSS patterns or exact source references without generating a complete product inside this asset repository.

## Procedure
1. Inventory content and priorities: primary action, critical evidence, secondary metadata, media ratios, longest real labels, optional panels, error/empty/loading states.
2. Select a reading and focus order before visual placement. Use semantic HTML; avoid CSS `order` changes that make keyboard order misleading.
3. Decide fluid regions and min/max widths using intrinsic sizing (`minmax(0,1fr)`, `clamp()`, `auto-fit`) and content breakpoints, not one fixed screen mockup.
4. Specify at least three situations: **wide**, **constrained/narrow**, and **content overflow**. Explain what stacks, scrolls, hides only when nonessential, or moves to a disclosure.
5. Retrieve existing independent layout sources instead of reinventing them:
   - `FX-094` two-part editorial cover.
   - `FX-095` staggered content sequence.
   - `FX-096` keyboard-focusable native horizontal gallery.
   - `FX-097` caption mosaic.
   - `FX-098` parallel narrative comparison.
   - `FX-099` semantic ordered field notes.
   Source: [v053 composition CSS](../../../styles/primitives/v053/composition-atoms.css); [standalone markup sample](../../../playground/composition-v053/index.html).
6. State adaptation requirements (breakpoint from actual content, contrast, long Chinese text, touch targets, alt text, overflow keyboard access) and distinguish **sample art** from target product media.
7. Output a short layout brief or the smallest reusable CSS fragment; do not create new full page demos unless explicitly asked for a reference specimen.

For implementation decisions see [adaptive layout patterns](references/adaptive-layout.md).

## Acceptance
The layout explains DOM order, narrow-screen behavior, overflow recovery, density and primary action visibility. A media wall is not automatically a React component or functional uploader.
