# Interaction pattern field guide

This document is a **research synthesis**, not a claim that all patterns are already implemented.

## Principles

1. Feedback immediately follows intent; async actions communicate state and allow cancel/retry where valid.
2. Preserve context: don't require full page transition if a Peek/Sheet is sufficient.
3. High-frequency interactions should remain fast. Motion explains cause and continuity; no loop for decoration.
4. Keyboard, pointer, touch and reduced-motion behavior are specified together.
5. Optimistic feedback must have recovery semantics; no false “saved” status before confirmation.

## Candidate patterns

| ID | Pattern | Trigger and transition | Escape/keyboard | Caveat | Reference |
| --- | --- | --- | --- | --- | --- |
| IP-001 | Global Command Palette | Cmd/Ctrl+K → search → select → action | Arrow/Enter, Esc, focus restoration | separate global action from plain search | [Geist Command Menu](https://vercel.com/geist/command-menu) |
| IP-002 | Linear Peek | item focused → temporary preview → back to list | Space / arrows / Esc as supported | not a replacement for full detail | [Linear Peek](https://linear.app/docs/peek) |
| IP-003 | Detail Sheet | click list item → side overlay → close to list | Esc, trapped focus where modal | route and history policy must be clear | [Geist Sheet](https://vercel.com/geist/sheet) |
| IP-004 | Confirm Modal | destructive/important request → review → confirm/cancel | focus loop, Esc policy | use sparingly; no accidental confirmation | [Geist Modal](https://vercel.com/geist/modal) |
| IP-005 | Shared Tab Indicator | click/keyboard tab → indicator travels → content changes | roving focus + reduced motion | never obscure immediate content updates | [Motion smooth tabs](https://motion.dev/examples/react-smooth-tabs) |
| IP-006 | Toast Feedback | operation result → brief lightweight notice | announce to assistive tech; optional undo | do not use for blocking errors | [Geist](https://vercel.com/geist/introduction) |
| IP-007 | Async Progress & Cancel | request → progress/tool steps → complete/failed/canceled | accessible Stop and retry | no fake percent or premature success | [Geist Spinner](https://vercel.com/geist/spinner) |
| IP-008 | Resizable Panels | drag divider → panels resize | keyboard substitute, min/max | touch alternative and persistence rules | [Attio record page](https://attio.com/changelog/2026/record-page-redesign) |

## Expected behavior card

For each new pattern record:
- **Before**: prerequisite, current focus, loaded data.
- **Trigger**: pointer/keyboard/touch and discernible affordance.
- **Transition**: intermediate and animation state.
- **After**: result, selection, focus, history and state persistence.
- **Cancel/Failure**: rollback, retained input, recoverability, no false completion.
- **Validation**: keyboard, screen reader, 320–390px viewports, motion reduction, loading/performance.

## Applied direction for AI workflows

AI status presentation should emphasize trust over spectacle: show which step/tool is running, what is waiting for user input, how to stop, when a handoff is final, and where failure can resume. Do not portray scripted automation as autonomous agent reasoning.

## V0.7 cross-style research additions

IP-009–IP-012 live in [advanced interaction specifications](advanced-patterns.md) and a standalone [Interaction Lab](../../playground/interaction-lab/index.html). IP-013 is demonstrated in [Bold Grid](../../playground/bold-grid/index.html), with [motion and focus guardrails](../motion/motion-system.md). These are behaviors to evaluate, not mandatory visual components.

## V0.14 · 高级与特殊交互研究

在原有 IP-001 命令面板及 IP-009～IP-012 基础操作之外，新增 **IP-018 空间画布／框选／缩放／可撤销移动**、**IP-019 键盘可操作的径向上下文菜单**与 **IP-020 原生滑块驱动的连续状态对比**。这三类是原创、跨风格的行为原型，未纳入 React 生产组件包。

[查看实际演示](../../playground/advanced-interactions/index.html) · [场景与键盘／触控／失败路径规范](special-interactions.md)。不采用鼠标专属手势作为关键操作的唯一入口；不要把真实业务状态误写为本地研究操作的成功。


## V0.15 · 第二批高级/特殊交互（prototype）

新增 **IP-021 可撤销跨容器拖放**（Pointer 原生拖动 + 键盘拾取/目标选择/放下 + 明确按钮入口）及 **IP-022 FLIP 卡片重排**（原始 DOM 节点复用、顺序及布局切换、减少动效即时更新）。两者在 [独立可运行实验室](../../playground/advanced-interactions-v2/index.html) 中验证，具体设备、键盘、异常与恢复边界见 [行为规范](advanced-interactions-v2.md)。不等同于生产级 React 组件、真实持久化或跨浏览器验收。


## V0.16 · 第三批特殊交互（研究原型）

**IP-023 多轨剪辑与帧级磁吸编辑**：24 FPS 整数帧、片段边界/播放头/整秒吸附、轨道重叠验证、Pointer 拖拽及键盘逐帧/跨轨操作、撤销重做；不同于普通的 Kanban 列间拖放。

**IP-024 滚动驱动的编辑叙事**：完整可访问的四章正文、原生滚动进度、可选的 CSS 装饰反馈、章节显式导航与减少动效兜底；不是自动播放动画或只有动画才出现的内容。

[第三批实际演示](../../playground/advanced-interactions-v3/index.html) · [行为规范与测试边界](advanced-interactions-v3.md)。均为 `prototype`，无需继承当前演示的任何主题颜色。
