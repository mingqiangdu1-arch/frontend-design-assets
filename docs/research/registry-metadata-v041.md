# V0.41 · shadcn Registry 元数据兼容研究（2026-11-11）

本轮为前端素材仓库增加**独立可执行的元数据读取与检查工具素材**，而非安装第三方 React 组件或开发网站搭建器。重点把此前的 Registry 来源研究和 V0.40 原创区块元数据适配，升级为**对官方固定版本的可复核事实进行解析和差异判断**。

## 真实来源与边界

- 官方条目规范：[registry-item.json](https://ui.shadcn.com/docs/registry/registry-item-json) 规定 `dependencies`、`devDependencies`、`registryDependencies`、`files.path/type/target`、`cssVars` 等字段；部分 `registry:page/file` 要求明确 target。本库仅实现其可审计的元数据子集，不声称完全符合官方 JSON Schema。
- 上游固定提交：`8ab27715521cbd4f87ae6886cd989cbb678f6de7`。事实取自 [UI 注册表定义](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui/_registry.ts) 和 [Block 定义](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/blocks/_registry.ts)。
- 上游仓库许可证：[MIT](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/LICENSE.md)，仅为仓库代码级证据，**不能自动授权其中媒体、字体、引用内容或 npm 依赖**。本轮不复制任何源码或视觉媒体。

## 具体条目与观测值

| 条目 | 上游类型 | npm 依赖（源定义） | Registry 依赖（源定义） | 文件路径/目标 |
| --- | --- | --- | --- | --- |
| `button` | `registry:ui` | `radix-ui` | 无 | `ui/button.tsx` |
| `alert-dialog` | `registry:ui` | `radix-ui` | `button` | `ui/alert-dialog.tsx` |
| `login-04` | `registry:block` | 未列 | `button`, `card`, `input`, `label`, `field` | `blocks/login-04/page.tsx` → `app/login/page.tsx`；`blocks/login-04/components/login-form.tsx` |

以上为逐条摘录后的**字段/来源事实**。每个条目的完整注册表/组件代码、视觉图像或自动安装行为未纳入本仓库。源路径和 Git 提交固定，不因为以后上游更新而悄悄改变。

## 三个原创执行模型

| 新 ID | 功能 | 能确认的状态 | 不具备的功能 |
| --- | --- | --- | --- |
| IP-066 | [registry-item-parser](../../playground/registry-metadata-v041/registry-item-parser.mjs) | 只读解析与严格路径检查，抽取依赖、文件 target、来源；`content` 丢弃、样式元数据标待审 | 非官方全字段 Schema 验证、组件执行/写盘、自动版权审查 |
| IP-067 | [dependency-graph](../../playground/registry-metadata-v041/dependency-graph.mjs) | 受审条目间有序依赖、无法解析的 `card/input/label/field` 标记、包版本差异与依赖环拒绝 | 在线查询未知 Registry、npm 包安装、依赖漏洞扫描 |
| IP-068 | [metadata-migration](../../playground/registry-metadata-v041/metadata-migration.mjs) | 仅迁移本库**内部元数据快照**版本 1.0 → 2.0 并报告差异 | 不能迁移 shadcn 上游 JSON Schema、实际组件源码和应用数据库 |

## 实际用例

- 对 `alert-dialog`，图模型能在受审元数据内解析 `button`，包依赖为 `radix-ui`；属于**来源图示**而非运行时构建成功。
- 对 `login-04`，记录 `button` 已纳入本地快照，但 `card/input/label/field` 未列入本轮三条目清单，必须明确显示为 *unresolved*，不能推断它们无法在外部获取，也不能声称本地已经安装。
- 任意 Registry 提供的文件源码 `files[].content` 会被丢弃；未知字段不会静默套用，目标写入路径绝不真的解析到本机文件系统。
- 版本模拟中的新增依赖是**人为构造的差异测试**，不是从官方源检测出的升级。固定上游 commit 的改变与本库 internal `formatVersion` 是两个不同维度。

## 可检验交付

- [本地浏览器交互标本](../../playground/registry-metadata-v041/index.html)；[原始的无代码 metadata fixture](../../playground/registry-metadata-v041/official-metadata-fixtures.json)。
- [Node 纯模型场景](../../tests/registry-metadata-v041.test.mjs)；[Chromium 交互场景](../../tests/browser/registry-metadata-v041.spec.mjs)。
- [独立使用说明](../../playground/registry-metadata-v041/README.md)；[机器索引](../../registry/registry-metadata-v041.json)。

## 项目边界与后续

新增素材仍为 `prototype / behavior-pattern / adapt-required`：有真实 ESM、静态浏览器标本、测试，但不等于可安装 React 组件、全部 shadcn Registry API 兼容、真实目标路径写入、目标应用迁移测试或服务端 Agent。仓库保持独立素材积累定位。

下一轮如继续，优先增加针对更广泛**官方元数据字段与不同发布版本的只读互操作测试矩阵**，以及区分许可证、缓存快照、语义版本与引用标签的来源管理。不应把解析器直接连接到未经审核的代码下载/执行流程。