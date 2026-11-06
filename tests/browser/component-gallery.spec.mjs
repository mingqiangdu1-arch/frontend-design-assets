import {test,expect} from "@playwright/test";

test.beforeEach(async({page})=>{await page.goto("/");});

test("gallery presents 41 component exports and explicit themes",async({page})=>{
 await expect(page.getByRole("heading",{name:/组件不仅要好看/})).toBeVisible();
 await expect(page.locator("[data-theme-button]")).toHaveCount(4);
 await expect(page.locator('[data-theme-button="refined-light-saas"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator(".cg-spec")).toHaveCount(32);
});

test("switching style updates scope and semantic background",async({page})=>{
 const colors=[];
 for(const id of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
  await page.locator('[data-theme-button="'+id+'"]').click();
  await expect(page.locator(".fda-scope")).toHaveAttribute("data-design-theme",id);
  const bg=await page.locator(".fda-scope").evaluate(el=>getComputedStyle(el).backgroundColor);
  colors.push(bg);
 }
 expect(new Set(colors).size).toBe(4);
});

test("form input exposes inline error and controlled values",async({page})=>{
 const input=page.locator("#forms").getByRole("textbox",{name:/项目名称/});
 await input.fill("ab");
 await expect(input).toHaveAttribute("aria-invalid","true");
 await expect(page.getByRole("alert").filter({hasText:"至少需要 3 个字符"})).toBeVisible();
 await input.fill("完整项目名称");
 await expect(input).not.toHaveAttribute("aria-invalid","true");
 await page.getByRole("combobox",{name:"工作空间"}).selectOption("creative");
 await expect(page.getByRole("combobox",{name:"工作空间"})).toHaveValue("creative");
});

test("choice inputs and switch are controlled",async({page})=>{
 const check=page.getByRole("checkbox",{name:/我已审核/});
 await check.check();
 await expect(check).toBeChecked();
 const toggle=page.getByRole("switch",{name:"启用通知"});
 await expect(toggle).toHaveAttribute("aria-checked","true");
 await toggle.click();
 await expect(toggle).toHaveAttribute("aria-checked","false");
});

test("tabs support arrow keys and skip disabled tab",async({page})=>{
 const tab=page.getByRole("tab",{name:"概览"});
 await tab.focus();await tab.press("ArrowRight");
 await expect(page.getByRole("tab",{name:"活动记录"})).toHaveAttribute("aria-selected","true");
 await page.getByRole("tab",{name:"活动记录"}).press("End");
 await expect(page.getByRole("tab",{name:"配置"})).toHaveAttribute("aria-selected","true");
 await expect(page.getByRole("tab",{name:"不可用"})).toBeDisabled();
});

test("dialog closes on Escape and toast can dismiss",async({page})=>{
 await page.getByRole("button",{name:"次要操作"}).click();
 await expect(page.getByRole("dialog",{name:"确认当前操作"})).toBeVisible();
 await page.getByRole("dialog").press("Escape");
 await expect(page.getByRole("dialog")).toBeHidden();
 await page.getByRole("button",{name:"主要操作"}).click();
 await expect(page.getByRole("status").filter({hasText:"操作已完成"})).toBeVisible();
 await page.getByRole("button",{name:"关闭消息"}).click();
 await expect(page.getByRole("status").filter({hasText:"操作已完成"})).toHaveCount(0);
});

test("progress and selection respond to interactions",async({page})=>{
 await expect(page.getByRole("progressbar",{name:"构建进度"})).toHaveAttribute("aria-valuenow","65");
 await page.getByRole("button",{name:"+10%"}).click();
 await expect(page.getByRole("progressbar",{name:"构建进度"})).toHaveAttribute("aria-valuenow","75");
 await page.getByRole("button",{name:/导航与视觉规范/}).click();
 await expect(page.getByRole("button",{name:/导航与视觉规范/})).toHaveAttribute("aria-pressed","true");
});

test("no global horizontal scroll in 390/1440 theme gallery",async({page})=>{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  for(const id of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
   await page.locator('[data-theme-button="'+id+'"]').click();
   const dim=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(dim.scroll,id+" at width "+width).toBeLessThanOrEqual(dim.client+1);
  }
 }
});


test("DataTable sorts semantically and permits controlled multi-select",async({page})=>{
 const table=page.getByRole("table",{name:"项目审查表"});
 await table.getByRole("button",{name:/优先级/}).click();
 await expect(table.getByRole("columnheader",{name:/优先级/})).toHaveAttribute("aria-sort","ascending");
 await expect(table.locator("tbody tr").first()).toContainText("Workshop");
 await table.getByRole("checkbox",{name:"选择Atlas Map"}).check();
 await table.getByRole("checkbox",{name:"选择Archive"}).check();
 await expect(page.locator("#data-table .cg-hint")).toContainText("Q-01");
 await expect(page.locator("#data-table .cg-hint")).toContainText("Q-03");
 await table.getByRole("checkbox",{name:"选择全部可见项目审查表"}).check();
 await expect(table.getByRole("checkbox",{name:"选择Workshop"})).toBeChecked();
 await table.getByRole("checkbox",{name:"选择全部可见项目审查表"}).uncheck();
 await expect(table.getByRole("checkbox",{name:"选择Atlas Map"})).not.toBeChecked();
});

test("TreeView expands, navigates with arrows, selects and exposes disabled nodes",async({page})=>{
 const tree=page.getByRole("tree",{name:"素材目录"});
 await tree.getByRole("button",{name:"展开设计资料"}).click();
 const visual=tree.getByRole("treeitem",{name:"视觉研究"});
 await expect(visual).toBeVisible();
 await visual.focus();
 await visual.press("ArrowDown");
 await expect(tree.getByRole("treeitem",{name:/高级交互/})).toBeFocused();
 await page.keyboard.press("Enter");
 await expect(page.locator("#tree-view .cg-hint")).toContainText("interaction");
 await page.keyboard.press("ArrowRight");
 await expect(tree.getByRole("treeitem",{name:/联动刷选/})).toBeVisible();
 await page.keyboard.press("ArrowRight");
 await expect(tree.getByRole("treeitem",{name:"联动刷选"})).toBeFocused();
 await expect(tree.getByRole("treeitem",{name:"只读归档"})).toHaveAttribute("aria-disabled","true");
});

test("Combobox keyboard selection filters and respects disabled options",async({page})=>{
 const input=page.getByRole("combobox",{name:"目标城市"});
 await input.click();
 await expect(page.getByRole("listbox",{name:"目标城市选项"})).toBeVisible();
 await input.fill("Shenzhen");
 await expect(page.getByRole("option",{name:"深圳 Shenzhen"})).toBeVisible();
 await input.press("ArrowDown");
 await input.press("Enter");
 await expect(page.locator("#combobox .cg-hint").last()).toContainText("shenzhen");
 await input.click();await input.fill("尚未开放");
 await expect(page.getByRole("option",{name:"尚未开放"})).toHaveAttribute("aria-disabled","true");
 await input.press("Enter");
 await expect(page.locator("#combobox .cg-hint").last()).toContainText("shenzhen");
 await input.press("Escape");
 await expect(page.getByRole("listbox",{name:"目标城市选项"})).toBeHidden();
});

test("Popover focuses its content and closes with Escape or outside pointer",async({page})=>{
 const trigger=page.getByRole("button",{name:"更多操作"});
 await trigger.click();
 const panel=page.getByRole("dialog",{name:"操作面板"});
 await expect(panel).toBeVisible();
 await expect(panel.getByRole("button",{name:"确认本地操作"})).toBeFocused();
 await page.keyboard.press("Escape");
 await expect(panel).toBeHidden();
 await expect(trigger).toBeFocused();
 await trigger.click();
 await page.getByRole("heading",{name:"Buttons"}).click();
 await expect(panel).toBeHidden();
});

test("DualRangeField clamps numeric values and keeps native sliders synchronized",async({page})=>{
 const group=page.getByRole("group",{name:"参数区间"});
 const low=group.getByRole("spinbutton",{name:/下限/});
 const high=group.getByRole("spinbutton",{name:/上限/});
 await low.fill("60");
 await expect(low).toHaveValue("50");
 await expect(high).toHaveValue("65");
 await high.fill("20");
 await expect(high).toHaveValue("65");
 await expect(group.getByRole("slider",{name:"下限滑块"})).toHaveValue("50");
 await expect(group.getByRole("slider",{name:"上限滑块"})).toHaveValue("65");
});

test("all added components have no document horizontal overflow in four themes",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
   await page.locator('[data-theme-button="'+theme+'"]').click();
   const x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(x.scroll,theme+" at "+width).toBeLessThanOrEqual(x.client+1);
  }
 }
});


