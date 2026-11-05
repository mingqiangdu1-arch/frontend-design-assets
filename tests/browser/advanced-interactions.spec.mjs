import {test,expect} from '@playwright/test';
const base='/playground/advanced-interactions/';
test.beforeEach(async({page})=>{await page.goto(base);});
test('three advanced experiences are real, separate local interactions',async({page})=>{
 await expect(page.getByRole('heading',{name:'空间画布与批量选择'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'径向上下文操作'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'状态擦拭与连续对比'})).toBeVisible();
 await expect(page.locator('.world-node')).toHaveCount(4);
});
test('spatial selection, precise keyboard movement, undo redo and zoom anchor',async({page})=>{
 const picker=page.locator('#nodePicker');await picker.selectOption('N-02');
 await expect(page.locator('[data-node="N-02"]')).toHaveAttribute('aria-pressed','true');
 const before=await page.locator('[data-node="N-02"]').evaluate(e=>parseInt(e.style.left));
 await page.getByRole('button',{name:'节点右移'}).click();
 await expect.poll(()=>page.locator('[data-node="N-02"]').evaluate(e=>parseInt(e.style.left))).toBe(before+10);
 await page.getByRole('button',{name:'撤销移动'}).click();
 await expect.poll(()=>page.locator('[data-node="N-02"]').evaluate(e=>parseInt(e.style.left))).toBe(before);
 await page.getByRole('button',{name:'重做移动'}).click();
 await expect.poll(()=>page.locator('[data-node="N-02"]').evaluate(e=>parseInt(e.style.left))).toBe(before+10);
 const zoomBefore=await page.locator('#zoomValue').textContent();
 await page.getByRole('button',{name:'画布放大'}).click();
 await expect(page.locator('#zoomValue')).not.toHaveText(zoomBefore);
 await page.locator('#fitView').click();
 await expect(page.locator('#boardStatus')).toContainText('适配');
});
test('dragging visible spatial nodes commits edit and Undo restores position',async({page})=>{
 const node=page.locator('[data-node="N-01"]');
 const before=await node.evaluate(el=>parseInt(el.style.left));
 await node.scrollIntoViewIfNeeded();
 await expect(node).toBeInViewport();
 const r=await node.boundingBox();
 await page.mouse.move(r.x+r.width/2,r.y+r.height/2);
 await page.mouse.down();await page.mouse.move(r.x+r.width/2+45,r.y+r.height/2+20,{steps:6});await page.mouse.up();
 await expect.poll(()=>page.locator('[data-node="N-01"]').evaluate(el=>parseInt(el.style.left))).toBeGreaterThan(before);
 await page.locator('#undoMove').click();
 await expect.poll(()=>page.locator('[data-node="N-01"]').evaluate(el=>parseInt(el.style.left))).toBe(before);
});
test('radial menu works from explicit button, keyboard arrow and Escape restores focus',async({page})=>{
 const trigger=page.locator('#orbitTrigger');await trigger.click();
 await expect(page.locator('#orbitMenu')).toBeVisible();
 await expect(page.locator('[data-orbit="mark"]')).toBeFocused();
 await page.keyboard.press('ArrowRight');await expect(page.locator('[data-orbit="pin"]')).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#pinnedValue')).toHaveText('已置顶');
 await expect(trigger).toBeFocused();
 await trigger.click();await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
 await expect(page.locator('#orbitMenu')).toBeHidden();
});
test('context menu opens with keyboard Shift+F10 on target and allows reset',async({page})=>{
 const target=page.locator('#orbitTarget');await target.focus();await page.keyboard.press('Shift+F10');
 await expect(page.locator('#orbitMenu')).toBeVisible();
 await page.getByRole('menuitem',{name:'标记'}).click();await expect(page.locator('#markedValue')).toHaveText('已标记');
 await target.focus();await page.keyboard.press('Shift+F10');await page.getByRole('menuitem',{name:'重置'}).click();
 await expect(page.locator('#markedValue')).toHaveText('未标记');await expect(target).toBeFocused();
});
test('continuous compare offers keyboard slider, pointer and three deterministic presets',async({page})=>{
 const slider=page.getByRole('slider',{name:/状态对比/});
 await expect(slider).toHaveValue('50');await slider.focus();await page.keyboard.press('ArrowRight');
 await expect(slider).toHaveValue('55');await expect(page.locator('#compareValue')).toHaveText('优化后 55%');
 await page.getByRole('button',{name:'仅原稿'}).click();await expect(slider).toHaveValue('0');
 await page.getByRole('button',{name:'仅优化后'}).click();await expect(slider).toHaveValue('100');
 await page.getByRole('button',{name:'对半比较'}).click();await expect(slider).toHaveValue('50');
 const r=await slider.boundingBox();await page.mouse.click(r.x+r.width*.75,r.y+r.height/2);
 await expect.poll(()=>slider.inputValue()).not.toBe('50');
});
test('390, 768, 1440 viewports avoid horizontal overflow and preserve action state',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:850});
  const dim=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(dim.scroll,'width '+width).toBeLessThanOrEqual(dim.client+1);
  await expect.poll(()=>page.locator('[data-node="N-01"]').evaluate(node=>{
   const n=node.getBoundingClientRect(),v=document.getElementById('spatialViewport').getBoundingClientRect();
   return n.left>=v.left-1&&n.right<=v.right+1&&n.top>=v.top-1&&n.bottom<=v.bottom+1;
  }),{message:'first canvas node remains fully visible after resize to '+width}).toBe(true);
  await page.screenshot({path:'test-results/advanced-interactions-'+width+'.png',fullPage:true,animations:'disabled'});
 }
});
