import { useState, type FormEvent } from "react";

import { createBrandExpressionResolver } from "@ten4seven/agent/core";
import { brandProfiles, components, recipes } from "@ten4seven/agent/generated";
import type { BrandExpressionContractData } from "@ten4seven/agent/core";
import type {
  BrandProfile,
  BrandProfileId,
  ComponentContract,
  RecipeContract,
} from "@ten4seven/contracts";
import {
  ActionFooter,
  Button,
  Checkbox,
  Image,
  Input,
  MediaFrame,
  PasswordInput,
  Surface,
  Typography,
} from "@ten4seven/ui";
import { T7Icon } from "@ten4seven/icons";

import { brandProofRoutePaths } from "./playground-routes";

const authBrandResolver = createBrandExpressionResolver({
  recipe: recipes.auth as RecipeContract,
  profiles: brandProfiles as Readonly<Record<BrandProfileId, BrandProfile>>,
  components: components as Readonly<Record<string, ComponentContract>>,
} satisfies BrandExpressionContractData);

const profileLabels: Record<BrandProfileId, string> = {
  "neutral-product": "Neutral product",
  "aapm-academy": "AAPM Academy",
};

const profileCopy: Record<
  BrandProfileId,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  "neutral-product": {
    eyebrow: "A clear way back in",
    title: "Continue to your workspace.",
    description:
      "A focused sign-in surface for teams that need a calm, legible next step.",
  },
  "aapm-academy": {
    eyebrow: "Learning, held with intent",
    title: "Return to shared practice.",
    description:
      "An editorial entry point for people building stronger work together.",
  },
};

const profileNotes: Record<BrandProfileId, string> = {
  "neutral-product":
    "The same Authentication recipe resolves as a centered, restrained product surface.",
  "aapm-academy":
    "The same Authentication recipe resolves as a split, editorial surface with stronger media presence.",
};

const profileOrder: BrandProfileId[] = ["neutral-product", "aapm-academy"];

