# Frontend Design Assets — Living Multi-Style Repository

一个**跨应用类型、跨视觉风格、持续增量成长**的前端设计资产仓库。这里不是某个业务平台的专属 UI Kit，也没有一套强制所有项目使用的默认主题。

## 三个原则

1. **一个仓库，多套独立视觉体系。** SaaS、消费应用、游戏工具、内容创作、活动页、移动端等，可拥有完全不同的配色、排版、布局密度、动效与组件外观。只有明确选中某套 `styleId` 后，才加载其 Tokens / CSS。
2. **复用机制，不强制复用外观。** 快捷菜单、拖拽、Undo、加载和预览等交互可以跨场景研究，但复用时必须重新评估输入方式、无障碍、视觉语义、设备特性和用户预期。
3. **收集不等于代码资产。** Notion 保留素材、来源和设计决策；GitHub 管理代码、版本、实验与可检索清单。收录、拆解、原型、已验证、生产集成是不同阶段。

## 从这里开始

| 目标 | 路径 |
| --- | --- |
| 了解跨风格架构与组装顺序 | [docs/multi-context-architecture.md](docs/multi-context-architecture.md) |
| 查找全部资产及兼容标注 | [registry/assets.json](registry/assets.json) |
| 选择某一套完整视觉风格 | [registry/styles.json](registry/styles.json) |
| 查看现有浅色 SaaS 风格 | [styles/refined-light-saas/README.md](styles/refined-light-saas/README.md) |
| 按应用需求组合设计方案 | [applications/README.md](applications/README.md) |
| 交互行为与验收参考 | [docs/interactions/patterns.md](docs/interactions/patterns.md) |
| 研究来源与历史记录 | [docs/research/sources.md](docs/research/sources.md) |
| 查看初始交互 Demo | [playground/initial-interaction-lab.html](playground/initial-interaction-lab.html) |
| 给 Codex/Agent 复用的约束 | [AGENTS.md](AGENTS.md) |

## 组织方式

```text
frontend-design-assets/
├── registry/           # 资产、风格与兼容元信息
├── styles/             # 独立视觉风格系列；每套独立 Token / 规范 / 效果
├── interactions/       # 可跨场景分析的交互原理与原型（成熟后放实现）
├── components/         # 具体实现须声明视觉依赖和技术栈
├── applications/       # 按应用类型与约束进行组合的 Profile（不是业务代码）
├── recipes/            # 页面组合参考，不等于可直接发布的页面
├── playground/         # 独立交互 Demo，不影响其他项目
├── tokens/             # 历史/已引入 Token 文件，必须限定作用域
├── docs/               # 比较、研究、无障碍与治理规则
├── templates/          # 新素材/新应用 Profile 录入模板
└── archive/            # 旧版快照与迁移记录
```

## 当前实际资产（不代表未来默认）

**Refined Light SaaS** 是首个**示例设计系列**（Attio × Vercel）。[已有设计规范](docs/visual/refined-light.md)、[Token](tokens/refined-light.css)、[React/TS 示例](components/reference/README.md)及 [Interaction Lab](playground/initial-interaction-lab.html) 属于该系列或其历史 Demo。

当前只有这一套已整理的视觉风格；**不要因仓库目前只有一套而默认所有新应用必须使用它**。新项目先选择视觉方向，再组合交互。未来加入新视觉方向时新增独立 Style Profile，不能直接覆盖上一套。

## 资产编号及成熟度

`REF-xxx`、`DT-xxx`、`UI-xxx`、`IP-xxx`、`AN-xxx`、`PR-xxx`、`KIT-xxx` 编号持续稳定。阶段为 `captured → analyzed → prototype → reference-implemented → validated → production-ready`（另有 `deprecated`）。

目前独立 Demo 和 React 参考实现没有在任一实际应用中通过生产集成测试，不能宣称 production-ready。

## 维护与关联

- [Notion 素材数据库]([private-notion-link-redacted])
- [Notion 总仓库]([private-notion-link-redacted])
- [贡献与治理](docs/governance.md)、[更新日志](CHANGELOG.md)

本仓库为独立资源库，**不会自动修改 AI WORKFLOW PLATFORM 或任何其他应用**。当前私有，不含第三方产品的专有源码、未授权视觉素材或字体文件。
