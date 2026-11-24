# Application Profiles — 按应用组装，而非强制统一风格

本目录保存公开的虚构应用 Profile 示例，用于展示设计需求与素材选型结构，不保存真实项目决策、私人数据或业务应用代码。

每个实际应用可拥有独立 Profile，包含用户、设备、交互方式、设计调性、内容密度、技术栈、可访问性要求以及选用的若干风格与资产。

## 使用方式

1. 将 `templates/application-profile.json` 复制到目标项目（或仅本地的 `applications/local/`），不要提交实际业务或私有配置。
2. 明确应用场景和界面体验目标，不先假设 SaaS。
3. 通过 `registry/assets.json` 检索参考模式和实现。
4. 从 `registry/styles.json` 选已有风格；若没有合适风格，保持 `selectedStyleIds: []` 并另开风格探索。
5. 对每个组件标注原始视觉绑定、修改要求和依赖。
6. 经用户选定视觉方案后，再做 Demo/页面与实际工程集成。

## 现有示例

[Example Workspace](examples/generic-workspace.json) 是虚构示例，展示如何引用 Refined Light SaaS 和候选资产 ID。并非真实项目，也不是默认风格。

**注意：** 不应自动为所有应用生成同样的侧栏、Dashboard 或顶部工具条。

## V0.8 可选页面模板

通过 [模板目录](../playground/page-blueprints/README.md) 确定应用场景，再运行 `node scripts/compose-page.mjs --list` 和 `node scripts/compose-page.mjs --template=TPL-002 --format=markdown` 生成可提交给 Codex 的页面实施清单。明确区分“独立 HTML/JS 原型”和“React 组件候选”，不得声称页面原型已经自动组合或完成真实业务集成。
