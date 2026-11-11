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
| 专业画布、富文本、地图、WebGL、触摸手势 / advanced editor, geospatial, 3D, mobile gesture | `REF-042`–`REF-058`、`registry/specialized-resources-v030.json`、`docs/research/specialized-resources-v030.md` | 17 条外部来源研究档案，按能力缺口和许可证检索；**非已安装依赖或现成 React 导出** |
| 3D 材质、数据可视化语义、移动手势契约 / material, chart, gesture | `REF-059..068`、`IP-031..035`、`registry/specialized-patterns-v031.json`、`docs/research/specialized-patterns-v031.md` | 15 个原创研究素材：状态、结构、降级、来源及风险；不提供可直接运行的组件或业务页面 |
| 文档协同、富文本块编辑、字形和纹理、光谱遮罩 / collaborative editor, font, texture, creative effects | `IP-036..041`、`REF-069..080`、`registry/creative-primitives-v032.json`、`docs/research/creative-primitives-v032.md` | 18 份研究合同：操作状态、字体/贴图授权与视觉降级；6 个原创、无依赖 CSS 小原子，非编辑器组件或完整页面 |
| 双线叙事、页边注、空间构图、星图导航、环形操作、探索式交互 / editorial story, radial nav, spatial index | `REF-081..088`、`IP-042..049`、`registry/experience-artifacts-v034.json`、`docs/research/experience-artifacts-v034.md` | 16 份任务型原创研究素材；另有 6 个独立 CSS 布局/装饰原子，非可运行导航或整页实现 |
| 视觉状态样张、桌面/移动构图对比、焦点高亮参考 / static state SVG, desktop mobile | `registry/state-specimens-v035.json`、`styles/specimens/v035/`、`docs/research/state-specimens-v035.md` | 8 份原创独立 SVG，按已有 V0.34 资产 ID 查找；是示意图，不是实际响应式截图或可操作导航 |
| 新增原生导航、按钮、HUD、原生选择与事件轨道 / segmented radio, compass nav, reticle, telemetry, disclosure, filter | `FX-015..026`、`styles/primitives/v044/interface-atoms.css`、`playground/interface-atoms-v044/` | 12 个原创可逐类提取的原生 CSS/HTML UI 素材，包含真实的 radio/checkbox/details，静态 HUD/遥测用语义标记；非整页或 React 公共导出 |
| 雷达、电路、游戏勋章、波形、罗盘与立体方块独立矢量 / radar, PCB, pixel medal, waveform, compass, isometric cubes | `VG-007..012`、`graphics/v044/`、`playground/vector-studies-v044/` | 6 个独立可编辑的原创 SVG，可直接作为图形素材引用；波形和雷达均为静态示意，不含真实数据接口 |
| 具体上游动效组件源码 / island, shift-card, bento, marquee, morph, shimmer, scramble, variable font | `REF-124..131`、`registry/material-expansion-v043.json`、`docs/research/material-expansion-v043.md` | 8 个固定 Git Commit 的**具体 TSX 文件 + 文档路径**，非仅项目首页；是研究链接，不代表已安装/导出 React 组件 |
| 纯 CSS 创意组件与图形外观 / topology, arch, fold, ribbon, caption, switch, underline, isometric | `FX-007..014`、`styles/primitives/v043/creative-components.css`、`playground/creative-components-v043/` | 8 个原创真实 CSS 类，含可操作的 native checkbox、focus/non-hover 提示与减少动态降级；可按类独立移植 |
| 独立 SVG 图形 / wireframe dome, seal, orbit, modular wave, paper cut, constellation | `VG-001..006`、`graphics/v043/`、`playground/vector-studies-v043/` | 6 个原创矢量文件，可直接作为独立媒体引用或修改几何；非图片转载、字体资源或 React 导出 |
| 多样化动效/组件素材源、数据可视化、科幻视觉、移动抽屉 / creative UI sources, motion, charts, sci-fi | `REF-111..123`、`registry/material-expansion-v042.json`、`docs/research/material-expansion-v042.md` | 新增 13 个**不同来源**的 GitHub Commit/许可证/典型用途档案；从动画组件和趣味微交互到 visx/nivo/Unovis、Theatre.js、Vaul；外部来源均研究型，未安装/复制其组件代码 |
| 纯 CSS 视觉素材、条纹玻璃、印章、票券、光谱边框、星轨、杂志边注 / source-level visual atoms | `FX-001..006`、`styles/primitives/v042/material-effects.css`、`playground/material-effects-v042/index.html` | 新增 6 个原创、可逐类引用的 CSS 源码与独立样张；适配指定主题才使用；无外部图片字体、全局默认主题或 React 公共导出 |
| 官方 shadcn Registry 条目元数据兼容、依赖图、内部快照格式迁移 / registry-item, metadata-only, dependencies | `IP-066..068`、`registry/registry-metadata-v041.json`、`playground/registry-metadata-v041/` | 三个已固定官方提交的真实元数据条目（button / alert-dialog / login-04），原创只读解析/依赖图/内部格式迁移；不复制或运行上游代码，不安装组件 |
| Registry 数据映射、有限嵌套 Slot、显式命令预览 / registry metadata, nested slots, preview-to-confirm | `IP-063..065`、`registry/registry-slots-v040.json`、`playground/registry-slots-v040/` | 本地原创 Fixture 白名单→现有 Block Schema；Section/Stack 类型容量/深度；Revision/Snapshot 预览确认。无第三方运行时、网站生成或真实授权服务 |
| 可视化区块编辑、拖拽排序、属性检查器、选择与撤销 / visual block editor | `IP-060..062`、`registry/visual-editor-v039.json`、`playground/visual-editor-v039/` | 原创扁平区块 Schema、不可变排序、属性白名单与本地历史模型，包含可操作 DOM 与 Node/Chromium 测试；不是完整网站编辑器、React 导出或远端保存服务 |
| 可执行 Agent 交互原型：工具进度、Diff 审批、澄清草稿 / Agent state specimens | `IP-057..059`、`registry/agent-interactions-v038.json`、`playground/agent-interactions-v038/` | 三个原创 ESM 模型、独立 DOM 演示及 Node/Chromium 测试；prototype / adapt-required，不是 React 导出、AI 后端或实际文件写入 |
| 具体组件/Block 研究、Agent 工具卡与聊天输入 / shadcn blocks, Agent Elements, 21st source dossiers | `REF-101..110`、`IP-054..056`、`registry/component-dossiers-v037.json`、`docs/research/component-dossiers-v037.md` | 10 项上游文件/依赖可追踪的深度资料，3 个原创 Agent 状态合同；21st 社区候选保留未审查状态，**无新增运行组件** |
| 组件社区/Block 来源、shadcn Registry、Agent 编辑与免登录复现 / community source, editor, MCP, remix | `REF-089..100`、`IP-050..053`、`registry/community-sources-v036.json`、`docs/research/community-sources-v036.md` | 12 个可信来源研究入口 + 4 个原创页面/Agent/游客协议研究；只标注素材价值、访问方式、许可边界与差异，不表示已采集第三方代码或建立网站 |
| 去 AI 模板化、页面设计审查、unslop、hallmark | `docs/assembly/design-review-workflows.md`、`docs/research/unslop-hallmark.md` | 外部 Skill 为研究/可选工具，未作为本仓库依赖自动安装 |

