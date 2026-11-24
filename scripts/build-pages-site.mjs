// Assembles a self-contained static site in _site/ for GitHub Pages live preview.
// Expects dist/component-gallery to be built with --base=./ beforehand.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, '_site');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const copyDirs = ['playground', 'styles', 'tokens', 'graphics', 'registry', 'docs/media'];
for (const dir of copyDirs) {
  const src = join(root, dir);
  if (existsSync(src)) {
    cpSync(src, join(out, dir), { recursive: true });
  }
}

const galleryDist = join(root, 'dist/component-gallery');
if (!existsSync(galleryDist)) {
  throw new Error('Missing dist/component-gallery. Run vite build --config playground/component-gallery/vite.config.ts --base=./ first.');
}
cpSync(galleryDist, join(out, 'component-gallery'), { recursive: true });

const assets = JSON.parse(readFileSync(join(root, 'registry/assets.json'), 'utf8'));
const components = JSON.parse(readFileSync(join(root, 'registry/components.json'), 'utf8'));
const styles = JSON.parse(readFileSync(join(root, 'registry/styles.json'), 'utf8'));
const templates = JSON.parse(readFileSync(join(root, 'registry/page-templates.json'), 'utf8'));

const showcaseCards = [
  {
    title: 'Theme Atlas · 14 Visual Styles',
    desc: 'Filter and compare 14 independent visual directions side-by-side with live demos and assembly handoffs.',
    href: './playground/style-atlas/',
    tag: 'Interactive Atlas'
  },
  {
    title: 'React Component Gallery · 48 Exports',
    desc: 'Explore 48 typed React/TSX reference components across four explicitly registered themes.',
    href: './component-gallery/',
    tag: 'React 19 · Vite'
  },
  {
    title: 'Spatial Composition Atoms (V0.64)',
    desc: 'Seeded composition, stepped DOM typography, curved media rail, inset-aware fit, and pinned ribbon controls.',
    href: './playground/spatial-composition-v064/',
    tag: 'Native ESM'
  },
  {
    title: 'Creative Editing Micro-Controls (V0.62)',
    desc: 'HSL color plane, gradient stop editor, dual-background alpha proof, cubic Bezier, and inset mask controls.',
    href: './playground/editing-controls-v062/',
    tag: 'Native ESM'
  },
  {
    title: 'Print & Pattern Lab (V0.61)',
    desc: 'Adjustable procedural line patterns and native illustrative vector specimens.',
    href: './playground/print-patterns-v061/',
    tag: 'Procedural SVG'
  },
  {
    title: 'Commerce Atelier · Storefront Reference',
    desc: 'Product-first retail layout with multi-facet filtering, sorting, variant quick-view, and simulated bag.',
    href: './playground/commerce-atelier/',
    tag: 'Style Demo'
  },
  {
    title: 'Trend Style Lab (2026 Directions)',
    desc: 'Interactive studies for Liquid Layer, Shape Expressive, Type-led Minimal, and Organic Tactile.',
    href: './playground/trend-style-lab/',
    tag: '4 Styles'
  },
  {
    title: 'Creative Style Lab (Expressive Worlds)',
    desc: 'Pixel Arcade, Signal Noir, Paper Rebellion, and Aether Orbit standalone scenes.',
    href: './playground/creative-style-lab/',
    tag: '4 Styles'
  },
  {
    title: 'Asset Explorer',
    desc: 'Browse registered assets, filter by lifecycle, reuse category, and inspect provenance metadata.',
    href: './playground/asset-explorer/',
    tag: 'Registry Browser'
  }
];

