import {
  NATIVE_MOBILE_CONTRACT,
  NATIVE_MOBILE_TOKEN_REFERENCES,
  type Appearance,
  type BrandProfileId,
  type DensityName,
  type NativeActionIntent,
  type NativeColorRole,
  type NativeFeedbackState,
  type NativeFieldState,
  type NativeIconSemanticName,
  type NativeMobileContract,
  type NativeMotionRole,
  type NativeRadiusRole,
  type NativeSpacingRole,
  type NativeSyncState,
  type NativeTypographyIntent,
  type MotionPreference,
} from "@ten4seven/contracts";
import {
  buildThemeVariables,
  densityProfiles,
  hslToHex,
  radiusProfiles,
  resolveTheme,
  typographyProfiles,
  type TypographyRole,
} from "@ten4seven/tokens";
import { getBrandProfile, resolveAapmBrandColor } from "@ten4seven/contracts";
import {
  getThemeRecipe,
  resolveMotionRoles,
  themeRecipeToLegacyConfig,
} from "@ten4seven/contracts";

export type NativeFontWeight = "400" | "500" | "600" | "700";

export interface NativeTypographyToken {
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly fontWeight: NativeFontWeight;
  readonly letterSpacingPx: number;
  readonly familyRole: "ui" | "display" | "mono";
}

export interface NativeThemeVariant {
  readonly appearance: Exclude<Appearance, "system">;
  readonly colors: Readonly<Record<NativeColorRole, string>>;
  readonly typography: Readonly<
    Record<NativeTypographyIntent, NativeTypographyToken>
  >;
  readonly spacing: Readonly<Record<NativeSpacingRole, number>>;
  readonly radius: Readonly<Record<NativeRadiusRole, number>>;
  readonly motion: {
    readonly enabled: boolean;
    readonly rolesMs: Readonly<Record<NativeMotionRole, number>>;
  };
  readonly touchTarget: number;
  readonly density: DensityName;
}

export interface NativeThemeOptions {
  readonly profile?: BrandProfileId;
  readonly appearance?: Appearance;
  readonly density?: DensityName;
  readonly motion?: MotionPreference;
}

export interface NativeThemeAdapterResult {
  readonly profileId: BrandProfileId;
  readonly product: string;
  readonly themeRecipe: string;
  readonly appearance: Appearance;
  readonly density: DensityName;
  readonly motion: MotionPreference;
  readonly variants: Readonly<
    Record<Exclude<Appearance, "system">, NativeThemeVariant>
  >;
  readonly iconNames: readonly NativeIconSemanticName[];
}

export type NativeAccessibilityRole =
  "button" | "textinput" | "summary" | "status" | "group";

export interface NativeAccessibilityState {
  readonly disabled?: boolean;
  readonly invalid?: boolean;
  readonly busy?: boolean;
  readonly selected?: boolean;
}

export interface NativeAccessibilityDescriptor {
  readonly role: NativeAccessibilityRole;
  readonly label: string;
  readonly hint?: string;
  readonly state?: NativeAccessibilityState;
}

export interface NativeButtonDescriptor {
  readonly primitive: "Pressable";
  readonly component: "button-action";
  readonly id: string;
  readonly intent: NativeActionIntent;
  readonly label: string;
  readonly disabled: boolean;
  readonly minTouchTargetToken: "component.interaction.touchTarget.minimum";
  readonly accessibility: NativeAccessibilityDescriptor;
  readonly tokenRoles: readonly NativeColorRole[];
}

export interface NativeInputDescriptor {
  readonly primitive: "TextInput";
  readonly component: "input-field";
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly state: NativeFieldState;
  readonly accessibility: NativeAccessibilityDescriptor;
  readonly tokenRoles: readonly NativeColorRole[];
}

export interface NativeCardDescriptor {
  readonly primitive: "View";
  readonly component: "card-surface";
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly accessibility: NativeAccessibilityDescriptor;
  readonly tokenRoles: readonly NativeColorRole[];
}

export interface NativeFeedbackDescriptor {
  readonly primitive: "View";
  readonly component: "status-feedback";
  readonly state: NativeFeedbackState;
  readonly label: string;
  readonly description?: string;
  readonly accessibility: NativeAccessibilityDescriptor;
  readonly tokenRoles: readonly NativeColorRole[];
}

export interface NativeSyncStatusDescriptor {
  readonly primitive: "View";
  readonly component: "offline-sync";
  readonly state: NativeSyncState;
  readonly icon: NativeIconSemanticName;
  readonly label: string;
  readonly accessibility: NativeAccessibilityDescriptor;
  readonly tokenRoles: readonly NativeColorRole[];
}

export interface NativeFarmDailyOperationValues {
  readonly date?: string;
  readonly eggsCollected?: string;
  readonly feedIntake?: string;
  readonly population?: string;
  readonly mortality?: string;
}

