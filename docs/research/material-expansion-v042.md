# V0.42 · 前端真实素材拓展：组件来源 × 视觉效果（2026-11-11）

**战略纠偏**：本轮不再把新增三项模型加十几组测试当成主要产出，而是直接扩大资产覆盖：**13 个来自 GitHub 官方仓库的不同素材来源 + 6 个可直接阅读/复制的原创 CSS 视觉效果**。主资产从 296 → 315 条。每个来源都可独立检索，不需要在仓库里组装页面或引入运行时。

[结构化素材目录](../../registry/material-expansion-v042.json) · [CSS 源码](../../styles/primitives/v042/material-effects.css) · [六种视觉效果样张](../../playground/material-effects-v042/index.html)

## 一、新增 13 个具体来源

| ID | 来源（固定 Commit） | 原创筛选价值 | 许可/落地注意 |
| --- | --- | --- | --- |
| **REF-111** | [Cult UI / animated shadcn-compatible components](https://github.com/nolly-studio/cult-ui) (`d71b1428b`) | shadcn registry components; shift-card, globe, Kanban, fluted-glass and device mockup examples; source-first selection | Repo MIT; Tailwind v4 and Motion likely; check item-level dependency and visuals |
| **REF-112** | [Motion Primitives / restrained interface motion](https://github.com/ibelick/motion-primitives) (`120f64f6c`) | Low-level composable micro-interactions and transitions suited to calm product interfaces rather than full promotional blocks | Repo MIT; Project README notes beta; verify per-component API and reduced-motion before adoption |
| **REF-113** | [Spectrum UI / broad animated component catalog](https://github.com/arihantcodes/spectrum-ui) (`acdc998c6`) | Large React/Tailwind/Motion component and page-block source; browse concrete snippets and MCP descriptions as optional discovery surface | Repo Apache-2.0; Project describes derivatives/usage of other UI libraries: license and attribution must be checked for each reused component |
| **REF-114** | [Magic UI / motion-forward landing accents](https://github.com/magicuidesign/magicui) (`1ac985adc`) | Marketing presentation details and decorative animated UI; investigate bento-grid, highlighted text and hero effects as individual parts | Repo MIT; Free repository license is not the same as separate premium templates; evaluate performance and motion reduction |
| **REF-115** | [Fancy Components / playful microinteraction kit](https://github.com/danielpetho/fancy) (`f9f62c612`) | Experimental playful React affordances and microinteractions, useful for unexpected menus, buttons and tactile feedback | Repo MIT; Avoid sacrificing keyboard accessibility or copying full documentation site; inspect individual source and dependencies |
| **REF-116** | [Number Flow / animated numeric typography](https://github.com/barvian/number-flow) (`c5906cf35`) | One-purpose animated number transitions for changing KPIs, quantities, clocks, counters across React/Vue/Svelte/JS | Repo MIT; Check locale, decimals, sign, large updates, reduced motion and framework-specific API |
| **REF-117** | [visx / low-level chart primitives](https://github.com/airbnb/visx) (`485c03596`) | Composable D3 + React visualization geometry and chart foundations; source-level shapes and axes instead of preset dashboards | Repo MIT; README states visx v4 needs React 18 or 19; check package composition and accessibility |
| **REF-118** | [Nivo / ready-made React data visualization](https://github.com/plouc/nivo) (`0dae2c320`) | Declarative interactive React charts built above D3, including chart variants and a public playground | Repo MIT; Check selected @nivo package, SSR support, performance and component license independently |
| **REF-119** | [Unovis / cross-framework visualization](https://github.com/f5/unovis) (`002633e53`) | Charts, maps and network graph visuals with framework adapters and vanilla TS options | Repo Apache-2.0; Check adapters, dataset scale, required map assets and license of any imagery/data |
| **REF-120** | [Theatre.js / editable motion timeline concepts](https://github.com/theatre-js/theatre) (`6ea82b938`) | Web motion timeline/editor and parameter sequencing vocabulary as design material for expressive transitions | Repo Apache-2.0; Pinned repository commit is from 2024; validate current maintenance and integration separately; no editor embedded |
| **REF-121** | [React Spring / spring-based interface dynamics](https://github.com/pmndrs/react-spring) (`83e476061`) | Cross-platform spring physics motion engine; reusable gesture and transition recipes rather than finished shadcn components | Repo MIT; Motion engine not a ready-to-use UI component gallery; tune overshoot, cancellations and reduced motion |
| **REF-122** | [Arwes / sci-fi interface grammar](https://github.com/arwes/arwes) (`bdbaa0324`) | Science-fiction UI framework for cockpit HUD, animated frame and fictional control surface visual vocabulary | Repo MIT; Specialized visual grammar; check active branch/version and avoid forcing into ordinary enterprise interfaces |
| **REF-123** | [Vaul / mobile sheet gesture reference](https://github.com/emilkowalski/vaul) (`3e97aac6a`) | React drawer and bottom-sheet interaction reference with mobile touch handling | Repo MIT; Repository README explicitly says unmaintained; use study-only and prefer maintained options for production |

### 结构差异：怎样按任务调用

**营销/视觉实验**：Cult UI (REF-111) 偏可用的动效区块、复杂卡片/玻璃/设备模型；Magic UI (REF-114) 偏营销表现；Fancy Components (REF-115) 偏趣味微交互；Spectrum UI (REF-113) 偏大量源码和 Agent 发现入口。不要把它们混为一种统一视觉方案。

**日常产品微交互**：Motion Primitives (REF-112) 优先研究克制过渡；Number Flow (REF-116) 是对 KPI/价格数字变化的单项组件；react-spring (REF-121) 是动画引擎，不是开箱 UI 成品；Vaul (REF-123) 是抽屉触摸交互旧参考，但其 README 已声明项目不维护，应作为低优先参考。

**数据可视化**：visx (REF-117) 优先自定义几何/轴/图元；nivo (REF-118) 优先成熟声明式图表；Unovis (REF-119) 更适合跨框架、地图或网络图。不能通过“都有图表”就误判为同一套可替换组件。

**特殊界面**：Theatre.js (REF-120) 提供动画时间轴与参数编排语言；Arwes (REF-122) 提供科幻 HUD 的设计参考。前者是创作工具，后者是高度具体的艺术方向，均不要强行作为 SaaS 默认主题。

## 二、六个已落地的原创 CSS 视觉素材

| ID | 单独可引用 Class | 适合风格 | 典型用途 |
| --- | --- | --- | --- |
| **FX-001** | `.fx42-fluted-pane` | liquid-layer / organic-tactile | Fluted acrylic pane / 条纹亚克力：original standalone CSS source |
| **FX-002** | `.fx42-prism-frame` | aether-orbit / signal-noir | Static prism frame / 静态光谱边框：original standalone CSS source |
| **FX-003** | `.fx42-perforated-ticket` | commerce-atelier / organic-tactile | Perforated ticket / 撕线票券：original standalone CSS source |
| **FX-004** | `.fx42-ink-stamp` | paper-rebellion / editorial-warm | Offset-print stamp / 印刷印章：original standalone CSS source |
| **FX-005** | `.fx42-orbit-marker` | aether-orbit / signal-noir | Orbit chapter marker / 轨道章节标识：original standalone CSS source |
| **FX-006** | `.fx42-margin-note` | editorial-warm / type-led-minimal | Editorial margin note / 杂志边注：original standalone CSS source |

以上 6 个不是“链接/研究笔记”，而是确实写入仓库的 **原生 CSS 源码**，并有一个仅展示它们的独立 HTML 标本。每个 Class 皆可选取、无需 JS、图片、字体文件或外部库；CSS 仅作用于对应类，提供 `prefers-reduced-motion` 和 `forced-colors` 降级，不设置全局设计系统。

## 三、版权、来源与等级

- 13 个外部来源记录官网 GitHub、当日仓库 Commit、GitHub 显示的仓库许可及差异化用途。**主索引均为 analyzed / design-reference / research-only**。没有批量复制第三方组件、站点图像、字体或媒体。
- Spectrum UI 可能包含对其他组件库的改写或引用；其仓库许可证不等于每一条外部素材都可以二次分发。Sora UI 等条款不清楚的未纳入本轮主目录。
- 6 个原创源码资产是 reference-implemented / styled-implementation / copyable-source，但仅表示存在可参考的 CSS 实现；**不是 6 个已经发布的 React npm 组件**。通过真实目标应用的视觉、语义、性能与输入设备验证才能生产使用。
- Vaul 当前仓库 README 自述 unmaintained，登记为 P2 研究用参考，优先考虑更新的官方和可维护组件。
- 本轮**没有新增重复的 Node/Playwright 测试矩阵**；仅保留仓库已有的资产索引存在性、ID 和引用完整性基础校验。

## 四、可继续拓展的具体方向

下一轮按资产缺口增加**现成 UI 形态/组件卡片级索引**（例如 fluted glass card、dynamic island、精密数字、网络图、移动 sheet），必要时补少量原创 SVG/CSS 参考。只有真正提升复用检索能力时才加元数据，**不再用连环测试和模型包装替代素材积累**。
