import {defineConfig,devices} from "@playwright/test";
export default defineConfig({
 testDir:"./tests/browser",
 testMatch:"**/advanced-interactions-v3.crossbrowser.spec.mjs",
 timeout:35000,expect:{timeout:8000},
 retries:process.env.CI?1:0,workers:process.env.CI?2:undefined,
 reporter:process.env.CI?[["list"],["html",{open:"never",outputFolder:"playwright-report-timeline-story"}]]:"list",
 use:{baseURL:"http://127.0.0.1:8009",trace:"retain-on-failure",screenshot:"only-on-failure"},
 projects:[
  {name:"chromium",use:{...devices["Desktop Chrome"],viewport:{width:1280,height:900}}},
  {name:"firefox",use:{...devices["Desktop Firefox"],viewport:{width:1280,height:900}}},
  {name:"webkit",use:{...devices["Desktop Safari"],viewport:{width:1280,height:900}}},
  {name:"chromium-touch-emulation",use:{browserName:"chromium",viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true}}
 ],
 webServer:{command:"npm run dev:catalog",url:"http://127.0.0.1:8009/playground/advanced-interactions-v3/",reuseExistingServer:!process.env.CI,timeout:30000}
});
