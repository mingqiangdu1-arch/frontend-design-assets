import {test,expect} from "@playwright/test";
const base="/playground/trend-style-lab/";
const ids=["liquid-layer","shape-expressive","type-led-minimal","organic-tactile"];
test.beforeEach(async({page})=>{await page.goto(base);});

test("2026 lab contains four independent pages, explicit switching and history deep links",async({page})=>{
 await expect(page.locator("[data-direction]")).toHaveCount(4);
 await expect(page.locator('[data-scene="liquid-layer"]')).toBeVisible();
 for(const id of ids){
  await page.locator('[data-direction="'+id+'"]').click();
  await expect(page.locator('[data-direction="'+id+'"]')).toHaveAttribute("aria-pressed","true");
  await expect(page.locator('[data-scene="'+id+'"]')).toBeVisible();
  await expect(page).toHaveURL(new RegExp("style="+id));
  for(const other of ids.filter(i=>i!==id))await expect(page.locator('[data-scene="'+other+'"]')).toBeHidden();
 }
 await page.goBack();
 await expect(page.locator('[data-scene="type-led-minimal"]')).toBeVisible();
 await page.goto(base+"?style=organic-tactile");
 await expect(page.locator('[data-scene="organic-tactile"]')).toBeVisible();
});

test("functional glass control panel changes light mode and supports opaque accessibility fallback",async({page})=>{
 const scene=page.locator('[data-scene="liquid-layer"]'),shell=scene.locator(".ll-shell");
 await scene.locator('[data-landscape="dusk"]').click();
 await expect(shell).toHaveAttribute("data-mode","dusk");
 await expect(scene.locator("#llFeedback")).toContainText("黄昏");
 await scene.getByRole("checkbox",{name:"透明效果"}).uncheck();
 await expect(shell).toHaveAttribute("data-glass","off");
 await expect(scene.locator("#llFeedback")).toContainText("不透明");
 await expect(scene.locator(".ll-content article")).toHaveCount(2);
});

test("expressive task choices update visible state, pressed semantics and detail label",async({page})=>{
 await page.locator('[data-direction="shape-expressive"]').click();
 const scene=page.locator('[data-scene="shape-expressive"]'),choice=scene.locator('[data-shape-choice="rest"]');
 await choice.focus();
 await choice.press("Enter");
 await expect(choice).toHaveAttribute("aria-pressed","true");
 await expect(scene.locator('[data-shape-choice="plan"]')).toHaveAttribute("aria-pressed","false");
 await expect(scene.locator(".se-shell")).toHaveAttribute("data-focus","rest");
 await expect(scene.locator("#seFocus")).toHaveText("PAUSE");
 await expect(scene.locator("#seFeedback")).toContainText("休息");
});

test("typography-first structure keeps accessible index, text content and native disclosure",async({page})=>{
 await page.locator('[data-direction="type-led-minimal"]').click();
 const scene=page.locator('[data-scene="type-led-minimal"]');
 await scene.locator('[data-type-story="1"]').click();
 await expect(scene.locator("#tmHeadline")).toContainText("design.");
 await expect(scene.locator("#tmPosition")).toHaveText("02");
 await expect(scene.locator("#tmFeedback")).toContainText("Method");
 const summary=scene.getByText("为什么不是隐藏所有内容？");
 await summary.click();
 await expect(scene.locator("details")).toHaveAttribute("open","");
 await expect(scene.locator("details p")).toBeVisible();
});

test("organic tactile theme changes original CSS material and communicates selection by text",async({page})=>{
 await page.locator('[data-direction="organic-tactile"]').click();
 const scene=page.locator('[data-scene="organic-tactile"]');
 await scene.locator('button[data-material="clay"]').click();
 await expect(scene.locator(".ot-shell")).toHaveAttribute("data-material","clay");
 await expect(scene.locator("#otFeedback")).toContainText("陶土");
 await expect(scene.locator('button[data-material="clay"]')).toHaveAttribute("aria-pressed","true");
 await expect(scene.locator(".ot-object")).toHaveAttribute("role","img");
});

test("all four independent scenes remain viewport-contained at 390, 768 and 1440 with static reduced motion",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:860});
  for(const id of ids){
   await page.locator('[data-direction="'+id+'"]').click();
   await expect(page.locator('[data-scene="'+id+'"]')).toBeVisible();
   const x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(x.scroll,id+" at "+width).toBeLessThanOrEqual(x.client+1);
   if(width===390||width===1440)await page.screenshot({path:"test-results/trend-"+id+"-"+width+".png",fullPage:true,animations:"disabled"});
  }
 }
});
