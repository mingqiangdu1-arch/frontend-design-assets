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
    if (asset.handoff.mode !== undefined && asset.handoff.mode !== "research-only") fail(asset.id+" invalid restrictive handoff mode");
    if (typeof asset.handoff.entry!=="string" || !asset.handoff.entry.trim()) fail(asset.id+" handoff entry missing");
    assertFile(asset.handoff.entry, asset.id + ".handoff.entry");
    for (const key of ["stack","instructions","limitations"]) {
      if (typeof asset.handoff[key]!=="string" || !asset.handoff[key].trim()) fail(asset.id+" handoff "+key+" missing");
    }
  }
  if (asset.demoStyleId && !styleIds.has(asset.demoStyleId)) fail(asset.id + " has unknown demo style");
  if (["style-token","styled-implementation"].includes(asset.reuseKind) && !asset.styleIds.length) fail(asset.id + " must bind explicit styles");
  for (const key of ["path","spec","details","demo","visualSpecimen"]) {
    if (asset[key]) assertFile(asset[key], asset.id + "." + key);
  }
}
for (const asset of registry.assets) {
  for (const id of asset.dependencies || []) {
    if (!assetIds.has(id)) fail(asset.id + " has unknown dependency: " + id);
  }
}
// Research catalogs are original briefs/upstream links, never auto-installed UI packages.
const assetById = new Map(registry.assets.map(asset => [asset.id, asset]));
const upstreamSources = readJson("registry/specialized-resources-v030.json");
const specializedPatterns = readJson("registry/specialized-patterns-v031.json");
if (!Array.isArray(upstreamSources.entries) || !Array.isArray(specializedPatterns.entries)) fail("Specialized research entries missing");
const sourceIds = new Set(), patternIds = new Set();
for (const item of upstreamSources.entries) {
  if (sourceIds.has(item.id)) fail("Duplicate V0.30 source: "+item.id);
  sourceIds.add(item.id);
  const asset = assetById.get(item.id);
  if (!asset || asset.type !== "reference" || asset.stage !== "analyzed" ||
      asset.reuseKind !== "design-reference" || asset.source !== item.source ||
      item.adoption !== "research-only" || !item.license || !item.limitations) {
    fail("Specialized source metadata mismatched: "+item.id);
  }
}
for (const item of specializedPatterns.entries) {
  if (patternIds.has(item.id)) fail("Duplicate V0.31 pattern: "+item.id);
  patternIds.add(item.id);
  const asset = assetById.get(item.id);
  const expectedKind = item.category === "mobile-touch" ? "behavior-pattern" : "design-reference";
  const expectedType = item.category === "mobile-touch" ? "interaction" : "reference";
  if (!asset || asset.type !== expectedType || asset.reuseKind !== expectedKind ||
      asset.stage !== "analyzed" || item.adoption !== "research-only" ||
      asset.source !== item.primarySource || asset.spec !== "registry/specialized-patterns-v031.json" ||
      !Array.isArray(item.aliases) || !item.aliases.length ||
      !Array.isArray(item.applicationContexts) || !item.applicationContexts.length ||
      !item.composition || !item.stateContract || !item.fallback || !item.risks ||
      !Array.isArray(item.relatedAssets) || !item.relatedAssets.length ||
      item.relatedAssets.some(id => !assetIds.has(id))) {
    fail("Specialized pattern metadata mismatched: "+item.id);
  }
}
console.log("Validated specialized catalogs: "+sourceIds.size+" upstream references, "+patternIds.size+" original research contracts.");

// V0.36: source watchlist and behavior contracts are reference-only, not runnable assets.
const community = readJson("registry/community-sources-v036.json");
if (community.schemaVersion !== "1.0" || community.status !== "research-only" ||
    !Array.isArray(community.sources) || community.sources.length !== 12 ||
    !Array.isArray(community.patterns) || community.patterns.length !== 4) fail("Invalid V0.36 source watchlist");
