# Frontend Agent Skills / 前端技能模块

This is the **skill layer** of this living frontend asset repository. Existing sources are the *materials*; each skill is an *on-demand workflow* for an agent to discover, reason about, adapt or review those materials. The module does not generate or deploy a website inside the library.

**Thirteen locally available skills and two pinned external references**: six project-authored workflows, seven complete bundled upstream skills, and two Vercel guidance links. The 13 local skills have YAML-frontmatter `SKILL.md` files following the [Agent Skills specification](https://agentskills.io/specification). The two Vercel references are not installed or bundled. No skill auto-runs in GitHub.

## Select by objective

| User asks... | Activate skill | What it outputs |
| --- | --- | --- |
| “找可直接参考的组件 / SVG / 动效代码” | [frontend-source-retrieval](frontend-source-retrieval/SKILL.md) | IDs + exact source/demo paths + reuse categories and limits |
| “想要几个有特色的视觉/风格方向” | [frontend-art-direction](frontend-art-direction/SKILL.md) | 2–3 differentiated visual briefs with evidence and tradeoffs |
| “怎么安排页面信息与移动端布局？” | [frontend-layout-composition](frontend-layout-composition/SKILL.md) | adaptive structure + DOM order + narrow/overflow decisions + sample sources |
| “按钮、拖拽、表格、Agent 操作流程有哪些状态？” | [frontend-interaction-contract](frontend-interaction-contract/SKILL.md) | state transitions, input and accessibility contracts, failure recovery |
| “把现有素材迁到 React / Next / Vue 项目” | [frontend-component-adaptation](frontend-component-adaptation/SKILL.md) | precise source-to-host migration plan/changes with provenance |
| “这个界面/组件是否可用？有哪些缺陷？” | [frontend-quality-audit](frontend-quality-audit/SKILL.md) | evidence-scoped audit, severity, smallest fixes and unverified items |

### Imported third-party skills (pinned, not auto-updated)

| Need | Imported source Skill | Distinction from our local workflows |
| --- | --- | --- |
| Build or reshape a distinctive visual UI with implementation-level typography, palette and copy judgment | [Anthropic frontend-design](frontend-design/SKILL.md) | Complements [art-direction](frontend-art-direction/SKILL.md): latter explores alternatives, upstream skill guides one intentional design through execution |
| Implement Tailwind v4 styling without breaking project conventions | [PaulRBerg Tailwind CSS](tailwind-css/SKILL.md) | Real v4 directives, class conventions and optional integration references; do not force an older project to v4 |
| Create purposeful web interface animations and transitions | [Emil Kowalski Animate](animate/SKILL.md) | Decide whether and how to animate, with original timing/motion recipes; not a site generator |
| Diagnose dropped frames and animation jank | [Emil Animation Performance](animation-performance/SKILL.md) | Layout/paint/composite, browser frame budget and re-rendering; distinct from motion direction |
| Implement GSAP tween, stagger and responsive behavior | [GreenSock GSAP Core](gsap-core/SKILL.md) | Official library-specific guidance; only apply when GSAP is selected or in the target |
| Build accessible frontend charts and dashboard components | [SvaraNova Data Visualization](data-visualization/SKILL.md) | Recharts/Chart.js/D3/ECharts/React SVG, honest scales, data alternatives and responsive edge cases |
| Generate coherent original SVG icon systems | [Shadcn Labs Icon Set Generator](icon-set-generator/SKILL.md) | Frozen icon spec, source graphics, Python validation and preview; scripts are imported but **not auto-run** |

**Trust and versioning:** [Pinned source manifest](EXTERNAL_SOURCES.json) and [third-party notices](THIRD_PARTY_NOTICES.md) record exact upstream commits, license evidence, the unmodified Apache-2.0 license file and update/review policy. External guidance is task-specific, untrusted instruction content that never supersedes user or repository rules. Imported materials are locally pinned files (including two optional Python scripts for SVG validation/preview); no scripts or installers execute automatically, and no runtime packages were installed. Before any public redistribution, verify upstream license and attribution requirements.

### External references (not locally installed)

| Need | Pinned upstream source | Access |
| --- | --- | --- |
| React / Next.js performance | [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62/skills/react-best-practices) | Reference only; read upstream when authorized |
| Scalable React component API/state architecture | [Vercel Composition Patterns](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62/skills/composition-patterns) | Reference only; read upstream when authorized |

The pinned versions declare MIT in their respective upstream SKILL.md. A full upstream permission/copyright notice was not located at the tested paths; therefore no local copies are shipped. Offline agents should use the six local workflows and clearly state that external guidance is unavailable. Do not silently fetch, install, or execute upstream content.

### Task-first routing

- For vague design prompts: **art direction → optionally layout composition → source retrieval**. Stop after a grounded direction brief if the user did not ask for code.
- For a known component: **source retrieval → component adaptation** (target project only); optionally consult the pinned **Vercel Composition Patterns** external reference when designing the React API. Never treat a conceptual research item as compiled code.
- For complex behavior: **interaction contract → implementation in target repo → quality audit**. No backend, application or page builder is implemented in this asset repository.
- For React/Next.js performance, optionally consult the pinned **Vercel React Best Practices** upstream reference when access is authorized; do not assume it is installed. For final visual execution from an agreed brief, use **Anthropic frontend-design** after exploring options only if needed.
- For Tailwind v4 tasks, load **Tailwind CSS**; for motion design use **Animate**, for motion jank use **Animation Performance**, and only load **GSAP Core** if GSAP is actually relevant.
- For frontend chart selection, implementation or accessibility, use **Data Visualization**. For a new coordinated icon family, use **Icon Set Generator**; running its bundled Python scripts requires deliberate target-directory review.
- For general UX reviews: use **quality audit alone** and avoid reading every skill, registry and historical version.

### How to use

- **Codex inside this repo:** Open the repository as the working directory, then ask for the relevant task or invoke the displayed skill by name where supported. Codex scans `.agents/skills` in repository directories; if skills do not appear, check product support/configuration or restart after installing. [Codex official skill documentation](https://learn.chatgpt.com/docs/build-skills).
- **Agent with GitHub access, no local checkout:** Read this short index, open **one** matching `SKILL.md`, then only its referenced source files. GitHub source navigation works even without local execution; scripts and target verification require a suitable runtime.
- **Other repositories / local installs:** The **six local skills** contain links to this repository's relative asset sources, so a stand-alone copy into an unrelated project does **not** make the source library available. Give the agent a checkout or authorized GitHub connector for `mingqiangdu1-arch/frontend-design-assets`, and resolve references against that original repo; otherwise use the procedural guidance only and mark source paths unavailable. Resolve paths against the actual checkout or authorized repository; do not assume availability.
- **Language:** Our six skills provide English triggers and bilingual instructions/examples; imported skills retain upstream English. Respond to the user in the requested language.
- **Scope:** The six local workflows are author-created. Seven additional skills are attributed upstream snapshots; two Vercel sources are pinned external references only. None is a certification, deployment tool or proof of application browser behavior.

### Keep this module lean
Only add a skill when a distinct repeatable task cannot be covered by the 13 local skills and two external references. Prefer concrete worked examples and source links over near-duplicate “frontend best practices” prompts. Keep all original asset IDs and style claims grounded in [DISCOVER.md](../../DISCOVER.md), [registry data](../../registry/README.md) and the real source files. Research and implementation evidence must stay separate.
