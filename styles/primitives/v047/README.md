# V0.47 · Expressive source-level CSS atoms

Six **original, opt-in CSS/HTML visual materials**, not React library exports, and not one combined theme. [CSS source](expressive-atoms.css) · [individual specimens](../../../playground/expressive-atoms-v047/index.html). The only optional JS helper is [holo-card.js](holo-card.js) for FX-050.

| ID | Source selector | What is real | What is not provided |
| --- | --- | --- | --- |
| FX-049 Chromatic echo typography / 色差重影排印 | `.fx47-chromatic-type` | Readable DOM text and source CSS | Decorative text-shadow on real accessible HTML heading. No duplicate content or motion. |
| FX-050 Pointer-responsive holographic card / 指针响应全息卡 | `.fx47-holo-card` | Keyboard-focusable real anchor and bounded pointer-induced lighting/tilt | Original bounded pointer-based tilt with local JS; anchor remains keyboard accessible, static reduced-motion mode. Not a gyroscope or real 3D model. |
| FX-051 Rubber stamp label / 橡皮印章标签 | `.fx47-stamp-label` | Readable DOM text and source CSS | CSS-only decorative label with readable DOM text; no custom font or stamp background image. |
| FX-052 Organic blob viewport / 有机形态媒体窗口 | `.fx47-blob-frame` | CSS shape/mask and figcaption | Standalone CSS clipped visual sample; host replaces gradient with owned images/media and supplies appropriate alt text. |
| FX-053 Letterpress editorial drop cap / 活版首字下沉 | `.fx47-dropcap` | Semantic article paragraph | Semantic paragraph with CSS ::first-letter; needs target-language typography and responsive line-wrap review. |
| FX-054 Numbered chapter spine navigation / 编号章节侧脊导航 | `.fx47-chapter-spine` | Native semantic anchor navigation | Native semantic nav/ordered list/anchor targets; no automatic active-section detection or scrollspy. |

The holo adapter sets style properties only on the matching local card element; it uses native Pointer Events, clamps the angle to ±6°, resets on leave/blur and avoids pointer motion when `prefers-reduced-motion: reduce` or touch input is active. No motion library, script bundle, third-party image or secret is installed.

**Copy selectively**: include only one class family and descendants plus relevant `@media` fallbacks. Keep meaningful text in the DOM, and confirm focus, contrast, actual links, CJK wrapping, touch and motion preferences in the host. The demo validates source existence, not production readiness.
