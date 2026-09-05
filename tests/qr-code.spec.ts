import { expect, test } from "@playwright/test";

const value = "aapmmobile://kandang/KDG11F378DFCFC/produksi";

test.describe("QR code reference", () => {
  test("renders an accessible value with copy and print actions", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/components/qr-code");

    const qr = page.locator(".t7-qr-code");
    await expect(
      page.getByRole("heading", { name: "QR Code", exact: true }),
    ).toBeVisible();
    await expect(qr).toHaveCount(1);
    await expect(qr.locator("svg")).toHaveAttribute("role", "img");
    await expect(qr.locator("svg title")).toHaveText("Cage production entry");
    await expect(qr.locator("svg desc")).toContainText("AAPM Mobile");
    await expect(qr.locator("code")).toHaveText(value);
    await expect(qr.locator("path")).toHaveAttribute("d", /^M/);
    await expect(qr).toHaveScreenshot("qr-code-desktop.png", {
      animations: "disabled",
      caret: "hide",
    });

    await page.context().grantPermissions(["clipboard-write"], {
      origin: "http://127.0.0.1:4178",
    });
    await qr.getByRole("button", { name: "Copy value" }).click();
    await expect(qr.locator("output")).toHaveText(
      /Value copied|Copy unavailable/,
    );

    await page.evaluate(() => {
      document.body.dataset.printCalled = "false";
      window.print = () => {
        document.body.dataset.printCalled = "true";
      };
    });
    await qr.getByRole("button", { name: "Print QR" }).click();
    await expect
      .poll(() => page.locator("body").getAttribute("data-print-called"))
      .toBe("true");
  });

  test("keeps the QR mark and actions usable on a narrow viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/components/qr-code");

    const qr = page.locator(".t7-qr-code");
    await expect(qr).toBeVisible();
    await expect(qr.locator("svg")).toBeVisible();
    await expect(qr.getByRole("button", { name: "Copy value" })).toBeVisible();
    await expect(qr.getByRole("button", { name: "Print QR" })).toBeVisible();
    await expect
      .poll(() =>
        qr.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return Math.max(
            element.scrollWidth - element.clientWidth,
            rect.right - innerWidth,
          );
        }),
      )
      .toBeLessThanOrEqual(1);
    await expect(qr).toHaveScreenshot("qr-code-mobile.png", {
      animations: "disabled",
      caret: "hide",
    });
  });
});
