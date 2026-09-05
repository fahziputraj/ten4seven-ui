import { expect, test } from "@playwright/test";

test("reference applications are consumer-clean by default and retain explicit QA mode", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/operations-tracker");

  await expect(page.getByTestId("reference-harness-trigger")).toHaveCount(0);

  await page.goto("/operations-tracker?mode=qa");
  const trigger = page.getByTestId("reference-harness-trigger");
  await expect(trigger).toBeVisible();
  await trigger.getByRole("button").click();

  const qaDialog = page.getByRole("dialog", { name: "Reference QA" });
  await expect(qaDialog).toContainText("Fixture state");
  await qaDialog
    .getByRole("button", { name: "Publishing Store", exact: true })
    .click();

  await expect(page).toHaveURL(/\/ebook-store\?mode=qa$/);
  await expect(page.getByTestId("reference-harness-trigger")).toBeVisible();

  await page.goto("/ebook-store");
  await expect(page.getByTestId("reference-harness-trigger")).toHaveCount(0);
});

test("publishing keeps category discovery in its rail and mobile drawer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ebook-store");

  await expect(
    page.getByRole("button", { name: "Jelajahi kategori", exact: true }),
  ).toHaveCount(0);
  const categories = page.getByRole("navigation", {
    name: "Jelajahi kategori buku",
  });
  await expect(categories).toBeVisible();
  await categories
    .getByRole("button", { name: "Pendidikan", exact: true })
    .click();
  await expect(page.locator(".ebook-product-card")).toHaveCount(1);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole("button", { name: "Filter", exact: true }).click();
  const filterDrawer = page.getByRole("dialog", { name: "Filter buku" });
  await expect(filterDrawer).toBeVisible();
  await expect(
    filterDrawer.getByRole("navigation", {
      name: "Jelajahi kategori buku",
    }),
  ).toBeVisible();
});
