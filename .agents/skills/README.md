# Frontend Agent Skills / 前端技能模块

This is the **skill layer** of this living frontend asset repository. Existing sources are the *materials*; each skill is an *on-demand workflow* for an agent to discover, reason about, adapt or review those materials. The module does not generate or deploy a website inside the library.

These six project-scoped skills follow the [Agent Skills specification](https://agentskills.io/specification): a folder with a discoverable YAML-frontmatter `SKILL.md`, concise instructions and task-specific examples under `references/`. They live in `.agents/skills/` so **Codex launched inside this repository** can discover them; actual availability depends on the client's skill support/configuration. There is no automatic GitHub-hosted execution or remote skill activation.

## Select by objective

| User asks... | Activate skill | What it outputs |
| --- | --- | --- |
| “找可直接参考的组件 / SVG / 动效代码” | [frontend-source-retrieval](frontend-source-retrieval/SKILL.md) | IDs + exact source/demo paths + reuse categories and limits |
| “想要几个有特色的视觉/风格方向” | [frontend-art-direction](frontend-art-direction/SKILL.md) | 2–3 differentiated visual briefs with evidence and tradeoffs |
| “怎么安排页面信息与移动端布局？” | [frontend-layout-composition](frontend-layout-composition/SKILL.md) | adaptive structure + DOM order + narrow/overflow decisions + sample sources |
| “按钮、拖拽、表格、Agent 操作流程有哪些状态？” | [frontend-interaction-contract](frontend-interaction-contract/SKILL.md) | state transitions, input and accessibility contracts, failure recovery |
| “把现有素材迁到 React / Next / Vue 项目” | [frontend-component-adaptation](frontend-component-adaptation/SKILL.md) | precise source-to-host migration plan/changes with provenance |
| “这个界面/组件是否可用？有哪些缺陷？” | [frontend-quality-audit](frontend-quality-audit/SKILL.md) | evidence-scoped audit, severity, smallest fixes and unverified items |

### Task-first routing

- For vague design prompts: **art direction → optionally layout composition → source retrieval**. Stop after a grounded direction brief if the user did not ask for code.
- For a known component: **source retrieval → component adaptation** (target project only). Never treat a conceptual research item as compiled code.
- For complex behavior: **interaction contract → implementation in target repo → quality audit**. No backend, application or page builder is implemented in this asset repository.
- For reviews: use **quality audit alone** and avoid reading every skill, registry and historical version.

### How to use

- **Codex inside this repo:** Open the repository as the working directory, then ask for the relevant task or invoke the displayed skill by name where supported. Codex scans `.agents/skills` in repository directories; if skills do not appear, check product support/configuration or restart after installing. [Codex official skill documentation](https://learn.chatgpt.com/docs/build-skills).
- **Agent with GitHub access, no local checkout:** Read this short index, open **one** matching `SKILL.md`, then only its referenced source files. GitHub source navigation works even without local execution; scripts and target verification require a suitable runtime.
- **Other repositories / local installs:** These skills contain links to this repository's relative asset sources, so a stand-alone copy into an unrelated project does **not** make the source library available. Give the agent a checkout or authorized GitHub connector for `mingqiangdu1-arch/frontend-design-assets`, and resolve references against that original repo; otherwise use the procedural guidance only and mark source paths unavailable. Never assume a private repo is publicly accessible.
- **Language:** Each skill gives an English trigger and bilingual instructions/examples, but the final artifacts can be written in the user's language.
- **Scope:** These are *author-created* task workflows, not official certifications, external package installations or proof of application browser behavior.

### Keep this module lean
Only add a skill when a distinct repeatable task cannot be covered by these six. Prefer concrete worked examples and source links over near-duplicate “frontend best practices” prompts. Keep all original asset IDs and style claims grounded in [DISCOVER.md](../../DISCOVER.md), [registry data](../../registry/README.md) and the real source files. Research and implementation evidence must stay separate.