const communityIds = new Set();
for (const entry of [...community.sources, ...community.patterns]) {
  if (communityIds.has(entry.id)) fail("Duplicate V0.36 ID: "+entry.id);
  communityIds.add(entry.id);
  const asset=assetById.get(entry.id);
  const pattern=community.patterns.includes(entry);
  if (!asset || asset.type !== (pattern?"interaction":"reference") ||
      asset.reuseKind !== (pattern?"behavior-pattern":"design-reference") ||
      asset.source !== entry.source || asset.stage !== "analyzed" ||
      asset.handoff?.mode !== "research-only" ||
      asset.spec !== "registry/community-sources-v036.json" ||
      entry.adoption !== "research-only" || !entry.source.startsWith("https://") ||
      !Array.isArray(entry.relatedAssets) || !entry.relatedAssets.length ||
      entry.relatedAssets.some(id=>!assetIds.has(id))) fail("V0.36 mismatched/unverified entry: "+entry.id);
  if (!pattern && (entry.redistributableCodeVerified !== false ||
      entry.previewMediaRightsVerified !== false || !entry.licenseScope ||
      !entry.rightsBoundary || !entry.distinctFrom || !entry.collectionMethod ||
      !Array.isArray(entry.sampleDirections) || !entry.sampleDirections.length)) {
    fail("V0.36 source rights or provenance incomplete: "+entry.id);
  }
  if (pattern && (!entry.designContract || !entry.stateContract || !entry.accessibleFallback || !entry.failureModes || !entry.distinctFrom || entry.implementation !== "research-brief-only")) {
    fail("V0.36 pattern lacks state/fallback/safety: "+entry.id);
  }
}
if (!Array.isArray(community.curatedCases) || community.curatedCases.length !== 7) fail("Missing V0.36 concrete case studies");
const caseKeys = new Set();
for (const sample of community.curatedCases) {
  if (caseKeys.has(sample.key) || !communityIds.has(sample.sourceId) ||
      !sample.evidenceUrl?.startsWith("https://") || !sample.visibleEvidence ||
      !sample.study || !sample.rights || !sample.reviewState ||
      !Array.isArray(sample.distinctFrom) ||
      sample.distinctFrom.some(id=>!assetIds.has(id))) fail("Unverifiable V0.36 sample "+sample.key);
  caseKeys.add(sample.key);
}
assertFile("docs/research/community-sources-v036.md","V0.36 research report");
console.log("Validated V0.36: 12 upstream source dossiers + 4 original research patterns, no promoted components.");

// V0.40: original allowlisted metadata and slot reference models only.
const slotModels=readJson("registry/registry-slots-v040.json");
if(slotModels.schemaVersion!=="1.0"||slotModels.status!=="prototype-only"||
   slotModels.reactExportsAdded!==0||slotModels.thirdPartyCodeImported!==false||
   !Array.isArray(slotModels.entries)||slotModels.entries.length!==3)fail("V0.40 registry contract invalid");
