import { expect, test } from "@playwright/test";

test.describe("canonical form listbox dismissal", () => {
  test("Combobox exposes listbox semantics and dismisses from Escape or a pointer outside", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    const combobox = page.getByRole("combobox", { name: "Owner" }).first();
    const listbox = page.getByRole("listbox", { name: "Owner options" });

    await combobox.click();
    await expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    await expect(listbox).toBeVisible();
    await combobox.press("Escape");
    await expect(listbox).toBeHidden();
    await expect(combobox).toBeFocused();

    await combobox.click();
    await expect(listbox).toBeVisible();
    await page
      .getByRole("heading", { exact: true, name: "Component Lab" })
      .click();
    await expect(listbox).toBeHidden();
  });

  test("MultiSelect exposes its named multi-select listbox and dismisses from Escape or a pointer outside", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    const trigger = page.getByRole("button", { exact: true, name: "Design" });
    const listbox = page.getByRole("listbox", {
      name: "Workstreams options",
    });

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    await expect(listbox).toHaveAttribute("aria-multiselectable", "true");
    await trigger.press("Escape");
    await expect(listbox).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(listbox).toBeVisible();
    await page
      .getByRole("heading", { exact: true, name: "Component Lab" })
      .click();
    await expect(listbox).toBeHidden();
  });
});
