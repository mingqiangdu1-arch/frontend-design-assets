# Refined Light SaaS

**唯一已整理的视觉系列之一，不是整个素材仓库的默认视觉。**

灵感：Attio 的浅色空间感 / Vercel 的文字秩序 / Linear 的部分高效交互。面向偏工作台的设计探索，**不适用于所有未来应用**。

## 设计资源

- [视觉规范](../../docs/visual/refined-light.md)
- [语义 Token CSS](../../tokens/refined-light.css)
- [Token JSON](../../tokens/refined-light.json)
- [独立 HTML 交互实验室](../../playground/initial-interaction-lab.html)
- [早期 React 参考代码](../../components/reference/README.md)

## 视觉作用域

CSS 变量仅在以下容器内生效：

```html
<div data-design-theme="refined-light-saas"> ... </div>
```

这一约束避免不同设计系列互相污染。已有 HTML Demo 采用内部样式，是**自包含历史示例**，并未自动改造为通用多主题系统。已有 React 参考组件依赖 `aw-` 类名，真实集成需要手动检查主题边界、弹窗 Portal、暗色适配和完整交互行为。

## 状态与迁移

`DT-001` 仍指向此设计方向，保留旧 Token 文件路径以免破坏链接。未来如新增“编辑器深色”或“消费级活泼”风格，创建另一个 `styles/<id>/`，不要覆盖本系列。

## 不建议跨场景直接搬用

固定左侧 240px 导航、36px 控件、低饱和背景、表格密度等都与工作台特性密切相关。引用到游戏、移动、内容、营销场景时必须独立评估。