const v040Ids=new Set();
for(const item of slotModels.entries){
 if(v040Ids.has(item.id))fail("V0.40 duplicate entry "+item.id);v040Ids.add(item.id);
 const asset=assetById.get(item.id);
 if(!asset||asset.type!=="interaction"||asset.stage!=="prototype"||
    asset.reuseKind!=="behavior-pattern"||asset.handoff?.mode==="research-only"||
    asset.path!==item.source||asset.demo!==item.demo||
    asset.spec!=="registry/registry-slots-v040.json"||
    item.stage!=="prototype"||item.reuse!=="adapt-required"||
    item.license!=="original-code"||item.sourceIncludesThirdPartyCode!==false||
    !Array.isArray(item.exports)||item.exports.length<3||
    !item.dependencies.every(id=>assetIds.has(id)||v040Ids.has(id)))fail("V0.40 model registration mismatch "+item.id);
 for(const f of [item.source,item.demo,item.unitTest,item.browserTest])assertFile(f,"V0.40 "+item.id);
 const source=fs.readFileSync(item.source,"utf8");
 for(const fn of item.exports)if(!source.includes("export function "+fn+"("))fail("V0.40 missing function "+item.id+"/"+fn);
}
for(const f of slotModels.files)assertFile(f,"V0.40 manifest path");
const style40=fs.readFileSync("playground/registry-slots-v040/styles.css","utf8");
if(/(?:^|\n)\s*:root\s*\{|@import\b|url\s*\(/i.test(style40)||
   !style40.includes("prefers-reduced-motion")||!style40.includes("forced-colors"))fail("V0.40 isolated CSS contract violated");
console.log("Validated V0.40: 3 source-pinned original reference models and focused tests.");

// V0.39: independently executable visual editor reference models, not page builder exports.
const visualModels=readJson("registry/visual-editor-v039.json");
if(visualModels.schemaVersion!=="1.0"||visualModels.status!=="prototype-only"||
   visualModels.reactExportsAdded!==0||visualModels.thirdPartyCodeImported!==false||
   !Array.isArray(visualModels.entries)||visualModels.entries.length!==3)fail("V0.39 registry invalid");
const v039Ids=new Set();
for(const item of visualModels.entries){
 if(v039Ids.has(item.id))fail("Duplicate V0.39 id "+item.id);v039Ids.add(item.id);
 const asset=assetById.get(item.id);
 if(!asset||asset.type!=="interaction"||asset.stage!=="prototype"||
    asset.reuseKind!=="behavior-pattern"||asset.handoff?.mode==="research-only"||
    asset.path!==item.source||asset.demo!==item.demo||
    asset.spec!=="registry/visual-editor-v039.json"||
    item.stage!=="prototype"||item.reuse!=="adapt-required"||
    item.license!=="original-code"||item.sourceIncludesThirdPartyCode!==false||
    !Array.isArray(item.exports)||item.exports.length<2||
    !item.dependencies.every(id=>assetIds.has(id)||v039Ids.has(id)))fail("V0.39 asset mismatch: "+item.id);
 for(const f of [item.source,item.demo,item.unitTest,item.browserTest])assertFile(f,"V0.39 "+item.id);
 const code=fs.readFileSync(item.source,"utf8");
 for(const fn of item.exports)if(!code.includes("export function "+fn+"("))fail("Missing V0.39 function "+item.id+"/"+fn);
}
for(const f of visualModels.files)assertFile(f,"V0.39 file");
const css039=fs.readFileSync("playground/visual-editor-v039/styles.css","utf8");
if(/(?:^|\n)\s*:root\s*\{|@import\b|url\s*\(/i.test(css039)||
   !css039.includes("prefers-reduced-motion")||!css039.includes("forced-colors"))fail("V0.39 CSS scope/fallback");
console.log("Validated V0.39: 3 original visual editor models with isolated demo and tests.");

// V0.38: original standalone model specimens, not installed components or backend permissions.
const agentPrototypes=readJson("registry/agent-interactions-v038.json");
if (agentPrototypes.schemaVersion!=="1.0"||agentPrototypes.status!=="prototype-only"||
    agentPrototypes.reactExportsAdded!==0||agentPrototypes.thirdPartyCodeImported!==false||
    !Array.isArray(agentPrototypes.entries)||agentPrototypes.entries.length!==3) fail("V0.38 prototype registry invalid");
const v038Ids=new Set();
for(const item of agentPrototypes.entries){
 if(v038Ids.has(item.id))fail("Duplicate V0.38 ID "+item.id);v038Ids.add(item.id);
 const asset=assetById.get(item.id);
 if(!asset||asset.type!=="interaction"||asset.stage!=="prototype"||
    asset.reuseKind!=="behavior-pattern"||asset.handoff?.mode==="research-only"||
    asset.path!==item.source||asset.demo!==item.demonstration||
    asset.spec!=="registry/agent-interactions-v038.json"||
    !asset.dependencies.includes(item.predecessorResearchId)||
    item.sourceIncludesThirdPartyCode!==false||item.license!=="original-code"||
    !Array.isArray(item.exportedFunctions)||item.exportedFunctions.length<3)fail("V0.38 model registration invalid "+item.id);
 for(const f of [item.source,item.demonstration,item.nodeTest,item.browserTest])assertFile(f,"V0.38 "+item.id);
 const code=fs.readFileSync(item.source,"utf8");
 for(const fn of item.exportedFunctions)if(!code.includes("export function "+fn+"("))fail("Missing original model export "+item.id+"/"+fn);
}
for(const f of agentPrototypes.files)assertFile(f,"V0.38 recorded file");
const css038=fs.readFileSync("playground/agent-interactions-v038/styles.css","utf8");
if(/(?:^|\n)\s*:root\s*\{|@import\b|url\s*\(/i.test(css038)||
   !css038.includes("prefers-reduced-motion")||!css038.includes("forced-colors"))fail("V0.38 CSS scope/quality check");
console.log("Validated V0.38: 3 original standalone executable models and associated tests.");

// V0.37: item-level source study; real upstream code/visuals remain outside this repo.
const componentDossiers = readJson("registry/component-dossiers-v037.json");
if (componentDossiers.schemaVersion !== "1.0" || componentDossiers.status !== "research-only" ||
    !Array.isArray(componentDossiers.dossiers) || componentDossiers.dossiers.length !== 10 ||
    !Array.isArray(componentDossiers.patterns) || componentDossiers.patterns.length !== 3 ||
    !Array.isArray(componentDossiers.candidateQueue) || componentDossiers.candidateQueue.length !== 3) fail("V0.37 dossier size/status mismatch");
const dossierIds = new Set();
for (const item of [...componentDossiers.dossiers,...componentDossiers.patterns]) {
  if (dossierIds.has(item.id)) fail("Duplicate V0.37 id "+item.id);
  dossierIds.add(item.id);
  const asset=assetById.get(item.id);
  const isPattern=componentDossiers.patterns.includes(item);
  if (!asset || asset.stage !== "analyzed" || asset.source !== item.source ||
      asset.spec !== "registry/component-dossiers-v037.json" ||
      asset.handoff?.mode !== "research-only" ||
      asset.type !== (isPattern?"interaction":"reference") ||
      asset.reuseKind !== (isPattern?"behavior-pattern":"design-reference") ||
      !Array.isArray(item.related) || !item.related.length ||
      item.related.some(id=>!assetIds.has(id))) fail("V0.37 catalog/registry mismatch "+item.id);
  if (!isPattern && (!item.licenseEvidence.startsWith("https://github.com/") ||
      !/^[0-9a-f]{40}$/.test(item.upstreamCommit) ||
      !item.source.includes(item.upstreamCommit) ||
      !Array.isArray(item.filePaths) || !item.filePaths.length ||
      !Array.isArray(item.installTargets) || !item.installTargets.length ||
      !Array.isArray(item.states) || !item.states.length ||
      !Array.isArray(item.responsive) || !item.responsive.length ||
      !item.fallback || !item.distinct || !item.observed ||
      item.imported !== false || item.suggestedStatesNotUpstreamVerified !== true ||
      item.reuseMode !== "research-only")) fail("V0.37 incomplete provenance or unproven safety "+item.id);
  if (isPattern && (item.implementation !== "original-research-only" ||
      !item.contract || !item.states || !item.controls || !item.fallback || !item.failures)) fail("V0.37 incomplete behavior "+item.id);
}
for (const item of componentDossiers.candidateQueue) {
  if (dossierIds.has(item.sourceRef) || !assetIds.has(item.sourceRef) ||
      !item.collectionUrl.startsWith("https://") ||
      item.licenseStatus !== "author-item-license-unknown" ||
      item.status !== "collection-listed-item-permalink-unverified") fail("V0.37 unsafe marketplace candidate");
}
assertFile("docs/research/component-dossiers-v037.md","V0.37 source dossier documentation");
console.log("Validated V0.37: 10 item-level upstream dossiers, 3 original patterns, 3 unlicensed marketplace candidates.");

// V0.32 must remain a source-linked research catalog, not installed external media/components.
const creativePrimitives = readJson("registry/creative-primitives-v032.json");
if (creativePrimitives.schemaVersion !== "1.0" || !Array.isArray(creativePrimitives.entries) ||
    creativePrimitives.entries.length !== 18) fail("V0.32 contract catalog must contain 18 studies");
const creativeCounts = new Map();
const creativeIds = new Set();
for (const item of creativePrimitives.entries) {
  if (creativeIds.has(item.id)) fail("Duplicate V0.32 research ID: " + item.id);
  creativeIds.add(item.id);
  creativeCounts.set(item.group, (creativeCounts.get(item.group)||0) + 1);
  const asset = assetById.get(item.id);
  const isEditor = item.group === "editor-collaboration";
  if (!asset || asset.stage !== "analyzed" || asset.type !== (isEditor?"interaction":"reference") ||
      asset.reuseKind !== (isEditor?"behavior-pattern":"design-reference") ||
      item.adoption !== "research-only" || asset.source !== item.source ||
      asset.spec !== "registry/creative-primitives-v032.json" ||
      !Array.isArray(item.aliases) || !item.aliases.length ||
      !Array.isArray(item.applicationContexts) || !item.applicationContexts.length ||
      !Array.isArray(item.relatedAssets) || !item.relatedAssets.length ||
      item.relatedAssets.some(id => !assetIds.has(id)) ||
      !item.designContract || !item.stateContract || !item.accessibleFallback ||
      !item.failureModes || !item.source.startsWith("https://") ||
      !item.licenseBoundary || !item.provenance ||
      !item.implementation || item.implementation !== "research-brief-only") {
    fail("V0.32 asset mismatch, incomplete provenance or unsafe implementation claim: "+item.id);
  }
}
for (const group of ["editor-collaboration", "type-texture", "expressive-effects"]) {
  if (creativeCounts.get(group)!==6) fail("V0.32 category must have six studies: "+group);
}
assertFile("styles/primitives/v032/creative-atoms.css","V0.32 independent CSS");
assertFile("styles/primitives/v032/README.md","V0.32 CSS documentation");
const creativeCss = fs.readFileSync("styles/primitives/v032/creative-atoms.css", "utf8");
if (/(?:^|\n)\s*:root\s*\{|(?:^|\n)\s*@import\b|url\s*\(/m.test(creativeCss) ||
    !creativeCss.includes("prefers-reduced-motion") ||
    !creativeCss.includes("forced-colors")) {
  fail("V0.32 CSS must be isolated, asset-free and have reduced-motion/high-contrast fallbacks");
}
console.log("Validated V0.32: 18 source-linked research patterns and six scoped CSS atoms.");

// V0.34: sixteen creative research patterns, not assembled pages or React exports.
const experienceArtifactsV034 = readJson("registry/experience-artifacts-v034.json");
if (experienceArtifactsV034.schemaVersion !== "1.0" || !Array.isArray(experienceArtifactsV034.entries) ||
    experienceArtifactsV034.entries.length !== 16 || experienceArtifactsV034.defaultTheme !== null) {
  fail("V0.34 design-contract registry invalid");
}
const experienceIds = new Set(), experienceCounts = new Map();
for (const item of experienceArtifactsV034.entries) {
  if (experienceIds.has(item.id)) fail("Duplicate V0.34 research ID: "+item.id);
  experienceIds.add(item.id);
  experienceCounts.set(item.group,(experienceCounts.get(item.group)||0)+1);
  const isInteraction = item.group === "creative-navigation" || item.group === "unconventional-interaction";
  const asset = assetById.get(item.id);
  if (!asset || asset.type !== (isInteraction ? "interaction" : "reference") ||
      asset.reuseKind !== (isInteraction ? "behavior-pattern" : "design-reference") ||
      asset.stage !== "analyzed" || asset.source !== item.source ||
      asset.spec !== "registry/experience-artifacts-v034.json" ||
      (isInteraction && asset.handoff?.mode !== "research-only") ||
      item.adoption !== "research-only" || item.implementation !== "research-brief-only" ||
      !Array.isArray(item.relatedAssets) || !item.relatedAssets.length ||
      item.relatedAssets.some(id => !assetIds.has(id)) ||
      !Array.isArray(item.aliases) || !item.aliases.length ||
      !item.designContract || !item.stateContract || !item.accessibleFallback ||
      !item.failureModes || !item.distinctFrom || !item.source?.startsWith("https://") ||
      (asset.path && asset.path !== "styles/primitives/v034/creative-atoms.css")) {
    fail("V0.34 research boundary/provenance mismatch: "+item.id);
  }
}
for (const group of ["visual-storytelling","spatial-composition","creative-navigation","unconventional-interaction"])
  if (experienceCounts.get(group) !== 4) fail("V0.34 group incomplete: "+group);
assertFile("styles/primitives/v034/README.md","V0.34 source docs");
assertFile("styles/primitives/v034/creative-atoms.css","V0.34 original CSS primitives");
const css034 = fs.readFileSync("styles/primitives/v034/creative-atoms.css","utf8");
if (/(?:^|\n)\s*:root\s*\{|(?:^|\n)\s*@import\b|url\s*\(/m.test(css034) ||
    !css034.includes("prefers-reduced-motion") || !css034.includes("forced-colors")) {
  fail("V0.34 atoms must be scoped, asset-free and degrade gracefully");
}
console.log("Validated V0.34: 16 original research briefs, four balanced categories, scoped CSS primitives.");

// V0.35: references are static SVG state illustrations, not runnable UI or tested screenshots.
const v035 = readJson("registry/state-specimens-v035.json");
if (v035.schemaVersion !== "1.0" || v035.status !== "static-illustration-only" ||
    v035.viewportsAreConceptsNotCaptures !== true || v035.assetsAdded !== 0 ||
    !Array.isArray(v035.specimens) || v035.specimens.length !== 8) fail("Invalid V0.35 specimen contract");
const v035Ids = new Set(), v034Ids = new Set(experienceArtifactsV034.entries.map(entry=>entry.id));
for (const s of v035.specimens) {
  if (v035Ids.has(s.assetId) || !v034Ids.has(s.assetId)) fail("Duplicate/unregistered V0.35 ID: "+s.assetId);
  v035Ids.add(s.assetId);
  const asset = assetById.get(s.assetId);
  if (!asset || asset.stage !== "analyzed" || asset.visualSpecimen !== s.svg ||
      asset.visualSpecimenEvidence !== "original-static-svg-concept-not-browser-render-or-functional-state" ||
      (asset.handoff?.mode !== "research-only" && asset.reuseKind === "behavior-pattern") ||
      s.lifecycle !== "analyzed" || s.reuseMode !== "research-only" ||
      s.evidence !== "original-static-vector-study-not-rendered-app" ||
      JSON.stringify(s.targetViewportWidths) !== JSON.stringify([1440,390]) ||
      !s.state || !s.focusExample || !s.mobileFallback ||
      !s.svg.startsWith("styles/specimens/v035/") || !s.svg.endsWith(".svg")) {
    fail("V0.35 specimen identity or evidence mismatch: "+s.assetId);
  }
  assertFile(s.svg, s.assetId+".visualSpecimen");
  const svg = fs.readFileSync(s.svg,"utf8");
  if (!svg.startsWith("<svg ") || !svg.trimEnd().endsWith("</svg>") ||
      !svg.includes("<title ") || !svg.includes("<desc ") ||
      !svg.includes("DESKTOP LAYOUT CONCEPT") || !svg.includes("MOBILE LAYOUT CONCEPT") ||
      /<script\b|<foreignObject\b|<image\b|(?:xlink:)?href\s*=|@import\b|url\s*\(/i.test(svg)) {
    fail("V0.35 standalone SVG must be static, self-contained and visibly labeled: "+s.assetId);
  }
}
assertFile("docs/research/state-specimens-v035.md","V0.35 research notes");
assertFile("styles/specimens/v035/README.md","V0.35 specimen catalog");
console.log("Validated V0.35: 8 research-only dual-viewport static SVG specimens, no new asset IDs.");

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
