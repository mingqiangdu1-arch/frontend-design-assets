# 高级 / 特殊交互资产 · V0.14 首批可运行研究

**定位：跨风格交互机制库，不是新的一套 UI 视觉主题。** 本轮新增 [交互实验室](../../playground/advanced-interactions/index.html) 的三个原创静态演示，与已有的 [基础交互实验室](../../playground/interaction-lab/index.html)（Undo、Wizard、可访问排序、Split）及 [IP-001 Command Menu](patterns.md) 并列，避免重复收录。

本次的 JavaScript、图形与布局均为仓库原创；**无第三方 UI 代码、动画库、字体或图片**。它们是静态演示 + 明确的边界，不是完整生产组件；迁移到 React/Next.js/Canvas/SVG 或移动端时需要重新处理性能、状态和语义。

## IP-018 · Spatial Canvas / 空间画布与批量选择

**应用：** 产品脑图、流程编排、节点关系图、白板、复杂内容编辑、地图式叙事、游戏关卡编辑。

| 阶段 | 输入 / 行为 | 无障碍与失败边界 |
| --- | --- | --- |
| 进入 | 选择 / 平移两个显式模式；缩放 +/- / 适配按钮 | 不能只支持鼠标滚轮；一般滚轮继续原生滚动，仅 Alt + Wheel 可缩放 |
| 选择 | 点击节点、Shift + 点击切换多选、空白拖出矩形框选 | 单独提供选择下拉框；节点可聚焦；选中状态有框线、背景和 `aria-pressed` |
| 移动 | 指针拖动单节点或选择集；方向键每步 10，Shift + 方向键每步 30；显式四方向按钮 | Pointer Events + `setPointerCapture`；`pointercancel` 不应提交未完成移动；画布区域使用 `touch-action:none`，页面其他区域仍可正常滚动 |
| 缩放 | 以指针 / 视口中心保持世界坐标锚点的缩放 | 缩放限制 50%–180%；在窄视口最低缩放无法完整容纳画布时，优先显示已选第一个节点，向右平移探索 |
| 结束 | 提交后加入最多 20 条本地节点位置快照；Undo / Redo | 新编辑会丢弃重做分支；不声称多人协作、永久保存、碰撞检测、无限画布、自动布局或 CRDT |

模型与渲染分离：[`model.mjs`](../../playground/advanced-interactions/model.mjs) 暴露可复用的 `screenToWorld`, `zoomAt`, `boxHits`, `moveNodes`, `commitNodes`, `undoNodes`, `redoNodes`；浏览器层只消费其状态。大型画布需要进一步设计帧率、pointermove 节流、视口剔除、节点虚拟化和按需渲染。

## IP-019 · Contextual Orbit Menu / 径向上下文操作

**应用：** 媒体剪辑、桌面生产力、游戏工具、设计工作台、图像操作、复杂对象快捷命令。

- 明确按钮始终存在；鼠标右键或对象获得焦点时 **Shift + F10** 是额外入口。
- 菜单使用可命名的 `role=menu` / `role=menuitem`。方向键跨项移动，Home / End 定位，Enter 执行动作；**Escape 关闭并把焦点还给打开者**。点击外部可取消。
- 宽屏使用四方向径向布局；小屏自动切换为普通两列可见菜单，**不强迫用户进行精确圆周手势**。
- 示例操作仅改变浏览器内的标记、置顶与“复制次数”；复制表示本地模拟操作，并没有写系统剪贴板、复制真实文件或发请求。
- 本版没有实现长按计时器、双指触发、嵌套菜单、可撤销批量动作或真实业务权限。正式使用前需要做完整菜单键盘与读屏验证；径向外观不是快捷语义的替代品。

## IP-020 · State Scrubber / 状态擦拭与连续对比

**应用：** 设计修改前后比较、图片修复、参数调优、审阅前后状态、视频调色、数据版本对照。

- 使用原生 `<input type="range">` 而非一个无法聚焦的拖动 `<div>`；0–100%，步长 5，支持鼠标、触控、方向键和三个精确预设。
- 两个 **原创 CSS 状态示意** 在相同坐标重叠。输入控制 `--percent` 与 `clip-path`，始终有可读的输出文字；页面不提供虚假的真实修图或图片生成结果。
- 仅在对比区域拦截水平拖动；页面竖向滚动不被接管。优先满足 `prefers-reduced-motion`，不自动播放、无循环闪动。
- 图形图层标记 `aria-hidden=true`；对比的语义由滑块标签及数值输出承载。真实图片比较需要等比例配准、EXIF/图片方向、缩放对齐、巨大资源懒加载、空图片回退和更充分的读屏说明。

## 统一使用要求

