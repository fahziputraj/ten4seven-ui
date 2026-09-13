import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

const q08Viewports = [
  { height: 900, id: "desktop", width: 1440 },
  { height: 900, id: "tablet", width: 840 },
  { height: 844, id: "mobile", width: 390 },
] as const;

async function pageOverflow(page: Page) {
  return page.evaluate(() => ({
    body: document.body.scrollWidth,
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
}

async function openErpReference(page: Page) {
  await page.goto("/erp-reference");
  await expect(page.getByTestId("erp-data-dense-reference")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "ERP density reference" }),
  ).toBeVisible();
}

test.describe("Q08 ERP density and readiness reference", () => {
  test("proves collection, entry, review, chart, state, and detail contracts", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await openErpReference(page);

    await expect(page).toHaveTitle(/ERP Density Reference/);
    await expect(page.getByTestId("erp-reference-theme-scope")).toHaveAttribute(
      "data-brand-profile",
      "aapm-erp",
    );
    await expect(page.getByTestId("erp-data-dense-reference")).toHaveAttribute(
      "data-contract",
      "erp-density-readiness",
    );

    const table = page.getByRole("table", {
      name: "ERP transaction register",
    });
    await expect(table).toBeVisible();
    await expect(table.getByRole("row")).toHaveCount(6);
    await expect(page.getByText("7 matches", { exact: true })).toBeVisible();

    const firstRecord = table.locator("tbody tr").first();
    await firstRecord.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "JV-260911-1042" }),
    ).toBeVisible();
    const detail = page.getByRole("dialog", { name: "JV-260911-1042" });
    await expect(
      detail.locator('[aria-label="Transaction facts"]').getByText("$18,400", {
        exact: true,
      }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close detail drawer" }).click();
    await expect(
      page.getByRole("dialog", { name: "JV-260911-1042" }),
    ).not.toBeVisible();

    const amountHeader = table.getByRole("columnheader", { name: "Amount" });
    await amountHeader.getByRole("button").click();
    await expect(amountHeader).toHaveAttribute("aria-sort", "ascending");

    await table.getByRole("checkbox", { name: "Select txn-1012" }).check();
    await expect(
      page.getByText("1 records selected", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Export selection" }),
    ).toBeVisible();

    await page
      .getByRole("searchbox", { name: "Search ERP records" })
      .fill("JV-260911-1042");
    await expect(table.getByRole("row")).toHaveCount(2);
    await expect(
      page.getByText("JV-260911-1042", { exact: true }),
    ).toBeVisible();

    await expect(page.getByTestId("erp-form-density")).toBeVisible();
    await expect(
      page.getByRole("table", { name: "Journal line editor" }),
    ).toBeVisible();
    await expect(page.getByTestId("erp-approval-panel")).toBeVisible();
    await expect(page.getByTestId("erp-state-coverage")).toBeVisible();
    await expect(page.getByTestId("erp-read-only-state")).toBeVisible();
    await expect(
      page.getByRole("img", {
        name: "Posting volume and review amount by day",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Records by processing state" }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Review state distribution" }),
    ).toBeVisible();

    await page.addScriptTag({ content: axe.source });
    const violations = await page
      .getByTestId("erp-data-dense-reference")
      .evaluate(async (node) => {
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

  test("keeps the dense reference bounded across responsive shell bands", async ({
    page,
  }) => {
    for (const viewport of q08Viewports) {
      await page.setViewportSize(viewport);
      await openErpReference(page);

      const overflow = await pageOverflow(page);
      expect(overflow.document, viewport.id).toBeLessThanOrEqual(
        overflow.viewport + 1,
      );
      expect(overflow.body, viewport.id).toBeLessThanOrEqual(
        overflow.viewport + 1,
      );
      await expect(
        page.getByRole("table", { name: "ERP transaction register" }),
      ).toBeVisible();

      const sidebar = page.locator(".t7-app-sidebar");
      const mobileMenu = page.locator(".t7-app-mobile-menu");
      if (viewport.width >= 861) {
        await expect(sidebar).toBeVisible();
        await expect(mobileMenu).toBeHidden();
      } else {
        await expect(sidebar).toBeHidden();
        await expect(mobileMenu).toBeVisible();
        expect((await mobileMenu.boundingBox())?.height).toBeGreaterThanOrEqual(
          44,
        );
      }
    }
  });
});
