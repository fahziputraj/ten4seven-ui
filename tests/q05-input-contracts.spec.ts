import { expect, test } from "@playwright/test";

test.describe("U05 form, selection, date-time, and file contract stress", () => {
  test("keeps the Component Lab input families and file lifecycle states readable", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    await expect(
      page.getByRole("region", { name: "Component interaction checks" }),
    ).toBeVisible();
    const interactionRegion = page.locator("#component-lab-forms-feedback");
    await expect(
      interactionRegion.getByRole("combobox", { name: "Owner" }),
    ).toBeVisible();
    await expect(
      interactionRegion.getByText("Workstreams", { exact: true }),
    ).toBeVisible();
    await expect(
      interactionRegion.getByRole("button", { name: "Design", exact: true }),
    ).toBeVisible();
    await expect(
      interactionRegion.getByRole("combobox", { name: "Review date" }),
    ).toBeVisible();
    await expect(
      interactionRegion.getByRole("button", { name: "Planning range" }),
    ).toBeVisible();
    await expect(
      interactionRegion.getByRole("group", { name: "Verification sample" }),
    ).toBeVisible();

    await expect(page.getByText("Queued", { exact: true })).toBeVisible();
    await expect(page.getByText("Retrying", { exact: true })).toBeVisible();
    await expect(page.getByText("Canceled", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: "Upload progress" }),
    ).toBeVisible();
  });

  test("keeps the forms showroom on the canonical family route", async ({
    page,
  }) => {
    await page.goto("/components/forms");

    await expect(
      page.getByRole("heading", { name: "Forms", exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Select", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Tags Input", exact: true }),
    ).toBeVisible();

    await page.goto("/components/date-time");
    await expect(
      page.getByRole("heading", { name: "Date & Time", exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Date Picker", exact: true }),
    ).toBeVisible();

    await page.goto("/components/files");
    await expect(
      page.getByRole("heading", { name: "Files", exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "File Upload", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "File Preview", exact: true }),
    ).toBeVisible();
  });
});
