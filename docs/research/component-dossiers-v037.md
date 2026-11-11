# V0.37 · 组件级深挖：shadcn Blocks × Agent Elements × 21st.dev 候选（2026-11-11）

> 边界：只做来源确证、部件结构与交互合同研究。未安装任何第三方库、复制源码/图片/字体、抓取付费内容、构建产品页面或测试这些来源在宿主项目中的可运行性。全部主索引新增为 `analyzed / research-only`。

[机器索引](../../registry/component-dossiers-v037.json) · [统一资产索引](../../registry/assets.json) · [上一轮来源监测表](../../registry/community-sources-v036.json) · [Agent 检索导航](../../CATALOG.md)

## 本轮具体成果和可信度

- 10 个上游具有**文件/注册表依据**的条目（REF-101..110），其中 4 个 shadcn 官方 Block、6 个 Agent Elements 的组件；3 个新原创交互合同（IP-054..056）。主资产 **271 → 284**。
- 另保留 21st.dev 社区 **3 个候选**，只有集合页展示的作者/名称，未核定单条稳定 URL、具体开源许可和可分发权利，因此不领取主资产 ID。
- 每个 REF 项都记录源码位置、上游 commit、注册表依赖/项目依赖、结构分区、可研究的状态与响应式风险、现有资产对照及许可证据链接。
- **观察与建议分开**：上游 `observed` 描述来自正式 README/registry；`study`、`states`、`responsive`、`fallback` 是本库原创建议，不能当作上游测试结论。

## 四个 shadcn 多文件区块

