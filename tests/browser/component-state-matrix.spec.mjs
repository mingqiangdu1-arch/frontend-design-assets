import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.goto("/?view=matrix");});
test("state matrix renders documented cases from real React package",async({page})=>{
 await expect(page.getByRole("heading",{name:"Component State Matrix"})).toBeVisible();
 await expect(page.locator("[data-matrix-theme]")).toHaveCount(4);
 await expect(page.locator('[data-component-id="UI-011"] [data-state]')).toHaveCount(5);
 await expect(page.locator('[data-component-id="UI-014"] [data-state]')).toHaveCount(4);
 await expect(page.getByRole("button",{name:"Submitting…"})).toBeDisabled();
 await expect(page.getByRole("button",{name:"Submitting…"})).toHaveAttribute("aria-busy","true");
 await expect(page.getByRole("button",{name:"Unavailable"})).toBeDisabled();
 await expect(page.getByRole("textbox",{name:"Invalid email"})).toHaveAttribute("aria-invalid","true");
});
test("controlled state interactions, error semantics and request recovery",async({page})=>{
 await page.getByRole("checkbox",{name:"Review selection"}).check();
 await expect(page.getByRole("checkbox",{name:"Review selection"})).toBeChecked();
 const sw=page.getByRole("switch",{name:"Notifications"});
 await sw.click();await expect(sw).toHaveAttribute("aria-checked","false");
 await page.getByRole("button",{name:"error",exact:true}).click();
 await expect(page.locator('[data-request-state="error"]')).toContainText("Could not load");
 await page.getByRole("button",{name:"Retry"}).click();
 await expect(page.locator('[data-request-state="success"]')).toContainText("Data loaded");
 await expect(page.getByRole("progressbar",{name:"60 percent progress"})).toHaveAttribute("aria-valuenow","60");
});
test("matrix tabs, dialog and error toast support keyboard",async({page})=>{
 const details=page.getByRole("tab",{name:"Details"});await details.focus();await details.press("ArrowRight");
 await expect(page.getByRole("tab",{name:"History"})).toHaveAttribute("aria-selected","true");
 await expect(page.getByRole("tab",{name:"Locked"})).toBeDisabled();
 await page.getByRole("button",{name:"Open confirmation"}).click();
 await expect(page.getByRole("dialog",{name:"Confirm a local action"})).toBeVisible();
 await page.keyboard.press("Escape");
 await expect(page.getByRole("dialog")).toBeHidden();
 await page.getByRole("button",{name:"Show error"}).click();
 await expect(page.locator(".fda-toast[role=alert]")).toContainText("Local request error");
 await page.getByRole("button",{name:"关闭消息"}).click();
 await expect(page.locator(".fda-toast")).toHaveCount(0);
});
test("theme-compatible matrix screenshots for 390 / 768 / 1440",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ["refined-light-saas","precision-dark","editorial-warm","playful-pop"]){
   await page.locator('[data-matrix-theme="'+theme+'"]').click();
   await expect(page.locator(".mx-surface")).toHaveAttribute("data-design-theme",theme);
   const widthCheck=await page.evaluate(()=>({actual:document.documentElement.scrollWidth,max:document.documentElement.clientWidth}));
   expect(widthCheck.actual,theme+" "+width).toBeLessThanOrEqual(widthCheck.max+1);
   await page.screenshot({path:"test-results/matrix-"+theme+"-"+width+".png",fullPage:true,animations:"disabled"});
  }
 }
});
