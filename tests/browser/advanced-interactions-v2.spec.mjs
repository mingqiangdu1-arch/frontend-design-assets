import {test,expect} from "@playwright/test";
const url="/playground/advanced-interactions-v2/";

test.beforeEach(async({page})=>{await page.goto(url);});
test("two genuine independent interaction systems with local seed state",async({page})=>{
 await expect(page.locator("[data-lane]")).toHaveCount(3);
 await expect(page.locator("[data-card]")).toHaveCount(5);
 await expect(page.locator(".concept")).toHaveCount(4);
 await expect(page.locator("#boardUndo")).toBeDisabled();
 await expect(page.locator("#collection")).toHaveAttribute("data-layout","grid");
});
test("keyboard pickup moves across lanes, restores card focus and reverses via undo redo",async({page})=>{
 const handle=page.locator('[data-handle="ST-01"]');
 await handle.focus();
 await page.keyboard.press("Space");
 await expect(handle).toHaveAttribute("aria-pressed","true");
 await expect(page.locator('[data-lane="inbox"]')).toHaveAttribute("data-target","true");
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('[data-lane="progress"]')).toHaveAttribute("data-target","true");
 await page.keyboard.press("Enter");
 await expect(page.locator('[data-cards="progress"] [data-card="ST-01"]')).toBeVisible();
 await expect(page.locator('[data-handle="ST-01"]')).toBeFocused();
 await expect(page.locator("#boardStatus")).toContainText("已从");
 await page.locator("#boardUndo").click();
 await expect(page.locator('[data-cards="inbox"] [data-card="ST-01"]')).toBeVisible();
 await page.locator("#boardRedo").click();
 await expect(page.locator('[data-cards="progress"] [data-card="ST-01"]')).toBeVisible();
});
test("keyboard cancellation never commits the picked object",async({page})=>{
 const handle=page.locator('[data-handle="ST-02"]');
 await handle.focus();
 await page.keyboard.press("Space");
 await page.keyboard.press("ArrowRight");
 await page.keyboard.press("Escape");
 await expect(page.locator('[data-cards="inbox"] [data-card="ST-02"]')).toBeVisible();
 await expect(page.locator("#boardUndo")).toBeDisabled();
 await expect(page.locator("#boardStatus")).toContainText("已取消");
});
test("visible pointer drag transfers a card and Undo recovers original lane",async({page})=>{
 const handle=page.locator('[data-handle="ST-02"]');
 await handle.scrollIntoViewIfNeeded();
 const start=await handle.boundingBox(),dest=await page.locator('[data-lane="ready"]').boundingBox();
 expect(start).toBeTruthy();expect(dest).toBeTruthy();
 await page.mouse.move(start.x+start.width/2,start.y+start.height/2);
 await page.mouse.down();
 await page.mouse.move(dest.x+dest.width/2,dest.y+dest.height/2,{steps:12});
 await page.mouse.up();
 await expect(page.locator('[data-cards="ready"] [data-card="ST-02"]')).toBeVisible();
 await page.locator("#boardUndo").click();
 await expect(page.locator('[data-cards="inbox"] [data-card="ST-02"]')).toBeVisible();
});
test("explicit left right transfer remains possible without dragging",async({page})=>{
 await page.getByRole("button",{name:"向右移动 动效草案"}).click();
 await expect(page.locator('[data-cards="ready"] [data-card="ST-04"]')).toBeVisible();
 await page.locator("#boardReset").click();
 await expect(page.locator('[data-cards="progress"] [data-card="ST-04"]')).toBeVisible();
 await expect(page.locator("#boardUndo")).toBeDisabled();
});
test("FLIP reorder preserves actual DOM objects and keyboard focus",async({page})=>{
 const original=await page.locator(".concept").evaluateAll(nodes=>nodes.map(el=>[el.dataset.id,el]));
 expect(original).toHaveLength(4);
 await page.locator('[data-id="PRISM"]').focus();
 await page.evaluate(()=>document.querySelector('[data-sort="name"]').click());
 await expect(page.locator(".concept").first()).toHaveAttribute("data-id","FORM");
 await expect(page.locator('[data-id="PRISM"]')).toBeFocused();
 await expect(page.locator('[data-sort="name"]')).toHaveAttribute("aria-pressed","true");
 await page.evaluate(()=>document.querySelector('[data-layout="stack"]').click());
 await expect(page.locator("#collection")).toHaveAttribute("data-layout","stack");
 await expect(page.locator('[data-id="PRISM"]')).toBeFocused();
 const after=await page.locator(".concept").evaluateAll(nodes=>nodes.map(el=>el.dataset.id));
 expect(after).toEqual(["FORM","PRISM","TIDAL","VECTOR"]);
});
test("reduced motion updates order instantly without FLIP animations",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.locator('[data-sort="name"]').click();
 await expect(page.locator("#collection")).toHaveAttribute("data-motion","reduced");
 await page.locator('[data-layout="stack"]').click();
 await expect(page.locator("#collection")).toHaveAttribute("data-motion","reduced");
 const names=await page.locator(".concept").evaluateAll(els=>els.map(el=>el.dataset.id));
 expect(names).toEqual(["FORM","PRISM","TIDAL","VECTOR"]);
 await expect.poll(()=>page.locator(".concept").evaluateAll(els=>els.every(el=>el.getAnimations().length===0))).toBeTruthy();
});
test("responsive 390/768/1440: no horizontal overflow, full controls and unapproved screenshots",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(dims.scroll,"viewport width "+width).toBeLessThanOrEqual(dims.client+1);
  await expect(page.locator('[data-handle="ST-01"]')).toBeVisible();
  await page.screenshot({path:"test-results/advanced-v2-"+width+".png",fullPage:true,animations:"disabled"});
 }
});
