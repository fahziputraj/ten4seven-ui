import { useState, type FormEvent } from "react";

import { createBrandExpressionResolver } from "@ten4seven/agent/core";
import type { BrandExpressionContractData } from "@ten4seven/agent/core";
import { brandProfiles, components, recipes } from "@ten4seven/agent/generated";
import type {
  AuthBrandProfileId,
  BrandProfile,
  BrandProfileId,
  ComponentContract,
  RecipeContract,
} from "@ten4seven/contracts";
import {
  ActionFooter,
  Button,
  Image,
  Input,
  MediaFrame,
  PasswordInput,
  Surface,
  ThemeScope,
  Typography,
  useTen4SevenTheme,
} from "@ten4seven/ui";
import { T7Icon } from "@ten4seven/icons";

const authBrandResolver = createBrandExpressionResolver({
  recipe: recipes.auth as RecipeContract,
  profiles: brandProfiles as Readonly<Record<BrandProfileId, BrandProfile>>,
  components: components as Readonly<Record<string, ComponentContract>>,
} satisfies BrandExpressionContractData);

const profileCopy: Record<
  AuthBrandProfileId,
  {
    brandName: string;
    title: string;
    description: string;
    mediaLabel: string;
    mediaAlt: string;
    successMessage: string;
  }
> = {
  "neutral-product": {
    brandName: "ten4seven",
    title: "Masuk ke workspace",
    description: "Gunakan akun Anda untuk melanjutkan.",
    mediaLabel: "Workspace media",
    mediaAlt: "Abstract study tables and a quiet field of light",
    successMessage: "Sign-in submitted for this demo.",
  },
  "aapm-academy": {
    brandName: "AAPM Academy",
    title: "Masuk ke Academy",
    description: "Lanjutkan belajar bersama AAPM Academy.",
    mediaLabel: "AAPM Academy learning media",
    mediaAlt: "Abstract study tables and a warm field of light",
    successMessage: "Permintaan masuk diterima untuk demo.",
  },
};

export function BrandExpressionProof({
  profileId,
}: {
  profileId: AuthBrandProfileId;
}) {
  const resolved = authBrandResolver.resolve({ brandProfile: profileId });
  const copy = profileCopy[profileId];
  const { appearanceSetting } = useTen4SevenTheme();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <ThemeScope
      className="brand-proof-theme-scope"
      data-auth-recipe={resolved.recipe}
      data-brand-profile={resolved.brand}
      theme={profileId === "aapm-academy" ? "editorial" : "product"}
      preferences={{
        appearance: appearanceSetting,
        density: profileId === "aapm-academy" ? "comfortable" : "default",
      }}
    >
      <main
        className="brand-proof-page"
        data-agent-owned-brand-decisions={resolved.agentOwnedDecisionCount}
        data-auth-composition="split-screen"
        data-auth-recipe={resolved.recipe}
        data-brand-composition="split"
        data-brand-profile={resolved.brand}
        data-media-prominence={resolved.media.prominence}
        data-media-treatment={resolved.media.treatment}
        data-canonical-components={resolved.canonicalComponents.join(",")}
      >
        <div
          className="brand-proof-frame"
          data-action-emphasis={resolved.actionEmphasis.level}
          data-auth-composition="split-screen"
          data-brand-mark-prominence={resolved.brandMark.prominence}
          data-composition="split"
          data-media-overlay={resolved.media.overlay}
          data-media-prominence={resolved.media.prominence}
          data-media-treatment={resolved.media.treatment}
          data-surface-mood={resolved.surface.mood}
          data-typography-character={resolved.typography.displayCharacter}
        >
          <Surface
            aria-labelledby="brand-proof-form-title"
            as="section"
            className="brand-proof-auth-pane"
            data-auth-pane="true"
          >
            <div className="brand-proof-auth-content">
              <div
                aria-label={copy.brandName}
                className="brand-proof-brand-mark"
                role="img"
              >
                <span aria-hidden="true" className="brand-proof-brand-icon">
                  <T7Icon name="book" size={18} />
                </span>
                <Typography as="span" typeRole="label">
                  {copy.brandName}
                </Typography>
              </div>

              <div className="brand-proof-auth-heading">
                <Typography
                  as="h1"
                  id="brand-proof-form-title"
                  typeRole="heading-lg"
                >
                  {copy.title}
                </Typography>
                <Typography as="p" typeRole="body-sm">
                  {copy.description}
                </Typography>
              </div>

              <form
                className="brand-proof-form"
                data-t7-rail="form"
                onSubmit={handleSubmit}
              >
                <Input
                  autoComplete="username"
                  label="Email"
                  name="email"
                  placeholder={
                    profileId === "aapm-academy"
                      ? "nama@contoh.com"
                      : "you@example.com"
                  }
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
                  revealLabel="Show password"
                />
                <ActionFooter
                  className="brand-proof-action-footer"
                  primaryAction={
                    <span className="brand-proof-primary-action">
                      <Button type="submit">Masuk</Button>
                    </span>
                  }
                  secondaryActions={
                    <a className="brand-proof-recovery" href="/public-showcase">
                      Lupa kata sandi?
                    </a>
                  }
                />
                <div className="brand-proof-account-prompt">
                  <Typography as="span" typeRole="body-sm">
                    Belum punya akun?
                  </Typography>
                  <a href="/public-showcase">Buat akun</a>
                </div>
                {submitted ? (
                  <Typography
                    aria-live="polite"
                    className="brand-proof-form-status"
                    role="status"
                    typeRole="caption"
                  >
                    {copy.successMessage}
                  </Typography>
                ) : null}
              </form>
            </div>
          </Surface>

          <section
            aria-label={copy.mediaLabel}
            className="brand-proof-media-pane"
            data-media-pane="true"
          >
            <MediaFrame
              className="brand-proof-media"
              label={copy.mediaLabel}
              ratio={4 / 3}
            >
              <Image
                alt={copy.mediaAlt}
                className="brand-proof-media-image"
                height={720}
                src="/brand-proof/learning-field.svg"
                width={960}
              />
            </MediaFrame>
          </section>
        </div>
      </main>
    </ThemeScope>
  );
}