| ID | 具体 Block | 上游真实文件/依赖（只读） | 可独立抽取的设计知识 |
| --- | --- | --- | --- |
| REF-101 | [dashboard-01](https://ui.shadcn.com/blocks/dashboard) / [固定源码](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/blocks/dashboard-01/page.tsx) | 11 文件；npm 依赖 7，registry 依赖 19；app/dashboard/page.tsx, app/dashboard/data.json | 把导航、指标、动态图表与可排序/过滤数据表当成可独立替换的 Block；明确页内共享筛选与断点布局并不自动成立 |
| REF-102 | [sidebar-07](https://ui.shadcn.com/blocks/sidebar) / [固定源码](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/blocks/sidebar-07/page.tsx) | 6 文件；npm 依赖 0，registry 依赖 6；app/dashboard/page.tsx | 拆分 icon 模式、展开导航树、团队切换、用户操作，不把收起操作等同于完全移除导航 |
| REF-103 | [sidebar-13](https://ui.shadcn.com/blocks/sidebar) / [固定源码](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/blocks/sidebar-13/page.tsx) | 2 文件；npm 依赖 0，registry 依赖 4；app/dashboard/page.tsx | 在设置/偏好弹层内部使用导航分区，强调 modal focus trap、层级滚动和关闭恢复而非普通左侧持久栏 |
| REF-104 | [login-04](https://ui.shadcn.com/blocks/login) / [固定源码](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/blocks/login-04/page.tsx) | 2 文件；npm 依赖 0，registry 依赖 5；app/login/page.tsx | 双栏媒体与表单主次层级；用于可选账户入口的视觉参考，**不默认强制网站用户登录** |

## 六个 Agent Elements 子组件

| ID | 上游注册表 | 实际相关文件 | 研究可复用的交互与状态 |
| --- | --- | --- | --- |
| REF-105 | [agent-chat](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/public/r/agent-chat.json) | `agent-chat.tsx` + `tool-renderer.tsx` + `question-prompt.tsx` | 分离会话显示与消息/工具状态、草稿状态和停止操作；不得把 composable shell 误当成后端 Agent runtime |
| REF-106 | [edit-tool](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/public/r/edit-tool.json) | `edit-tool.tsx` + `tool-approval-footer.tsx` + `tool-adapters.ts` | 改动范围预览与拒绝/批准必须明确分离；diff 展示不代表代码真正提交成功 |
| REF-107 | [question-tool](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/public/r/question-tool.json) | `question-tool.tsx` + `question-prompt.tsx` | Agent 向用户提出单选/多选/文本问题；无重复提交、明确回到对话上下文，并提供回答被采纳的反馈 |
| REF-108 | [tool-group](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/public/r/tool-group.json) | `tool-group.tsx` + `tool-registry.ts` + `tool-row-base.tsx` | 可折叠的多步工具进度、逐步错误与输出摘要；避免用单个完成灯表示全部子任务均成功 |
| REF-109 | [input-bar](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/public/r/input-bar.json) | `input-bar.tsx` + `input-typing.tsx` + `question-prompt.tsx` | 输入框与附件状态分离，streaming 时显示 Stop 并保留草稿，不能把前端附件 chip 当成服务端已上传 |
| REF-110 | [mcp-tool](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/public/r/mcp-tool.json) | `mcp-tool.tsx` + `tool-registry.ts` + `tool-row-base.tsx` | 把 MCP 响应的结构化内容、异常和工具身份分别显示，避免把工具的 HTML/文本内容直接作为可信页面执行 |

### 逐项使用时需要检查的场景（建议，不是上游行为承诺）

#### REF-101 · shadcn dashboard-01 — multi-pane analytics block

- **正式观察**：Official registry declares a multi-file registry:block for a sidebar, chart and interactive data table; includes explicit route/data targets.
- **组成**：app-sidebar、site-header、section-cards、chart-area-interactive、data-table
- **状态检查**：loading → empty → filtering → row-selected → error
- **响应式/触摸检查**：导航窄屏折叠；图表宽度约束；表格横向滚动与列简化
- **基础降级**：图表提供文本/表格替代，拖拽排序应有键盘控件；数据接口和权限由宿主接管
- **与旧资产区别**：现有 UI-033/UI-055 是控件；dashboard-01 是多文件页面区块组合，不当作单一运行组件
- **源码 commit**：`8ab27715521cbd4f87ae6886cd989cbb678f6de7`；[许可证证据](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/LICENSE.md)；关联 REF-093、UI-033、UI-055、PR-018

#### REF-102 · shadcn sidebar-07 — collapsible icon navigation

- **正式观察**：Official registry records collapsible-to-icon sidebar with nested navigation, user and team sections, with six source files.
- **组成**：app-sidebar、nav-main、nav-projects、nav-user、team-switcher
- **状态检查**：expanded → icon-only → submenu-open → focus-restored
- **响应式/触摸检查**：图标下保留 tooltip 或 label；窄屏抽屉语义另验；保持激活项和键盘定位
- **基础降级**：可操作的标签和菜单语义；图标-only 模式不得依赖悬停才能理解导航
- **与旧资产区别**：IP-008 是可调整面板行为；本项是多级信息架构和双形态导航 Block
- **源码 commit**：`8ab27715521cbd4f87ae6886cd989cbb678f6de7`；[许可证证据](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/LICENSE.md)；关联 REF-093、IP-008、TPL-007

#### REF-103 · shadcn sidebar-13 — sidebar inside a dialog

- **正式观察**：Official shadcn registry calls sidebar-13 'A sidebar in a dialog' with page.tsx and settings-dialog.tsx.
- **组成**：modal trigger、settings-dialog、sidebar navigation、dialog content panel
- **状态检查**：closed → opened → section-switched → dismissed
- **响应式/触摸检查**：窄屏可退化全屏 Sheet/路由；滚动区域独立且不截断动作
- **基础降级**：键盘 Escape、关闭按钮、背景不可点击与关闭后焦点恢复
- **与旧资产区别**：与 REF-102 的常驻侧边栏不同：二级导航位于模态上下文，需专门焦点与历史策略
- **源码 commit**：`8ab27715521cbd4f87ae6886cd989cbb678f6de7`；[许可证证据](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/LICENSE.md)；关联 REF-093、REF-102、IP-008

#### REF-104 · shadcn login-04 — split media authentication block

- **正式观察**：Official registry describes a login page with form and image, with a page route and a dedicated login-form file.
- **组成**：media region、login form、validation labels、form action
- **状态检查**：idle → validating → invalid → submitting → failed → success
- **响应式/触摸检查**：移动端简化/隐藏装饰图不遮挡表单；输入缩放、键盘遮挡和错误布局
- **基础降级**：不加载装饰媒体时仍有完整字段/提交与辅助文本；媒体版权须逐项核查
- **与旧资产区别**：与 REF-093/已有页面布局相比，新增登录表单和视觉叙事并排的 Block 解剖，但不是身份系统
- **源码 commit**：`8ab27715521cbd4f87ae6886cd989cbb678f6de7`；[许可证证据](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/LICENSE.md)；关联 REF-093、REF-100、IP-052

#### REF-105 · Agent Elements agent-chat — composite conversational shell

- **正式观察**：Official registry agent-chat requires many transitive registry items and supports messages/status, onSend/onStop and toolRenderers; registry type registry:ui.
- **组成**：MessageList、InputBar、tool renderer、question prompt、empty state
- **状态检查**：idle → submitted → streaming → stopped → tool-pending → error
- **响应式/触摸检查**：消息长行换行和图片约束；输入栏固定时处理移动键盘与可用高度
- **基础降级**：屏幕阅读器 live region 节流；工具调用错误可文字展开；onStop 语义由宿主实现
- **与旧资产区别**：现有 UI-047 更偏产品流程；REF-105 为会话-工具渲染桥接的复合前端壳
- **源码 commit**：`b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37`；[许可证证据](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/LICENSE)；关联 REF-090、UI-047、IP-050

#### REF-106 · Agent Elements edit-tool — diff and approval card

- **正式观察**：Registry includes edit-tool.tsx, approval footer and diff dependency; component source accepts an approval field. No backend write implied.
- **组成**：file label、diff preview、approval footer、tool timeline state
- **状态检查**：proposal → diff-ready → approval-pending → approved → rejected → apply-failed
- **响应式/触摸检查**：长行 diff 横向滚动；小屏切换 unified diff 和文件摘要
- **基础降级**：可复制的文字 diff 摘要、危险操作二次确认和审核后状态回执
- **与旧资产区别**：IP-040 是本地撤销/远端事务；本项强调可见补丁与人类审核组件形态
- **源码 commit**：`b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37`；[许可证证据](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/LICENSE)；关联 REF-090、REF-105、IP-040、IP-051

#### REF-107 · Agent Elements question-tool — structured clarification

- **正式观察**：Question tool registry provides dedicated question-tool.tsx and question-prompt.tsx; source exposes onSubmit flow and disabled states.
- **组成**：question prompt、choice controls、answer submission
- **状态检查**：waiting → selecting → submitting → accepted → failed → expired
- **响应式/触摸检查**：窄屏选项纵向排列；长问题和选项滚动时保留确认区
- **基础降级**：键盘可达的选项、回显所选答案；Agent 超时不能静默丢弃用户输入
- **与旧资产区别**：IP-036 是文档编辑触发菜单；此项是 AI 对话工作流中结构化澄清工具
- **源码 commit**：`b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37`；[许可证证据](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/LICENSE)；关联 REF-090、REF-105、IP-036

#### REF-108 · Agent Elements tool-group — grouped execution timeline

- **正式观察**：Registry tool-group contains tool-group, tool-registry and tool-row-base plus registry dependencies generic-tool and text-shimmer.
- **组成**：group summary、tool rows、expandable details、completion state
- **状态检查**：collapsed → expanded → running → partial-failure → completed → cancelled
- **响应式/触摸检查**：折叠长路径和工具参数；移动端以摘要优先而非强迫展示所有日志
- **基础降级**：全文本工具清单及状态标签、暂停后留存已完成步骤
- **与旧资产区别**：相较 UI-054 ActivityTimeline 是任务/工具事件的语义分组与状态滚动，不是业务时间线
- **源码 commit**：`b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37`；[许可证证据](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/LICENSE)；关联 REF-090、REF-105、UI-054、IP-051

#### REF-109 · Agent Elements input-bar — multimodal chat composer

- **正式观察**：Official registry declares InputBar with dependencies on attachment/button/suggestions and the React source contains onSend/onStop/status and controlled change hooks.
- **组成**：composer textarea、attachments、suggestions、send/stop、question prompt
- **状态检查**：empty → composing → with-attachment → sending → streaming → stopped → upload-error
- **响应式/触摸检查**：键盘上推与安全区；附件列宽收缩、长文本可展开
- **基础降级**：提交和停止必须键盘可用；附件拒绝原因可读；未上传成功不得显示已发送
- **与旧资产区别**：常规表单组件缺少流式模型、附件和模型/模式上下文；以消息编辑器粒度研究
- **源码 commit**：`b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37`；[许可证证据](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/LICENSE)；关联 REF-090、REF-105、IP-039

#### REF-110 · Agent Elements mcp-tool — inspectable MCP result row

- **正式观察**：Registry MCP tool includes mcp-tool.tsx, normalizer and tool-row base, dependencies streamdown and code renderer; source exposes unwrapMcpOutput.
- **组成**：tool identity、input summary、structured output、error fallback
- **状态检查**：requested → running → result → malformed-output → failed
- **响应式/触摸检查**：长 JSON 内容换行或可滚动；输出摘要与完整展开分离
- **基础降级**：作为纯文本/代码块显示未知内容，禁执行 HTML，敏感字段在展示前脱敏
- **与旧资产区别**：IP-051 是 Agent 调用画布权限，McpTool 研究工具**响应内容**的渲染与诊断
- **源码 commit**：`b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37`；[许可证证据](https://github.com/21st-dev/agent-elements/blob/b04b36cb6381a1dd1a0e86cc7c90564ddcd56d37/LICENSE)；关联 REF-090、REF-108、IP-051


## 三个原创的跨组件交互合同

### IP-054 · Streaming tool timeline with atomic result status / 流式工具链状态

- **目标**：会话流式生成与多个工具的进度必须保持独立身份、序号和结果：展示时既可折叠摘要，也可展开各项输入/输出
- **状态流**：message-submitted → stream-open → tool-started → per-tool-success|per-tool-failed|cancelled → stream-closed → acknowledged
- **控制/验证要点**：工具行有唯一 ID 与稳定顺序；最后一次有效事件覆盖过期事件；取消后保留已完成结果和失败原因
- **可访问或离线替代**：text-only 序列与屏幕阅读器节流 announce；滚动位置由读者选择，不能在阅读历史时强制跳底
- **失败模式**：乱序 tool delta 覆盖最终响应、部分失败被计为整体成功、HTML 输出污染、重复渲染导致动态内容跳动
- **已有素材区分**：IP-040 的协同撤销并非流式工具事件状态；此项要求 per-tool identity 与 partial failure 正确

### IP-055 · Diff proposal and approval authority separation / 代码变更审阅授权

- **目标**：Agent 建议修改、可读 diff、用户批准与后端实际写入应是四种分离状态；单个目标文件版本或 hash 构成并发保护
- **状态流**：draft → diff-ready → permission-check → approved|rejected → apply-pending → applied|conflict|failed → undo-requested
- **控制/验证要点**：拒绝不得落盘；批准绑定具体 patch hash 和文件集合；重复回调幂等；写入后需记录实际 commit/operation id
- **可访问或离线替代**：文件太大时先输出文件级摘要和可下载 patch；网络断线显示未确认状态不伪造已应用
- **失败模式**：diff preview 与真正写入文件不一致、批准后 patch 被调包、权限在提交时失效、失败显示成功
- **已有素材区分**：REF-106 是上游可视化卡片，本项是原创可复用的人机写入操作契约

### IP-056 · Structured clarification with draft continuity / 澄清不中断输入

- **目标**：Agent 提问不能破坏用户已有输入草稿或附件；每个问题有 questionId、合法答案域、提交幂等键与过期策略
- **状态流**：draft-active → question-offered → answer-editing → submitting → accepted|validation-error|expired → draft-restored|next-question
- **控制/验证要点**：单选与多选语义不同；提交禁用须显示原因；回答保存后恢复光标和原草稿；允许明确跳过但不默认造答案
- **可访问或离线替代**：非交互环境允许纯文本结构化答复；网络异常时保留临时答案并可重试，屏幕阅读器播报确认
- **失败模式**：重新打开后重复提交、问卷状态覆盖聊天输入、附件丢失、旧问题被新问题错误复用、提交后无回执
- **已有素材区分**：REF-107 是上游问题组件，本项聚焦问题-草稿-恢复的跨组件合同


## 21st.dev 社区候选（暂不进入主资产）

| 来源集合内的名字 | 为什么仍在候选层 | 升级前要求 |
| --- | --- | --- |
| [AI Tool Call by Edu Calvo](https://21st.dev/community/components/explore/ai-agent-registry) | 社区中针对工具调用状态的独立视觉方向；暂未确认单条 permalink 或作者级使用许可 | Locate exact public item permalink and author license; compare with REF-108/110 before assigning a stable ID |
| [Approval Card by theshanelevine](https://21st.dev/community/components/explore/ai-agent-registry) | 人工批准/拒绝 UI 的不同视觉方案；暂未确认单条 permalink 或作者级使用许可 | Confirm exact item, source and allowed derivative terms; compare with REF-106 and IP-055 |
| [AI Agent Processing States by Arun Dass](https://21st.dev/community/components/explore/ai-agent-registry) | 长任务运行反馈与动态图形视觉研究；暂未确认单条 permalink 或作者级使用许可 | Confirm concrete item and motion fallback before adding indexed design asset |

## Agent 的最短检索路线

1. 按用户目标从 `CATALOG.md` 找 REF-101..110 或 IP-054..056；精确元数据参见机器索引，不要仅靠名字自动推荐。
2. 只需研究设计模式时用 REF 的 `study/states/fallback` 与 IP 的状态合同，优先复用本库已有 UI/IP，不得宣称已有组件源码。
3. 需要实际引入上游源码时，应在**目标产品仓库**核查上游版本、实际 registry item、所需依赖、项目文件写入路径、字体/图像与服务权利，以及浏览器/键盘/触摸表现；本研究并未执行该过程。
4. 同一功能多个来源：先比较 REF-101 vs UI-033/055、REF-102 vs IP-008、REF-106 vs IP-040/051、REF-107 vs IP-036，避免重复收集只换样式的 Block。
5. 21st.dev 多作者候选缺少逐项 permalink 和许可时只提供集合页研究引用，不应生成伪安装命令、冒认开源或自动镜像代码。

## 验收和限制

- 数据一致性：所有新条目与主索引双向 ID 对应、来源有效、相关 ID 已存在、状态全为 research-only；新增旧计数的测试不应阻碍未来增量。
- 质量范围：GitHub CI 只能验证索引、测试脚本与现有仓库测试；上游 UI 未安装、未执行，也没有像素快照、设备或完整可访问性测试。
- 此轮**没有**把任何上游组件编译为本仓库的 React exports，也没有为未来网站提供实时的 shadcn 可安装 registry。
