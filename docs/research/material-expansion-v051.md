# V0.51 · 实验动效、SVG 遮罩与自包含矢量动画（2026-11-12）

本轮基于现有 471 项资产去重，新增 **7 个可独立提取的动效/CSS 原子（FX-078..084）和 8 份新增类型的原创 SVG 文件（VG-073..080）**。总计 **486 个资产**。不重复 V0.50 静态统计图、印刷覆盖层或 V0.48 游戏勋章图标。

## 七个原创 HTML/CSS 素材

- **FX-078** Accessible looped editorial ticker / 可暂停循环文字带：`.fx51-loop-ticker`。Original CSS horizontal loop with the second segment aria-hidden. Pauses on hover/focus and removes animation under reduced motion; duplicated decorative text is not a feed or live announcement.
- **FX-079** Kinetic staggered headline / 错行滑移排印：`.fx51-stagger-type`。Real DOM heading with independently offset text lines on hover/focus-within; no text splitting algorithm or variable font installation.
- **FX-080** Pointer aperture color reveal / 指针光圈揭示：`.fx51-aperture-reveal`。Optional original local Pointer Event script moves a radial mask over two original gradient layers; keyboard focus reveals the full layer. Does not compare photos or process uploaded images.
- **FX-081** Native toggle flip information tile / 可切换双面信息牌：`.fx51-flip-tile`。Real button toggles accessible aria-pressed, label and local 3D card orientation via a short JS adapter; no content fetching, state storage or hidden web app.
- **FX-082** Progressive CSS scroll reader strip / CSS 滚读进度轨：`.fx51-scroll-rail`。CSS scroll() timeline drives a 0–100% decorative track in supporting browsers; unsupported browsers and reduced-motion show a static guide, not an accurate progress status.
- **FX-083** Morphing cut-corner anchor / 变形剪角链接：`.fx51-morph-link`。Real native anchor changes polygon outline on hover/focus with reduced-motion static fallback; target URL must be changed by host.
- **FX-084** Vertical marginalia spine / 竖排页边注书脊：`.fx51-vertical-spine`。Semantic heading/paragraph with CSS writing-mode label; naturally stacks at narrow width. Editorial text and localization are supplied by host.

[源码 CSS](../../styles/primitives/v051/kinetic-visuals.css) · [原生可选 JS](../../styles/primitives/v051/motion-adapters.js) · [独立 HTML 预览](../../playground/kinetic-visuals-v051/index.html)。

FX-078 是可暂停的无障碍文本循环带，不将复制文本重复播报；FX-079 交错排印保留 DOM 标题；FX-080 使用原生 Pointer Event 修改 CSS 局部径向遮罩，聚焦后可以查看完整第二层；FX-081 是真实可以按 Enter/Space 翻转的原生按钮、JS 同步 `aria-pressed`；FX-082 使用 `animation-timeline:scroll()` 浏览器渐进增强，兼容与减少动态效果时显示静态轨道；FX-083 是具有实际锚点链接的剪角变形素材；FX-084 使用原生 writing-mode 排版而非旋转位图。

## 四份原创新类型：可直接 CSS mask-image 调用的 SVG alpha masks

- **VG-073** [Scalloped window mask / 花边窗遮罩](../../graphics/v051/masks/scalloped-window-mask.svg)：scalloped panel shape。
- **VG-074** [Ticket-notch mask / 半月缺口遮罩](../../graphics/v051/masks/ticket-notch-mask.svg)：ticket sheet with opposing notches。
- **VG-075** [Ripped-paper mask / 锯齿纸缘遮罩](../../graphics/v051/masks/ripped-paper-mask.svg)：irregular continuous zig-zag rip outline。
- **VG-076** [Keyhole portal mask / 钥匙孔门型遮罩](../../graphics/v051/masks/keyhole-portal-mask.svg)：round arch and elongated keyhole。

遮罩是白色不透明形状 + SVG 透明区域，分别提供花边窗、票券缺口、撕纸边缘和钥匙孔构图。与之前矢量插画、背景纹理、透明覆盖层不同，直接作为 **CSS `mask-image:url(...)`** 来源使用，且预览页实际使用该机制。[遮罩原生样张](../../playground/shape-masks-v051/index.html)。

## 四份自包含 SVG 动画作品

- **VG-077** [Orbit wreath motion / 轨迹花环](../../graphics/v051/motion/orbit-wreath-motion.svg)：abstract symmetrical wreath, outer ring turns on hover。
- **VG-078** [Breathing rosace / 呼吸花窗](../../graphics/v051/motion/breathing-rosace-motion.svg)：radial translucent leaf window that gently pulses on hover。
- **VG-079** [Pendulum label / 摆锤标签](../../graphics/v051/motion/pendulum-label-motion.svg)：graphic pendulum tether with controlled CSS oscillation on hover。
- **VG-080** [Ripple emblem / 水纹徽记](../../graphics/v051/motion/ripple-emblem-motion.svg)：concentric independent ripple ring opacity on hover。

这组文件首次以独立 SVG 内嵌 CSS keyframes，`svg:hover` 才动画，并在 `prefers-reduced-motion:reduce` 下静态显示。它们是装饰性 SVG 图片：作为 `img` 引用时不具备键盘触发交互，不能替代关键功能。[SVG 动效样张](../../playground/svg-motion-v051/index.html)。

## 登记与风险声明

- 本轮 FX-078..084、VG-073..080 全部为真实独立源码与检索条目，不引入新 React 公共导出、新主题、新业务产品、字体文件、第三方资产或动效包。
- 索引与源码、SVG title/desc、CSS 命名作用域、demo 引用、禁用动态效果规则进行基础一致性核查；未进行真实浏览器、设备、无障碍工具验收。
- 对兼容性有要求的项目，应验证 pointer CSS mask、flip 3D、滚动时间轴、SVG 内部 hover 动画在目标设备的实际行为。
