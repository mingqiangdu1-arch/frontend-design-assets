# V0.48 · Eight standalone gameful / motion CSS materials

**Original CSS + semantic HTML only.** No JavaScript, external image, proprietary font, library package, React exports, service logic, sound or new theme. [Source](gameful-atoms.css) · [Live native HTML samples](../../../playground/gameful-atoms-v048/index.html).

| Asset | CSS class | Real behavior or visual source | Limits |
| --- | --- | --- | --- |
| FX-055 | `.fx48-orbit-seal` | Hover-activated orbital achievement / 悬停轨道成就徽章 | Original orbit ring animation triggers only on hover/focus, reduced-motion stops it. Static achievement art; not a live award system. |
| FX-056 | `.fx48-xp-ring` | Conic experience meter / 圆环经验进度 | Static sample has a real semantic native progress element and a matching decorative conic ring; host must synchronize values. |
| FX-057 | `.fx48-inventory` | Clip-corner inventory selection / 剪角物品栏选择 | Genuine native checkbox toggles selection. No drag-and-drop, game economy, inventory persistence or reward logic. |
| FX-058 | `.fx48-quest-clue` | Native quest clue reveal / 原生任务线索展开 | Real details/summary disclosure with semantic keyboard behavior; not a card-flip engine or quest tracker. |
| FX-059 | `.fx48-health-meter` | Native health resource meter / 原生资源计量条 | Real HTML meter with sample 72/100 and CSS-only fallback labels. Host updates value and contextual semantics. |
| FX-060 | `.fx48-reward-burst` | Hover reward starburst / 悬停奖励放射贴花 | Original CSS clip-path burst rotates only on pointer hover; readable foreground remains static; no prize claim or award logic. |
| FX-061 | `.fx48-kinetic-link` | Kinetic underline text link / 动态轨迹文字链接 | Real native anchor with animated underline on hover/focus, static high-contrast reduced-motion fallback. Host supplies meaningful target. |
| FX-062 | `.fx48-portal-switch` | Native portal-theme toggle / 原生传送门模式切换 | Real checkbox controls local visual state via adjacent sibling CSS. No application theme persistence or remote effects. |

### Accessibility / extraction
- Motion FX-055/060/061 starts **only on hover/focus**, and stops/transitions off under `prefers-reduced-motion: reduce`; no autoplay loop on page load.
- FX-056 pairs its **static conic progress visual** with a real native `progress` and a visually duplicated percentage; production host must synchronize both values and offer status labeling.
- FX-057, FX-058 and FX-062 are genuine native checkbox, details and checkbox interfaces; no fake click handler or decorative-only button. Native element state provides keyboard interaction.
- FX-059 is an HTML `meter` with a text value; browser-native high/low coloring may vary.
- FX-060 is a visual sticker; not a reward/grant, payment or promotion engine. FX-061 links to the demo's actual usage section; replace `href` in consuming context.
- Keep per-asset CSS selectors, matching HTML markup, and `@media` branches. Validate contrast, a11y labels, actual data, browser behavior and mobile screens in each target app before release.
