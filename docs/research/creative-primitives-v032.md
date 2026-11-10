# V0.32 · 编辑器交互、视觉原材料与特殊效果素材（2026-11-10）

> **定位**：跨类型前端资产研究与 Agent 按任务检索。所有新条目为 `analyzed / research-only`；不构建页面、不新增 React 导出、不下载外部字库或贴图。CSS 小原子仅作为本仓库原创独立参考，并非生产级 UI 组件。

## 快速定位

- [结构化档案](../../registry/creative-primitives-v032.json) · [通用资产注册表](../../registry/assets.json) · [Agent 任务导航](../../CATALOG.md)。
- 字体和贴图的版权必须**逐个 family / item**核查，不能把 Google Fonts、Fontsource、Poly Haven、ambientCG 一概等同；尤其**不能自动复制字体文件和网页截图**。
- 设计契约里每一项都描述正向选材标准、状态、降级和不可接受情形；实践中应以现有可实现的 UI/IP/MOT 项优先，只有新能力需求才引用研究档案。

## 编辑器与多人协同交互

富文本、长文档、协作光标、评论和结构化块编辑。

### IP-036 · Contextual slash and mention palette / 上下文指令与提及菜单

**适用场景**：文档编辑、知识协作、长内容输入。

- **视觉或交互规范**：只在有效文本选择/块位置打开；输入字符触发但不覆盖输入法组合输入。
- **状态合同**：closed→triggered→querying→results|empty→selected|dismissed；异步响应仅接受最新 query。
- **可访问与简化替代**：方向键、Home/End、Enter、Escape；菜单关闭后光标回原选择范围。
- **反例 / 主要风险**：IME composition 被误判命令、过期异步结果覆盖、弹层在 scroll/resize 后错位。
- **现有素材关联**：`REF-043`、`REF-044`；**上游依据**：[官方原始资料](https://tiptap.dev/docs/editor/api/utilities/suggestion)。

### IP-037 · Anchored comments under concurrent edits / 协同修改中的锚定评论

**适用场景**：协作批注、设计文档、文内反馈。

- **视觉或交互规范**：评论关联语义文段和稳定相对位置，区分锚点丢失/原文已改/权限变化。
- **状态合同**：selected-range→comment-draft→attached→remote-edit-rebased|orphaned→resolved|reanchored。
- **可访问与简化替代**：可键盘定位评论和关联内容；失效锚点提供可检索独立评论索引。
- **反例 / 主要风险**：用普通整数偏移保存锚点、文段删除后错误指向其他文字、评论与源内容不同步。
- **现有素材关联**：`REF-045`、`IP-027`；**上游依据**：[官方原始资料](https://github.com/yjs/docs/blob/main/api/relative-positions.md)。

### IP-038 · Ephemeral multiuser awareness / 低干扰协同在线状态

**适用场景**：共享文档、白板、多人浏览。

- **视觉或交互规范**：presence 属于临时网络态，不等于持久文档；颜色、名字、状态合并成适度提示。
- **状态合同**：offline→connecting→online→inactive|reconnecting→offline；缺席和权限撤销清除遥测显示。
- **可访问与简化替代**：文本参与者列表和身份标签；移动端及窄屏隐藏不必要彩色光标。
- **反例 / 主要风险**：在线状态过期变幽灵光标、把光标坐标当个人永久活动日志、颜色作为唯一身份。
- **现有素材关联**：`REF-045`、`REF-043`；**上游依据**：[官方原始资料](https://docs.yjs.dev/api/about-awareness)。

### IP-039 · Paste and IME-safe schema import / 安全粘贴与输入法友好导入

**适用场景**：编辑器跨应用粘贴、富文本数据清洗。

- **视觉或交互规范**：明确 HTML/纯文本优先级及 schema 允许项；粘贴数据作为未信任内容处理。
- **状态合同**：beforeinput→composition?→paste-parsed→preview|rejected→single-undoable-commit。
- **可访问与简化替代**：纯文本粘贴与可见失败提示；输入法组合期间不运行快捷命令。
- **反例 / 主要风险**：将粘贴 HTML 直接插 DOM、清洗掉用户内容、中文输入法拼写未完成被提交。
- **现有素材关联**：`REF-043`、`REF-044`；**上游依据**：[官方原始资料](https://lexical.dev/docs/intro)。

### IP-040 · Local undo and remote transactions / 本地撤销与远端事务

**适用场景**：多人共同编辑、版本记录。

- **视觉或交互规范**：区分本地可撤销编辑、他人提交和单个组合操作；撤销提示反馈结果而非保证恢复同一视觉位置。
- **状态合同**：clean→local-change→remote-change→local-undo|redo→conflict-review。
- **可访问与简化替代**：清晰历史提示、版本差异和可恢复旧版本；键盘 Undo/Redo。
- **反例 / 主要风险**：撤销意外删除别人新增内容、跨设备隐藏状态回滚、Undo 与 CRDT 更新顺序误解。
- **现有素材关联**：`REF-043`、`REF-045`；**上游依据**：[官方原始资料](https://docs.yjs.dev/getting-started/a-collaborative-editor)。

### IP-041 · Block drag handle with selection parity / 文档块拖拽及选区等效

**适用场景**：长文档重排、编辑器对象定位。

- **视觉或交互规范**：把块选择和文本选择解耦；拖拽辅助柄出现时保留文本焦点，移动后修复相对选区。
- **状态合同**：idle→block-focus→grab→move-preview→commit|cancel→restore-focus。
- **可访问与简化替代**：可见的上移/下移操作、块导航/键盘位次选择。
- **反例 / 主要风险**：拖动一块误含跨段落文字、鼠标悬停才能发现移动操作、折叠内容后定位错误。
- **现有素材关联**：`REF-043`、`REF-044`、`IP-033`、`REF-028`；**上游依据**：[官方原始资料](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-rearrangeable/)。

## 字形、材质与视觉原材料

变体字体、中英文混排、字体许可、PBR 与程序纹理。

### REF-069 · Variable type axis palette / 可变字体轴与字重范围

**适用场景**：内容设计、视觉系统、长文案与品牌展示。

- **视觉或交互规范**：按字库真实轴记录 wght/wdth/opsz；提供排版样张、允许范围和光学字号说明。
- **状态合同**：body→display→compact；在不同字号下比较字重、宽度、字距与断行。
- **可访问与简化替代**：浏览器系统字体族及静态字体档位；字重和对比仍满足阅读要求。
- **反例 / 主要风险**：将未知自定义轴当通用、只靠字宽动画表达信息、无权打包字体。
- **现有素材关联**：`DT-013`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts)。

### REF-070 · CJK–Latin fallback and subset specimen / 中英混排与字库分片

**适用场景**：中文内容系统、多语言产品、数据可视化。

- **视觉或交互规范**：字体栈按 CJK/Latin/digits/icon 确定角色，逐组合测试行高、标点与字宽；记录 unicode-range 策略。
- **状态合同**：zh-CN→en-US→mixed-numeric→fallback；检查小字号和粗体的字形缺失。
- **可访问与简化替代**：系统 CJK 字体优先；不开启强制远程大字库，使用真实可用字符。
- **反例 / 主要风险**：字体子集漏字、数字位置偏移、多语言 fallback 风格失配。
- **现有素材关联**：`DT-013`、`REF-069`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40font-face/unicode-range)。

### REF-071 · Font provenance and self-host checklist / 字体来源、授权与自托管清单

**适用场景**：开放素材仓库、网站发布、可复用 UI 字体资源。

- **视觉或交互规范**：为每个具体 family 单独记录版权方、许可、保留字体名、字重/语言覆盖和可分发条件。
- **状态合同**：candidate→license-checked→family-verified→bundled-in-target|link-only。
- **可访问与简化替代**：系统字体作为默认降级，断网/加载失败时保留可读内容。
- **反例 / 主要风险**：误以为 Google Fonts/Fontsource 全部同一许可、上传未授权二进制、修改保留字体名。
- **现有素材关联**：`REF-069`、`REF-070`；**上游依据**：[官方原始资料](https://github.com/google/fonts/blob/main/README.md)。

### REF-072 · Poly Haven CC0 PBR and HDRI source / CC0 物理材质和环境光照来源

**适用场景**：材质情绪版、低成本三维建模资料、纹理参考。

- **视觉或交互规范**：只记录经官网证明 CC0 的原始纹理/HDRI 来源；标注 albedo/normal/roughness 与色彩空间。
- **状态合同**：candidate→per-asset-provenance→resolution-budget→external-target-use。
- **可访问与简化替代**：仅用原创文字和低成本渐变描述材料；在外部目标项目再拉取资源。
- **反例 / 主要风险**：官网资产 CC0 不等于所有站点标志/网页截图可再分发；高分辨率 texture 显存开销大。
- **现有素材关联**：`REF-051`、`REF-059`、`REF-060`；**上游依据**：[官方原始资料](https://polyhaven.com/license)。

### REF-073 · ambientCG CC0 material metadata / ambientCG 材质通道参考

**适用场景**：布料、纸张、石材、建筑与产品材质选型。

- **视觉或交互规范**：按材质频道、尺寸、真实物理尺度、贴图通道及引用日期整理外链，不归档二进制。
- **状态合同**：research→material-family→channel-check→external-export。
- **可访问与简化替代**：程序 CSS 噪点/低分辨率单色纹理占位。
- **反例 / 主要风险**：官网 CC0 资源与外部衍生示例不是同一许可；缺失通道或比例尺不得假定。
- **现有素材关联**：`REF-051`、`REF-062`、`REF-072`；**上游依据**：[官方原始资料](https://ambientcg.com/)。

### REF-074 · Procedural grain and print halftone / 程序噪点与印刷网点纹理

**适用场景**：编辑式视觉、艺术作品集、复古印刷画面。

- **视觉或交互规范**：用 SVG turbulence / CSS 渐变参数描述频率、覆盖范围、透明度和密度；文字层始终独立。
- **状态合同**：calm→grain-density-adjust→print-style；纹理变化不影响语义内容。
- **可访问与简化替代**：无滤镜纯底色、静态低对比纹理。
- **反例 / 主要风险**：极强噪点降低可读性、全屏 SVG 动态滤镜消耗性能、复刻第三方风格但无来源。
- **现有素材关联**：`DT-009`、`REF-062`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)。

## 可降级的特殊视觉效果

遮罩、折射、时间线、视图转场、局部光照和动效文字。

### REF-075 · Layered mask reveal / 多遮罩揭示

**适用场景**：图片画廊、实验性作品集、局部信息强调。

- **视觉或交互规范**：用 mask-image / mask-composite 建立透明度与形状逻辑；内容仍保留真实 DOM。
- **状态合同**：hidden-visual→reveal→visible→reset；遮罩只做视觉，不操控访问控制。
- **可访问与简化替代**：无 mask 支持显示完整图片与标题；隐藏内容有明确可见替代。
- **反例 / 主要风险**：用视觉遮罩隐藏敏感/权限内容、遮罩导致焦点对象不可见、浏览器差异未测。
- **现有素材关联**：`REF-038`、`IP-029`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Masking/Mask_properties)。

### REF-076 · Controlled SVG displacement / 有界 SVG 折射与扰动

**适用场景**：画面转换、创意图片交互、局部材质表现。

- **视觉或交互规范**：通过 feTurbulence / feDisplacementMap 原理控制 scale、频率、合成区域；只作用装饰影像。
- **状态合同**：static→hover-preview→brief-distort→rest；不绑定关键状态表达。
- **可访问与简化替代**：静止原图或 CSS opacity 过渡；强制降低动效环境禁用 displacement 动画。
- **反例 / 主要风险**：全屏实时滤镜、UI 文本可读性损伤、GPU 降级缺失。
- **现有素材关联**：`REF-060`、`REF-063`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)。

### REF-077 · Scroll-linked reversible narrative / 滚动驱动的可逆叙事

**适用场景**：长篇叙事、产品分镜、编辑图文。

- **视觉或交互规范**：视口进度仅驱动装饰进度/阶段高亮；正文顺序与滚动分离。
- **状态合同**：pre-section→in-view→passed→reverse-scroll；历史状态可逆。
- **可访问与简化替代**：普通文章顺序阅读、静态章节目录与跳转链接。
- **反例 / 主要风险**：scroll-snap 锁住用户、无 reduced-motion、仅视差提供信息。
- **现有素材关联**：`IP-029`、`REF-027`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)。

### REF-078 · View transition context continuity / 视图过渡与焦点延续

**适用场景**：列表到详情、内容切换、导航保持上下文。

- **视觉或交互规范**：共享元素名称与动画仅增强视觉连续；数据、URL、焦点与可访问结构单独正确更新。
- **状态合同**：before→navigation-request→new-content-ready→transition|skip→focus-restored。
- **可访问与简化替代**：直接更新视图和地址、显式返回导航、原生 focus management。
- **反例 / 主要风险**：旧快照触发误点、焦点丢失、读屏重复、不能用 View Transition 当路由器。
- **现有素材关联**：`REF-027`、`IP-029`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)。

### REF-079 · Localized spotlight and spectral surface / 局部聚光与光谱表面

**适用场景**：素材展示、交互画布、层叠材质实验。

- **视觉或交互规范**：径向或锥形渐变局部增强；光斑绝不遮盖标签和焦点环；悬浮只是附加反馈。
- **状态合同**：idle→pointer-follow→focus-keyboard→rest；可禁用持续 pointer 更新。
- **可访问与简化替代**：固定光晕背景/边框高亮；移动端无 hover 的状态不缺功能。
- **反例 / 主要风险**：cursor tracking 强制高频同步布局、全屏眩光、假装高光即按钮。
- **现有素材关联**：`REF-061`、`REF-063`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient)。

