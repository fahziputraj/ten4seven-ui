import { expect, test, type Page } from "@playwright/test";

const showcaseRecipes = [
  {
    expression: "operational",
    label: "Enterprise",
    theme: "enterprise",
  },
  {
    expression: "product",
    label: "Product",
    theme: "product",
  },
  {
    expression: "editorial",
    label: "Editorial",
    theme: "editorial",
  },
  {
    expression: "commerce",
    label: "Commerce",
    theme: "commerce",
  },
] as const;

type ShowcaseStyleProof = {
  actionBackground: string;
  compositionGap: number;
  contentWidth: number;
  edgeColor: string;
  heroBackground: string;
  heroBorderTop: string;
  heroRadius: string;
  heroShadow: string;
  overflow: number;
};

async function clearPersistedPlaygroundTheme(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem("ten4seven.playground.theme.v1");
  });
}

async function inspectShowcase(page: Page): Promise<ShowcaseStyleProof> {
  return page.locator(".public-showcase-shell").evaluate((shell) => {
    const content = shell.querySelector<HTMLElement>(".t7-app-content");
    const hero = shell.querySelector<HTMLElement>(".public-showcase-hero");
    const action = shell.querySelector<HTMLElement>(
      ".public-showcase-hero-primary",
    );
    const showcase = shell.querySelector<HTMLElement>(".public-showcase-page");

    if (!content || !hero || !action || !showcase) {
      throw new Error("Public Showcase composition surface is incomplete.");
    }

    const heroStyle = getComputedStyle(hero);
    return {
      actionBackground: getComputedStyle(action).backgroundColor,
      compositionGap: Number.parseFloat(getComputedStyle(showcase).rowGap),
      contentWidth: Math.round(content.getBoundingClientRect().width),
      edgeColor: getComputedStyle(hero, "::before").backgroundColor,
      heroBackground: heroStyle.backgroundColor,
      heroBorderTop: heroStyle.borderTopWidth,
      heroRadius: heroStyle.borderTopLeftRadius,
      heroShadow: heroStyle.boxShadow,
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });
}

test("Public Showcase keeps four named recipes expressive without a primary-color hero canvas", async ({
  page,
}) => {
  await clearPersistedPlaygroundTheme(page);
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/theme-studio");

  const provider = page.locator(".t7-provider");
  const workbench = page.getByTestId("theme-recipe-workbench");
  const proofs = new Map<string, ShowcaseStyleProof>();

  for (const recipe of showcaseRecipes) {
    await workbench
      .locator(".studio-recipe-options")
      .getByText(recipe.label, { exact: true })
      .click();
    await expect(provider).toHaveAttribute("data-t7-theme", recipe.theme);
    await expect(provider).toHaveAttribute(
      "data-t7-expression",
      recipe.expression,
    );

    // This is deliberate client-side navigation from the workbench so the
    // checked recipe is the one that reaches the consumer route.
    await page
      .getByRole("button", { name: "Public Showcase", exact: true })
      .click();
    await expect(page).toHaveURL(/\/public-showcase$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Build consistent interfaces, faster.",
      }),
    ).toBeVisible();
    await expect(provider).toHaveAttribute("data-t7-theme", recipe.theme);
    await expect(provider).toHaveAttribute(
      "data-t7-expression",
      recipe.expression,
    );

    const proof = await inspectShowcase(page);
    expect(proof.heroBackground).not.toBe(proof.actionBackground);
    expect(proof.heroRadius).toBe("0px");
    expect(proof.heroShadow).toBe("none");
    expect(proof.heroBorderTop).toBe("1px");
    expect(proof.edgeColor).toBe(proof.actionBackground);
    expect(proof.overflow).toBeLessThanOrEqual(1);
    proofs.set(recipe.theme, proof);

    await expect(page).toHaveScreenshot(
      `public-showcase-${recipe.theme}-expression.png`,
      {
        animations: "disabled",
        caret: "hide",
        fullPage: false,
      },
    );

    await page.goBack();
    await expect(page).toHaveURL(/\/theme-studio$/);
    await expect(workbench).toBeVisible();
  }

  const enterprise = proofs.get("enterprise");
  const product = proofs.get("product");
  const editorial = proofs.get("editorial");
  const commerce = proofs.get("commerce");

  expect(enterprise).toBeDefined();
  expect(product).toBeDefined();
  expect(editorial).toBeDefined();
  expect(commerce).toBeDefined();
  expect(enterprise!.contentWidth).toBeGreaterThan(commerce!.contentWidth);
  expect(commerce!.contentWidth).toBeGreaterThan(product!.contentWidth);
  expect(product!.contentWidth).toBeGreaterThan(editorial!.contentWidth);
  expect(enterprise!.compositionGap).toBeLessThan(commerce!.compositionGap);
  expect(commerce!.compositionGap).toBeLessThan(editorial!.compositionGap);
});
