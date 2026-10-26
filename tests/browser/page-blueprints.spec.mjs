import {test,expect} from "@playwright/test";

test("page blueprint gallery exposes five separate archetypes and filters",async({page})=>{
 await page.goto("/playground/page-blueprints/");
 await expect(page.locator(".tile")).toHaveCount(5);
 await page.locator('[data-mode="reading"]').click();
 await expect(page.locator(".tile:visible")).toHaveCount(1);
 await expect(page.locator('[data-template="TPL-002"]')).toBeVisible();
 await page.locator('[data-mode="all"]').click();
 await expect(page.locator(".tile:visible")).toHaveCount(5);
});

test("editorial page: search, open article and Escape restore usable focus",async({page})=>{
 await page.goto("/playground/page-blueprints/editorial-library/");
 await expect(page.locator(".entry")).toHaveCount(4);
 const search=page.locator("#search");await search.fill("留白");
 await expect(page.locator(".entry")).toHaveCount(1);
 await page.locator('[data-open="a2"]').click();
 await expect(page.getByRole("dialog",{name:"留白不是空白，而是节奏"})).toBeVisible();
 await page.keyboard.press("Escape");
 await expect(page.locator("#reader")).toBeHidden();
 await expect(search).toBeFocused();
});
test("editorial page: bookmarks and category filtering are independent",async({page})=>{
 await page.goto("/playground/page-blueprints/editorial-library/");
 await page.locator('[data-save="a1"]').click();
 await expect(page.locator('[data-save="a1"]')).toHaveAttribute("aria-pressed","true");
 await page.locator("#savedOnly").click();
 await expect(page.locator(".entry")).toHaveCount(1);
 await page.locator('[data-tag="culture"]').click();
 await expect(page.locator(".entry")).toHaveCount(0);
 await expect(page.locator("#resultCount")).toContainText("0 篇");
});
test("mobile habit page: task toggles progress and filters",async({page})=>{
 await page.goto("/playground/page-blueprints/mobile-habits/");
 await expect(page.locator("#percent")).toHaveText("0%");
 await page.locator('[data-task="t1"]').click();
 await expect(page.locator("#percent")).toHaveText("25%");
 await expect(page.locator("#completionLabel")).toContainText("1 / 4");
 await expect(page.locator("#score")).toContainText("20");
 await page.locator('[data-filter="done"]').click();
 await expect(page.locator("#taskList button")).toHaveCount(1);
 await page.locator('[data-filter="all"]').click();
 await expect(page.locator("#taskList button")).toHaveCount(4);
});
test("page gallery and two new templates do not scroll horizontally at 390px",async({page})=>{
 await page.setViewportSize({width:390,height:850});
 for(const url of ["/playground/page-blueprints/","/playground/page-blueprints/editorial-library/","/playground/page-blueprints/mobile-habits/"]){
  await page.goto(url);
  const dimensions=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
  expect(dimensions.scroll,url).toBeLessThanOrEqual(dimensions.client+1);
 }
});

test("page gallery exposes React app launch guide without implying static TSX works",async({page})=>{
 await page.goto("/playground/page-blueprints/");
 await page.locator('[data-mode="developer-tool"]').click();
 await expect(page.locator(".tile:visible")).toHaveCount(1);
 await page.locator('[data-template="TPL-005"] a').click();
 await expect(page.getByRole("heading",{name:/Orbit/})).toBeVisible();
 await expect(page.locator("pre")).toContainText("npm run dev:workbench");
});
test("capture repeatable independent blueprint screenshots at 390/768/1440",async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:880});
  for(const url of ["/playground/page-blueprints/","/playground/page-blueprints/editorial-library/","/playground/page-blueprints/mobile-habits/"]){
   await page.goto(url);
   const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(size.scroll,url+" at "+width).toBeLessThanOrEqual(size.client+1);
   const name=url.endsWith("editorial-library/")?"editorial":url.endsWith("mobile-habits/")?"mobile":"gallery";
   await page.screenshot({path:"test-results/visual-"+name+"-"+width+".png",fullPage:true,animations:"disabled"});
  }
 }
});
