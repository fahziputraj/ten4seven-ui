import { expect, test } from "@playwright/test";

const themeCases = [
  {
    appearance: "light",
    palette: "emerald",
    radius: "soft",
    density: "default",
  },
  { appearance: "dark", palette: "red", radius: "sharp", density: "compact" },
  {
    appearance: "light",
    palette: "orange",
    radius: "rounded",
    density: "comfortable",
  },
  { appearance: "dark", palette: "blue", radius: "soft", density: "dense" },
  {
    appearance: "light",
    palette: "slate",
    radius: "sharp",
    density: "default",
  },
] as const;

const consumers = [
  { name: "operational", baseUrl: "http://127.0.0.1:4181/operations" },
  { name: "public", baseUrl: "http://127.0.0.1:4182/catalog" },
];

test("adoption consumers honor the shared theme axes", async ({ page }) => {
  const messages: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning")
      messages.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => messages.push(`pageerror: ${error.message}`));

  for (const consumer of consumers)
    for (const theme of themeCases) {
      const query = new URLSearchParams(theme).toString();
      await page.goto(`${consumer.baseUrl}?${query}`);
      const provider = page.locator(".t7-provider");
      await expect(provider).toHaveAttribute(
        "data-theme-appearance",
        theme.appearance,
      );
      await expect(provider).toHaveAttribute("data-palette", theme.palette);
      await expect(provider).toHaveAttribute("data-radius", theme.radius);
      await expect(provider).toHaveAttribute("data-density", theme.density);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBeTruthy();
    }

  expect(messages).toEqual([]);
});

test("a CSS-first consumer receives the recipe without a provider", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4182/css-first-proof");

  const proof = page.getByTestId("adoption-css-first-proof");
  await expect(proof).toBeVisible();
  await expect(page.locator(".t7-provider")).toHaveCount(0);
  await expect(proof).toHaveAttribute("data-t7-theme", "commerce");
  await expect(proof).toHaveAttribute("data-t7-mode", "dark");
  await expect(proof).toHaveAttribute("data-t7-density", "compact");
  await expect(proof).toHaveAttribute("data-t7-contrast", "more");
  await expect(proof).toHaveAttribute("data-t7-motion-preference", "reduced");
  expect(
    await proof.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        controlHeight: style.getPropertyValue("--t7-control-height").trim(),
        recipe: style.getPropertyValue("--t7-theme-recipe").trim(),
      };
    }),
  ).toEqual({ controlHeight: "36px", recipe: "commerce" });
});
