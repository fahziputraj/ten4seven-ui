import { expect, test } from "@playwright/test";

test.describe("Q05 navigation, disclosure, and search contracts", () => {
  test("keeps canonical navigation coverage distinct and keyboard reachable", async ({
    page,
  }) => {
    await page.goto("/components/navigation");

    for (const name of [
      "Navigation Menu",
      "Section Navigation",
      "Accordion",
      "Collapsible",
      "Command Menu",
    ]) {
      await expect(
        page.getByRole("heading", { name, exact: true }).first(),
      ).toBeVisible();
    }

    const menubar = page.getByRole("menubar", { name: "Navigation menu" });
    await expect(menubar).toBeVisible();
    const rootItems = menubar.locator('[data-t7-navigation-root-item="true"]');
    await expect(rootItems).toHaveCount(3);
    await rootItems.first().focus();
    await rootItems.first().press("ArrowRight");
    await expect(rootItems.nth(1)).toBeFocused();
    await rootItems.nth(1).press("Enter");

    const submenu = page.getByRole("menu", { name: "Products navigation" });
    await expect(submenu).toBeVisible();
    const submenuItems = submenu.getByRole("menuitem");
    await expect(submenuItems.first()).toBeFocused();
    await submenuItems.first().press("ArrowDown");
    await expect(submenuItems.nth(1)).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(submenu).toBeHidden();
    await expect(rootItems.nth(1)).toBeFocused();
  });

  test("keeps disclosure regions and command results labelled", async ({
    page,
  }) => {
    await page.goto("/component-lab");

    const disclosure = page.getByRole("button", {
      name: "What belongs in this panel?",
    });
    const panelId = await disclosure.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    const panel = page.locator(`#${panelId}`);
    await expect(panel).toHaveAttribute("role", "region");
    await expect(panel).toHaveAttribute(
      "aria-labelledby",
      await disclosure.getAttribute("id"),
    );
    await disclosure.press("Enter");
    await expect(disclosure).toHaveAttribute("aria-expanded", "false");
    await disclosure.press("Enter");
    await expect(disclosure).toHaveAttribute("aria-expanded", "true");

    const commandTrigger = page.getByRole("button", {
      name: "Open command menu",
    });
    await commandTrigger.click();
    const search = page.getByRole("combobox", { name: "Search commands" });
    const options = page
      .getByRole("listbox", { name: "Commands" })
      .getByRole("option");
    await search.fill("theme");
    await expect(options).toHaveCount(1);
    await expect(options.first()).toHaveAttribute("aria-posinset", "1");
    await expect(options.first()).toHaveAttribute("aria-setsize", "1");
    await page.keyboard.press("Escape");
    await expect(commandTrigger).toBeFocused();
  });

  test("keeps the search contract semantic instead of turning it into command execution", async ({
    page,
  }) => {
    await page.goto("/components/forms");
    const search = page.getByRole("searchbox").first();
    await expect(search).toBeVisible();
    await expect(search).toHaveAttribute("type", "search");
  });
});
