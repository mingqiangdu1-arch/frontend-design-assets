# Frontend Design Assets — Living Multi-Style Repository

**跨应用类型、跨视觉风格、持续扩展的前端素材仓库。** 收录原创 React 组件、交互行为、页面模板、独立视觉体系与研究参考。不同应用可以采用不同美术方向；本仓库**没有全局默认主题**，也不意味着所有登记资产均已实现。

**仓库边界：只积累、整理和验证可复用的前端素材。** 包括视觉主题、设计 Token、组件源码、交互模式、页面结构配方、参考 Demo 与检索索引。Demo 仅用于演示/验证素材，CLI 仅用于检索/选型/生成素材交接说明；**不在此开发实际业务产品、不建设页面生成器或应用脚手架、不承担部署上线**。当需要真实页面或产品时，在独立项目仓库中调用本仓库素材。

> **Agent 使用入口：** [Agent 两条快速路径：找素材 / 找方向（DISCOVER）](DISCOVER.md) · [按任务深查素材（CATALOG）](CATALOG.md) · [Agent 工作规则（AGENTS）](AGENTS.md) · [轻量资产交接](docs/assembly/asset-handoff.md)
>
> **仓库现状：** 私有研究/参考实现仓库，尚非统一生产级组件包。未来公开前需完成 [发布准备检查](docs/publication-readiness.md)。

## Agent Skills · 可复用前端技能

技能模块：[**Frontend Agent Skills（15 项：6 自建 + 9 外部引入）**](.agents/skills/README.md) 支持素材精确检索、视觉探索、响应式构图、交互契约、组件迁移与审查，还包含 Anthropic 的视觉实现、Vercel React/Next.js 性能与组合模式，并新增 Tailwind、UI 动效、性能诊断、GSAP、图表和 SVG 图标系统技能。第三方完整规则已按提交固定并保留 [来源及许可信息](.agents/skills/THIRD_PARTY_NOTICES.md)。Codex 在本仓库工作时可从 `.agents/skills/` 发现技能；每项有独立 `SKILL.md` 与实例。**技能是工作方法，不是新的 React 导出、UI 组件，也不会在仓库内构建业务应用**。

## 按目标找到资产

| 我想做…… | 入口 | 能获得什么 |
| --- | --- | --- |
| 选择视觉风格 | [风格索引](registry/styles.json) · [风格对比](docs/styles/README.md) · [选型矩阵](docs/styles/decision-matrix.md) | 14 套独立 `styleId`、语义 Tokens、适用类型与视觉约束 |
| 用选定主题规划页面 | [页面搭建配方](docs/assembly/style-assembly-v028.md) · [CLI](scripts/build-style-brief.mjs) · [Theme Atlas](playground/style-atlas/) | 14 套主题对应 57 个分区设计；真实模板、源文件和验收清单保持关联 |
| 浏览全部主题并排对比 | [主题图谱](playground/style-atlas/README.md) · [Agent 选型](docs/styles/theme-selection-v027.md) | 按场景、构图、材质、交互筛选 14 套主题，任选两套加载真实 Demo |
| 2026 流行主题研究与预览 | [趋势对比](docs/styles/trend-research-2026.md) · [Trend Style Lab](playground/trend-style-lab/README.md) | Liquid Layer、Shape Expressive、Type-led Minimal、Organic Tactile：独立主题与可交互场景，不是 React 库兼容声明 |
| 查找独立 CSS / 原生 JS / Canvas 素材 | [按任务检索](CATALOG.md) · [原件目录](styles/primitives/) · [最近一轮 V0.53](styles/primitives/v053/README.md) | `FX-*` 系列包含可按类/函数提取的原创视觉、动效、控件和程序绘图；必须检查各项交互和适配边界 |
| 查找原创 SVG、图标、纹理和场景图 | [图形原件](graphics/) · [V0.53 图形说明](graphics/v053/README.md) · [素材登记](registry/README.md) | `VG-*` 等独立矢量原件可逐项查源文件；图形示意与可运行交互、真实数据或 3D 引擎不可混同 |
| 回溯版本素材、研究来源和许可 | [历次研究](docs/research/) · [逐版机器索引](registry/README.md) · [变更历史](CHANGELOG.md) | V0.42–V0.53 的原件与研究按版本保留；外部来源默认只供研究，不代表已安装或获复制授权 |
| 查找并复用 React 组件 | [组件登记](registry/components.json) · [组件源码](packages/ui/src/) · [组件文档](packages/ui/README.md) | 真实 TSX/CSS、API、四套显式兼容主题和适配限制 |
| 参考页面结构素材 | [页面模板](registry/page-templates.json) · [组装指南](docs/assembly/README.md) · [独立 Demo](playground/page-blueprints/) | 可复用分区、构图和交互案例；真实页面开发须在外部项目进行 |
| 检索外部专项技术与视觉资源 | [V0.30 专题资源](docs/research/specialized-resources-v030.md) · [结构化资源索引](registry/specialized-resources-v030.json) | 17 个画布/富文本、地图数据、3D 与移动交互来源；只做研究与素材交接，不安装到本库 |
| 参考 3D 材质、数据图层与移动手势设计契约 | [V0.31 专项研究](docs/research/specialized-patterns-v031.md) · [机器索引](registry/specialized-patterns-v031.json) | 15 个原创研究素材，包含交互状态、低性能/无障碍替代和上游证据；未实现或集成 |
| 查看独立状态视觉样张（桌面与移动示意） | [V0.35 八份原创 SVG](styles/specimens/v035/README.md) · [状态索引](registry/state-specimens-v035.json) | 让 Agent 直观看到构图、焦点、选中与可回退状态；是静态研究图，不是整个页面或已实现交互 |
| 创意叙事、空间布局、星图导航与非传统交互 | [V0.34 研究规范](docs/research/experience-artifacts-v034.md) · [任务索引](registry/experience-artifacts-v034.json) · [独立 CSS 原子](styles/primitives/v034/README.md) | 16 个原创研究素材、6 个可选布局/装饰原子；无完整导航代码或页面组装 |
| 字体/纹理、内容协同和特殊效果素材 | [V0.32 研究目录](docs/research/creative-primitives-v032.md) · [检索索引](registry/creative-primitives-v032.json) · [独立 CSS 原子](styles/primitives/v032/README.md) | 18 条研究型资产与 6 个可选、无依赖的 CSS 小素材；不进行页面组装或引入外部媒体 |
| 独立高级交互原型 IV | [Atelier IV](playground/advanced-interactions-v4/README.md) · [交互契约](docs/interactions/advanced-patterns-v018.md) | 将 IP-025/027/029/030 的树形网格、语义标注、分支叙事、精密旋钮升级为可操作参考素材；非业务应用 |
| 参考高级交互 | [交互文档](docs/interactions/) · [高级交互 Lab](playground/advanced-interactions/) | 指针/键盘/触摸/撤销行为设计与独立原型 |
| 拓展艺术表现 | [Creative Directions](registry/creative-directions.json) · [Creative Style Lab](playground/creative-style-lab/) | 面向游戏、活动、阅读和其他类型的创意方向 |
| 建立工作台或数据产品 | [SaaS 专题](docs/saas/README.md) · [工作台配方](recipes/workbench.md) | 操作列表、表单、筛选、布局与状态模型 |
| 按关键词搜索所有资产 | [资产注册表](registry/assets.json) · [检索脚本](scripts/find-assets.mjs) | ID、路径、复用等级、来源、标签与限制 |
| 开展视觉复审 | [设计审查工作流](docs/assembly/design-review-workflows.md) | 任务适配的方案与证据要求（不会自动运行外部 Skill） |

