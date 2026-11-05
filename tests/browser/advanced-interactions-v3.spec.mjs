import {test,expect} from "@playwright/test";
const url="/playground/advanced-interactions-v3/";
test.beforeEach(async({page})=>{await page.goto(url);});

test("timeline and narrative render six immutable-seed clips, four readable chapters and real control labels",async({page})=>{
 await expect(page.locator(".track")).toHaveCount(3);
 await expect(page.locator("[data-clip]")).toHaveCount(6);
 await expect(page.locator(".chapter")).toHaveCount(4);
 await expect(page.getByRole("group",{name:"三轨编辑时间线"})).toBeVisible();
 await expect(page.getByRole("progressbar",{name:"叙事阅读进度"})).toHaveAttribute("aria-valuemin","0");
 await expect(page.locator("#undo")).toBeDisabled();
 await expect(page.locator("#snapEnabled")).toBeChecked();
 const ids=await page.evaluate(()=>[...document.querySelectorAll("[id]")].map(x=>x.id));
 expect(new Set(ids).size).toBe(ids.length);
});

test("keyboard fine/coarse frame changes retain focus and undo redo return exact frames",async({page})=>{
 const clip=page.locator('[data-clip="VIS-A"]');
 await clip.focus();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:01/);
 await expect(page.locator('[data-clip="VIS-A"]')).toBeFocused();
 await page.keyboard.press("Shift+ArrowRight");
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:13/);
 await page.locator("#undo").click();
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:01/);
 await page.locator("#redo").click();
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:13/);
});
test("keyboard cross-track move is real and collision rejection leaves item unchanged",async({page})=>{
 await page.locator('[data-clip="CAP-B"]').focus();
 await page.keyboard.press("Alt+ArrowUp");
 await expect(page.locator('[data-rail="visual"] [data-clip="CAP-B"]')).toHaveCount(1);
 await expect(page.locator('[data-clip="CAP-B"]')).toBeFocused();
 await page.locator("#reset").click();
 await page.locator('[data-clip="VIS-B"]').focus();
 for(let i=0;i<5;i++)await page.keyboard.press("Shift+ArrowLeft");
 await expect(page.locator('[data-clip="VIS-B"]')).toHaveAttribute("aria-label",/开始 00:03:12/);
 await expect(page.locator("#timelineStatus")).toContainText("时间冲突");
});
test("pointer drag snaps clips to second grid without losing history",async({page})=>{
 const clip=page.locator('[data-clip="VIS-B"]');
 await clip.scrollIntoViewIfNeeded();
 const start=await clip.boundingBox(),rail=await page.locator('[data-rail="visual"]').boundingBox();
 expect(start&&rail).toBeTruthy();
 const x=start.x+Math.min(start.width/2,35),y=start.y+start.height/2;
 await page.mouse.move(x,y);await page.mouse.down();
 await page.mouse.move(x+(94-132)/288*rail.width,y,{steps:15});
 await page.mouse.up();
 await expect(page.locator('[data-clip="VIS-B"]')).toHaveAttribute("aria-label",/开始 00:04:00/);
 await expect(page.locator("#timelineStatus")).toContainText("已磁吸");
 await page.locator("#undo").click();
 await expect(page.locator('[data-clip="VIS-B"]')).toHaveAttribute("aria-label",/开始 00:05:12/);
});
test("pointer drag can cross tracks and keyboard explicit controls remain alternatives",async({page})=>{
 const clip=page.locator('[data-clip="CAP-B"]');
 await clip.scrollIntoViewIfNeeded();
 const start=await clip.boundingBox();
 const target=await page.locator('[data-rail="visual"]').boundingBox();
 expect(start&&target).toBeTruthy();
 const x=start.x+Math.min(start.width/2,25),y=start.y+start.height/2;
 await page.mouse.move(x,y);await page.mouse.down();
 await page.mouse.move(x,target.y+target.height/2,{steps:12});await page.mouse.up();
 await expect(page.locator('[data-rail="visual"] [data-clip="CAP-B"]')).toHaveCount(1);
 await page.locator("#undo").click();
 await expect(page.locator('[data-rail="captions"] [data-clip="CAP-B"]')).toHaveCount(1);
 await page.locator('[data-clip="VIS-A"]').click();
 await page.locator("#frameForward").click();
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:01/);
});
test("snap toggle and playhead slider provide working keyboard actions",async({page})=>{
 await page.locator("#snapEnabled").uncheck();
 await expect(page.locator("#snapEnabled")).not.toBeChecked();
 const slider=page.locator("#playhead");
 await slider.focus();await page.keyboard.press("Home");
 await page.keyboard.press("ArrowRight");
 await expect(page.locator("#playheadReadout")).toHaveText("00:00:01");
});
test("scroll story jumps chapters, reveals content and updates stage without replacing prose",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.getByRole("button",{name:"下一章 →"}).click();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-scene","structure");
 await expect(page.locator("#chapter-structure")).toHaveAttribute("aria-current","step");
 await expect(page.locator("#storyStatus")).toContainText("02 章");
 await page.getByRole("button",{name:"下一章 →"}).click();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-scene","rhythm");
 await page.getByRole("button",{name:"← 上一章"}).click();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-scene","structure");
 await expect(page.locator("#chapter-resolve")).toContainText("内容始终可读");
});
test("scroll position actually changes stage progress and reads last chapter",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.locator("#chapter-resolve").scrollIntoViewIfNeeded();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-scene","resolve");
 const progress=Number(await page.locator("#storyMeter").getAttribute("aria-valuenow"));
 expect(progress).toBeGreaterThan(50);
 await expect(page.locator("#storyActive")).toHaveText("抵达结论");
});
test("reduced motion stops decorative transforms but never hides story copy",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.locator("#chapter-rhythm").scrollIntoViewIfNeeded();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-motion","reduced");
 const transform=await page.locator(".stage-core").evaluate(el=>getComputedStyle(el).transform);
 expect(transform).toBe("none");
 for(const chapter of ["origin","structure","rhythm","resolve"])await expect(page.locator("#chapter-"+chapter+" p").last()).toBeVisible();
});
test("390, 768, 1440 layouts keep the viewport narrow while timeline scrolls internally",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  const measure=await page.evaluate(()=>({
   document:document.documentElement.scrollWidth,
   client:document.documentElement.clientWidth,
   shellScrollable:document.querySelector(".timeline-shell").scrollWidth>document.querySelector(".timeline-shell").clientWidth
  }));
  expect(measure.document,"width "+width).toBeLessThanOrEqual(measure.client+1);
  if(width===390)expect(measure.shellScrollable).toBe(true);
  await expect(page.locator("#timelineTitle")).toBeVisible();
  await page.screenshot({path:"test-results/advanced-v3-"+width+".png",fullPage:true,animations:"disabled"});
 }
});
