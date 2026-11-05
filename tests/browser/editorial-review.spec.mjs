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

test("editorial readability is checked without imposing Precision Dark typography",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:880});
  await page.reload();
  const filter=page.locator('.folio-filters button[data-filter="all"]');
  const computed=await filter.evaluate(el=>({font:parseFloat(getComputedStyle(el).fontSize),height:el.getBoundingClientRect().height}));
  const storyTitle=await page.locator(".folio-story-copy strong").first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
  expect(computed.font,"filter font at "+width).toBeGreaterThanOrEqual(12);
  expect(computed.height,"filter target at "+width).toBeGreaterThanOrEqual(44);
  expect(storyTitle,"editorial display serif at "+width).toBeGreaterThanOrEqual(20);
  await filter.focus();
  const focus=await filter.evaluate(el=>({style:getComputedStyle(el).outlineStyle,width:parseFloat(getComputedStyle(el).outlineWidth)}));
  expect(focus.style,"focus at "+width).not.toBe("none");
  expect(focus.width,"focus outline at "+width).toBeGreaterThanOrEqual(2);
 }
});

test("first keyboard stop skips to the article collection",async({page})=>{
 await page.keyboard.press("Tab");
 const skip=page.getByRole("link",{name:"跳转至稿件目录"});
 await expect(skip).toBeFocused();
 await expect(skip).toBeInViewport();
 await page.keyboard.press("Enter");
 await expect(page).toHaveURL(/#stories$/);
 await expect(page.locator("#stories")).toBeVisible();
});
test("editorial design keeps its serif hero and avoids accidental literal Markdown syntax",async({page})=>{
 const serif=await page.locator(".folio-hero h1").evaluate(el=>getComputedStyle(el).fontFamily);
 expect(serif.toLowerCase()).toMatch(/serif|georgia/);
 await expect(page.locator(".folio-principles")).not.toContainText("**不复用**");
 await expect(page.locator(".folio-principles")).toContainText("不复用 Precision Dark");
});
