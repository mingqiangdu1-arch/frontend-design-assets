import {test,expect} from "@playwright/test";
const path="/playground/registry-slots-v040/";
test.beforeEach(async({page})=>{await page.goto(path);});
test("V0.40 shows three independently sourced reference controls and original nested tree",async({page})=>{
 for(const id of ["source","insertTarget","moveTarget","layout","confirm"])await expect(page.locator("#"+id)).toBeVisible();
 await expect(page.locator("#revision")).toHaveText("Revision 1");
 await expect(page.locator("#tree [data-node-id]")).toHaveCount(7);
 await expect(page.locator("#confirm")).toBeDisabled();
});
test("V0.40 curated insertion is preview-first and needs confirmation",async({page})=>{
 await page.locator("#previewInsert").click();
 await expect(page.locator("#confirm")).toBeEnabled();
 await expect(page.locator("#tree [data-node-id]")).toHaveCount(7);
 await expect(page.locator("#preview")).toContainText("feature-new");
 await page.locator("#confirm").click();
 await expect(page.locator("#revision")).toHaveText("Revision 2");
 await expect(page.locator("#tree [data-node-id]")).toHaveCount(8);
 await expect(page.locator('#tree [data-node-id="feature-new"]')).toBeVisible();
});
test("V0.40 invalid Hero insertion into Stack is rejected with no mutation",async({page})=>{
 await page.locator("#source").selectOption("fixture.hero");
 await page.locator("#newId").fill("hero-new");
 await page.locator("#previewInsert").click();
 await expect(page.locator("#status")).toContainText("Slot rejects child type");
 await expect(page.locator("#confirm")).toBeDisabled();
 await expect(page.locator("#revision")).toHaveText("Revision 1");
 await expect(page.locator("#tree [data-node-id]")).toHaveCount(7);
});
test("V0.40 move one feature to a different parent and confirm",async({page})=>{
 await page.locator("#previewMove").click();
 await expect(page.locator("#preview")).toContainText("feature-two");
 await page.locator("#confirm").click();
 await expect(page.locator("#revision")).toHaveText("Revision 2");
 await expect(page.locator("#tree [data-node-id]")).toHaveCount(7);
 const doc=JSON.parse(await page.locator("#currentJSON").textContent());
 expect(doc.nodes.find(n=>n.id==="stack-one").slots.items).toEqual(["feature-one","quote-one","feature-two"]);
 expect(doc.nodes.find(n=>n.id==="section-two").slots.content).toEqual([]);
});
test("V0.40 local layout edit is previewed and discarding leaves document unchanged",async({page})=>{
 await page.locator("#layout").selectOption("split");
 await page.locator("#previewEdit").click();
 await expect(page.locator("#confirm")).toBeEnabled();
 await page.locator("#discard").click();
 await expect(page.locator("#revision")).toHaveText("Revision 1");
 await expect(page.locator("#confirm")).toBeDisabled();
 await page.locator("#previewEdit").click();
 await page.locator("#confirm").click();
 await expect(page.locator("#revision")).toHaveText("Revision 2");
});
test("V0.40 duplicate insertion cannot create the same ID twice",async({page})=>{
 await page.locator("#previewInsert").click();
 await page.locator("#confirm").click();
 await page.locator("#previewInsert").click();
 await expect(page.locator("#status")).toContainText("Duplicate or invalid new ID");
 await expect(page.locator("#confirm")).toBeDisabled();
 await expect(page.locator("#revision")).toHaveText("Revision 2");
});
test("V0.40 mobile layout keeps preview and confirm controls available",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator("#previewInsert")).toBeVisible();
 await expect(page.locator("#previewMove")).toBeVisible();
 await page.locator("#previewInsert").click();
 await expect(page.locator("#confirm")).toBeVisible();
});
