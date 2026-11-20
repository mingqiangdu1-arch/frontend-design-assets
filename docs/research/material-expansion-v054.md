# V0.54 · 近期 GitHub 前端具体素材与已有风格深化（2026-11-20）

**已登记 12 个固定 Git commit 的源码级外部研究来源：REF-137..148（P0 七项、P1 五项）**。这一轮允许深化仓库的 14 套主题，但不改变主题 ID 或 React 的兼容声明，也没有复制上游代码/插画/字体或安装新依赖。

[机器目录](../../registry/material-expansion-v054.json) · [统一索引](../../registry/assets.json) · [任务入口](../../DISCOVER.md)

## 1. 精确来源与引入决定

| ID / 来源 | 固定版本的真实文件 | 风格深化目标 | 决定 |
| --- | --- | --- | --- |
| **REF-137** [MengTo/threeui](https://github.com/MengTo/threeui) | [src/shaders/liquid-metal-button/LiquidMetalButton.tsx](<https://github.com/MengTo/threeui/blob/68802d5428071ada5c20db8094b1649e6bb770ed/src/shaders/liquid-metal-button/LiquidMetalButton.tsx>) | `aether-orbit` · `signal-noir` · `liquid-layer` | **P0 研究索引**：具体 WebGL 控件和背景的源文件；从纯 CSS/伪 3D 进阶到真实渲染材质 |
| **REF-138** [flohoeller/affectui](https://github.com/flohoeller/affectui) | [components/decision-inbox.tsx](<https://github.com/flohoeller/affectui/blob/00b94de356c13705717a5fef20a64cc508de2ac0/components/decision-inbox.tsx>) | `precision-dark` · `refined-light-saas` | **P0 研究索引**：一个文件级 React 源码展示决策、工具调用与进度的具体交互 |
| **REF-139** [paper-design/shaders](https://github.com/paper-design/shaders) | [packages/shaders-react/src/shaders/mesh-gradient.tsx](<https://github.com/paper-design/shaders/blob/e7003a2d4e6e932e30b8fa11ec1239e6ea48e16a/packages/shaders-react/src/shaders/mesh-gradient.tsx>) | `liquid-layer` · `aether-orbit` · `organic-tactile` | **P0 研究索引**：独立 React / Canvas shader 及可调参数的真实源码 |
| **REF-140** [ANIBIT14/boldkit](https://github.com/ANIBIT14/boldkit) | [registry/default/ui/ascii-shapes.tsx](<https://github.com/ANIBIT14/boldkit/blob/cfade93d0da82d03736b604c643a00c95ff207b4/registry/default/ui/ascii-shapes.tsx>) | `neo-brutalist` · `shape-expressive` | **P0 研究索引**：带真实 TSX 的 ASCII 图形、强对比图表和多状态展示素材 |
| **REF-141** [shadcn-labs/mdxcn](https://github.com/shadcn-labs/mdxcn) | [registry/default/graph-timeline/graph-timeline.tsx](<https://github.com/shadcn-labs/mdxcn/blob/884eba5356762cf49f8828db8f861dc2f33d65e4/registry/default/graph-timeline/graph-timeline.tsx>) | `editorial-warm` · `type-led-minimal` · `paper-rebellion` | **P0 研究索引**：真实 MDX 友好图文/步骤/终端组件而非整页模板 |
| **REF-142** [guillermolg00/morphicons](https://github.com/guillermolg00/morphicons) | [src/react/index.tsx](<https://github.com/guillermolg00/morphicons/blob/8c3e3c7cd717b2381f8f35cf6c245afd80d8d7df/src/react/index.tsx>) | `playful-pop` · `shape-expressive` · `precision-dark` | **P0 研究索引**：形状归一化/对应和 React adapter 的实际实现，覆盖任意图标状态切换 |
| **REF-143** [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx) | [src/fx/ui/quest-complete.js](<https://github.com/patch-gg/pixelfx/blob/5294518ce7c72e48b6100a744596e0acf57f2826/src/fx/ui/quest-complete.js>) | `pixel-arcade` · `signal-noir` | **P0 研究索引**：可参数化的具体 UI 回报动效/转场源码，接入现有像素风格的真实动效层 |
| **REF-144** [knadh/oat](https://github.com/knadh/oat) | [src/css/table.css](<https://github.com/knadh/oat/blob/9e9338096548347644b5c4c5f800e5af058440fe/src/css/table.css>) | `refined-light-saas` · `type-led-minimal` | **P1 研究索引**：原生 HTML/CSS/少量 JS 的高密度低依赖控件参考 |
| **REF-145** [opencoredev/islandcn](https://github.com/opencoredev/islandcn) | [lib/island/store.ts](<https://github.com/opencoredev/islandcn/blob/d9ed4d24a79a8eac05f4550976442d9781532f92/lib/island/store.ts>) | `liquid-layer` · `playful-pop` | **P1 研究索引**：具备活动队列/呈现模式的状态引擎与具体活动案例 |
| **REF-146** [CruxGarden/plasma-ui](https://github.com/CruxGarden/plasma-ui) | [src/Plasma.tsx](<https://github.com/CruxGarden/plasma-ui/blob/8a93bee4780eba47eefcb5d9725ffe782d8421f6/src/Plasma.tsx>) | `liquid-layer` · `organic-tactile` | **P1 研究索引**：面板融合/分离与网格吸附的具体 React+shader 交互实现 |
| **REF-147** [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | [src/app/(shell)/docs/components/glass/page.tsx](<https://github.com/DavidHDev/canvas-ui/blob/6d46250b4360fddec0e3bc87425564fa4f4cda18/src/app/%28shell%29/docs/components/glass/page.tsx>) | `liquid-layer` · `signal-noir` · `aether-orbit` | **P1 研究索引**：真实 HTML 上叠加 GPU 特效的技术与视觉研究，源码只作外链 |
| **REF-148** [Joangeldelarosa/pxlkit](https://github.com/Joangeldelarosa/pxlkit) | [apps/web/src/components/hero/VoxelText.tsx](<https://github.com/Joangeldelarosa/pxlkit/blob/b8e466934244875909983d65d8a43fbb4407a2c4/apps/web/src/components/hero/VoxelText.tsx>) | `pixel-arcade` · `playful-pop` | **P1 研究索引**：像素风组件与立体文字的代码参考；素材版权分层的可追溯范例 |

## 2. 逐项文件、差异、依赖及许可

### REF-137 · ThreeUI · Liquid Metal Button & Constellation Field

- **固定提交**：[`68802d542807`](https://github.com/MengTo/threeui/commit/68802d5428071ada5c20db8094b1649e6bb770ed)。
- **真实原件**：[`src/shaders/liquid-metal-button/LiquidMetalButton.tsx`](<https://github.com/MengTo/threeui/blob/68802d5428071ada5c20db8094b1649e6bb770ed/src/shaders/liquid-metal-button/LiquidMetalButton.tsx>) · [`src/shaders/constellation-field/ConstellationField.tsx`](<https://github.com/MengTo/threeui/blob/68802d5428071ada5c20db8094b1649e6bb770ed/src/shaders/constellation-field/ConstellationField.tsx>)。
- **补位**：FX-090..093 的伪空间视觉没有真实 shader 管线。
- **可参考的内容**：具体 WebGL 控件和背景的源文件；从纯 CSS/伪 3D 进阶到真实渲染材质。
- **许可**：MIT, Community source only; Pro/Beta components not included。
- **限制**：Community 和 Pro 边界、WebGL 回退、性能及 reduced-motion 需目标端复核。
- **Agent 别名**：三维空间控件 / 液态金属按钮 / constellation field / shader button。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-138 · affectUI · Decision Inbox & Tool Call Card

- **固定提交**：[`00b94de356c1`](https://github.com/flohoeller/affectui/commit/00b94de356c13705717a5fef20a64cc508de2ac0)。
- **真实原件**：[`components/decision-inbox.tsx`](<https://github.com/flohoeller/affectui/blob/00b94de356c13705717a5fef20a64cc508de2ac0/components/decision-inbox.tsx>) · [`components/tool-call-card.tsx`](<https://github.com/flohoeller/affectui/blob/00b94de356c13705717a5fef20a64cc508de2ac0/components/tool-call-card.tsx>) · [`components/progress-tracker.tsx`](<https://github.com/flohoeller/affectui/blob/00b94de356c13705717a5fef20a64cc508de2ac0/components/progress-tracker.tsx>)。
- **补位**：REF-105..110 侧重对话外壳、MCP 结果与澄清，缺少多决策收件箱形态。
- **可参考的内容**：一个文件级 React 源码展示决策、工具调用与进度的具体交互。
- **许可**：MIT; repository free components, Pro content separate。
- **限制**：操作回调只是前端表现；真实权限、持久化、状态竞争由目标项目承担。
- **Agent 别名**：Agent 决策收件箱 / 工具调用卡 / human approval / decision inbox。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-139 · Paper Shaders · Mesh Gradient & Fluted Glass

- **固定提交**：[`e7003a2d4e6e`](https://github.com/paper-design/shaders/commit/e7003a2d4e6e932e30b8fa11ec1239e6ea48e16a)。
- **真实原件**：[`packages/shaders-react/src/shaders/mesh-gradient.tsx`](<https://github.com/paper-design/shaders/blob/e7003a2d4e6e932e30b8fa11ec1239e6ea48e16a/packages/shaders-react/src/shaders/mesh-gradient.tsx>) · [`packages/shaders-react/src/shaders/fluted-glass.tsx`](<https://github.com/paper-design/shaders/blob/e7003a2d4e6e932e30b8fa11ec1239e6ea48e16a/packages/shaders-react/src/shaders/fluted-glass.tsx>) · [`docs/registry/mesh-gradient-example.tsx`](<https://github.com/paper-design/shaders/blob/e7003a2d4e6e932e30b8fa11ec1239e6ea48e16a/docs/registry/mesh-gradient-example.tsx>)。
- **补位**：原有 FX-085..089 以离线式 Canvas 2D 绘图为主，缺少连续 GPU 材质。
- **可参考的内容**：独立 React / Canvas shader 及可调参数的真实源码。
- **许可**：Apache-2.0; preserve notices when distributing source。
- **限制**：README 提示 0.0.x 可能有破坏性变更；需锁版本和处理设备降级。
- **Agent 别名**：动态网格渐变 / 条纹玻璃 / mesh gradient / fluted glass。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-140 · BoldKit · ASCII Shapes & Brutalist Data Charts

- **固定提交**：[`cfade93d0da8`](https://github.com/ANIBIT14/boldkit/commit/cfade93d0da82d03736b604c643a00c95ff207b4)。
- **真实原件**：[`registry/default/ui/ascii-shapes.tsx`](<https://github.com/ANIBIT14/boldkit/blob/cfade93d0da82d03736b604c643a00c95ff207b4/registry/default/ui/ascii-shapes.tsx>) · [`registry/default/ui/gauge-chart.tsx`](<https://github.com/ANIBIT14/boldkit/blob/cfade93d0da82d03736b604c643a00c95ff207b4/registry/default/ui/gauge-chart.tsx>) · [`registry/default/ui/trace.tsx`](<https://github.com/ANIBIT14/boldkit/blob/cfade93d0da82d03736b604c643a00c95ff207b4/registry/default/ui/trace.tsx>)。
- **补位**：现有 neo-brutalist 更多是风格 Token/研究，缺少同体系图表细节。
- **可参考的内容**：带真实 TSX 的 ASCII 图形、强对比图表和多状态展示素材。
- **许可**：MIT; verify any nested media/asset notices。
- **限制**：shadcn/Tailwind/宿主路径别名依赖；需要单项适配，不应整体安装到本仓库。
- **Agent 别名**：粗野主义图表 / ASCII 图形 / 硬阴影 UI / neobrutalism。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-141 · mdxcn · Graph Timeline & Terminal

- **固定提交**：[`884eba535676`](https://github.com/shadcn-labs/mdxcn/commit/884eba5356762cf49f8828db8f861dc2f33d65e4)。
- **真实原件**：[`registry/default/graph-timeline/graph-timeline.tsx`](<https://github.com/shadcn-labs/mdxcn/blob/884eba5356762cf49f8828db8f861dc2f33d65e4/registry/default/graph-timeline/graph-timeline.tsx>) · [`registry/default/terminal/terminal.tsx`](<https://github.com/shadcn-labs/mdxcn/blob/884eba5356762cf49f8828db8f861dc2f33d65e4/registry/default/terminal/terminal.tsx>) · [`registry/default/steps/steps.tsx`](<https://github.com/shadcn-labs/mdxcn/blob/884eba5356762cf49f8828db8f861dc2f33d65e4/registry/default/steps/steps.tsx>)。
- **补位**：V0.53 侧重静态图文排版，缺少结构化技术阅读与交互时间线。
- **可参考的内容**：真实 MDX 友好图文/步骤/终端组件而非整页模板。
- **许可**：MIT; check each registry item's dependencies。
- **限制**：GraphTimeline 依赖本仓库其他 graph-frame 与 motion 模块，单文件非独立可运行。
- **Agent 别名**：MDX 时间线 / 终端文档块 / graph timeline / technical documentation。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-142 · Morphicons · SVG State Morphing

- **固定提交**：[`8c3e3c7cd717`](https://github.com/guillermolg00/morphicons/commit/8c3e3c7cd717b2381f8f35cf6c245afd80d8d7df)。
- **真实原件**：[`src/react/index.tsx`](<https://github.com/guillermolg00/morphicons/blob/8c3e3c7cd717b2381f8f35cf6c245afd80d8d7df/src/react/index.tsx>) · [`src/core/plan.ts`](<https://github.com/guillermolg00/morphicons/blob/8c3e3c7cd717b2381f8f35cf6c245afd80d8d7df/src/core/plan.ts>) · [`src/core/spring.ts`](<https://github.com/guillermolg00/morphicons/blob/8c3e3c7cd717b2381f8f35cf6c245afd80d8d7df/src/core/spring.ts>)。
- **补位**：原有 VG 图标多为静态/简易悬停动效，不具备两图形间的拓扑对应。
- **可参考的内容**：形状归一化/对应和 React adapter 的实际实现，覆盖任意图标状态切换。
- **许可**：MIT。
- **限制**：复杂路径与图标数据类型需单项评估；不要把效果写成任意 SVG 都无损可变。
- **Agent 别名**：图标形变 / 菜单关闭过渡 / SVG morph / animated icon。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-143 · pixelfx · Quest Complete & Pixel Dissolve

- **固定提交**：[`5294518ce7c7`](https://github.com/patch-gg/pixelfx/commit/5294518ce7c72e48b6100a744596e0acf57f2826)。
- **真实原件**：[`src/fx/ui/quest-complete.js`](<https://github.com/patch-gg/pixelfx/blob/5294518ce7c72e48b6100a744596e0acf57f2826/src/fx/ui/quest-complete.js>) · [`src/fx/transitions/pixel-dissolve.js`](<https://github.com/patch-gg/pixelfx/blob/5294518ce7c72e48b6100a744596e0acf57f2826/src/fx/transitions/pixel-dissolve.js>) · [`src/fx/ui/confetti.js`](<https://github.com/patch-gg/pixelfx/blob/5294518ce7c72e48b6100a744596e0acf57f2826/src/fx/ui/confetti.js>)。
- **补位**：FX-055..062 是静态或轻 CSS 游戏化反馈，不包含独立像素效果引擎。
- **可参考的内容**：可参数化的具体 UI 回报动效/转场源码，接入现有像素风格的真实动效层。
- **许可**：MIT; source includes adaptation attribution for referenced art-effects methods。
- **限制**：依赖其绘制核心与 Canvas 循环；非无依赖的 CSS 原子，需要 FPS/暂停/设备测试。
- **Agent 别名**：像素任务完成 / 像素溶解转场 / pixel reward / quest complete。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-144 · Oat UI · Semantic Table & Sidebar

- **固定提交**：[`9e9338096548`](https://github.com/knadh/oat/commit/9e9338096548347644b5c4c5f800e5af058440fe)。
- **真实原件**：[`src/css/table.css`](<https://github.com/knadh/oat/blob/9e9338096548347644b5c4c5f800e5af058440fe/src/css/table.css>) · [`src/css/sidebar.css`](<https://github.com/knadh/oat/blob/9e9338096548347644b5c4c5f800e5af058440fe/src/css/sidebar.css>) · [`src/js/sidebar.js`](<https://github.com/knadh/oat/blob/9e9338096548347644b5c4c5f800e5af058440fe/src/js/sidebar.js>)。
- **补位**：仓库 React 参考与 CSS 原子之间缺少系统级原生语义控件案例。
- **可参考的内容**：原生 HTML/CSS/少量 JS 的高密度低依赖控件参考。
- **许可**：MIT。
- **限制**：引用 CSS 层/自定义属性有环境假设，需按文件搭配而非单拷贝。
- **Agent 别名**：原生语义控件 / 零依赖表格 / semantic HTML / native sidebar。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-145 · islandcn · Activity Stack & Upload Preset

- **固定提交**：[`d9ed4d24a79a`](https://github.com/opencoredev/islandcn/commit/d9ed4d24a79a8eac05f4550976442d9781532f92)。
- **真实原件**：[`lib/island/store.ts`](<https://github.com/opencoredev/islandcn/blob/d9ed4d24a79a8eac05f4550976442d9781532f92/lib/island/store.ts>) · [`components/islandcn/upload-activity.tsx`](<https://github.com/opencoredev/islandcn/blob/d9ed4d24a79a8eac05f4550976442d9781532f92/components/islandcn/upload-activity.tsx>) · [`lib/island/provider.tsx`](<https://github.com/opencoredev/islandcn/blob/d9ed4d24a79a8eac05f4550976442d9781532f92/lib/island/provider.tsx>)。
- **补位**：REF-124 仅研究动态浮岛外观和尺寸，这个来源更完整地描述活动竞争与状态转换。
- **可参考的内容**：具备活动队列/呈现模式的状态引擎与具体活动案例。
- **许可**：MIT。
- **限制**：系统级浮层、定时器、可访问性、SSR 与移动设备性能需宿主验证。
- **Agent 别名**：多活动浮岛 / 上传状态胶囊 / activity stack / dynamic island。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-146 · Plasma UI · Liquid Snap Workspace

- **固定提交**：[`8a93bee4780e`](https://github.com/CruxGarden/plasma-ui/commit/8a93bee4780eba47eefcb5d9725ffe782d8421f6)。
- **真实原件**：[`src/Plasma.tsx`](<https://github.com/CruxGarden/plasma-ui/blob/8a93bee4780eba47eefcb5d9725ffe782d8421f6/src/Plasma.tsx>) · [`src/shaders.ts`](<https://github.com/CruxGarden/plasma-ui/blob/8a93bee4780eba47eefcb5d9725ffe782d8421f6/src/shaders.ts>) · [`src/snap.ts`](<https://github.com/CruxGarden/plasma-ui/blob/8a93bee4780eba47eefcb5d9725ffe782d8421f6/src/snap.ts>)。
- **补位**：已有液态风格多是外观和视觉材料，缺少真正可拖动并吸附融合的面板。
- **可参考的内容**：面板融合/分离与网格吸附的具体 React+shader 交互实现。
- **许可**：MIT。
- **限制**：上游明确 pre-1.0、GPU-heavy 且移动端效果差；先研究不要生产引用。
- **Agent 别名**：液态吸附布局 / 融合面板 / liquid glass workspace / surface tension。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-147 · Canvas UI · Glass & Displacement References

- **固定提交**：[`6d46250b4360`](https://github.com/DavidHDev/canvas-ui/commit/6d46250b4360fddec0e3bc87425564fa4f4cda18)。
- **真实原件**：[`src/app/(shell)/docs/components/glass/page.tsx`](<https://github.com/DavidHDev/canvas-ui/blob/6d46250b4360fddec0e3bc87425564fa4f4cda18/src/app/%28shell%29/docs/components/glass/page.tsx>) · [`src/app/(shell)/docs/components/displacement/page.tsx`](<https://github.com/DavidHDev/canvas-ui/blob/6d46250b4360fddec0e3bc87425564fa4f4cda18/src/app/%28shell%29/docs/components/displacement/page.tsx>) · [`LICENSE.md`](<https://github.com/DavidHDev/canvas-ui/blob/6d46250b4360fddec0e3bc87425564fa4f4cda18/LICENSE.md>)。
- **补位**：比原生 CSS 玻璃和静态插画更接近实时 GPU/HTML 复合渲染。
- **可参考的内容**：真实 HTML 上叠加 GPU 特效的技术与视觉研究，源码只作外链。
- **许可**：MIT + Commons Clause; cannot resell, sublicense or redistribute components as standalone/bundled/ported library。
- **限制**：本素材仓库不可复制或重新分发其组件代码；仅记录研究链接与原创观察。
- **Agent 别名**：Canvas 交互玻璃 / WebGPU 置换 / html over canvas / webgl effects。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

### REF-148 · Pxlkit · Voxel Text & Pixel UI Licensing

- **固定提交**：[`b8e466934244`](https://github.com/Joangeldelarosa/pxlkit/commit/b8e466934244875909983d65d8a43fbb4407a2c4)。
- **真实原件**：[`apps/web/src/components/hero/VoxelText.tsx`](<https://github.com/Joangeldelarosa/pxlkit/blob/b8e466934244875909983d65d8a43fbb4407a2c4/apps/web/src/components/hero/VoxelText.tsx>) · [`LICENSE-CODE`](<https://github.com/Joangeldelarosa/pxlkit/blob/b8e466934244875909983d65d8a43fbb4407a2c4/LICENSE-CODE>) · [`LICENSE-ASSETS`](<https://github.com/Joangeldelarosa/pxlkit/blob/b8e466934244875909983d65d8a43fbb4407a2c4/LICENSE-ASSETS>)。
- **补位**：现有像素主题图标/游戏反馈已覆盖，但缺少跨框架像素 UI 组合和体素标题参考。
- **可参考的内容**：像素风组件与立体文字的代码参考；素材版权分层的可追溯范例。
- **许可**：Code MIT; icons/art under separate attribution license, and standalone asset-pack redistribution prohibited。
- **限制**：不得复制图标包/艺术素材至本素材仓库；源文件和素材许可分别核查。
- **Agent 别名**：像素 UI 图标 / voxel title / retro interface / pixel icon kit。状态 `analyzed / research-only`；对应主题是**研究候选**，不是组件包兼容保证。

## 3. 风格深化路由

| 已有主题群 | 选用 ID | 下一次取用重点 |
| --- | --- | --- |
| `liquid-layer` / `aether-orbit` / `signal-noir` | REF-137、139、145、146、147 | GPU 材质、可复合玻璃、活动浮岛、可拖动融合面板；同步设计低性能回退 |
| `precision-dark` / `refined-light-saas` | REF-138、142、144 | Agent 决策/工具调用反馈、图标状态演进、原生语义表格 |
| `neo-brutalist` / `shape-expressive` | REF-140、142 | 强描边图表、ASCII 几何及状态切换图形 |
| `editorial-warm` / `type-led-minimal` / `paper-rebellion` | REF-141、144 | MDX 时间线、终端、步骤排版与轻量语义布局 |
| `pixel-arcade` / `playful-pop` | REF-143、148 | 任务回报、像素转场及像素化 UI；素材版权和代码许可分开 |

## 4. 版权约束（必须保留）

- **Canvas UI · REF-147**：其 [MIT + Commons Clause](https://github.com/DavidHDev/canvas-ui/blob/6d46250b4360fddec0e3bc87425564fa4f4cda18/LICENSE.md) 允许作为应用的一部分使用，但禁止将组件本身作为库重新打包、转售、再许可或移植版分发。此素材仓库只登记原始源码链接及原创分析，**不镜像代码**。
- **Pxlkit · REF-148**：代码为 [MIT](https://github.com/Joangeldelarosa/pxlkit/blob/b8e466934244875909983d65d8a43fbb4407a2c4/LICENSE-CODE)，但 [图标/美术素材许可](https://github.com/Joangeldelarosa/pxlkit/blob/b8e466934244875909983d65d8a43fbb4407a2c4/LICENSE-ASSETS) 要求相应署名，且禁止独立素材包再分发；不能因代码 MIT 就搬运图标库。
- **ThreeUI · REF-137**：仅 Community 免费源码核对为 MIT，不包含 Pro/Beta 内容。
- 其他 MIT/Apache-2.0 仓库的外部字体、媒体、付费模板、商标仍需逐项核实。不能仅根据仓库许可证推定所有文件均可复制。

## 5. 后续真正源码/原创素材沉淀的候选（尚未实现）

1. **Agent 细节**：从 REF-138 对比 REF-105..110，整理决策收件箱、工具调用状态、出错与回滚的通用 UI 合同。
2. **技术排版**：从 REF-140 的 ASCII 图案与 REF-141 的图表时间线抽取 2–3 个差异化的**原创**可独立移植 CSS/HTML 原件。
3. **像素动效**：选 REF-143 中 UI 类任务完成、像素溶解各一种，研究与现有 FX-055..062 的边界，不批量搬运 244 个效果。
4. **GPU 性能分层**：REF-137/139/146/147 分清仅静态视觉、交互材质和全局 GPU 层，明确移动/无障碍降级后再制作本地演示。

## 6. 验证口径

已核对上游仓库、固定提交、全部具体源文件路径与顶层许可，并读取代表性实现片段；**未**安装运行这些第三方项目、复制源码、执行跨浏览器/设备测试或获得生产级视觉和无障碍验收。本轮没有新增 React public export、风格 ID、组件依赖、业务产品或测试框架。
