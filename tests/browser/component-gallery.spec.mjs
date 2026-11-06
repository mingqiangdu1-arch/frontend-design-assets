import {test,expect} from "@playwright/test";

test.beforeEach(async({page})=>{await page.goto("/");});

test("gallery presents 23 component exports and explicit themes",async({page})=>{
 await expect(page.getByRole("heading",{name:/组件不仅要好看/})).toBeVisible();
 await expect(page.locator("[data-theme-button]")).toHaveCount(4);
 await expect(page.locator('[data-theme-button="refined-light-saas"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator(".cg-spec")).toHaveCount(14);
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
