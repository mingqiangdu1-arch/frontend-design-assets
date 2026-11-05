# Advanced/special interactions V0.16 · multitrack magnetic editing and scroll-led narrative

**Type:** original behavior specification and static demonstration. The implementation's colors, illustration and typography are an unrelated experimental art direction. These two patterns must not be forced into all SaaS/consumer/game/content projects.

## IP-023 — Frame-accurate multitrack snapping timeline

### Intended applications

Video/audio editing, animation timing, game cutscenes, sound-design, creation tools and workflow schedulers **only when accurate temporal manipulation is a real product need**. The demo is deliberately 12 seconds long at 24 FPS with three abstract tracks. No media loading/playback, zoom or virtualized range.

### Before / state

- Each clip has stable ID, track ID, integer frame start, positive frame duration and descriptive label. Zero-based frames are used throughout the state and timecode computation.
- `validateClips` enforces unique IDs, legal tracks, timeline bounds and non-overlapping half-open [start,end) ranges **within the same track**. Touching edges is allowed.
- `initialTimeline` creates six local fictional objects and a local playback-head marker. History stores 20 reversible clip snapshots.

### Trigger and transition

- Pointer: select a labeled clip; on `pointerdown` capture the stream, on movement preview a position from pixel delta divided by actual rail width, optionally preview a cross-track target, and on `pointerup` **commit exactly once** or refuse invalid placement. Cancel and lost pointer capture never change clip state.
- Magnetic snap candidates within **±5 frames**: boundaries from other clips on target track, a playhead and whole-second multiples of 24 frames, preferring nearest candidate and clip boundaries on equal distance. A native checkbox toggles snapping; holding Alt during an individual drag temporarily turns it off.
- Keyboard: focusing the clip and pressing Left/Right moves one frame, Shift+arrows moves 12 frames, Alt+Up/Down moves to another track where no clip overlaps. The detail panel has visible ±1-frame and track controls to avoid pointer-only dependence. Keyboard precision moves deliberately bypass magnetic snapping.
- Zoom/scaling: responsive rail may scroll **inside its own container** on narrow screens; browser width must not overflow. This first experiment does not implement timeline zoom, horizontal autoscroll on edge drag, resize trim or playback scrubbing.

### After, cancel and failure

- A valid move changes an immutable clip list and pushes a previous snapshot to undo history. A fresh move invalidates redo. Selection and focus follow the moved clip.
- Invalid track, duplicate IDs, out-of-range placement or overlap cannot produce a new state. Report the reason in an ARIA live region. Bounds are clamped to whole frames; a snap candidate that collides may be skipped in favor of another valid position.
- Pointer cancellation restores the original clip without committing. Same-position drops are no-ops, not a successful save.
- **No persistence, real file modification or multiuser conflict handling is present.** A production editor needs permission checks, autosave error recovery, content playback sync, frame-rate conversions and race-condition handling.

### Acceptance

Deterministic pure-model tests, pointer drag with near-second magnetic snap, cross-track transfer, track collision rejection, keyboard ±1/±12, Alt+track movement, undo/redo, focus, reduced motion and responsive 390/768/1440 layout evidence.

## IP-024 — Scroll-driven editorial story

### Intended applications

Brand stories, product launch explanation, educational articles, annual reports, interactive documentation and museum stories where **content exists without animation**.

### Before / state

Four semantic `article` elements hold complete, original visible prose; these are not image captions drawn into a canvas. Independent stage artwork contains only decorative CSS shapes and `aria-hidden=true`. No image searches, third-party stock/media or vendor code.

### Trigger and transition

- Native browser scroll (passive) schedules at most one `requestAnimationFrame` update. The script maps document position into clamped [0,1] progress and selects the closest chapter to a viewport reading anchor.
- A sticky stage renders chapter title/number, current progress and optional CSS transforms for ornament. The stage is **visual feedback**, not a second hidden copy of the content.
- Previous/next buttons and ordinary in-article anchor links provide explicit navigable chapter alternatives, working when JS animation is unavailable.
- `prefers-reduced-motion:reduce` switches CSS motion off and navigates instantly. Text and stage/status remain fully accessible without waiting for animation.
- Instead of assuming native CSS Scroll-driven Animations support, this lab intentionally implements a small JS/rAF fallback usable in current engine smoke tests. It is not a claim of `animation-timeline: view()` support everywhere.

### After / cancel and fallback

The viewed chapter gets `aria-current=step`; a labeled progressbar updates 0–100 as the user scrolls, without sending an incessant live announcement on every pixel. A `role=status` message fires only for **explicit button navigation**. Reader scroll is never hijacked and nothing loops or autoplays.

A production app should evaluate sticky overlap on narrow screens and at 200%+ zoom, coarse pointers, mobile browser viewport dynamic bars, focus/reading-order, system fonts, and actual assistive-technology narration.

### Acceptance

Scroll from first to last chapter changes stage and progress while all semantic prose remains in DOM. Keyboard accessible explicit jumps can navigate chapters; reduced motion prevents decorative transformations without changing the reading experience. 390/768/1440 screenshots are capture-only.

## Relationship to existing assets

- [V0.14](../../playground/advanced-interactions/README.md): spatial canvas / radial menu / before-after state comparison.
- [V0.15](../../playground/advanced-interactions-v2/README.md): cross-container transfer and FLIP layout sorting (not a time-accurate editor).
- [Motion rules](../motion/motion-system.md): motion explains state, never fake success, preserve keyboard/focus, graceful fallback.

## Still **not** implemented or verified

Real media decoding/audio playback, clip resizing, multi-rate timelines, magnetic threshold customization, virtualized zoom, waveform assets, real-data collaboration, multi-touch pinch/inertia, production WCAG/VoiceOver/NVDA signoff, formal golden screenshots, and on-device performance. App-level integrations must validate permissions, operation conflict resolution and error recovery.


## Dedicated cross-engine smoke addition

The V0.16 CI workflow `.github/workflows/interaction-v3-crossbrowser.yml` executes Playwright Chromium, Firefox, WebKit (headless Linux) and Chromium phone-touch emulation on the same local-only model and static app. It verifies semantic labels, exact keyboard frame edits, pointer release with magnetic snapping, cross-track release, chapter jumps, scroll progress and motion reduction. In reduced-motion navigation the script uses the broadly supported `scrollIntoView({behavior:"auto"})` fallback, rather than browser-specific nonstandard behavior strings. Results are evidence of tested engines **only**, not of physical touch or screen readers.
