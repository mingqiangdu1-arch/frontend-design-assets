# 多应用、多视觉风格的素材架构

## 定义

**Repository ≠ Design System ≠ App Template ≠ Component Library**。

- **Repository**：跨所有产品与风格收集素材、信息、原型和实现。
- **Style Profile**：一套相对自洽的视觉语言（Typography/Color/Spacing/Motion/Imagery/Layout Density），独立定义。
- **Interaction Pattern**：与颜色无关的交互行为描述，复用须结合设备、用户和上下文校验。
- **Styled Component**：拥有确切外观与技术栈的代码资产，通常只适用于特定 Style Profile。
- **Application Profile**：某个真实产品的需求/目标/受众/设备/技术栈和资产选择结果，可同时引用多个风格但必须说明边界。
- **Recipe**：根据具体问题组合设计的说明，不保证可运行或适合其他应用。

## 按需求选设计，而不是反过来

先确认**用户与场景 → 操作模式 → 信息密度 → 输入设备 → 品牌调性 → 界面风格 → 组件实现**。

| 应用场景（示例，非固定分类） | 可能特点 | 不应预设 |
| --- | --- | --- |
| 管理工作台、企业协作 | 结构化列表、快捷操作、状态反馈 | 不必一律浅色或极简 |
| 消费级应用 / 社区 | 个性表达、内容传播、移动触控 | 不必复用密集表格/侧栏 |
| 电商 / 营销 | 商品视觉、CTA 层级、信任与转化 | 不应套用工作台顶部栏 |
| 内容 / 阅读 / 写作 | 排版、舒适行长、沉浸或专注 | 不应强制多卡片 Dashboard |
| 游戏工具 / 娱乐 | 高信息密度、游戏主题、沉浸反馈 | 不应默认克制灰白 |
| 创意工具 / 编辑器 | 画布、上下文工具栏、拖拽、快捷键 | 不应从普通表单布局出发 |
| 数据分析 / 专业工具 | 精确视觉编码、图表、键盘效率 | 不应为了极简隐藏重要信息 |
| 移动轻工具、官网 | 屏幕与交互差异显著 | 不应把桌面组件缩小即算适配 |

这仅是**可扩展筛选维度**；无需为每种应用强制建立文件夹。新项目可跨分类或自定义标签。

## 风格隔离与复用层级

- **无风格绑定：** 用户意图、流程、命令菜单语义、错误恢复、可访问性、键盘导航，可跨项目借鉴但要重新设计外观。
- **风格绑定：** 颜色、字体、圆角、间距、图标语言、动画节奏和组件具体外观，需依赖某个 Style Profile。
- **应用绑定：** 页面信息架构、内容、业务流程、布局、性能要求等，由 Application Profile 确定。

建议资源检索顺序：`registry/assets.json` → 基于目的筛选 `reuseKind` → 根据 `styleIds` 与 `applicationContexts` 核验适用性 → 选择 `registry/styles.json` → 找明确兼容实现 → 做独立试验 → 集成测试。

## 推荐元数据

```json
{
  "id": "UI-123",
  "type": "component",
  "reuseKind": "styled-implementation",
  "styleIds": ["refined-light-saas"],
  "applicationContexts": ["workspace"],
  "dependencies": ["DT-001"],
  "stage": "reference-implemented",
  "path": "components/example/Component.tsx"
}
```

`styleIds: []` 表示这个**参考/行为概念**不预先绑定某套视觉风格；**不等于某份实际 CSS 代码通用于所有主题**。`applicationContexts: []` 表示不限定当前已列场景，绝非已经验证全部场景。Demo 若与特定风格绑定，单独标 `demoStyleId`。

## 风格边界

- 首套 `refined-light-saas` 仍保留，只是不再作为全仓库默认。
- 每套 Style Profile 指向**自己的** Token 和视觉规范；未来可以有多套配色方案、排版体系或动画体系。
- 现有 `tokens/refined-light.css` 为历史路径，已通过 `data-design-theme` 属性限定作用域。不能在其他应用直接导入后期待全局生效。
- 不要因“都是按钮”就把它们合并为完全统一的 API；底层行为一致与视觉表现一致是两回事。

## 渐进式迭代与版本原则

新增风格：建立独立 Profile → 来源与示例 → Token → Demo → 可选实现 → 校验。若只是收藏截图则只需资产条目，不需要虚构主题代码。

新应用：先在 `applications/` 记录 Profile，再按需组合已存在的风格/行为。一个应用可能有混合视觉区，但需明确导航、页面或组件区域的风格范围，禁止相互覆盖全局 CSS。

现阶段没有强制 Storybook、统一前端框架、多主题运行时或第三方设计系统发行计划。复杂度跟随真实需求增长。
