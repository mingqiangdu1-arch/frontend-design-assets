import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const registry = JSON.parse(fs.readFileSync("registry/assets.json", "utf8"));
const ids = new Set();
const okStages = new Set(registry.stageDefinitions);
const missing = [];
for (const asset of registry.assets) {
  if (!/^([A-Z]{2,4})-\d{3}$/.test(asset.id)) throw Error("Bad ID: " + asset.id);
  if (ids.has(asset.id)) throw Error("Duplicate ID: " + asset.id);
  ids.add(asset.id);
  if (!okStages.has(asset.stage)) throw Error("Invalid stage: " + asset.id);
  for (const key of ["path","spec","details","demo"]) {
    if (asset[key] && !fs.existsSync(path.join(root,asset[key]))) missing.push(asset.id + " => " + asset[key]);
  }
}
for (const asset of registry.assets) {
  for (const id of asset.dependencies||[]) if (!ids.has(id)) throw Error(asset.id + " unknown dependency " + id);
}
if (missing.length) throw Error("Missing source paths:\n" + missing.join("\n"));
console.log("Checked " + registry.assets.length + " assets; stable IDs, dependencies and paths OK.");
