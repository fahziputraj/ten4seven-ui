import { expect, test } from "@playwright/test";

test.describe("Component Lab section navigation", () => {
  test("keeps desktop tabs on one row and anchors content below the sticky rail", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-editors-builders-ai");

    const navigation = page.getByRole("navigation", {
      name: "Component Lab sections",
    });
    await expect(navigation).toBeVisible();

    const geometry = await navigation.evaluate((nav) => {
      const links = [
        ...nav.querySelectorAll(".t7-section-navigation-desktop a"),
      ];
      const navRect = nav.getBoundingClientRect();
      const target = document.querySelector<HTMLElement>(
        "#component-lab-editors-builders-ai",
      );
      const targetRect = target?.getBoundingClientRect();
      const linkTops = links.map((link) => link.getBoundingClientRect().top);
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        navBottom: navRect.bottom,
        targetTop: targetRect?.top ?? 0,
        linkTopRange: Math.max(...linkTops) - Math.min(...linkTops),
        desktopVisible:
          getComputedStyle(nav.querySelector(".t7-section-navigation-desktop")!)
            .display !== "none",
      };
    });

    expect(geometry.desktopVisible).toBe(true);
    expect(geometry.linkTopRange).toBeLessThanOrEqual(1);
    expect(geometry.navBottom).toBeLessThanOrEqual(geometry.targetTop + 1);
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
  });

  test("keeps the compact mobile section control clear of the anchored proof", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/component-lab#component-lab-editors-builders-ai");

    const navigation = page.getByRole("navigation", {
      name: "Component Lab sections",
    });
    await expect(
      navigation.locator(".t7-section-navigation-mobile"),
    ).toBeVisible();

    const geometry = await navigation.evaluate((nav) => {
      const navRect = nav.getBoundingClientRect();
      const targetRect = document
        .querySelector<HTMLElement>("#component-lab-editors-builders-ai")
        ?.getBoundingClientRect();
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        navBottom: navRect.bottom,
        targetTop: targetRect?.top ?? 0,
      };
    });

    expect(geometry.navBottom).toBeLessThanOrEqual(geometry.targetTop + 1);
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
  });
});
