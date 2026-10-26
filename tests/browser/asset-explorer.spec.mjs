import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.goto("/playground/asset-explorer/");await expect(page.locator(".asset")).toHaveCount(18);});
test("live facets load, filter by style and type",async({page})=>{
 await expect(page.locator("#overview")).toContainText("套独立视觉风格");
 await expect(page.locator('#style option[value="precision-dark"]')).toHaveCount(1);
 await page.locator("#type").selectOption("component");
 await expect(page.locator(".asset").first()).toBeVisible();
});
test("inspect deep link and verify source/maturity",async({page})=>{
 await page.locator("#style").selectOption("precision-dark");
 await page.locator("#query").fill("UI-019");
 await expect(page.locator(".asset")).toHaveCount(1);
 await page.locator('[data-inspect="UI-019"]').click();
 await expect(page.locator("#detailTitle")).toContainText("Navigation");
 await expect(page.locator("#detailBody")).toContainText("reference-implemented");
 await expect(page).toHaveURL(/asset=UI-019/);
 await page.locator("#closeDetail").click();
 await expect(page.locator("#detailBody")).toContainText("选择素材查看详情");
});
test("selection exports real Markdown and retains stage warning",async({page})=>{
 await page.locator("#query").fill("TPL-005");
 await page.locator('[data-pick="TPL-005"]').check();
 await expect(page.locator("#selectionCount")).toHaveText("1");
 await page.locator("#showBundle").click();
 await expect(page.locator("#bundleText")).toHaveValue(/TPL-005/);
 await expect(page.locator("#bundleText")).toHaveValue(/No assets here are automatically production-certified/);
 await page.locator("#closeBundle").click();
 await expect(page.locator("#bundle")).toBeHidden();
});
test("reset and slash hotkey",async({page})=>{
 await page.locator("#query").fill("x-unique-missing-term");
 await expect(page.locator(".asset")).toHaveCount(0);
 await page.locator("#reset").click();await expect(page.locator(".asset")).toHaveCount(18);
 await page.locator("#reset").focus();await page.keyboard.press("/");
 await expect(page.locator("#query")).toBeFocused();
});
test("no 390 / 768 / 1440 overflow and capture screenshots",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:880});
  await page.locator("#query").fill("UI-019");
  await page.locator('[data-inspect="UI-019"]').click();
  const dim=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
  expect(dim.scroll,String(width)).toBeLessThanOrEqual(dim.client+1);
  await page.screenshot({path:"test-results/asset-explorer-"+width+".png",fullPage:true,animations:"disabled"});
  await page.locator("#closeDetail").click();
 }
});
