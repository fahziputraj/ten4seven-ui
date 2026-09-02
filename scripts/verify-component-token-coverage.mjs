import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  buildComponentTokenCoverage,
  renderComponentTokenCoverage,
} from "./generate-component-token-coverage.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const reportPath = path.join(
  repoRoot,
  "research/15-universal-v2/COMPONENT_TOKEN_COVERAGE_REPORT.md",
);
const result = buildComponentTokenCoverage();

assert.ok(result.rows.length >= 7, "coverage report lost core component rows");
for (const row of result.rows)
  for (const [area, covered] of Object.entries(row))
    if (area !== "component")
      assert.equal(covered, true, `${row.component}: ${area} coverage missing`);

assert.equal(
  fs.readFileSync(reportPath, "utf8"),
  renderComponentTokenCoverage(),
  "component token coverage report is stale; run pnpm tokens:coverage",
);

console.log(
  `Component token coverage verified: ${result.rows.length} high-impact selector families; ${result.rawPx} raw-pixel occurrences tracked as explicit migration debt.`,
);
