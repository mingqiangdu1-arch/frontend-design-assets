# V0.47 · 实验字体、动态材质与可平铺 SVG 图案（2026-11-12）

本轮侧重**不同于常规组件库的新素材类型**，不扩建工具平台。原仓库 392 条登记，本轮 6 个原创 CSS 原子 + 8 个原创纹理图案 + 4 个原创 SVG 场景，累计 **410** 个资产。没有重复 V0.46 的输入字段、进度条或对比滑块。

## 可独立提取的原创 CSS

- **FX-049 — Chromatic echo typography / 色差重影排印**：`.fx47-chromatic-type`；Decorative text-shadow on real accessible HTML heading. No duplicate content or motion.；适用 signal-noir / type-led-minimal。
- **FX-050 — Pointer-responsive holographic card / 指针响应全息卡**：`.fx47-holo-card`；Original bounded pointer-based tilt with local JS; anchor remains keyboard accessible, static reduced-motion mode. Not a gyroscope or real 3D model.；适用 aether-orbit / precision-dark。
- **FX-051 — Rubber stamp label / 橡皮印章标签**：`.fx47-stamp-label`；CSS-only decorative label with readable DOM text; no custom font or stamp background image.；适用 editorial-warm / paper-rebellion。
- **FX-052 — Organic blob viewport / 有机形态媒体窗口**：`.fx47-blob-frame`；Standalone CSS clipped visual sample; host replaces gradient with owned images/media and supplies appropriate alt text.；适用 organic-tactile / shape-expressive。
- **FX-053 — Letterpress editorial drop cap / 活版首字下沉**：`.fx47-dropcap`；Semantic paragraph with CSS ::first-letter; needs target-language typography and responsive line-wrap review.；适用 editorial-warm / type-led-minimal。
- **FX-054 — Numbered chapter spine navigation / 编号章节侧脊导航**：`.fx47-chapter-spine`；Native semantic nav/ordered list/anchor targets; no automatic active-section detection or scrollspy.；适用 type-led-minimal / paper-rebellion。

[源码 CSS](../../styles/primitives/v047/expressive-atoms.css) · [全息指针微交互适配器](../../styles/primitives/v047/holo-card.js) · [六项独立样张](../../playground/expressive-atoms-v047/index.html)

仅 FX-050 引入很小的原创本地 JS：Pointer Event 动态修改 CSS custom properties，指针离开与 blur 恢复静态，touch 和 prefers-reduced-motion 降级为静态。其他五项仅使用 HTML/CSS。不是真实 3D 引擎，也没有向外部项目导出 React 组件。

## 新增可平铺 SVG 纹理图案

- **VG-023** [Microdot Field / 细点织理](../../graphics/v047/patterns/microdot-field.svg)：内嵌 32 单位周期图形；对应 background / editorial。
- **VG-024** [Herringbone Trace / 人字斜纹](../../graphics/v047/patterns/herringbone-trace.svg)：内嵌 32 单位周期图形；对应 surface / fashion。
- **VG-025** [Diamond Lozenge / 菱格织纹](../../graphics/v047/patterns/diamond-lozenge.svg)：内嵌 64 单位周期图形；对应 poster / surface。
- **VG-026** [Halfmoon Lattice / 半月阵列](../../graphics/v047/patterns/halfmoon-lattice.svg)：内嵌 64 单位周期图形；对应 background / campaign。
- **VG-027** [Crossstitch Pixel / 十字绣像素](../../graphics/v047/patterns/crossstitch-pixels.svg)：内嵌 32 单位周期图形；对应 game-companion / surface。
- **VG-028** [Modular Trace / 模块导线纹](../../graphics/v047/patterns/modular-trace.svg)：内嵌 64 单位周期图形；对应 developer-tool / background。
- **VG-029** [Broken Checker / 断续棋盘格](../../graphics/v047/patterns/broken-checker.svg)：内嵌 64 单位周期图形；对应 campaign / poster。
- **VG-030** [Contour Waves / 连续等高线](../../graphics/v047/patterns/contour-waves.svg)：内嵌 64 单位周期图形；对应 creative-site / surface。

这些不同于以前的大幅 SVG 插画，实际可作为独立重复背景素材取用；原图 `256×256`、`patternUnits=userSpaceOnUse`，用独立[双密度平铺展示](../../playground/surface-patterns-v047/index.html)辅助比对。平铺接口已实现于源码，真实设备上的图案断点视觉仍需目标场景复审。

## 四份新 SVG 场景

- **VG-031** [Glass Relief / 浮雕玻璃形态](../../graphics/v047/scenes/glass-relief.svg)：适合 hero-art / creative-site。
- **VG-032** [Paper Architecture / 折纸建筑层景](../../graphics/v047/scenes/paper-architecture.svg)：适合 culture / editorial。
- **VG-033** [Pixel Flora / 像素植物机械](../../graphics/v047/scenes/pixel-flora.svg)：适合 game-companion / creative-site。
- **VG-034** [Optical Portal / 视错觉空间入口](../../graphics/v047/scenes/optical-portal.svg)：适合 poster / brand。

[独立场景预览](../../playground/vector-scenes-v047/index.html)；每份 `640×360`，所有图形为原创矢量几何，不引用远程图片/字体/脚本。用于视觉方向素材，不表示实时传感数据、WebGL 实现或构建完成页面。

## 生命周期与边界

- `FX-049..054` 和 `VG-023..034` 都登记为 `reference-implemented / styled-implementation`，文件真实存在，可独立提取；**不是已发布的 React 公共导出**。
- 维持 48 个 React 公共导出、14 套主题（默认主题仍为空）、外部素材来源授权隔离。
- 仅做基础源码/文件/索引一致性核查；未进行生产浏览器渲染、人工视觉验收、设备/读屏认证。
