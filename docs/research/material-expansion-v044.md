# V0.44 · 高级导航、特殊按钮、原生控件、HUD 与技术图形（2026-11-11）

**本轮仅拓展真实素材**：12 个原创、真实写入仓库的 CSS/HTML 组件外观（其中包括可实际操作的单选、复选与折叠控件），加 6 个独立且可编辑的原创 SVG 图形。主索引 **337 → 355 条**。没有继续重复第三方首页目录、Registry 解析器、测试框架或完整网页搭建器。

[机器目录](../../registry/material-expansion-v044.json) · [CSS 源码](../../styles/primitives/v044/interface-atoms.css) · [CSS 展示页](../../playground/interface-atoms-v044/index.html) · [SVG 文件目录](../../graphics/v044/) · [SVG 展示页](../../playground/vector-studies-v044/index.html)

## 1. 十二个实际可提取的 CSS 界面素材

| ID | 独立 CSS Class | 原生 HTML 与边界 | 主题建议 |
| --- | --- | --- | --- |
| **FX-015** Angular cut-corner action / 斜切行动按钮 | `.fx44-cut-button` | 原生按钮/链接承载科幻斜切动作外观 | signal-noir / precision-dark |
| **FX-016** Native segmented radio picker / 原生分段单选器 | `.fx44-segmented` | 真实 fieldset/radio 组合，不需要应用状态脚本 | refined-light-saas / precision-dark |
| **FX-017** Compass directional anchor navigation / 方向罗盘导航 | `.fx44-compass-nav` | 四向锚点导航、可聚焦真实链接 | aether-orbit / signal-noir |
| **FX-018** Ordered visual step rail / 有序步骤轨道 | `.fx44-progress-rail` | 有序步骤、当前步骤和已完成标记 | refined-light-saas / shape-expressive |
| **FX-019** Telemetry status card / 遥测指标卡 | `.fx44-telemetry` | 原生 output 的技术指标展示框架，实际数值由宿主提供 | precision-dark / signal-noir |
| **FX-020** Static HUD reticle / 静态瞄准环 | `.fx44-reticle` | 静态 CSS 准星装饰素材，非真实监测系统 | pixel-arcade / signal-noir |
| **FX-021** Native disclosure shell / 原生折叠面板 | `.fx44-disclosure` | details/summary 原生展开收起与焦点支持 | editorial-warm / organic-tactile |
| **FX-022** Chronological event timeline / 时间事件节点轨道 | `.fx44-event-timeline` | 基于 ol/time 的可访问时间线框架 | type-led-minimal / refined-light-saas |
| **FX-023** Native filter toggle chips / 原生筛选标签 | `.fx44-filter-chip` | 原生 checkbox 可切换的胶囊筛选外观，无自动业务过滤 | playful-pop / refined-light-saas |
| **FX-024** Semantic terminal viewport / 终端输出面板 | `.fx44-terminal` | 只读代码/日志外观，搭配真实 pre/code，不执行内容 | precision-dark / signal-noir |
| **FX-025** Native level meter HUD / 原生等级仪表 | `.fx44-level-meter` | 真实 meter 承载语义数值，五格仅为装饰 | pixel-arcade / signal-noir |
| **FX-026** Pixel arcade badge / 像素游戏徽章 | `.fx44-pixel-badge` | 低分辨率像素边角徽章，语义仍是可选取文字 | pixel-arcade / playful-pop |

### 交互是真的还是示意？

- `.fx44-segmented` 使用真正的 `fieldset`、`legend`、同名 radio；`.fx44-filter-chip` 使用 native checkbox；`.fx44-disclosure` 使用 `details/summary`，这些在独立页面里确实可以操作，不需要写 JavaScript 状态处理。
- `.fx44-cut-button` 的样张是真实 `<a>`，跳转页内已有区块；`.fx44-compass-nav` 中的四个箭头链接也有明确 `href`，但不是实现完整二维键盘导航的复合网格。
- 进度轨道、时间线、数值遥测卡、终端窗口、准星以及游戏等级条**只提供原生 HTML 结构与视觉素材**。宿主负责真实数据、状态变化和业务命令。`.fx44-level-meter` 使用 `<meter>` 传达真实值，彩色格仅作装饰，不将纯色当作唯一信息渠道。
- 所有组件只用 `fx44-*` 类和可选 CSS 变量；没有外部图片、字体、脚本、全局主题或 npm 包；提供键盘焦点、减少动效、强制系统颜色的基础降级。不能从示意页推断已经具备生产级可访问性认证。

## 2. 六个原创可直接引用的 SVG 源文件

| ID | 文件 | 视觉结构 | 建议应用 |
| --- | --- | --- | --- |
| **VG-007** Radar Scope / 雷达扫描盘 | [radar-scope.svg](../../graphics/v044/radar-scope.svg) | 静态扫描扇区、同心雷达圈与信号点 | simulation / game-companion |
| **VG-008** Circuit Traces / 电路走线图 | [circuit-traces.svg](../../graphics/v044/circuit-traces.svg) | 电路板布线、中央处理器与连接点 | hardware / developer-tool |
| **VG-009** Arcade Medal / 像素奖章 | [arcade-medal.svg](../../graphics/v044/arcade-medal.svg) | 像素风金色成就奖牌与彩色飘带 | game-companion / gamification |
| **VG-010** Signal Waveform / 合成波形 | [signal-waveform.svg](../../graphics/v044/signal-waveform.svg) | 合成示意图中的 oscilloscope 波形和峰值标记 | analytics / tech-brand |
| **VG-011** Compass Rose / 罗盘玫瑰 | [compass-rose.svg](../../graphics/v044/compass-rose.svg) | 黄铜色八向罗盘图腾 | maps / storytelling |
| **VG-012** Isometric Cluster / 等轴方块簇 | [isometric-cluster.svg](../../graphics/v044/isometric-cluster.svg) | 四个彩色立体模块的矢量组合 | creative-tool / education |

每个 SVG 为独立 `640×360` 矢量文件，包括 `title` 和 `desc`，不用第三方字体、远程图片、JS 或嵌入外部 SVG。雷达扫描、波形与电子电路是 **原创装饰/概念图**，不是实际数据接口的渲染结果。目标应用可将文件用作背景、配图、单独作品或创意项目素材；仍需根据用途判断替代文本与配色。

## 3. 登记与复用方式

- 新增 FX-015..026、VG-007..012 共 **18 个 `reference-implemented / styled-implementation / copyable-source`** 条目。与历史的纯研究型 REF 条目不同，这批每个都有真实的原创代码/文件可取用。
- 保留 48 个 React 公共导出、14 套独立主题、`defaultStyleId:null`，且没有改变任何宿主项目。
- 没有添加新 Node/Playwright 测试套件；只使用原有 CI 验证索引与已登记文件引用，素材的视觉验收仍需要目标项目完成。
- 高级导航和游戏 HUD 均作为独立组件/图形积累，不组装成完整的 dashboard、网页编辑器、游戏界面或 Agent 平台。

## 4. 下一轮素材机会

可继续补真实的独立组件外观与矢量图形，如**移动底部导航、圆形选择菜单、音频可视化条、无边框表单、地图标注、组件拆分状态（empty/loading/error）和手势反馈图形**。仍保持素材仓库、代码实物和主题独立的边界。
