# V0.40 · Registry → 区块数据映射 × 有界嵌套 Slot × 预览确认（2026-11-11）

**目标**：在长期素材仓库增加可以真正执行和独立验证的结构与交互模型，而不是搭建产品级网页编辑器。此前 V0.36/37 已登记 shadcn Registry、Puck/Craft.js 与 Agent canvas 研究；V0.39 有扁平区块属性 Schema。本轮在此基础上补齐可检查的 **元数据映射、Slot 约束、显式预览确认**。

## 三个独立原创模型

| ID | 模型 | 提供 | 不提供 |
| --- | --- | --- | --- |
| IP-063 | [registry-adapter.mjs](../../playground/registry-slots-v040/registry-adapter.mjs) | 本地 `fixture.hero/feature/quote` 的 allowlist 元数据到已有 `BLOCK_DEFS` 映射；字段和实例 ID 校验；未知外部条目返回 review-only | 不下载/执行任何社区 Registry 代码，未核真实 shadcn 格式/每项授权 |
| IP-064 | [slot-tree.mjs](../../playground/registry-slots-v040/slot-tree.mjs) | 两种容器 Section/Stack，三层上限、节点唯一/单父、Slot 类型与容量校验、不可变插入/移动/属性改动、结构概览 | 不支持任意深度、嵌套拖拽、远程储存或动态 React 组件 |
| IP-065 | [command-preview.mjs](../../playground/registry-slots-v040/command-preview.mjs) | `insert/move/edit` 本地命令预览、原文档/Revision 校验、显式确认与重新执行并比较结果 | 前端不能充当服务端鉴权、真正安全审批、签名摘要或代码执行 |

## Slot 契约

| 容器/Slot | 可容纳类型 | 每 Slot 容量 |
| --- | --- | --- |
| Root | section | ≤ 4 个 |
| section.content | hero / feature / stack | ≤ 4 个 |
| stack.items | feature / quote | ≤ 3 个 |

全部文档最多 12 个 node、深度最多 3，所有节点 ID 必须唯一且可从 Root 到达一次。容器属性只允许明确的枚举取值，叶节点直接复用 V0.39 的属性校验，保证新旧研究之间有真实可追踪的代码复用关系。

## 操作示例与测试范围

- [可操作的独立标本](../../playground/registry-slots-v040/index.html) 让使用者选择原创映射键、实例 ID 和目标 Slot，预览后才确认操作；演示非法 Hero→Stack 类型被拒绝、已有 Feature 迁移到 Stack、Section 布局修改与预览丢弃。
- [Node 测试](../../tests/registry-slots-v040.test.mjs) 检查 Registry 欠授权或未知字段拒绝、严格 Slot 类型/容量/归属和 root 限制、preview 的不可变性、stale revision、修改篡改和未知命令类型。
- [Playwright 浏览器测试](../../tests/browser/registry-slots-v040.spec.mjs) 覆盖真实按钮操作、违规提示、Revision 刷新、丢弃、重复 ID 和 390px 窄屏布局。
- 模型在孤立环境内不执行 HTML/JS/外部 CSS；预览使用纯文本渲染，不会插入未审来源的代码。Browser smoke 不等于真实项目安全审计。

## 素材边界与差异

- IP-050 为已有“Registry item → editable block”研究合同，IP-051 为 Agent 画布权限研究，IP-061 为实际有限类型属性 Schema，IP-062 为本地历史。**本轮不篡改旧 ID 或重复宣称已有功能**：新增 IP-063/064/065 负责桥接、嵌套有界规则、提交前检查。
- 本轮 3 份原创模型为 `prototype / behavior-pattern / adapt-required`；无新增 React 公共导出、视觉 style ID、第三方依赖、可安装 Registry 或成品网页。
- 来源、许可与上下文：只有本地原创 Fixture 可创建节点；外部 Registry 条目始终是待逐项审核的来源元数据，不能从仓库整体 MIT 直接推出每项图片、字体和社区模板的复用权。
- 真实应用还需要服务端权限、文档版本校验、跨会话持久化、操作审计、异步冲突恢复、真实触屏拖拽、屏幕阅读器验证及框架适配。

## 后续可扩展但不纳入本轮

未来可考虑把受控 Registry 元数据映射拆成独立输入/输出 JSON Schema，加入版本迁移校验和可重复差异测试。但仍应保持素材仓库边界，避免把这些参考串起来变成通用 SaaS 页面搭建平台。