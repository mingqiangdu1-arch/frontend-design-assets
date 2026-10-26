import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.goto("/playground/commerce-atelier/");});
test("standalone Commerce Atelier uses correct scoped token and six items",async({page})=>{
 await expect(page.locator('body[data-design-theme="commerce-atelier"]')).toBeVisible();
 await expect(page.locator(".product-card")).toHaveCount(6);
 await expect(page.locator("#resultCount")).toContainText("6 件");
 await expect(page.locator(".product-visual")).toHaveCount(6);
});
test("category and material multi-select intersect; applied chips can be removed",async({page})=>{
 await page.locator('input[name="category"][value="desk"]').check();
 await expect(page.locator(".product-card")).toHaveCount(2);
 await page.locator('input[name="material"][value="metal"]').check();
 await expect(page.locator(".product-card")).toHaveCount(0);
 await expect(page.locator(".empty")).toBeVisible();
 await page.getByRole("button",{name:"移除筛选 金属"}).click();
 await expect(page.locator(".product-card")).toHaveCount(2);
 await page.locator("#clearFilters").click();
 await expect(page.locator(".product-card")).toHaveCount(6);
});
test("sorting and wishlist preserve meaningful states",async({page})=>{
 await page.locator("#sort").selectOption("price-low");
 await expect(page.locator(".product-card").first()).toHaveAttribute("data-id","CA-03");
 const save=page.getByRole("button",{name:"收藏 Luma 柔光桌灯"});
 await save.click();
 await expect(page.getByRole("button",{name:"取消收藏 Luma 柔光桌灯"})).toHaveAttribute("aria-pressed","true");
});
test("quick view has disabled unavailable variant and honest local bag",async({page})=>{
 await page.locator('[data-id="CA-01"] .quick').click();
 const dialog=page.getByRole("dialog",{name:"Luma 柔光桌灯"});
 await expect(dialog).toBeVisible();
 await expect(dialog.getByRole("radio",{name:/大号/})).toBeDisabled();
 await dialog.getByRole("button",{name:"加入模拟购物袋"}).click();
 await expect(dialog).toBeHidden();
 await expect(page.locator("#bagCount")).toHaveText("1");
 await page.locator("#openBag").click();
 await expect(page.getByRole("dialog",{name:"模拟购物袋"})).toContainText("¥429");
 await expect(page.getByRole("dialog",{name:"模拟购物袋"})).toContainText("不会产生真实订单");
});
test("390 768 1440 layout and modal keyboard dismissal",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.reload();
  const e=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(e.scroll,"width "+width).toBeLessThanOrEqual(e.client+1);
  await page.screenshot({path:"test-results/commerce-"+width+".png",fullPage:true,animations:"disabled"});
 }
 await page.locator('[data-id="CA-02"] .quick').click();
 await expect(page.locator("#productDialog")).toBeVisible();
 await page.keyboard.press("Escape");
 await expect(page.locator("#productDialog")).toBeHidden();
});
