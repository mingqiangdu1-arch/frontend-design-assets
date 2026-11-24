# V0.63 · 实验排版、空间媒体与编辑器原件来源

本轮从创意设计案例与实际源码中探索六个此前未直接收录的来源；八项精确源码参考，不是整站模板或已安装组件。逐项核查固定提交及对应 MIT 代码许可，媒体/字体/依赖不随项目代码许可自动授权。

发现入口：[Codrops Creative Hub](https://tympanus.net/codrops/hub/tutorials/) · [ElasticGridScroll](https://github.com/codrops/ElasticGridScroll/) · [Uncommon Web](https://webdev.teknium.io/)（仅来源探索，非登记资产）。

## REF-157 · Grid System · Seeded layout locks / 双种子锁定构图

- 仓库：dostevskii/grid-system · 固定提交 `203a601f5b362e16671484710a476ee3e72229d9`
- [src/core.ts](https://github.com/dostevskii/grid-system/blob/203a601f5b362e16671484710a476ee3e72229d9/src/core.ts)
- [src/WorkflowBar.tsx](https://github.com/dostevskii/grid-system/blob/203a601f5b362e16671484710a476ee3e72229d9/src/WorkflowBar.tsx)
- [MIT 代码许可证](https://github.com/dostevskii/grid-system/blob/203a601f5b362e16671484710a476ee3e72229d9/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：网格随机与内容/排版随机有独立种子入口；控制栏显式区分 grid lock、composition lock，数值种子可输入并触发生成。
- 既有素材差异：FX-068 为网格密度示意；此处是固定网格后探索内容构图、可重现种子状态。
- 风格深化候选：editorial-warm / type-led-minimal / paper-rebellion（非兼容承诺）
- 使用边界：依赖完整 Settings、字体度量、布局计算与 React；字体授权及导出权限另查，不复制字体或应用。

## REF-158 · Bouffont · Stepwise glyph growth / 逐步字形膨胀

- 仓库：meodai/bouffont · 固定提交 `32fd0e589b9a00a5c6c5e1a696213dac4fadb6bc`
- [src/strategies/grow.js](https://github.com/meodai/bouffont/blob/32fd0e589b9a00a5c6c5e1a696213dac4fadb6bc/src/strategies/grow.js)
- [MIT 代码许可证](https://github.com/meodai/bouffont/blob/32fd0e589b9a00a5c6c5e1a696213dac4fadb6bc/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：逐步偏移字形轮廓，通过邻字间距约束、裁切和形态开运算清理碎片，并恢复关键字形特征。
- 既有素材差异：REF-128 的字符变形与 FX-124..129 字符场不涉及真实字体轮廓几何。
- 风格深化候选：shape-expressive / playful-pop / organic-tactile（非兼容承诺）
- 使用边界：依赖轮廓裁切/偏移、字体解析与字形特征模块；字体和派生字形授权、复杂文字与可读性须分别检查。

## REF-159 · Bouffont · Glyph envelope warp / 文字外轮廓变形

- 仓库：meodai/bouffont · 固定提交 `32fd0e589b9a00a5c6c5e1a696213dac4fadb6bc`
- [src/envelope.js](https://github.com/meodai/bouffont/blob/32fd0e589b9a00a5c6c5e1a696213dac4fadb6bc/src/envelope.js)
- [MIT 代码许可证](https://github.com/meodai/bouffont/blob/32fd0e589b9a00a5c6c5e1a696213dac4fadb6bc/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：使用归一化横轴的上/下边界描述三角、云形等轮廓，将字形点映射到指定纵向区域；云形参数包含种子变化。
- 既有素材差异：区别于静态文字剪裁和逐字 CSS 动画：实际改变轮廓点而非裁去文本。
- 风格深化候选：shape-expressive / paper-rebellion / playful-pop（非兼容承诺）
- 使用边界：需正确解析和重采样真实轮廓，处理退化形状、文字语义及字体授权；不直接当可访问 DOM 文本。

## REF-160 · Magic Spells Split Text · Layout-aware units / 按版面拆分文本

- 仓库：magic-spells/split-text · 固定提交 `78e0c5a493fc69227188ecc80457fe84ce7dedff`
- [src/split-text.js](https://github.com/magic-spells/split-text/blob/78e0c5a493fc69227188ecc80457fe84ce7dedff/src/split-text.js)
- [MIT 代码许可证](https://github.com/magic-spells/split-text/blob/78e0c5a493fc69227188ecc80457fe84ce7dedff/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：Custom element 提供 words/chars/lines 模式与 visible/load/manual 触发；CSS first effect 注册及无 HTMLElement 时的模块导入回退。
- 既有素材差异：REF-128/129 是具体文字动效，REF-130 是扰码；此项关注可按实际行/字/词拆分的动画基础设施。
- 风格深化候选：type-led-minimal / editorial-warm / signal-noir（非兼容承诺）
- 使用边界：需审查 DOM 包装、字体加载后重排、CJK/emoji/RTL、读屏、无 JS 与 reduced-motion；CSS 依赖与现有 split 类工具不自动安装。

## REF-161 · Elastic Grid Scroll · Pinned spring strips / 弹性列带滚动

- 仓库：codrops/ElasticGridScroll · 固定提交 `40e474582ae72df26cd9d90b05d5b15fed423abd`
- [js/demo6/ElasticColumns.js](https://github.com/codrops/ElasticGridScroll/blob/40e474582ae72df26cd9d90b05d5b15fed423abd/js/demo6/ElasticColumns.js)
- [js/demo6/index.js](https://github.com/codrops/ElasticGridScroll/blob/40e474582ae72df26cd9d90b05d5b15fed423abd/js/demo6/index.js)
- [MIT 代码许可证](https://github.com/codrops/ElasticGridScroll/blob/40e474582ae72df26cd9d90b05d5b15fed423abd/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：Three.js 全屏渲染列条，顶部和底部固定，中部随滚动以弹簧滞后；shader 处理局部拉伸、色散及阴影；入口针对 reduced-motion 和 WebGL 失败提供降级。
- 既有素材差异：已有滚动叙事和 CSS 动效偏离散或整层移动，此处研究沿列纵向连续变形的局部几何。
- 风格深化候选：liquid-layer / aether-orbit / signal-noir（非兼容承诺）
- 使用边界：Three.js/WebGL2、GSAP/ScrollSmoother 和原图依赖的许可与性能分别核对；保留普通 DOM、焦点和滚动控制，不复制媒体或 vendored 库。

## REF-162 · Infinite Circular Gallery · Scroll-linked curved media / 环形滚动媒体轨道

- 仓库：bizarro/infinite-circular-webgl-gallery · 固定提交 `3db485819df63550f9872b0ca5e6961a9fe517e4`
- [app/Media.js](https://github.com/bizarro/infinite-circular-webgl-gallery/blob/3db485819df63550f9872b0ca5e6961a9fe517e4/app/Media.js)
- [app/shaders/image-vertex.glsl](https://github.com/bizarro/infinite-circular-webgl-gallery/blob/3db485819df63550f9872b0ca5e6961a9fe517e4/app/shaders/image-vertex.glsl)
- [MIT 代码许可证](https://github.com/bizarro/infinite-circular-webgl-gallery/blob/3db485819df63550f9872b0ca5e6961a9fe517e4/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：OGL 媒体平面位置与滚动量耦合，余弦构造弧线并旋转；顶点 shader 用时间与速度控制 Z 位移。
- 既有素材差异：REF-137/139 为材质背景和控件，新增媒体布局轨道与运动速度联动。
- 风格深化候选：aether-orbit / liquid-layer / shape-expressive（非兼容承诺）
- 使用边界：OGL、纹理、标题字体、GPU 资源释放和旧构建链需目标验证；需普通列表/静态导航降级，不搬运照片字体。

## REF-163 · xsvg Viewer · Inset-aware pan and zoom / 浮动面板感知视口

- 仓库：visioncortex/xsvg · 固定提交 `48ec313160babbef86ff4352d3059f27b5eccfda`
- [packages/xsvg-viewer/src/pan-zoom.ts](https://github.com/visioncortex/xsvg/blob/48ec313160babbef86ff4352d3059f27b5eccfda/packages/xsvg-viewer/src/pan-zoom.ts)
- [MIT 代码许可证](https://github.com/visioncortex/xsvg/blob/48ec313160babbef86ff4352d3059f27b5eccfda/packages/xsvg-viewer/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：维护 scale/tx/ty 状态，适配浮动面板遮挡边距、目标画板 fit/reset；区分手型模式与 wheel scroll/zoom，并以指针位置为缩放中心。
- 既有素材差异：FX-120 是局部样图缩放，FX-064 是二维焦点；此处是多画板与浮动工具栏不重新布局的视口模型。
- 风格深化候选：precision-dark / refined-light-saas / type-led-minimal（非兼容承诺）
- 使用边界：依赖宿主 viewport/content DOM 和 CSS transform；触摸手势、浏览器缩放、滚动冲突、键盘操作及解绑需验证。

## REF-164 · xsvg Viewer · Source-to-canvas inspector / 源码图形双向定位

- 仓库：visioncortex/xsvg · 固定提交 `48ec313160babbef86ff4352d3059f27b5eccfda`
- [packages/xsvg-viewer/src/interactive-inspector.ts](https://github.com/visioncortex/xsvg/blob/48ec313160babbef86ff4352d3059f27b5eccfda/packages/xsvg-viewer/src/interactive-inspector.ts)
- [MIT 代码许可证](https://github.com/visioncortex/xsvg/blob/48ec313160babbef86ff4352d3059f27b5eccfda/packages/xsvg-viewer/LICENSE)；实际适配保留许可并分别核查相关依赖、字体、媒体。
- 源码机制：将只读源码面板与 SVG 元素检视器连接，双向选中并高亮；通过 source offset 恢复重编译后选择，局部编辑保持源码滚动位置；按需加载 inspector。
- 既有素材差异：现有 React Flow/Puck/Onlook 是平台级参考，此处定位可独立研究的源码映射、选中保持及懒加载边界。
- 风格深化候选：precision-dark / refined-light-saas / signal-noir（非兼容承诺）
- 使用边界：依赖 CodeMirror、源位置映射和节点身份约定，不是任意 HTML 或 SVG 通用映射器；须校验源文本与渲染节点同步及可访问性。

## 复用路径

通过现有 find-assets CLI 查 `--family=REF --intent="画布适配" --compact --json` 或 `--intent="字形膨胀"`。只提取需要的源文件参考，目标项目自行核查；保持研究条目与可复制原创原件的状态区别。
