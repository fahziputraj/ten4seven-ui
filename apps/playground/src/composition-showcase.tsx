import {
  COMPOSITION_BLOCK_FAMILIES,
  COMPOSITION_BLOCKS,
  COMPOSITION_CONTRACT,
  COMPOSITION_RECIPES,
  COMPOSITION_RECIPE_FAMILIES,
  NATIVE_COMPOSITION_CANARY,
  PRODUCT_PROFILE_CAPABILITIES,
  PRODUCT_PROFILE_IDS,
  resolveCompositionLayers,
  type BrandProfileId,
} from "@ten4seven/contracts";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ThemeScope,
  Typography,
} from "@ten4seven/ui";

export type CompositionShowcaseMode = "blocks" | "recipes";

const representativeBlock = COMPOSITION_BLOCKS["decision-workspace-evidence"];
const representativeRecipe = COMPOSITION_RECIPES["queue-detail"];
const representativeResolution = resolveCompositionLayers({
  BASE_RECIPE: { recipe: "enterprise" },
  PRODUCT_PROFILE: { profile: "aapm-operations" },
});

function ProfileComparison() {
  return (
    <section
      className="library-section composition-profile-proof"
      data-testid="u11-profile-comparison"
    >
      <div className="library-section-heading">
        <div>
          <Typography as="h2" typeRole="heading-lg">
            One composition, many product profiles
          </Typography>
          <Typography typeRole="body-sm">
            The same review workspace slots stay intact while the canonical
            profile selects presentation tendencies. Profiles do not fork
            component contracts or business meaning.
          </Typography>
        </div>
        <Badge tone="success">Shared semantic intent</Badge>
      </div>
      <div className="catalog-preview-profile-grid composition-profile-grid">
        {PRODUCT_PROFILE_IDS.map((profileId: BrandProfileId) => {
          const profile = PRODUCT_PROFILE_CAPABILITIES[profileId];
          return (
            <ThemeScope
              className="composition-profile-scope"
              data-t7-profile={profileId}
              key={profileId}
              preferences={{ density: profile.densityTendency }}
              theme={profile.themeRecipe}
            >
              <Card
                className="composition-profile-card"
                data-profile-id={profileId}
                data-profile-recipe={profile.themeRecipe}
                data-testid="u11-profile-card"
              >
                <CardHeader>
                  <div className="composition-profile-card-heading">
                    <div>
                      <CardTitle>Review workspace</CardTitle>
                      <CardDescription>
                        {profile.displayName} · {profile.product}
                      </CardDescription>
                    </div>
                    <Badge
                      tone={
                        profile.brandExpression === "AAPM Brand Core"
                          ? "success"
                          : "neutral"
                      }
                    >
                      {profile.displayName}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="composition-profile-card-content">
                  <Typography typeRole="body-sm">
                    Context · evidence · next action
                  </Typography>
                  <Typography typeRole="caption">
                    Density: {profile.densityTendency} · Surface:{" "}
                    {profile.surfaceTendency}
                  </Typography>
                  <Button intent="secondary" size="sm">
                    Open workspace
                  </Button>
                </CardContent>
              </Card>
            </ThemeScope>
          );
        })}
      </div>
    </section>
  );
}

function FamilySummary({ mode }: { mode: CompositionShowcaseMode }) {
  const families =
    mode === "blocks"
      ? COMPOSITION_BLOCK_FAMILIES
      : COMPOSITION_RECIPE_FAMILIES;
  const entries = mode === "blocks" ? COMPOSITION_BLOCKS : COMPOSITION_RECIPES;
  return (
    <div className="catalog-preview-metrics composition-plane-metrics">
      {families.map((family) => (
        <div key={family}>
          <Typography typeRole="overline">{family}</Typography>
          <Typography typeRole="heading-sm">
            {
              Object.values(entries).filter((entry) => entry.family === family)
                .length
            }
          </Typography>
          <Typography typeRole="caption">
            {mode === "blocks" ? "bounded regions" : "reusable arrangements"}
          </Typography>
        </div>
      ))}
    </div>
  );
}