每种特殊交互都应存储如下信息：应用场景、任务动机、前置状态、触发输入、实时反馈、焦点/历史、手势取消、键盘与触控替代方案、响应式策略、减弱动效策略、数据真实性、许可来源、验证范围。不能因为动效酷炫就默认在所有页面开启。

- **不抢夺系统行为：** 非交互区域正常滚动；Ctrl/Command 快捷键避让文本框和系统默认操作；触控只在明确的受控画布内使用 `touch-action:none`。
- **可取消：** 关闭菜单恢复原焦点；指针取消不应隐式提交编辑；本地撤销与真实服务器撤销必须明确区分。
- **多输入适配：** 手势只是额外入口，每条关键操作有明确按钮或原生表单可完成。
- **真实性与范围：** 展示性插画不代表真实用户资产，浏览器模拟状态不代表云端已保存。Playwright Chromium 通过不等于 Safari、Firefox、真实触控或屏幕阅读器已经验证。
- **视觉不绑定：** 实验演示选用了独立的深色技术排版作为承载，但核心坐标、历史、选择与行为 API 不包含该主题变量。

参考： [MDN Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)、[WAI-ARIA APG Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)、[WAI-ARIA 可编辑组合框](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)（仅对已有命令搜索相关）及 [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)。这些链接仅指导语义/事件处理；没有复制其示例代码。

## 尚未实现的后续高级交互候选

| 方向 | 适合应用 | 引入前的难点 | 当前阶段 |
| --- | --- | --- | --- |
| 可访问多点触控 / 双指缩放 + 惯性 | 地图、白板、画布 | Pointer 多指状态、缩放中心、失焦、iOS/Android 真实设备 | 研究待办 |
| FLIP 布局重排与 Shared Element 过渡 | 卡片看板、视觉内容页 | 动画中焦点、减少动效、性能、浏览器 API 支持 | 研究待办 |
| 可撤销拖放 + 跨容器排序 | 项目管理、媒体资产库 | 拖拽对键盘、触控、虚拟列表、撤销/同步冲突 | 研究待办 |
| Scroll-driven 叙事 / 分镜 | 品牌活动、数字展览 | 滚动驱动动画兼容、Reduced Motion、内容原生可见 | 研究待办 |
| 多层时间线与磁吸吸附 | 视频剪辑、音频编辑、游戏关卡 | 缩放-时间映射、精确落点、帧率与撤销历史 | 研究待办 |
| 非线性批量操作 / 命令链 | AI 编排、开发者工具 | 权限、确认与回滚、可解释性和真实任务状态 | 研究待办 |

**不要将研究待办标记为已实现，也不要把第三方商业界面的视觉复刻当作可复用的原创组件。**

## 验证与运行

```sh
npm run dev:catalog
# http://127.0.0.1:8009/playground/advanced-interactions/
node --test tests/advanced-interactions.test.mjs
npm run test:browser
```

浏览器测试涵盖 390、768、1440 像素截图、空间移动/历史、径向菜单的焦点归还、原生滑块键盘与鼠标以及页面横向溢出。截屏仅为 **capture-only, unapproved**，不是已审定的设计 golden。正式生产迁移需再次验证触控、读屏、Safari/Firefox、不同字体，以及协作/并发等业务状态。

## V0.14 首轮真实验证记录 · 2026-11-05

- GitHub Draft PR #4 (historical private pull/4)：独立实验分支，未合并主分支。
- 仓库资产/单元/语法/Token CI (historical private actions/runs/41982369352)：通过；新增 4 条资产后，分支注册总数为 125。
- 真实 Chromium Playwright 浏览器回归 (historical private actions/runs/41982369373)：**45 项通过**（其中 7 项属于新高级交互实验，其他既有浏览器测试保留），包含 Pointer 拖动、撤销、键盘菜单、状态滑杆、390/768/1440px 三个宽度和页面级溢出验证。
- 最初测试在桌面视口外发送鼠标动作而失败，已修改为先滚动节点至视口可见再执行拖动。另经浏览器截图复核发现“桌面加载后缩小到手机宽度”时画布沿用旧缩放导致初始节点被裁切，现已在 resize 时主动适配画布，并增加目标节点始终完整可见的断言。该改动以主分支实验 PR 的最新 CI 为准。
- 已审看 CI 实际 390px 截图，默认选中节点可见且原始四节点关系可平移浏览；这不是形式化的视觉 golden，更不表示 Safari/Firefox 或真机多指交互已认证。
- Notion 长期知识库记录 (private research record omitted)：使用场景、源代码入口、适用边界与未来高级交互待办。首次用户可用演示仍是本地静态页面，没有部署公网服务。