test("CommandMenu handles filtered keyboard activation, disabled items and Escape",async({page})=>{
 await page.getByRole("button",{name:"打开命令菜单"}).click();
 const dialog=page.getByRole("dialog",{name:"快捷命令"});
 await expect(dialog).toBeVisible();
 const search=dialog.getByRole("combobox",{name:"搜索快捷命令"});
 await expect(search).toBeFocused();
 await search.fill("新建");
 await expect(dialog.getByRole("option",{name:/新建项目/})).toBeVisible();
 await search.press("Enter");
 await expect(dialog).toBeHidden();
 await expect(page.locator("#command-menu .cg-hint")).toContainText("new-project");
 await page.getByRole("button",{name:"打开命令菜单"}).click();
 await dialog.getByRole("combobox",{name:"搜索快捷命令"}).fill("删除全部");
 await expect(dialog.getByRole("option",{name:"删除全部素材"})).toHaveAttribute("aria-disabled","true");
 await dialog.getByRole("combobox",{name:"搜索快捷命令"}).press("Enter");
 await expect(dialog).toBeVisible();
 await dialog.getByRole("combobox",{name:"搜索快捷命令"}).press("Escape");
 await expect(dialog).toBeHidden();
 await expect(page.getByRole("button",{name:"打开命令菜单"})).toBeFocused();
});