上表的 ID 是**检索起点**而非默认推荐；只有打开注册条目并核对情境与成熟度，才能决定是否采用。

## 专业资源检索（V0.30，只有研究来源）

- 需要无限画布、文档编辑或协作时，先查 `REF-042..046`（编辑器和画布）；地图、复杂图表、大型数据列表查 `REF-047..050`；3D 和 WebGL 查 `REF-051..054`；移动端手势、触摸动效与可访问拖拽查 `REF-055..058`。
- 对每项按 `registry/specialized-resources-v030.json` 的 `gapVsExisting`、`focus`、`limitations`、`license` 和 `applicationContexts` 评估；若原仓库已有行为参考，优先返回两者差异，不自动替换或拷贝第三方库。
- 以上均属于 **analyzed / research-only**，不能当作组件包公共导出、已兼容 React 主题、获许可的第三方素材或通过实测的集成成果。

## V0.31 专项素材快速检索（研究档案）

- **实体材质与后处理**：`REF-059..063`（清漆、透射玻璃、虹彩、哑光实体、局部光晕）；不要因颜色近似就当成可替换的 CSS 主题。
- **专业数据表达**：`REF-064..068`（多图联动、密度聚合、溯源注释、地图图层语义、虚拟化定位）；应同时核查原始数值、来源、键盘访问与表格替代。
- **移动交互行为**：`IP-031..035`（抽屉滚动仲裁、双指缩放、长按排序、侧滑撤销、有界回弹）；状态流与取消/降级要求见 `registry/specialized-patterns-v031.json`。
- **重要边界**：以上均为 `analyzed` 的原创设计研究，非运行代码或经过物理设备验证的交互；要实现请在独立项目中确定框架、数据、许可与测试。

## V0.32 编辑协同与视觉原材料选材

