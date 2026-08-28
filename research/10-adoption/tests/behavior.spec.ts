import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

import { expect, test, type Page } from "@playwright/test";

const operationalUrl = "http://127.0.0.1:4181";
const publicUrl = "http://127.0.0.1:4182";
const evidenceDirectory = process.env.ADOPTION_EVIDENCE_DIR
  ? resolve(process.env.ADOPTION_EVIDENCE_DIR)
  : undefined;
const evidencePhase = process.env.ADOPTION_PHASE ?? "run";

function capture(page: Page, name: string) {
  if (!evidenceDirectory) return Promise.resolve();
  mkdirSync(evidenceDirectory, { recursive: true });
  return page.screenshot({
    fullPage: true,
    path: resolve(evidenceDirectory, `${evidencePhase}-${name}.png`),
  });
}

function captureConsoleHealth(page: Page) {
  const messages: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning")
      messages.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => messages.push(`pageerror: ${error.message}`));
  return messages;
}

async function assertSurfaceHealth(page: Page) {
  await expect(page.locator("main")).toHaveCount(1);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBeTruthy();
}

async function clickNavigation(page: Page, label: string) {
  const link = page.getByRole("link", { name: new RegExp(label) });
  if ((await link.count()) > 0 && (await link.first().isVisible())) {
    await link.first().click();
    return;
  }
  await page.getByRole("button", { name: new RegExp(`^${label}$`) }).click();
}

test("operational consumer preserves the receipt workflow", async ({
  page,
}) => {
  const consoleMessages = captureConsoleHealth(page);

  await page.goto(`${operationalUrl}/operations`);
  await expect(page).toHaveTitle("Ledgerly Operations");
  await expect(
    page.getByRole("heading", { name: "Inbound receipts" }),
  ).toBeVisible();
  await assertSurfaceHealth(page);
  await capture(page, "operational-desktop");

  await page.getByLabel("Search receipts").fill("Northstar");
  await expect(page.getByRole("row", { name: /RCV-1042/ })).toBeVisible();
  await expect(page.getByRole("row", { name: /RCV-1041/ })).toHaveCount(0);

  await page.getByLabel("Search receipts").fill("");
  await page
    .locator('select[aria-label="Status filter"]')
    .selectOption({ label: "Scheduled" });
  await expect(page.getByRole("row", { name: /RCV-1041/ })).toBeVisible();
  await expect(page.getByRole("row", { name: /RCV-1042/ })).toHaveCount(0);

  await clickNavigation(page, "Inventory");
  await expect(page.getByRole("heading", { name: "Inventory" })).toBeVisible();
  await clickNavigation(page, "Receipts");
  await expect(
    page.getByRole("heading", { name: "Inbound receipts" }),
  ).toBeVisible();

  await page.getByTestId("create-receipt").click();
  await expect(page).toHaveURL(/\/operations\/receipts\/new$/);
  await page.getByLabel("Supplier").fill("Meridian Tools");
  await page.getByLabel("Unit count").fill("64");
  await page.getByLabel("Dock notes").fill("Keep the cartons together.");
  await page.getByRole("button", { name: "Save receipt" }).click();
  await expect(
    page.getByText("RCV-1043 created", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("row", { name: /RCV-1043/ })).toBeVisible();

  await page.getByRole("button", { name: "Open RCV-1042" }).click();
  const detail = page.getByRole("dialog", { name: /RCV-1042/ });
  await expect(detail).toBeVisible();
  await detail.getByRole("button", { name: "Mark as received" }).click();
  await expect(detail.getByText("Received", { exact: true })).toBeVisible();
  await detail
    .getByRole("button", { name: /Close (receipt details|detail drawer)/ })
    .click();
  await expect(detail).toBeHidden();

  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto(`${operationalUrl}/operations`);
  await expect(
    page.getByRole("heading", { name: "Inbound receipts" }),
  ).toBeVisible();
  await assertSurfaceHealth(page);
  await capture(page, "operational-mobile");
  expect(consoleMessages).toEqual([]);
});

test("public consumer preserves catalog and cart behavior", async ({
  page,
}) => {
  const consoleMessages = captureConsoleHealth(page);

  await page.goto(publicUrl);
  await expect(page).toHaveTitle("Common Ground Library");
  await expect(
    page.getByRole("heading", { name: "Make room for better decisions." }),
  ).toBeVisible();
  await assertSurfaceHealth(page);
  await capture(page, "public-home-desktop");

  await page.getByRole("button", { name: "Browse the library" }).click();
  await expect(page).toHaveURL(/\/catalog$/);
  await expect(
    page.getByRole("heading", { name: "Find your next useful read." }),
  ).toBeVisible();

  await page.getByLabel("Search library").fill("Practical");
  await expect(
    page.getByRole("heading", { name: "Practical Type" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Building Calm Products" }),
  ).toHaveCount(0);
  await page.getByLabel("Search library").fill("");
  await page
    .locator('select[aria-label="Collection filter"]')
    .selectOption({ label: "Practice" });
  await expect(
    page.getByRole("heading", { name: "Practical Type" }),
  ).toBeVisible();
  await expect(page.getByText("1 titles", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "View details" }).click();
  const productDetail = page.getByRole("dialog", { name: /Practical Type/ });
  await expect(productDetail).toBeVisible();
  await productDetail.getByRole("button", { name: /Add to cart/ }).click();
  await expect(productDetail).toBeHidden();

  await page.getByTestId("open-cart").click();
  const cart = page.getByRole("dialog", { name: /Shopping cart/ });
  await expect(cart).toBeVisible();
  await expect(cart.getByText("Practical Type", { exact: true })).toBeVisible();
  await cart.getByRole("button", { name: /Increase.*Practical Type/ }).click();
  await expect(
    cart.locator('output[aria-label="Quantity for Practical Type"]'),
  ).toHaveText("2");
  await cart
    .getByRole("button", { name: /Remove Practical Type from cart/ })
    .click();
  await expect(
    cart.getByText("Your cart is empty", { exact: false }),
  ).toBeVisible();
  await cart
    .getByRole("button", { name: /Close (shopping cart|detail drawer)/ })
    .click();

  await clickNavigation(page, "Guides");
  await expect(
    page.getByRole("heading", { name: "Reading paths for busy weeks." }),
  ).toBeVisible();

  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto(`${publicUrl}/catalog`);
  await expect(
    page.getByRole("heading", { name: "Find your next useful read." }),
  ).toBeVisible();
  await assertSurfaceHealth(page);
  await capture(page, "public-mobile");
  expect(consoleMessages).toEqual([]);
});