function ContractProof({ mode }: { mode: CompositionShowcaseMode }) {
  const block = representativeBlock;
  const recipe = representativeRecipe;
  const queueCanary = Object.values(NATIVE_COMPOSITION_CANARY.recipes).find(
    (candidate) => candidate.id === "queue-detail",
  );
  return (
    <section
      className="library-section composition-contract-proof"
      data-testid={
        mode === "blocks" ? "u11-block-composition" : "u11-recipe-composition"
      }
    >
      <div className="library-section-heading">
        <div>
          <Typography as="h2" typeRole="heading-lg">
            {mode === "blocks"
              ? "Representative block contract"
              : "Representative recipe contract"}
          </Typography>
          <Typography typeRole="body-sm">
            Typed intent is resolved before a renderer chooses DOM, native
            primitives, or an adaptive presentation.
          </Typography>
        </div>
        <Badge tone="primary">
          {mode === "blocks" ? block.platform : recipe.platform}
        </Badge>
      </div>
      <div className="catalog-guidance-grid composition-contract-grid">
        <div>
          <Typography typeRole="overline">
            {mode === "blocks" ? block.family : recipe.family}
          </Typography>
          <Typography as="h3" typeRole="heading-md">
            {mode === "blocks" ? block.displayName : recipe.displayName}
          </Typography>
          <Typography className="catalog-preview-note" typeRole="body-sm">
            {mode === "blocks" ? block.intent : recipe.intent}
          </Typography>
        </div>
        <div>
          <Typography typeRole="overline">Ownership boundary</Typography>
          <Typography className="catalog-preview-note" typeRole="body-sm">
            {mode === "blocks"
              ? block.boundaries.consumerOwns.join(" ")
              : recipe.boundaries.consumerOwns.join(" ")}
          </Typography>
        </div>
      </div>
      <div className="catalog-preview-profile-grid composition-contract-details">
        <div>
          <Typography typeRole="overline">
            Required {mode === "blocks" ? "components" : "blocks"}
          </Typography>
          <Typography typeRole="body-sm">
            {mode === "blocks"
              ? block.requiredComponents.join(" · ")
              : recipe.blockRoles.required.join(" · ")}
          </Typography>
        </div>
        <div>
          <Typography typeRole="overline">States</Typography>
          <Typography typeRole="body-sm">
            {(mode === "blocks" ? block.states : recipe.states).join(" · ")}
          </Typography>
        </div>
        <div>
          <Typography typeRole="overline">Adaptive intent</Typography>
          <Typography typeRole="body-sm">
            {mode === "blocks"
              ? block.responsive.mobile
              : recipe.responsive.mobile}
          </Typography>
        </div>
        <div>
          <Typography typeRole="overline">Native presentation</Typography>
          <Typography typeRole="body-sm">
            {mode === "blocks"
              ? block.responsive.native
              : recipe.responsive.native}
          </Typography>
        </div>
      </div>
      {mode === "recipes" && queueCanary ? (
        <div
          className="composition-native-canary"
          data-testid="u11-native-recipe-canary"
        >
          <Badge tone="success">Native recipe canary</Badge>
          <Typography typeRole="body-sm">
            {queueCanary.presentation} · {queueCanary.primitive}
          </Typography>
          <Typography typeRole="caption">
            {queueCanary.semanticOrder} · CSS parsing:{" "}
            {String(queueCanary.cssParsing)}
          </Typography>
        </div>
      ) : null}
    </section>
  );
}

export function CompositionShowcase({
  mode,
}: {
  mode: CompositionShowcaseMode;
}) {
  const profile = representativeResolution.profile;
  const total =
    mode === "blocks"
      ? Object.keys(COMPOSITION_BLOCKS).length
      : Object.keys(COMPOSITION_RECIPES).length;
  return (
    <div
      className="composition-plane-showcase"
      data-composition-mode={mode}
      data-testid="u11-composition-plane"
      data-t7-composition-density={representativeResolution.values.density}
      data-t7-composition-profile={representativeResolution.values.profile}
      data-t7-composition-recipe={representativeResolution.values.recipe}
    >
      <section className="library-section composition-plane-overview">
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Typed composition plane
            </Typography>
            <Typography typeRole="body-sm">
              {COMPOSITION_CONTRACT.purpose}
            </Typography>
          </div>
          <Badge tone="success">Source: typed contracts</Badge>
        </div>
        <FamilySummary mode={mode} />
        <div className="composition-plane-summary">
          <Typography typeRole="caption">
            {total} {mode} · resolver: system defaults → base recipe → product
            profile → theme override → scoped override → component state
          </Typography>
          <Typography typeRole="caption">
            Preview profile: {profile.displayName} · {profile.themeRecipe} ·{" "}
            {profile.densityTendency}
          </Typography>
        </div>
      </section>
      <ContractProof mode={mode} />
      {mode === "blocks" ? <ProfileComparison /> : null}
    </div>
  );
}
