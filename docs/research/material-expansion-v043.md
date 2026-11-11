# V0.43 · 可直接复用的 CSS 组件 × 独立 SVG 图形 × 具体上游组件（2026-11-11）

本轮严格围绕素材本身：**8 个原创 CSS 外观与轻交互 + 6 个原创独立 SVG 图形文件 + 8 个经源码路径确认的上游具体组件参考**，而不是再收录一批项目首页或开发新的测试框架。资产目录 **315 → 337**，保持非公开素材仓库、不组装成品网站。

[机器目录](../../registry/material-expansion-v043.json) · [CSS 源码](../../styles/primitives/v043/creative-components.css) · [CSS 单独样张](../../playground/creative-components-v043/index.html) · [SVG 目录](../../graphics/v043/) · [SVG 独立预览](../../playground/vector-studies-v043/index.html)

## 1. 八项真实的组件级上游素材

| 资产 | 实际固定版本 TSX 源码 | 与已有源目录的差异 | 复用风险 |
| --- | --- | --- | --- |
| **REF-124** Cult UI Dynamic Island / 多状态浮岛 | [源码](https://github.com/nolly-studio/cult-ui/blob/d71b1428b811c2779d46ea41b7ef8c9f9c9991c2/apps/www/registry/default/ui/dynamic-island.tsx) / [说明](https://github.com/nolly-studio/cult-ui/blob/d71b1428b811c2779d46ea41b7ef8c9f9c9991c2/apps/www/content/docs/components/dynamic-island.mdx) | 多个尺寸预设与浮岛容器状态，研究短内容→扩展面板的过渡组织；已查看：SizePresets, motion/react, context/reducer | 涉及多种宽度与移动高度规则；需另外验证触摸、键盘、关闭与信息密度 |
| **REF-125** Cult UI Shift Card / 分层内容切换卡 | [源码](https://github.com/nolly-studio/cult-ui/blob/d71b1428b811c2779d46ea41b7ef8c9f9c9991c2/apps/www/registry/default/ui/shift-card.tsx) / [说明](https://github.com/nolly-studio/cult-ui/blob/d71b1428b811c2779d46ea41b7ef8c9f9c9991c2/apps/www/content/docs/components/shift-card.mdx) | top/middle/bottom 与 hover 内容分离的动态卡片结构；已查看：topContent, middleContent, topAnimateContent, bottomContent | 交互需适配 focus-visible/触摸与 motion preferences；不当作通用卡片组件导出 |
| **REF-126** Magic UI Bento Grid / 不对称故事卡布局 | [源码](https://github.com/magicuidesign/magicui/blob/1ac985adca3cdfab9b1739253fd14209687c4e9c/apps/www/registry/magicui/bento-grid.tsx) / [说明](https://github.com/magicuidesign/magicui/blob/1ac985adca3cdfab9b1739253fd14209687c4e9c/apps/www/content/docs/components/bento-grid.mdx) | BentoGrid 容器与带图标、背景、CTA 的 BentoCard 组合粒度；已查看：name, description, background, Icon, href, cta | 上游组件依赖 Button、Icon、cn 和 CSS 栅格尺寸；按内容层级重排，而不是整页搬运 |
| **REF-127** Magic UI Marquee / 方向可控内容跑马灯 | [源码](https://github.com/magicuidesign/magicui/blob/1ac985adca3cdfab9b1739253fd14209687c4e9c/apps/www/registry/magicui/marquee.tsx) / [说明](https://github.com/magicuidesign/magicui/blob/1ac985adca3cdfab9b1739253fd14209687c4e9c/apps/www/content/docs/components/marquee.mdx) | reverse、vertical、pauseOnHover、repeat 四类控制，适合 LOGO/案例展示轨道；已查看：reverse, vertical, pauseOnHover, repeat | 重复 DOM 和持续移动影响读屏、性能与 reduced-motion；重要内容不能只靠滚动展示 |
| **REF-128** Motion Primitives Text Morph / 字符身份映射变形 | [源码](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/text-morph.tsx) / [说明](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/app/docs/text-morph/page.mdx) | 根据字符与重复次数创建稳定键并转场的短文本更新模式；已查看：children, as, variants, transition | 字符拆分动画需提供整体语义文本与 reduced-motion 适配，非长文连续排版工具 |
| **REF-129** Motion Primitives Text Shimmer Wave / 波浪字形着色 | [源码](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/text-shimmer-wave.tsx) / [说明](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/app/docs/text-shimmer-wave/page.mdx) | 字符波浪、透视距离、缩放与时长参数构成的动效文字样式；已查看：duration, zDistance, xDistance, yDistance, spread, scaleDistance, rotateYDistance | 需要 motion/react；对频闪/阅读场景使用减动效和完整可访问文本 |
| **REF-130** Fancy Components Scramble Hover / 鼠标悬停文字扰码 | [源码](https://github.com/danielpetho/fancy/blob/f9f62c61207b2dd3210476dd98af3c9a5be24094/src/fancy/components/text/scramble-hover.tsx) / [说明](https://github.com/danielpetho/fancy/blob/f9f62c61207b2dd3210476dd98af3c9a5be24094/src/content/docs/components/text/scramble-hover.mdx) | 字符串扰码/逐步恢复，带逐段揭示与速度等参数；已查看：scrambleSpeed, maxIterations, sequential, revealDirection | hover 为主要触发；读屏不应读乱码，键盘与减少动效路径需单独提供 |
| **REF-131** Fancy Components Variable Font Cursor Proximity / 字轴邻近响应 | [源码](https://github.com/danielpetho/fancy/blob/f9f62c61207b2dd3210476dd98af3c9a5be24094/src/fancy/components/text/variable-font-cursor-proximity.tsx) / [说明](https://github.com/danielpetho/fancy/blob/f9f62c61207b2dd3210476dd98af3c9a5be24094/src/content/docs/components/text/variable-font-cursor-proximity.mdx) | 鼠标靠近不同字符时逐字变化可变字体轴，适用于创意标题与字形实验；已查看：fromFontVariationSettings, toFontVariationSettings, cursor proximity | 必须自行选用支持对应轴且已授权的 variable font；包含 mouse hook/motion，触摸和性能需重做 |

这些条目是具体 TSX 源码文件与文档路径，已用 GitHub 固定 commit 确认存在；不是通过旧 REF-111/112/114/115 项目首页推测出的卡片。**不复制外部源码、图片、品牌与字体文件**。父来源的仓库 MIT 信息仅作为初步证据，具体依赖、图像和字体仍需单项审核。不可将 REF 研究档案当成本仓库的 8 个已实现 React 组件。

## 2. 八个原创可拆用 CSS 组件外观

| 资产 | 可用 CSS Class | 核心能力 | 已明确关联主题 |
| --- | --- | --- | --- |
| **FX-007** Topographic contour surface / 等高线底纹 | `.fx43-topographic` | 静态等高线纹理，无远程贴图 | signal-noir / organic-tactile |
| **FX-008** Arched image window / 拱形媒体窗口 | `.fx43-arch-window` | 支持任意已授权 img/SVG 内容的拱形裁切容器 | editorial-warm / organic-tactile |
| **FX-009** Folded paper note / 折角便笺 | `.fx43-folded-paper` | 原生 CSS 折角卡片 | paper-rebellion / editorial-warm |
| **FX-010** Corner ribbon tile / 斜角角标 | `.fx43-ribbon-tile` | 独立斜角装饰标签，不阻挡真实控件 | commerce-atelier / playful-pop |
| **FX-011** Reveal-on-focus caption / 焦点说明图 | `.fx43-reveal-figure` | Hover、focus 与无 hover 设备显示图片说明 | type-led-minimal / signal-noir |
| **FX-012** Mechanical CSS checkbox switch / 机械拨片开关 | `.fx43-switch` | 利用真实 checkbox 实现可操作拨片 | precision-dark / signal-noir |
| **FX-013** Ink sweep underline / 墨迹扫线 | `.fx43-ink-link` | 键盘可见的短链接墨迹下划线 | editorial-warm / type-led-minimal |
| **FX-014** Isometric drafting grid / 等轴制图网格 | `.fx43-isometric-grid` | 无需 Canvas/WebGL 的静态等轴制图纹理 | aether-orbit / precision-dark |

所有组件实际源码均位于 `styles/primitives/v043/creative-components.css`；例如开关使用真正原生 checkbox，而不是伪交互图像。图片说明浮层支持 hover/focus/nonhover，交互微动效提供减少动态与强制颜色模式降级。原生 CSS 不需要额外 npm、字体下载、JavaScript，也没有全局 `:root` 样式覆盖。每个 Class 可单独取用，HTML 页只为展示而存在。

## 3. 六个原创、实际落盘的 SVG 图形

| 资产 | SVG 文件 | 用途 | 适用主题 |
| --- | --- | --- | --- |
| **VG-001** Wireframe dome / 线框穹顶 | [wireframe-dome.svg](../../graphics/v043/wireframe-dome.svg) | 原创线框球壳与地平线 | signal-noir / aether-orbit |
| **VG-002** Sunburst seal / 放射徽章 | [sunburst-seal.svg](../../graphics/v043/sunburst-seal.svg) | 原创放射锯齿徽章图形 | paper-rebellion / editorial-warm |
| **VG-003** Orbital loops / 星轨环 | [orbital-loops.svg](../../graphics/v043/orbital-loops.svg) | 原创空间环带和球体 | aether-orbit / precision-dark |
| **VG-004** Modular wave / 模块波纹 | [modular-wave.svg](../../graphics/v043/modular-wave.svg) | 原创抽象叠加色带 | playful-pop / shape-expressive |
| **VG-005** Paper-cut landscape / 剪纸景观 | [paper-cut-landscape.svg](../../graphics/v043/paper-cut-landscape.svg) | 原创剪纸风格山丘和河流 | organic-tactile / editorial-warm |
| **VG-006** Constellation map / 星图网络 | [constellation-map.svg](../../graphics/v043/constellation-map.svg) | 原创节点网格与连线 | signal-noir / aether-orbit |

六个 SVG 都是独立 `viewBox=640×360` 的源文件，内置原创矢量路径、`title` 和 `desc`，没有 `<image>` 的外部内容、图片 URL、JavaScript 或字体依赖。既可以作为普通媒体引用，也可在设计应用里自行修改颜色和几何结构。**SVG 内容的独立性与可编辑性不等于目标项目响应式表现已经验收**。

## 4. 检索与移植边界

- **REF-124..131**：`analyzed / design-reference / research-only`，仅外部官方路径与设计分析。没有在本库导出 React 源码。
- **FX-007..014**：`reference-implemented / styled-implementation / copyable-source`，原生 CSS 源码确实落地，可按 Class 单独复用；不是可安装 UI 包。
- **VG-001..006**：`reference-implemented / styled-implementation / copyable-source`，SVG 为独立原创图形媒体，支持检索特定视觉语法，而非一个新的 React 控件或前端风格方案。
- 本轮不创建新的 Node/Playwright 测试套件，不改变 48 个 React 公共导出、14 套风格、默认主题设置，不部署服务或页面搭建器。使用仓库现有的基本路径/索引校验，不用测试数量来替代素材积累。

## 5. 后续可真正继续扩张的素材缺口

优先扩大更多**组件实物**，如具针对性的搜索/筛选工具条、工业仪表、时间轴、组合型导航、游戏 HUD、动态数据标注、移动触摸手势、叙事滚动和图形背景；依旧采用具体可检索、可取用的源文件或可追溯的上游组件路径，而不是重复建协议层。
