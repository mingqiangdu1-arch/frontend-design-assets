// Generates a deterministic SVG snapshot from the canonical registries.
// Run from any directory: node scripts/generate-public-overview.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const root = new URL('../', import.meta.url);
const load = name => JSON.parse(readFileSync(new URL('registry/'+name+'.json', root), 'utf8'));
const { assets, updatedAt } = load('assets');
const { entries } = load('components');
const { styles } = load('styles');
const { templates } = load('page-templates');
const count = (key, value) => assets.filter(a => a[key] === value).length;
const types = ['component','reference','interaction','recipe','archive','token','page-template','motion'];
const stages = ['reference-implemented','analyzed','prototype','captured','validated','production-ready','deprecated'];
const esc = x => String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const t = (x,y,s,size=16,fill='#d2dbea',weight=400) => '<text x="'+x+'" y="'+y+'" font-family="system-ui,Segoe UI,Arial,sans-serif" font-size="'+size+'" fill="'+fill+'" font-weight="'+weight+'">'+esc(s)+'</text>';
const rect = (x,y,w,h,fill,rx=6) => '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+fill+'"/>';
const rows = (keys,field,x,y,width,color) => keys.map((key,i) => {
 const n=count(field,key), yy=y+i*30, w=width*n/Math.max(1,...keys.map(k=>count(field,k)));
 return t(x,yy+13,key,14)+rect(x+192,yy,width,16,'#263347',4)+rect(x+192,yy,w,16,color,4)+t(x+202+width,yy+13,n,14,'#e8effb',600);
}).join('');
const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" role="img" aria-labelledby="title desc"><title id="title">Frontend Design Assets inventory</title><desc id="desc">'+esc(assets.length+' registered entries; '+entries.length+' React exports; '+styles.length+' styles; '+templates.length+' templates. Types and lifecycle stages count registry entries, not production-certified components.')+'</desc>'+rect(0,0,960,600,'#101827',18)+t(32,43,'FRONTEND DESIGN ASSETS / INVENTORY',14,'#8de5ca',700)+t(32,76,'A living design reference library',25,'#f3f6fb',700)+[[assets.length,'Registered assets'],[entries.length,'React exports'],[styles.length,'Visual styles'],[templates.length,'Page templates']].map(([n,label],i)=>{const x=32+i*229;return rect(x,100,210,99,'#1c293c',12)+t(x+15,143,n,34,'#f3f6fb',700)+t(x+15,174,label,14);}).join('')+t(32,243,'Asset types',19,'#f3f6fb',700)+t(490,243,'Lifecycle stages',19,'#f3f6fb',700)+rows(types,'type',32,263,190,'#78b6f7')+rows(stages,'stage',490,263,190,'#77d6bc')+t(32,538,'Counts are registry entries, not deployable UI components. React exports are a separate index.',14,'#a4b4ca')+t(32,565,'Registry snapshot: '+updatedAt+'  |  Source: registry/*.json',13,'#a4b4ca')+'</svg>\n';
const output = new URL('docs/media/inventory.svg', root);
mkdirSync(dirname(fileURLToPath(output)), { recursive:true });
writeFileSync(output, svg);
