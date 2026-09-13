import { expect, test } from "@playwright/test";

const profiles = [
  { id: "neutral-product", route: "/brand-proof/auth-neutral" },
  { id: "aapm-academy", route: "/brand-proof/auth-aapm-academy" },
] as const;

const responsiveViewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function inspectProof(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const main = document.querySelector(".brand-proof-page");
    const frame = document.querySelector(".brand-proof-frame");
    const authPane = document.querySelector(".brand-proof-auth-pane");
    const mediaPane = document.querySelector(".brand-proof-media-pane");
    const media = document.querySelector(".brand-proof-media");
    const form = document.querySelector("form");
    const submit = document.querySelector(
      ".brand-proof-primary-action .t7-button",
    );
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
    const image = media?.querySelector("img");
    return {
      agentOwned: main?.getAttribute("data-agent-owned-brand-decisions"),
      authPaneRect: rect(authPane),
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
      imageObjectFit: image ? getComputedStyle(image).objectFit : "",
      mediaBorderRadius: media ? getComputedStyle(media).borderRadius : "",
      mediaPaneRect: rect(mediaPane),
      mediaRect: rect(media),
      mediaTransform: image ? getComputedStyle(image).transform : "",
      metaDescription:
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ?? "",
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      pageRect: rect(main),
      pageScrollHeight: document.documentElement.scrollHeight,
      pageClientHeight: document.documentElement.clientHeight,
      profileControls: [
        ...document.querySelectorAll("[data-profile-option]"),
      ].map((control) => control.textContent?.trim()),
      recoveryText: document
        .querySelector(".brand-proof-recovery")
        ?.textContent?.trim(),
      submitRect: rect(submit),
      visibleText: main?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      authBorderRadius: authPane ? getComputedStyle(authPane).borderRadius : "",
    };
  });
}

