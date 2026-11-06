# 历史归档说明

`archive/` 只放**允许公开、但不应作为当前实现首选项**的历史快照和旧文档。仍可运行的独立实验可以继续留在 `playground/`，通过 `registry/assets.json` 的 `reuseKind: "snapshot"` 和生命周期状态参与检索，不应为了目录整齐而破坏现有 Demo/测试路径。

- 先确认有替代资产、新版本或更准确的说明，随后通过稳定 ID 和文档记录 `supersededBy` / 关联关系。
- 迁移文件时同时更新 `registry/`、`scripts/`、`tests/`、Markdown 链接；最好独立 PR，避免同时重写多个组件。
- 未经授权的第三方素材、私有 Notion 链接和内部项目资料**不能通过放入本目录获得公开安全性**。请移出所有拟公开的 Git 内容并处理 Git 历史。
- 需要浏览历史设计决策时优先查看 [CHANGELOG](../CHANGELOG.md)、[设计研究](../docs/research/) 和原始提交，不建议让 Agent 从早期 KIT 快照开始实现新功能。

当前保留：`v0.1.0.md` 和 `REUSE-PROMPT-v0.1.0.md`，其余过时内容需逐项评估后再迁移。
