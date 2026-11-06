# 公开发布前审查清单 · Publication readiness

**当前结论（2026-11-06，main 快照）**：仓库仍为 `private`。**尚不建议直接切换为 Public**。此文件是发布门禁与风险清单，不代表已经完成法律/安全审计。

## 快速盘点（仅代表本轮仓库检查）

- 318 个文件、62 个目录，共 380 个 Git tree 条目。
- 180 个注册资产，含 45 个实际 React 导出、10 套视觉风格、7 个页面模板。研究/原型/参考实现与生产就绪是不同状态；当前没有项目声称生产认证。
- `registry/assets.json` 中 **106 个资产含 `notion` 字段**，且根 README 和部分文档有 Notion 深链接。公开仓库会暴露页面 ID/工作区结构线索；其页面是否可访问还取决于 Notion 权限。
- **仓库根目录未发现 LICENSE 文件**。注册表中约 100 个资产缺少逐条 `license` 字段，这不能自动推导为侵权，但表明出处与复用许可尚未完备。
- `applications/examples/ai-workflow-platform.json` 是个人项目相关的应用配置示例；示例中的名称、决策、候选 ID、Notion 链接应独立评估。
- 本次目录检查未发现明显命名为 `.env`、credential 或私钥的文件；**尚未完成逐文件内容、Git 历史、CI 变量、Issue/PR/构建产物的秘密扫描**。

## P0：切 Public 之前必须处理

| 检查项 | 建议动作 | 完成标准 |
| --- | --- | --- |
| 个人/内部知识链接 | 将 `README.md`、`AGENTS.md`、`docs/**`、`registry/assets.json` 的 Notion 深链接审核分级；公开版本去除私有页地址，必要时只保留无敏感 ID 的公开引用 | 公开 checkout 没有不该披露的链接、项目资料或账号标识 |
| 仓库级许可 | 根据真实源码归属、第三方依赖与复用诉求选择 LICENSE；配套 `THIRD_PARTY_NOTICES.md` / ATTRIBUTION（如适用） | 版权人确认许可，且代码/文档/图片授权不混淆 |
| 第三方素材来源 | 逐一核对 `docs/research/sources.md`、`registry/assets.json` 的外部来源和每项复用说明；确认没有直接复制受限制的截图、字体、图标、付费组件与 Skill 源码 | 可公开的原创实现和仅供参考的 URL 清楚区分 |
| 敏感信息与历史 | 检查所有分支、提交历史、PR、Issue、workflow、artifact 中的密钥/真实数据/内部路径/账号信息；若暴露先轮换密钥 | 历史扫描完成，敏感数据移除且相关凭证已轮换 |
| 公开发布演练 | 用独立的干净 checkout / 镜像项目在本地或 CI 运行可用检查；人工评审 README、入口、素材引用、使用权限声明 | 从新用户角度能发现正确素材且不会误认「生产就绪」 |

**重要：仅将文件移入 `archive/`、删除文件或对文件加 `.gitignore`，都不能让已提交的内容从 Git 历史消失。** 如果历史含不宜公开的数据，应先完成安全处置，再考虑清理历史或从审核后的文件集创建新的干净公开仓库。不要在未评估的情况下强推改写共享历史。

## P1：建议与公开同时完成

- 为贡献者提供 `CONTRIBUTING.md`：资产 ID、`stage`、`reuseKind`、来源、许可、验收证据、PR 流程。
- 将新手入口控制在 README + [Agent Catalog](../CATALOG.md)；详细版本记录集中在 `CHANGELOG.md` / `archive/`。逐步缩短 `AGENTS.md` 的重复版本叙述，但保留关键行为边界和安全原则。
- 修改元数据滞后：`registry/components.json.stateCoverage` 历史叙述应明确「旧矩阵只覆盖 12 个导出；当前共有 45 个 React 导出」，防止误解。根 `package.json` 的 `version: 0.13.0` 与注册表 V0.24.0 需明确版本是否独立，而不是草率同步。
- 为高价值条目增加中英文 `aliases`、任务/场景标签、必要依赖、准确源路径与最小 Demo；检索回退应明确「无匹配」，不能伪造生产覆盖。
- 对外宣传采用 **living design lab / design references / experimental React components**，不要宣称所有 180 条资产可运行、跨风格无缝复用，或已完成视觉/无障碍认证。

## 什么应该留在公开主仓库、归档或移出

| 处置 | 内容 | 原因 |
| --- | --- | --- |
| **保留主干** | `registry/` 当前索引、`packages/ui/` 可验证源码、`styles/`、高价值 `recipes/`、当前页面 Demo、必要 `tests/` 和 `scripts/` | 这是 Agent 找到并复用资产的主入口 |
| **公开归档** | 旧版演示、阶段性实验、历史复盘、过期手册/使用提示；保留原始来源、成熟度与继承关系 | 有研究价值，但不应优先参与「现成实现」候选 |
| **私有存放，别提交到公开 Git 历史** | 私有 Notion 索引映射、内部项目配置、客户/个人数据、未获公开授权的截图及素材 | 普通 `archive/` 仍公开，必须放私有知识库/私有仓库 |
| **暂缓公开，先核查** | License 不清晰的第三方组件、外部 Skill 材料、真实业务示例及缺少权限说明的参考图片 | 不应以「研究」标签替代合法授权 |

## 轻量维护流程（GitHub-only）

1. 新资源先以 `captured` / `analyzed` 登记，来源字段与 `reuseKind` 保守填写。
2. 只有存在可定位的源码时才标记 `styled-implementation`；能在参考 Gallery 运行不等于生产可用。
3. 原始实验可由 `KIT-` 或其他稳定 ID 指向历史位置；整理路径须同步修复 Registry 的 `path`/`spec`/`demo`。
4. 每次版本阶段完结仅在 `CHANGELOG.md` 留可追溯摘要；不要无限追加 README/AGENTS 的开头。
5. 合并后验证注册表与关键静态路径；需要改变语义的重构另开 PR、避免一次搬迁整个目录树。

此清单**不会自动对当前私有仓库进行公开操作**。发布许可与历史安全审计仍需显式完成。
