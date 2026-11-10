# V0.31 · 三类专项素材的设计契约（2026-11-10）

> 本文是原创研究型设计素材，不是成品页面、已实现组件、原厂设计规范或性能实测。全部条目为 `analyzed / research-only`，不自动兼容 14 套主题或 React 包；不在素材仓库组装完整应用。

## 阅读方式

- 机器检索：[`registry/specialized-patterns-v031.json`](../../registry/specialized-patterns-v031.json)，每条均包含用途、组成、状态、降级、风险、上游证据和现有资产关联。
- 搜索入口：[`CATALOG.md`](../../CATALOG.md) 与 [`registry/assets.json`](../../registry/assets.json)。
- 上游登记：[`registry/specialized-resources-v030.json`](../../registry/specialized-resources-v030.json)；V0.31 是研究深入，不代表新的第三方依赖。

## 3D 材质、后处理与材质表现

### REF-059 · Clearcoat layered surface / 清漆涂层表面

**适用情境**：实体商品细节、精密器材与可旋转展示。

- **构成 / 表现**：基础材质 + 独立清漆层；分离粗糙度、反射、环境照明。
- **交互与状态**：idle→rotate-preview→selected-detail；高光是材质信息而非点击状态。
- **无障碍 / 低性能替代**：静态多角度图与不依赖反射的文字说明。
- **风险与排除条件**：额外 per-pixel 着色；限制高光面积、低端模式用 StandardMaterial。
- **关联已有资产**：`REF-051`、`REF-052`；**官方来源**：[阅读原始参考](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)。

### REF-060 · Transmissive volume / 透射玻璃与折射实体

**适用情境**：透明器皿、科技展示、有限量的材质焦点。

- **构成 / 表现**：区分物理 transmission 与 CSS alpha；可阅读的背景、主体轮廓、独立 UI 信息层。
- **交互与状态**：idle→focus-object→camera-move→rest；不能依赖透射显示文本。
- **无障碍 / 低性能替代**：不透明轮廓 + 静态图 + 文本规格；prefers-reduced-motion 静止。
- **风险与排除条件**：多层透明渲染开销高；避免全屏折射、文字覆盖、虚假视觉层级。
- **关联已有资产**：`REF-051`、`REF-052`；**官方来源**：[阅读原始参考](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)。

### REF-061 · Iridescent foil / 虹彩薄膜

**适用情境**：创意活动与限定产品的材质识别。

- **构成 / 表现**：随视角变化的虹彩层，深浅关系稳定；重要状态始终用文本或形状冗余编码。
- **交互与状态**：still→user-angle-change→stable; 非强制循环色彩闪动。
- **无障碍 / 低性能替代**：固定单色渐变/静态纹理图，选择状态使用显式轮廓。
- **风险与排除条件**：色相变化易掩盖可读性与状态；低性能设备降级。
- **关联已有资产**：`REF-051`、`REF-052`；**官方来源**：[阅读原始参考](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)。

### REF-062 · Matte clay volume / 哑光陶土体积

**适用情境**：产品叙事、插画式 3D 物件和温和视觉系统。

