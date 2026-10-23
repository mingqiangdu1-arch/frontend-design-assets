# PR-004 · SaaS Operational List with Inspector

**Status:** `prototype`，仅 Refined Light SaaS 组合实验；不等于 AI WORKFLOW PLATFORM 已集成。

## 组合配方

`DT-001`（Refined Light Tokens）+
`SAAS-001`（视图/密度）+
`SAAS-002`（搜索/排序）+
`SAAS-003`（可逆批量操作）+
`SAAS-004`（Inspector 编辑与验证）+
`SAAS-005`（状态矩阵）。

可参考 `IP-001` 的全局命令菜单，但**不能在列表过滤框截获 Cmd/Ctrl+K**。

## 页面层次

左导航 → 56px 顶栏 → 页面标题与主操作 → 筛选与密度工具栏 → 数据表 → 详情面板。不要 KPI 大卡堆砌，不强行使用数据统计图，不对所有 UI 上色。

## 本轮 Demo

[打开 index.html](../playground/saas-patterns/index.html)，用本地 HTTP server 访问（建议），浏览器中体验过滤、排序、切换行密度、勾选多条、可逆归档、详情编辑、无效输入和 4 类状态。页面数据全部模拟，刷新不会保存。

## 应用到新项目之前

根据业务权限与数据量决定是否服务端分页/排序，批量事务是否可撤销，详情是 Sheet 还是完整页面，什么时候需要草稿丢失确认，窄屏可读性。禁用“直接复制 Demo 作为正式页面”的做法。
