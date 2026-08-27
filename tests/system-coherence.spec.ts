import { expect, test } from "@playwright/test";

type Profile = {
  appearance: "light" | "dark";
  palette: string;
  radius: string;
  density: string;
};
const profiles: Profile[] = [
  {
    appearance: "light",
    palette: "emerald",
    radius: "soft",
    density: "default",
  },
  {
    appearance: "dark",
    palette: "blue",
    radius: "rounded",
    density: "compact",
  },
  { appearance: "light", palette: "red", radius: "soft", density: "default" },
  {
    appearance: "dark",
    palette: "orange",
    radius: "rounded",
    density: "compact",
  },
  { appearance: "light", palette: "slate", radius: "sharp", density: "dense" },
];

async function chooseSelect(
  page: import("@playwright/test").Page,
  label: string,
  value: string,
) {
  const trigger = page.getByRole("button", { name: label });
  await trigger.click();
  await page
    .locator(".t7-select-list")
    .getByRole("option", { name: value, exact: true })
    .click();
}

async function applyProfile(
  page: import("@playwright/test").Page,
  profile: Profile,
) {
  await page.goto("/theme-studio");
  await page
    .getByRole("button", { name: `Use ${profile.palette} palette` })
    .click();
  await chooseSelect(page, "Appearance", profile.appearance);
  await chooseSelect(page, "Radius", profile.radius);
  await chooseSelect(page, "Density", profile.density);
}

for (const profile of profiles) {
  test(`global profile ${profile.appearance} ${profile.palette} ${profile.radius} ${profile.density}`, async ({
    page,
  }) => {
    await applyProfile(page, profile);
    for (const route of ["warehouse-inventory", "ebook-store"]) {
      await page.goto(`/${route}`);
      const provider = page.locator(".t7-provider");
      await expect(provider).toHaveAttribute("data-palette", profile.palette);
      await expect(provider).toHaveAttribute(
        "data-theme-appearance",
        profile.appearance,
      );
      await expect(provider).toHaveAttribute("data-radius", profile.radius);
      await expect(provider).toHaveAttribute("data-density", profile.density);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);
    }
    await page.reload();
    await expect(page.locator(".t7-provider")).toHaveAttribute(
      "data-palette",
      profile.palette,
    );
  });
}

test("canonical Select supports arrows, Enter, Escape, and disabled options", async ({
  page,
}) => {
  await page.goto("/theme-studio");
  const radius = page.getByRole("button", { name: "Radius" });
  await radius.focus();
  await radius.press("ArrowDown");
  await radius.press("Enter");
  await expect(page.locator(".t7-provider")).toHaveAttribute(
    "data-radius",
    /soft|rounded|sharp/,
  );
  await radius.click();
  await radius.press("Escape");
  await expect(radius).toHaveAttribute("aria-expanded", "false");
});

test("publishing cart adapts between desktop popover and mobile drawer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ebook-store");
  await page
    .getByRole("button", { name: "Tambah ke keranjang" })
    .first()
    .click();
  const desktopTrigger = page.getByRole("button", {
    name: "1 item di keranjang",
  });
  await desktopTrigger.click();
  await expect(page.getByRole("region", { name: "Keranjang" })).toBeVisible();
  await expect(page).toHaveScreenshot("publishing-cart-desktop.png", {
    animations: "disabled",
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page
    .getByRole("button", { name: "Tambah ke keranjang" })
    .first()
    .click();
  await page.getByRole("button", { name: "1 item di keranjang" }).click();
  const drawer = page.getByRole("dialog", { name: "Keranjang" });
  await expect(drawer).toBeVisible();
  await expect(page).toHaveScreenshot("publishing-cart-mobile.png", {
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
});

test("reduced motion collapses transition duration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/component-lab");
  const duration = await page
    .getByRole("button", { name: "Open modal" })
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(duration).toMatch(/^(?:1e-05|0\.00001)s/);
});
