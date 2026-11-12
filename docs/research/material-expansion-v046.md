# V0.46 · 表单、数据与实验视觉材料（2026-11-12）

本轮延续“material-first”，主登记从 **374 → 392**：新增 12 个原创 CSS 源码独立组件（FX-037..048）和 6 个原创 SVG（VG-017..022）。与 V0.45 移动/音频/空状态素材错位，本轮增加表单输入、比较工具、统计表现和印刷风格。

## 一、原生 CSS 原子

- **FX-037 Native validated email field / 原生邮箱验证字段** `.fx46-email-field`：Browser email semantics, required constraints, visible helper and :user-invalid styling. Host supplies submit/cross-field rules.。推荐主题：refined-light-saas / editorial-warm。
- **FX-038 Native file chooser tile / 原生文件选取区** `.fx46-file-tile`：Real input[type=file] and focus-visible; no drag/drop, upload API, storage or malware checks.。推荐主题：refined-light-saas / shape-expressive。
- **FX-039 Chromatic color well / 原生调色盘** `.fx46-color-well`：Real input[type=color] exposed with label; no persistent palette, synchronization or contrast checker.。推荐主题：shape-expressive / playful-pop。
- **FX-040 Command-key search strip / 搜索快捷键条** `.fx46-search-strip`：Native search input; decorative kbd hint does not implement Command-K activation, suggestions or search.。推荐主题：refined-light-saas / precision-dark。
- **FX-041 Range-operated comparison window / 可操作前后对照** `.fx46-compare`：Original local JS binds native range to CSS clip and percent output; actual images and persistence supplied by host; not shipped as React.。推荐主题：shape-expressive / signal-noir。
- **FX-042 Accessible mini histogram / 语义直方条** `.fx46-histogram`：Semantic figure and authored values; bars are static CSS lengths, no scale interpolation or data binding.。推荐主题：refined-light-saas / precision-dark。
- **FX-043 Calendar intensity matrix / 日历强度矩阵** `.fx46-heatmap`：Fixed sample value cells include text label for intensity; real day/value mapping and hover tooltips require host.。推荐主题：refined-light-saas / organic-tactile。
- **FX-044 Semantic inline diff viewport / 语义差异视图** `.fx46-code-diff`：Native ins/del wrapped in pre/code; diff calculation, trusted content escaping and approval flow require host.。推荐主题：precision-dark / signal-noir。
- **FX-045 Bordered state notice / 边框状态通知** `.fx46-state-notice`：Visible role=status sample with text/icon; no timers, dismiss, server event or assertive alert priority.。推荐主题：refined-light-saas / editorial-warm。
- **FX-046 Native completion progress / 原生完成进度条** `.fx46-task-progress`：Native progress element has meaningful value/maximum and label; real progress source is the host.。推荐主题：refined-light-saas / playful-pop。
- **FX-047 Oversized typography poster / 超大排印海报** `.fx46-type-poster`：Original opt-in CSS typography arrangement; host provides accessible heading and content; no font licensed/transferred.。推荐主题：type-led-minimal / paper-rebellion。
- **FX-048 Perforated coupon card / 冲孔票券卡片** `.fx46-ticket`：Decorative punch-hole card with semantic coupon text; not a redemption mechanism or pricing policy.。推荐主题：editorial-warm / playful-pop。

[源码 CSS](../../styles/primitives/v046/form-data-experiment.css) · [交互对比 JS](../../styles/primitives/v046/compare-range.js) · [HTML 样例](../../playground/form-data-experiment-v046/index.html) · [单项取用说明](../../styles/primitives/v046/README.md)

**FX-041 是真实的局部滑块对照交互**：一段小型无依赖 ESM 监听 range 的 input，将显示比例映射到 CSS `--fx46-split` 并更新 output。样例“前后图像”使用原创渐变。宿主可替换为已授权媒体并检查键盘、低性能设备与焦点。

FX-037/038/039/040/046 使用原生 email/file/color/search/progress 语义与行为。其余为静态数据/视觉素材，不冒称联动后端。CSS 均按 `fx46-*` 隔离，无全局默认主题或外部资源依赖。

## 二、原创 SVG 原文件

- **VG-017** [spectral-ribbons.svg](../../graphics/v046/spectral-ribbons.svg)：Spectral ribbons / 光谱丝带，Layered original gradients and clipped ribbon geometry。
- **VG-018** [editorial-ticket.svg](../../graphics/v046/editorial-ticket.svg)：Editorial ticket plate / 编辑票券插画，Original torn-edge card with registration marks and shapes。
- **VG-019** [instrument-dial.svg](../../graphics/v046/instrument-dial.svg)：Analog instrument dial / 仪表刻盘，Concentric scale and manually arranged ticks。
- **VG-020** [halftone-orbit.svg](../../graphics/v046/halftone-orbit.svg)：Halftone orbit field / 网点环场，Generated original gradient-like scatter of geometric dot sizes。
- **VG-021** [botanical-blueprint.svg](../../graphics/v046/botanical-blueprint.svg)：Botanical blueprint / 植物蓝图，Original botanical contour leaves and measurement guides。
- **VG-022** [storyboard-frames.svg](../../graphics/v046/storyboard-frames.svg)：Story contact sheet / 分镜接触样张，Original 3-shot story framing of abstract shapes。

[完整 SVG 素材目录](../../graphics/v046/) · [静态 SVG 展示页](../../playground/vector-studies-v046/index.html)

SVG 均为不依赖远程资源、可编辑的原创形状。仪表、网点和分镜是示意视觉，不代表实际服务端数据、音频或媒体文件。

## 三、资产边界与验收

- 新增 18 个 `reference-implemented / styled-implementation` 项，指向真实 CSS、JS 或 SVG 文件及展示页。
- React 公共导出仍保持 **48**；主题仍为 **14** 个；没有新增测试框架、页面生成器或第三方安装。
- 仅对机器索引、原件存在和独立代码结构进行轻量核查。未进行生产级浏览器兼容、真实设备、读屏或视觉定稿验证。
