import {test,expect} from "@playwright/test";
const url="/playground/advanced-interactions-v3/";
test.beforeEach(async({page})=>{await page.goto(url);});

test("semantic timeline and narrative state controls are available in every engine",async({page})=>{
 await expect(page.getByRole("group",{name:"三轨编辑时间线"})).toBeVisible();
 await expect(page.getByRole("group",{name:"精确剪辑操作"})).toBeVisible();
 await expect(page.getByRole("progressbar",{name:"叙事阅读进度"})).toHaveAttribute("aria-valuemin","0");
 await expect(page.getByRole("checkbox",{name:/磁吸对齐/})).toBeChecked();
 await expect(page.locator("[data-clip]")).toHaveCount(6);
 await expect(page.locator(".chapter")).toHaveCount(4);
 const invariant=await page.evaluate(()=>{
  const ids=[...document.querySelectorAll("[id]")].map(x=>x.id);
  return {unique:new Set(ids).size===ids.length,
    noMissingLabels:[...document.querySelectorAll(".clip")].every(x=>x.getAttribute("aria-label")?.includes("开始")),
    noBadAria:[...document.querySelectorAll("[aria-labelledby]")].every(x=>x.getAttribute("aria-labelledby").split(/\s+/).every(id=>document.getElementById(id)))};
 });
 expect(invariant).toEqual({unique:true,noMissingLabels:true,noBadAria:true});
});
test("exact-frame keyboard editing preserves focused identity, reversibility and collision refusal",async({page})=>{
 await page.locator('[data-clip="VIS-A"]').focus();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:01/);
 await expect(page.locator('[data-clip="VIS-A"]')).toBeFocused();
 await page.keyboard.press("Shift+ArrowRight");
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:13/);
 await page.locator("#undo").click();
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:01/);
 await page.locator("#redo").click();
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:13/);
 await page.locator('[data-clip="CAP-B"]').focus();
 await page.keyboard.press("Alt+ArrowUp");
 await expect(page.locator('[data-rail="visual"] [data-clip="CAP-B"]')).toHaveCount(1);
});
test("pointer drag commits near-second snap and permits cross-track transfer",async({page},testInfo)=>{
 test.skip(testInfo.project.name==="chromium-touch-emulation","Desktop pointer drag path; touch emulator uses accessible button path.");
 const clip=page.locator('[data-clip="VIS-B"]');await clip.scrollIntoViewIfNeeded();
 const src=await clip.boundingBox(),rail=await page.locator('[data-rail="visual"]').boundingBox();expect(src&&rail).toBeTruthy();
 const x=src.x+Math.min(src.width/2,35),y=src.y+src.height/2;
 await page.mouse.move(x,y);await page.mouse.down();
 await page.mouse.move(x+(94-132)/288*rail.width,y,{steps:12});await page.mouse.up();
 await expect(page.locator('[data-clip="VIS-B"]')).toHaveAttribute("aria-label",/开始 00:04:00/);
 await page.locator('[data-clip="CAP-B"]').scrollIntoViewIfNeeded();
 const from=await page.locator('[data-clip="CAP-B"]').boundingBox(),to=await page.locator('[data-rail="visual"]').boundingBox();
 const mx=from.x+Math.min(from.width/2,25),my=from.y+from.height/2;
 await page.mouse.move(mx,my);await page.mouse.down();
 await page.mouse.move(mx,to.y+to.height/2,{steps:10});await page.mouse.up();
 await expect(page.locator('[data-rail="visual"] [data-clip="CAP-B"]')).toHaveCount(1);
 expect(await page.locator("[data-clip]").count()).toBe(6);
});
test("scroll chapter navigation drives scene/progress without gating prose; reduced motion remains semantic",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.getByRole("button",{name:"下一章 →"}).click();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-scene","structure");
 await expect(page.locator("#chapter-structure")).toHaveAttribute("aria-current","step");
 await page.locator("#chapter-resolve").scrollIntoViewIfNeeded();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-scene","resolve");
 await expect(page.locator("#storyStage")).toHaveAttribute("data-motion","reduced");
 const p=Number(await page.locator("#storyMeter").getAttribute("aria-valuenow"));
 expect(p).toBeGreaterThan(50);
 expect(await page.locator(".stage-core").evaluate(x=>getComputedStyle(x).transform)).toBe("none");
 await expect(page.locator("#chapter-origin")).toContainText("原始输入");
});
test("touch emulated phone can perform explicit timeline moves and chapter jumps",async({page},testInfo)=>{
 test.skip(testInfo.project.name!=="chromium-touch-emulation","Only emulated mobile project.");
 await page.locator("#frameForward").tap();
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:01/);
 await page.locator("#undo").tap();
 await expect(page.locator('[data-clip="VIS-A"]')).toHaveAttribute("aria-label",/开始 00:00:00/);
 await page.getByRole("button",{name:"下一章 →"}).tap();
 await expect(page.locator("#storyStage")).toHaveAttribute("data-scene","structure");
 const measure=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(measure.scroll).toBeLessThanOrEqual(measure.client+1);
});
