# V0.34 · 视觉叙事、空间构图与创意交互素材（2026-11-10）

> 所有条目均为原创研究型素材 `analyzed / research-only`，不是新视觉主题、完成页面、生产组件或运行中的交互。示意 CSS 只作为独立可选择的视觉原子；不引入第三方截图、字体、模型、图片或源码。

## 使用和来源

- [机器索引](../../registry/experience-artifacts-v034.json) · [统一资产](../../registry/assets.json) · [任务导航](../../CATALOG.md)。
- 选型时先核对 `distinctFrom` 和 `relatedAssets`，不得把已有滚动叙事、旋钮、拖放、图表联动等重名素材重复标记为新实现。
- 可选原子 CSS：[styles/primitives/v034/README.md](../../styles/primitives/v034/README.md)。视觉原子只提供基础排版/装饰规则，不执行导航或交互状态。
- 有关星图式网站、地形式作品集等外部设计案例，只参考构图原则，**不复制其图片、排版源文件或交互实现**。交互键盘语义以 W3C APG 为依据。

## 视觉叙事

双线阅读、证据页边注、分镜序列和剖面式叙事；内容结构优先。

### REF-081 · Paired evidence narrative / 双线并行叙事

- **场景**：研究型案例、两方视角、作品解析。
- **设计构成**：两条同级叙事列分别使用显式章节 ID，跨列以对照编号建立关系；DOM 阅读顺序保持线性。
- **状态与可回退行为**：chapter-A→compare-anchor-B→return-to-A；不强制并排滚动同步。
- **简化 / 无障碍替代**：窄屏依原章节顺序串行呈现，两方视角提供明确标题和互跳链接。
- **明确反例**：两列被强制同步滚动、对比编号无文本、移动端阅读顺序跳跃。
- **与旧资产的差异**：不同于 IP-029 分支叙事：这里允许独立阅读，不要求故事节点状态机。
- **关联已有资产**：`IP-029`、`REF-077`、`DT-013`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)。

### REF-082 · Evidence marginalia / 证据页边注

- **场景**：研究展览、调查报道、带来源的案例说明。
- **设计构成**：正文、侧注、来源号三者同属语义阅读序列；桌面可错列呈现，证据不能仅在浮层内。
- **状态与可回退行为**：read→reference-jump→note→return；章节锚点保持可回退。
- **简化 / 无障碍替代**：侧注在窄屏插入正文后，来源提供可点击/键盘可达链接。
- **明确反例**：仅靠色彩连线、侧注脱离原文造成误引、浮动提示遮挡正文。
- **与旧资产的差异**：不同于 IP-027 的可移动标注编辑器：仅整理出版物级的文内证据层。
- **关联已有资产**：`IP-027`、`REF-066`、`REF-078`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)。

### REF-083 · Contact-sheet chapter sequence / 胶片接触印样章节

- **场景**：摄影档案、影像项目、作品集叙事。
- **设计构成**：缩略图章节序列按日期/主题标号，不要求大图与滚动同步；关键元信息始终可见。
- **状态与可回退行为**：select-frame→detail→back-to-frame；默认停留最后焦点章节。
- **简化 / 无障碍替代**：缩略图可键盘逐个访问；列表或目录可替代横向画廊。
- **明确反例**：强制 scroll snap 困住阅读、缩略图无可读标题、宽度固定导致窄屏溢出。
- **与旧资产的差异**：不同于 IP-023 多轨时间线编辑：这是内容章节的导览素材，不提供剪辑行为。
- **关联已有资产**：`IP-023`、`REF-077`、`TPL-002`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type)。

### REF-084 · Cutaway chapter anatomy / 剖面式章节解读