test("DatePicker uses real native date semantics, valid range and clearing",async({page})=>{
 const date=page.locator("#date-picker input[type=date]");
 await expect(date).toHaveAttribute("type","date");
 await expect(date).toHaveAttribute("min","2026-11-01");
 await expect(date).toHaveAttribute("max","2026-11-30");
 await date.fill("2026-11-13");
 await expect(date).toHaveValue("2026-11-13");
 await expect(page.locator("#date-picker .cg-hint").last()).toContainText("2026-11-13");
 await page.getByRole("button",{name:"清除计划日期"}).click();
 await expect(date).toHaveValue("");
});

test("ResizablePanels offers keyboard resizing and enforces min/max",async({page})=>{
 const splitter=page.getByRole("separator",{name:"工作区分隔线"});
 await expect(splitter).toHaveAttribute("aria-valuenow","45");
 await splitter.focus();
 await splitter.press("ArrowRight");
 await expect(splitter).toHaveAttribute("aria-valuenow","46");
 await splitter.press("Shift+ArrowRight");
 await expect(splitter).toHaveAttribute("aria-valuenow","56");
 await splitter.press("End");
 await expect(splitter).toHaveAttribute("aria-valuenow","75");
 await splitter.press("Home");
 await expect(splitter).toHaveAttribute("aria-valuenow","25");
});

test("FileUpload accepts local files, rejects size/type and allows removal without network",async({page})=>{
 const field=page.locator("#file-upload input[type=file]");
 await field.setInputFiles({name:"notes.txt",mimeType:"text/plain",buffer:Buffer.from("hello")});
 await expect(page.getByRole("button",{name:"移除文件 notes.txt"})).toBeVisible();
 await expect(page.locator("#file-upload .cg-hint").last()).toContainText("1");
 await field.setInputFiles({name:"wrong.pdf",mimeType:"application/pdf",buffer:Buffer.from("%PDF")});
 await expect(page.locator("#file-upload [role=alert]")).toContainText("文件类型不允许");
 await expect(page.locator("#file-upload .cg-hint").last()).toContainText("1");
 await field.setInputFiles({name:"big.txt",mimeType:"text/plain",buffer:Buffer.alloc(1300,97)});
 await expect(page.locator("#file-upload [role=alert]")).toContainText("文件过大");
 await field.setInputFiles({name:"second.txt",mimeType:"text/plain",buffer:Buffer.from("world")});
 await expect(page.getByRole("button",{name:"移除文件 second.txt"})).toBeVisible();
 await field.setInputFiles({name:"third.txt",mimeType:"text/plain",buffer:Buffer.from("third")});
 await expect(page.locator("#file-upload [role=alert]")).toContainText("超过数量限制");
 await page.getByRole("button",{name:"移除文件 notes.txt"}).click();
 await expect(page.getByRole("button",{name:"移除文件 notes.txt"})).toHaveCount(0);
 await expect(page.locator("#file-upload .cg-hint").last()).toContainText("1");
});

