# Precision Dark · 独立视觉风格

**资产：DT-002 · 状态：design proposal / prototype-only · 与其他风格隔离**

Information-dense charcoal desktop interface with muted navigation, restrained violet focus, quiet outlines, compact rows and keyboard-first operations.

## 参考来源
- https://linear.app/now/behind-the-latest-design-refresh
- https://manual.raycast.com/settings
- https://manual.raycast.com/themes

外部来源仅用于观察布局和交互规律。色值、比例、命名和示例均为**本仓库原创提案**，不冒充参考产品的官方 Token。

## 使用方式

- [结构化 Token](tokens.json)
- [作用域 CSS](tokens.css)
- [设计风格互动预览](../../playground/style-explorer/index.html)

在目标页面明确包裹 `<section data-design-theme="precision-dark">...</section>` 并单独载入 `tokens.css`。**不要**将这些变量写入全局 `:root`，不要自动混用另一个系列的组件。

## 设计参数

- Base: #101014; Surface: #17171D; Text: #F3F2F7; Accent: #A78BFA.
- Density/layout: dense 3-column desktop; compact.
- Radius: 7/9/6px（control/panel/pill）.
- Motion: 100/170ms（fast/medium，提案数值而非实测品牌参数）.
- Type: system sans 26px/32 650; system sans 13px/20 400.

### Layout and behavior

- Dense 210px navigation + content list + right-side contextual inspector for advanced desktop workflows; avoid oversized marketing cards.
- Dark surfaces are differentiated by 1px contrast and tonal steps, not neon glow. Accent on current focus/selected action only.
- 36–40px list rows; use numeric alignment, accessible shortcuts and focus ring; command palette is an optional enhancement, not sole entry point.
- Motion: quick hover and content previews. Reduce or remove animations for rapid sequential keyboard operations.
- Never clone Linear's proprietary UI/screenshots or its brand assets. Note the 2026 redesign guidance around dimming passive navigation.

## 验收条件与边界

- 对比 390 / 768 / 1440px，在屏幕尺寸变化时仍保留正确的信息层级。
- 文本/焦点对比度、键盘、触控、减少动画模式独立检查；本阶段未完成真实业务产品验收。
- `tokens.json` 是设计建议，不是严格 W3C DTCG 格式实现；应用时再适配设计系统构建工具。
- `style-explorer` 仅展示风格区别与小型交互；不代表已有生产级组件库。
