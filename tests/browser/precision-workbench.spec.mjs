import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.goto("/");});
test("React component imports render inside scoped Precision Dark",async({page})=>{
 await expect(page.locator('[data-design-theme="precision-dark"]')).toBeVisible();
 await expect(page.getByRole("heading",{name:/Work items/})).toBeVisible();
 await expect(page.locator(".fda-card")).toHaveCount(3);
 await expect(page.locator(".orbit-issue")).toHaveCount(6);
 await expect(page.locator(".fda-progress")).toBeVisible();
});
test("search and filters operate on same collection",async({page})=>{
 await page.getByRole("textbox",{name:"Search issues"}).fill("token");
 await expect(page.locator(".orbit-issue")).toHaveCount(1);
 await page.getByRole("textbox",{name:"Search issues"}).fill("");
 await page.locator('.orbit-filters button[data-filter="done"]').click();
 await expect(page.locator(".orbit-issue")).toHaveCount(2);
 await page.locator('.orbit-filters button[data-filter="all"]').click();
 await expect(page.locator(".orbit-issue")).toHaveCount(6);
});
test("inspector, status update and latest-change undo",async({page})=>{
 await page.locator('[data-item-id="FD-127"]').click();
 const panel=page.getByRole("complementary",{name:"Issue inspector"});
 await expect(panel).toBeVisible();
 await panel.getByRole("button",{name:"Done"}).click();
 await expect(page.locator('[data-item-id="FD-127"] .fda-badge')).toHaveText("Done");
 await page.getByRole("button",{name:"Undo"}).click();
 await expect(page.locator('[data-item-id="FD-127"] .fda-badge')).toHaveText("In review");
 await panel.getByRole("tab",{name:"Activity"}).click();
 await expect(panel).toContainText("No real activity history");
});
test("command shortcut, search and Escape",async({page})=>{
 await page.keyboard.press("Control+k");
 const dialog=page.getByRole("dialog",{name:"Quick commands"});
 await expect(dialog).toBeVisible();
 await dialog.getByRole("textbox",{name:"Search commands"}).fill("first");
 await expect(dialog.locator(".orbit-commands button")).toHaveCount(1);
 await page.keyboard.press("Escape");
 await expect(dialog).toBeHidden();
 await page.keyboard.press("/");
 await expect(page.getByRole("textbox",{name:"Search issues"})).toBeFocused();
});
test("screenshots and no overflow at 390, 768, 1440",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.reload();
  await expect(page.locator(".orbit-issue")).toHaveCount(6);
  const x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(x.scroll,"viewport "+width).toBeLessThanOrEqual(x.client+1);
  await page.screenshot({path:"test-results/workbench-"+width+".png",fullPage:true,animations:"disabled"});
 }
});
test("mobile inspector opens and closes",async({page})=>{
 await page.setViewportSize({width:390,height:800});
 await page.goto("/");
 await page.locator('[data-item-id="FD-125"]').click();
 await expect(page.locator(".orbit-inspector")).toBeVisible();
 await page.getByRole("button",{name:"Close inspector"}).click();
 await expect(page.locator(".orbit-inspector")).toBeHidden();
 await expect(page.locator('[data-item-id="FD-125"]')).toBeVisible();
});

test("mobile inspector traps keyboard focus, closes on Escape and restores row focus",async({page})=>{
 await page.setViewportSize({width:390,height:820});
 await page.goto("/");
 const row=page.locator('[data-item-id="FD-125"]');
 await row.focus();await row.press("Enter");
 const panel=page.getByRole("dialog",{name:"Issue inspector"});
 await expect(panel).toBeVisible();
 await expect(panel.getByRole("button",{name:"Close inspector"})).toBeFocused();
 await panel.getByRole("button",{name:"Close inspector"}).press("Shift+Tab");
 await expect(panel.locator(":focus")).toHaveCount(1);
 await page.keyboard.press("Escape");
 await expect(panel).toBeHidden();
 await expect(row).toBeFocused();
});
