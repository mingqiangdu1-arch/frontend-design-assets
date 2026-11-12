# V0.50 · 印刷美术、证据图形与双比例插画素材拓展（2026-11-12）

继续遵循素材仓库的 material-first 原则，不搭建完整应用/文档编辑器。本轮新增 **8 个 CSS/HTML 原件 FX-070..077** 和 **10 个原创 SVG VG-063..072**，登记资产从 453 增至 **471**。

## 原生 CSS / HTML 原件

- **FX-070 Risograph dot-duotone print specimen / 孔版双色印刷样张**：`.fx50-riso-duo`。Original CSS radial-gradient dots and registration offset over a real heading, not actual print separation or a rasterized photograph.
- **FX-071 Newspaper column reading lead / 报纸分栏导语**：`.fx50-news-lead`。Real heading, text, newspaper-like CSS columns and responsive single-column layout. Reading order remains DOM-linear; host supplies editorial text.
- **FX-072 Layered paper cut collage / 手工剪贴层景**：`.fx50-paper-collage`。Independent CSS colored geometric paper shapes; no external photo, drag controls, licensed scanned paper, or editable collage workspace.
- **FX-073 Bracketed annotation figure / 括号式图注证据卡**：`.fx50-annotation-figure`。Semantic figure/caption plus text labels; visual trace is static sample, no true source record or chart calculation.
- **FX-074 Two-category slopegraph / 双类变化斜率图**：`.fx50-slopegraph`。Actual inline SVG connects two illustrative static paired values with adjacent text; no charting library, live dataset, numeric scale engine, or inferred causal conclusion.
- **FX-075 Uncertainty interval rails / 不确定性区间轨**：`.fx50-interval-rail`。Explicit low/center/high sample values are mirrored by bounded CSS positions on one static 0–100 axis; not computed confidence intervals or probability assertions.
- **FX-076 Paired dumbbell comparison rows / 哑铃差异对照条**：`.fx50-dumbbell`。Native list of static numeric pair samples drawn on consistent 0–100 CSS scale; host must update text and geometry together.
- **FX-077 Source provenance bibliography ribbon / 来源证据索引条**：`.fx50-source-ribbon`。Genuine anchor references to local specimen source notes with navigable targets; does not verify external citations or download publications.

[CSS 源码](../../styles/primitives/v050/print-evidence-atoms.css) · [八种可单独提取的 HTML 样张](../../playground/print-evidence-v050/index.html) · [复制边界说明](../../styles/primitives/v050/README.md)

**关键真实性：** FX-074 使用原生 inline SVG 实际绘制 2 条 0–100 假设变化斜率，并且写出对应值 A：70→35、B：30→75；FX-075 区间轨的左右/中值逐条明确且 CSS 自定义属性与文案对应；FX-076 哑铃图的 before/after 值与 CSS 点坐标一致。这些不是来自真实研究的统计数据，也不包含置信水平和实际置信区间计算。真实场景需在宿主对数据、单位、来源及所有标注统一绑定/核验。

## 四份 SVG 透明印刷质感叠层

- **VG-063** [Ink mist / 喷墨雾点透明层](../../graphics/v050/overlays/ink-mist-overlay.svg)：独立透明 640×360 图形。
- **VG-064** [Pigment laydown / 颜料铺墨透明层](../../graphics/v050/overlays/ink-laydown-overlay.svg)：独立透明 640×360 图形。
- **VG-065** [Registration crosshairs / 套印定位标透明层](../../graphics/v050/overlays/print-register-marks.svg)：独立透明 640×360 图形。
- **VG-066** [Fold & crease / 折页压痕透明层](../../graphics/v050/overlays/fold-and-crease-lines.svg)：独立透明 640×360 图形。

[叠层预览](../../playground/print-overlays-v050/index.html)，背景来自展示页，不嵌入 SVG。区别于上一轮透明“边框角”的素材，这一组是可以覆盖大面积媒体的颗粒、铺墨、套印点与折痕；没有复制他人材质照片。

## 四份概念型数据叙事 SVG

- **VG-067** [Branching route schema / 分流路径示意](../../graphics/v050/diagrams/branching-route-schema.svg)：示意 infographic / data-story。
- **VG-068** [Evidence stack schema / 来源证据叠层图](../../graphics/v050/diagrams/evidence-stack-schema.svg)：示意 infographic / research。
- **VG-069** [Parallel narrative tracks / 双线叙事图](../../graphics/v050/diagrams/parallel-narrative-schema.svg)：示意 infographic / storytelling。
- **VG-070** [Milestone annotation stages / 关键节点注解图](../../graphics/v050/diagrams/milestone-annotation-schema.svg)：示意 infographic / education。

[图形预览](../../playground/story-diagrams-v050/index.html)。仅以原创几何说明分流、证据叠层、双线叙事和里程碑等表达方式，并不冒称对真实数据进行了分析。

## 两份原创独立比例剪纸插画

- **VG-071** [Portrait cut-paper vignette / 纵向剪纸插画](../../graphics/v050/vignettes/portrait-cutpaper-vignette.svg)：320×480，mobile-cover / poster。
- **VG-072** [Landscape cut-paper vignette / 横向剪纸插画](../../graphics/v050/vignettes/landscape-cutpaper-vignette.svg)：640×360，hero-banner / campaign。

[双比例预览](../../playground/vignettes-v050/index.html)。两张采用相同主题色和形状语言，但分别独立构图，避免简单拉伸导致竖屏/横屏构图失衡。

## 限制与后续

- 本轮只添加 HTML/CSS、SVG 源文件、取用说明、独立样张与机器登记；React 仍保持 48 个公共导出、14 套独立风格，无默认全局主题。
- 没有应用组装、前端生成器、运行时包、第三方字体或媒体、无额外测试框架。
- 基本检查：路径、资产 ID 与原件一致性；SVG 标题/描述/尺寸和对外引用；数据文本/静态图形的手动对应逻辑。未做生产级浏览器/设备/读屏测试。