### REF-080 · Kinetic typography with readable DOM / 可读文本的动态排印

**适用场景**：编辑式标题、展览导语和创意海报。

- **视觉或交互规范**：文字保留单一真实 DOM 内容；通过有限入场时序和字重/透明度变化强化层级。
- **状态合同**：pre-entry→revealing→settled；重复访问可跳过不必要动画。
- **可访问与简化替代**：完整静态文字、支持手动停止、reduced-motion 无关键帧。
- **反例 / 主要风险**：复制多层文字导致读屏重复、字母逐个隐藏导致选区破碎、持续闪烁。
- **现有素材关联**：`DT-013`、`REF-069`、`MOT-001`；**上游依据**：[官方原始资料](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)。

## 来源与许可矩阵（不代表文件已导入）

| 来源 | 本轮用途 | 授权边界 / 行动前核查 |
| --- | --- | --- |
| [Google Fonts 源文件](https://github.com/google/fonts/blob/main/README.md) | family、字重、字体轴、语言覆盖与逐家族授权 | Google 官方说明家庭文件夹自带许可；以 family LICENSE 为准，OFL、Apache 或 Ubuntu 等可能不同 |
| [Fontsource](https://github.com/fontsource/fontsource) | 自托管流程与字库包装来源 | 开源打包工具 ≠ 所有字体相同许可；还要核对对应包 README/LICENSE |
| [Inter](https://github.com/rsms/inter) | 可变字体和屏幕排印的实际参考 | Inter 为 SIL OFL 1.1，仍要尊重 Reserved Font Name 与发行条件 |
| [Poly Haven 许可](https://polyhaven.com/license) | HDRI/PBR/材质的独立 CC0 链接 | 官方资产 CC0，网站和品牌内容另有服务条款；本仓库不存媒体 |
| [ambientCG](https://ambientcg.com/) | 贴图资源外链与通道参考 | 公开 CC0 资源仍需在具体素材下载时核对项目与站点条款，不打包第三方衍生内容 |
| [MDN SVG 与 CSS](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence) | 原创纹理、蒙版、位移效果的技术规则 | 技术文档不等于授权复制任意示例图片；只用独立写的代码原子 |

## 不做什么

- 不安装 Lexical、Tiptap、Yjs、Three.js 或前端动效库；不提供协同文档服务或复杂编辑器集成。
- 不生成另一个完整主题、营销首页或页面脚手架；不发布未经审核的第三方字体/贴图/截图。
- 不以参考来源存在推导出真实浏览器、移动端、读屏、性能或许可证审计已通过。

## 下一步独立项目采用时的要求

1. 对目标需求按 ID 选少量条目，先读 `failureModes` / `accessibleFallback`，区分成熟 React 原件、研究合同、附带的 CSS 原子。
2. 富文本协作先确定 schema、选区/IME、撤销事务/内容权限；视觉特效先评估设备预算、无动画替代和正常 DOM 文本。
3. 素材下载仅在目标项目内完成，必要时保留来源、许可证、作者、版本和分发凭证；公开发布前检查第三方文件。
