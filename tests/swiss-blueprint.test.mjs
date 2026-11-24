import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { auditAll } from "../scripts/contrast-audit.mjs";
import { PARTS, formatLength, formatTolerance, filterParts } from "../playground/swiss-blueprint/app.mjs";

test("DT-015 swiss-blueprint tokens are strictly scoped and pass WCAG contrast", () => {
  const css = fs.readFileSync("styles/swiss-blueprint/tokens.css", "utf8");
  assert.ok(css.includes('[data-design-theme="swiss-blueprint"]'));
  assert.ok(!/(^|\n)\s*:root\s*\{/.test(css));
  const audit = auditAll().find(x => x.styleId === "swiss-blueprint");
  assert.ok(audit, "swiss-blueprint missing from contrast audit");
  assert.deepEqual(audit.checks.filter(c => !c.pass), []);
});

test("swiss-blueprint standalone model formats metric/imperial units and filters subsystems", () => {
  assert.equal(PARTS.length, 6);
  assert.equal(formatLength(420, "mm"), "420.0 mm");
  assert.equal(formatLength(25.4, "in"), "1.00 in");
  assert.equal(formatTolerance(0.15, "mm"), "±0.15 mm");
  assert.equal(filterParts("all").length, 6);
  assert.equal(filterParts("optics").length, 2);
  assert.equal(filterParts("thermal").length, 1);
});
