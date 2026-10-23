# Playful Pop · 独立视觉风格

**资产：DT-004 · 状态：design proposal / prototype-only · 与其他风格隔离**

Warm bright consumer interface, saturated coral and sky accents, rounded cards, chunky buttons, tactile layered strokes and immediate positive feedback.

## 参考来源
- https://blog.duolingo.com/shape-language-duolingos-art-style/
- https://blog.duolingo.com/core-tabs-redesign/

外部来源仅用于观察布局和交互规律。色值、比例、命名和示例均为**本仓库原创提案**，不冒充参考产品的官方 Token。

## 使用方式

- [结构化 Token](tokens.json)
- [作用域 CSS](tokens.css)
- [设计风格互动预览](../../playground/style-explorer/index.html)

在目标页面明确包裹 `<section data-design-theme="playful-pop">...</section>` 并单独载入 `tokens.css`。**不要**将这些变量写入全局 `:root`，不要自动混用另一个系列的组件。

## 设计参数

- Base: #F3F7FE; Surface: #FFFFFF; Text: #26314D; Accent: #FF785D.
- Density/layout: mobile-first hero + tiled actions; comfortable.
- Radius: 14/24/999px（control/panel/pill）.
- Motion: 150/260ms（fast/medium，提案数值而非实测品牌参数）.
- Type: system rounded sans 30px/38 800; system sans 15px/24 500.

### Layout and behavior

- Mobile-first, high contrast, friendly rounded modules. Avoid simply applying bright paint to desktop tables.
- Large 44px+ touch targets; tactile button press, clear success/try-again feedback, and progress indicator with explicit text.
- Hero or lesson title leads; task choices follow. One focal action per screen. Avoid multiple competing vibrant sections.
- Restrict motion to intentional rewards and interaction feedback; respect prefers-reduced-motion.
- No Duolingo artwork/mascot/trademarks is packaged. Illustration must be original or appropriately licensed.

## 验收条件与边界

- 对比 390 / 768 / 1440px，在屏幕尺寸变化时仍保留正确的信息层级。
- 文本/焦点对比度、键盘、触控、减少动画模式独立检查；本阶段未完成真实业务产品验收。
- `tokens.json` 是设计建议，不是严格 W3C DTCG 格式实现；应用时再适配设计系统构建工具。
- `style-explorer` 仅展示风格区别与小型交互；不代表已有生产级组件库。
