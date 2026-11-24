# V0.62 · Original creative editing micro-controls

六个可独立提取的原生 HTML/CSS/JS 原件，不是统一编辑器或 React 组件库。对比 V0.49/52 及 REF-155 后选择实际增量，不复制第三方实现。

| ID | CSS class / mode | 功能 | 与既有资产区别 | 边界 |
| --- | --- | --- | --- | --- |
| FX-136 | `.fx62-hsl` / hsl | 21 行 HSL 色面与指针拖动，三条原生滑杆提供相同色相/饱和度/亮度能力；实时 HEX。 | FX-039 仅 native color；FX-064 仅视觉焦点。 | 色面是 5% 亮度采样近似，标记与 HEX 用精确值；不是 HSV、色彩管理或对比度认证。 |
| FX-137 | `.fx62-stops` / stops | 三原生颜色输入、可移动中间色标与真实 CSS 渐变字符串。 | FX-063 只有角度，不含色标。 | 固定两端和单中间色标，不支持自由增删、角度、持久化或跨色彩空间。 |
| FX-138 | `.fx62-alpha` / alpha | 同一前景颜色和透明度同时显示浅/深底，输出两组按 sRGB 通道插值的估算 HEX。 | FX-067 是 blend-mode 选择；本项强调透明度在两种底色上的实际差异。 | 普通 source-over 估算，不作色彩管理、对比度认证、图层混合或导出。 |
| FX-139 | `.fx62-finish` / finish | 粗糙度调高光宽度/模糊/强度，倾角控制试片及高光方向。 | FX-092 固定三态色盘；本项连续参数改变表面效果。 | 纯 CSS 材质近似，非 PBR、BRDF、3D 渲染、真实材质测量。 |
| FX-140 | `.fx62-bezier` / bezier | 四个原生滑杆调整 SVG 曲线和控制柄，同步输出合法 cubic-bezier CSS。 | VG-053 只是图标；本项为实际数学控制。 | 四轴都限制在 0–1，无 overshoot、动画播放或时间线编辑。 |
| FX-141 | `.fx62-mask` / mask | 两条原生滑杆改变 CSS clip-path inset 与百分比圆角，棋盘标记被裁掉的区域。 | VG-073..076 静态 SVG；FX-066 仅开关安全线。 | 只预览原创几何背景；不加载或裁切真实图片、不生成文件、不做布尔路径编辑。 |

[样张](../../../playground/editing-controls-v062/index.html) · [CSS](editing-atoms.css) · [ES 模块](editing-model.mjs)。通过 HTTP 静态服务打开。选取相应 class、匹配 data-fx62 DOM 与 module；宿主挂载后调用 mountEditingAtoms(root) 一次，卸载时执行返回的清理函数。输入原生可键盘操作；色面 pointer shortcut 有同值滑杆。模块无外部依赖、网络、存储、动画计时器或上传权限。输出 CSS 仅由有限数值和六位 HEX 拼接。色面近似采样、alpha HEX 为普通 sRGB 估算、材质为纯 CSS 视觉；目标工程需核查浏览器、移动端、键盘/读屏与 forced-colors。

纯函数检查：HSL 三原色和灰色、渐变位置截断、alpha 0/50/100、Bezier 控制点映射、遮罩边界，共十项；非 DOM、视觉、浏览器验收。
