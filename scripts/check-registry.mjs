import fs from "node:fs";
import path from "node:path";
import {experienceRegistry,validateExperienceRegistry} from "./experience-compositions.mjs";
import {validateStyleFacets} from "./check-style-facets.mjs";
import {validateStyleAssembly} from "./style-assembly.mjs";

const root = process.cwd();
const readJson = filepath => JSON.parse(fs.readFileSync(filepath, "utf8"));
const registry = readJson("registry/assets.json");
const styles = readJson("registry/styles.json");

function fail(message) { throw new Error(message); }
function assertFile(filepath, context) {
  if (typeof filepath !== "string" || !fs.existsSync(path.join(root,filepath))) {
    fail(context + " missing file: " + filepath);
  }
}
if (styles.defaultStyleId !== null) fail("There must be no repository-wide default style");
const styleIds = new Set();
for (const style of styles.styles) {
  if (!style.id || styleIds.has(style.id)) fail("Duplicate/missing style ID: " + style.id);
  styleIds.add(style.id);
  for (const key of ["styleProfile", "documentation", "demo"]) {
    if (style[key]) assertFile(style[key], style.id + "." + key);
  }
  for (const p of Object.values(style.tokens || {})) assertFile(p, style.id + ".tokens");
}
const stages = new Set(registry.stageDefinitions);
const reuseKinds = new Set(["design-reference","behavior-pattern","motion-reference","style-token","styled-implementation","composition-recipe","snapshot"]);
const policies = registry.reusePolicies;
if (!policies || registry.reusePolicyVersion !== "1.0") fail("Missing versioned asset handoff policies");
const modes = new Set(["copyable-source","adapt-required","research-only"]);
for (const kind of reuseKinds) {
 const policy = policies[kind];
 if (!policy || !modes.has(policy.mode) || typeof policy.guidance !== "string" || !policy.guidance.trim()) {
  fail("Incomplete handoff policy for reuse kind: " + kind);
 }
}
const assetIds = new Set();
for (const asset of registry.assets) {
  if (!/^([A-Z]{2,4})-\d{3}$/.test(asset.id)) fail("Bad asset ID: " + asset.id);
  if (assetIds.has(asset.id)) fail("Duplicate asset ID: " + asset.id);
  assetIds.add(asset.id);
  if (!stages.has(asset.stage)) fail("Invalid lifecycle stage: " + asset.id);
  if (!reuseKinds.has(asset.reuseKind)) fail("Invalid reuse kind: " + asset.id);
  if (!Array.isArray(asset.styleIds) || !Array.isArray(asset.applicationContexts)) fail("Applicability missing: " + asset.id);
  for (const id of asset.styleIds) if (!styleIds.has(id)) fail(asset.id + " has unknown style: " + id);
  if (asset.aliases && (!Array.isArray(asset.aliases) || asset.aliases.some(a=>typeof a!=="string"||!a.trim()))) fail(asset.id+" invalid search aliases");
  if (asset.handoff) {
    if (typeof asset.handoff.entry!=="string" || !asset.handoff.entry.trim()) fail(asset.id+" handoff entry missing");
    assertFile(asset.handoff.entry, asset.id + ".handoff.entry");
    for (const key of ["stack","instructions","limitations"]) {
      if (typeof asset.handoff[key]!=="string" || !asset.handoff[key].trim()) fail(asset.id+" handoff "+key+" missing");
    }
  }
  if (asset.demoStyleId && !styleIds.has(asset.demoStyleId)) fail(asset.id + " has unknown demo style");
  if (["style-token","styled-implementation"].includes(asset.reuseKind) && !asset.styleIds.length) fail(asset.id + " must bind explicit styles");
  for (const key of ["path","spec","details","demo"]) {
    if (asset[key]) assertFile(asset[key], asset.id + "." + key);
  }
}
for (const asset of registry.assets) {
  for (const id of asset.dependencies || []) {
    if (!assetIds.has(id)) fail(asset.id + " has unknown dependency: " + id);
  }
}
const experienceSummary=validateExperienceRegistry(experienceRegistry,registry.assets);
const applicationFiles = ["applications/examples/ai-workflow-platform.json"];
for (const file of applicationFiles) {
  assertFile(file,"application profile");
  const profile = readJson(file);
  if (!Array.isArray(profile.selectedStyleIds)) fail(file + " missing selectedStyleIds");
  for (const id of profile.selectedStyleIds) if (!styleIds.has(id)) fail(file + " unknown style " + id);
  for (const id of profile.candidateAssetIds || []) if (!assetIds.has(id)) fail(file + " unknown asset " + id);
}
const css = fs.readFileSync("tokens/refined-light.css", "utf8");
if (!css.includes('[data-design-theme="refined-light-saas"]')) fail("Scoped design theme selector missing");
if (/(^|\n)\s*:root\s*\{/.test(css)) fail("Theme CSS must not set global root variables");

const themeFacets = readJson("registry/style-facets.json");
const facetResult = validateStyleFacets(styles,themeFacets,readJson("registry/components.json"),registry,root);
const assemblySummary = validateStyleAssembly({
 styles,facets:themeFacets,assembly:readJson("registry/style-assembly.json"),
 components:readJson("registry/components.json"),
 templates:readJson("registry/page-templates.json"),
 experiences:readJson("registry/experience-compositions.json"),assets:registry
});
console.log("Validated style-to-page grammars: "+assemblySummary.styles+" themes / "+assemblySummary.sections+" page sections.");
console.log("Validated theme atlas facets: "+facetResult.styles+" themes, "+facetResult.reactCompatible+" explicit React themes.");
console.log("Validated " + registry.assets.length + " assets, " + styleIds.size + " style profiles, " + applicationFiles.length + " application profiles, " + experienceSummary.recipes + " experience recipes.");
