# V0.39 · 原创可视化区块编辑交互素材（2026-11-11）

本次从 V0.36/V0.37 对 Puck、Craft.js、shadcn Registry 的模式研究，推进到**独立可运行的原创编辑行为参考**，不直接安装这些开源库或打造通用页面平台。保留现有拖动、Kanban 与历史素材，避免重复；重点在组件数据模型、可配置属性和可验证的历史状态。

## 资产与源码

| ID | 新增模块 | 核心状态/接口 | 独特价值 |
| --- | --- | --- | --- |
| IP-060 | [reorder-model.mjs](../../playground/visual-editor-v039/reorder-model.mjs) | reorderBlocks、stepBlock | DOM 坐标之外的不可变**有序区块 ID 列表**；可用键盘上下移动 |
| IP-061 | [block-schema.mjs](../../playground/visual-editor-v039/block-schema.mjs) | BLOCK_DEFS、seedBlocks、validateBlocks、updateBlockProps、exportBlockSchema、importBlockSchema | 用白名单/长度/类型约束属性，不接收任意 HTML 或未知字段 |
| IP-062 | [editor-history.mjs](../../playground/visual-editor-v039/editor-history.mjs) | createEditor、selectBlock、commitBlocks、dropBlock、moveSelected、editSelectedProps、undoEditor、redoEditor、historySummary | 选择和内容事务分开，撤销/重做/分叉历史保持一致 |

关联既有素材：IP-021（跨容器拖动与历史）、IP-040（本地与远端事务研究）、IP-050（Registry 至区块）、REF-094（Puck）、REF-099（Craft.js）、UI-058（Node Flow Editor）。这些是设计背景，不代表复制任何上游源码。

## 演示页与可检查的行为

- [独立 HTML 演示页](../../playground/visual-editor-v039/index.html)：左侧区块列表 + 右侧属性检查器 + 下方结构预览和本地只读 JSON，不包含业务数据/服务端。
- 鼠标端使用 HTML5 dragstart/dragover/drop，明确“放在目标之前”；键盘及触摸可用每个条目的上移/下移按钮；选择按钮反馈 aria-pressed。
- 属性检查器根据内部 BLOCK_DEFS 生成字段，单次提交是一个撤销事务；标题清空、非法枚举、超出范围或未知字段均拒绝破坏有效数据。
- 撤销/重做包含区块顺序和属性快照。只选择区块不新增历史，开始新的修改分支会清空 redo；内部历史最多保留 30 次。
- JSON 文档通过版本号与白名单校验，演示只读展示导出，没有网页文件下载或持久化。输入的 HTML 片段作为纯文本展示，DOM 未将其解释为代码。

## 验收与权利边界

- [纯模型 Node 测试](../../tests/visual-editor-v039.test.mjs) 与 [Chromium 浏览器测试](../../tests/browser/visual-editor-v039.spec.mjs) 双路径验证。
- CSS 局部限制在 .ve39 根节点，提供小屏、自适应、reduced-motion、forced-colors 回退；不是仓库默认风格。
- 所有 HTML/CSS/JS、占位示例均在仓库内原创，无外部图片、字体、网络依赖或未知许可的用户社区作品。
- 新资产 IP-060..062 = prototype / behavior-pattern / adapt-required，实际源路径和 demo 可以检索；旧研究或已有 React 导出并未升级/改变。
- 严格非生产：没有 React 布局系统、组件注册安装、嵌套拖放、跨设备拖拽验证、服务器鉴权、协作历史、数据持久化、真实产品页面或网站部署。CI 通过只说明受控模型和浏览器场景成功。

## 下一轮可选拓展

如果继续扩展，优先验证可移植的**区块 manifest/props schema 适配映射**、最小嵌套区域约束和独立 Inspector 形式规范。只有当复用价值明确且测试可落地时再实现，不在本仓库内组装全站编辑器。
