import {test,expect} from "@playwright/test";
const base="/playground/agent-interactions-v038/";
test.beforeEach(async({page})=>{await page.goto(base);});
test("all independent specimens load",async({page})=>{
 for(const id of ["timeline","approval","clarification"])await expect(page.locator("#"+id)).toBeVisible();
 await expect(page.locator("#timelinePhase")).toHaveText("尚未开始");
 await expect(page.locator("#approvalPhase")).toHaveText("未发起提案");
 await expect(page.locator("#questionPrompt")).toBeHidden();
});
test("tool timeline reports partial failure instead of success",async({page})=>{
 for(const id of ["research","inspect","handoff"]){
  await page.locator('[data-tool-id="'+id+'"][data-next="running"]').click();
  await page.locator('[data-tool-id="'+id+'"][data-next="'+(id==="inspect"?"failed":"succeeded")+'"]').click();
 }
 await expect(page.locator("#tool-inspect")).toHaveText("失败");
 await expect(page.locator("#timelinePhase")).toHaveText("部分失败");
 await page.locator("#timelineReset").click();
 await expect(page.locator("#timelinePhase")).toHaveText("尚未开始");
});
test("approval requires explicit decision before local-only receipt",async({page})=>{
 await expect(page.locator("#approvalApply")).toBeDisabled();
 await page.locator("#approvalPropose").click();
 await page.locator("#approvalApprove").click();
 await expect(page.locator("#approvalPhase")).toContainText("未写入");
 await page.locator("#approvalApply").click();
 await expect(page.locator("#approvalReceipt")).toContainText("LOCAL-DEMO-001");
 await page.locator("#approvalReset").click();
 await page.locator("#approvalPropose").click();
 await page.locator("#approvalReject").click();
 await expect(page.locator("#approvalApply")).toBeDisabled();
});
test("stale version cannot produce successful receipt",async({page})=>{
 await page.locator("#approvalVersion").fill("v2");
 await page.locator("#approvalPropose").click();
 await page.locator("#approvalApprove").click();
 await page.locator("#approvalApply").click();
 await expect(page.locator("#approvalPhase")).toContainText("版本冲突");
 await expect(page.locator("#approvalReceipt")).toContainText("v1 ≠ v2");
});
test("question submission and acceptance retain unsent draft and attachment",async({page})=>{
 await page.locator("#draftText").fill("保留我的草稿");
 await page.locator("#questionAsk").click();
 await expect(page.locator("#draftText")).toBeDisabled();
 await page.getByLabel("优先",{exact:true}).check();
 await page.locator("#questionSubmit").click();
 await page.locator("#questionAccept").click();
 await expect(page.locator("#draftText")).toHaveValue("保留我的草稿");
 await expect(page.locator("#draftAttachment")).toHaveText("design-notes.md");
 await expect(page.locator("#questionResponse")).toContainText("优先");
 await expect(page.locator("#draftText")).toBeEnabled();
});
test("mobile width does not hide usable specimens",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const id of ["timeline","approval","clarification"])await expect(page.locator("#"+id)).toBeVisible();
 await expect(page.locator("#questionAsk")).toBeVisible();
});
