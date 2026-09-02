import { expect, test } from "@playwright/test";

test.describe("canonical component accessibility hardening", () => {
  test("CommandMenu maintains one active descendant and executes it from the keyboard", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    const trigger = page.getByRole("button", { name: "Open command menu" });
    await trigger.click();

    const search = page.getByRole("combobox", { name: "Search commands" });
    const listbox = page.getByRole("listbox", { name: "Commands" });
    const options = listbox.getByRole("option");
    await expect(search).toBeFocused();
    await expect(search).toHaveAttribute("aria-haspopup", "listbox");
    await expect(options).toHaveCount(2);
    await expect(options.first()).toHaveAttribute("aria-selected", "true");
    await expect(search).toHaveAttribute(
      "aria-activedescendant",
      await options.first().getAttribute("id"),
    );

    await search.press("End");
    await expect(options.last()).toHaveAttribute("aria-selected", "true");
    await expect(search).toHaveAttribute(
      "aria-activedescendant",
      await options.last().getAttribute("id"),
    );

    await search.press("Home");
    await expect(options.first()).toHaveAttribute("aria-selected", "true");
    await search.press("ArrowDown");
    await expect(options.last()).toHaveAttribute("aria-selected", "true");
    await search.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "Command menu" }),
    ).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("DataTable rows activate from the keyboard without activating their nested checkbox", async ({
    page,
  }) => {
    await page.goto("/operations-tracker");

    const table = page.getByRole("table", { name: "Operations work queue" });
    const row = table.locator("tbody tr[data-clickable='true']").first();
    const checkbox = row.getByRole("checkbox");
    await expect(row).toHaveAttribute("tabindex", "0");

    await checkbox.focus();
    await checkbox.press("Space");
    await expect(checkbox).toBeChecked();
    await expect(page.locator(".t7-drawer-backdrop[open]")).toHaveCount(0);

    await row.focus();
    await row.press("Enter");
    await expect(page.locator(".t7-drawer-backdrop[open]")).toHaveCount(1);
  });
});
