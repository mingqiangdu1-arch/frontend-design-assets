# Agent 快速选材 · 两条检索路径

> **先读本页，再按需打开 1–3 个真实素材。** 本仓库是跨应用、多风格、持续积累的参考与源码素材库，不是页面生成器、统一主题、已发布 npm 包或目标项目。只有 `registry/*.json` 的当前条目是资产状态事实来源；本页只负责路由，**不复制完整资产列表**。

## 先判断：需要“拿到素材”还是“寻找方向”？

| 用户目的 | 首选路径 | 交付给用户/目标 Agent |
| --- | --- | --- |
| “找一个能参考/改造的组件、图形或动效” | **A. 精确选材** | 2–5 个候选：ID、具体源码/外链、Demo、可用边界、替代项 |
| “还没有确定风格，先看看可以怎么设计” | **B. 方向探索** | 2–3 个**有区别**的方向：结构、视觉语言、交互特点、已有依据 |
| “已有产品或截图，想参考或复现” | **先 B 后 A** | 先提取布局/材质/密度/交互约束，再逐项找实现素材；不能声称已精确复刻 |
| “仓库里都有什么” | [完整任务索引](CATALOG.md) | 按类别给入口，不读取全量注册表、不罗列全部资产 |
| “希望 Agent 按固定方法做选型、响应式布局、迁移或检查” | [Frontend Skills](.agents/skills/README.md) | 15 项按任务触发的 `SKILL.md`（6 自建 + 9 上游固定版本）；只读所需技能与规则，不重复建立资产目录 |

### A · 找到可参考或可引用的实物

| 目标 | 第一处查看 | 必须继续核查 |
| --- | --- | --- |
| **已有 React/TSX 导出** | [`registry/components.json`](registry/components.json) → `entries[].id/exportName/source` | [`packages/ui/src/`](packages/ui/src/) 中真实导出、依赖和明确兼容风格；`registry/assets.json` 的“组件类”**不等于**公共 React 导出 |
| **原生 CSS/HTML/JavaScript/Canvas 原件** | [材料系列索引](registry/README.md) → 对应 `registry/material-expansion-v0xx.json` 的 `FX-*` | 对应 [`styles/primitives/`](styles/primitives/) 源码、README 和独立 Demo；不是默认已集成 React |
| **商品/实物陈列、原生预览缩放、原创透明物件图** | [V0.58 独立 HTML/CSS/JS 原件](styles/primitives/v058/README.md) · [6 项真实语义样张](playground/object-studies-v058/index.html) · [4 幅原创透明 SVG](graphics/v058/README.md) | `FX-118..123` 六类独立提取；FX-120 需要可选局部 JS 才能真正放大，SVG 为虚构物件，尺寸与纹理不得作为真实商品信息 |
| **统计和分析可视化原件（静态）** | [V0.57 六套语义 HTML/CSS](styles/primitives/v057/README.md) · [独立数值样张](playground/analytics-v057/index.html) · [四幅装饰图](graphics/v057/README.md) | `FX-112..117` 图形含可阅读的原始数值/说明，不自动计算或绑定接口；`VG-099..102` 仅装饰性图形，不能冒充实际数据 |
| **CJK 排版、Ruby 注音与多语言混排** | [V0.56 六套语义 CSS/HTML](styles/primitives/v056/README.md) · [4 幅原始 SVG](graphics/v056/README.md) · [原件样张](playground/multiscript-v056/index.html) | `FX-106..111` 有独立 class/真实 HTML，`VG-095..098` 有自包含矢量；浏览器字体支持与实际语言内容须在宿主验证 |
| **最新原创触感控件 / 手绘矢量** | [V0.55 CSS/HTML 原件](styles/primitives/v055/README.md) · [V0.55 SVG](graphics/v055/README.md) · [原件 Demo](playground/materials-v055/index.html) | `FX-100..105` 可按类提取；`VG-091..094` 可独立使用。静态图不是传感器/地图/真实数据，研究级实现非生产验收 |
| **SVG、图标、纹理、插画** | [材料系列索引](registry/README.md) → 对应 `VG-*` | [`graphics/`](graphics/) 中单个原图/相应版权与用途说明；不要把静态示意当成动态组件 |
| **交互行为/可操作原型** | [交互研究](docs/interactions/) → `IP-*` | 对应 `path/spec/demo` 和 `handoff.mode`；行为合同、原型与可复用源码要区分 |
| **第三方现成项目/外部设计参考** | [来源档案](docs/research/sources.md) · [具体组件研究](docs/research/component-dossiers-v037.md) · [专项资源](registry/specialized-resources-v030.json) · [V0.54 固定源码级近期参考](registry/material-expansion-v054.json) | 原作者、固定源码路径/版本、许可、访问状态；外部 REF 默认**不能直接复制** |
| **页面结构/布局案例** | [V0.53 独立图文布局](styles/primitives/v053/README.md) · [原始预览](playground/composition-v053/index.html) · [页面模板](registry/page-templates.json) · [页面配方](recipes/) | 6 种可独立复制的 CSS 图文编排原件；不是可直接部署的整页产品 |

