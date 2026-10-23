# SaaS 表单编辑与高级筛选 · 研究资产 V0.3

**范围：** SaaS 场景的输入、编辑、草稿保护、键盘效率和复杂筛选。设计行为不依赖 Refined Light；[独立实验](../../playground/saas-editing/index.html) 只是其中一种浅色呈现。应用前重新审核视觉与输入环境。

## 来源、观察与应用取舍

1. [Atlassian Inline Edit](https://atlassian.design/patterns/inline-edit/) 与 [Inline editable text field](https://atlassian.design/components/inline-edit/inline-editable-textfield/usage) 明确区分阅读态和编辑态，提供确认/取消控制，说明复杂文本编辑时 blur 不应意外保存或丢弃。
2. [Vercel Geist Input](https://vercel.com/geist/input) 提倡明确标签与帮助文案、blur 校验、提交前 trim、针对字段的错误信息。
3. [Vercel Geist Error](https://vercel.com/geist/error) 区分字段级、瞬态保存操作和资源加载类错误；应用时按错误范围显示。
4. [Linear Filters](https://linear.app/docs/filters) 允许组合筛选、AND/OR 和嵌套逻辑；[Custom Views](https://linear.app/docs/custom-views) 把临时筛选与持久化/分享视图区分。
5. [NN/g: Expectations of Save](https://www.nngroup.com/articles/efficiency-vs-expectations/) 指出显式保存符合很多表单用户的心智模型；AutoSave 不是一律更好。

上述属于公开资料可查的**模式和原则**，不是复制官方交互源码、Token、动画精确参数。

## SAAS-007 · Inline Edit

**目标：** 不离开详情页即可编辑短文本。阅读态明确可点击；进入编辑态后原位替换输入控件，附可见保存/取消。Esc 取消，Enter 提交（单行）。失焦**不自动保存，也不关闭编辑态**；避免点错造成内容丢失。无效输入显示就地错误，保留草稿和焦点。

本轮演示只修改当前表单草稿，不立即写入保存记录。另点主表单“保存全部修改”后才模拟提交。必须区分“确认字段草稿”与“最终持久保存”。

## SAAS-008 · Validation and Async Save

字段：名称必填且最多 40 字；标识符 slug 小写字母数字与连字符，2–24 字符；邮箱需基本结构；说明不超过 240 字。Blur 单字段验证；Submit 验证所有字段并聚焦首个无效字段。

保存：idle → saving → success/error。模拟失败时草稿保留，允许重试；成功才更新保存基线。本 Demo 不包含真实 API、并发冲突、数据库或持久化。

禁用提交按钮不应造成字段丢失或失去可恢复性。

## SAAS-009 · Unsaved Changes Guard

保存基线与草稿分离；dirty 只表示文本/选择内容与基线不同。
- 切换“编辑”和“筛选”实验视图时，若有未保存表单改动，出现“放弃更改/继续编辑”确认对话框。
- 浏览器刷新/关闭时利用 `beforeunload` 原生提示；浏览器实际是否显示/文案由浏览器决定，不虚构自定义弹窗。
- 继续编辑不修改草稿；放弃更改恢复保存基线；成功保存更新基线并解除 dirty。
- 因为本 Demo 的筛选属于另一组临时数据，它可被独立修改，但不应误当作主表单已保存。

## SAAS-010 · Advanced Filter Builder

支持条件字段 status/owner/name，操作符 equals/contains/not_equals；多个条件使用 AND/OR；允许增加一个嵌套条件组并独立选择 AND/OR。限制最多两个层级和每组最多五项，避免无穷递归和复杂状态爆炸。

编辑筛选条件是**草稿**；点击“应用临时筛选”才更新预览。重置恢复全部记录，当前版本不实现真实 Saved View、URL 同步或服务端查询（留作后续独立研究）。

空规则不应意外过滤全部记录；非法字段/运算符不能导致界面崩溃。条件为空时清楚说明忽略还是拒绝。

## SAAS-011 · Scoped Shortcuts

`Ctrl/⌘ + S`：仅在表单视图且无对话框时提交草稿（阻止浏览器默认保存网页）。`/`：仅在筛选视图且焦点不在文本输入时聚焦条件输入。`Esc`：关闭内联编辑或由 dialog 原生处理；快捷键不劫持其他应用级行为。

所有快捷键有**可见等效按钮**；提供文本提示。不要在内容可编辑区域劫持 `/` 或单字母命令。

## 可移植性和验收

- 原型纯 JS、HTML、CSS；用 `<dialog>` 做提示，需在移动端和 Safari/Chromium 验证。
- 视觉上使用 Label + Helper + Error；保存栏显式状态，错误回到关联字段。
- 同一内容区的通知不要强制同时显示 Toast + 巨型弹窗。
- 测试矩阵：空值、太长、特殊字符、无结果、组合筛选、保存失败、未保存离开、Esc、键盘焦点、reduced motion、320/390/1440px。
- 自动化纯逻辑测试和源码语法检查**不能替代真实浏览器视觉、无障碍、真实服务端测试**。
