# SaaS Edit + Filter Lab · v0.3

独立 SaaS 表单与高级筛选交互实验；基于原创静态 HTML/CSS/ESM 模块，不依赖第三方运行时。

```bash
# 在仓库根目录启动静态服务（不要使用 file://）
python -m http.server 8009
# 然后在浏览器打开
http://127.0.0.1:8009/playground/saas-editing/
```

## 体验步骤

1. 编辑名称并确认短文本草稿、取消或 Esc；
2. 修改标识符、联系邮箱、描述，体验 blur 校验与保存前校验；
3. 勾选“模拟保存失败”，观察失败后草稿保留、可重试；
4. 修改后切换到高级筛选，体验“继续编辑/放弃更改”的对话框；
5. 使用 AND/OR 组合筛选，添加嵌套组，应用条件查看匹配结果；
6. 尝试 `Ctrl/⌘+S`、筛选页 `/`、`Esc`。
   
表单保存、筛选、所有记录为**本地模拟**，刷新恢复初始状态。未保存更改刷新提示取决于浏览器设置。

## 验证

`node --test tests/saas-edit-model.test.mjs` 测试纯逻辑；CI 加载/语法+纯逻辑检查。没有宣称完整浏览器交互、触屏、读屏、视觉截图或生产集成已完成。

## 来源和授权

[研究说明](../../docs/saas/editing-patterns.md) 引用 Atlassian、Vercel Geist、Linear、NN/g 的官方公开资料，只借鉴交互原则，不复制其专有产品实现。
