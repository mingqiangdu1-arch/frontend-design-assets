import {defineConfig,devices} from "@playwright/test";

export default defineConfig({
 testDir:"./tests/browser",
 testMatch:"*.spec.mjs",
 testIgnore:["**/component-gallery.spec.mjs","**/precision-workbench.spec.mjs","**/component-state-matrix.spec.mjs","**/editorial-review.spec.mjs"],
 timeout:30000,
 expect:{timeout:7000},
 retries:process.env.CI?1:0,
 workers:process.env.CI?1:undefined,
 reporter:process.env.CI?[["list"],["html",{open:"never",outputFolder:"playwright-report"}]]:"list",
 use:{
  baseURL:"http://127.0.0.1:8009",
  trace:"retain-on-failure",
  screenshot:"only-on-failure"
 },
 projects:[{name:"chromium",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:900}}}],
 webServer:{
  command:"npm run dev:catalog",
  url:"http://127.0.0.1:8009/playground/style-explorer/",
  reuseExistingServer:!process.env.CI,
  timeout:30000
 }
});
