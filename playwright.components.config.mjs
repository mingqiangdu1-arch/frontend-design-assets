import {defineConfig,devices} from "@playwright/test";
export default defineConfig({
 testDir:"./tests/browser",testMatch:"component-gallery.spec.mjs",
 timeout:30000,expect:{timeout:7000},retries:process.env.CI?1:0,
 workers:process.env.CI?1:undefined,
 reporter:"list",
 use:{baseURL:"http://127.0.0.1:5174",trace:"retain-on-failure",screenshot:"only-on-failure"},
 projects:[{name:"chromium",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:900}}}],
 webServer:{command:"npm run dev:components -- --host 127.0.0.1 --port 5174",
  url:"http://127.0.0.1:5174/",reuseExistingServer:!process.env.CI,timeout:45000}
});
