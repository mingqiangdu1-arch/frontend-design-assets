# Registry · machine-readable asset contracts

This directory is the **authoritative index** for choosing existing design references, implemented React components, styles and page blueprints. It is not an automatically installable UI kit.

## Which file should an agent read?

| File | Source of truth for |
| --- | --- |
| `assets.json` | Every stable asset ID, its identity/type/lifecycle/source/reuse constraints, tags, aliases, context, style, dependencies, and handoff |
| `components.json` | **Actual public React component exports** (one entry per real component); source and gallery references |
| `styles.json` | Independent style IDs, token/spec/demo entrypoints; **no repository default** |
| `style-assembly.json` | Fourteen per-style page structure and interaction handoffs; real template, experience-recipe and React-export references. Used by `scripts/style-assembly.mjs`; not generated production pages. |
| `style-facets.json` | One-to-one theme selection facets: task aliases, structural layout, material, interaction, device and density; references real demo paths. Pair with `scripts/style-match.mjs` and `scripts/select-style.mjs` for explainable matching, not an ML style rank. |
| `material-expansion-v047.json` | 6 项原创实验排印/材质/导航 CSS 源码 FX-049..054 + 8 项周期自包含的 SVG 纹理图案 VG-023..030 + 4 份 SVG 场景 VG-031..034；均是素材原件而非应用，FX-050 可选单独 Pointer JS |
| `material-expansion-v046.json` | 12 个原创表单/数据/对比/排印 CSS 原子 FX-037..048，6 个原创独立 SVG VG-017..022；含一个局部前后对比 JS 适配器，没有 React 包导出 |
| `material-expansion-v045.json` | 10 个原创移动端/音频/状态原生 CSS 组件 FX-027..036、4 个 SVG VG-013..016、5 个固定版本研究链接 REF-132..136；源码与预览分别可追踪，不增 React 公共导出 |
| `material-expansion-v044.json` | 12 个原创原生 CSS 界面组件 FX-015..026 与 6 个可单独使用的 SVG 图形 VG-007..012；全部真实存在、可引用、按主题标签独立检索。仅保留既有基础校验，没有新增测试框架或 React 包导出 |
| `material-expansion-v043.json` | 8 个源码路径确证的具体上游动态组件 REF-124..131、8 个原创原生 CSS 组件 FX-007..014、6 个原创可编辑 SVG 图形 VG-001..006；区分 research-only 与 copyable-source，实物文件和轻量预览均有 |
| `material-expansion-v042.json` | 本轮 13 个来源确证的多样化前端资源 + 6 个确有原始 CSS 源码的视觉效果：外部 REF-111..123 仅研究型，原创 FX-001..006 是可拆用参考；不是 npm/React 导出或合成产品 |
| `registry-metadata-v041.json` | IP-066..068 原创只读 shadcn `registry-item.json` 元数据子集解析、限定已审条目依赖拓扑和内部元数据格式迁移。附固定上游提交/条目来源、测试和独立演示；无安装或组件运行许可结论 |
| `registry-slots-v040.json` | 原创执行级模型 IP-063..065：Registry 元数据 Fixture 映射、三层 Slot 文档、不触碰服务端的预览确认；附源文件、独立 DOM 演示与 Node/Browser 测试 |
| `visual-editor-v039.json` | IP-060..062 三个原创可执行可视化区块原型：扁平区块排序、严格属性 Schema、选择/本地撤销重做。源码/演示/测试均可追踪；不是 React 包导出或完整编辑器产品 |
| `agent-interactions-v038.json` | 三个独立可运行的原创 Agent 状态原型 IP-057..059，附源码、独立浏览器 Demo、Node/Playwright 测试；stage=prototype / adapt-required，非第三方 React 组件 |
| `component-dossiers-v037.json` | 深挖 10 个真实上游 Block/组件的源码路径、固定版本、依赖和结构（REF-101..110），另含 3 个原创 Agent 行为合同（IP-054..056）与 3 个权限未核的社区候选；**全部研究型，无可运行新导出** |
| `community-sources-v036.json` | 12 个前端社区、标准注册表、视觉编辑器和 Agent 工作流来源，以及 4 个独立交互/复现研究契约（REF-089..100、IP-050..053）；均为 analyzed/research-only，不可当作可安装组件或已实现 API |
| `specialized-resources-v030.json` | 17 个专项外部资源的来源、许可证、既有资产补位和可检索标签（REF-042..058）；与 assets.json 一一对应，只是研究来源，不是导出组件 |
| `specialized-patterns-v031.json` | V0.31 的 15 个研究型视觉/数据/移动行为契约（REF-059..068、IP-031..035）；只含原创建议、状态、来源和降级，不是代码或新 styleIds |
| `state-specimens-v035.json` | 为八个既有 V0.34 研究 ID 添加独立桌面/移动原创 SVG 示例。`assets.json.visualSpecimen` 表示只读图形文件，不能作为 React export、运行交互或浏览器截图证据 |
| `experience-artifacts-v034.json` | V0.34 创意叙事、空间布局、非传统导航与交互 16 份原创研究合同（REF-081..088、IP-042..049），关联可选的 6 个独立布局/视觉 CSS 原子；非页面或 React 实现 |
| `creative-primitives-v032.json` | 18 个 V0.32 研究型素材（`IP-036..041` / `REF-069..080`），覆盖协同编辑器状态、字体/纹理来源和特殊视觉效果的降级契约；仅 6 个关联独立 CSS class 作为原创样例 |
| `page-templates.json` | Independent full-page references; inspect `implementation` to distinguish static JavaScript from React integration |
| `component-states.json` | Historical selected-state matrix, intentionally partial |
| `creative-directions.json` | Distinct expressive visual directions, not interchangeable CSS |
| `experience-compositions.json` | Research-stage task-first composition plans, not generated pages |
| Other JSON files | Focused motion/visual quality/research metadata |

