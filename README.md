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
| 选择某一套完整视觉风格 | [registry/styles.json](registry/styles.json) / [Bold Grid 视觉样例](playground/bold-grid/index.html) |
| **选择完整页面模板并生成组装清单** | [Page Blueprints V0.8](playground/page-blueprints/README.md) / [组装 CLI](docs/assembly/README.md) / [机器模板索引](registry/page-templates.json) |
| 查看 SaaS 专题研究与原型 | [SaaS 总览](docs/saas/README.md) / [列表实验 V0.2](playground/saas-patterns/index.html) / [表单编辑与筛选 V0.3](playground/saas-editing/index.html) |
| 查看全部独立视觉风格 | [风格对比目录](docs/styles/README.md) / [选型矩阵](docs/styles/decision-matrix.md) / [Style Explorer（早期三主题）](playground/style-explorer/index.html) |
| **实验艺术风格与模型创意探索** | [Creative Style Lab（四场景）](playground/creative-style-lab/README.md) / [创意方向数据库](registry/creative-directions.json) / [模型生成指南](docs/styles/creative-art-direction.md) |
| 查看现有浅色 SaaS 风格 | [styles/refined-light-saas/README.md](styles/refined-light-saas/README.md) |
| 按应用需求组合设计方案 | [applications/README.md](applications/README.md) |
| 交互行为与验收参考 | [现有交互指南](docs/interactions/patterns.md) / [V0.7 Undo · Wizard · Reorder · Split](docs/interactions/advanced-patterns.md) / [交互实验室](playground/interaction-lab/index.html) |
| 研究来源与历史记录 | [docs/research/sources.md](docs/research/sources.md) / [动效与 View Transitions](docs/motion/motion-system.md) |
| 查看初始交互 Demo | [playground/initial-interaction-lab.html](playground/initial-interaction-lab.html) |
| 通过条件检索复用资产 | [find-assets CLI](docs/quality/README.md) · `node scripts/find-assets.mjs --style=precision-dark --intent=command` |
| 校验颜色与浏览器交互 | [质量基线 V0.5](docs/quality/README.md) |
| **复用 React 组件** | [组件库 V0.6](packages/ui/README.md) / [组件 API 清单](registry/components.json) / [可交互展厅](playground/component-gallery/README.md) |
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

## 初期风格历史（不代表完整现状）

**Refined Light SaaS** 是首个**示例设计系列**（Attio × Vercel），并非全仓库默认；V0.4 另新增三套差异化风格。[已有设计规范](docs/visual/refined-light.md)、[Token](tokens/refined-light.css)、[React/TS 示例](components/reference/README.md)及 [Interaction Lab](playground/initial-interaction-lab.html) 属于该系列或其历史 Demo。

该小节记录最早建立的三套独立系列。**当前实际共有 10 套独立风格**，最新总量与入口请查看 [registry/styles.json](registry/styles.json) 和 [Creative Style Lab](playground/creative-style-lab/README.md)。**仓库仍不设全局默认视觉主题**。

## 资产编号及成熟度

`REF-xxx`、`DT-xxx`、`UI-xxx`、`IP-xxx`、`AN-xxx`、`PR-xxx`、`KIT-xxx` 编号持续稳定。阶段为 `captured → analyzed → prototype → reference-implemented → validated → production-ready`（另有 `deprecated`）。

目前独立 Demo 和 React 参考实现没有在任一实际应用中通过生产集成测试，不能宣称 production-ready。

## 维护与关联

- [Notion 素材数据库]([private-notion-link-redacted])
- [Notion 总仓库]([private-notion-link-redacted])
- [贡献与治理](docs/governance.md)、[更新日志](CHANGELOG.md)

本仓库为独立资源库，**不会自动修改 AI WORKFLOW PLATFORM 或任何其他应用**。当前私有，不含第三方产品的专有源码、未授权视觉素材或字体文件。V0.6 新增独立 React/TypeScript 组件包与四风格互动展厅，仍不作为生产级已认证发行物。

## V0.7 · 跨风格探索和行为实验

[Notion 阶段报告]([private-notion-link-redacted]) · [可检索素材数据库]([private-notion-link-redacted])

新增 [Neo Brutalist / Bold Grid](styles/neo-brutalist/README.md) 视觉系列、[原创创意落地页实验](playground/bold-grid/README.md)、[交互状态实验室](playground/interaction-lab/README.md)、[动效选择规范](docs/motion/motion-system.md) 和两套独立[页面组合配方](recipes/expressive-campaign.md)。**现有四套主题的 React 组件库仍然只声明兼容原有四套；第五套风格尚未接入 React 组件包。**

## V0.8 · 页面模板与可复现组装清单

[Notion V0.8 总结]([private-notion-link-redacted]) · [页面配方数据库]([private-notion-link-redacted])

新增四套不同应用情境的 [Page Blueprints](playground/page-blueprints/README.md)（SaaS 运营、编辑阅读、移动习惯、创意营销），其中编辑阅读和移动习惯为本阶段新实现互动原型。通过 `node scripts/compose-page.mjs --list` 找到模板，并用 `--template=TPL-002 --format=markdown` 生成可交给 Codex 的**页面实施清单**。这是实施指导，不是自动生成的 React/生产站点代码。必须显式选择风格或模板，且不能把风格冲突的素材视为可直接组合。