- **场景**：工艺解释、产品拆解、建筑/知识展示。
- **设计构成**：主视觉切面与分层文本解释关联，先给完整概念，再逐块说明材质/数据/来源。
- **状态与可回退行为**：overview→section-focused→overview；被遮挡细节只能作为装饰层。
- **简化 / 无障碍替代**：纯文字层级大纲/编号描述 + 无特效的完整图。
- **明确反例**：用遮罩隐藏真实权限/内容、过多不透明叠层、切面与真实物理尺度不对应。
- **与旧资产的差异**：不同于 REF-075 视觉蒙版揭示：强调信息结构与标注次序而不是滤镜动画。
- **关联已有资产**：`REF-075`、`REF-067`、`REF-062`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path)。

## 空间构图

非对称同轨网格、可读层叠、留白轴线与抽象星图。

### REF-085 · Asymmetric editorial subgrid / 非对称同轨编辑网格

- **场景**：设计杂志、展览索引、可读作品列表。
- **设计构成**：外部多栏非对称节奏，内部标题/来源/摘要沿共享 track 对齐；不得依靠绝对定位排序内容。
- **状态与可回退行为**：desktop-wide→tablet-reflow→single-column；阅读次序固定。
- **简化 / 无障碍替代**：普通单列 grid/块流；无 subgrid 时使用普通 grid 对齐。
- **明确反例**：视觉排列与 DOM 次序分歧、跨栏过度溢出、假 Masonry 破坏焦点路径。
- **与旧资产的差异**：不同于既有 14 套主题：仅跨主题布局语法，不产生新的 styleId。
- **关联已有资产**：`DT-013`、`DT-009`、`TPL-002`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)。

### REF-086 · Legible depth layers / 可读层叠深度

- **场景**：展览卡片、媒体展示、少量层叠资料。
- **设计构成**：装饰深度与可交互内容分层；用明确投影/遮挡规则营造前后感，保持真实 DOM 次序。
- **状态与可回退行为**：rest→focus-foreground→open-detail→close；焦点环始终在可见图层。
- **简化 / 无障碍替代**：普通单层卡片与显式层级标题；禁用 GPU/阴影时维持内容。
- **明确反例**：视觉遮挡可交互按钮、负 z-index 内容不可见、位置响应后丢焦点。
- **与旧资产的差异**：不同于 3D REF-059..063：这里是 DOM/CSS 层叠关系，不需要 WebGL。
- **关联已有资产**：`REF-063`、`REF-075`、`REF-079`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation)。

### REF-087 · Whitespace-axis composition / 留白与文字轴线构图

- **场景**：展览导语、文化活动、长文封面。
- **设计构成**：标题、章号、引文、索引在显式轴线上定位；留白承担层级，而不被误当可点击热区。
- **状态与可回退行为**：large→compact→mobile; 主操作保持可见而非依赖巨大空白。
- **简化 / 无障碍替代**：紧凑线性排版；高倍缩放可换行并保持完整语义。
- **明确反例**：为了画面感将正文绝对定位、100vh 锁住可读文字、忽略中文换行。
- **与旧资产的差异**：不是 DT-013 新主题，仅是独立排版构图策略，文本保持可选择。
- **关联已有资产**：`DT-013`、`REF-069`、`REF-080`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout)。

### REF-088 · Constellation guide geometry / 星图索引引导线

- **场景**：创意作品集、城市档案、空间型目录。
- **设计构成**：用径向参考线、坐标标号和分组解释建立空间隐喻；实际可操作项目顺序由语义导航承载。
- **状态与可回退行为**：overview→hover-neighbor→focus-item；连接线仅装饰，不表示真实关系。
- **简化 / 无障碍替代**：有分组文字目录、可达列表，窄屏可取消径向布局。
- **明确反例**：伪造真实地点坐标、用连接线表达不存在的关系、依赖 hover 才能发现项目。
- **与旧资产的差异**：不同于 REF-047 地理地图：此为抽象视觉索引，不能当作地图或具定位精度。
- **关联已有资产**：`REF-039`、`REF-047`、`REF-061`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient)。

## 创意导航

星图导航、环形罗盘、章节方位轨、锚定上下文菜单。

### IP-042 · Constellation index with text parity / 星图索引与文字目录等效

