# V0.51 · Original SVG alpha masks and hover-only animated vector art

## Four reusable SVG alpha masks (320×240)

These masks use white opaque vector shapes on transparent backgrounds; use them via CSS `mask-image: url(...)`, not as a normal visible full-color illustration. Demo supplies its own gradient separately.

| ID | Editable mask file | Shape |
| --- | --- | --- |
| VG-073 | [scalloped-window-mask.svg](masks/scalloped-window-mask.svg) | scalloped panel shape |
| VG-074 | [ticket-notch-mask.svg](masks/ticket-notch-mask.svg) | ticket sheet with opposing notches |
| VG-075 | [ripped-paper-mask.svg](masks/ripped-paper-mask.svg) | irregular continuous zig-zag rip outline |
| VG-076 | [keyhole-portal-mask.svg](masks/keyhole-portal-mask.svg) | round arch and elongated keyhole |

[CSS mask-image specimen gallery](../../playground/shape-masks-v051/index.html). Masks do not include embedded demo backgrounds, external data or fonts.

## Four standalone original SVG motion pieces (640×360)

The vector sources each embed **self-contained CSS keyframes** activated on `svg:hover`, not external JavaScript. They are motion decoration, and declare reduced-motion static fallback inside each file. As `img` elements they have no keyboard activation; never use motion alone for essential information.

| ID | Editable SVG file | Effect |
| --- | --- | --- |
| VG-077 | [orbit-wreath-motion.svg](motion/orbit-wreath-motion.svg) | abstract symmetrical wreath, outer ring turns on hover |
| VG-078 | [breathing-rosace-motion.svg](motion/breathing-rosace-motion.svg) | radial translucent leaf window that gently pulses on hover |
| VG-079 | [pendulum-label-motion.svg](motion/pendulum-label-motion.svg) | graphic pendulum tether with controlled CSS oscillation on hover |
| VG-080 | [ripple-emblem-motion.svg](motion/ripple-emblem-motion.svg) | concentric independent ripple ring opacity on hover |

[Hover animated SVG specimen gallery](../../playground/svg-motion-v051/index.html).

All sources contain `viewBox`, `title`, `desc`, editable SVG primitives. Nothing is sourced from a third-party design, image, font, icon pack or animation library. No GitHub external-media links are embedded in assets.
