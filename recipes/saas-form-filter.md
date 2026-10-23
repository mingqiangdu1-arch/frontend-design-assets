# PR-005 · SaaS 表单 + 高级筛选组合

状态：**prototype**。这是用于比选的交互页面配方，并非对 AI WORKFLOW PLATFORM 的页面改造。

## 引用资产

DT-001 Refined Light SaaS Theme（仅演示外观）；
SAAS-007 Inline Edit；
SAAS-008 Form Validation/Async Save；
SAAS-009 Unsaved Guard；
SAAS-010 Advanced AND/OR Filter；
SAAS-011 Scoped Shortcuts。

## 组装策略

1. 页面先以自然阅读层级组织：标题与说明 → 简短属性 → 明确表单控件 → 固定/就近操作区域。
2. 短文本优先 Inline Edit；长内容使用 Textarea；失焦只显示错误/保留草稿，不隐式保存。
3. 草稿与保存态独立；只有 Save 成功后标“已保存”。
4. 离开草稿需允许继续编辑或放弃修改，不靠模糊的自动离开行为。
5. 多条件筛选作为独立实验：条件逻辑明显、输入有标签、应用前不会变更结果。
6. 键盘快捷键是补充能力，不代替按钮和用户自主控制。

## 可体验 Demo

[独立实验页](../playground/saas-editing/index.html)；本地建议用 `python -m http.server 8009` 访问 `/playground/saas-editing/`。

## 目标项目集成前要回答

- 保存是手动、自动还是混合？
- 何时必须服务器校验？是否有唯一性与版本冲突？
- “放弃”对本地草稿、服务器草稿和审批状态各意味着什么？
- 筛选是前端还是服务端计算？URL、个人/共享视图如何保存？
- 设备是桌面重操作还是移动端？
- 是否存在需要 Undo 的破坏性操作？

目前只有本地模拟，没有假设任何后端或已上线能力。
