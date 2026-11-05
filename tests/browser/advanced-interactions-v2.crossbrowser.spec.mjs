import {test,expect} from "@playwright/test";

const pageUrl="/playground/advanced-interactions-v2/";
test.beforeEach(async({page})=>await page.goto(pageUrl));

test("semantics and accessible targets are preserved without duplicate element IDs",async({page})=>{
  await expect(page.getByRole("heading",{name:"跨容器移动画板"})).toBeVisible();
  await expect(page.getByRole("heading",{name:"布局重排，保持对象"})).toBeVisible();
  await expect(page.getByRole("group",{name:"三列本地任务画板"})).toBeVisible();
  await expect(page.getByRole("group",{name:"四张可重排的概念卡片"})).toBeVisible();
  await expect(page.getByRole("button",{name:/^移动 故事路径图；/})).toBeVisible();
  await expect(page.getByRole("button",{name:"向右移动 故事路径图"})).toBeEnabled();
  await expect(page.getByRole("button",{name:"向左移动 故事路径图"})).toBeDisabled();
  const invariants=await page.evaluate(()=>{
    const ids=[...document.querySelectorAll("[id]")].map(x=>x.id);
    return {
      unique:new Set(ids).size===ids.length,
      brokenDescriptions:[...document.querySelectorAll("[aria-describedby]")].filter(el=>el.getAttribute("aria-describedby").split(/\s+/).some(id=>!document.getElementById(id))).length,
      missingLabels:[...document.querySelectorAll(".drag-handle")].filter(el=>!el.getAttribute("aria-label")).length,
      statusRegions:document.querySelectorAll('[role="status"]').length
    };
  });
  expect(invariants).toEqual({unique:true,brokenDescriptions:0,missingLabels:0,statusRegions:2});
});

test("keyboard transfer has a focus-retaining successful path, and undo and cancel never invent saves",async({page})=>{
  const handle=page.locator('[data-handle="ST-01"]');
  await handle.focus();
  await page.keyboard.press("Space");
  await expect(handle).toHaveAttribute("aria-pressed","true");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-lane="progress"]')).toHaveAttribute("data-target","true");
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-cards="progress"] [data-card="ST-01"]')).toHaveCount(1);
  await expect(page.locator('[data-handle="ST-01"]')).toBeFocused();
  await page.locator("#boardUndo").click();
  await expect(page.locator('[data-cards="inbox"] [data-card="ST-01"]')).toHaveCount(1);
  const other=page.locator('[data-handle="ST-02"]');
  await other.focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-cards="inbox"] [data-card="ST-02"]')).toHaveCount(1);
  await expect(page.locator("#boardStatus")).toContainText("已取消");
});

test("FLIP reorders the exact same DOM elements, restores focus and respects reduced-motion",async({page})=>{
  await page.evaluate(()=>{
    window.__originalConceptNodes=[...document.querySelectorAll(".concept")];
    document.querySelector('[data-id="PRISM"]').focus();
    document.querySelector('[data-sort="name"]').click();
  });
  await expect(page.locator(".concept").first()).toHaveAttribute("data-id","FORM");
  await expect(page.locator('[data-id="PRISM"]')).toBeFocused();
  await page.evaluate(()=>document.querySelector('[data-layout="stack"]').click());
  const kept=await page.evaluate(()=>window.__originalConceptNodes.every(el=>document.querySelector('[data-id="'+el.dataset.id+'"]')===el));
  expect(kept).toBe(true);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.locator('[data-sort="priority"]').click();
  await expect(page.locator("#collection")).toHaveAttribute("data-motion","reduced");
  expect(await page.locator(".concept").evaluateAll(els=>els.every(el=>el.getAnimations().length===0))).toBe(true);
});

test("same-lane keyboard drop clears pickup state; changing focus cancels pickup",async({page})=>{
 const handle=page.locator('[data-handle="ST-01"]');
 await handle.focus();
 await page.keyboard.press("Space");
 await page.keyboard.press("Enter");
 await expect(page.locator('[data-handle="ST-01"]')).toHaveAttribute("aria-pressed","false");
 await expect(page.locator('[data-handle="ST-01"]')).toBeFocused();
 await expect(page.locator("#boardUndo")).toBeDisabled();
 await page.keyboard.press("Space");
 await page.keyboard.press("Tab");
 await expect(page.locator('[data-handle="ST-01"]')).toHaveAttribute("aria-pressed","false");
 await expect(page.locator("#boardStatus")).toContainText("已取消拾取");
 await expect(page.locator('[data-cards="inbox"] [data-card="ST-01"]')).toHaveCount(1);
});

test("explicit transfer remains usable with emulated mobile touch",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium-touch-emulation","Only touch-emulated Chromium project.");
  const button=page.getByRole("button",{name:"向右移动 手势反馈"});
  await button.scrollIntoViewIfNeeded();
  await button.tap();
  await expect(page.locator('[data-cards="ready"] [data-card="ST-03"]')).toHaveCount(1);
  await page.locator("#boardUndo").tap();
  await expect(page.locator('[data-cards="progress"] [data-card="ST-03"]')).toHaveCount(1);
  const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client+1);
});

test("pointer transfer does not lose or duplicate cards",async({page},testInfo)=>{
  test.skip(testInfo.project.name==="chromium-touch-emulation","Desktop pointer mouse path only.");
  const handle=page.locator('[data-handle="ST-02"]');
  await handle.scrollIntoViewIfNeeded();
  const start=await handle.boundingBox();
  const target=await page.locator('[data-lane="ready"]').boundingBox();
  expect(start&&target).toBeTruthy();
  await page.mouse.move(start.x+start.width/2,start.y+start.height/2);
  await page.mouse.down();
  await page.mouse.move(target.x+target.width/2,target.y+target.height/2,{steps:10});
  await page.mouse.up();
  await expect(page.locator('[data-cards="ready"] [data-card="ST-02"]')).toHaveCount(1);
  expect(await page.locator("[data-card]").count()).toBe(5);
  const ids=await page.locator("[data-card]").evaluateAll(els=>els.map(el=>el.dataset.card));
  expect(new Set(ids).size).toBe(5);
});
