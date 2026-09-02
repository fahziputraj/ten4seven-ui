import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { expect, test } from "@playwright/test";

const cardSource = readFileSync(
  resolve(process.cwd(), "packages/ui/src/components.tsx"),
  "utf8",
);

test.describe("Card actionability semantic contract", () => {
  test("withdraws its wrapper button semantics when nested controls are present", () => {
    expect(cardSource).toContain("hasDeclaredInteractiveDescendant");
    expect(cardSource).toContain(
      "new MutationObserver(synchronizeActionability)",
    );
    expect(cardSource).toContain(
      "const canActivate = isActionable && !hasInteractiveDescendant;",
    );
    expect(cardSource).toContain('role={canActivate ? "button" : undefined}');
    expect(cardSource).toContain(
      'data-actionable={\n        isActionable ? (canActivate ? "true" : "blocked") : undefined\n      }',
    );
  });
});
