import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { expect, test, type Page } from "@playwright/test";

type ComponentCatalogEntry = { aliasOf?: string; displayName?: string };
type RecipeCatalogEntry = { displayName?: string };

const componentCatalog = JSON.parse(
  readFileSync(
    resolve(process.cwd(), "packages/ai/catalog/components.json"),
    "utf8",
  ),
) as Record<string, ComponentCatalogEntry>;
const recipeCatalog = JSON.parse(
  readFileSync(
    resolve(process.cwd(), "packages/ai/catalog/recipes.json"),
    "utf8",
  ),
) as Record<string, RecipeCatalogEntry>;

function slugify(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function navigateWithinApp(page: Page, path: string) {
  await page.evaluate((nextPath: string) => {
    window.history.pushState({}, "", nextPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, path);
}

test.describe("catalog information architecture", () => {
  test("canonical component and family routes resolve", async ({ page }) => {
    test.setTimeout(120_000);
    const canonicalNames = Object.entries(componentCatalog)
      .filter(([, component]) => !component.aliasOf)
      .map(([name]) => name);
    const failures: string[] = [];

    await page.goto("/components");
    for (const name of canonicalNames) {
      await navigateWithinApp(page, `/components/${slugify(name)}`);
      if (
        (await page
          .getByRole("heading", {
            name: componentCatalog[name].displayName ?? name,
            exact: true,
          })
          .count()) !== 1
      ) {
        failures.push(name);
      }
      await expect(
        page.getByRole("table", {
          name: new RegExp(
            `${componentCatalog[name].displayName ?? name} API properties`,
          ),
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Critical states", exact: true }),
      ).toBeVisible();
      await expect(page.locator(".catalog-contract-preview")).toHaveCount(1);
      await expect(page.locator(".catalog-preview-placeholder")).toHaveCount(0);
    }

    for (const family of [
      "foundations",
      "actions",
      "forms",
      "navigation",
      "layout",
      "patterns",
      "surfaces",
      "data-display",
      "tables",
      "filtering-bulk-actions",
      "overlays",
      "feedback-progress",
      "date-time",
      "files",
      "charts-data-visualization",
      "media",
      "commerce",
      "application",
      "tables-filtering",
      "charts",
    ]) {
      await navigateWithinApp(page, `/components/${family}`);
      if ((await page.locator("main").count()) !== 1) failures.push(family);
    }

    await page.goto("/components/surface");
    await expect(
      page.getByRole("heading", { name: "Surface", exact: true }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Surface", exact: true }),
    ).toBeVisible();

    expect(failures).toEqual([]);
  });

  test("recipe routes, global search, and icon intent search resolve", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    for (const name of Object.keys(recipeCatalog)) {
      const displayName = recipeCatalog[name].displayName ?? name;
      await page.goto(`/recipes/${slugify(name)}`);
      await expect(page.locator("main h1")).toHaveText(displayName, {
        timeout: 15_000,
      });
    }

    await page.goto("/recipes/marketing-home");
    await expect(
      page.getByRole("heading", { name: "Required blocks", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Recommended blocks",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Optional blocks", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Optional components",
        exact: true,
      }),
    ).toBeVisible();

    await page.goto("/components");
    await page
      .getByRole("button", { name: "Search ten4seven catalog" })
      .click();
    const commandSearch = page.getByRole("textbox", {
      name: "Search commands",
    });
    await commandSearch.fill("DataTable");
    await expect(
      page.getByRole("option", { name: "Data Table Tables" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");

    await page.goto("/icons");
    await page
      .getByRole("textbox", { name: "Search semantic icons" })
      .fill("stock");
    await expect(
      page.getByRole("button", {
        name: "Copy semantic icon stock",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Copy semantic icon stockIn" }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Copy semantic icon stock",
        exact: true,
      })
      .click();
    await expect(
      page.getByRole("status").filter({ hasText: "Semantic icon copied" }),
    ).toBeVisible();

    await page.goto("/tokens");
    const tokenFamilies = page.getByRole("navigation", {
      name: "Token families",
    });
    await expect(tokenFamilies).toBeVisible();
    await expect(
      tokenFamilies.getByRole("link", {
        name: "Spacing & control geometry",
      }),
    ).toHaveAttribute("href", "#token-geometry");
    await tokenFamilies
      .getByRole("link", { name: "Spacing & control geometry" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Control geometry", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Copy CSS variable --t7-background-hsl",
      })
      .click();
    await expect(
      page.getByRole("status").filter({ hasText: "Token copied" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Interaction semantics" }),
    ).toHaveAttribute("href", "#token-interaction");
  });

  test("mobile catalog navigation uses a drawer", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/components/forms");
    await page
      .getByRole("button", { name: "Open design system navigation" })
      .click();
    const navigation = page.getByRole("dialog", {
      name: "Design system navigation",
    });
    await expect(navigation).toBeVisible();
    await expect(
      navigation.getByText("Library", { exact: true }),
    ).toBeVisible();
    await navigation
      .getByRole("button", { name: "Components", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Components", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("dialog", { name: "Design system navigation" }),
    ).toHaveCount(0);
  });

  test("root redirects and unknown paths remain honest 404s", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/theme-studio$/);
    await expect(
      page.getByRole("heading", { name: "Theme Studio", exact: true }),
    ).toBeVisible();

    await page.goto("/not-a-real-ten4seven-route");
    await expect(
      page.getByRole("heading", {
        name: "This playground route does not exist.",
        exact: true,
      }),
    ).toBeVisible();
  });

  test("Select exposes one custom accessible model", async ({ page }) => {
    await page.goto("/components/select");
    await expect(page.getByRole("combobox")).toHaveCount(0);
    const trigger = page.getByRole("button", { name: "Select", exact: true });
    await expect(trigger).toHaveCount(1);
    await expect(page.locator('select[aria-hidden="true"]')).toHaveAttribute(
      "tabindex",
      "-1",
    );
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await expect(page.getByRole("option")).toHaveCount(3);
    await page.getByRole("option", { name: "In review", exact: true }).click();
    await expect(trigger).toContainText("In review");
  });
});
