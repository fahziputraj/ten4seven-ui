import { expect, test } from "@playwright/test";

const profiles = [
  { id: "neutral-product", route: "/brand-proof/auth-neutral" },
  { id: "aapm-academy", route: "/brand-proof/auth-aapm-academy" },
] as const;

const responsiveViewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 840, height: 900 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow-mobile", width: 360, height: 800 },
];

async function inspectProof(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const main = document.querySelector("main");
    const frame = document.querySelector(".brand-proof-frame");
    const media = document.querySelector(".brand-proof-media");
    const form = document.querySelector("form");
    const rect = (element: Element | null) => {
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return {
        bottom: Math.round(box.bottom),
        height: Math.round(box.height),
        left: Math.round(box.left),
        right: Math.round(box.right),
        top: Math.round(box.top),
        width: Math.round(box.width),
      };
    };
    return {
      agentOwned: main?.getAttribute("data-agent-owned-brand-decisions"),
      brand: main?.getAttribute("data-brand-profile"),
      canonicalComponents: main?.getAttribute("data-canonical-components"),
      composition: frame?.getAttribute("data-composition"),
      fieldCount: form?.querySelectorAll("input").length,
      formButtons: [...(form?.querySelectorAll("button") ?? [])].map(
        (button) =>
          button.getAttribute("aria-label") ?? button.textContent?.trim(),
      ),
      formRect: rect(form),
      frameGrid: frame ? getComputedStyle(frame).gridTemplateColumns : "",
      headingLevels: [...document.querySelectorAll("h1,h2,h3")].map(
        (heading) => heading.tagName,
      ),
      mediaFilter: media
        ? getComputedStyle(media.querySelector("img")!).filter
        : "",
      mediaRect: rect(media),
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      profileControls: [
        ...document.querySelectorAll("[data-profile-option]"),
      ].map((control) => control.textContent?.trim()),
    };
  });
}

test.describe("bounded Brand Expression Slice B", () => {
  test("keeps one Authentication anatomy while profiles resolve different visual character", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const snapshots = [];
    for (const profile of profiles) {
      await page.goto(profile.route);
      await expect(page.locator("main")).toBeVisible();
      const snapshot = await inspectProof(page);
      expect(snapshot.overflow).toBeLessThanOrEqual(1);
      expect(snapshot.brand).toBe(profile.id);
      expect(snapshot.agentOwned).toBe("0");
      expect(snapshot.canonicalComponents).toBe(
        "Surface,Input,PasswordInput,ActionFooter",
      );
      expect(snapshot.fieldCount).toBe(3);
      expect(snapshot.formButtons).toEqual([
        "Show password",
        "Recover access",
        "Continue",
      ]);
      expect(snapshot.headingLevels).toEqual(["H1", "H2"]);
      expect(snapshot.profileControls).toEqual([
        "Neutral product",
        "AAPM Academy",
      ]);
      snapshots.push(snapshot);
    }

    expect(snapshots[0].composition).toBe("centered");
    expect(snapshots[1].composition).toBe("split");
    expect(snapshots[0].frameGrid).not.toBe(snapshots[1].frameGrid);
    expect(snapshots[0].mediaRect?.width).toBeLessThan(
      snapshots[1].mediaRect?.width ?? 0,
    );
    expect(snapshots[0].mediaFilter).not.toBe(snapshots[1].mediaFilter);
    expect(snapshots[0].formRect?.width).not.toBe(snapshots[1].formRect?.width);
  });

  for (const viewport of responsiveViewports) {
    test(`both profiles stay bounded at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      for (const profile of profiles) {
        await page.goto(profile.route);
        await expect(page.locator("main")).toBeVisible();
        const snapshot = await inspectProof(page);
        expect(snapshot.overflow).toBeLessThanOrEqual(1);
        expect(snapshot.formRect?.left).toBeGreaterThanOrEqual(0);
        expect(snapshot.formRect?.right).toBeLessThanOrEqual(viewport.width);
        expect(snapshot.mediaRect?.left).toBeGreaterThanOrEqual(0);
        expect(snapshot.mediaRect?.right).toBeLessThanOrEqual(viewport.width);
        expect(snapshot.fieldCount).toBe(3);
        expect(snapshot.canonicalComponents).toBe(
          "Surface,Input,PasswordInput,ActionFooter",
        );
      }
    });
  }

  test("preserves the canonical form interaction and profile navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/brand-proof/auth-neutral");

    await page.getByRole("button", { name: "Show password" }).click();
    await expect(
      page.getByRole("button", { name: "Hide password" }),
    ).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute(
      "type",
      "text",
    );

    await page.getByLabel("Email address").fill("demo@example.com");
    await page.locator('input[name="password"]').fill("not-a-real-password");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await expect(page.getByRole("status")).toContainText(
      "Demo submission received",
    );

    await page
      .getByRole("button", { name: "AAPM Academy", exact: true })
      .click();
    await expect(page).toHaveURL(/\/brand-proof\/auth-aapm-academy$/);
    await expect(page.locator("main")).toHaveAttribute(
      "data-brand-profile",
      "aapm-academy",
    );
  });
});