## V0.9 · React 真实组装 + Precision Dark 专业工作台

[Notion V0.9 阶段报告]([private-notion-link-redacted]) · [素材数据库]([private-notion-link-redacted])

新增 [Orbit Workbench](playground/precision-workbench/README.md) 作为 **真正引用 `packages/ui` 组件库** 的 React/TypeScript 完整页面示例，并纳入 [5 个页面模板](playground/page-blueprints/README.md)。与历史四个独立 HTML/JS 原型不同，它需要 Vite 启动：`npm run dev:workbench`（端口 5175）。浏览器 QA 会上传 390 / 768 / 1440 px 截图用于人工审阅；**截图采集不等于视觉基准批准**。

## V0.10 · 可视化检索与交互质量改造

[Notion V0.10 阶段报告]([private-notion-link-redacted]) · [素材数据库]([private-notion-link-redacted])

- **[Asset Explorer](playground/asset-explorer/README.md)**：直接浏览真实资产索引，按风格、类型、成熟度、应用场景与关键词筛选，查看依赖/来源/Notion 链接，并导出 Markdown 参考清单交给 Codex。混合风格会显式提示**不代表代码可直接组合**。
- 跨平台静态预览：仓库根目录运行 `npm run dev:catalog`，浏览器打开 `http://127.0.0.1:8009/playground/asset-explorer/`，无需 Python 或浏览器 `file://`。
- Precision Dark React 工作台优化：修复不准确的命令检索测试；增加窄屏详情抽屉键盘焦点管理、Escape 关闭和主界面不可交互处理。
- 浏览器自动回归截取 390 / 768 / 1440 px 页面截图，供后续人工验收；**不是已经批准的视觉回归基线**。

## V0.11 · 新增第六套独立风格 Commerce Atelier

[Notion V0.11 研究与交付报告]([private-notion-link-redacted]) · [可检索素材数据库]([private-notion-link-redacted])

经 Baymard/Shopify 与 Apple/Figma 等 2026 风格与 UX 资料对比，现有五套视觉语言中明确缺少“以商品媒体、价格、筛选与规格为核心”的消费者购物场景。因此只新增 **[Commerce Atelier](styles/commerce-atelier/README.md)**，附带 [独立商品目录交互页](playground/commerce-atelier/README.md)、[IP-015 多选筛选与规格规范](docs/interactions/commerce-facets.md) 和 [PR-010 页面配方](recipes/product-first-commerce.md)。其余趋势归入可选动效/组件模式，不盲目扩增风格。React 组件库仍只兼容其原有四套主题。

## V0.12 · 组件状态矩阵、视觉证据与第二套 React 整页

[Notion V0.12 阶段报告]([private-notion-link-redacted]) · [素材数据库]([private-notion-link-redacted])

- [State Matrix](registry/component-states.json) / [React 互动展厅](playground/component-gallery/README.md)：在 4 套当前兼容主题中展示 12/18 React 组件的选定状态，明确列出剩余 6 项未覆盖；不宣称全面无障碍/生产认证。
- [视觉验收策略](docs/quality/visual-review.md)：浏览器 CI 采集 390/768/1440px 截图，使用 SHA-256 清单区分「截取证据」与「人工批准基线」；默认 **未批准**，验证器不通过无证据的签署。
- [TPL-007 Folio Editorial React](playground/editorial-review/README.md)：继 Precision Dark 后的第二套真正引用 `packages/ui` 的整页 React 实现，以 **Editorial Warm** 内容审阅取代通用 SaaS 工作台外壳。
- 启动：`npm run dev:components`（`?view=matrix`）、`npm run dev:editorial-react`（5176）；真实产品 API、权限、人工视觉/读屏验收仍需单独完成。

## V0.13 research extension · Unslop × Hallmark

[Notion 对比研究与接入边界]([private-notion-link-redacted]) · [素材数据库]([private-notion-link-redacted])

新增两项**外部设计 Skill 研究参考**：[heydamir/unslop](https://github.com/heydamir/unslop)（已有界面去模板化审阅）和 [Nutlope/hallmark](https://github.com/Nutlope/hallmark)（多主题构图和独立质量检查）。[比较与许可边界](docs/research/unslop-hallmark.md) · [本仓库原创、可选的审阅配方](recipes/contextual-design-review.md)。

- 不将 Hallmark 的全部审美禁令设置为所有风格的全局强制规则。像素 HUD、艺术拼贴、科幻辉光需要任务与风格相关的判断。
- 本仓库仍是 **10 套独立风格、7 套完整页面模板**；新增外部 Skill 参考和配方不增加兼容主题，也不安装任何第三方工具。
- 在受控工作区先记下目标页面功能、截图、类型与布局约束，再按需运行外部 Skill。所有修改须经过自己的单元/浏览器/人工视觉与版权验收。
