# 面向 Codex / AI 开发 Agent 的复用提示词

请将随附 `frontend-design-assets-v0.1.0/` 目录作为独立的 UI 资产参考库，而不是现有业务系统的可直接覆盖模板。

目标：按新需求快速组装 **Attio × Vercel 风格的 Refined Light SaaS UI**，并保证交互连续、视觉一致。

执行顺序：
1. 读取 `registry/asset-manifest.json`，按 `id`、`tags`、`layer`、`status` 检索可复用资产；读取 `docs/01-VISUAL-SYSTEM.md` 与 `docs/02-INTERACTIONS.md`。
2. 分析当前项目的前端框架、已有设计系统、路由、状态管理与构建链；不要默认直接迁入 React 实现。
3. 优先复用 `tokens/design-tokens.json` 或 `tokens/tokens.css`；将已有变量映射为统一语义，不复制零散十六进制样式。
4. 选择 `docs/03-PAGE-RECIPES.md` 中最接近的页面模板，然后再选择 `UI-xxx` 组件与 `IP-xxx` 交互模式。明确每个组件的状态（implemented / prototype / spec-only）。
5. 仅迁移已实现且匹配实际技术栈的代码；复杂的 Dialog、Tabs、Toast 必须使用经过验证的无障碍 primitives。不得把 HTML 原型中的模拟保存、定时器或数据写入生产业务。
6. 尽量保持组件原来的视觉与动效风格，必要改动只调整语义 token 与宿主接口，避免局部自造新色板或交互模型。
7. 提供独立的视觉验证入口和最小测试；覆盖焦点、Esc、空状态、失败反馈、键盘与 reduced-motion。
8. 不改动业务 API、数据状态与正式页面路由，除非后续任务明确授权；先交付小范围可复用模块与集成报告。

预期输出：采用的资产编号、映射的 Token、目标文件路径、依赖与许可、演示截图、状态验收结果、未实现的交互规格。
