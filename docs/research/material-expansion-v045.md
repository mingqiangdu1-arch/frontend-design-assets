# V0.45 · 移动端、音频和界面状态素材拓展（2026-11-12）

本轮坚持 **material-first**：新增 10 个可独立提取的原创原生 CSS 组件、4 个独立 SVG 和 5 个上游来源明确的研究参考。前一版本登记数 355；本轮新增 19，预计 **374**。不继续建设页面生成器、自动化测试框架或重复组件目录。

## 实际素材

- **FX-027** Safe-area mobile bottom navigation / 安全区底部导航: `.fx45-bottom-nav`，mobile/navigation；主题 refined-light-saas, precision-dark。Real anchor navigation, aria-current; safe-area padding. No router.
- **FX-028** Native touch scroll-snap rail / 原生滑动吸附卡轨: `.fx45-snap-rail`，mobile/scroll；主题 shape-expressive, playful-pop。Actual native horizontal scrolling/snapping; no custom drag gesture.
- **FX-029** Tactile press feedback link / 触感按压反馈: `.fx45-press-button`，mobile/feedback；主题 playful-pop, pixel-arcade。Real anchor/button :active visual; no long-press or haptics.
- **FX-030** Native disclosure action row / 可展开行操作: `.fx45-action-row`，mobile/actions；主题 refined-light-saas, editorial-warm。Native details/summary reveal, not swipe detection.
- **FX-031** Waveform range position control / 波形进度滑杆: `.fx45-wave-scrubber`，audio/slider；主题 signal-noir, precision-dark。Functional native range, synthetic bars; not wired to audio.
- **FX-032** Transcript cue list / 转写时间锚点: `.fx45-transcript-cues`，audio/transcript；主题 type-led-minimal, editorial-warm。Native timestamp links; actual media sync supplied by host.
- **FX-033** Voice session indicator / 语音状态指示: `.fx45-voice-status`，audio/status；主题 precision-dark, signal-noir。Illustrative status, not a recorder or microphone permission.
- **FX-034** Map marker cluster graphic / 地图聚合点: `.fx45-map-cluster`，mapping/marker；主题 refined-light-saas, playful-pop。Visual count marker only, no map, geodata or click logic.
- **FX-035** Empty-state action card / 空状态引导卡: `.fx45-empty-state`，feedback/empty；主题 organic-tactile, refined-light-saas。Real CTA link; must supply actual destination and status semantics.
- **FX-036** Reduced-motion loading skeleton / 降动效骨架屏: `.fx45-skeleton`，feedback/loading；主题 refined-light-saas, editorial-warm。Visual placeholder only; separate accessible status required; host controls visibility.

[CSS 原文件](../../styles/primitives/v045/mobile-audio-states.css) · [独立 HTML 示例](../../playground/mobile-audio-states-v045/index.html)

**VG-013..016:** 独立矢量源 [触控轨迹](../../graphics/v045/touch-gesture-arcs.svg)、[音频标记](../../graphics/v045/audio-annotation-grid.svg)、[地图聚合](../../graphics/v045/clustered-map-pins.svg)、[空状态植物](../../graphics/v045/empty-state-garden.svg)。这些是原创概念插画而非真实音频峰值、街道地图、设备传感器或用户输入。

## 上游研究参考（仅链接，不拷贝第三方代码）

- **REF-132 — magic-spells/sheet:** 原生 `dialog` + Web Components 的移动 bottom sheet、吸附位置、速度释放与安全区；MIT。与已存在的 `REF-123 Vaul` 区分为 Web Component/native dialog 方案。
- **REF-133 — katspaugh/wavesurfer.js:** HTML 媒体播放和波形可视化、Regions 等插件；BSD-3-Clause。与 FX-031 的装饰性进度条不同。
- **REF-134 — naomiaro/waveform-playlist:** React + Tone.js 多轨编辑、片段剪裁、标注；MIT；应评估 Peer deps、媒体读取与资源成本。
- **REF-135 — florash/Pinky-UI:** tactile/magnetic 等 React motion primitives；MIT；README 表示对应 npm scope 尚未发布，优先按源码研究。
- **REF-136 — bbc/peaks.js:** 可缩放波形、markers/segments；LGPL-3.0；上游 README **明确指出开发已转移至 Codeberg**，GitHub 仅作为历史固定参考，采用新版本前核对真实维护地址与许可。

上游地址、固定 SHA、复用风险统一登记在 [机器目录](../../registry/material-expansion-v045.json)。所有原始媒体、文档示例及截图版权继续归各自权利人。本仓库未导入任何第三方代码。

## 实用区分

| 用户需求 | 优先素材 | 不能声称 |
| --- | --- | --- |
| 手机版底部导航和滑动卡片 | FX-027/028 | 前者不是手机系统导航，后者不是完整 carousel |
| 行操作与手势 | FX-030 + REF-132 | FX-030 没有 swipe、触控速度或撤销事务 |
| 音频播放与片段标注 | FX-031/032 + REF-133/134/136 | FX 为静态演示，`range` 未绑定音频 |
| 语音录制与状态 | FX-033 | 没有获取麦克风权限或开始录音 |
| 地图标注 | FX-034 + VG-015 | 没有真实经纬度或聚合计算 |
| 空白/加载引导 | FX-035/036 + VG-016 | 骨架屏不代表真实请求生命周期 |

**边界：** 新增的 FX/VG 是源码素材，不新增 React 公共导出、主题或运行时依赖。交互可用性只限原生 HTML 控件行为；移动设备、性能、键盘、读屏与业务正确性仍需目标项目验证。
