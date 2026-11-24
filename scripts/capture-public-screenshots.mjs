// Captures clean 1280x800 viewport screenshots of key demos for public docs.
// Requires Chromium installed via `npx playwright install chromium`.
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { createStaticServer } from './dev-static.mjs';

const root = process.cwd();
const outDir = join(root, 'docs/media/screenshots');
mkdirSync(outDir, { recursive: true });

const staticPort = 8019;
const galleryPort = 5174;

function startViteGallery() {
  const viteBin = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
  return spawn(
    viteBin,
    ['--config', 'playground/component-gallery/vite.config.ts', '--host', '127.0.0.1', '--port', String(galleryPort), '--strictPort'],
    { cwd: root, stdio: 'ignore', detached: process.platform !== 'win32' }
  );
}

function stopProcess(proc) {
  if (!proc || proc.killed) return;
  try {
    if (process.platform !== 'win32' && proc.pid) process.kill(-proc.pid, 'SIGKILL');
    else proc.kill('SIGKILL');
  } catch {
    try { proc.kill('SIGKILL'); } catch {}
  }
}

async function waitForUrl(url, timeoutMs = 25000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { headers: { connection: 'close' } });
      if (res.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('Timed out waiting for ' + url);
}

const staticServer = createStaticServer();
await new Promise((resolve, reject) => {
  staticServer.once('error', reject);
  staticServer.listen(staticPort, '127.0.0.1', resolve);
});

const viteProc = startViteGallery();
let exitCode = 0;
try {
  console.log('Waiting for static server and Vite gallery...');
  await waitForUrl(`http://127.0.0.1:${staticPort}/playground/style-atlas/`);
  await waitForUrl(`http://127.0.0.1:${galleryPort}/`);
  console.log('Servers ready. Launching Chromium...');

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();

    const staticTargets = [
      {
        file: 'style-atlas-1280x800.png',
        url: `http://127.0.0.1:${staticPort}/playground/style-atlas/`,
        ready: async p => { await p.waitForSelector('#cardGrid article, #cardGrid .style-card', { timeout: 8000 }).catch(() => {}); }
      },
      {
        file: 'spatial-composition-1280x800.png',
        url: `http://127.0.0.1:${staticPort}/playground/spatial-composition-v064/`
      },
      {
        file: 'editing-controls-1280x800.png',
        url: `http://127.0.0.1:${staticPort}/playground/editing-controls-v062/`
      },
      {
        file: 'commerce-atelier-1280x800.png',
        url: `http://127.0.0.1:${staticPort}/playground/commerce-atelier/`
      }
    ];

    for (const target of staticTargets) {
      console.log('Navigating to', target.url);
      await page.goto(target.url, { waitUntil: 'load', timeout: 15000 });
      if (target.ready) await target.ready(page);
      await page.waitForTimeout(350);
      await page.screenshot({ path: join(outDir, target.file), fullPage: false });
      console.log('Captured', target.file);
    }

    // React Component Gallery: Light & Dark themes
    console.log('Navigating to React Component Gallery...');
    await page.goto(`http://127.0.0.1:${galleryPort}/`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForSelector('[data-theme-button="refined-light-saas"]', { timeout: 10000 });
    await page.waitForTimeout(350);
    await page.screenshot({ path: join(outDir, 'component-gallery-light-1280x800.png'), fullPage: false });
    console.log('Captured component-gallery-light-1280x800.png');

    await page.locator('[data-theme-button="precision-dark"]').click();
    await page.waitForTimeout(350);
    await page.screenshot({ path: join(outDir, 'component-gallery-dark-1280x800.png'), fullPage: false });
    console.log('Captured component-gallery-dark-1280x800.png');
  } finally {
    await browser.close();
  }
} catch (err) {
  console.error(err);
  exitCode = 1;
} finally {
  stopProcess(viteProc);
  staticServer.closeAllConnections?.();
  staticServer.close();
  process.exit(exitCode);
}
