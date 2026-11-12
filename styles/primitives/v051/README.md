# V0.51 · Seven independent kinetic interface fragments

[Original opt-in CSS](kinetic-visuals.css) · [two tiny local JS adapters](motion-adapters.js) · [semantic HTML specimen gallery](../../../playground/kinetic-visuals-v051/index.html).

| ID | Scoped selector | Actual behavior / source | Host boundary |
| --- | --- | --- | --- |
| FX-078 | `.fx51-loop-ticker` | Accessible looped editorial ticker / 可暂停循环文字带 | Original CSS horizontal loop with the second segment aria-hidden. Pauses on hover/focus and removes animation under reduced motion; duplicated decorative text is not a feed or live announcement. |
| FX-079 | `.fx51-stagger-type` | Kinetic staggered headline / 错行滑移排印 | Real DOM heading with independently offset text lines on hover/focus-within; no text splitting algorithm or variable font installation. |
| FX-080 | `.fx51-aperture-reveal` | Pointer aperture color reveal / 指针光圈揭示 | Optional original local Pointer Event script moves a radial mask over two original gradient layers; keyboard focus reveals the full layer. Does not compare photos or process uploaded images. |
| FX-081 | `.fx51-flip-tile` | Native toggle flip information tile / 可切换双面信息牌 | Real button toggles accessible aria-pressed, label and local 3D card orientation via a short JS adapter; no content fetching, state storage or hidden web app. |
| FX-082 | `.fx51-scroll-rail` | Progressive CSS scroll reader strip / CSS 滚读进度轨 | CSS scroll() timeline drives a 0–100% decorative track in supporting browsers; unsupported browsers and reduced-motion show a static guide, not an accurate progress status. |
| FX-083 | `.fx51-morph-link` | Morphing cut-corner anchor / 变形剪角链接 | Real native anchor changes polygon outline on hover/focus with reduced-motion static fallback; target URL must be changed by host. |
| FX-084 | `.fx51-vertical-spine` | Vertical marginalia spine / 竖排页边注书脊 | Semantic heading/paragraph with CSS writing-mode label; naturally stacks at narrow width. Editorial text and localization are supplied by host. |

**Extraction:** Copy only the class and descendant selectors plus responsive, `prefers-reduced-motion` and `forced-colors` rules. FX-080 and FX-081 require their relevant local JS loop. They have no network, persistence, third-party dependency or business action.

**Accessibility notes:** ticker duplicate is `aria-hidden` and hidden entirely for reduced-motion; flip tile synchronizes button `aria-pressed` and accessible label; aperture exposes keyboard focus as a full reveal rather than enforcing pointer-only discovery. The scroll-driven reader uses a CSS `@supports` progressive enhancement, with no false ARIA progress semantics in unsupported browsers.

**Limitations:** motion examples do not represent a real text content feed, photo compare service, document editor, article analytics or complete navigation product. Some browser versions do not implement CSS scroll timelines or animation mask behavior identically; verify in target environment.
