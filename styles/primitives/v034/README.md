# V0.34 · 6 个独立构图 / 视觉 CSS 原子

只提供原创、可选的 CSS class，不提供页面结构、导航事件、交互状态机、React 组件或统一视觉主题。与 [V0.34 研究](../../../docs/research/experience-artifacts-v034.md) 和 [机器索引](../../../registry/experience-artifacts-v034.json) 配套。实际目标项目按需复制最小的单个 class 并验证。

| 原子 | 关联研究 | 保证的视觉作用 | 不保证 |
| --- | --- | --- | --- |
| `.fda34-paired-reading` | REF-081 | 双栏并行阅读，窄屏单栏 | 自动同步两段内容、语义阅读顺序 |
| `.fda34-note-rail` | REF-082 | 正文+侧注的弹性轨道，窄屏单栏 | 关联注释与正文锚点、自动阅读顺序 |
| `.fda34-contact-strip` / `.fda34-contact-stop` | REF-083 | 横向可滚动接触印样列表（proximity 吸附） | 自动章节路由、焦点恢复、可访问标题 |
| `.fda34-editorial-tracks` / `.fda34-track-children` | REF-085 | 12 轨编辑网格与可选 subgrid，窄屏 4 轨 | 布局自动分配、任意跨栏时的顺序 |
| `.fda34-depth-surface` | REF-086 | 局部视觉阴影与 stacking context | 点击/聚焦优先级、界面模态、WebGL |
| `.fda34-orbit-guide` | REF-088 | 无资源请求的径向装饰标尺 | 真地图/真实坐标、可点击星图导航 |

## 取用规则

- 从 [creative-atoms.css](creative-atoms.css) 选最少的声明；每个 class 都使用 `fda34-` 前缀，没有 `:root`、`@import`、远程 URL、第三方媒体或字体。
- 仅对**纯装饰容器**允许 `aria-hidden="true"`；绝不能隐藏真实导航/文字/地图信息。
- 2D 轨道和 SVG/渐变图案可脱离 React 独立使用，**但并不表示** 14 个仓库主题全兼容。
- `subgrid` 提供普通 grid fallback，`contact-strip` 不使用强制 mandatory snap，窄屏提供单列阅读；仍需要真实目标浏览器/触摸/键盘测试。
- 没有把「星图导航」「环形罗盘」做成无语义的 CSS 假控件。这些模式属于研究合同，按需在目标项目设计键盘/触控/URL 状态。
- 强制对比色时去掉轨道阴影和径向装饰；偏好减少动效时禁用可选吸附（本文件本身不提供循环动画）。

**实现成熟度**：仅样式原子；未在实机或多浏览器中验证排版、文字缩放、读屏或组合后的完整界面。
