# V0.36 · 社区组件来源、编辑器与 Agent 资产协议研究（2026-11-11）

> 本轮 **仅拓展素材仓库的可信数据源与原创设计契约**。不安装第三方 UI、不同步市场作品、不拉图片/字体、不登录或抓取受限内容、不开发页面搭建网站。所有新增项为 `analyzed / research-only`。

- [结构化来源与模式](../../registry/community-sources-v036.json) · [统一资产索引](../../registry/assets.json) · [Agent 检索目录](../../CATALOG.md)
- 现有主索引 255 → **271 条**（12 个 REF 外部来源/主题资源 + 4 个 IP 原创研究契约）；没有 React 公共导出、主题、现成整页或依赖增加。
- 数据源与可运行资产绝不等同：GitHub 项目的 LICENSE 不能自动授权其网站的社区投稿、字体图片、付费服务或插件。

## 来源优先级与差异（12 个）

| ID | 来源 / 获取方式 | 独立素材价值 | 权利与复用限制 |
| --- | --- | --- | --- |
| REF-089 | [21st.dev creator marketplace](https://21st.dev/)（P0） | 多作者 React/Tailwind Hero、导航、Shader、AI Chat、动效与组合区块的差异化发现；区别：REF-033/035 是特定效果项目；本项记录多作者社区发现和不同作品的权利边界 | Community contributions: per-author, per-item terms unverified；Only public link, category, short original analysis and provenance; no component code, thumbnails or screenshots imported |
| REF-090 | [21st Agent Elements component kit](https://github.com/21st-dev/agent-elements)（P0） | 聊天流、流式 markdown、工具执行卡片、审批/澄清面板的复合组件设计；区别：现有 UI 组件有基础控件与工作流，但缺少 Agent 工具响应的完整展现分类 | MIT repository LICENSE verified 2026-11-11; embedded media/third-party integrations separately；Research-only in this round; MIT source can be assessed item by item with copyright notice if later imported |
| REF-091 | [21st private registry CLI contract](https://github.com/21st-dev/registry)（P0） | 组件目录、demos、preview 与 registry 元数据；AI Skill 驱动的 search/install/publish 工作流；区别：REF-089 是内容发现，此项是机器注册表/CLI 协议，不能把商店内容当成库本身许可证 | MIT CLI repository; hosted marketplace contents require separate item review；CLI documented conventions may be studied; no remote publishing, authentication or component redistribution |
| REF-092 | [shadcn registry item and MCP standard](https://ui.shadcn.com/docs/registry/registry-item-json)（P0） | registry:block/page/ui/theme 分类、npm 依赖、registryDependencies、文件 target、Agent 安装契约；区别：当前自有 assets.json 不是 shadcn registry；本项明确外部协议映射而非宣称已经兼容 | Documentation/schema study; registry specification does not license every third-party item；Schema facts and links only; do not copy third-party registry files without per-item evidence |
| REF-093 | [shadcn blocks as compositional patterns](https://ui.shadcn.com/blocks)（P0） | 仪表盘、认证、侧栏、页面区块、表单组成与多密度布局；区别：与基础 UI 按钮/卡片不同，关注区块粒度、结构组合和响应式变化；不重复登记现有 UI 导出 | Official blocks; verify exact block source, author, assets and license before copying；Capture original block morphology/interaction descriptions; no imported vendor block source in this round |
| REF-094 | [Puck configurable React canvas](https://puckeditor.com/docs)（P0） | React 组件作为拖拽 Block、props 字段、嵌套 DropZone、JSON 作品结构；区别：REF-042 React Flow 是节点图；Puck 研究任意 React 页面区块的属性/嵌套与数据模式 | MIT editor core LICENSE verified 2026-11-11; hosted/AI add-ons separately；Only editor contracts, official docs URLs and original interpretations; no code imported |
| REF-095 | [GrapesJS WebMCP browser agent bridge](https://grapesjs.com/blog/webmcp-ai-browser-agents)（P0） | 浏览器 Agent 发现结构化编辑工具、按权限读取或修改画布、工具集过滤和 iframe 边界；区别：与 UI-058 的画布操作相比增加 browser agent ↔ editor API 的可发现性和授权分层 | GrapesJS core BSD-3-Clause LICENSE reviewed; separate WebMCP plugin license not verified；Research browser Agent tool model only; do not bundle plugin until license/compatibility validated |
| REF-096 | [Onlook visual editing on source code](https://github.com/onlook-dev/onlook)（P1） | React/Tailwind 可视化编辑与源码关联、可追踪修改、开发者文件上下文；区别：Puck 的 JSON→React 渲染模型与 Onlook 的已有源码可视化编辑是不同问题 | Repository-level license not confirmed; next hosted product distinct from original OSS repo；Reference-only; no source/media extraction and no assumption hosted product is open-source |
| REF-097 | [Webstudio page design system model](https://github.com/webstudio-is/webstudio)（P1） | 设计 Tokens、断点/响应式样式、页面结构与发布边界、视觉搭建操作；区别：现有主题主要是静态视觉语法；本项研究编辑中的结构化样式继承和跨断点覆盖 | AGPL-3.0 repository LICENSE verified 2026-11-11; review each package/hosted service；Research-only; no library code vendoring or implied proprietary reuse rights |
| REF-098 | [Plasmic React component composition](https://github.com/plasmicapp/plasmic)（P2） | 外部 React 组件暴露可编辑参数、slot 嵌套、数据绑定与复杂页面内容模型；区别：Puck 关注可嵌入编辑器；此项关注复杂宿主组件的可配置边界和编辑约束 | Monorepo/package licenses require per-package check; hosted features separately；Pattern study only; not a redistributable component source |
| REF-099 | [Craft.js React editor node primitives](https://github.com/prevwong/craft.js)（P2） | React 编辑器底层节点模型、拖放连接、选中态、嵌套与序列化；区别：Puck 面向可嵌入的成品编辑器，Craft.js 更偏底层自定义编辑行为 | MIT repository LICENSE verified 2026-11-11; individual examples/media separately；Original architecture research only; no vendored code this round |
| REF-100 | [Swebsy guest-first visual builder workflow](https://swebsy.com/)（P1） | 访客本地草稿、无需账号的浏览器搭建、外部 Agent 修改、HTML/CSS/JS 导出；区别：当前本仓库没有游客工作区研究；它是网站流程参考而非组件源码包 | No verified reusable source license; service/experience reference only；Do not scrape private UI, copy site graphics, or assume its builder code is reusable |

## 第一轮可检索的定向素材示例（研究方向，非已复制组件）

### REF-089 · 21st.dev creator marketplace

- 交互式 Hero 与动效状态
- 背景/Shader 的性能与动效降级
- AI Chat 区块状态与可访问替代
- 现有素材补位：REF-033/035 是特定效果项目；本项记录多作者社区发现和不同作品的权利边界

### REF-090 · 21st Agent Elements component kit

- Tool-card 执行中/错误/完成三态
- Clarification 与 approval 状态
- 流式消息与附件响应性
- 现有素材补位：现有 UI 组件有基础控件与工作流，但缺少 Agent 工具响应的完整展现分类

### REF-091 · 21st private registry CLI contract

- 组件和 demo 文件分离的发布清单
- private/unlisted/public 可见性差异
- 带出处和版本的 agent 安装交接
- 现有素材补位：REF-089 是内容发现，此项是机器注册表/CLI 协议，不能把商店内容当成库本身许可证

### REF-092 · shadcn registry item and MCP standard

- registry:block 的多文件与依赖记录
- target 路径与跨工程映射
- MCP 搜索与安装所需的描述质量
- 现有素材补位：当前自有 assets.json 不是 shadcn registry；本项明确外部协议映射而非宣称已经兼容

### REF-093 · shadcn blocks as compositional patterns

- Sidebar + workspace 双栏模式
- Form + validation 状态组合
- 移动端区块顺序和导航降级
- 现有素材补位：与基础 UI 按钮/卡片不同，关注区块粒度、结构组合和响应式变化；不重复登记现有 UI 导出

### REF-094 · Puck configurable React canvas

- 可编辑 props 与 schema 校验
- 容器 slot/dropzone 约束
- Root 元数据与页面数据迁移
- 现有素材补位：REF-042 React Flow 是节点图；Puck 研究任意 React 页面区块的属性/嵌套与数据模式

### REF-095 · GrapesJS WebMCP browser agent bridge

- 只读 inspect 与受限 write 分组
- tool schema/能力发现
- iframe 工具注册及不支持浏览器的降级
- 现有素材补位：与 UI-058 的画布操作相比增加 browser agent ↔ editor API 的可发现性和授权分层


## 四个独立交互/复现契约

### IP-050 · Registry item to editable block mapping / 注册表转可编辑区块

- **设计目标**：用 manifest 将可安装源文件、依赖和预览 props 映射到编辑器的可选区块，不把研究条目伪装成可运行组件
- **状态流**：candidate→license-and-runtime-reviewed→schema-mapped→previewable|blocked→versioned-handoff
- **无障碍/退化路径**：缺少 propsSchema、预览隔离或权利证据时仅链接文档；不渲染未知代码
- **失败模式**：组件缺失、依赖版本错配、slot 不受控、外部 JS 执行、来源授权未核
- **与现有资产区别**：IP-039 解决粘贴内容安全；本项定义资产索引到可编辑区块的发布准入
- **关联**：REF-092、REF-094、REF-093 · [上游依据](https://ui.shadcn.com/docs/registry/registry-item-json)

### IP-051 · Permission-gated Agent canvas commands / 授权分层画布命令

- **设计目标**：给 Agent 的 inspect/mutate/replace-export 工具单独分级授权，以可验证的节点命令和事务回执替代屏幕坐标脚本
- **状态流**：discover→read-only-inspect→permission-check→preview-patch→confirmed-commit|denied→undo|audit
- **无障碍/退化路径**：不支持 WebMCP 时允许显式导出 JSON/手动应用，不暗中模拟不可审计写操作
- **失败模式**：越权写入、HTML 注入、隐式全量重置、他人并发修改、工具 schema 不匹配
- **与现有资产区别**：IP-040 讨论协同 Undo；本项重点是外部 Agent 工具发现和权限护栏
- **关联**：REF-095、IP-040、UI-058 · [上游依据](https://grapesjs.com/blog/webmcp-ai-browser-agents)

### IP-052 · Guest-first recoverable workspaces / 可恢复游客草稿

- **设计目标**：访客创建页面时保存本地 Schema 与资源版本，明确草稿、只读分享快照和可写编辑密钥的边界
- **状态流**：guest-new→editing→local-saved→exported|shared-readonly→restored|cleared|expired
- **无障碍/退化路径**：IndexedDB 不可用时提供 JSON 下载和导入；分享链接不应默认授予写入权
- **失败模式**：清缓存丢数据、分享链接泄漏、匿名公开上传滥用、过期版本不能恢复
- **与现有资产区别**：现有页面示例强调视觉结构；本项聚焦不强制登录时的恢复与访问控制
- **关联**：REF-100、IP-040、PR-018 · [上游依据](https://swebsy.com/)

### IP-053 · Pinned provenance for reproducible remix / 锁版本作品复现清单

- **设计目标**：分离原始素材 ID、发布版本/commit、资源授权、Token 和工作区局部改动，支持跨项目可追踪复现
- **状态流**：draft→validated-snapshot→dependency-locked→exported→import-tested|incompatible→migration-review
- **无障碍/退化路径**：依赖或媒体不可访问时生成差异报告和静态参考，不宣称像素级一致
- **失败模式**：未锁定的 GitHub head、字体/图片跨域变化、依赖未授权、响应式断点漂移
- **与现有资产区别**：PR-018 是已有风格布局交接；本项要求来源与依赖锁定、可导入快照的证据
- **关联**：REF-092、REF-091、REF-096、PR-018 · [上游依据](https://ui.shadcn.com/docs/registry/github)


## 第一批具体参考案例（7 项，只研究、不复制）

这些 case 是 **来源内的观察对象**，不是独立 `assets.json` 运行组件，也不提升已有 16 条研究资产的 stage。优先记录可重访的公开证据和需要研究的具体问题；许可证尚未清晰的作者作品不下载源码或媒体。

| Case / 所属来源 | 官方证据 | 研究对象与复用边界 |
| --- | --- | --- |
| `v036-21st-scroll-media-hero` / `REF-089` | [Scroll media expansion hero](https://21st.dev/community/components) | 滚动进入视口→媒体展开→标题/动作区同步变形；标记 sticky、滚动撤销和 reduced-motion 方案。**差异**：IP-023, REF-079；not-cleared-for-code-or-media-mirroring |
| `v036-21st-agent-chat` / `REF-089` | [Agent Chat by Serafim](https://21st.dev/community/components/explore/chat-components) | AI 聊天的消息栈、工具回复容器、输入区模式与移动端高度变更。**差异**：UI-047, REF-090；not-cleared-for-code-or-media-mirroring |
| `v036-shadcn-dashboard-01` / `REF-093` | [dashboard-01](https://ui.shadcn.com/blocks/dashboard) | Sidebar / SiteHeader / SectionCards / ChartAreaInteractive / DataTable 的组合和数据边界。**差异**：UI-033, UI-055, PR-018；item-and-media-license-recheck-before-code-import |
| `v036-shadcn-sidebar-07` / `REF-093` | [sidebar-07](https://ui.shadcn.com/blocks/sidebar) | 宽窄状态、图标折叠、焦点恢复、tooltip 和移动触摸替代。**差异**：IP-008, TPL-007；item-and-media-license-recheck-before-code-import |
| `v036-agent-elements-toolgroup` / `REF-090` | [Agent Elements — ToolGroup and McpTool](https://github.com/21st-dev/agent-elements) | 工具调用聚合、进度、失败重试、读写批准与工具输出降级。**差异**：UI-047, IP-036；mit-repository-but-not-copied-and-media-dependencies-need-review |
| `v036-puck-dropzone` / `REF-094` | [Puck DropZone nested block model](https://puckeditor.com/docs/api-reference/components) | 合法嵌套、空 DropZone 提示、属性面板与保存 Schema 一致性。**差异**：IP-021, REF-042；mit-editor-core-but-example-source-not-copied |
| `v036-grapesjs-webmcp-tools` / `REF-095` | [GrapesJS WebMCP getTools permission filters](https://grapesjs.com/blog/webmcp-ai-browser-agents) | inspect/edit 工具分组、可发现的 JSON schema、可回放命令与无支持环境降级。**差异**：UI-058, IP-040；webmcp-plugin-license-needs-separate-review |

每个 case 的 `visibleEvidence`、`reviewState`、`rights`、`distinctFrom` 已登记于 [机器目录](../../registry/community-sources-v036.json)。2026-11-11 公共网页观察并不等于实际运行过上游代码，也不证明浏览器/读屏测试、当前可安装性、永久 URL 稳定或逐项授权完成。

## 对外部来源的三级采纳准入

1. **L1 · reference-only**：源 URL、能力、适用场景、不同于现有资产之处、许可证范围与置信限制可写入私有索引。本轮全部停留此级。
2. **L2 · structured-pattern**：基于合法可引用事实整理自己独立编写的行为、结构、状态、props 与 fallback 契约；须明确并非已运行源码。本轮 IP-050..053 属于此类研究描述，但复用级别仍 `research-only`。
3. **L3 · runtime candidate**：若未来需要升级为可执行资产，应逐项核查版权/第三方素材、可用源代码、框架依赖、版本/锁文件、响应式与键盘/触摸、性能/安全和实际测试；只有新增可验证的实现后再更新组件 registry，不能直接改现有条目 stage。

## 下一轮采集/去重操作

- 优先从 **21st.dev 官方社区（REF-089）** 人工选择有独立 permalink 且可核验作者与许可的 Hero/AI Chat/动效实例，再与 REF-033/035、现有 UI 实现进行功能去重；**不提供批量爬取 API 或登录绕过方案**。
- 使用 **shadcn Registry（REF-092）** 的 `registry:block/page/ui/theme`、`dependencies`、`registryDependencies`、`files[].target` 作为未来适配时的字段参考，**当前本仓库并非已发布 shadcn registry**。
- 从 **Agent Elements（REF-090）** 重点研究工具执行结果和审批 UI，从 **shadcn Blocks（REF-093）** 研究多部件布局。两个来源均按具体作品检查源码、媒体和许可证。
- 从 **Puck（REF-094）** 对照 Craft.js / Plasmic 的 props/slot/节点模型；从 **GrapesJS WebMCP（REF-095）** 对照 browser agent 读写权限，保持 2026-11 的 experimental 支持边界；从 **Onlook（REF-096）** 研究源码↔视觉映射。
- Swebsy 与 Webstudio 分别用于访客流程/跨断点设计研究，不默认代表可自由嵌入的开源组件。
- 每次只选择有新能力差异的 3–5 个具体实例，增量记录 `source permalink / upstream commit / author / rights / tested constraints / overlapping IDs`，否则不升级成独立资产 ID。

## 本轮核对清单

- [x] 复用现有 `registry/assets.json` ID 家族、catalog 导航和保守研究等级
- [x] 12 个来源有明确正向范围、差异、别名、应用情境、访问方式和授权提醒
- [x] 4 个原创状态契约有失败模式、降级和相关既有资产
- [x] 资产索引与细分索引有稳定双向 ID 与同一来源
- [x] 未包含第三方源码、截图、媒体、未登录采集数据或安装依赖
- [ ] 外部具体组件逐项许可审核、构建/浏览器/读屏测试（未开展）
- [ ] 将来单独目标产品中的编辑器/Agent 安装与真实复现实验（未开展）

**可信度边界**：官方文档是能力与协议来源；许可证仅以明确核到的代码仓库范围声明，不替代法务审查。Notion 为长期研究决策记录，GitHub 为本轮文件与索引的权威版本。
