import {test,expect} from "@playwright/test";
const base="/playground/advanced-interactions-v4/";
test.beforeEach(async({page})=>{await page.goto(base);});

test("four independent interaction references render as a material gallery, not a business application",async({page})=>{
 for(const id of ["tree","annotations","story","dial"])await expect(page.locator("#"+id)).toBeVisible();
 await expect(page.getByRole("treegrid",{name:"可编辑素材目录"})).toBeVisible();
 await expect(page.locator('[data-tree-id]')).toHaveCount(6);
 await expect(page.locator("#noteItems button")).toHaveCount(3);
 await expect(page.locator("#storyTrail li")).toHaveCount(1);
 await expect(page.locator("#dialKnob")).toHaveAttribute("aria-valuenow","40");
});

test("treegrid row-first keyboard navigation expands deep branches, selects, then collapse preserves a visible focus",async({page})=>{
 const first=page.locator('[data-tree-id="root"]');await first.focus();
 await page.keyboard.press("ArrowDown");
 await expect(page.locator('[data-tree-id="themes"]')).toBeFocused();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('[data-tree-id="style"]')).toBeFocused();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('[data-tree-id="variations"]')).toBeFocused();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('[data-tree-id="variations"]')).toHaveAttribute("aria-expanded","true");
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('[data-tree-id="draft"]')).toBeFocused();
 await page.keyboard.press("Enter");
 await expect(page.locator('[data-tree-id="draft"]')).toHaveAttribute("aria-selected","true");
 await page.locator('[data-tree-id="variations"] .tree-branch').click();
 await expect(page.locator('[data-tree-id="variations"]')).toBeFocused();
 await expect(page.locator('[data-tree-id="draft"]')).toHaveCount(0);
 await expect(page.locator("#treeSelected")).toContainText("紧凑实验");
 await expect(page.locator("#treeActive")).toContainText("布局变体");
});

test("treegrid F2 local edit, Escape cancel and invalid name never corrupt source rows",async({page})=>{
 const row=page.locator('[data-tree-id="components"]');await row.focus();
 await page.keyboard.press("F2");
 await expect(page.locator("#treeRenameForm")).toBeVisible();
 await page.locator("#treeRenameInput").fill("临时标题");
 await page.locator("#treeRenameInput").press("Escape");
 await expect(page.locator("#treeRenameForm")).toBeHidden();
 await expect(page.locator('[data-tree-id="components"]')).toContainText("交互控件");
 await row.focus();await page.keyboard.press("F2");
 await page.locator("#treeRenameInput").fill(" ");
 await page.locator('#treeRenameForm button[type="submit"]').click();
 await expect(page.locator("#treeStatus")).toContainText("名称需为");
 await page.locator("#treeRenameInput").fill("高级交互");
 await page.locator('#treeRenameForm button[type="submit"]').click();
 await expect(page.locator("#treeRenameForm")).toBeHidden();
 await expect(page.locator('[data-tree-id="components"]')).toContainText("高级交互");
 await page.locator("#treeReset").click();
 await expect(page.locator('[data-tree-id="components"]')).toContainText("交互控件");
});

test("annotation pins and parallel index open identical notes, Escape closes and restores source focus",async({page})=>{
 const pin=page.locator('[data-note-pin="note-1"]');await pin.click();
 await expect(page.locator("#annotationOverlay")).toBeVisible();
 await expect(page.locator("#annotationContent")).toContainText("操作场景");
 await expect(page.locator("#annotationProvenance")).toContainText("paragraph-a");
 await page.keyboard.press("Escape");
 await expect(page.locator("#annotationOverlay")).toBeHidden();
 await expect(pin).toBeFocused();
 const orphan=page.locator('[data-note-index="note-3"]');await orphan.click();
 await expect(page.locator("#annotationProvenance")).toContainText("孤立标注");
 await expect(page.locator("#annotationStatus")).toContainText("已缺失");
 await page.locator("#annotationClose").click();
 await expect(orphan).toBeFocused();
});

test("branching story records choices, refuses return cycle, and rewinds provisional decisions only",async({page})=>{
 await expect(page.locator("#storyHeading")).toContainText("一条线索");
 await page.locator('[data-choice="observe"]').click();
 await expect(page.locator("#storyHeading")).toContainText("新证据");
 await page.locator('[data-choice="verify"]').click();
 await expect(page.locator("#storyHeading")).toContainText("结构");
 await expect(page.locator("#storyTrail li")).toHaveCount(3);
 await page.locator('[data-choice="review"]').click();
 await expect(page.locator("#storyStatus")).toContainText("cycle-protection");
 await expect(page.locator("#storyTrail li")).toHaveCount(3);
 await page.locator("#storyBack").click();
 await expect(page.locator("#storyTrail li")).toHaveCount(2);
 await page.locator('[data-story-jump="0"]').click();
 await expect(page.locator("#storyTrail li")).toHaveCount(1);
 await page.locator('[data-choice="organize"]').click();
 await expect(page.locator("#storyHeading")).toContainText("结构");
});

test("dial provides numerically equivalent native slider, number, keyboard and pointer with cancellation rollback",async({page})=>{
 const slider=page.locator("#dialKnob");
 await slider.focus();await page.keyboard.press("ArrowRight");
 await expect(slider).toHaveAttribute("aria-valuenow","45");
 await page.keyboard.press("Shift+ArrowUp");
 await expect(slider).toHaveAttribute("aria-valuenow","70");
 await page.keyboard.press("Home");
 await expect(slider).toHaveAttribute("aria-valuenow","0");
 await page.locator("#dialNumber").fill("37");
 await page.locator("#dialNumber").press("Tab");
 await expect(slider).toHaveAttribute("aria-valuenow","35");
 await page.locator("#dialRange").evaluate(el=>{el.value="60";el.dispatchEvent(new Event("input",{bubbles:true}));});
 await expect(slider).toHaveAttribute("aria-valuenow","60");
 await page.locator("#dialReset").click();
 await expect(slider).toHaveAttribute("aria-valuenow","40");
 await slider.scrollIntoViewIfNeeded();
 const box=await slider.boundingBox();expect(box).not.toBeNull();
 const x=box.x+box.width/2,y=box.y+box.height/2;
 await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x,y-36,{steps:4});
 await expect(slider).toHaveAttribute("aria-valuenow","55");
 await page.keyboard.press("Escape");
 await expect(slider).toHaveAttribute("aria-valuenow","40");
 await page.mouse.up();
 await expect(page.locator("#dialStatus")).toContainText("取消拖动");
});

test("all four specimens remain readable at 390/768/1440 widths with reduced motion",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:850});
  for(const id of ["tree","annotations","story","dial"])await expect(page.locator("#"+id)).toBeVisible();
  const dims=await page.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]);
  expect(dims[0],"horizontal overflow at "+width+"px").toBeLessThanOrEqual(dims[1]+1);
  if(width===390||width===1440)await page.screenshot({path:"test-results/interaction-atelier-v4-"+width+".png",fullPage:true,animations:"disabled"});
 }
});