- **编辑器和协作**：`IP-036..041` 提供指令弹层、并发评论锚点、临时在线状态、安全粘贴、撤销边界、块重排；与已有 Lexical / Tiptap / Yjs 外部参考 `REF-043..045` 分开，不误认为已集成编辑器。
- **字体 / 贴图 / 纹理**：`REF-069..074` 提供 variable font、CJK-Latin fallback、按 family 许可、自托管边界、Poly Haven/ambientCG 来源、程序纹理。字体/媒体二进制一律未引入。
- **特殊视觉效果**：`REF-075..080` 提供多层遮罩、SVG 扰动、滚动叙事、View Transition、光谱局部照明、动态文字；只有部分包含 [6 个独立 CSS 样例](styles/primitives/v032/README.md)。
- 检索顺序：`registry/creative-primitives-v032.json` 查 `group`, `aliases`, `failureModes`, `accessibleFallback`, `relatedAssets` 和 `source` → 单个研究条目 → 可选 CSS 原子。所有新增 ID 均为 `analyzed`，不允许声称手机/读屏/浏览器或生产验证。

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

## V0.35：独立静态视觉状态样张

- 对 `REF-081`、`REF-082`、`REF-085`、`IP-042`、`IP-043`、`IP-044`、`IP-046`、`IP-047`，可通过 `asset.visualSpecimen` 或 [V0.35 状态索引](registry/state-specimens-v035.json) 查看并列的桌面/移动 SVG 示意。静态 SVG 仅说明构图与示意选中状态，不等于实际触控/焦点/响应式实现。
- `scripts/find-assets.mjs` 的 `handoffResolved.relatedFiles` 会包含可用的 `visualSpecimen`；此字段不能改变 `research-only` 或 `analyzed` 的成熟度。要用可运行组件仍按 `registry/components.json` 核对。
- 原创静态图源码在 [单项 SVG 目录](styles/specimens/v035/README.md)。不要把 SVG 的画面当成浏览器截图、性能证据或符合可访问性规范的成品。

## V0.34：创意叙事与空间交互素材检索

- **视觉叙事**：`REF-081..084`（双线并行、证据页边注、胶片章节、剖面章节）；区别既有滚动叙事或分支剧情。
- **空间构图**：`REF-085..088`（非对称 subgrid、层叠深度、留白轴线、抽象星图）；不宣称真实地理坐标或通用主题兼容。
- **创意导航**：`IP-042..045`（星图索引、环形操作罗盘、章节返回轨、锚点上下文导航）；保留普通文字目录、URL、键盘和焦点路径。
- **非传统交互**：`IP-046..049`（逐帧探索、语义透镜、可逆分组、克制视差）；这些只是 `research-only`，不能被当作已实现 JS 交互。
- 详情按 [V0.34 结构化目录](registry/experience-artifacts-v034.json) 的 `distinctFrom`、`stateContract`、`accessibleFallback`、`failureModes` 检索。可按需取 [6 个原创 CSS 原子](styles/primitives/v034/README.md)，其类名只改变外观/布局，不带导航事件。

## V0.33：研究交互与可运行源码的检索边界

- `IP-031..041` 全部是**研究契约**，明确标记 `handoff.mode: research-only`；根据 `spec` 查状态和风险，不能按 `behavior-pattern` 的通用 `adapt-required` 等级假定有源码。
- 有独立原型源码的 `IP-030` 仍为 `adapt-required`；拥有实际 React 源码的 `UI-058` 仍为 `copyable-source`。检索时优先在 `handoffResolved.mode` 和实际 `path` 层面判别，不按 ID 前缀想当然推断。
- 新增 [研究素材交接等级验收说明](docs/research/retrieval-trust-v033.md)，以及 `tests/find-assets.test.mjs` 的精确 ID 回归测试；这不是现场实施/设备验证。

## 冲突与保守规则

- `copyable-source` = 可查看并适配的源代码，**不是**生产就绪或已发布 npm 包。
- `adapt-required` = 行为规范或组合配方，须在目标项目实现和测试。
- `research-only` = 研究素材、第三方参考或历史快照，不能据此复制未经许可的实现/图片。
- 一套独立风格的 CSS 不能自动套用到另一风格；无 `styleIds` 也不能推导出全兼容。
- 视觉截图、受控浏览器冒烟、人工批准、读屏测试和真实产品集成是不同证据层级。

相关规范：[轻量交付](docs/assembly/asset-handoff.md) · [长效维护](docs/governance.md) · [公开发布前审查](docs/publication-readiness.md) · [历史版本](CHANGELOG.md)。