test("V0.20 gallery utilities fit four themes at mobile and desktop widths",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
   await page.locator('[data-theme-button="'+theme+'"]').click();
   const x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(x.scroll,theme+" / "+width).toBeLessThanOrEqual(x.client+1);
  }
 }
});


test("Tooltip shows on pointer and focus, Escape dismisses, disabled trigger stays inert",async({page})=>{
 const scope=page.locator("#tooltip"),button=scope.getByRole("button",{name:"查看说明"});
 await button.hover();
 await expect(scope.getByRole("tooltip")).toContainText("一段说明文字");
 await button.focus();
 await button.press("Escape");
 await expect(scope.getByRole("tooltip")).toHaveCount(0);
 await scope.getByRole("button",{name:"不可用提示"}).focus();
 await expect(scope.getByRole("button",{name:"不可用提示"})).toBeDisabled();
 await expect(scope.getByRole("tooltip")).toHaveCount(0);
});

test("Breadcrumb renders current-page semantics and local navigation actions",async({page})=>{
 const nav=page.getByRole("navigation",{name:"素材路径"});
 await expect(nav.getByText("导航组件")).toHaveAttribute("aria-current","page");
 await nav.getByRole("button",{name:"UI 组件"}).click();
 await expect(page.locator("#breadcrumb .cg-hint")).toContainText("components");
});

test("Pagination preserves explicit page state and respects first/last boundaries",async({page})=>{
 const nav=page.getByRole("navigation",{name:"素材分页"});
 await expect(nav.getByRole("button",{name:"上一页"})).toBeDisabled();
 await expect(nav.getByRole("button",{name:"第 1 页"})).toHaveAttribute("aria-current","page");
 await nav.getByRole("button",{name:"下一页"}).click();
 await expect(nav.getByRole("button",{name:"第 2 页"})).toHaveAttribute("aria-current","page");
 await nav.getByRole("button",{name:"第 9 页"}).click();
 await expect(nav.getByRole("button",{name:"下一页"})).toBeDisabled();
 await expect(page.locator("#pagination .cg-hint")).toContainText("9 / 9");
 await expect(nav).toContainText("81–87 / 87 项");
});

test("Accordion maintains independent panels and supports arrow focus navigation",async({page})=>{
 const scope=page.locator("#accordion"),first=scope.getByRole("button",{name:"如何复用组件？"});
 const second=scope.getByRole("button",{name:"组件通过什么验证？"});
 await expect(first).toHaveAttribute("aria-expanded","true");
 await first.focus();
 await first.press("ArrowDown");
 await expect(second).toBeFocused();
 await second.press("Enter");
 await expect(second).toHaveAttribute("aria-expanded","true");
 await expect(first).toHaveAttribute("aria-expanded","true");
 await first.click();
 await expect(first).toHaveAttribute("aria-expanded","false");
 await expect(scope.getByRole("button",{name:"尚未开放的内容"})).toBeDisabled();
});

test("SidebarNav discloses three levels, changes page and disables archived sections",async({page})=>{
 const nav=page.getByRole("navigation",{name:"多级工作区导航"});
 await expect(nav.getByRole("button",{name:"产品工作区",exact:true})).toHaveAttribute("aria-current","page");
 await nav.getByRole("button",{name:"展开设计资产"}).click();
 await nav.getByRole("button",{name:"交互组件"}).click();
 await expect(nav.getByRole("button",{name:"交互组件"})).toHaveAttribute("aria-current","page");
 await expect(page.locator("#sidebar-nav .cg-hint")).toContainText("interactive");
 await nav.getByRole("button",{name:"折叠设计资产"}).click();
 await expect(nav.getByRole("button",{name:"交互组件"})).toBeHidden();
 await expect(nav.getByRole("button",{name:"历史归档"})).toBeDisabled();
});