export function BrandExpressionProof({
  onNavigatePath,
  profileId,
}: {
  onNavigatePath: (path: string) => void;
  profileId: BrandProfileId;
}) {
  const resolved = authBrandResolver.resolve({ brandProfile: profileId });
  const copy = profileCopy[profileId];
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      className="brand-proof-page"
      data-agent-owned-brand-decisions={resolved.agentOwnedDecisionCount}
      data-auth-recipe={resolved.recipe}
      data-brand-composition={resolved.composition.heroBias}
      data-brand-profile={resolved.brand}
      data-media-prominence={resolved.media.prominence}
      data-media-treatment={resolved.media.treatment}
      data-canonical-components={resolved.canonicalComponents.join(",")}
    >
      <header className="brand-proof-header">
        <a className="brand-proof-mark" href="/theme-studio">
          <span aria-hidden="true" className="brand-proof-mark-icon">
            <T7Icon name="book" size={18} />
          </span>
          <span>
            <strong>ten4seven UI</strong>
            <Typography as="span" typeRole="caption">
              Brand expression proof
            </Typography>
          </span>
        </a>
        <nav
          aria-label="Brand profile proof"
          className="brand-proof-profile-nav"
        >
          <Typography typeRole="caption">Same Authentication recipe</Typography>
          <div className="brand-proof-profile-switcher">
            {profileOrder.map((option) => (
              <Button
                aria-current={option === profileId ? "page" : undefined}
                data-profile-option={option}
                intent={option === profileId ? "primary" : "secondary"}
                key={option}
                onClick={() => onNavigatePath(brandProofRoutePaths[option])}
                size="sm"
              >
                {profileLabels[option]}
              </Button>
            ))}
          </div>
        </nav>
      </header>

      <div
        className="brand-proof-frame"
        data-action-emphasis={resolved.actionEmphasis.level}
        data-composition={resolved.composition.heroBias}
        data-brand-mark-prominence={resolved.brandMark.prominence}
        data-media-overlay={resolved.media.overlay}
        data-media-prominence={resolved.media.prominence}
        data-media-treatment={resolved.media.treatment}
        data-surface-mood={resolved.surface.mood}
        data-typography-character={resolved.typography.displayCharacter}
      >
        <section
          className="brand-proof-story"
          aria-labelledby="brand-proof-title"
        >
          <div className="brand-proof-media-wrap">
            <MediaFrame
              className="brand-proof-media"
              label="Abstract learning studio illustration"
              ratio={profileId === "aapm-academy" ? 4 / 3 : 16 / 7}
            >
              <Image
                alt="Abstract study tables and a warm field of light"
                className="brand-proof-media-image"
                height={720}
                src="/brand-proof/learning-field.svg"
                width={960}
              />
              <span aria-hidden="true" className="brand-proof-media-wash" />
              <div className="brand-proof-media-caption">
                <Typography typeRole="overline">Consumer media slot</Typography>
                <Typography as="p" typeRole="body-sm">
                  One asset, expressed through the active BrandProfile.
                </Typography>
              </div>
            </MediaFrame>
          </div>

          <div className="brand-proof-story-copy">
            <Typography typeRole="overline">{copy.eyebrow}</Typography>
            <Typography as="h1" id="brand-proof-title" typeRole="display-xl">
              {copy.title}
            </Typography>
            <Typography as="p" typeRole="body-lg">
              {copy.description}
            </Typography>
            <div className="brand-proof-story-note">
              <span aria-hidden="true" className="brand-proof-note-line" />
              <Typography typeRole="caption">
                {profileNotes[profileId]}
              </Typography>
            </div>
          </div>
        </section>

        <Surface
          aria-labelledby="brand-proof-form-title"
          className="brand-proof-form-surface"
          data-action-emphasis={resolved.actionEmphasis.level}
          data-brand-mark-prominence={resolved.brandMark.prominence}
          data-typography-character={resolved.typography.displayCharacter}
          tone={resolved.surface.mood === "institutional" ? "accent" : "base"}
        >
          <div className="brand-proof-form-heading">
            <span aria-hidden="true" className="brand-proof-form-icon">
              <T7Icon name="lock" size={18} />
            </span>
            <div>
              <Typography
                as="h2"
                id="brand-proof-form-title"
                typeRole="heading-md"
              >
                Sign in
              </Typography>
              <Typography as="p" typeRole="body-sm">
                Use the account connected to your workspace.
              </Typography>
            </div>
          </div>

          <form
            aria-describedby="brand-proof-form-description"
            className="brand-proof-form"
            onSubmit={handleSubmit}
          >
            <Typography
              as="p"
              className="sr-only"
              id="brand-proof-form-description"
              typeRole="caption"
            >
              Authentication form using the canonical Input, PasswordInput,
              Checkbox, and ActionFooter contracts.
            </Typography>
            <Input
              autoComplete="username"
              label="Email address"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
            <PasswordInput
              autoComplete="current-password"
              hint="Use at least 8 characters."
              label="Password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <Checkbox label="Remember this device" name="remember" />
            <ActionFooter
              className="brand-proof-action-footer"
              primaryAction={
                <span className="brand-proof-primary-action">
                  <Button leadingIcon="arrowRight" type="submit">
                    Continue
                  </Button>
                </span>
              }
              secondaryActions={
                <Button intent="quiet" type="button">
                  Recover access
                </Button>
              }
              summary={
                <Typography typeRole="caption">Protected sign-in</Typography>
              }
            />
            {submitted ? (
              <Typography
                aria-live="polite"
                className="brand-proof-form-status"
                role="status"
                typeRole="caption"
              >
                Demo submission received. Connect your authentication handler
                here.
              </Typography>
            ) : null}
          </form>

          <div className="brand-proof-legal">
            <Typography typeRole="caption">
              By continuing, you agree to the workspace terms and privacy
              policy.
            </Typography>
            <div className="brand-proof-legal-links">
              <a href="/public-showcase">Terms</a>
              <a href="/public-showcase">Privacy</a>
            </div>
          </div>
        </Surface>
      </div>

      <footer className="brand-proof-footer">
        <Typography typeRole="caption">
          BrandProfile controls expression only. Authentication behavior,
          content, media, and legal links remain consumer-owned.
        </Typography>
        <code>agent-owned brand decisions: 0</code>
      </footer>
    </main>
  );
}
