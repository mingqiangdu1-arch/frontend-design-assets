import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.goto("/");});
test("editorial warm truly imports UI package and presents a non-SaaS layout",async({page})=>{
 await expect(page.locator('[data-design-theme="editorial-warm"]')).toBeVisible();
 await expect(page.getByRole("heading",{name:/Good writing deserves/})).toBeVisible();
 await expect(page.locator(".fda-card")).toHaveCount(3);
 await expect(page.locator(".folio-story")).toHaveCount(4);
 await expect(page.locator(".fda-progress")).toBeVisible();
});
test("search and status filtering work together on one collection",async({page})=>{
 await page.getByRole("textbox",{name:"Search stories"}).fill("时间");
 await expect(page.locator(".folio-story")).toHaveCount(1);
 await page.getByRole("textbox",{name:"Search stories"}).fill("");
 await page.locator('[data-filter="review"]').click();
 await expect(page.locator(".folio-story")).toHaveCount(2);
 await page.locator('[data-filter="draft"]').click();
 await expect(page.locator(".folio-story")).toHaveCount(1);
 await page.locator('[data-filter="all"]').click();
 await expect(page.locator(".folio-story")).toHaveCount(4);
});
test("review actions update state and undo restores it",async({page})=>{
 await page.locator('[data-story-id="ED-101"]').click();
 const inspector=page.getByRole("complementary",{name:"Selected story inspector"});
 await inspector.getByRole("button",{name:"Ready"}).click();
 await expect(page.locator('[data-story-id="ED-101"] .fda-badge')).toHaveText("Ready");
 await page.getByRole("button",{name:"Undo"}).click();
 await expect(page.locator('[data-story-id="ED-101"] .fda-badge')).toHaveText("In review");
});
test("editorial reading dialog and tab use real React UI controls",async({page})=>{
 const inspector=page.getByRole("complementary",{name:"Selected story inspector"});
 await inspector.getByRole("tab",{name:"Review notes"}).click();
 await expect(inspector).toContainText("no connected comments");
 await inspector.getByRole("button",{name:/Read full sample/}).click();
 await expect(page.getByRole("dialog",{name:"时间、界面与人的注意力"})).toBeVisible();
 await page.keyboard.press("Escape");
 await expect(page.getByRole("dialog")).toBeHidden();
});
test("390 / 768 / 1440 screenshots with no horizontal overflow",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:880});
  await page.reload();
  const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(dimensions.scroll,"at "+width).toBeLessThanOrEqual(dimensions.client+1);
  await page.screenshot({path:"test-results/editorial-react-"+width+".png",fullPage:true,animations:"disabled"});
 }
});
