# V0.50 · Original print, editorial and evidence-chart CSS materials

[Scoped CSS](print-evidence-atoms.css) · [original semantic HTML specimens](../../../playground/print-evidence-v050/index.html). Eight independent opt-in **real source files / elements**, not screenshots, not a combined theme, and not a web report generator. Pure HTML/CSS with one inline, self-contained illustrative SVG in FX-074. No JS or external data/media.

| ID | Selector | What can be copied | Boundary |
| --- | --- | --- | --- |
| FX-070 | `.fx50-riso-duo` | Risograph dot-duotone print specimen / 孔版双色印刷样张 | Original CSS radial-gradient dots and registration offset over a real heading, not actual print separation or a rasterized photograph. |
| FX-071 | `.fx50-news-lead` | Newspaper column reading lead / 报纸分栏导语 | Real heading, text, newspaper-like CSS columns and responsive single-column layout. Reading order remains DOM-linear; host supplies editorial text. |
| FX-072 | `.fx50-paper-collage` | Layered paper cut collage / 手工剪贴层景 | Independent CSS colored geometric paper shapes; no external photo, drag controls, licensed scanned paper, or editable collage workspace. |
| FX-073 | `.fx50-annotation-figure` | Bracketed annotation figure / 括号式图注证据卡 | Semantic figure/caption plus text labels; visual trace is static sample, no true source record or chart calculation. |
| FX-074 | `.fx50-slopegraph` | Two-category slopegraph / 双类变化斜率图 | Actual inline SVG connects two illustrative static paired values with adjacent text; no charting library, live dataset, numeric scale engine, or inferred causal conclusion. |
| FX-075 | `.fx50-interval-rail` | Uncertainty interval rails / 不确定性区间轨 | Explicit low/center/high sample values are mirrored by bounded CSS positions on one static 0–100 axis; not computed confidence intervals or probability assertions. |
| FX-076 | `.fx50-dumbbell` | Paired dumbbell comparison rows / 哑铃差异对照条 | Native list of static numeric pair samples drawn on consistent 0–100 CSS scale; host must update text and geometry together. |
| FX-077 | `.fx50-source-ribbon` | Source provenance bibliography ribbon / 来源证据索引条 | Genuine anchor references to local specimen source notes with navigable targets; does not verify external citations or download publications. |

**Important data honesty:** FX-074, FX-075 and FX-076 represent deliberately invented examples on stated 0–100 scales. Their underlying text values and static visual geometry agree. No real study, statistical confidence, sample size, causality, source validation, live backend or uncertainty computation is implied. When consuming, replace *both* label text and SVG/CSS geometry with host-verified numbers. FX-077 source links target local sample notes; they do not claim public citations.

**Reuse:** extract only the relevant class family and markup; keep `forced-colors` and narrow-screen CSS. Test target contrast, source citations, numeric rendering, mobile columns and keyboard navigation, and screen reader behavior before production. Typefaces use generic system fonts only.
