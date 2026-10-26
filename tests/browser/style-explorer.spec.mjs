import {test,expect} from "@playwright/test";

const path="/playground/style-explorer/";
const themes=["precision-dark","editorial-warm","playful-pop"];
test.beforeEach(async({page})=>{await page.goto(path);});

test("style switch shows independent scenes and leaves other styles hidden",async({page})=>{
 for(const id of themes){
  await page.locator('[data-style="'+id+'"]').click();
  await expect(page.locator("#"+id)).toBeVisible();
  await expect(page.locator('[data-style="'+id+'"]')).toHaveAttribute("aria-pressed","true");
  for(const other of themes.filter(x=>x!==id))await expect(page.locator("#"+other)).toBeHidden();
 }
});

test("precision: palette supports filtered command and focus returns to selected row",async({page})=>{
 await page.locator("#pdCommandButton").click();
 await expect(page.locator("#pdCommandDialog")).toBeVisible();
 await page.locator("#pdCommandSearch").fill("Token");
 await expect(page.locator("#pdCommandResults button")).toHaveCount(1);
 await page.locator("#pdCommandSearch").press("Enter");
 await expect(page.locator("#pdCommandDialog")).toBeHidden();
 await expect(page.locator("#pdSelected")).toHaveText("Design token audit");
 await expect(page.locator(".pd-item.selected")).toHaveAttribute("data-work","Design token audit");
 await expect(page.locator(".pd-item.selected")).toBeFocused();
});

test("precision: arrow keys stay scoped to focused work rows",async({page})=>{
 const toggle=page.locator('[data-style="editorial-warm"]');
 await toggle.focus();
 await toggle.press("ArrowDown");
 await expect(toggle).toBeFocused();
 await expect(page.locator(".pd-item.selected")).toHaveAttribute("data-work","Feature review");
 const first=page.locator('.pd-item[data-work="Feature review"]');
 await first.focus();
 await first.press("ArrowDown");
 await expect(page.locator(".pd-item.selected")).toHaveAttribute("data-work","Design token audit");
});

test("editorial: reading focus and bookmark are reversible",async({page})=>{
 await page.locator('[data-style="editorial-warm"]').click();
 await page.locator("#edReadingMode").click();
 await expect(page.locator("#editorial-warm")).toHaveClass(/is-reading/);
 await page.locator("#edSave").click();
 await expect(page.locator("#edSave")).toHaveAttribute("aria-pressed","true");
 await page.locator("#edSave").click();
 await expect(page.locator("#edSave")).toHaveAttribute("aria-pressed","false");
 await page.locator("#edReadingMode").click();
 await expect(page.locator("#editorial-warm")).not.toHaveClass(/is-reading/);
});

test("playful: answer submission, feedback and next lesson",async({page})=>{
 await page.locator('[data-style="playful-pop"]').click();
 await page.locator('#popChoices [data-choice="0"]').click();
 await expect(page.locator("#popSubmit")).toBeEnabled();
 await page.locator("#popSubmit").click();
 await expect(page.locator("#popPoints")).toHaveText("140");
 await expect(page.locator("#popFeedback")).toContainText("答对了");
 await expect(page.locator("#popNext")).toBeVisible();
 await page.locator("#popNext").click();
 await expect(page.locator("#popProgressLabel")).toHaveText("2 / 3");
 await expect(page.locator("#popSubmit")).toBeDisabled();
});

test("no page-wide horizontal overflow at 390 and 1440 for all themes",async({page})=>{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of themes){
   await page.locator('[data-style="'+theme+'"]').click();
   const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
   expect(size.scroll,theme+" @"+width).toBeLessThanOrEqual(size.client+1);
   await page.screenshot({path:"test-results/"+theme+"-"+width+".png",fullPage:true});
  }
 }
});
