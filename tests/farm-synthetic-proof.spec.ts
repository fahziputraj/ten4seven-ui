import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

async function openFarmProof(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem("ten4seven.playground.theme.v1");
    window.localStorage.removeItem(
      "ten4seven.playground.runtime-preferences.v1",
    );
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/farm-synthetic-proof");
  await expect(
    page.getByRole("heading", { level: 1, name: "Farm Overview" }),
  ).toBeVisible();
}

async function expectNoDocumentOverflow(page: Page) {
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
}

async function chooseScenario(page: Page, label: string) {
  await page.getByRole("button", { name: "Scenario state" }).click();
  await page.getByRole("option", { name: label, exact: true }).click();
}

test("Farm synthetic consumer composes authorized context and current overview metrics", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await openFarmProof(page);

  const proof = page.getByTestId("farm-synthetic-proof");
  const authorizedFarms = page.getByRole("navigation", {
    name: "Authorized Farms",
  });
  await expect(authorizedFarms).toBeVisible();
  await expect(authorizedFarms.getByRole("button")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "Farm context selector" }),
  ).toBeVisible();
  await expect(
    proof.getByRole("region", { name: "Farm overview metrics" }),
  ).toBeVisible();
  for (const value of ["42,860", "48,240", "0.8%", "88.7%", "112 g", "1.72"]) {
    await expect(proof.getByText(value, { exact: true })).toBeVisible();
  }

  await page.getByRole("button", { name: "Farm context selector" }).click();
  await page.getByRole("option", { name: "Farm Central", exact: true }).click();
  await expect(
    proof.getByRole("heading", { name: "Farm Central" }),
  ).toBeVisible();
  await expect(proof.getByText("38,410", { exact: true })).toBeVisible();
  await expect(proof).toHaveAttribute("data-farm-state", "current");
  await expectNoDocumentOverflow(page);

  await page.addScriptTag({ content: axe.source });
  const violations = await proof.evaluate(async (node) => {
    // @ts-expect-error axe-core is injected for this isolated audit.
    const result = await window.axe.run(node, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    });
    return result.violations
      .filter((violation: { impact: string | null }) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      )
      .map((violation: { id: string }) => violation.id);
  });
  expect(violations).toEqual([]);
});

test("Farm synthetic consumer proves loading, no-data, error, and safe scope states", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await openFarmProof(page);
  const proof = page.getByTestId("farm-synthetic-proof");

  await chooseScenario(page, "Loading");
  await expect(
    proof.getByRole("heading", { name: "Loading farm overview" }),
  ).toBeVisible();
  await expect(proof).toHaveAttribute("data-farm-state", "loading");

  await chooseScenario(page, "No data");
  await expect(
    proof.getByText("No farm data available", { exact: true }),
  ).toBeVisible();
  await expect(proof).toHaveAttribute("data-farm-state", "no_data");

  await chooseScenario(page, "Error");
  await expect(
    proof.getByText("Farm overview could not be loaded", { exact: true }),
  ).toBeVisible();
  await expect(proof).toHaveAttribute("data-farm-state", "error");

  await chooseScenario(page, "Out of scope");
  await expect(
    proof.getByText("Farm is outside your authorized scope", { exact: true }),
  ).toBeVisible();
  await expect(proof).toHaveAttribute("data-farm-state", "out_of_scope");

  await chooseScenario(page, "Not found");
  await expect(
    proof.getByText("Farm context not found", { exact: true }),
  ).toBeVisible();
  await expect(proof).toHaveAttribute("data-farm-state", "not_found");
  await expectNoDocumentOverflow(page);
});

test("Farm synthetic consumer keeps the authorized navigation and metric grid usable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await openFarmProof(page);

  const menu = page.getByRole("button", {
    name: "Open application navigation",
    exact: true,
  });
  await expect(menu).toBeVisible();
  await menu.click();
  const navigation = page.getByRole("navigation", {
    name: "Authorized Farms",
  });
  await expect(navigation).toBeVisible();
  await navigation
    .getByRole("button", { name: "Farm South", exact: true })
    .click();

  const proof = page.getByTestId("farm-synthetic-proof");
  await expect(
    proof.getByRole("heading", { name: "Farm South" }),
  ).toBeVisible();
  await expect(proof.getByText("31,290", { exact: true })).toBeVisible();
  await expectNoDocumentOverflow(page);

  await chooseScenario(page, "Error");
  await expect(
    proof.getByText("Farm overview could not be loaded", { exact: true }),
  ).toBeVisible();
  await expectNoDocumentOverflow(page);
});
