import { expect, test } from "@playwright/test";

test.describe("Q06 forms, selection, date-time, and files", () => {
  test("indexes Cascader and keeps its path keyboard-accessible", async ({
    page,
  }) => {
    await page.goto("/components/forms");

    await expect(page.getByRole("heading", { name: "Cascader" })).toBeVisible();
    const trigger = page.getByRole("button", { name: "Workspace path" });
    await trigger.click();

    const dialog = page.getByRole("dialog", {
      name: "Workspace path options",
    });
    await expect(dialog).toBeVisible();
    const operations = dialog.getByRole("menuitem", { name: "Operations" });
    const delivery = dialog.getByRole("menuitem", { name: "Delivery" });

    await expect(delivery).toBeFocused();
    await delivery.press("ArrowLeft");
    await expect(operations).toBeFocused();
    await operations.press("ArrowRight");
    await expect(delivery).toBeFocused();
    await delivery.press("Enter");

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toContainText("Operations / Delivery");
  });

  test("keeps multi-selection and transfer listboxes keyboard-addressable", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    const multiSelectTrigger = page.getByRole("button", {
      exact: true,
      name: "Design",
    });
    await multiSelectTrigger.click();
    const multiSelect = page.getByRole("listbox", {
      name: "Workstreams options",
    });
    await expect(multiSelect).toBeFocused();
    await expect(multiSelect).toHaveAttribute("tabindex", "0");
    await expect(multiSelect.getByRole("option").first()).toHaveAttribute(
      "tabindex",
      "-1",
    );
    await multiSelect.press("Escape");
    await expect(multiSelectTrigger).toBeFocused();

    const transfer = page.getByRole("listbox", {
      exact: true,
      name: "Available",
    });
    await transfer.focus();
    await expect(transfer).toHaveAttribute("aria-activedescendant", /option/);
    await transfer.press("ArrowDown");
    await expect(transfer).toHaveAttribute("aria-activedescendant", /option/);
  });

  test("keeps date range and file triggers labelled as single controls", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    const rangeTrigger = page.getByRole("button", { name: "Planning range" });
    await expect(rangeTrigger).toHaveAttribute("aria-haspopup", "dialog");
    await rangeTrigger.click();
    const calendar = page.getByRole("dialog", {
      name: "Planning range calendar",
    });
    await expect(calendar).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(calendar).toBeHidden();
    await expect(rangeTrigger).toBeFocused();

    const upload = page.getByRole("button", { name: "Upload files" });
    await expect(upload).toHaveAttribute("type", "button");
    await expect(upload).toHaveAttribute("aria-describedby", /description/);
    const fileInput = page.locator(".t7-file-upload input[type=file]");
    await expect(fileInput).toHaveAttribute("aria-hidden", "true");
    await expect(fileInput).toHaveAttribute("tabindex", "-1");
  });
});
