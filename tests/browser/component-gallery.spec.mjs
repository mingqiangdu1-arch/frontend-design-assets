import {test,expect} from "@playwright/test";

test.beforeEach(async({page})=>{await page.goto("/");});

test("gallery presents 32 component exports and explicit themes",async({page})=>{
 await expect(page.getByRole("heading",{name:/组件不仅要好看/})).toBeVisible();
 await expect(page.locator("[data-theme-button]")).toHaveCount(4);
 await expect(page.locator('[data-theme-button="refined-light-saas"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator(".cg-spec")).toHaveCount(23);
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
 const input=page.getByRole("textbox",{name:/项目名称/});
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
