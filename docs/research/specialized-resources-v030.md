# V0.30 · 专项外部前端资源整合（2026-11-10）

> **只积累素材，不在仓库组装页面或应用。** 本轮收录外部来源和复用契约，不拉取第三方源码、不安装依赖、不下载媒体、不建立页面生成器。所有 `REF-042..058` 均是 `research-only / analyzed`。

## 核查和新增概览

- 新增 **17 项独立外部来源**，分为 **4 组**；与已有 `REF-031..041`、`IP-018..030`、`UI-033..062` 明确去重/互补。
- 上游 GitHub 仓库名称、许可证元数据、维护状态和公开说明于 2026-11-10 对照核查；**并未实际安装、执行示例或通过兼容测试**。
- 精细索引：[registry/specialized-resources-v030.json](../../registry/specialized-resources-v030.json)；统一资产登记：[registry/assets.json](../../registry/assets.json)；Agent 导航：[CATALOG](../../CATALOG.md)。

## 专业编辑器与画布

富文本、图节点、手绘对象、同步状态；不组装编辑器应用。

| ID / 来源 | 为什么新增（对既有资产的补位） | 聚焦素材 | 许可与边界 |
| --- | --- | --- | --- |
| REF-042 [React Flow / xyflow](https://github.com/xyflow/xyflow) | UI-058/IP-018 已有轻量节点和空间操作；补复杂图编辑器模型 | 节点画布、连线、框选、缩放、视口状态 | MIT；官方商业使用说明支持 MIT；Pro 内容另核 |
| REF-043 [Lexical](https://github.com/meta/lexical) | 现有表单控件不覆盖复杂富文本/文档语义 | 文档编辑状态、可扩展节点、键盘选区、撤销历史 | MIT；需独立研究粘贴、IME、屏幕阅读器及序列化 |
| REF-044 [Tiptap core](https://github.com/ueberdosis/tiptap) | 与 Lexical 做架构对照，而非当作两套视觉库 | Headless 富文本、扩展体系、协作编辑器 UI 形态 | MIT (core)；付费扩展、云服务与模板单独核许可 |
| REF-045 [Yjs](https://github.com/yjs/yjs) | 为编辑器/白板补多人状态模型；本身不是 UI | CRDT、多人协作状态、冲突与离线恢复 | MIT (LICENSE)；传输服务、持久化和身份权限由宿主提供 |
| REF-046 [Excalidraw](https://github.com/excalidraw/excalidraw) | 与 React Flow 区分自由形状编辑和节点图编辑 | 手绘白板、自由画布、对象工具、选择和视图操作 | MIT (repository)；案例、字体、在线服务与嵌入资源须单独审查 |

## 数据可视化与地理空间

GPU 数据层、地图、复杂图形、虚拟化；不做业务图表。

| ID / 来源 | 为什么新增（对既有资产的补位） | 聚焦素材 | 许可与边界 |
| --- | --- | --- | --- |
| REF-047 [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) | 补此前无专门地图渲染能力；与 IP-026 可联动 | 矢量瓦片、底图、地理交互、移动端地图操作 | BSD-3-Clause (LICENSE.txt)；地图瓦片/数据服务、地图归属和 token 成本是独立授权 |
| REF-048 [deck.gl](https://github.com/visgl/deck.gl) | 补 Observable Plot（REF-041）之外的 GPU 地理可视化 | GPU 图层、大规模点/面/轨迹、地图图表联动 | MIT；WebGL2、设备能力、GPU 内存和辅助数据表需验证 |
| REF-049 [Apache ECharts](https://github.com/apache/echarts) | 相比 UI-055 简易条图增加完整可视化体系 | 复杂交互图表、系列、视图切换、无障碍替代思路 | Apache-2.0；数据一致性、可访问性、数据量和构建体积需独立验证 |
| REF-050 [TanStack Virtual](https://github.com/TanStack/virtual) | 补 UI-033/UI-052/UI-056 的大数据行为，不是新视觉 UI | 大规模列表/网格虚拟化、动态尺寸、滚动定位 | MIT；虚拟化影响焦点、屏幕阅读器、跳转定位和行身份 |

## 3D / WebGL 视觉与空间交互

渲染技术、辅助构件、后处理；不引入通用 React 包。

| ID / 来源 | 为什么新增（对既有资产的补位） | 聚焦素材 | 许可与边界 |
| --- | --- | --- | --- |
| REF-051 [three.js](https://github.com/mrdoob/three.js) | 是三维视觉技术基础，不等于 React 组件包 | 底层 WebGL 场景、几何、材质、光照和渲染循环 | MIT；浏览器 GPU、设备发热、资源尺寸、2D fallback |
| REF-052 [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | 与 existing CSS-only 风格区分；可参考沉浸式交互结构 | React 声明式场景、交互对象、相机、事件与帧循环 | MIT；React 19 对应 v9；v10 截至核查时为 alpha，避免默认采用 |
| REF-053 [Drei](https://github.com/pmndrs/drei) | 与 R3F 互补，非独立底层渲染器 | 相机控制、常用 3D helpers、场景复用形态 | MIT；helper 的性能/可访问性需逐个核查 |
| REF-054 [postprocessing](https://github.com/pmndrs/postprocessing) | 补纯 CSS 动效缺少的着色器/后处理语言 | 景深、Bloom、描边、像素化等 GPU 后处理 | Zlib；复杂效果的性能预算与减少动态效果替代 |

## 移动端触摸与原生交互

指针/触摸、动效、排序、可访问性；不做移动业务页面。

| ID / 来源 | 为什么新增（对既有资产的补位） | 聚焦素材 | 许可与边界 |
| --- | --- | --- | --- |
| REF-055 [use-gesture](https://github.com/pmndrs/use-gesture) | 补 IP-018、拖拽和滑杆之外的真实多指事件契约 | 触摸拖动、捏合、惯性与手势取消状态 | MIT；默认分支最新代码提交较久；引入前复核维护/浏览器兼容 |
| REF-056 [react-spring](https://github.com/pmndrs/react-spring) | 与现有 MOT presets 的轻量时长方案不同 | 弹簧物理、手势响应、可中断动画、反馈节奏 | MIT；运动敏感和 reduced-motion、布局抖动仍需单独测试 |
| REF-057 [dnd-kit](https://github.com/clauderic/dnd-kit) | 对照 UI-057/IP-021 的基础拖放与键盘替代 | 拖放传感器、碰撞处理、列表排序、跨容器转移 | MIT；拖放不是唯一操作路径；移动长按冲突、滚动和键盘须验证 |
| REF-058 [React Aria / React Spectrum](https://github.com/adobe/react-spectrum) | 补 Dialog/Popover 等组件在移动端的语义与焦点契约 | 触摸友好的 overlay、sheet 类模式、焦点管理与可访问性 | Apache-2.0；将库级 API 与 Adobe 整套设计外观分开研究 |

## 与既有资产的关系

- 既有 `FlowEditor`（UI-058）、空间画布（IP-018）和跨容器拖放（IP-021）保留为原始轻量源码与交互实验；React Flow / Excalidraw / dnd-kit 是能力对照，不视为它们的自动升级。
- 既有 `REF-041 Observable Plot`、`IP-026` 联动刷选与 DataTable/Charts 系列保留；MapLibre 和 deck.gl 分别提供地图与 GPU 层，TanStack Virtual 提供 headless 大数据列表行为。
- 既有 14 个 `styleId` 和 48 个 React 公共导出不变；3D、移动手势和富文本不声明直接兼容四个已支持主题。
- 对于移动端，优先整理连续状态、触摸/键盘等效路径与安全区；并不等价于已经具备跨设备可访问性验证。

## 调用与复用决策规则

1. 先按任务到 `CATALOG.md` 找 `REF-042..058`，再到精细 JSON 查 `group`、`gapVsExisting`、`limitations` 与 `applicationContexts`。
2. 研究类条目只能给出选型、设计契约和上游链接；要复用源码应在目标项目中单独选型、审查当时的许可/版本、保留版权声明及测试。
3. 不复制官方截图、字体二进制、地图数据或付费示例；MIT/Apache/BSD/Zlib 的源码许可**不等于**服务 API、媒体内容、云功能的许可。
4. 使用地图需要核查瓦片和地理数据来源的费用/归属；使用 3D 需要 GPU 与低端设备降级；使用复杂画布/编辑器需要键盘、IME、焦点、撤销和协同冲突设计。
5. 不因 Stars、发布日期或工程体量自动提高资产成熟度。现有实现能否升级必须通过独立验证。

## 下一步可扩充的非组装素材

- **操作契约**：协作编辑冲突态、离线同步、选区与 Undo、长按/捏合取消、地图图层交互与低性能降级。
- **视觉粒度**：3D 材质/灯光语言、专业数据可视化标注、移动触摸转场的材质与时序，优先原创描述和小型状态图，而非整页 UI。
- **质量核查**：外部链接有效性、许可变化、同义词检索与覆盖、适用场景和负例；不要求把所有研究来源升级为可执行组件。
