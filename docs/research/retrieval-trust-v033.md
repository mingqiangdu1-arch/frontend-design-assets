# V0.33 · 素材检索可信度与研究/实现边界验收（2026-11-10）

> 本轮是质量修复和检索规则加固，不重复创建 V0.32 已存在的编辑器、字体、纹理、特殊效果素材。资产总数维持 **239**，14 个视觉主题和真实 React 公共导出不变。

## 问题和修正

原 registry/assets.json.reusePolicies 将所有 behavior-pattern 统一视为 adapt-required。这个规则对有可运行原型的交互模式是合适的，但 V0.31/V0.32 的 IP-031..041 实际只是研究契约，不含可执行实现路径；在统一 CLI 中会被高估为可以直接适配。

**新规则**：保留 reuseKind 作为内容类型，单个资产可设置 handoff.mode = research-only，作为保守收窄的复用声明。检索、过滤和交接输出尊重它；不允许利用该字段把研究素材升级为 copyable-source。注册表验证会阻止不合法的 override。

## 检索验收矩阵

| 查询（node scripts/find-assets.mjs --intent=ID --json） | 正确结果 | 明确不能声称 |
| --- | --- | --- |
| IP-036：斜杠菜单、输入法 | research-only；查阅 IME 与选择范围契约 | 已集成 Tiptap / Lexical |
| IP-037：锚点评论 | research-only；查阅相对位置和孤儿锚点 | 已实现后台协同存储 |
| IP-039：富文本粘贴 | research-only；查看安全处理和组合输入 | 可以插入未经清洗的 HTML |
| IP-031：底部抽屉 | research-only；滚动仲裁和手势取消 | 已实测移动端 |
| IP-033：长按排序 | research-only；键盘等效和撤销 | 已拥有可运行拖拽组件源码 |
| REF-074：颗粒纹理 | research-only；另有独立 opt-in CSS 原子文件 | 等于 React 公共组件 |
| REF-071：字体许可 | research-only；逐字体 family 审核许可证 | 所有外链字体可无条件分发 |
| IP-030：精密旋钮 | adapt-required；已有独立原型模型 | 已生产认证 |
| UI-058：FlowEditor | copyable-source；有真实组件源码 | 已具备后端工作流服务 |

回归测试：tests/find-assets.test.mjs 覆盖 11 个研究型交互条目的复用等级、历史原型保留原有等级和错误覆盖不得提升权限。

## Agent 复用决策

1. 需要思路或素材参考：先按 context/alias 找研究条目，返回来源、状态、许可、降级和未验证部分。
2. 需要可执行交互：优先查有 path 的 prototype 或 reference-implemented；研究契约只补状态和风险。
3. 需要 React 组件：以 registry/components.json 的真实 exportName 和 packages/ui/src 为准，不把 CSS 类、第三方研究链接、type=component 直接视为实现。
4. 涉及外部字体、PBR、纹理、图像或图片：单项审查授权；不在素材库内自动下载或重新分发。
5. 设计文档含有性能或可访问建议，不代表真实浏览器、物理设备、屏读、生产环境的验证。

## 本轮未改变

未增加业务页面、依赖、媒体文件、全局主题或组件 API；资产总数仍为 239。

## 关键路径

- [素材目录](../../CATALOG.md)
- [统一注册表](../../registry/assets.json)
- [V0.32 研究目录](creative-primitives-v032.md)
- [检索工具](../../scripts/find-assets.mjs)
- [回归测试](../../tests/find-assets.test.mjs)
