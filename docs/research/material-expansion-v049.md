# V0.49 · 创意编辑微控件、专业线性图标与透明框角（2026-11-12）

本轮坚持 **material-first**，相较 V0.48 的游戏化彩色图标，增加实用的独立编辑微控件与完全不同的专业线性视觉语言。登记资产 **430 → 453**，新增 7 项原生 CSS 控件与视觉动效、12 份单体技术图标、4 份透明装饰框角。不建设完整画布编辑器、应用或页面生成器。

## 一、七个独立 HTML/CSS 创意微控件

- **FX-063 Gradient-angle scrubbing station / 渐变角度调节**：`.fx49-gradient-angle`。Native range 0–360 drives CSS gradient angle and output via tiny original local JS. No gradient-stop editor or saved configuration.。适用 creative-tool / design-specimen。
- **FX-064 Two-axis focal point target / 双轴视觉焦点**：`.fx49-focal-target`。Two native range fields update CSS 2D focal marker and percent outputs; demo uses original gradients, not image cropping or object recognition.。适用 media-tool / editor / creative-tool。
- **FX-065 Native three-palette visual switch / 原生三态色盘**：`.fx49-palette-choice`。CSS :has radio state changes a sample artboard; no theme persistence or external document writes. Requires browser support for :has.。适用 creative-tool / design-specimen。
- **FX-066 Opt-in print safe-area guide / 可切换排版安全线**：`.fx49-safe-area`。Native checkbox toggles sample guide overlay locally, not a calibrated print trim/bleed validator or a document layout editor.。适用 editorial / print-preview / creative-tool。
- **FX-067 Layer blending microscope / 图层混合观察窗**：`.fx49-blend-lab`。Native select switches CSS mix-blend-mode among explicit safe options; background is original gradients, not image compositing/export.。适用 creative-tool / graphics / editor。
- **FX-068 Modular grid density ruler / 栅格密度尺**：`.fx49-grid-density`。Native range adjusts repeat-grid CSS background-size and text output; not a snapping, alignment or vector editor engine.。适用 design-specimen / graphics / editor。
- **FX-069 Focus-activated orbit tracer / 聚焦轨迹动画**：`.fx49-orbit-tracer`。Original self-contained CSS animated dot travels around a rounded path only when button is hovered/focused; no timeline, background effect or service API.。适用 creative-site / portfolio / special-interaction。

[CSS 原件](../../styles/primitives/v049/creative-controls.css) · [局部 JS 实现](../../styles/primitives/v049/creative-controls.js) · [HTML 可操作样张](../../playground/creative-controls-v049/index.html) · [单项取用说明](../../styles/primitives/v049/README.md)

**真实性边界：** FX-063 的原生 `range` 可实际修改 CSS 线性渐变角度；FX-064 双轴 `range` 实际改变视觉目标百分比；FX-067 原生 `select` 实际切换 `mix-blend-mode`；FX-068 `range` 实际修改 CSS 背景网格大小。上述四项借助原创无依赖局部 JS。FX-065 三种 `radio` 与 FX-066 `checkbox` 用 CSS `:has` 实现可操作局部状态；FX-069 的语义按钮仅用于装饰轨迹反馈，不执行保存或设计命令。没有文件处理、持久化、文档状态同步或完整编辑画布。

## 二、原创线性技术图标 (VG-047..058)

- **VG-047** [Angle Dial / 角度盘](../../graphics/v049/icons/angle-dial.svg)：angle dial。
- **VG-048** [Focal Pin / 焦点针](../../graphics/v049/icons/focal-pin.svg)：focus pinpoint。
- **VG-049** [Gradient Steps / 渐变阶](../../graphics/v049/icons/gradient-steps.svg)：gradient stepping。
- **VG-050** [Crop Safe / 裁切线](../../graphics/v049/icons/crop-safe.svg)：crop outline。
- **VG-051** [Layer Blend / 混合层](../../graphics/v049/icons/layer-blend.svg)：layer blending。
- **VG-052** [Grid Dots / 网格锚点](../../graphics/v049/icons/grid-dots.svg)：grid vertex。
- **VG-053** [Bezier Handles / 贝塞尔把手](../../graphics/v049/icons/bezier-handles.svg)：curve path。
- **VG-054** [Align Baseline / 基线对齐](../../graphics/v049/icons/align-baseline.svg)：baseline alignment。
- **VG-055** [Perspective Box / 透视框](../../graphics/v049/icons/perspective-box.svg)：perspective wire cube。
- **VG-056** [Mask Shape / 蒙版窗](../../graphics/v049/icons/mask-shape.svg)：mask frame。
- **VG-057** [Inspect Lens / 检视透镜](../../graphics/v049/icons/inspect-lens.svg)：inspection magnifier。
- **VG-058** [Path Node / 路径节点](../../graphics/v049/icons/path-node.svg)：vector node selection。

[线性图标图库](../../playground/technical-icons-v049/index.html) · [源文件目录](../../graphics/v049/icons/)

这套 64×64 图标使用原生 SVG stroke 和局部点缀形状，与上一版的彩色游戏图标不同；每个图标可单独取用，不依赖外部图标库或字体。

## 三、原创透明 SVG 框角 (VG-059..062)

- **VG-059** [Art-deco rails / 艺术装饰双轨边框](../../graphics/v049/frames/art-deco-rails.svg)：paired symmetrical copper and emerald rails。
- **VG-060** [Technical registration / 工程套版框](../../graphics/v049/frames/technical-registration.svg)：measuring ticks and crop registers。
- **VG-061** [Botanical vine corners / 植物蔓枝边角](../../graphics/v049/frames/vine-corners.svg)：four organic leaf corner ornaments。
- **VG-062** [Pixel stitch perimeter / 像素绣边](../../graphics/v049/frames/pixel-stitch-frame.svg)：blocky repeat accents and open center。

[框角示例页](../../playground/overlay-frames-v049/index.html) · [SVG 源文件说明](../../graphics/v049/README.md)

四份 640×360 SVG 仅包含透明边角线条，不包含第三方图片。宿主可以叠加在媒体、章节背景或海报上；技术刻度仅为装饰，不可作为精确测量依据。

## 登记与质量边界

- 新增 **FX-063..069** 和 **VG-047..062** 共 23 项有实体源码、命名空间、独立示例、使用限制的资产。
- 原有 48 个 React 公共导出及 14 套主题不变化；没有新增默认风格、自动化测试框架、应用代码或第三方依赖。
- 执行文件路径、主索引唯一性、实际源码和 demo 引用等轻量检查；尚未进行生产浏览器、触摸设备、读屏器或视觉设计验收。