test("V0.21 navigation specimens avoid global overflow at mobile and desktop widths",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
   await page.locator('[data-theme-button="'+theme+'"]').click();
   const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(size.scroll,theme+" / "+width).toBeLessThanOrEqual(size.client+1);
  }
 }
});


test("FormWizard gates next step, allows returning and only completes at final step",async({page})=>{
 const scope=page.locator("#form-wizard"),next=scope.getByRole("button",{name:"下一步"});
 await expect(next).toBeDisabled();
 const name=scope.getByRole("textbox",{name:"项目名称"});
 await name.fill("ab");await expect(next).toBeDisabled();
 await name.fill("设计研发平台");await expect(next).toBeEnabled();
 await next.click();
 await expect(scope.getByText("当前步骤：details")).toBeVisible();
 await scope.getByRole("button",{name:"返回基本信息"}).click();
 await expect(name).toHaveValue("设计研发平台");
 await next.click();await next.click();
 await expect(scope.getByRole("button",{name:"完成模拟流程"})).toBeEnabled();
 await scope.getByRole("button",{name:"完成模拟流程"}).click();
 await expect(scope.locator(".cg-hint")).toContainText("已触发");
});

test("RepeatableFields handles controlled edits, bounds and stable ID removal",async({page})=>{
 const scope=page.locator("#repeatable-fields");
 await expect(scope.getByRole("textbox",{name:"参与者 1"})).toHaveValue("李明");
 await expect(scope.getByRole("button",{name:"移除参与者 1"})).toBeDisabled();
 const add=scope.getByRole("button",{name:"添加参与者"});
 await add.click();
 await scope.getByRole("textbox",{name:"参与者 2"}).fill("王丽");
 await add.click();
 await expect(add).toBeDisabled();
 await expect(scope.getByRole("textbox",{name:"参与者 2"})).toHaveValue("王丽");
 await scope.getByRole("button",{name:"移除参与者 2"}).click();
 await expect(scope.locator(".cg-hint")).not.toContainText("entry-2");
 await expect(add).toBeEnabled();
});

test("ValidationSummary navigates to host-provided field without automatic submission",async({page})=>{
 const scope=page.locator("#validation-summary");
 await expect(scope.locator('[role="alert"]')).toHaveCount(0);
 await scope.getByRole("button",{name:"显示或隐藏错误摘要"}).click();
 const summary=scope.locator('[role="alert"]');
 await expect(summary).toContainText("2 项");
 await summary.getByRole("button",{name:"项目编号需要检查"}).click();
 await expect(scope.locator("#v22-code")).toBeFocused();
 await summary.getByRole("button",{name:"电子邮箱需要检查"}).click();
 await expect(scope.locator("#v22-email")).toBeFocused();
 await scope.getByRole("button",{name:"显示或隐藏错误摘要"}).click();
 await expect(scope.locator('[role="alert"]')).toHaveCount(0);
});

test("Sparkline uses accessible real SVG path and a finite point array",async({page})=>{
 const scope=page.locator("#sparkline"),chart=scope.getByRole("img",{name:/审核处理趋势/});
 await expect(chart).toBeVisible();
 await expect(chart).toHaveAttribute("viewBox","0 0 200 60");
 await expect(chart).toHaveAttribute("aria-label",/9 个数据点/);
 const path=await chart.locator("path").getAttribute("d");
 expect(path).toMatch(/^M[0-9.]+ [0-9.]+ L/);
 expect(path?.includes("NaN")).toBeFalsy();
 await expect(scope.getByText("9 个模拟观测点")).toBeVisible();
});

test("DashboardGrid keeps card semantics and derives 4/2/1 columns",async({page})=>{
 const grid=page.getByRole("region",{name:"组件复用仪表盘"});
 await expect(grid.locator("article")).toHaveCount(4);
 await expect(grid.locator('[data-span="4"]')).toHaveCount(1);
 await expect(grid.getByRole("heading",{name:"交付记录"})).toBeVisible();
 for(const [width,count] of [[1440,4],[768,2],[390,1]]){
  await page.setViewportSize({width,height:900});
  const cols=await grid.evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").length);
  expect(cols,"grid at "+width).toBe(count);
 }
});

