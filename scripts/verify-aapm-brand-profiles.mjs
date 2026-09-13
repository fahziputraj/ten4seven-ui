import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  AAPM_BRAND_ADAPTER,
  AAPM_PROFILE_IDS,
  AUTH_BRAND_PROFILE_IDS,
  BRAND_PROFILES,
  BRAND_PROFILE_IDS,
  composeBrandProfile,
  resolveAapmBrandColor,
  resolveBrandAsset,
} from "../packages/contracts/src/index.ts";
import { PLATFORM_NEUTRAL_SURFACE_PROFILES } from "../packages/contracts/src/platform-neutral.ts";
import { THEME_RECIPES } from "../packages/contracts/src/theme-recipe.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

assert.deepEqual(BRAND_PROFILE_IDS, [
  "neutral-product",
  "aapm-core",
  "aapm-farm",
  "aapm-operations",
  "aapm-erp",
  "aapm-academy",
  "aapm-public",
]);
assert.deepEqual(AAPM_PROFILE_IDS, [
  "aapm-core",
  "aapm-farm",
  "aapm-operations",
  "aapm-erp",
  "aapm-academy",
  "aapm-public",
]);
assert.deepEqual(AUTH_BRAND_PROFILE_IDS, [
  "neutral-product",
  "aapm-academy",
]);

assert.equal(AAPM_BRAND_ADAPTER.id, "aapm-core");
assert.equal(AAPM_BRAND_ADAPTER.source.authority, "canonical");
assert.equal(AAPM_BRAND_ADAPTER.source.repository, "AAPM_Ecosystem");
assert.ok(
  AAPM_BRAND_ADAPTER.source.documents.includes(
    "docs/design-system/brand/AAPM_BRAND_DESIGN.md",
  ),
);
assert.equal(
  AAPM_BRAND_ADAPTER.source.assetManifest,
  "docs/design-system/brand/ASSET_MANIFEST.md",
);

const expectedCore = {
  green: "#318139",
  orange: "#D4451A",
  white: "#FFFFFF",
  neutralDarkVariant: "#CCCCCC",
};
const expectedDigital = {
  lime: "#B4E717",
  limeSoft: "#C3EC45",
  deepGreen: "#2C7433",
  warmCanvas: "#F6F5F2",
  greenTint: "#F2FCF3",
  softSurface: "#EFF5EF",
  ink: "#10191A",
};
for (const [name, expected] of Object.entries(expectedCore))
  assert.equal(AAPM_BRAND_ADAPTER.core[name].value, expected);
for (const [name, expected] of Object.entries(expectedDigital))
  assert.equal(AAPM_BRAND_ADAPTER.digital[name].value, expected);

for (const [role, alias] of Object.entries(AAPM_BRAND_ADAPTER.semantic)) {
  assert.match(
    alias.source,
    /^brand\.(?:core|digital)\.[A-Za-z]+$/,
    `${role}: semantic alias must retain canonical primitive provenance`,
  );
  assert.deepEqual(
    alias.value,
    resolveAapmBrandColor(role),
    `${role}: semantic alias resolver drifted from adapter source`,
  );
}

const surfaceProfileIds = new Set(
  PLATFORM_NEUTRAL_SURFACE_PROFILES.map((profile) => profile.id),
);
const authoredProfileSnapshot = JSON.stringify(BRAND_PROFILES);
for (const profileId of AAPM_PROFILE_IDS) {
  const profile = BRAND_PROFILES[profileId];
  assert.equal(profile.adapter, "aapm-core");
  assert.equal(profile.id, profileId);
  assert.ok(profile.product);
  assert.ok(surfaceProfileIds.has(profile.surfaceProfile));
  assert.ok(THEME_RECIPES[profile.themeRecipe]);
  assert.equal(profile.brandRoles?.primary, "brand.primary");
  assert.equal(profile.brandRoles?.accent, "brand.accent");
  assert.equal(profile.brandRoles?.highlight, "brand.highlight");
  assert.equal(profile.brandRoles?.surface, "brand.surface.deep");
  assert.equal(profile.brandRoles?.text, "text.ink");
  assert.equal(profile.asset.kind, "canonical");
  assert.ok(AAPM_BRAND_ADAPTER.assets[profile.asset.collection]);

  const composed = composeBrandProfile(profileId, {
    appearance: "dark",
    density: "compact",
    contrast: "more",
    motion: "reduced",
  });
  assert.equal(composed.brandProfile, profileId);
  assert.equal(composed.adapter, "aapm-core");
  assert.equal(composed.product, profile.product);
  assert.equal(composed.themeRecipe, profile.themeRecipe);
  assert.equal(composed.surfaceProfile, profile.surfaceProfile);
  assert.equal(composed.density, profile.density);
  assert.deepEqual(composed.runtime, {
    appearance: "dark",
    density: "compact",
    contrast: "more",
    motion: "reduced",
  });

  const assets = AAPM_BRAND_ADAPTER.assets[profile.asset.collection];
  assert.equal(resolveBrandAsset(profileId, "light"), assets.light);
  assert.equal(resolveBrandAsset(profileId, "dark"), assets.dark);
  assert.equal(resolveBrandAsset(profileId, "light", true), assets.compactLight);
  assert.equal(resolveBrandAsset(profileId, "dark", true), assets.compactDark);
  assert.equal(assets.owner, "AAPM");
  assert.equal(assets.distribution, "authorized-copy");
  assert.equal(assets.derivativePolicy, "no-local-derivative");
}

const neutral = BRAND_PROFILES["neutral-product"];
assert.equal(neutral.adapter, "neutral");
assert.equal(neutral.brandRoles, null);
assert.equal(neutral.asset.kind, "consumer-owned");
assert.equal(resolveBrandAsset("neutral-product", "light"), undefined);
assert.equal(
  JSON.stringify(BRAND_PROFILES),
  authoredProfileSnapshot,
  "profile composition must not mutate the authored profile registry",
);

// Brand Core must stop at the adapter boundary; these generic implementation
// packages must remain usable by non-AAPM consumers without AAPM literals.
for (const relativePath of [
  "packages/contracts/src/types.ts",
  "packages/tokens/src/theme.ts",
  "packages/ui/src/styles.css",
  "packages/ui/src/charts.tsx",
  "packages/ui/src/motion.ts",
]) {
  const source = read(relativePath).toLowerCase();
  for (const value of [
    ...Object.values(expectedCore),
    ...Object.values(expectedDigital),
  ])
    assert.equal(
      source.includes(value.toLowerCase()),
      false,
      `${relativePath}: AAPM literal crossed the generic adapter boundary (${value})`,
    );
}

console.log(
  `AAPM brand profiles verified: canonical aapm-core adapter, ${AAPM_PROFILE_IDS.length} product expressions, ${Object.keys(AAPM_BRAND_ADAPTER.semantic).length} provenance-aware semantic aliases, authorized light/dark asset bindings, neutral compatibility, and runtime composition isolation.`,
);
