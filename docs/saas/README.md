# SaaS Design Studies · 独立分类

本目录是 **SaaS 类前端资产的长期专题研究**，不是把所有应用都变成 SaaS，更不是宣称某一套视觉适合所有 SaaS。

## 当前研究范围

先完善 **Refined Light SaaS** 的工作台/记录管理场景。通过 [视觉风格档案](../../styles/refined-light-saas/README.md) 引用现有主题，但把交互行为本身记录为跨视觉可借鉴的模式。

1. **结构**：侧栏、工具栏、表格、详情面板的视觉秩序。
2. **数据交互**：搜索、排序、筛选、密度切换、批量操作、撤销。
3. **内容编辑**：详情面板中编辑、验证、取消、保存反馈。
4. **状态可见性**：Loading / Empty / Error / Success；区分无数据和请求未完成。
5. **高效操作**：原有 Cmd/Ctrl+K、Peek/Sheet、右键/菜单行为参考。

## 本轮可体验资产

- [SaaS 专项交互实验页](../../playground/saas-patterns/index.html)
- [详细模式与验收矩阵](pattern-catalog.md)
- [视觉规则及组件规格](visual-recipes.md)
- [SaaS 列表与详情页面配方](../../recipes/saas-operational-list.md)
- [官方来源](../research/sources.md)

## 注意

所有条目先按当前成熟度标记。不因 HTML 有效果就判断为生产验收完成。实验页使用模拟数据，所有保存、归档和错误状态均为本地模拟，**没有后端或真实持久化**。已有初始 Interaction Lab 继续保留，两者承担不同目的。SaaS 之外的未来风格独立建立新研究目录及 Style Profile。

## 下一轮可能拓展（仅待研究）

权限与协作、Form 复杂校验、保存视图的持久化、可调尺寸分栏、批量编辑、导入导出、键盘高效路径、移动端导航、暗色专业 SaaS。未实现的内容不得标记为已交付。