export interface NativeFarmDailyOperationProof {
  readonly component: "farm-daily-operation";
  readonly theme: NativeThemeAdapterResult;
  readonly card: NativeCardDescriptor;
  readonly fields: readonly NativeInputDescriptor[];
  readonly action: NativeButtonDescriptor;
  readonly feedback: NativeFeedbackDescriptor;
  readonly sync: NativeSyncStatusDescriptor;
}

const colorVariables: Readonly<Record<NativeColorRole, string>> = {
  canvas: "--t7-background-hsl",
  surface: "--t7-surface-hsl",
  surfaceRaised: "--t7-surface-raised-hsl",
  textPrimary: "--t7-foreground-hsl",
  textMuted: "--t7-muted-foreground-hsl",
  border: "--t7-border-subtle-hsl",
  borderStrong: "--t7-border-strong-hsl",
  focus: "--t7-focus-hsl",
  actionPrimary: "--t7-action-primary-hsl",
  actionPrimaryForeground: "--t7-action-primary-foreground-hsl",
  accent: "--t7-accent-hsl",
  actionSecondary: "--t7-action-secondary-background-hsl",
  actionSecondaryForeground: "--t7-action-secondary-foreground-hsl",
  actionQuiet: "--t7-action-quiet-foreground-hsl",
  actionDanger: "--t7-action-danger-hsl",
  actionDangerForeground: "--t7-action-danger-foreground-hsl",
  statusSuccess: "--t7-success-hsl",
  statusWarning: "--t7-warning-hsl",
  statusDanger: "--t7-danger-hsl",
  statusInfo: "--t7-info-hsl",
};

const typographyRoles: Readonly<
  Record<NativeTypographyIntent, TypographyRole>
> = {
  screenTitle: "heading-lg",
  sectionHeading: "heading-md",
  body: "body",
  label: "label",
  caption: "caption",
  button: "button",
  metric: "metric-lg",
};

function parsePixels(value: string, token: string): number {
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value.trim());
  if (!match) throw new Error(`${token} must resolve to px, received ${value}`);
  const result = Number(match[1]);
  if (!Number.isFinite(result)) throw new Error(`${token} is not finite`);
  return result;
}

function parseTracking(value: string, fontSize: number, token: string): number {
  const normalized = value.trim();
  if (normalized === "0") return 0;
  if (normalized.endsWith("px")) return parsePixels(normalized, token);
  if (normalized.endsWith("em")) {
    const amount = Number(normalized.slice(0, -2));
    if (Number.isFinite(amount)) return amount * fontSize;
  }
  throw new Error(`${token} must resolve to px or em, received ${value}`);
}

function normalizeWeight(value: string, token: string): NativeFontWeight {
  const weight = Number(value);
  if (!Number.isFinite(weight)) throw new Error(`${token} is not numeric`);
  if (weight <= 450) return "400";
  if (weight <= 575) return "500";
  if (weight <= 625) return "600";
  return "700";
}

function resolveColors(
  variables: Readonly<Record<string, string>>,
): Readonly<Record<NativeColorRole, string>> {
  return Object.fromEntries(
    Object.entries(colorVariables).map(([role, variable]) => {
      const value = variables[variable];
      if (!value || value.includes("var("))
        throw new Error(`${variable} did not resolve to a native color`);
      return [role, hslToHex(value)];
    }),
  ) as Record<NativeColorRole, string>;
}

function resolveTypography(
  typographyName: keyof typeof typographyProfiles,
): Readonly<Record<NativeTypographyIntent, NativeTypographyToken>> {
  const roles = typographyProfiles[typographyName].roles;
  return Object.fromEntries(
    Object.entries(typographyRoles).map(([intent, role]) => {
      const token = roles[role];
      const fontSize = parsePixels(token.size, `typography.${role}.size`);
      return [
        intent,
        {
          fontSize,
          lineHeight: parsePixels(
            token.lineHeight,
            `typography.${role}.lineHeight`,
          ),
          fontWeight: normalizeWeight(
            token.weight,
            `typography.${role}.weight`,
          ),
          letterSpacingPx: parseTracking(
            token.tracking,
            fontSize,
            `typography.${role}.tracking`,
          ),
          familyRole: token.family,
        },
      ];
    }),
  ) as Record<NativeTypographyIntent, NativeTypographyToken>;
}

function resolveMotion(
  profile: keyof typeof import("@ten4seven/contracts").MOTION_PROFILES,
  anchorSeconds: number,
  preference: MotionPreference,
): NativeThemeVariant["motion"] {
  const roles = resolveMotionRoles(profile, anchorSeconds);
  return {
    enabled: preference !== "reduced",
    rolesMs: Object.fromEntries(
      Object.entries(roles).map(([role, seconds]) => [
        role,
        Math.round(seconds * 1000),
      ]),
    ) as Record<NativeMotionRole, number>,
  };
}

