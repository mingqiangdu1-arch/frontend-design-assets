# V0.38 · 原创可运行 Agent 交互素材（2026-11-11）

本轮从 V0.37 的三个研究协议扩展出**有真实 ESM 源码、HTML/CSS/JS 实验页和测试**的三套独立前端交互素材。仓库仍只积累素材，不组装网站或 AI 系统。

- [独立交互实验](../../playground/agent-interactions-v038/index.html) · [使用边界与代码入口](../../playground/agent-interactions-v038/README.md)
- [结构化契约](../../registry/agent-interactions-v038.json) · [主注册表](../../registry/assets.json)
- [Node 测试](../../tests/agent-interactions-v038.test.mjs) · [浏览器测试](../../tests/browser/agent-interactions-v038.spec.mjs)

| 新资产 | 独立状态模型 | 研究来源 | 不能宣称的能力 |
| --- | --- | --- | --- |
| IP-057 | [tool timeline](../../playground/agent-interactions-v038/timeline-model.mjs) | IP-054、REF-108/110 | 无实时工具通信、远端任务管理和持久化 |
| IP-058 | [patch approval](../../playground/agent-interactions-v038/approval-model.mjs) | IP-055、REF-106 | 未实现真正的代码修改、权限或 SHA256 哈希计算 |
| IP-059 | [draft clarification](../../playground/agent-interactions-v038/clarification-model.mjs) | IP-056、REF-107/109 | 无真实附件上传、跨设备草稿存储、Agent 对话服务 |

## 状态设计要点

1. IP-057 使用稳定 tool ID 和单工具递增序号处理事件：排队→运行→成功/失败/取消；终态不接受迟到事件。只在全部工具都终结后汇总最终状态，部分失败不展示为全部成功。
2. IP-058 提案包含 ID、虚构 patch hash、基础版本和摘要，先显示待审批；拒绝是终态。批准不代表写入成功；模拟回执要求版本仍相符。**前端不能替代真正的鉴权、文件校验和审计。**
3. IP-059 提问携带 question ID、类型、合法答案范围；用户草稿与附件名称在提问期间不变。提交 nonce 防止页面内部重复提交；失败可用新 nonce 重试，也可以退出恢复草稿。

## 质量边界

- 三个模型是原创、无第三方包依赖的 ESM。演示数据全部为虚构文字，未导入上游组件代码、截图、字体或图片。
- DOM 文本使用 textContent 而非 innerHTML 拼接用户或工具输出；拥有可见按钮/输入与状态播报区域。没有进行独立读屏或实体手机完整认证。
- 交互模型可在 Node 单测和 Chromium 演示中验证；CI 绿灯仅证明覆盖到的场景，不等于真实应用安全审查。
- 新资产 ID 为 IP-057..059，stage=prototype、reuseKind=behavior-pattern，默认交接 adapt-required；IP-054..056 保持 analyzed/research-only，不发生历史状态篡改。
- React package 的 48 项真实公共导出、14 个 styleId、真实页面模板和现有依赖均未改动。若以后要 React 化，应在独立目标项目中适配，或完成 gallery/类型/组件测试后再另行登记。