**GitHub-only（无需安装依赖）**：先看对应小索引，找到准确 ID → 查同名条目 / 指向的原文件 → 最多打开必要的源码、说明、Demo。避免预先读取较大的 `registry/assets.json` 或整个 `playground/`。只有需要全库字段交叉匹配时才读 `registry/assets.json`。

**本地有 Node 时**可选用已有词项检索器（不是语义搜索，也不会生成页面）：

```sh
node scripts/find-assets.mjs --intent="图片对比滑块" --type=component --reuse=copyable-source --goal=implementation --limit=5 --json
node scripts/find-assets.mjs --intent="程序绘图" --reuse=copyable-source --goal=implementation --limit=5 --json
node scripts/find-assets.mjs --intent="拖拽排序" --type=interaction --goal=behavior --limit=5 --json
```

**典型定位范例（仅示意路径）**：
- `UI-060` → `packages/ui/src/cross-context.tsx`：真实 React 前后对比组件；仍需检查依赖及宿主适配。
- `FX-090` → `styles/primitives/v052/procedural-and-depth.css`：独立 CSS 亚克力叠层参考；不是真 3D 渲染。
- `FX-097` → `styles/primitives/v053/composition-atoms.css`：独立图注优先拼版 CSS；可参考构图，不是 React Gallery。
- `VG-081` → `graphics/v052/scenes/acrylic-monoliths.svg`：独立原创 SVG 场景。
- `IP-060` → `playground/visual-editor-v039/reorder-model.mjs`：原型级区块排序模型；非整套编辑器。
- `REF-124` → `docs/research/material-expansion-v043.md`：上游动态浮岛的研究入口；非本仓库导出源码。

### B · 给出有依据的大致设计方向

先读 [`registry/style-facets.json`](registry/style-facets.json)（14 种风格的场景、布局、材质、密度、设备、概述、预览及注意事项），再参考 [风格注册表](registry/styles.json) 或 [创意方向](registry/creative-directions.json)。从以下分组挑选**不同**的方向，不应因为项目类型自动选中第一项：

| 任务形态 | 候选风格 ID |
| --- | --- |
| 后台、工作空间、专业工具 | `refined-light-saas` · `precision-dark` |
| 阅读、内容叙事、作品集 | `editorial-warm` · `type-led-minimal` · `paper-rebellion` |
| 零售、商品展示、温暖品牌 | `commerce-atelier` · `organic-tactile` |
| 移动短任务、学习、个性化选择 | `playful-pop` · `shape-expressive` |
| 品牌活动、视觉冲击、悬浮场景 | `neo-brutalist` · `liquid-layer` |
| 游戏、科幻、沉浸叙事 | `pixel-arcade` · `signal-noir` · `aether-orbit` |

方向建议要同时写出：**布局结构**、**视觉语言**（色彩/字体/材质）、**交互节奏**、**适用/不适用的理由**及**现有原始参考路径**。必要时给 [Theme Atlas 预览](playground/style-atlas/README.md)，或按 `style-facets.entries[].preview` 查真实独立 Demo。若任务需要更不寻常的方向，还可参考 [原创视觉研究](docs/styles/creative-art-direction.md) 与 `FX-*/VG-*` 的局部装饰素材。**不要把风格研究自动变成 React 兼容或整页复刻承诺。**

## 最小交接格式（推荐）

- **找素材**：`目标 → 2–5 个候选 ID → [可参考/可改造/仅研究] → 精确源码或来源 → 预览 → 使用限制`。优先给实物，不为凑数虚构存在的素材。
- **找方向**：`目标与设备 → 2–3 条明显不同的方向 → 每条的布局 + 视觉 + 交互 → 支持该建议的 styleId/样张 → 风险`。允许“目前没有直接素材，需要在目标项目新设计”。
- **找不到**：明确报告“索引未命中”，尝试已登记同义词或相邻类别；**词项检索未命中 ≠ 仓库一定没有**。
- **复用审慎原则**：`copyable-source` 只表示存在可检查的参考原件，不等于生产就绪；`adapt-required` 需要自行集成；`research-only` 只能研究。检查 `stage`、`reuseKind`、`styleIds`、`dependencies`、`license`、`verified` 和 `handoff`。空 `styleIds` 不是“任意风格通用”。

进一步查找旧版、按功能细分或特殊材料，请进入 [深度任务索引 CATALOG](CATALOG.md)；长期维护规则见 [AGENTS](AGENTS.md)。