**提示：** `registry/assets.json` 的「组件类资产」不全是已经导出的 React 组件；只有 `registry/components.json.entries` 中的导出才是目前组件包实际提供的公共组件。其余可能只是概念设计、早期单风格示例或候选形态。

## Agent / GitHub-only 最短路径

1. **先读 [DISCOVER.md](DISCOVER.md)** 判断是「找原件」还是「找方向」；仅当需要更细的历史/类型路由时进入 [CATALOG.md](CATALOG.md)。
2. 查看 `stage`、`reuseKind`、`styleIds`、`applicationContexts`、`dependencies`、`path/spec/demo`。
3. 只读取选定候选的源码与规范，返回「可复用什么 / 需要适配什么 / 尚未验证什么」。

可运行 Node 时使用：

```sh
node scripts/find-assets.mjs --intent="可编辑表格" --type=component --goal=implementation --json
node scripts/find-assets.mjs --intent="拖拽" --type=interaction --goal=behavior --json
node scripts/find-assets.mjs --style=precision-dark --goal=implementation --json
node scripts/compose-page.mjs --list
node scripts/select-style.mjs --task="我需要一个液态玻璃导航" --format=markdown
```

搜索是**可复现的词项匹配**，不是语义检索，也不会直接生成应用。检索为空时可改用同义词、准确 ID 或本仓库导航，不应据此断言不存在该类设计。

## 快速开发与验证

```sh
npm install
npm run test:registry
npm run test:unit
npm run check:components
npm run dev:components
```

详见 [组件运行说明](packages/ui/README.md)、[质量检查](docs/quality/README.md) 和 [Playground 目录](playground/)；不同 Demo 有各自运行方式，不需要为了一次素材调研启动所有项目。

## 仓库边界与成熟度

- `registry/`：机器可检索的资产、组件、视觉和页面索引；`packages/ui/`：多风格 React 参考实现。
- `styles/`：独立风格 Profile 和 Tokens；`recipes/`：页面/流程组合方案；`playground/`：独立研究 Demo；`docs/`：设计与质量规范。
- `components/reference/`、`tokens/`：早期单风格研究参考；`archive/`：允许公开的历史快照（不是私人资料存储区）。
- 生命周期：`captured` → `analyzed` → `prototype` → `reference-implemented` → `validated` → `production-ready`（可 `deprecated`）。**当前参考实现不代表生产就绪**。
- 第三方截图、字体、作品、商业 UI 和外部设计 Skill 不因被研究引用就获得复制许可；请保留来源与授权信息。

完整变更历史在 [CHANGELOG.md](CHANGELOG.md)，维护规则在 [docs/governance.md](docs/governance.md)。**新增版本说明只追加到 CHANGELOG 和对应专题文档，不再把每轮版本记录堆在本 README。** 私人研究资料持续由 Notion 管理，未来公开发布时不默认公开其深链接。