const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const cardsHtml = showcaseCards.map(c => `
      <a class="card" href="${esc(c.href)}">
        <span class="tag">${esc(c.tag)}</span>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.desc)}</p>
        <span class="cta">Open live preview →</span>
      </a>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Frontend Design Assets · Live Showcase</title>
  <meta name="description" content="Live interactive previews for Frontend Design Assets: 14 visual styles, 48 React reference components, and native web specimens.">
  <style>
    :root { color-scheme: dark; --bg: #0c1220; --surface: #141e30; --border: #25344f; --text: #eef3fb; --muted: #9eb0c9; --accent: #77d6bc; --accent2: #78b6f7; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: var(--bg); color: var(--text); line-height: 1.55; }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 36px 24px 64px; }
    header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
    .brand { font-weight: 700; letter-spacing: 0.04em; font-size: 15px; color: var(--accent); text-decoration: none; }
    nav { display: flex; gap: 16px; flex-wrap: wrap; }
    nav a { color: var(--muted); text-decoration: none; font-size: 14px; }
    nav a:hover { color: var(--text); }
    .hero { padding: 36px 0 28px; }
    .hero img { width: 100%; max-height: 280px; object-fit: cover; border-radius: 14px; border: 1px solid var(--border); display: block; margin-bottom: 24px; }
    h1 { margin: 0 0 10px; font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.02em; }
    .lead { margin: 0; color: var(--muted); max-width: 720px; font-size: 16px; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin: 28px 0 36px; }
    .stat { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
    .stat strong { display: block; font-size: 28px; color: var(--text); line-height: 1.15; }
    .stat span { font-size: 13px; color: var(--muted); }
    h2 { font-size: 20px; margin: 0 0 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .card { display: flex; flex-direction: column; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px; text-decoration: none; color: inherit; transition: border-color 140ms ease, transform 140ms ease; }
    .card:hover { border-color: var(--accent2); transform: translateY(-2px); }
    .card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .tag { align-self: flex-start; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 999px; background: #1e2d45; color: var(--accent); }
    .card h3 { margin: 4px 0 0; font-size: 17px; }
    .card p { margin: 0; font-size: 14px; color: var(--muted); flex: 1; }
    .cta { margin-top: 8px; font-size: 13px; font-weight: 600; color: var(--accent2); }
    footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--border); color: var(--muted); font-size: 13px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; }
    footer a { color: var(--accent2); text-decoration: none; }
    @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <a class="brand" href="./">◈ FRONTEND DESIGN ASSETS · LIVE PREVIEW</a>
      <nav aria-label="Primary">
        <a href="./playground/style-atlas/">Theme Atlas</a>
        <a href="./component-gallery/">React Gallery</a>
        <a href="./playground/asset-explorer/">Asset Explorer</a>
        <a href="https://github.com/mingqiangdu1-arch/frontend-design-assets">GitHub Repository</a>
      </nav>
    </header>
    <main>
      <section class="hero">
        <img src="./docs/media/cover.svg" alt="Frontend Design Assets visual identity cover">
        <h1>Design assets with direction.</h1>
        <p class="lead">Interactive browser previews for multi-style visual directions, React/TSX reference components, and standalone native web specimens. Reference implementations and research prototypes — inspect license and scope before adapting.</p>
        <div class="stats">
          <div class="stat"><strong>${assets.assets.length}</strong><span>Registered assets</span></div>
          <div class="stat"><strong>${components.entries.length}</strong><span>React exports</span></div>
          <div class="stat"><strong>${styles.styles.length}</strong><span>Visual styles</span></div>
          <div class="stat"><strong>${templates.templates.length}</strong><span>Page templates</span></div>
        </div>
      </section>
      <section aria-labelledby="labs-heading">
        <h2 id="labs-heading">Interactive Labs &amp; Reference Demos</h2>
        <div class="grid">${cardsHtml}
        </div>
      </section>
    </main>
    <footer>
      <span>MIT License for owner-authored original materials; third-party notices retained.</span>
      <a href="https://github.com/mingqiangdu1-arch/frontend-design-assets">View source &amp; documentation on GitHub</a>
    </footer>
  </div>
</body>
</html>
`;

writeFileSync(join(out, 'index.html'), html);
writeFileSync(join(out, '.nojekyll'), '');
console.log('Built GitHub Pages site in _site/ with', assets.assets.length, 'assets and', showcaseCards.length, 'preview cards.');
