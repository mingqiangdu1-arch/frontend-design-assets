# Visual system — Refined Light SaaS (proposal 1)

Status: **Design direction / not a production theme**. Sources: [Attio](https://attio.com/), [Vercel Geist](https://vercel.com/geist/introduction), [Notion design notes]([private-notion-link-redacted]).

## Design language

Attio-inspired whitespace and low-contrast boundaries; Vercel-inspired typographic order and restrained hierarchy. Calm, precise, professional, not sterile. Decorative gradients, glass panels, unnecessary card nesting and pervasive accent-blue CTAs are specifically discouraged.

## Foundation tokens

| Role | Value | Usage |
|---|---|---|
| Canvas | `#FAFAFA` | page background |
| Surface | `#FFFFFF` | primary content and overlays |
| Sidebar | `#F7F7F8` | nav rail |
| Hover | `#F5F5F5` | hover feedback |
| Selected | `#EEEEF0` | selected navigation row |
| Border | `#EAEAEA` | separators |
| Border Strong | `#D4D4D4` | active boundaries |
| Text Primary | `#171717` | titles and body |
| Text Secondary | `#626262` | explanations |
| Text Muted | `#767676` | secondary labels; test contrast |
| Accent | `#2563EB` | focus and links |
| Main action | `#171717` | filled primary button |

Success: `#16794B` on `#ECFDF3`. Info: `#1D4ED8` on `#EFF6FF`. Warning: `#92400E` on `#FFFBEB`. Danger: `#B91C1C` on `#FEF2F2`. Status text, not color alone, conveys meaning.

## Typography

- CJK: PingFang SC / Microsoft YaHei / Noto Sans SC (system fallback).
- Latin: Inter / Geist Sans if legitimately available; don't bundle font binaries.
- Identifiers: Geist Mono / Consolas fallback; not for Chinese paragraphs.
- Page title 24/32px 600; section title 18/26px 600; item title 15/22px 600; body 14/22px 400; helper 13/20px; metadata 12/18px.
- Weight hierarchy 400 / 500 / 600; avoid gratuitous 700 and 32px headers.

## Layout

- Sidebar starting width 240px (224–256px adjustable), collapsed 64px; thin separator.
- Topbar 56px. Main horizontal padding 32px on desktop; down to 16px mobile.
- Ordinary max content width 1120–1280px; documents 760–880px; optional detail rail 280–340px.
- Use full-width table panels with light horizontal dividers. Separate sections with whitespace when cards are redundant.
- Support dense and comfortable display modes. Density consistency does **not** mean every page needs the same row height.

## Dimensions

4px rhythm; spacing steps 4, 8, 12, 16, 20, 24, 32, 40, 48px. Buttons/input standard 36px, small 32px, large 40px. Nav item 36–40px. Table row 44–48px normal, 36–40px compact. Radius: badge 6px, controls 8px, cards 10px, dialogs 12px. Prefer border and surface contrast to generic shadows.

## Accessibility and interaction baseline

Visible keyboard focus; normal body contrast target WCAG AA 4.5:1; nontext controls and large text as appropriate; color is not sole indicator. Hover is nonessential; mobile and keyboard affordances remain discoverable.

## Animation

Hover/focus 120–160ms, menu/drawer 160–240ms, ease-out, honor `prefers-reduced-motion`. The numbers are *proposal tokens*, not measured values from Attio or Vercel.
