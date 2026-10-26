import {test,expect} from "@playwright/test";

test.beforeEach(async({page})=>{await page.goto("/");});

test("gallery presents 18 component exports and explicit themes",async({page})=>{
 await expect(page.getByRole("heading",{name:/组件不仅要好看/})).toBeVisible();
 await expect(page.locator("[data-theme-button]")).toHaveCount(4);
 await expect(page.locator('[data-theme-button="refined-light-saas"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator(".cg-spec")).toHaveCount(9);
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
