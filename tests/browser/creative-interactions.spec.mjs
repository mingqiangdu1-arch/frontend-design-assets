import {test,expect} from "@playwright/test";

test("Bold Grid: five style? new theme is scoped and catalog loads six cards",async({page})=>{
 await page.goto("/playground/bold-grid/");
 await expect(page.locator("body")).toHaveAttribute("data-design-theme","neo-brutalist");
 await expect(page.locator(".product")).toHaveCount(6);
 await expect(page.locator("#resultStatus")).toContainText("6 个");
});
test("Bold Grid: filter and saved state remain understandable",async({page})=>{
 await page.goto("/playground/bold-grid/");
 await page.locator('[data-filter="tool"]').click();
 await expect(page.locator('[data-filter="tool"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator(".product")).toHaveCount(2);
 const save=page.locator('.product[data-id="BG-03"] button[data-save]');
 await save.click();
 await expect(save).toHaveAttribute("aria-pressed","true");
 await page.locator('[data-filter="all"]').click();
 await expect(page.locator(".product")).toHaveCount(6);
 await expect(page.locator('.product[data-id="BG-03"] button[data-save]')).toHaveAttribute("aria-pressed","true");
});
test("Bold Grid: reduced motion still updates state, 390px does not overflow",async({page})=>{
 await page.setViewportSize({width:390,height:850});
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/playground/bold-grid/");
 await page.locator('[data-filter="identity"]').click();
 await expect(page.locator(".product")).toHaveCount(2);
 const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(size.scroll).toBeLessThanOrEqual(size.client+1);
});
test("Interaction Lab: archive and undo restore original record count",async({page})=>{
 await page.goto("/playground/interaction-lab/");
 await expect(page.locator("#records button[data-archive]")).toHaveCount(3);
 await page.getByRole("button",{name:"归档 交互状态补全"}).click();
 await expect(page.locator("#records button[data-archive]")).toHaveCount(2);
 await expect(page.locator("#archiveFeedback")).toBeVisible();
 await page.getByRole("button",{name:"撤销归档"}).click();
 await expect(page.locator("#records button[data-archive]")).toHaveCount(3);
 await expect(page.locator("#archiveText")).toContainText("已恢复");
});
test("Interaction Lab: staged form validates and preserves draft on Back",async({page})=>{
 await page.goto("/playground/interaction-lab/");
 await page.locator("#next").click();
 await expect(page.locator("#wizardError")).toContainText("请填写项目名称");
 await page.locator("#projectName").fill("新组件检索");
 await page.locator("#next").click();
 await expect(page.locator("#projectStyle")).toBeVisible();
 await page.locator("#next").click();
 await expect(page.locator("#wizardError")).toContainText("请选择");
 await page.locator("#projectStyle").selectOption("neo-brutalist");
 await page.locator("#next").click();
 await expect(page.locator("#wizardBody")).toContainText("新组件检索");
 await page.locator("#prev").click();
 await page.locator("#prev").click();
 await expect(page.locator("#projectName")).toHaveValue("新组件检索");
});
test("Interaction Lab: reorder preserves focus and has live announcement",async({page})=>{
 await page.goto("/playground/interaction-lab/");
 const move=page.getByRole("button",{name:"下移 需求澄清"});
 await move.click();
 await expect(page.locator("#orderList li").first()).toContainText("视觉探索");
 await expect(page.locator("#orderStatus")).toContainText("第 2 位");
 const anyFocus=await page.evaluate(()=>document.activeElement?.getAttribute("data-item"));
 expect(anyFocus).toBe("需求澄清");
});
test("Interaction Lab: width range supports keyboard, reset and narrow view",async({page})=>{
 await page.goto("/playground/interaction-lab/");
 await page.locator("#splitRange").focus();
 await page.locator("#splitRange").press("ArrowRight");
 await expect(page.locator("#splitValue")).toHaveText("55%");
 await page.locator("#resetSplit").click();
 await expect(page.locator("#splitValue")).toHaveText("50%");
 await expect(page.locator("#splitRange")).toBeFocused();
 await page.setViewportSize({width:390,height:850});
 const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(size.scroll).toBeLessThanOrEqual(size.client+1);
});
