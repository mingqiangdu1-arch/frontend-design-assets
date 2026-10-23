# SaaS 交互模式目录 · 2026-10-23

这些模式的**行为规格**与特定主题外观分离。当前 [SaaS Pattern Lab](../../playground/saas-patterns/index.html) 是使用 Refined Light 风格构建的独立原型。

## SAAS-001 · Views & Density

**参考：** [Attio 2026 Record Page](https://attio.com/changelog/2026/record-page-redesign)；[Attio Records](https://attio.com/help/reference/attio-101/attios-data-model/understanding-records)

- 起始：全部记录，标准密度。
- 触发：用户选状态视图，列表只呈现匹配集合；密度切换仅影响行高，不丢失状态/搜索/当前选中。
- 完成：更新可见数量与当前视图 aria-selected；用户能一眼识别状态。
- 边界：未保存临时视图不应被误认为共享已保存；切换视图时批量选择的选中范围必须显性显示。
- 验收：视觉密度切换不改变数据或排序；读屏用户可辨认当前视图。

## SAAS-002 · Search & Sortable Table

**参考：** [Geist Table](https://vercel.com/geist/table)

- 输入搜索（本轮本地过滤），状态过滤再排序；改变排序不清空搜索。
- 可排序表头为按钮；切换 asc/desc 时更新 aria-sort、方向图标与行顺序。
- 空筛选显示清除条件，不呈现没有内容的表格。
- 验收：稳定排序、大小写处理、特殊字符不破坏 DOM、键盘 Enter/Space 操作表头；数字和时间等数据遵循实际语义。

## SAAS-003 · Bulk Action + Undo

**参考：** [Linear 批量选择](https://linear.app/docs/select-issues)、[Attio 2026 June](https://attio.com/changelog/2026/changelog-june-29-2026)

- 行级复选框选择，表头仅选择**当前筛选下可见记录**。
- 选择跨筛选保留的情况下，批量栏必须展示**总选中量**，以免隐藏选择导致意外动作。
- 执行“归档演示”只影响本地数据；提供可明确逆转的 Undo；错误时保留选择并给出原因。
- 验收：选择/取消、视图切换、仅当前列表全选、操作之后复原；键盘与触控可操作。

## SAAS-004 · Inspector & Edit Validation

**参考：** [Attio Record Page](https://attio.com/help/reference/managing-your-data/records/create-and-view-records)、[Geist Sheet](https://vercel.com/geist/sheet)

- 由行实体进入侧边详情；其他页面上下文不丢失。
- 编辑采用 **显式 Save/Cancel**（本轮不暗示 AutoSave）；空名称或超长名称产生就地错误提示。
- 本地保存后记录更新、Sheet 关闭、焦点尽可能返回原行按钮；此为 Demo，无持久化。
- Esc、取消与确认有一致的关闭语义；未保存草稿关闭应取消改动。
- 验收：验证失败不改列表数据；成功后有状态提示；窄屏、读屏、焦点恢复需人工复核。

## SAAS-005 · Loading / Empty / Error / Success

**参考：** [Geist Skeleton](https://vercel.com/geist/skeleton)

- Loading：给匹配未来布局的占位，禁止带有错误/保存成功的假信息。
- Empty：分“数据集为空”和“筛选后无匹配”，后者优先“清除筛选”。
- Error：明确发生失败、提供 Retry，避免永久 Spinner。
- Success：明确操作完成，配 Toast 或就地确认，不抢占主要内容。
- 验收：各状态可独立触发和恢复；不可把视觉 Skeleton 当成加载完成。

## SAAS-006 · Contextual Menu / Permissions（研究态）

**参考：** [Geist Menu](https://vercel.com/geist/menu) 与 [Geist Context Menu](https://vercel.com/geist/context-menu)

- 一条记录的局部动作使用可见“更多”按钮触发；高级用户右键菜单必须有等效可见操作入口。
- Esc、点击外部、菜单动作后关闭；键盘可选择、焦点返回。
- 破坏性动作分组且明确对象，权限不足明确说明，不用似乎可以点击但实际上无效的设计。
- **目前仅有文档行为规格，没有声称此模式已实现或通过无障碍验证。**

## 跨模式的共同验收矩阵

| 测试 | SAAS-001 | SAAS-002 | SAAS-003 | SAAS-004 | SAAS-005 |
| --- | --- | --- | --- | --- | --- |
| 鼠标/触控操作 | 是 | 是 | 是 | 是 | 是 |
| 键盘主路径 | 是 | 是 | 是 | 是 | 是 |
| 稳定排序与可见范围 | — | 是 | 是 | — | — |
| 错误/恢复 | — | 是 | 是 | 是 | 是 |
| 小屏 | 是 | 是 | 是 | 是 | 是 |
| Reduced Motion | 是 | — | — | 是 | 是 |

**限制：** 自动化逻辑测试不等于浏览器端完整交互或屏幕阅读器验收。记录具体测试覆盖而不是概括“全部可用”。