Task-based entry: [../CATALOG.md](../CATALOG.md). Agent operating rules: [../AGENTS.md](../AGENTS.md).

## V0.35 static illustration contract

- `visualSpecimen` is an optional path for **original static vector layout/state studies**. It never overrides the artifact lifecycle or reuse policy; `visualSpecimenEvidence` explicitly states the evidence level.
- Agent `handoffResolved.relatedFiles` includes this SVG path when present. Compare the illustration with V0.34 `stateContract` before using it as a design reference; verify actual behavior in the independent target product.
- [V0.35 specimens](../styles/specimens/v035/README.md) · [research note](../docs/research/state-specimens-v035.md).

## V0.33 research handoff override

- Per-asset `handoff.mode: research-only` can **restrict** a broad reuse policy where a behavior-pattern entry has only research notes (currently `IP-031..041`). It cannot promote an asset to `copyable-source` or imply a working interaction.
- The CLI `reuseMode()` and its search filters honor this override. Real prototypes such as `IP-030` remain `adapt-required`, and public React exports require `registry/components.json` evidence.
- Read [retrieval trust and classification QA](../docs/research/retrieval-trust-v033.md) for concrete test cases.

## Do not confuse the three separate classifications

- `type` says **what an asset represents**: `component`, `interaction`, `reference`, `recipe`, `archive`, `token`, `page-template`, `motion`. A `type: "component"` record alone **does not prove** a React implementation exists; consult `components.json.entries`.
- `reuseKind` says **how it can be handed off**: `styled-implementation`, `behavior-pattern`, `design-reference`, `composition-recipe`, `style-token`, `snapshot`, `motion-reference`. Its associated `reusePolicies` determine `copyable-source`, `adapt-required`, or `research-only`.
- `stage` says **how far it has been developed**: `captured`, `analyzed`, `prototype`, `reference-implemented`, `validated`, `production-ready`, `deprecated`. `reference-implemented` is a real reference, not target-app certification.

These dimensions must remain independent; do not silently upgrade maturity or claim browser QA as full approval.

## Searchable metadata for new assets

- Keep `id` **unique and immutable**. When retiring/replacing content, use linked references and retain its provenance rather than reusing its ID.
- Provide specific, non-misleading `name`, `tags`, `applicationContexts` and, when useful, **short Chinese and English `aliases`** for how a developer might naturally request it. Never add a generic word to unrelated assets just to inflate search recall.
- `styleIds` must match compatible, explicitly declared style IDs. Empty `styleIds` may signify a conceptual pattern — **not** tested universal CSS/React compatibility.
- Link a precise `path`, `spec`, `details` and/or `demo` for materials that exist. `handoff.entry` should lead to the most relevant implementation file, not an unrelated research page.
- Preserve `source` and `license` when known; a missing license requires review, not inferred permission. `notion` links are private-workspace references to audit **before publication**.
- Use `verified` and `handoff.limitations` to state what evidence is missing; no invented production-ready status.
- Distinguish actual source implementation from research-only plans in names/descriptions and downstream handoffs.

## Selection examples

```sh
# implemented React entries only (not historical component sketches)
node scripts/find-assets.mjs --type=component --stage=reference-implemented --goal=implementation --json

# natural-language Chinese aliases can match as phrases inside longer requests
node scripts/find-assets.mjs --type=component --intent="我需要一个可编辑表格" --json

# interaction contracts, not components
node scripts/find-assets.mjs --type=interaction --intent="拖拽" --goal=behavior --json

# style compatibility is independent of asset type/maturity
node scripts/find-assets.mjs --style=precision-dark --type=component --reuse=copyable-source --json
```

`--type` matches `type`, `--stage` matches lifecycle stage, and existing `--kind` matches **reuseKind** (legacy name). `--goal` re-ranks, and `--reuse` filters handoff policy. Keyword search is deterministic and lexical, **not an embedding model or proof of exhaustive semantic coverage**.

## Validation

For edits to registries or selection logic: `npm run test:registry`, `npm run test:unit`; for changes to React component entries, also `npm run check:components` and the relevant Gallery/browser suite. In a GitHub-only environment, use existing CI rather than spinning up a full application just to inspect a reference.

See [../docs/governance.md](../docs/governance.md) for de-duplication and long-lived maintenance, and [../docs/publication-readiness.md](../docs/publication-readiness.md) before making the repository public.
