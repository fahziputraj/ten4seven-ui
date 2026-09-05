import { test, expect } from "@playwright/test";
import axe from "axe-core";

test.describe("Next.js 16 App Router package consumer", () => {
  test("keeps the route server-rendered and hydrates the explicit client boundary", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const fontResponses: string[] = [];
    const iconifyRequests: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("response", (response) => {
      if (response.url().includes("Inter-Variable"))
        fontResponses.push(`${response.status()} ${response.url()}`);
    });
    page.on("request", (request) => {
      if (/iconify|api\.iconify/i.test(request.url()))
        iconifyRequests.push(request.url());
    });

    await page.emulateMedia({ colorScheme: "dark" });
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle("Ten4Seven Next.js consumer proof");
    await expect(page.getByTestId("server-component-marker")).toHaveText(
      "Server Component route rendered successfully.",
    );
    await expect(page.getByTestId("server-import-button")).toBeVisible();
    await expect(page.getByTestId("client-demo")).toBeVisible();
    await expect(page.getByTestId("theme-mode")).toHaveText("dark");
    await expect(page.getByTestId("theme-requested")).toHaveText("system");
    await expect(page.locator("#t7-overlay-root")).toHaveCount(1);

    const provider = page.locator(".t7-provider");
    await expect(provider).toHaveAttribute("data-t7-mode", "dark");
    await expect(provider).toHaveAttribute("data-t7-theme", "custom");

    const fontState = await provider.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        family: style.fontFamily,
        hasInterFace: Array.from(document.fonts).some((font) =>
          font.family.includes("Inter"),
        ),
        loaded: document.fonts.check("16px Inter"),
      };
    });
    expect(fontState.family).toContain("Inter");
    expect(fontState.hasInterFace).toBe(true);
    expect(fontState.loaded).toBe(true);
    expect(fontResponses.some((entry) => entry.startsWith("200 "))).toBe(true);
    expect(iconifyRequests).toEqual([]);

    const icon = page.getByRole("img", { name: "Dashboard" });
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute("viewBox", "0 0 24 24");

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test("exercises controlled fields, listbox, modal dismissal, and theme state", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const nameInput = page.getByLabel("Farmer name");
    await nameInput.fill("Sari");

    const regionTrigger = page.getByRole("button", { name: "Farm region" });
    await nameInput.focus();
    await page.keyboard.press("Tab");
    await expect(regionTrigger).toBeFocused();
    const focusState = await regionTrigger.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        focusVisible: element.matches(":focus-visible"),
        boxShadow: style.boxShadow,
      };
    });
    expect(focusState.focusVisible).toBe(true);
    expect(focusState.boxShadow).not.toBe("none");
    await regionTrigger.click();
    await expect(regionTrigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("listbox")).toBeVisible();
    await page.getByRole("option", { name: "Central farm" }).click();
    await expect(regionTrigger).toHaveAttribute("aria-expanded", "false");
    await expect(regionTrigger).toContainText("Central farm");

    await page.getByTestId("save-button").click();
    await expect(page.getByTestId("saved-state")).toHaveText(
      "Saved Sari for central.",
    );

    await page.getByTestId("open-modal").click();
    const dialog = page.getByRole("dialog", {
      name: "Confirm consumer interaction",
    });
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId("modal-content")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByTestId("theme-dark").click();
    await expect(page.getByTestId("theme-mode")).toHaveText("dark");
    await expect(page.getByTestId("theme-requested")).toHaveText("dark");
    await page.getByTestId("theme-light").click();
    await expect(page.getByTestId("theme-mode")).toHaveText("light");
    await page.getByTestId("theme-system").click();
    await expect(page.getByTestId("theme-requested")).toHaveText("system");
    await expect(page.getByTestId("theme-mode")).toHaveText("light");
  });

  test("has no critical or serious axe violations on the proof route", async ({
    page,
  }) => {
    await page.goto("/");
    await page.addScriptTag({ content: axe.source });
    const result = (await page.evaluate(async () => {
      // @ts-expect-error injected by axe-core for this isolated audit
      return window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
      });
    })) as { violations: Array<{ impact: string | null }> };
    const serious = result.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
});
