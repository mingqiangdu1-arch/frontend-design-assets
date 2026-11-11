import {test,expect} from "@playwright/test";
const base="/playground/visual-editor-v039/";
test.beforeEach(async({page})=>{await page.goto(base);});
const order=async(page)=>page.locator("#blockList [data-block-id]").evaluateAll(nodes=>nodes.map(n=>n.dataset.blockId));
test("original specimen renders separate list, inspector and versioned preview",async({page})=>{
 await expect(page.locator("#sortable")).toBeVisible();
 await expect(page.locator("#inspector")).toBeVisible();
 await expect(page.locator("#previewBlocks article")).toHaveCount(3);
 await expect(page.locator("#propsFields [data-prop]")).toHaveCount(3);
 await expect(page.locator("#undoBtn")).toBeDisabled();
 assertOrder: { const ids=await order(page); expect(ids).toEqual(["hero-01","feature-01","quote-01"]); }
});
test("keyboard-accessible move up/down works and can be undone and redone",async({page})=>{
 await page.locator('[data-block-id="hero-01"] [data-action="down"]').click();
 expect(await order(page)).toEqual(["feature-01","hero-01","quote-01"]);
 await page.locator("#undoBtn").click();
 expect(await order(page)).toEqual(["hero-01","feature-01","quote-01"]);
 await page.locator("#redoBtn").click();
 expect(await order(page)).toEqual(["feature-01","hero-01","quote-01"]);
});
test("HTML drag and drop moves one block before another with one history action",async({page})=>{
 await page.locator('[data-block-id="quote-01"]').dragTo(page.locator('[data-block-id="hero-01"]'));
 expect(await order(page)).toEqual(["quote-01","hero-01","feature-01"]);
 await expect(page.locator("#undoBtn")).toBeEnabled();
 await page.locator("#undoBtn").click();
 expect(await order(page)).toEqual(["hero-01","feature-01","quote-01"]);
});
test("inspector saves typed props and undo restores original title",async({page})=>{
 await page.locator("#prop-title").fill("新标题 / 可追踪");
 await page.locator("#prop-align").selectOption("center");
 await page.locator("#saveProps").click();
 await expect(page.locator('[data-preview-id="hero-01"] strong')).toHaveText("新标题 / 可追踪");
 await expect(page.locator('[data-preview-id="hero-01"]')).toHaveAttribute("data-align","center");
 await page.locator("#undoBtn").click();
 await expect(page.locator('[data-preview-id="hero-01"] strong')).toHaveText("让内容结构保持清晰");
 await page.locator("#redoBtn").click();
 await expect(page.locator('[data-preview-id="hero-01"] strong')).toHaveText("新标题 / 可追踪");
});
test("validation rejects missing title without corrupting current document",async({page})=>{
 await page.locator("#prop-title").fill("");
 await page.locator("#saveProps").click();
 await expect(page.locator("#historyStatus")).toContainText("Invalid title text");
 await expect(page.locator('[data-preview-id="hero-01"] strong')).toHaveText("让内容结构保持清晰");
 await expect(page.locator("#undoBtn")).toBeDisabled();
});
test("selection updates props; feature checkbox is typed and reversible",async({page})=>{
 await page.locator('[data-block-id="feature-01"] [data-action="select"]').click();
 await expect(page.locator("#prop-emphasis")).toBeChecked();
 await page.locator("#prop-emphasis").uncheck();
 await page.locator("#saveProps").click();
 await expect(page.locator('[data-preview-id="feature-01"]')).toHaveAttribute("data-emphasis","false");
 await page.locator("#undoBtn").click();
 await expect(page.locator('[data-preview-id="feature-01"]')).toHaveAttribute("data-emphasis","true");
});
test("markup-looking user text is rendered as literal text, not HTML",async({page})=>{
 await page.locator("#prop-title").fill("<img src=x onerror=alert(1)>");
 await page.locator("#saveProps").click();
 await expect(page.locator('[data-preview-id="hero-01"] strong')).toHaveText("<img src=x onerror=alert(1)>");
 await expect(page.locator("#previewBlocks img")).toHaveCount(0);
});
test("export exposes current schema without writing to a service",async({page})=>{
 await page.locator("#exportBtn").click();
 await expect(page.locator("#schemaOutput")).toBeVisible();
 const parsed=JSON.parse(await page.locator("#schemaOutput").textContent());
 expect(parsed.schemaVersion).toBe("1.0");
 expect(parsed.blocks).toHaveLength(3);
 await page.locator("#exportBtn").click();
 await expect(page.locator("#schemaOutput")).toBeHidden();
});
test("390px viewport retains inspector and all keyboard operation buttons",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator("#inspector")).toBeVisible();
 await expect(page.locator('[data-block-id="feature-01"] [data-action="up"]')).toBeVisible();
 await expect(page.locator("#saveProps")).toBeVisible();
});
