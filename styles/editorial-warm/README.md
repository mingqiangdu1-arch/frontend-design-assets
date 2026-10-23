# Editorial Warm · 独立视觉风格

**资产：DT-003 · 状态：design proposal / prototype-only · 与其他风格隔离**

Calm cream-paper reading surface, dark ink, serif display headlines, generous vertical rhythm, underlined links and restrained editorial dividers.

## 参考来源
- [private-notion-link-redacted]
- https://support.substack.com/hc/en-us/articles/360055169471-How-do-I-set-a-custom-theme-for-my-Substack

外部来源仅用于观察布局和交互规律。色值、比例、命名和示例均为**本仓库原创提案**，不冒充参考产品的官方 Token。

## 使用方式

- [结构化 Token](tokens.json)
- [作用域 CSS](tokens.css)
- [设计风格互动预览](../../playground/style-explorer/index.html)

在目标页面明确包裹 `<section data-design-theme="editorial-warm">...</section>` 并单独载入 `tokens.css`。**不要**将这些变量写入全局 `:root`，不要自动混用另一个系列的组件。

## 设计参数

- Base: #F8F5EE; Surface: #FFFDF8; Text: #27241F; Accent: #A04B2A.
- Density/layout: reading column + optional aside; airy.
- Radius: 4/3/3px（control/panel/pill）.
- Motion: 140/220ms（fast/medium，提案数值而非实测品牌参数）.
- Type: Georgia or serif 48px/56 500; Georgia/serif 17px/29.

### Layout and behavior

- Use a ~720px readable text column and optional slim footnotes/contents rail; headings and article cards rely on typography and whitespace instead of rounded dashboards.
- Serif display headings + highly readable body copy, with sans for controls/eyebrows. Chinese serif fallback may require testing on each OS.
- Links remain recognizable with underline, hover is understated; reading focus action may collapse the aside without losing context.
- Separate publication home (editorial hero + article teasers) from an actual reading page; do not force a left SaaS sidebar.
- Exclude autoplay, popups during reading, and strong UI transition movement.

## 验收条件与边界

- 对比 390 / 768 / 1440px，在屏幕尺寸变化时仍保留正确的信息层级。
- 文本/焦点对比度、键盘、触控、减少动画模式独立检查；本阶段未完成真实业务产品验收。
- `tokens.json` 是设计建议，不是严格 W3C DTCG 格式实现；应用时再适配设计系统构建工具。
- `style-explorer` 仅展示风格区别与小型交互；不代表已有生产级组件库。