- **构成 / 表现**：metalness/roughness 的基础物理材质；暖哑光、柔和阴影和明确剪影。
- **交互与状态**：rest→small-rotation→rest；交互反馈靠位移或说明而非仅细微阴影。
- **无障碍 / 低性能替代**：普通二维轮廓插画或系统阴影图块。
- **风险与排除条件**：阴影贴图和模型复杂度控制；不把装饰物件当 UI 控件。
- **关联已有资产**：`REF-051`、`REF-052`；**官方来源**：[阅读原始参考](https://threejs.org/docs/pages/MeshStandardMaterial.html)。

### REF-063 · Selective emissive halo / 局部发光与后处理

**适用情境**：互动展览、空间高亮和少量视觉锚点。

- **构成 / 表现**：先定位真实选择对象；后处理 glow/bloom 只负责视觉强化，不承载状态本身。
- **交互与状态**：idle→hover/focus→selected→reset；不可持续自动闪烁。
- **无障碍 / 低性能替代**：原生 outline / CSS 边框，背景不支持 GPU 时保持可见焦点。
- **风险与排除条件**：过曝、发热与持续重绘；大面积 bloom 会损伤文本对比。
- **关联已有资产**：`REF-051`、`REF-054`；**官方来源**：[阅读原始参考](https://github.com/pmndrs/postprocessing)。

## 数据图形、图层、数值与证据体验

### REF-064 · Linked chart, filter and source table / 图表与数据表联动

**适用情境**：分析台、研究报告和探索式数据筛选。

- **构成 / 表现**：单一 record ID 集合驱动多图/筛选/表格；笔刷与选择分离。
- **交互与状态**：idle→brush-preview→committed-selection→clear/undo；列表准确显示被选记录数。
- **无障碍 / 低性能替代**：常规筛选表、输入精确区间、按 ID 导航到选中条目。
- **风险与排除条件**：图表与表数据源/粒度不一致、丢焦点、屏读结果未同步。
- **关联已有资产**：`REF-041`、`REF-049`、`IP-026`、`UI-033`；**官方来源**：[阅读原始参考](https://deck.gl/docs/developer-guide/interactivity)。

### REF-065 · Density aggregation with drill-through / 密度聚合与明细追溯

**适用情境**：大规模地理点云、空间分布和热点研究。

- **构成 / 表现**：原始点/网格/六边形/热力图是不同问题；显示聚合单位、时间窗和算法。
- **交互与状态**：overview→bin-highlight→bin-selected→detail-list→back。
- **无障碍 / 低性能替代**：按区域排序的数据明细表，保留选择对应的来源记录。
- **风险与排除条件**：GPU 聚合小样本未必快，且某些模式无法直接反查 bin 内点；不可伪造明细。
- **关联已有资产**：`REF-047`、`REF-048`；**官方来源**：[阅读原始参考](https://deck.gl/docs/api-reference/aggregation-layers/overview)。

### REF-066 · Uncertainty and provenance annotation / 不确定性与溯源注释

**适用情境**：统计图表、证据仪表和公开数据报道。

- **构成 / 表现**：数据版本/来源/分母/置信范围与视觉标注绑定；不混淆解释和原始值。
- **交互与状态**：normal→annotation-focus→source-inspection→return；悬浮注释可键盘抵达。
- **无障碍 / 低性能替代**：文本注释索引、原始值表、来源链接和单位说明。
- **风险与排除条件**：误导性截断轴、只靠色彩区分类别、缺失数据被填补为真实值。
- **关联已有资产**：`REF-041`、`REF-049`、`IP-027`；**官方来源**：[阅读原始参考](https://apache.github.io/echarts-handbook/en/best-practices/aria/)。

### REF-067 · Map layer legend and value semantics / 地图图层图例与数值语义

**适用情境**：多图层地理展示、专题地图与编辑型地图。

- **构成 / 表现**：图例、坐标/投影、颜色刻度、边界含义随图层选择同步。
- **交互与状态**：layers-off→layers-on→focus-feature→filter-layer→restore。
- **无障碍 / 低性能替代**：文字位置索引 + 对应记录表；地图不能作为唯一结果导航。
- **风险与排除条件**：误用不同比例尺或地理投影造成错误对比；数据源和瓦片授予单独核查。
- **关联已有资产**：`REF-047`、`REF-048`、`IP-026`；**官方来源**：[阅读原始参考](https://deck.gl/docs/api-reference/layers)。

### REF-068 · Virtualized dense record navigation / 虚拟化数据定位

**适用情境**：海量明细表、日志台、带图表的长列表。

- **构成 / 表现**：虚拟化窗口、稳定行标识、定位索引、选择保持和自适应高度。
- **交互与状态**：search→scroll-to-result→select→data-refresh→restore-focus。
- **无障碍 / 低性能替代**：普通分页、完整可下载表或不虚拟化的精简列表。
- **风险与排除条件**：索引与真实 ID 脱节、失焦、键盘导航跳行、动态行高抖动。
- **关联已有资产**：`REF-050`、`UI-033`、`UI-056`；**官方来源**：[阅读原始参考](https://tanstack.com/virtual/latest/docs/introduction)。

## 移动触摸、滚动及可恢复交互

### IP-031 · Bottom sheet and nested scroll arbitration / 底部抽屉与嵌套滚动协调

**适用情境**：手机筛选、确认、上下文详情和短表单。

- **构成 / 表现**：抓手区域与内容滚动区域分离；内容可滚动时不截获主滚动意图。
- **交互与状态**：closed→drag-opening→open→content-scroll→dismiss/cancel；背景滚动锁与焦点恢复。
- **无障碍 / 低性能替代**：原生 dialog / 全屏表单 / 明确关闭按钮。
- **风险与排除条件**：触摸方向竞争、底部安全区、虚拟键盘、滚动穿透。
- **关联已有资产**：`REF-058`、`REF-055`；**官方来源**：[阅读原始参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior)。

### IP-032 · Pinch-pan gesture coordination / 双指缩放与平移协调

**适用情境**：地图、自由画布、图片探索及编辑场景。

- **构成 / 表现**：区分单指平移、双指缩放、宿主页面滚动；Pointer IDs 与捕获生命周期。
- **交互与状态**：idle→one-pointer→two-pointer→cancel-one→resume/stop。
- **无障碍 / 低性能替代**：可见缩放按钮、重置视图、方向控制和数值缩放字段。
- **风险与排除条件**：触发系统滚动/缩放、pointercancel 未回滚、鼠标和触摸坐标错乱。
- **关联已有资产**：`REF-055`、`REF-047`、`IP-018`；**官方来源**：[阅读原始参考](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)。

### IP-033 · Long-press reorder with keyboard parity / 长按排序和键盘等效

**适用情境**：移动卡片重排、列表组织和编辑选择。

- **构成 / 表现**：短点按打开、长按激活排序；拖动反馈不得替代可见移动按钮。
- **交互与状态**：idle→arming→dragging→drop/cancel→undo；键盘拖放与按钮上下移同一状态模型。
- **无障碍 / 低性能替代**：移动上/下按钮、选择目标位次的菜单。
- **风险与排除条件**：滚动与长按误判、松手未释放、跨容器撤销不一致。
- **关联已有资产**：`REF-057`、`REF-058`、`IP-021`、`UI-057`；**官方来源**：[阅读原始参考](https://react-aria.adobe.com/useDrag)。

### IP-034 · Swipe-to-reveal with guarded commit / 滑动操作与可撤销提交

**适用情境**：邮件/任务列表局部操作、待办和内容收藏。

- **构成 / 表现**：滑动是可选快捷入口，露出可见明确操作；破坏性动作单独确认。
- **交互与状态**：idle→swiping→threshold→action-exposed→committed/undo; cancel→original。
- **无障碍 / 低性能替代**：按钮或菜单执行同样动作；误触可显式撤销。
- **风险与排除条件**：滑动与系统导航/横向滚动冲突、误删、屏读无入口。
- **关联已有资产**：`REF-055`、`REF-058`；**官方来源**：[阅读原始参考](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event)。

### IP-035 · Bounded tactile response / 有界物理反馈

**适用情境**：轻量交互奖励、移动开关和可触摸控制。

- **构成 / 表现**：弹簧反馈对应明确状态变化，阻尼和持续时间可被中断；文字状态始终可见。
- **交互与状态**：press→respond→settle/cancel→rest；重复输入不累积无意义动画。
- **无障碍 / 低性能替代**：瞬时状态更新、静态颜色/文字反馈；系统 reduced-motion 优先。
- **风险与排除条件**：无限弹跳、视觉噪声、低帧率下迟滞、滑动取消未回滚。
- **关联已有资产**：`REF-056`、`REF-058`、`IP-030`；**官方来源**：[阅读原始参考](https://www.react-spring.dev/docs)。

## 防止错误复用的通用规则

1. **证据边界**：本文仅核对上游公开技术文档并提出原创设计约束，未对实际 UI 运行截图、手机设备、浏览器性能或屏幕阅读器进行验证；不得标记 `validated`、`production-ready`。
2. **3D**：材质复杂度和全屏像素开销须在目标设备测量，导入实体需独立模型/贴图许可；材质不表达唯一操作含义。
3. **数据**：图上每个数量应可追溯至原始数据的来源、单位、筛选范围；GPU 聚合加速需考虑数量与分布，而非默认更快；必须提供表格或等效文本路径。
4. **移动**：必须覆盖 `pointercancel`、滚动竞争、键盘等效路径、低动效选项；不要全局设置 `touch-action: none` 破坏页面可滚动性。
5. **迁移**：仅允许在独立目标项目中按需挑选、实现与验证；禁止仅因这里有研究条目就引入 3D、地图或拖拽依赖。
6. **重叠审查**：与现有 `IP-018..030`、`UI-033..062`、`REF-041..058` 交叉定位；同一个问题优先使用已有可运行资产，除非有明确能力缺口。