- **场景**：沉浸作品导航、创意分类浏览。
- **设计构成**：空间节点可建立层级关系，但每个节点必须映射到可键盘访问的同名文字链接与 URL。
- **状态与可回退行为**：overview→filter-cluster→focus-node→open-item→return；返回时恢复筛选和焦点。
- **简化 / 无障碍替代**：提供索引切换、搜索、普通分类目录；小屏默认索引视图。
- **明确反例**：无障碍仅用旋转手势、节点重叠不可点击、位置变化丢导航上下文。
- **与旧资产的差异**：区别 REF-088 纯视觉构图：本条聚焦导航状态，不能直接借用真实网站 UI。
- **关联已有资产**：`REF-088`、`IP-018`、`REF-028`；[原始技术参考](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)。

### IP-043 · Radial action compass with list fallback / 环形操作罗盘

- **场景**：创意工具、触控编辑器的次要指令入口。
- **设计构成**：少量同组操作围绕激活点摆放，重要功能仍有列表/键盘入口；禁用时说明原因。
- **状态与可回退行为**：idle→open→focus-segment→activate|cancel→restore-focus。
- **简化 / 无障碍替代**：标准 toolbar/menu 或明确按钮列表，触控大目标且有文本标签。
- **明确反例**：用纯角度猜含义、圆环挡住附近操作、指针方向难精确操作。
- **与旧资产的差异**：与 IP-030 旋钮不同：旋钮修改连续数值，本模式选择离散操作。
- **关联已有资产**：`IP-030`、`IP-035`、`REF-058`；[原始技术参考](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)。

### IP-044 · Persistent chapter orientation rail / 可恢复章节方位轨

- **场景**：非线性长内容、画册、章节收藏。
- **设计构成**：章节 ID、标题、阅读位置与返回路线分别保存；进度只反馈位置而不强制滚动。
- **状态与可回退行为**：enter→jump-chapter→deep-link→back-to-origin→restore-focus。
- **简化 / 无障碍替代**：原生目录 + 章节跳转 + 返回链接；保留浏览器历史语义。
- **明确反例**：仅变换章节数字却不更新 URL、章间导航夺取焦点、进度条谎称完成。
- **与旧资产的差异**：与 REF-077 滚动叙事不同：关注跨章节定向与回程，不要求滚动驱动动画。
- **关联已有资产**：`REF-077`、`IP-029`、`REF-078`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/API/History_API)。

### IP-045 · Anchor-tethered context switch / 锚点上下文切换

- **场景**：作品图注、图片注释、局部场景导航。
- **设计构成**：选定对象与操作面板显式绑定，优先保持可见；支持多项重复节点的作用域隔离。
- **状态与可回退行为**：closed→anchor-selected→panel-open→reposition→dismiss→focus-restored。
- **简化 / 无障碍替代**：普通 Popover/DOM 相邻按钮与菜单；无 anchor positioning 时可用静态 inline panel。
- **明确反例**：重复 anchor-name 误绑定最后一个节点、溢出视口、只在 hover 时出现。
- **与旧资产的差异**：不同于 IP-027 资料来源注释：这里只解决导航面板空间定位与返回。
- **关联已有资产**：`IP-027`、`REF-027`、`REF-058`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using)。

## 非传统交互

逐帧探索、语义透镜、可逆分组与有界深度反馈。

### IP-046 · Frame scrub with explicit seek / 档案帧逐格探索

- **场景**：动效档案、交互分镜、作品回顾。
- **设计构成**：拖动只能改变预览帧，真实状态以明确选中帧和文字时间/序号同步。
- **状态与可回退行为**：idle→drag-preview→seek-confirmed|cancel→selected-frame。
- **简化 / 无障碍替代**：键盘前后帧按钮、跳转输入、可点击有标题缩略图。
- **明确反例**：滑动时播放不可控音视频、没有定位、帧选中状态与预览不同步。
- **与旧资产的差异**：不同于 IP-023 多轨时间轴编辑器：不改变时间轴内容，也不要求播放器。
- **关联已有资产**：`IP-023`、`REF-083`、`IP-032`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)。

