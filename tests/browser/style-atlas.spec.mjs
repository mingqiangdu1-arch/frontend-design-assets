import {test,expect} from "@playwright/test";
const base="/playground/style-atlas/";
test.beforeEach(async({page})=>{
 await page.goto(base);
 await expect(page.locator("#resultCount")).toContainText("显示 14 / 14 套主题");
});

test("first view has fourteen registered grammar thumbnails and no preselected default",async({page})=>{
 await expect(page.locator(".theme-card")).toHaveCount(14);
 await expect(page.locator(".mini-visual")).toHaveCount(14);
 await expect(page.locator("#styleCount")).toHaveText("14");
 await expect(page.locator("#compareLeft")).toHaveValue("");
 await expect(page.locator("#compareRight")).toHaveValue("");
 await expect(page.locator("#recommendations")).toContainText("没有默认主题");
 await expect(page.locator("#leftPane iframe")).toHaveCount(0);
 await expect(page.locator("#rightPane iframe")).toHaveCount(0);
});

test("filters by context, structural layout, material and explicit React compatibility",async({page})=>{
 await page.locator("#context").selectOption("consumer-mobile");
 await expect(page.locator(".theme-card")).toHaveCount(2);
 await expect(page.locator('[data-theme-id="playful-pop"]')).toBeVisible();
 await expect(page.locator('[data-theme-id="shape-expressive"]')).toBeVisible();
 await expect(page.locator("#recommendations")).toContainText("场景匹配");
 await page.locator("#clearFilters").click();
 await page.locator("#material").selectOption("glass");
 await expect(page.locator(".theme-card")).toHaveCount(1);
 await expect(page.locator('[data-theme-id="liquid-layer"]')).toBeVisible();
 await page.locator("#clearFilters").click();
 await page.locator("#stack").selectOption("react");
 await expect(page.locator(".theme-card")).toHaveCount(4);
 await expect(page.locator('[data-theme-id="organic-tactile"]')).toHaveCount(0);
});

test("Chinese task retrieval shows a grounded matching candidate without automatic selection",async({page})=>{
 await page.locator("#search").fill("我需要一个液态玻璃导航区域");
 await expect(page.locator(".theme-card")).toHaveCount(1);
 await expect(page.locator("#recommendations")).toContainText("Liquid Layer");
 await expect(page.locator("#recommendations")).toContainText("液态玻璃");
 await expect(page.locator("#compareLeft")).toHaveValue("");
 await page.locator("#recommendations button").first().click();
 await expect(page.locator("#compareLeft")).toHaveValue("liquid-layer");
});

test("explicit incompatible stack/context combination fails closed without SaaS fallback",async({page})=>{
 await page.locator("#context").selectOption("media-gallery");
 await page.locator("#stack").selectOption("react");
 await expect(page.locator(".theme-card")).toHaveCount(0);
 await expect(page.locator("#emptyResult")).toBeVisible();
 await expect(page.locator("#recommendations")).toContainText("没有可靠候选");
 await expect(page.locator("#compareLeft")).toHaveValue("");
});

test("two selected themes load their actual independent demo pages with accurate deep links",async({page})=>{
 await page.goto(base+"?left=editorial-warm&right=liquid-layer");
 await expect(page.locator("#resultCount")).toContainText("显示 14 / 14 套主题");
 await expect(page.locator("#compareLeft")).toHaveValue("editorial-warm");
 await expect(page.locator("#compareRight")).toHaveValue("liquid-layer");
 const section=page.locator("#compare");
 await section.scrollIntoViewIfNeeded();
 const left=page.locator("#leftPane iframe"),right=page.locator("#rightPane iframe");
 await expect(left).toHaveAttribute("src",/style-explorer\/index\.html\?style=editorial-warm/);
 await expect(right).toHaveAttribute("src",/trend-style-lab\/index\.html\?style=liquid-layer/);
 await expect(page.frameLocator("#leftPane iframe").locator("#editorial-warm")).toBeVisible();
 await expect(page.frameLocator("#rightPane iframe").locator('[data-scene="liquid-layer"]')).toBeVisible();
 await expect(page.locator("#copyHandoff")).toBeEnabled();
 await expect(page.locator("#leftPane .pane-details")).toContainText("React");
 await expect(page.locator("#rightPane .pane-details")).toContainText("需适配");
});

test("pair swap changes URL and selected demo source; identical pair cannot silently replace another",async({page})=>{
 await page.locator("#compareLeft").selectOption("pixel-arcade");
 await page.locator("#compareRight").selectOption("organic-tactile");
 await expect(page).toHaveURL(/left=pixel-arcade/);
 await expect(page).toHaveURL(/right=organic-tactile/);
 await page.locator("#swap").click();
 await expect(page.locator("#compareLeft")).toHaveValue("organic-tactile");
 await expect(page.locator("#compareRight")).toHaveValue("pixel-arcade");
 await expect(page.locator("#leftPane iframe")).toHaveAttribute("src",/style=organic-tactile/);
 await expect(page.locator("#rightPane iframe")).toHaveAttribute("src",/style=pixel-arcade/);
 await page.locator("#compareRight").selectOption("organic-tactile");
 await expect(page.locator("#compareRight")).toHaveValue("pixel-arcade");
});

test("keyboard button selection can choose a theme without mutating other cards",async({page})=>{
 const button=page.locator('[data-theme-id="neo-brutalist"] button').first();
 await button.focus();await button.press("Enter");
 await expect(button).toHaveAttribute("aria-pressed","true");
 await expect(page.locator("#compareLeft")).toHaveValue("neo-brutalist");
 await expect(page.locator("#compareRight")).toHaveValue("");
});

test("atlas grid and compare work across 390/768/1440 without horizontal overflow",async({page})=>{
 await page.locator("#compareLeft").selectOption("precision-dark");
 await page.locator("#compareRight").selectOption("type-led-minimal");
 await page.emulateMedia({reducedMotion:"reduce"});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:860});
  const dims=await page.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]);
  expect(dims[0],width+"px atlas document").toBeLessThanOrEqual(dims[1]+1);
  await expect(page.locator(".theme-card").first()).toBeVisible();
  if(width===390||width===1440)await page.screenshot({
   path:"test-results/style-atlas-"+width+".png",fullPage:true,animations:"disabled"
  });
 }
});

test("style explorer deep-link selects editorial/playful source scene while preserving old default",async({page})=>{
 await page.goto("/playground/style-explorer/?style=editorial-warm");
 await expect(page.locator("#editorial-warm")).toBeVisible();
 await expect(page.locator("#precision-dark")).toBeHidden();
 await page.locator('[data-style="playful-pop"]').click();
 await expect(page).toHaveURL(/style=playful-pop/);
 await expect(page.locator("#playful-pop")).toBeVisible();
 await page.goBack();
 await expect(page.locator("#editorial-warm")).toBeVisible();
 await page.goto("/playground/style-explorer/");
 await expect(page.locator("#precision-dark")).toBeVisible();
});
