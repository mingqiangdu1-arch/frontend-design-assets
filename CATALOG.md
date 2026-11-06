# Agent 检索导航 · Task-first catalog

**目的**：让访问本仓库的 Agent 根据产品任务找到最小、正确的前端素材集合，而不是从文件名猜测，也不必先通读所有历史版本。最新条目数量与状态，以 `registry/*.json` 为准，不要把本页当作同步的计数器。

## 检索顺序

1. **判断目标**：视觉方向（visual） / 可执行 React 组件（implementation） / 交互行为（behavior） / 页面结构（composition） / 设计审查（review）。
2. **提炼情境**：用户任务、应用类型、桌面/移动、技术栈、现有视觉语言、可接受依赖。**不要默认 SaaS 风格**。
3. **从本页选择入口**，优先检索精确的 `styleId`、`UI-xxx`、`IP-xxx` 或 `TPL-xxx`；再查 `registry/assets.json` 的 `tags`、`applicationContexts`、`aliases`。
4. **核查复用边界**：`registry/assets.json.reusePolicies`、`stage`、`handoff`、`styleIds`、`dependencies`，并针对 React 组件查 `registry/components.json`。研究素材≠实现，示例页面≠可直接移植。
5. **只加载匹配文件**：源代码 + 对应说明 + 选定风格 Tokens；不必读整个 `playground/` 或复制全部组件。
6. **返回证据**：输出候选 ID、路径、选中原因、技术边界、尚未验证内容与替代方案。

## 任务到入口

| 典型任务（中英关键词） | 优先入口 | 核心说明 |
| --- | --- | --- |
| 风格选型、视觉体系、art direction、theme | `registry/styles.json`、`docs/styles/decision-matrix.md`、`registry/creative-directions.json` | 14 套独立风格；React 包仍仅支持明确列出的原有 4 套 |
| 已选主题构建页面、风格复现、页面搭建简报 / theme-to-page | `PR-018`、`registry/style-assembly.json`、`scripts/build-style-brief.mjs`、`docs/assembly/style-assembly-v028.md` | 14 套主题 → 57 个页面结构分区，来源真实，模板显式绑定；输出 Markdown/JSON 并声明移植风险 |
| 14 套主题、视觉对比、场景选型、theme atlas / compare styles | `playground/style-atlas/README.md`、`registry/style-facets.json`、`scripts/select-style.mjs` | 原创抽象缩略图 + 真实 Demo 双列对比；CLI 基于显式任务和维度证据匹配，无默认风格和审美分 |
| 当前流行 UI 主题、2026 design trends、glass、expressive、organic、typography | `docs/styles/trend-research-2026.md`、`registry/styles.json`、`playground/trend-style-lab/README.md`、`DT-011`–`DT-014` | 四套原创独立 HTML/CSS 主题；依据任务选择，不等于现有 React 主题兼容 |
| 管理后台、运营台、SaaS workspace、admin | `docs/saas/README.md`、`registry/page-templates.json`、`recipes/saas-operational-list.md` | 页面研究与可执行组件需分别验证 |
| 可复用 React 组件、button/form/dialog、UI library | `registry/components.json`、`packages/ui/README.md`、`packages/ui/src/` | 按 `exportName` 定位真实源码，需显式选择兼容主题 |
| 表格、筛选、看板、编辑、data table / filters | `UI-033`、`UI-052`、`UI-053`、`UI-056`、`UI-059`，`packages/ui/src/data-ops.tsx`、`editors.tsx` | 数据状态、校验、权限和持久化由宿主应用负责 |
| 视觉前后比较、标签、评分、comparison / review / rating | `UI-060`、`UI-061`、`UI-062`、`packages/ui/src/cross-context.tsx`、`recipes/compare-annotate-feedback.md` | 可交互 React 控件和跨场景组合配方；真实媒体授权、评审保存与后端审核需宿主实现 |
| 工作流、步骤表单、节点编辑、flow editor | `UI-047`、`UI-058`、`packages/ui/src/workflows.tsx`、`editors.tsx` | 交互参考，不是服务端流程引擎 |
| 页面结构、整页模板、layout、blueprint | `registry/page-templates.json`、`playground/page-blueprints/README.md`、`docs/assembly/README.md` | 模板 `implementation` 字段决定是静态实验还是 React |
| 创意营销、portfolio、campaign、editorial | `styles/neo-brutalist/`、`styles/paper-rebellion/`、`registry/creative-directions.json` | 不强行使用标准 SaaS 卡片布局 |
| 移动端、习惯养成、gamification、mobile | `TPL-003`、`styles/playful-pop/`、`docs/styles/README.md` | 检查 touch、窄屏与 reduced motion |
| 电商商品页、product catalog、commerce | `TPL-006`、`styles/commerce-atelier/`、`recipes/product-first-commerce.md` | 以商品、规格、价格和筛选为核心 |
| 知识库、编辑、文档阅读、knowledge base | `TPL-002`、`TPL-007`、`styles/editorial-warm/` | `TPL-002` 是独立静态示例；`TPL-007` 是 React 示例 |
| 层级树形网格、来源标注、分支叙事、精密旋钮 / treegrid, annotation, story, rotary | `IP-025`、`IP-027`、`IP-029`、`IP-030`、`playground/advanced-interactions-v4/README.md` | 四个原生 JS 状态模型与独立可运行交互素材；不新增 React 公共导出，不接后端 |
| 高级交互、drag/drop、时间线、scroll story | `docs/interactions/`、`IP-021`–`IP-024`、`playground/advanced-interactions-v2/`、`-v3/` | 复用交互契约，不复制演示页的固定外观 |
| 去 AI 模板化、页面设计审查、unslop、hallmark | `docs/assembly/design-review-workflows.md`、`docs/research/unslop-hallmark.md` | 外部 Skill 为研究/可选工具，未作为本仓库依赖自动安装 |

