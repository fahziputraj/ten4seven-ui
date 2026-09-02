import { expect, test } from "@playwright/test";

test.describe("canonical overlay keyboard hardening", () => {
  test("Dropdown Menu opens on its first item and supports roving menu keys", async ({
    page,
  }) => {
    await page.goto("/components/dropdown-menu");

    const trigger = page.getByRole("button", { name: "More actions" });
    const menu = page.getByRole("menu", { name: "Actions" });
    const edit = menu.getByRole("menuitem", { name: "Edit item" });
    const remove = menu.getByRole("menuitem", { name: "Delete item" });

    await trigger.click();
    await expect(edit).toBeFocused();

    await page.keyboard.press("End");
    await expect(remove).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(edit).toBeFocused();
    await page.keyboard.press("Home");
    await expect(edit).toBeFocused();
    await page.keyboard.press("d");
    await expect(remove).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("Dropdown Menu retains the collapsed repeated-key query for the next prefix", async ({
    page,
  }) => {
    await page.goto("/components/dropdown-menu");

    await page.evaluate(() => {
      let timestamp = 1_000;
      Date.now = () => {
        timestamp += 10;
        return timestamp;
      };
    });

    const trigger = page.getByRole("button", { name: "More actions" });
    const menu = page.getByRole("menu", { name: "Actions" });
    const edit = menu.getByRole("menuitem", { name: "Edit item" });
    const remove = menu.getByRole("menuitem", { name: "Delete item" });

    await trigger.click();
    await expect(edit).toBeFocused();

    // Repeating E keeps the one-character cycling query. Moving to Delete and
    // typing D must then use "ed", which selects Edit rather than leaving the
    // prior active item focused because the stale query was "eed".
    await page.keyboard.press("e");
    await expect(edit).toBeFocused();
    await page.keyboard.press("e");
    await expect(edit).toBeFocused();
    await page.keyboard.press("End");
    await expect(remove).toBeFocused();
    await page.keyboard.press("d");
    await expect(edit).toBeFocused();
  });

  test("Context Menu supports keyboard invocation and its menu key model", async ({
    page,
  }) => {
    await page.goto("/components/context-menu");

    const trigger = page.getByRole("button", {
      name: "Right-click this item",
    });
    const menu = page.getByRole("menu", { name: "Context actions" });
    const edit = menu.getByRole("menuitem", { name: "Edit item" });

    await trigger.focus();
    await page.keyboard.press("Shift+F10");
    await expect(edit).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(edit).toBeFocused();
    await page.keyboard.press("Home");
    await expect(edit).toBeFocused();
    await page.keyboard.press("End");
    await expect(edit).toBeFocused();
    await page.keyboard.press("e");
    await expect(edit).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(trigger).toBeFocused();

    await page.keyboard.press("ContextMenu");
    await expect(edit).toBeFocused();
  });

  test("Popover exposes a labelled dialog surface", async ({ page }) => {
    await page.goto("/components/popover");

    await page.getByRole("button", { name: "Open popover" }).click();
    await expect(page.getByRole("dialog", { name: "Popover" })).toBeVisible();
  });

  test("Escape closes an inner overlay without closing its native modal", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    await page
      .getByRole("button", { name: "Open nested modal fixture" })
      .click();
    const dialog = page.getByRole("dialog", { name: "Nested overlay proof" });
    const selectTrigger = dialog.getByRole("button", {
      name: "Review outcome",
    });

    await selectTrigger.click();
    await expect(dialog.getByRole("listbox")).toBeVisible();
    await selectTrigger.press("Escape");
    await expect(dialog.getByRole("listbox")).toHaveCount(0);
    await expect(dialog).toBeVisible();
  });
});