test.describe("bounded H01A Authentication composition", () => {
  test("exposes the Q03 AAPM adapter without duplicating component families", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/theme-studio");

    const disclosure = page.getByRole("button", {
      name: /AAPM profile adapter/,
    });
    await expect(disclosure).toHaveAttribute("aria-expanded", "false");
    await disclosure.click();

    const proof = page.getByTestId("studio-aapm-profile-proof");
    await expect(proof).toHaveAttribute("data-adapter", "aapm-core");
    await expect(proof.locator("[data-profile]")).toHaveCount(6);
    for (const profile of [
      "aapm-core",
      "aapm-farm",
      "aapm-operations",
      "aapm-erp",
      "aapm-academy",
      "aapm-public",
    ]) {
      await expect(proof.locator(`[data-profile="${profile}"]`)).toBeVisible();
    }
  });

  test("uses one approved split composition for both profiles", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const snapshots = [];
    for (const profile of profiles) {
      await page.goto(profile.route);
      await expect(page.locator(".brand-proof-page")).toBeVisible();
      const snapshot = await inspectProof(page);
      expect(snapshot.overflow).toBeLessThanOrEqual(1);
      expect(snapshot.brand).toBe(profile.id);
      expect(snapshot.agentOwned).toBe("0");
      expect(snapshot.canonicalComponents).toBe(
        "Surface,Input,PasswordInput,ActionFooter",
      );
      expect(snapshot.composition).toBe("split");
      expect(snapshot.fieldCount).toBe(2);
      expect(snapshot.formButtons).toEqual(["Show password", "Masuk"]);
      expect(snapshot.recoveryText).toBe("Lupa kata sandi?");
      expect(snapshot.headingLevels).toEqual(["H1"]);
      expect(snapshot.profileControls).toEqual([]);
      expect(snapshot.visibleText).not.toContain("Brand expression proof");
      expect(snapshot.visibleText).not.toContain("Same Authentication recipe");
      expect(snapshot.visibleText).not.toContain("Consumer media slot");
      expect(snapshot.visibleText).not.toContain("design-system");
      expect(snapshot.metaDescription).not.toContain("Brand expression proof");
      expect(snapshot.pageRect?.left).toBe(0);
      expect(snapshot.pageRect?.top).toBe(0);
      expect(snapshot.pageRect?.width).toBe(1440);
      expect(snapshot.pageRect?.height).toBe(900);
      expect(snapshot.authPaneRect?.left).toBe(0);
      expect(snapshot.authPaneRect?.width ?? 0).toBeGreaterThanOrEqual(576);
      expect(snapshot.authPaneRect?.width ?? 0).toBeLessThanOrEqual(720);
      expect(snapshot.mediaPaneRect?.left).toBe(snapshot.authPaneRect?.right);
      expect(snapshot.mediaPaneRect?.right).toBe(1440);
      expect(snapshot.mediaPaneRect?.top).toBe(0);
      expect(snapshot.mediaPaneRect?.height).toBe(900);
      expect(snapshot.mediaRect?.width).toBe(snapshot.mediaPaneRect?.width);
      expect(snapshot.mediaRect?.height).toBe(900);
      expect(snapshot.formRect?.width ?? 0).toBeLessThanOrEqual(421);
      expect(snapshot.formRect?.left ?? 0).toBeGreaterThanOrEqual(
        snapshot.authPaneRect?.left ?? 0,
      );
      expect(snapshot.formRect?.right ?? 1441).toBeLessThanOrEqual(
        snapshot.authPaneRect?.right ?? 1440,
      );
      expect(snapshot.submitRect?.width).toBe(snapshot.formRect?.width);
      expect(snapshot.authBorderRadius).toBe("0px");
      expect(snapshot.mediaBorderRadius).toBe("0px");
      expect(snapshot.imageObjectFit).toBe("cover");
      expect(snapshot.pageScrollHeight).toBeLessThanOrEqual(
        snapshot.pageClientHeight + 1,
      );
      snapshots.push(snapshot);
    }

    expect(snapshots[0].frameGrid).toBe(snapshots[1].frameGrid);
    expect(snapshots[0].authPaneRect?.width).toBe(
      snapshots[1].authPaneRect?.width,
    );
    expect(snapshots[0].mediaPaneRect?.width).toBe(
      snapshots[1].mediaPaneRect?.width,
    );
  });

  for (const viewport of responsiveViewports) {
    test(`stays bounded and task-focused at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      for (const profile of profiles) {
        await page.goto(profile.route);
        await expect(page.locator(".brand-proof-page")).toBeVisible();
        const snapshot = await inspectProof(page);
        expect(snapshot.overflow).toBeLessThanOrEqual(1);
        expect(snapshot.formRect?.left).toBeGreaterThanOrEqual(0);
        expect(snapshot.formRect?.right).toBeLessThanOrEqual(viewport.width);
        expect(snapshot.mediaRect?.left).toBeGreaterThanOrEqual(0);
        expect(snapshot.mediaRect?.right).toBeLessThanOrEqual(viewport.width);
        expect(snapshot.authPaneRect?.left).toBeGreaterThanOrEqual(0);
        expect(snapshot.authPaneRect?.right).toBeLessThanOrEqual(
          viewport.width,
        );
        expect(snapshot.mediaPaneRect?.left).toBeGreaterThanOrEqual(0);
        expect(snapshot.mediaPaneRect?.right).toBeLessThanOrEqual(
          viewport.width,
        );
        expect(snapshot.fieldCount).toBe(2);
        expect(snapshot.formButtons).toEqual(["Show password", "Masuk"]);
        expect(snapshot.profileControls).toEqual([]);
        expect(snapshot.visibleText).not.toContain("Brand expression proof");

        if (viewport.width <= 760) {
          expect(snapshot.mediaPaneRect?.top ?? 0).toBeGreaterThanOrEqual(
            snapshot.authPaneRect?.bottom ?? 0,
          );
          expect(snapshot.mediaPaneRect?.height ?? 0).toBeGreaterThanOrEqual(
            220,
          );
        } else {
          expect(snapshot.mediaPaneRect?.top).toBe(0);
          expect(snapshot.mediaPaneRect?.height).toBe(viewport.height);
        }
      }
    });
  }

  test("separates password label, help description, and visibility action", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/brand-proof/auth-aapm-academy");

    const password = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    await expect(password).toHaveAttribute("aria-describedby", /hint/);
    await expect(password).toHaveAccessibleName("Password");
    await expect(
      page.getByRole("button", { name: "Show password", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: /Use at least 8 characters/,
      }),
    ).toHaveCount(0);
    await expect(page.getByText("Use at least 8 characters.")).toBeVisible();
  });

  test("preserves the canonical form interaction on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/brand-proof/auth-aapm-academy");

    await page.getByRole("button", { name: "Show password" }).click();
    await expect(
      page.getByRole("button", { name: "Hide password" }),
    ).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute(
      "type",
      "text",
    );

    await page.getByLabel("Email", { exact: true }).fill("demo@example.com");
    await page.locator('input[name="password"]').fill("not-a-real-password");
    await page.getByRole("button", { name: "Masuk", exact: true }).click();
    await expect(page.getByRole("status")).toContainText(
      "Permintaan masuk diterima",
    );
  });

  test("removes the route entrance blank state and honors reduced motion", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/brand-proof/auth-aapm-academy");

    await expect(page.locator(".brand-proof-page")).toBeVisible();
    await expect(page.locator(".playground-route-surface")).toHaveAttribute(
      "data-route-immediate",
      "true",
    );
    const snapshot = await inspectProof(page);
    expect(snapshot.mediaTransform).toBe("none");
  });

  test("keeps the approved composition in dark mode when the host enables it", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "ten4seven.playground.theme-studio.v1",
        JSON.stringify({
          schemaVersion: "1.0",
          baseRecipe: "product",
          productProfile: "neutral-product",
          runtime: { appearance: "dark" },
          overrides: {},
        }),
      );
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/brand-proof/auth-aapm-academy");

    await expect(page.locator(".brand-proof-page")).toBeVisible();
    await expect(page.locator(".brand-proof-theme-scope")).toHaveAttribute(
      "data-t7-mode",
      "dark",
    );
    const snapshot = await inspectProof(page);
    expect(snapshot.composition).toBe("split");
    expect(snapshot.overflow).toBeLessThanOrEqual(1);
    expect(snapshot.authBorderRadius).toBe("0px");
    expect(snapshot.mediaBorderRadius).toBe("0px");
  });
});
