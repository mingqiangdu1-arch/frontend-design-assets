import {defineConfig,devices} from "@playwright/test";
export default defineConfig({
 testDir:"tests/browser",testMatch:"editorial-review.spec.mjs",
 timeout:30000,expect:{timeout:7000},retries:process.env.CI?1:0,workers:process.env.CI?1:undefined,reporter:"list",
 use:{baseURL:"http://127.0.0.1:5176",trace:"retain-on-failure",screenshot:"only-on-failure"},
 projects:[{name:"chromium",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:900}}}],
 webServer:{command:"npm run dev:editorial-react -- --host 127.0.0.1 --port 5176",
 url:"http://127.0.0.1:5176/",reuseExistingServer:!process.env.CI,timeout:45000}
});
