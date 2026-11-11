import {test,expect} from "@playwright/test";
const base="/playground/registry-metadata-v041/";
test.beforeEach(async({page})=>{await page.goto(base);});
test("fixed official metadata fixtures load and show read-only parser output",async({page})=>{
 await expect(page.locator("#itemSelect")).toBeEnabled();
 await expect(page.locator("#itemSelect option")).toHaveCount(3);
 await expect(page.locator("#commitId")).toContainText("8ab27715521c");
 await expect(page.locator("#typeLine")).toContainText("alert-dialog");
 await expect(page.locator(".rm41-file")).toHaveCount(1);
 await expect(page.locator("#analysisOutput")).toContainText('"codeImported": false');
});
test("alert-dialog dependency graph resolves button locally with no missing registry items",async({page})=>{
 await expect(page.locator("#localCount")).toHaveText("2");
 await expect(page.locator("#unresolvedCount")).toHaveText("0");
 await expect(page.locator("#dependencyDetails")).toContainText("button → alert-dialog");
 await expect(page.locator("#dependencyDetails")).toContainText("radix-ui");
});
test("login block reports multiple source paths and four unresolved registry addresses",async({page})=>{
 await page.locator("#itemSelect").selectOption("login-04");
 await expect(page.locator("#typeLine")).toContainText("registry:block");
 await expect(page.locator(".rm41-file")).toHaveCount(2);
 await expect(page.locator("#unresolvedCount")).toHaveText("4");
 await expect(page.locator("#dependencyDetails")).toContainText("field");
 await expect(page.locator("#fileList")).toContainText("app/login/page.tsx");
});
test("button metadata preview does not import vendor source",async({page})=>{
 await page.locator("#itemSelect").selectOption("button");
 await expect(page.locator("#typeLine")).toContainText("registry:ui");
 await expect(page.locator("#localCount")).toHaveText("1");
 await expect(page.locator("#analysisOutput")).toContainText('"canInstall": false');
 await expect(page.locator("#upstream")).toHaveAttribute("href",/8ab27715521cbd4f87ae6886cd989cbb678f6de7/);
});
test("internal V1-to-V2 migration explains that it is not upstream upgrade",async({page})=>{
 await page.locator("#migrate").click();
 await expect(page.locator("#analysisOutput")).toContainText('"formatVersion": "2.0"');
 await expect(page.locator("#analysisOutput")).toContainText('"mode": "metadata-only"');
 await expect(page.locator("#analysisOutput")).toContainText("No shadcn upstream schema migration");
});
test("simulated dependency change is labeled synthetic and can be reset",async({page})=>{
 await page.locator("#diff").click();
 await expect(page.locator("#analysisOutput")).toContainText("example-diff-only@1.0.0");
 await expect(page.locator("#analysisOutput")).toContainText("NOT upstream fact");
 await page.locator("#resetOutput").click();
 await expect(page.locator("#analysisOutput")).toContainText('"canInstall": false');
});
test("390px viewport keeps controls operable",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator("#itemSelect")).toBeVisible();
 await expect(page.locator("#migrate")).toBeVisible();
 await expect(page.locator("#diff")).toBeVisible();
});