test("V0.22 complex-form and dashboard specimens stay within responsive theme widths",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
   await page.locator('[data-theme-button="'+theme+'"]').click();
   const measure=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(measure.scroll,theme+" / "+width).toBeLessThanOrEqual(measure.client+1);
  }
 }
});


test("FilterableDataTable searches, filters category, resets and sorts visible rows",async({page})=>{
 const scope=page.getByRole("region",{name:"任务筛选表"});
 const input=scope.getByRole("searchbox",{name:"搜索记录"});
 await input.fill("Atlas");
 await expect(scope.getByRole("table",{name:"任务筛选表结果"}).locator("tbody tr")).toHaveCount(1);
 await expect(scope.getByRole("status")).toContainText("1 / 3");
 await scope.getByRole("combobox",{name:"分类"}).selectOption("已核对");
 await expect(scope.getByRole("table",{name:"任务筛选表结果"})).toContainText("没有匹配记录");
 await scope.getByRole("button",{name:"重置"}).click();
 await expect(scope.getByRole("status")).toContainText("3 / 3");
 const table=scope.getByRole("table",{name:"任务筛选表结果"});
 await table.getByRole("button",{name:/优先级/}).click();
 await expect(table.getByRole("columnheader",{name:/优先级/})).toHaveAttribute("aria-sort","ascending");
 await expect(table.locator("tbody tr").first()).toContainText("Workshop");
});

test("KanbanBoard moves controlled cards using an accessible select alternative",async({page})=>{
 const board=page.getByRole("region",{name:"研发任务看板"});
 const todo=board.getByRole("region",{name:"待开始"});
 const doing=board.getByRole("region",{name:"进行中"});
 await expect(todo).toContainText("定义数据结构");
 await todo.getByRole("combobox",{name:"移动卡片 定义数据结构"}).selectOption("doing");
 await expect(doing).toContainText("定义数据结构");
 await expect(todo).not.toContainText("定义数据结构");
 await expect(board.getByRole("combobox",{name:"移动卡片 合并前检查"})).toBeDisabled();
});

test("KanbanBoard supports native drag-and-drop between columns",async({page})=>{
 const board=page.getByRole("region",{name:"研发任务看板"});
 const start=board.getByRole("region",{name:"待开始"});
 const destination=board.getByRole("region",{name:"已完成"});
 await start.locator(".fda-kanban__card").filter({hasText:"定义数据结构"}).dragTo(destination);
 await expect(destination).toContainText("定义数据结构");
});

test("ActivityTimeline preserves event dates and updates the selected record",async({page})=>{
 const scope=page.getByRole("region",{name:"项目活动记录"});
 await expect(scope.locator("time")).toHaveCount(3);
 await expect(scope.locator('time[datetime="2026-11-04"]')).toContainText("11 月 4 日");
 await expect(scope.getByRole("button",{name:"交互审核"})).toHaveAttribute("aria-pressed","true");
 await scope.getByRole("button",{name:"整理需求"}).click();
 await expect(scope.getByRole("button",{name:"整理需求"})).toHaveAttribute("aria-pressed","true");
 await expect(page.locator("#activity-timeline .cg-hint")).toContainText("event-1");
});

test("InteractiveBarChart exposes real values and supports arrow/Home/End focus",async({page})=>{
 const scope=page.getByRole("region",{name:"每周验证样例"});
 const first=scope.getByRole("button",{name:"第1周：6项"});
 const second=scope.getByRole("button",{name:"第2周：11项"});
 const last=scope.getByRole("button",{name:"第4周：15项"});
 await expect(second).toHaveAttribute("aria-pressed","true");
 await first.focus();await first.press("ArrowRight");
 await expect(second).toBeFocused();
 await second.press("End");await expect(last).toBeFocused();
 await last.press("Enter");
 await expect(last).toHaveAttribute("aria-pressed","true");
 await expect(scope.getByText("最高值 15项")).toBeVisible();
 await expect(page.locator("#interactive-bar-chart .cg-hint")).toContainText("week-4");
});

test("V0.23 data operation specimens fit four themes with internal kanban scrolling",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
   await page.locator('[data-theme-button="'+theme+'"]').click();
   const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(size.scroll,theme+" at "+width).toBeLessThanOrEqual(size.client+1);
  }
 }
});
