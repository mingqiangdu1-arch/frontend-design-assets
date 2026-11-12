# V0.46 · Native form, comparison, data and expressive visual atoms

Twelve **original, standalone, opt-in** CSS families; deliberately not a published React kit. Source: [form-data-experiment.css](form-data-experiment.css). Only FX-041 needs a tiny optional [compare-range.js](compare-range.js) for its native range-to-CSS binding. [Real HTML examples](../../../playground/form-data-experiment-v046/index.html).

| ID | Scoped CSS | Native behavior / material | Host integration boundary |
| --- | --- | --- | --- |
| FX-037 | `.fx46-email-field` | Native validated email field / 原生邮箱验证字段 | Browser email semantics, required constraints, visible helper and :user-invalid styling. Host supplies submit/cross-field rules. |
| FX-038 | `.fx46-file-tile` | Native file chooser tile / 原生文件选取区 | Real input[type=file] and focus-visible; no drag/drop, upload API, storage or malware checks. |
| FX-039 | `.fx46-color-well` | Chromatic color well / 原生调色盘 | Real input[type=color] exposed with label; no persistent palette, synchronization or contrast checker. |
| FX-040 | `.fx46-search-strip` | Command-key search strip / 搜索快捷键条 | Native search input; decorative kbd hint does not implement Command-K activation, suggestions or search. |
| FX-041 | `.fx46-compare` | Range-operated comparison window / 可操作前后对照 | Original local JS binds native range to CSS clip and percent output; actual images and persistence supplied by host; not shipped as React. |
| FX-042 | `.fx46-histogram` | Accessible mini histogram / 语义直方条 | Semantic figure and authored values; bars are static CSS lengths, no scale interpolation or data binding. |
| FX-043 | `.fx46-heatmap` | Calendar intensity matrix / 日历强度矩阵 | Fixed sample value cells include text label for intensity; real day/value mapping and hover tooltips require host. |
| FX-044 | `.fx46-code-diff` | Semantic inline diff viewport / 语义差异视图 | Native ins/del wrapped in pre/code; diff calculation, trusted content escaping and approval flow require host. |
| FX-045 | `.fx46-state-notice` | Bordered state notice / 边框状态通知 | Visible role=status sample with text/icon; no timers, dismiss, server event or assertive alert priority. |
| FX-046 | `.fx46-task-progress` | Native completion progress / 原生完成进度条 | Native progress element has meaningful value/maximum and label; real progress source is the host. |
| FX-047 | `.fx46-type-poster` | Oversized typography poster / 超大排印海报 | Original opt-in CSS typography arrangement; host provides accessible heading and content; no font licensed/transferred. |
| FX-048 | `.fx46-ticket` | Perforated coupon card / 冲孔票券卡片 | Decorative punch-hole card with semantic coupon text; not a redemption mechanism or pricing policy. |

- FX-037: the browser handles email input validation and `:user-invalid` presentation; test browser fallback and submit lifecycle separately.
- FX-038/039/040: file selection, native color picker and search text editing are genuine native controls; no upload/contrast/search API is implied.
- FX-041: range input produces actual split reveal in the specimen with local JS; replace placeholder CSS colors with appropriately licensed host images. All example media are original gradients.
- FX-042/043/044/045/046: sample data and notices; labels and native semantics are provided, but actual values/events are the host's responsibility.
- FX-047/048: solely visual and typographic arrangements; no external fonts or redemption code.

**Extract only the CSS family and its descendants** plus relevant `forced-colors`, narrow-screen, and reduced-motion rules. No `:root`, external imports, CSS resets or new global theme. Test keyboard and device behavior, status announcements, contrast and actual data before real use.
