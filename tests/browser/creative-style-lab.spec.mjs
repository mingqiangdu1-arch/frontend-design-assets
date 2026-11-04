import {test,expect} from "@playwright/test";
const base="/playground/creative-style-lab/";
const styles=["pixel-arcade","signal-noir","paper-rebellion","aether-orbit"];
test.beforeEach(async({page})=>{await page.goto(base);});
test("four independent composition scenes and URL deep links",async({page})=>{
 await expect(page.locator("[data-direction]")).toHaveCount(4);
 for(const id of styles){
  await page.locator('[data-direction="'+id+'"]').click();
  await expect(page.locator('[data-direction="'+id+'"]')).toHaveAttribute("aria-pressed","true");
  await expect(page.locator('[data-scene="'+id+'"]')).toBeVisible();
  await expect(page).toHaveURL(new RegExp("style="+id));
  for(const other of styles.filter(x=>x!==id))await expect(page.locator('[data-scene="'+other+'"]')).toBeHidden();
 }
 await page.goBack();
 await expect(page.locator('[data-scene="paper-rebellion"]')).toBeVisible();
});
test("pixel quest changes XP, stage and feedback without keyboard trap",async({page})=>{
 const scene=page.locator('[data-scene="pixel-arcade"]');
 await expect(scene.locator("#pixelXP")).toHaveText("025");
 await scene.locator('[data-quest="2"]').focus();await page.keyboard.press("Enter");
 await expect(scene.locator('[data-quest="2"]')).toHaveAttribute("aria-pressed","true");
 await expect(scene.locator("#pixelXP")).toHaveText("050");
 await expect(scene.locator("#pixelStage")).toHaveText("02 / 03");
 await expect(scene.locator("#pixelFeedback")).toContainText("The Unknown");
});
test("fictional signal channels and frequency slider are actual controls",async({page})=>{
 await page.locator('[data-direction="signal-noir"]').click();
 const scene=page.locator('[data-scene="signal-noir"]');
 await scene.locator('[data-channel="OCEAN"]').click();
 await expect(scene.locator("#signalChannel")).toHaveText("OCEAN");
 await scene.locator("#signalFreq").fill("165");
 await expect(scene.locator("#signalFreqValue")).toHaveText("165");
 await expect(scene.locator("#signalMessage")).toContainText("OCEAN channel tuned to 165 MHz");
});
test("collage rearranges visually but semantic order stays intact and filters work",async({page})=>{
 await page.locator('[data-direction="paper-rebellion"]').click();
 const scene=page.locator('[data-scene="paper-rebellion"]');
 const ids=await scene.locator(".paper-note").evaluateAll(nodes=>nodes.map(n=>n.dataset.topic));
 await scene.locator("#paperShuffle").click();
 await expect(scene.locator("#paperBoard")).toHaveAttribute("data-layout","1");
 await expect.poll(()=>scene.locator(".paper-note").evaluateAll(nodes=>nodes.map(n=>n.dataset.topic))).toEqual(ids);
 await scene.locator('[data-topic-filter="type"]').click();
 await expect(scene.locator(".paper-note:visible")).toHaveCount(1);
 await expect(scene.locator(".note-two")).toBeVisible();
 await scene.locator('[data-topic-filter="all"]').click();
 await expect(scene.locator(".paper-note:visible")).toHaveCount(3);
});
test("ambient modes change scene but reduced motion disables orbital animation",async({page})=>{
 await page.locator('[data-direction="aether-orbit"]').click();
 const scene=page.locator('[data-scene="aether-orbit"]');
 await scene.locator('[data-mood-preset="twilight"]').click();
 await expect(scene.locator(".aether-shell")).toHaveAttribute("data-mood","twilight");
 await expect(scene.locator("#aetherFeedback")).toContainText("Twilight");
 await page.emulateMedia({reducedMotion:"reduce"});
 await expect.poll(()=>scene.locator(".aether-core").evaluate(el=>getComputedStyle(el).animationName)).toBe("none");
});
test("every style at 390/768/1440 has no viewport overflow with capture-only screenshots",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:850});
  for(const id of styles){
   await page.locator('[data-direction="'+id+'"]').click();
   const dim=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(dim.scroll,id+" at "+width).toBeLessThanOrEqual(dim.client+1);
   await page.screenshot({path:"test-results/creative-"+id+"-"+width+".png",fullPage:true,animations:"disabled"});
  }
 }
});