function resolveVariant(
  profileId: BrandProfileId,
  appearance: Exclude<Appearance, "system">,
  density: DensityName | undefined,
  motion: MotionPreference,
): NativeThemeVariant {
  const brand = getBrandProfile(profileId);
  const recipe = getThemeRecipe(brand.themeRecipe);
  if (!recipe) throw new Error(`Theme recipe missing: ${brand.themeRecipe}`);
  const recipeConfig = themeRecipeToLegacyConfig(recipe);
  const config = {
    ...recipeConfig,
    appearance,
    density: density ?? brand.density,
    ...(brand.brandRoles
      ? {
          primary: resolveAapmBrandColor(brand.brandRoles.primary),
          accent: resolveAapmBrandColor(brand.brandRoles.accent),
        }
      : {}),
  };
  const theme = resolveTheme(config);
  const variables = buildThemeVariables(theme, {
    motion,
    motionProfile: recipe.profile.motion.profile,
    recipe: recipe.id,
    expression: recipe.expression,
    composition: recipe.composition,
  });
  const profile = densityProfiles[theme.density];
  const radius = radiusProfiles[theme.radius];
  const touchTarget = parsePixels(
    variables["--t7-touch-target-min"],
    "component.interaction.touchTarget.minimum",
  );
  const spacing: Record<NativeSpacingRole, number> = {
    control: parsePixels(profile.control, "component.geometry.control.height"),
    row: parsePixels(profile.row, "component.geometry.row.height"),
    cardPadding: parsePixels(
      profile.cardPadding,
      "component.geometry.card.padding",
    ),
    sectionGap: parsePixels(
      profile.sectionGap,
      "component.geometry.section.gap",
    ),
    controlGap: parsePixels(
      profile.controlGap,
      "component.geometry.control.gap",
    ),
    fieldGap: parsePixels(profile.fieldGap, "component.geometry.field.gap"),
    touchTarget,
  };
  const resolvedRadius: Record<NativeRadiusRole, number> = {
    control: parsePixels(radius.control, "component.radius.control"),
    card: parsePixels(radius.card, "component.radius.card"),
    panel: parsePixels(radius.panel, "component.radius.panel"),
  };
  return {
    appearance,
    colors: resolveColors(variables),
    typography: resolveTypography(theme.typography),
    spacing,
    radius: resolvedRadius,
    motion: resolveMotion(
      recipe.profile.motion.profile,
      recipe.profile.motion.anchorSeconds,
      motion,
    ),
    touchTarget,
    density: theme.density,
  };
}

export function resolveNativeTheme(
  options: NativeThemeOptions = {},
): NativeThemeAdapterResult {
  const profileId = options.profile ?? "aapm-farm";
  const brand = getBrandProfile(profileId);
  const recipe = getThemeRecipe(brand.themeRecipe);
  if (!recipe) throw new Error(`Theme recipe missing: ${brand.themeRecipe}`);
  const appearance = options.appearance ?? "system";
  const density = options.density ?? brand.density;
  const motion = options.motion ?? "full";
  return {
    profileId,
    product: brand.product,
    themeRecipe: brand.themeRecipe,
    appearance,
    density,
    motion,
    variants: {
      light: resolveVariant(profileId, "light", density, motion),
      dark: resolveVariant(profileId, "dark", density, motion),
    },
    iconNames: Object.keys(
      NATIVE_MOBILE_CONTRACT.iconSemantics,
    ) as NativeIconSemanticName[],
  } as NativeThemeAdapterResult;
}

function accessibility(
  role: NativeAccessibilityRole,
  label: string,
  state?: NativeAccessibilityState,
  hint?: string,
): NativeAccessibilityDescriptor {
  return {
    role,
    label,
    ...(hint ? { hint } : {}),
    ...(state ? { state } : {}),
  };
}

export function createNativeButton(input: {
  readonly id: string;
  readonly intent?: NativeActionIntent;
  readonly label: string;
  readonly disabled?: boolean;
}): NativeButtonDescriptor {
  const intent = input.intent ?? "primary";
  const disabled = input.disabled ?? false;
  return {
    primitive: "Pressable",
    component: "button-action",
    id: input.id,
    intent,
    label: input.label,
    disabled,
    minTouchTargetToken: "component.interaction.touchTarget.minimum",
    accessibility: accessibility(
      "button",
      input.label,
      disabled ? { disabled: true } : undefined,
      disabled ? undefined : "Activates the associated action",
    ),
    tokenRoles:
      intent === "primary"
        ? ["actionPrimary", "actionPrimaryForeground"]
        : intent === "secondary"
          ? ["actionSecondary", "actionSecondaryForeground"]
          : intent === "danger"
            ? ["actionDanger", "actionDangerForeground"]
            : ["actionQuiet"],
  };
}

