import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/assets.json"), "utf8"));
const styles = JSON.parse(fs.readFileSync(path.join(root, "registry/styles.json"), "utf8"));

const ROUTES = Object.freeze({
  "new-page": {
    skill: "hallmark",
    referenceId: "REF-032",
    role: "Optional original-page composition and independent browser review",
    steps: [
      "Write down audience, product job, real content and devices before choosing a composition.",
      "If direction is open, use the existing creative:brief command to explore different visual grammars.",
      "Optionally invoke the upstream Hallmark Skill in a separate worktree after its source has been reviewed.",
      "Inspect the hero and full page visually; adapt or reject the generated material instead of copying it blindly."
    ]
  },
  "redesign": {
    skill: "unslop",
    referenceId: "REF-031",
    role: "Optional contextual correction of an existing interface",
    steps: [
      "Capture the original source, screenshots, headings, controls and behavior contract.",
      "Ask for a product-specific design argument and a redline report before allowing changes.",
      "Optionally invoke the upstream Unslop Skill in an isolated branch after reviewing its source.",
      "Compare before/after screenshots and verify that all existing features and content still work."
    ]
  },
  "audit": {
    skill: "hallmark",
    referenceId: "REF-032",
    role: "Optional audit-only evidence, never a universal aesthetic gate",
    steps: [
      "Capture the target page and preserve a functional baseline.",
      "Optionally invoke the upstream Hallmark audit mode, never redesign mode, after reviewing the Skill.",
      "Separate actual usability, accessibility and truthfulness failures from the Skill's house-style preferences.",
      "Review conflicts against the selected local visual genre; do not auto-apply all sloplint findings."
    ]
  }
});

export function planDesignReview({ mode, target, context, style } = {}) {
  if (!Object.hasOwn(ROUTES, mode)) {
    throw new Error("Choose --mode=new-page, --mode=redesign or --mode=audit; no default mode");
  }
  const targetText = typeof target === "string" ? target.trim() : "";
  if (mode !== "new-page" && !targetText) {
    throw new Error("--target=<path-or-URL> is required for redesign and audit");
  }
  const contextText = typeof context === "string" ? context.trim() : "";
  const selectedStyle = typeof style === "string" ? style.trim() : "";
  if (selectedStyle && !styles.styles.some(item => item.id === selectedStyle)) {
    throw new Error("Unknown styleId: " + selectedStyle + ". Select a registered style or leave it open.");
  }
  const route = ROUTES[mode];
  const reference = registry.assets.find(item => item.id === route.referenceId);
  if (!reference || !reference.source) {
    throw new Error("Missing upstream reference " + route.referenceId + " in asset registry");
  }
  return {
    schemaVersion: "1.0",
    status: "planning-only",
    mode,
    target: targetText || null,
    context: contextText || null,
    styleId: selectedStyle || null,
    visualDirectionPolicy: selectedStyle ? "Preserve the explicitly selected local style." : "No default theme: choose a context-specific direction before editing.",
    suggestedExternalSkill: {
      name: route.skill,
      assetId: route.referenceId,
      source: reference.source,
      role: route.role,
      installedOrExecutedByThisCommand: false
    },
    reviewSteps: route.steps,
    preservedContracts: [
      "Real copy, page sections, user actions, links, navigation and data/API wiring",
      "Keyboard focus, semantic order, status feedback, responsive content and reduced-motion behavior",
      "Licensed media/attribution and honest sample-versus-production claims"
    ],
    requiredVerification: [
      "Target project's type/build/unit checks and direct interaction regression",
      "390, 768 and 1440 px screenshots with human before/after review",
      "Relevant accessibility, browser and content checks, with uncovered gaps recorded"
    ],
    cautions: [
      "No third-party Skill installation, invocation, source copy, mutation or network access occurs in this planner.",
      "Hallmark aesthetic house rules are opt-in and are not global style requirements.",
      "Screenshot hashes are capture evidence, not automatically approved visual baselines."
    ]
  };
}

export function toMarkdown(plan) {
  const bullets = values => values.map(value => "- " + value).join("\n");
  return [
    "# Design review handoff · " + plan.mode,
    "",
    "**Planning only**. This does not install or execute third-party Skills.",
    "",
    "- Target: " + (plan.target || "(new page; choose a destination in the application)"),
    "- Product context: " + (plan.context || "(must be supplied before implementation)"),
    "- Local style: " + (plan.styleId || "(not selected)"),
    "- Style rule: " + plan.visualDirectionPolicy,
    "- Optional upstream Skill: " + plan.suggestedExternalSkill.name + " (" + plan.suggestedExternalSkill.source + ")",
    "- Source asset: " + plan.suggestedExternalSkill.assetId,
    "",
    "## Workflow",
    bullets(plan.reviewSteps),
    "",
    "## Do not break",
    bullets(plan.preservedContracts),
    "",
    "## Verification",
    bullets(plan.requiredVerification),
    "",
    "## Limits",
    bullets(plan.cautions),
    "",
    "Only proceed with external code after source, license and scoped execution have been reviewed. Read docs/assembly/design-review-workflows.md."
  ].join("\n");
}

export function runCLI(argv) {
  const args = {};
  for (const arg of argv) {
    if (!arg.startsWith("--")) throw new Error("Unexpected argument: " + arg);
    const pos = arg.indexOf("=");
    const key = pos < 0 ? arg.slice(2) : arg.slice(2, pos);
    if (!["help", "mode", "target", "context", "style", "format"].includes(key)) throw new Error("Unknown option: " + key);
    if (Object.hasOwn(args, key)) throw new Error("Duplicate option: " + key);
    args[key] = pos < 0 ? true : arg.slice(pos + 1);
  }
  if (args.help) return "Usage: npm run design:plan -- --mode=<new-page|redesign|audit> [--target=<path-or-URL>] [--context=<product-job>] [--style=<registered-styleId>] [--format=markdown|json]\nRead docs/assembly/design-review-workflows.md. This never installs or runs external Skills.";
  const plan = planDesignReview(args);
  const format = args.format || "markdown";
  if (format === "json") return JSON.stringify(plan, null, 2);
  if (format !== "markdown") throw new Error("Unsupported --format: " + format);
  return toMarkdown(plan);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(runCLI(process.argv.slice(2))); }
  catch (error) { console.error("Design workflow blocked: " + error.message); process.exitCode = 1; }
}
