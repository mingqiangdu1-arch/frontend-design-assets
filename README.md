# Frontend Design Assets

> 一个持续积累的前端视觉、交互与动效素材仓库（Living Repository）。服务于 AI WORKFLOW PLATFORM，也可复用于其他项目。

**状态：** Initial / Research & Prototype。这里不是已经验收完毕的生产级组件库，不等于一次性 UI Kit。

## 使用方式

1. **收录**：在 [Notion 素材数据库]([private-notion-link-redacted]) 保存来源、截图、行为、适用条件和授权；新案例不必立即编码。
2. **拆解**：阅读 [视觉规范](docs/visual/refined-light.md) 与 [交互规范](docs/interactions/patterns.md)；将同类方案横向比较。
3. **复现**：有价值的案例进入 `playground/`，配稳定资产编号、边界状态与可验证操作。
4. **沉淀**：测试通过后提升到 `components/` / `interactions/` / `recipes/`；仅在完成目标工程集成验证后标为 production-ready。
5. **组装**：从 [registry](registry/assets.json) 按 `id`、`tags`、`stage`、`dependencies` 搜索，并依照 [AGENTS.md](AGENTS.md) 在 Codex 中快速复用。

## 当前视觉基线

**Refined Light SaaS**：Attio 的浅色空间、Vercel 的排版秩序、Linear 的高效交互。它只是默认主题，不妨碍后续收录其他风格。

- 设计变量：[tokens/refined-light.css](tokens/refined-light.css) / [tokens/refined-light.json](tokens/refined-light.json)
- 参考调研：[docs/research/sources.md](docs/research/sources.md)
- 实操规范：[docs/interactions/patterns.md](docs/interactions/patterns.md)
- 页面组合：[recipes](recipes)
- 无依赖可运行演示：[playground/initial-interaction-lab.html](playground/initial-interaction-lab.html)（打开本地 HTML 即可；需要 AI 浏览器时建议使用本地 HTTP server）
- React/TS 参考实现：[components/reference](components/reference)（9 个示例，尚未生产验收）
- 初始快照说明：[archive/v0.1.0.md](archive/v0.1.0.md)

## 与现有平台的边界

本仓库**完全独立**，不会自动修改 AI WORKFLOW PLATFORM 的业务代码、API、路由、数据库或工作流。新平台版本准备好后，逐项选择、集成、验证，不直接全量复制。

## 仓库结构

```text
frontend-design-assets/
├── AGENTS.md                   # Codex/AI 复用守则
├── docs/                       # 视觉、交互、来源、决策与验收
├── registry/                   # 机器可检索清单与字段说明
├── tokens/                     # 主题语义 Token
├── components/                 # 验证后提升的通用组件
├── interactions/               # 行为规格及模式
├── recipes/                    # 页面组合规范
├── playground/                 # 独立可交互原型
├── templates/                  # 单条素材与研究模板
└── archive/                    # 历史版本与迁移记录
```

## 资产状态定义

`captured`（收录）→ `analyzed`（拆解）→ `prototype`（独立演示）→ `reference-implemented`（参考实现）→ `validated`（经过仓库级测试）→ `production-ready`（目标工程集成验收）。

**勿将“有代码”理解成“可上线”。** 每条资产必须包含来源与许可、依赖与边界、操作状态与验证信息。

## 相关 Notion

- [持续积累的前端设计资产仓库]([private-notion-link-redacted])
- [素材条目数据库]([private-notion-link-redacted])
- [原视觉设计 V1.0]([private-notion-link-redacted])
- [UI 与交互调研 V1.0]([private-notion-link-redacted])

## 使用前注意

原创示例与他人公开设计参考分开；不能把第三方截图、商标和专有实现当作本仓库授权源码。当前仓库尚未选择开放许可证，默认私有。
