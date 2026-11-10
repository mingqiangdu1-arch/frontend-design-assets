import {test,expect} from "@playwright/test";
import fs from "node:fs";
const manifest=JSON.parse(fs.readFileSync("registry/state-specimens-v035.json","utf8"));

test("each V0.35 standalone SVG is parseable, renders static desktop/mobile concepts, and makes no external requests",async({page})=>{
 for(const entry of manifest.specimens){
  const requests=[];
  const track=request=>{if(!request.url().startsWith("http://127.0.0.1:8009/"))requests.push(request.url());};
  page.on("request",track);
  const response=await page.goto("/"+entry.svg);
  expect(response?.status(),entry.assetId).toBe(200);
  expect(response?.headers()["content-type"],entry.assetId).toContain("image/svg+xml");
  const result=await page.evaluate(()=>{
   const svg=document.documentElement;
   const box=svg.getBBox();
   return {namespace:svg.namespaceURI,width:box.width,height:box.height,rectangles:svg.querySelectorAll("rect").length,
     title:svg.querySelector("title")?.textContent||"",desc:svg.querySelector("desc")?.textContent||"",
     labels:svg.textContent||"",scripts:svg.querySelectorAll("script,foreignObject,image").length};
  });
  expect(result.namespace,entry.assetId).toBe("http://www.w3.org/2000/svg");
  expect(result.width,entry.assetId).toBeGreaterThan(800);
  expect(result.height,entry.assetId).toBeGreaterThan(350);
  expect(result.rectangles,entry.assetId).toBeGreaterThan(5);
  expect(result.title,entry.assetId).toContain(entry.assetId);
  expect(result.desc,entry.assetId).toContain("not browser screenshots");
  expect(result.labels,entry.assetId).toContain("DESKTOP LAYOUT CONCEPT");
  expect(result.labels,entry.assetId).toContain("MOBILE LAYOUT CONCEPT");
  expect(result.scripts,entry.assetId).toBe(0);
  expect(requests,entry.assetId).toEqual([]);
  page.off("request",track);
 }
});
