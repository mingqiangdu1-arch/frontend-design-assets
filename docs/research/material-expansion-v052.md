# V0.52 · 原创 Canvas 程序绘图、空间 CSS 与独立伪 3D SVG（2026-11-12）

继续长期素材仓库 material-first 原则，避免升级为应用、页面生成器、整套 3D 引擎或重复的测试/索引工具。本轮从上版 V0.51 的 486 个登记资产新增 15 个真正实体素材，累计 **501** 个唯一素材 ID。

## 五个真实可运行的 Canvas 绘图算法

| ID | 原创绘图算法 | 事实边界 |
| --- | --- | --- |
| FX-085 | `contour` · Seeded contour harmonics / 种子谐波等高线 | Seeded static 2D harmonic paths, not GIS topography, height measurements or a shader. |
| FX-086 | `facets` · Jittered triangle relief / 扰动三角镶片 | Triangles from a seeded jittered rectangular grid, not a Delaunay mesh solver or 3D object. |
| FX-087 | `lissajous` · Lissajous light trails / 李萨如光轨 | Original parametric 2D curves, not an oscilloscope or audio-connected signal. |
| FX-088 | `stipple` · Stipple dune field / 沙丘点描场 | Seeded decorative particle density, not physical sand simulation or photograph. |
| FX-089 | `voxel` · Projected voxel skyline / 投影体素城景 | Pseudodepth 2D isometric cube projection, not a 3D mesh engine. |

[原生 JavaScript 源码](../../styles/primitives/v052/procedural-figures.js) · [五份独立 Canvas 样张](../../playground/procedural-depth-v052/index.html)。

每个算法通过原创确定性 PRNG、绘制函数和 `data-seed` 实现相同种子的可复现静态渲染。按钮只更新对应图形的 seed（增加 7919）并重绘。Canvas 像素适配 CSS 宽度和最高 2 倍 DPR；有 ResizeObserver 时跟随容器宽度变化重绘。不使用外部图形库、数据接口、动画循环、WebGL、真实音频或空间数据。

## 四个独立空间 CSS 与原生状态素材

| ID | 原件 | 行为限制 |
| --- | --- | --- |
| FX-090 | `.fx52-acrylic-stack` · Acrylic depth slabs / 亚克力叠层 | CSS-perspective translucent slabs, not optical refraction or a true 3D model. |
| FX-091 | `.fx52-fold-gate` · Origami gate fold / 原生折页门 | Native checkbox reveals an underlay by hinged CSS panels, not persisted document editing. |
| FX-092 | `.fx52-perspective-palette` · Perspective swatch selector / 透视材质色盘 | Three real radio states change a CSS material plate via :has; no WebGL or theme persistence. |
| FX-093 | `.fx52-anamorphic-title` · Extruded type illusion / 错视挤出排字 | Single semantic heading with original CSS stacked shadow; no 3D mesh or external font. |

[CSS 原文件](../../styles/primitives/v052/procedural-and-depth.css) · [同页独立 HTML 样张](../../playground/procedural-depth-v052/index.html)。两项纯原生输入（checkbox 折页、radio 材质切换）具备本地状态，CSS 提供 reduced-motion / forced-colors 基础处理。空间视觉依赖原生二维 CSS 变换，不是可导出的 3D 模型。

## 六幅独立原创伪 3D SVG 插画

- **VG-081 Acrylic monoliths / 亚克力几何碑**：[acrylic-monoliths.svg](../../graphics/v052/scenes/acrylic-monoliths.svg)；Original vector translucent layered pseudo-3D faceted pillars; not a true optical simulation.
- **VG-082 Clay loop knot / 陶土环结**：[clay-loop-knot.svg](../../graphics/v052/scenes/clay-loop-knot.svg)；Original broad strokes simulate a soft knot with highlights and shadows; no 3D mesh.
- **VG-083 Cubist shelter / 立体派庇护所**：[cubist-shelter.svg](../../graphics/v052/scenes/cubist-shelter.svg)；Hand-authored stacked architectural polygons with occlusion, not architecturally measured.
- **VG-084 Layered terrain / 层积地形剖面**：[layered-terrain-cutaway.svg](../../graphics/v052/scenes/layered-terrain-cutaway.svg)；Illustrative strata with layered hand-curved silhouettes; not sourced geological measurement.
- **VG-085 Light corridor / 光之回廊**：[light-corridor.svg](../../graphics/v052/scenes/light-corridor.svg)；Nested neon perspective frames with vanishing geometry; not a ray-traced tunnel.
- **VG-086 Ceramic turntable / 陶瓷环叠雕塑**：[ceramic-turntable.svg](../../graphics/v052/scenes/ceramic-turntable.svg)；Matte ellipse ring stacks with simple vector shading, not actual rotational 3D geometry.

[SVG 六图图库](../../playground/depth-scenes-v052/index.html) · [单项复制和边界说明](../../graphics/v052/README.md)。全部独立 640×360 编辑型矢量原件，具有 title、desc、viewBox，未引入外部图片、版权媒体、图标字体或第三方引擎。

## 质量范围与后续

本轮完成源码路径、索引、基础 JS/CSS 实现和 SVG 自包含性核查；未进行真实浏览器、GPU、移动设备、读屏器或生产视觉验收。仍维持 48 个已存在的 React 公共导出、14 套独立风格、无默认全局风格、不建站和不组装业务应用。