上表的 ID 是**检索起点**而非默认推荐；只有打开注册条目并核对情境与成熟度，才能决定是否采用。

## 无需运行工具的 GitHub-only 检索

- **入口最少原则**：先读本页 → `registry/components.json` 或 `registry/assets.json` 中的匹配条目 → 对应 `path/spec/demo`。
- **只看代码**：`packages/ui/src/index.tsx`（公共导出）与注册表 `source`；`components/reference/` 是历史单风格参考，与目前多风格包不同。
- **只看视觉**：`registry/styles.json` → `styles/<styleId>/README.md` → 对应 Tokens / Demo。
- **只看交互**：优先读 `docs/interactions/` 的行为规范，再决定是否进入 `playground/`。
- **找不到精确匹配**：返回近似候选及不适用原因，必要时标记「需要新设计」；不要宣称已有生产级现成组件。

## 可以运行 Node 时

```sh
node scripts/find-assets.mjs --intent="拖拽" --type=interaction --goal=behavior --limit=10 --json
node scripts/find-assets.mjs --intent="我需要一个可编辑表格" --type=component --stage=reference-implemented --goal=implementation --reuse=copyable-source --json
node scripts/find-assets.mjs --style=precision-dark --goal=implementation --json
node scripts/compose-page.mjs --list
node scripts/select-style.mjs --context=consumer-mobile --format=markdown
node scripts/select-style.mjs --compare=editorial-warm,liquid-layer --format=markdown
node scripts/plan-design-composition.mjs --context=knowledge-base --stack=react --format=markdown
```

注意：检索 CLI 支持 `--type=component|interaction|page-template|...` 和 `--stage=reference-implemented|prototype|...`，并能识别**已登记中文别名出现在较长句子内**的情况，但仍然是基于名称/标签/别名的**词项匹配**，不是语义搜索。中英文同义词覆盖不完整时，可以先用本页关键词路由，再查精确 ID；没有匹配不代表资产不存在。CLI 是选材/规划工具，**不会构建或修改目标项目**。

## 冲突与保守规则

- `copyable-source` = 可查看并适配的源代码，**不是**生产就绪或已发布 npm 包。
- `adapt-required` = 行为规范或组合配方，须在目标项目实现和测试。
- `research-only` = 研究素材、第三方参考或历史快照，不能据此复制未经许可的实现/图片。
- 一套独立风格的 CSS 不能自动套用到另一风格；无 `styleIds` 也不能推导出全兼容。
- 视觉截图、受控浏览器冒烟、人工批准、读屏测试和真实产品集成是不同证据层级。

相关规范：[轻量交付](docs/assembly/asset-handoff.md) · [长效维护](docs/governance.md) · [公开发布前审查](docs/publication-readiness.md) · [历史版本](CHANGELOG.md)。