export function createNativeInput(input: {
  readonly id: string;
  readonly label: string;
  readonly value?: string;
  readonly state?: NativeFieldState;
}): NativeInputDescriptor {
  const state = input.state ?? "default";
  const fieldState = NATIVE_MOBILE_CONTRACT.fieldStates[state];
  return {
    primitive: "TextInput",
    component: "input-field",
    id: input.id,
    label: input.label,
    value: input.value ?? "",
    state,
    accessibility: accessibility(
      "textinput",
      input.label,
      {
        ...(fieldState.announces === "disabled" ? { disabled: true } : {}),
        ...(fieldState.announces === "invalid" ? { invalid: true } : {}),
        ...(fieldState.announces === "busy" ? { busy: true } : {}),
      },
      fieldState.announces === "readonly"
        ? "Read-only field"
        : fieldState.announces === "busy"
          ? "Value is being processed"
          : undefined,
    ),
    tokenRoles: ["surface", "textPrimary", "border", "focus"],
  };
}

export function createNativeCard(input: {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
}): NativeCardDescriptor {
  return {
    primitive: "View",
    component: "card-surface",
    id: input.id,
    title: input.title,
    ...(input.description ? { description: input.description } : {}),
    accessibility: accessibility("summary", input.title),
    tokenRoles: ["surfaceRaised", "textPrimary", "border"],
  };
}

export function createNativeFeedback(input: {
  readonly state?: NativeFeedbackState;
  readonly label: string;
  readonly description?: string;
}): NativeFeedbackDescriptor {
  const state = input.state ?? "neutral";
  const tokenRoleByState: Record<NativeFeedbackState, NativeColorRole> = {
    neutral: "textMuted",
    info: "statusInfo",
    success: "statusSuccess",
    warning: "statusWarning",
    danger: "statusDanger",
  };
  return {
    primitive: "View",
    component: "status-feedback",
    state,
    label: input.label,
    ...(input.description ? { description: input.description } : {}),
    accessibility: accessibility("status", input.label),
    tokenRoles: [tokenRoleByState[state]],
  };
}

export function createNativeSyncStatus(
  state: NativeSyncState,
  label?: string,
): NativeSyncStatusDescriptor {
  const contract = NATIVE_MOBILE_CONTRACT.syncStates[state];
  const tokenRoleByTone: Record<NativeFeedbackState, NativeColorRole> = {
    neutral: "textMuted",
    info: "statusInfo",
    success: "statusSuccess",
    warning: "statusWarning",
    danger: "statusDanger",
  };
  const resolvedLabel = label ?? `${state} local state`;
  return {
    primitive: "View",
    component: "offline-sync",
    state,
    icon: contract.icon,
    label: resolvedLabel,
    accessibility: accessibility("status", resolvedLabel),
    tokenRoles: [tokenRoleByTone[contract.tone]],
  };
}

export function resolveNativeIcon(name: NativeIconSemanticName) {
  return NATIVE_MOBILE_CONTRACT.iconSemantics[name];
}

export function createFarmDailyOperationProof(
  values: NativeFarmDailyOperationValues = {},
  themeOptions: NativeThemeOptions = {},
): NativeFarmDailyOperationProof {
  const fields = [
    createNativeInput({
      id: "operation-date",
      label: "Operation date",
      value: values.date,
    }),
    createNativeInput({
      id: "eggs-collected",
      label: "Eggs collected",
      value: values.eggsCollected,
    }),
    createNativeInput({
      id: "feed-intake",
      label: "Feed intake",
      value: values.feedIntake,
    }),
    createNativeInput({
      id: "flock-population",
      label: "Flock population",
      value: values.population,
    }),
    createNativeInput({
      id: "mortality",
      label: "Mortality",
      value: values.mortality,
    }),
  ];
  return {
    component: "farm-daily-operation",
    theme: resolveNativeTheme(themeOptions),
    card: createNativeCard({
      id: "farm-daily-operation-card",
      title: "Daily operation",
      description:
        "Record the daily operation values supplied by the farm product.",
    }),
    fields,
    action: createNativeButton({
      id: "save-daily-operation",
      label: "Save daily operation",
    }),
    feedback: createNativeFeedback({
      state: "neutral",
      label: "Draft ready",
      description:
        "The product supplies the save result and validation messages.",
    }),
    sync: createNativeSyncStatus("local", "Saved locally on this device"),
  };
}

export const nativeAdapter = Object.freeze({
  resolveNativeTheme,
  createNativeButton,
  createNativeInput,
  createNativeCard,
  createNativeFeedback,
  createNativeSyncStatus,
  resolveNativeIcon,
  createFarmDailyOperationProof,
});

export { NATIVE_MOBILE_CONTRACT, NATIVE_MOBILE_TOKEN_REFERENCES };
export type { NativeMobileContract };
