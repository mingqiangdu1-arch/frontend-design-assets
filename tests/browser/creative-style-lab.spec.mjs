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


test("pixel style protects original art and maintains readable controls",async({page})=>{
 await page.goto(base+"?style=pixel-arcade");
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:850});
  const scene=page.locator('[data-scene="pixel-arcade"]');
  const evidence=await scene.evaluate(el=>{
   const q=el.querySelector('[data-quest="1"]');
   const body=el.querySelector(".pixel-copy>p");
   const sun=el.querySelector(".pixel-sun");
   const world=el.querySelector(".pixel-world");
   return {
    label:parseFloat(getComputedStyle(el.querySelector(".pixel-label")).fontSize),
    paragraph:parseFloat(getComputedStyle(body).fontSize),
    questSubline:parseFloat(getComputedStyle(q.querySelector("small")).fontSize),
    hitHeight:q.getBoundingClientRect().height,
    buttonRadius:parseFloat(getComputedStyle(q).borderTopLeftRadius)||0,
    shellBorder:parseFloat(getComputedStyle(el.querySelector(".pixel-shell")).borderTopWidth),
    pixelSun:getComputedStyle(sun).clipPath,
    sceneImage:getComputedStyle(world).backgroundImage,
    headline:getComputedStyle(el.querySelector(".pixel-copy h2")).fontFamily,
    selectedMarker:getComputedStyle(q.querySelector("strong"),"::after").content
   };
  });
  expect(evidence.label,"HUD label "+width).toBeGreaterThanOrEqual(12);
  expect(evidence.paragraph,"reading copy "+width).toBeGreaterThanOrEqual(14);
  expect(evidence.questSubline,"quest supporting copy "+width).toBeGreaterThanOrEqual(12);
  expect(evidence.hitHeight,"quest hit area "+width).toBeGreaterThanOrEqual(44);
  expect(evidence.buttonRadius,"pixel square corners "+width).toBe(0);
  expect(evidence.shellBorder,"chunky shell "+width).toBeGreaterThanOrEqual(3);
  expect(evidence.pixelSun,"illustrated clipped sun "+width).toContain("polygon");
  expect(evidence.sceneImage,"illustrated landscape "+width).toContain("linear-gradient");
  expect(evidence.headline.toLowerCase()).toMatch(/mono|menlo|consolas/);
  expect(evidence.selectedMarker).toContain("▸");
 }
});
test("pixel selected quest remains visible beyond color and updates live state",async({page})=>{
 const scene=page.locator('[data-scene="pixel-arcade"]');
 const second=scene.locator('[data-quest="2"]');
 await second.focus();
 const focus=await second.evaluate(el=>({style:getComputedStyle(el).outlineStyle,size:parseFloat(getComputedStyle(el).outlineWidth)}));
 expect(focus.style).not.toBe("none");
 expect(focus.size).toBeGreaterThanOrEqual(3);
 await page.keyboard.press("Enter");
 await expect(second).toHaveAttribute("aria-pressed","true");
 await expect(scene.locator('[data-quest="1"]')).toHaveAttribute("aria-pressed","false");
 await expect(scene.locator("#pixelXP")).toHaveText("050");
 await expect(scene.locator("#pixelFeedback")).toContainText("The Unknown");
 const marker=await second.locator("strong").evaluate(el=>getComputedStyle(el,"::after").content);
 expect(marker).toContain("▸");
});
