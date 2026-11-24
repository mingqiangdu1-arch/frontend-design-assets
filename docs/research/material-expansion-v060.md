# V0.60 · 程序纹样、材质与创意控件来源扩充

本轮独立探索六个原注册表未直接收录的 GitHub 来源，新增八个具体原件研究条目。逐项读取固定提交的源码和许可证；不导入第三方源码、图片、字体或运行依赖，不宣称浏览器/目标集成验证。

## 选材策略

- 从 V0.47 固定平铺 SVG、V0.52 Canvas、V0.55 触感及 V0.59 字符场向真正参数化纹样与材质算法扩展。
- 数据产品增加纹理辅助编码，创意控件增加二维颜色状态逻辑。
- 不将风格深化方向视为 React 主题兼容；均为 research-only。

## REF-149 · Flowshape · Guilloché ring engraving / 玑镂环形雕纹

- 来源：Jossifresben/flowshape，固定提交 `07d30a244e4b638a8356e03c9bd252c82a9c42b3`。
- [src/patterns/guilloche.ts](https://github.com/Jossifresben/flowshape/blob/07d30a244e4b638a8356e03c9bd252c82a9c42b3/src/patterns/guilloche.ts)
- 许可：[MIT](https://github.com/Jossifresben/flowshape/blob/07d30a244e4b638a8356e03c9bd252c82a9c42b3/LICENSE)。如后续实际复制，保留版权与许可并核查相关依赖、素材的独立许可。
- 可研究：以参数化闭合余弦环和相位差形成雕刻交织，提供环数、瓣数、深度、线宽和周期控制。
- 与既有资产差异：补充 VG 固定装饰与 FX 字符场之外的连续矢量曲线参数研究。
- 适用方向（非兼容承诺）：aether-orbit / organic-tactile / signal-noir
- 限制：仅参考装饰性几何，不作货币、防伪或仪表数据；依赖项目 SVG 和 pattern registry。

## REF-150 · Flowshape · Truchet seeded tiling / 种子弧线拼砖

- 来源：Jossifresben/flowshape，固定提交 `07d30a244e4b638a8356e03c9bd252c82a9c42b3`。
- [src/patterns/truchet.ts](https://github.com/Jossifresben/flowshape/blob/07d30a244e4b638a8356e03c9bd252c82a9c42b3/src/patterns/truchet.ts)
- 许可：[MIT](https://github.com/Jossifresben/flowshape/blob/07d30a244e4b638a8356e03c9bd252c82a9c42b3/LICENSE)。如后续实际复制，保留版权与许可并核查相关依赖、素材的独立许可。
- 可研究：种子控制网格单元方向，可选弧形/斜线及线条/填充表示；形状和强调色的选择受参数控制。
- 与既有资产差异：不同于现有固定重复纹样，研究整幅网格的确定性变化。
- 适用方向（非兼容承诺）：paper-rebellion / neo-brutalist / shape-expressive
- 限制：依赖 PRNG 与 SVG 生成层；导出平铺边缘连续性不能由单格连续直接推断。

## REF-151 · Vladstudio Patterns · Clearance-aware shape packing / 无碰撞形状纹样

- 来源：vladstudio/patterns，固定提交 `59d6905c8f120f3c481d9f23dd846aa1adee1beb`。
- [app/generator.js](https://github.com/vladstudio/patterns/blob/59d6905c8f120f3c481d9f23dd846aa1adee1beb/app/generator.js)
- 许可：[MIT](https://github.com/vladstudio/patterns/blob/59d6905c8f120f3c481d9f23dd846aa1adee1beb/LICENSE)。如后续实际复制，保留版权与许可并核查相关依赖、素材的独立许可。
- 可研究：以胶囊线段与安全间距判断碰撞，先从邻近形状扩展再填补空隙；支持 tile 边缘模式。
- 与既有资产差异：补充已有固定周期 VG 图纹和程序化 Canvas，而非再增加一个静态平铺样张。
- 适用方向（非兼容承诺）：organic-tactile / paper-rebellion / shape-expressive
- 限制：生成复杂度、输出规模、几何辅助文件与原始形状素材许可须分别复核。

## REF-152 · Textures.js · SVG pattern fills / 图表图案填充

- 来源：riccardoscalco/textures，固定提交 `6d39b98a2b46c4674c98033b8a6b4d7fda192b45`。
- [dist/textures.esm.js](https://github.com/riccardoscalco/textures/blob/6d39b98a2b46c4674c98033b8a6b4d7fda192b45/dist/textures.esm.js)
- 许可：[MIT](https://github.com/riccardoscalco/textures/blob/6d39b98a2b46c4674c98033b8a6b4d7fda192b45/license)。如后续实际复制，保留版权与许可并核查相关依赖、素材的独立许可。
- 可研究：可配置圆点等 SVG pattern 定义、尺寸、密度、底色和 ID；支持以填充引用组织纹理。
- 与既有资产差异：现有 FX 图表以静态色形为主；此处研究非颜色视觉编码与图例配套。
- 适用方向（非兼容承诺）：type-led-minimal / editorial-warm / precision-dark
- 限制：所核对文件为发布构建产物，使用 D3 风格 selection；真实无障碍须通过文字图例与对比度验证，注意 SVG ID 冲突。

## REF-153 · Viberdy · Dither Develop Card / 点阵显影图卡

- 来源：viberdy-dev/ui，固定提交 `3ef691b4dbf79e81a8615b1f934ea6c4ef2c79e7`。
- [components/dither-develop-card.tsx](https://github.com/viberdy-dev/ui/blob/3ef691b4dbf79e81a8615b1f934ea6c4ef2c79e7/components/dither-develop-card.tsx)
- 许可：[MIT with Commons Clause](https://github.com/viberdy-dev/ui/blob/3ef691b4dbf79e81a8615b1f934ea6c4ef2c79e7/LICENSE)。仅索引研究；不能将其视为无条件 MIT，禁止以可转售/再分发的组件库形式搬运。
- 可研究：React 组件源文件说明以 CSS ordered dithering、首次进入显影与指针光照组合；使用 React hooks 与独立字体回退。
- 与既有资产差异：FX-124..129 是字符场，不提供图像明暗抖动；该参考补充影像显影机制。
- 适用方向（非兼容承诺）：pixel-arcade / signal-noir / paper-rebellion
- 限制：不得作为本库的可转售/再分发 UI 素材复制；图片/字体授权、移动端和 reduced-motion 实测须在目标项目核验。

## REF-154 · Viberdy · Concrete Wall Texture / 水泥墙程序材质

- 来源：viberdy-dev/ui，固定提交 `3ef691b4dbf79e81a8615b1f934ea6c4ef2c79e7`。
- [components/concrete-wall-texture.tsx](https://github.com/viberdy-dev/ui/blob/3ef691b4dbf79e81a8615b1f934ea6c4ef2c79e7/components/concrete-wall-texture.tsx)
- 许可：[MIT with Commons Clause](https://github.com/viberdy-dev/ui/blob/3ef691b4dbf79e81a8615b1f934ea6c4ef2c79e7/LICENSE)。仅索引研究；不能将其视为无条件 MIT，禁止以可转售/再分发的组件库形式搬运。
- 可研究：Canvas 使用可重复种子与循环值噪声、低分辨率底层斑驳及高分辨率细点，提供色调和混合模式。
- 与既有资产差异：补充 V0.55 的金属/棱镜 CSS 质感与 V0.52 的 Canvas 绘图。
- 适用方向（非兼容承诺）：organic-tactile / neo-brutalist / paper-rebellion
- 限制：同上 Commons Clause；仅研究算法与层次，不复制组件；检查 DPR、resize、内存及遮盖文字时的可读性。

## REF-155 · React Colorful · Saturation and hue controls / 二维色彩选择

- 来源：omgovich/react-colorful，固定提交 `0bc3fb57999522ead7215debb89e0660de28a4d4`。
- [src/components/common/Saturation.tsx](https://github.com/omgovich/react-colorful/blob/0bc3fb57999522ead7215debb89e0660de28a4d4/src/components/common/Saturation.tsx)
- [src/components/common/Hue.tsx](https://github.com/omgovich/react-colorful/blob/0bc3fb57999522ead7215debb89e0660de28a4d4/src/components/common/Hue.tsx)
- 许可：[MIT](https://github.com/omgovich/react-colorful/blob/0bc3fb57999522ead7215debb89e0660de28a4d4/LICENSE)。如后续实际复制，保留版权与许可并核查相关依赖、素材的独立许可。
- 可研究：饱和度/亮度平面映射双轴，色相映射单轴；源文件处理键盘增量、边界截断与可读 ARIA 值。
- 与既有资产差异：FX-039 只是原生调色入口，本参考是二维控件和色相轴的状态逻辑。
- 适用方向（非兼容承诺）：refined-light-saas / precision-dark / type-led-minimal
- 限制：需配合 Interactive、Pointer、颜色转换与宿主数据契约；不能仅依据 ARIA 属性宣称可访问性认证。

## REF-156 · Rough.js · Polygon hachure filler / 手绘排线填充

- 来源：rough-stuff/rough，固定提交 `56a2762171b1294d643501e8d14f120db6b27bd7`。
- [src/fillers/hachure-filler.ts](https://github.com/rough-stuff/rough/blob/56a2762171b1294d643501e8d14f120db6b27bd7/src/fillers/hachure-filler.ts)
- [src/fillers/scan-line-hachure.ts](https://github.com/rough-stuff/rough/blob/56a2762171b1294d643501e8d14f120db6b27bd7/src/fillers/scan-line-hachure.ts)
- 许可：[MIT](https://github.com/rough-stuff/rough/blob/56a2762171b1294d643501e8d14f120db6b27bd7/LICENSE)。如后续实际复制，保留版权与许可并核查相关依赖、素材的独立许可。
- 可研究：多边形扫描排线生成后通过双线操作绘制粗糙填充；角度、间距和粗糙度可调。
- 与既有资产差异：比已有手绘视觉 SVG 多出任意多边形的可适配填充算法。
- 适用方向（非兼容承诺）：paper-rebellion / editorial-warm / organic-tactile
- 限制：扫描线模块引用 hachure-fill；许可证及依赖需再核实，复杂多边形、洞及随机确定性需实测。

## Agent 调用

```sh
node scripts/find-assets.mjs --family=REF --intent="图表纹理" --reuse=research-only --compact --json
node scripts/find-assets.mjs --family=REF --intent="二维调色" --compact --json
```

核查选中项具体源码和许可后再决定目标工程是否引入。只有目标工程验证才能升级实现声明。
