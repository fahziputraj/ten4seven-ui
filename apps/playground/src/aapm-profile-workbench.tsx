import type { CSSProperties } from "react";

import {
  brandAdapter,
  brandProfiles,
} from "@ten4seven/agent/generated";
import type {
  BrandAdapterContract,
  BrandProfile,
  BrandProfileId,
} from "@ten4seven/contracts";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Collapsible,
  Typography,
} from "@ten4seven/ui";
import { T7Icon, type IconName } from "@ten4seven/icons";

const aapmProfileOrder = [
  "aapm-core",
  "aapm-farm",
  "aapm-operations",
  "aapm-erp",
  "aapm-academy",
  "aapm-public",
] as const satisfies readonly BrandProfileId[];

type AapmProfileId = (typeof aapmProfileOrder)[number];

const profileLabels: Record<AapmProfileId, string> = {
  "aapm-core": "AAPM Core",
  "aapm-farm": "Farm Customer",
  "aapm-operations": "Operations",
  "aapm-erp": "ERP",
  "aapm-academy": "Academy",
  "aapm-public": "Public / Corporate",
};

const profileIcons: Record<AapmProfileId, IconName> = {
  "aapm-core": "components",
  "aapm-farm": "farm",
  "aapm-operations": "analytics",
  "aapm-erp": "table",
  "aapm-academy": "book",
  "aapm-public": "palette",
};

const profileDescriptions: Record<AapmProfileId, string> = {
  "aapm-core": "Shared AAPM identity baseline for system surfaces.",
  "aapm-farm": "Visual, informative, and customer-friendly expression.",
  "aapm-operations": "Action-oriented clarity for monitoring and workflow.",
  "aapm-erp": "Restrained density for data and transaction clarity.",
  "aapm-academy": "Learning-led expression with the Academy lockup.",
  "aapm-public": "Generous storytelling for public and corporate surfaces.",
};

const profiles = brandProfiles as unknown as Readonly<
  Record<BrandProfileId, BrandProfile>
>;
const adapter = brandAdapter as unknown as BrandAdapterContract;

function roleColor(profile: BrandProfile, slot: "primary" | "accent") {
  const role = profile.brandRoles?.[slot];
  return role ? adapter.semantic[role].value.value : "transparent";
}

function assetLabel(profile: BrandProfile) {
  return profile.asset.kind === "canonical"
    ? `${profile.asset.collection} master`
    : "consumer-owned";
}

/** A compact, read-only fixture for the Q03 brand adapter/profile contract. */
export function AapmProfileWorkbench() {
  return (
    <Collapsible
      className="studio-aapm-profile-workbench"
      title={
        <span className="studio-aapm-profile-workbench-title">
          <span>AAPM profile adapter</span>
          <small>One brand source · six product expressions</small>
        </span>
      }
    >
      <section
        aria-labelledby="studio-aapm-profile-heading"
        className="studio-aapm-profile-proof"
        data-adapter="aapm-core"
        data-testid="studio-aapm-profile-proof"
      >
        <div className="studio-aapm-profile-proof-heading">
          <div>
            <Typography typeRole="overline">Canonical brand adapter</Typography>
            <Typography
              as="h2"
              id="studio-aapm-profile-heading"
              typeRole="heading-md"
            >
              AAPM product expressions
            </Typography>
            <Typography as="p" typeRole="body-sm">
              The generic recipe, semantic component tokens, and runtime
              preferences stay shared while each product gets a controlled
              expression.
            </Typography>
          </div>
          <Badge tone="success">AAPM Core · canonical</Badge>
        </div>

        <div className="studio-aapm-profile-grid">
          {aapmProfileOrder.map((profileId) => {
            const profile = profiles[profileId];
            const primaryColor = roleColor(profile, "primary");
            const accentColor = roleColor(profile, "accent");
            return (
              <Card
                className="studio-aapm-profile-card"
                data-profile={profileId}
                key={profileId}
                style={
                  {
                    "--studio-aapm-profile-primary": primaryColor,
                    "--studio-aapm-profile-accent": accentColor,
                  } as CSSProperties
                }
              >
                <CardHeader>
                  <div className="studio-aapm-profile-card-title">
                    <span aria-hidden="true" className="studio-aapm-profile-icon">
                      <T7Icon name={profileIcons[profileId]} size={18} />
                    </span>
                    <div>
                      <CardTitle>{profileLabels[profileId]}</CardTitle>
                      <CardDescription>
                        {profileDescriptions[profileId]}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge tone="primary">{profile.surfaceProfile}</Badge>
                </CardHeader>
                <CardContent>
                  <div
                    aria-label={`${profileLabels[profileId]} brand color roles`}
                    className="studio-aapm-profile-swatches"
                    role="img"
                  >
                    <span
                      aria-hidden="true"
                      className="studio-aapm-profile-swatch"
                      data-role="primary"
                    />
                    <span
                      aria-hidden="true"
                      className="studio-aapm-profile-swatch"
                      data-role="accent"
                    />
                    <span className="studio-aapm-profile-swatch-label">
                      brand.primary · brand.accent
                    </span>
                  </div>
                  <dl className="studio-aapm-profile-facts">
                    <div>
                      <dt>Recipe</dt>
                      <dd>{profile.themeRecipe}</dd>
                    </div>
                    <div>
                      <dt>Density</dt>
                      <dd>{profile.density}</dd>
                    </div>
                    <div>
                      <dt>Asset</dt>
                      <dd>{assetLabel(profile)}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="studio-aapm-profile-proof-footer">
          <span>
            <T7Icon name="lock" size={14} />
            Brand Core stays in the adapter; status meaning remains semantic.
          </span>
          <span>
            Light/dark logo selection uses the canonical asset manifest.
          </span>
        </div>
      </section>
    </Collapsible>
  );
}
