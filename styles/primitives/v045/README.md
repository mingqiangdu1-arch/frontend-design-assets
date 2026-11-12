# V0.45 · Native mobile, audio and feedback materials

Ten **original, independently selectable CSS component materials** in [mobile-audio-states.css](mobile-audio-states.css). One dependency-free [specimen gallery](../../../playground/mobile-audio-states-v045/index.html) supplies accurate example markup, not a full app.

| ID | CSS entry | What works without JavaScript | What needs a host application |
| --- | --- | --- | --- |
| FX-027 Safe-area mobile bottom navigation / 安全区底部导航 | `.fx45-bottom-nav` | Native anchor focus and aria-current presentation | Router, selected page and safe-area device check |
| FX-028 Native touch scroll-snap rail / 原生滑动吸附卡轨 | `.fx45-snap-rail` | Native horizontal scrolling and scroll-snap | Pagination, focus order and host card data |
| FX-029 Tactile press feedback link / 触感按压反馈 | `.fx45-press-button` | Native link or button :active visual feedback | Actual click action; not haptics or long press |
| FX-030 Native disclosure action row / 可展开行操作 | `.fx45-action-row` | details / summary expand with focus semantics | Real row actions; does not detect swipe |
| FX-031 Waveform range position control / 波形进度滑杆 | `.fx45-wave-scrubber` | Native range input position selection | Actual audio source, playhead binding and live peaks |
| FX-032 Transcript cue list / 转写时间锚点 | `.fx45-transcript-cues` | Timestamp links and focus | Cue-to-media synchronization and transcript data |
| FX-033 Voice session indicator / 语音状态指示 | `.fx45-voice-status` | Static status output with decorative pulse | Microphone permission, recorder and elapsed time |
| FX-034 Map marker cluster graphic / 地图聚合点 | `.fx45-map-cluster` | Static text count and visual pin | Map instance, coordinates and spatial clustering |
| FX-035 Empty-state action card / 空状态引导卡 | `.fx45-empty-state` | Native CTA anchor | Real empty condition and navigation target |
| FX-036 Reduced-motion loading skeleton / 降动效骨架屏 | `.fx45-skeleton` | CSS placeholder; animation stops on reduced motion | Status messaging, async lifecycle and removal |

The bottom navigation uses native anchors and `aria-current`; card rail uses browser scroll-snap; the action row uses `details/summary`; waveform selection uses `input[type=range]`. Other demonstrations are *static styling*, **not** a recording engine, audio playback, swipe detector or map data source.

**Extraction:** copy one `.fx45-*` class family and descendants only. Keep `@media (prefers-reduced-motion: reduce)` and `@media (forced-colors: active)` rules. Scoped variables remain optional. Nothing changes global `:root`, published React exports or existing themes. Validate host keyboard, mobile, contrast, gesture cancellation, announcements and actual loading completion separately.