### IP-047 · Semantic inspection lens / 语义检查透镜

- **场景**：科学插画、标注资料、产品层级探索。
- **设计构成**：模式是明确筛选/显隐层，不是物理放大镜；镜下信息也能在标题列表中定位。
- **状态与可回退行为**：overview→inspect-mode→layer-targeted→detail-extracted→overview。
- **简化 / 无障碍替代**：可选择图层的表格、图层列表和静态注释；触控可点选而非悬浮。
- **明确反例**：透镜悬浮是唯一读数方式、掩盖重要信息、模式退出后筛选丢失。
- **与旧资产的差异**：区别 IP-026 图表联动：聚焦注释/概念层的检查模式，不做数据刷选。
- **关联已有资产**：`IP-026`、`REF-067`、`REF-084`；[原始技术参考](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)。

### IP-048 · Reversible collection shuffle / 可逆空间分组

- **场景**：数字展览、收藏管理、探索式作品浏览。
- **设计构成**：分组是视图状态不是数据更改；清晰显示当前分类/排序，可一次切回默认序列。
- **状态与可回退行为**：default-order→group-preview→group-applied→undo|restore-order。
- **简化 / 无障碍替代**：普通列表和选项筛选；键盘/屏读中保持条目数、组名和稳定 ID。
- **明确反例**：位置变化导致用户以为内容消失、动画代替真实排序、还原后焦点丢失。
- **与旧资产的差异**：不同于 IP-021 拖放编辑：此处只是浏览模式分组，不更改条目所属关系。
- **关联已有资产**：`IP-021`、`IP-035`、`REF-088`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)。

### IP-049 · Constrained depth parallax with explicit target / 有界深度偏移

- **场景**：互动海报、单品细节、可点选立体层。
- **设计构成**：视差只装饰当前焦点或选择对象，真实操作目标永远使用稳定 DOM 控件。
- **状态与可回退行为**：rest→pointer-depth-preview→focus-target→activate|cancel→rest。
- **简化 / 无障碍替代**：关闭视差和 reduced-motion；静态层级与明确按钮保持完整功能。
- **明确反例**：跟随光标高频重排、视觉漂浮遮挡点击热区、动效产生眩晕。
- **与旧资产的差异**：区别 REF-086 深度布局（静态分层）：本条记录输入驱动状态与中断策略。
- **关联已有资产**：`REF-086`、`IP-035`、`REF-079`；[原始技术参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform)。

## 第三方视觉参考（外链，不打包媒体）

- [Studio Hyte · NOVA-X](https://studiohyte.com/projects/nova-x)：旋转星图与可见 Index/Menu 切换，可作为空间探索和索引双入口的案例（不是可复制代码授权）。
- [In search of Hy-brasil](https://www.petermaybury.com/in-search-of-hybrasil/)：影像与文字方格并置的视觉节奏参考，注意其美术素材和版式为第三方作品。
- [Love Letters to Cities](https://www.commarts.com/project/35081/love-letters-to-cities)：多影像点位叙事的外部案例；不将公开截图视为可再分发素材。

## 核查约束与不做项

1. 文本/导航必须存在普通 DOM 结构和明确的 URL、返回及键盘路径；图形或空间布局是可选强化，不是唯一信息通道。
2. CSS 的 `subgrid`、`scroll-snap`、`anchor positioning` 可选使用，先提供网格/线性布局、非强制滚动和静态定位降级；浏览器兼容要在独立产品验证。
3. 不创建 14 个主题之外的新 styleId，不写 React 通用页面模板、不做运行演示站点或业务产品，不把外部示例截图复制入仓库。
4. 若单项要实现到独立项目，必须验证状态恢复、低动效、焦点、触摸/键盘及真机表现；本次只有技术文档研究，没有测试。
