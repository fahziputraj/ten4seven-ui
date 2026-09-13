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
  type NativeResolvedThemeVariant,
  type NativeIconSemanticName,
  type NativeMobileContract,
  type NativeSyncState,
  type NativeTypographyToken as SharedNativeTypographyToken,
  type MotionPreference,
  type ComponentPlatformContract,
  type ComponentPlatform,
  type ComponentRendererStrategy,
  type InputModality,
  type AccessibilityObligationId,
  type ComponentTokenFamily,
  type ComponentLayoutIntent,
  type MotionRole,
  type RendererStatus,
  DEVICE_SOURCE_CONTRACTS,
  resolveInputContract,
  NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES,
  resolveNavigationOverlayFeedbackContract,
  type DeviceSourceContract,
  type ResolvedInputContract,
  type ResolvedNavigationOverlayFeedbackContract,
  NATIVE_DATA_COLLECTION_CANARY,
  resolveNativeDataCollectionCanary,
  type NativeDataCollectionCanary,
  type NativeDataCollectionCanaryId,
  NATIVE_VISUALIZATION_CANARY,
  type NativeVisualizationCanary,
  NATIVE_WORKFLOW_CANARY,
  resolveNativeWorkflowCanary,
  type NativeWorkflowCanary,
  type NativeWorkflowCanaryId,
  NATIVE_COMPOSITION_CANARY,
  resolveBlockComposition,
  resolveProductComposition,
  resolveRecipeComposition,
  type BlockCompositionContract,
  type CompositionPlatform,
  type CompositionNativeStrategy,
  type ProductProfileCapabilityContract,
  type RecipeCompositionContract,
  type ResolvedProductComposition,
  NATIVE_ADVANCED_CANARY,
  resolveNativeAdvancedCanary,
  type NativeAdvancedCanaryId,
} from "@ten4seven/contracts";
import {
  buildNativeThemeSnapshot,
  resolveTheme,
  resolveThemeConfigLayers,
} from "@ten4seven/tokens";
import { getBrandProfile, resolveAapmBrandColor } from "@ten4seven/contracts";
import {
  getThemeRecipe,
  themeRecipeToLegacyConfig,
} from "@ten4seven/contracts";

export type NativeFontWeight = SharedNativeTypographyToken["fontWeight"];
export type NativeTypographyToken = SharedNativeTypographyToken;
export type NativeThemeVariant = NativeResolvedThemeVariant;

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

/**
 * CSS-independent canary for the U07 adaptive collection contract. This is a
 * descriptor for a future native renderer, not a component or engine.
 */
export interface NativeDataCollectionDescriptor extends NativeDataCollectionCanary {
  readonly primitive: "FlatList" | "SectionList" | "ScrollView";
  readonly accessibilityRole: "list" | "summary";
}

export function resolveNativeDataCollection(
  name: NativeDataCollectionCanaryId,
): NativeDataCollectionDescriptor {
  const contract = resolveNativeDataCollectionCanary(name);
  return {
    ...contract,
    primitive:
      name === "DescriptionList"
        ? "ScrollView"
        : name === "Tree"
          ? "SectionList"
          : "FlatList",
    accessibilityRole: name === "DescriptionList" ? "summary" : "list",
  };
}

/**
 * CSS-independent U08 canary for advanced visualization consumers. This is a
 * renderer descriptor only: Expo and platform-native packages
 * choose the actual primitive and engine after the contract is resolved.
 */
export interface NativeVisualizationDescriptor extends NativeVisualizationCanary {
  readonly primitive: "Chart" | "SectionList" | "MapView";
  readonly accessibilityRole: "image" | "list" | "region";
}

export type NativeVisualizationId = keyof typeof NATIVE_VISUALIZATION_CANARY;

export function resolveNativeVisualization(
  name: NativeVisualizationId,
): NativeVisualizationDescriptor {
  const contract = NATIVE_VISUALIZATION_CANARY[name];
  return {
    ...contract,
    primitive:
      name === "chart"
        ? "Chart"
        : name === "scheduler"
          ? "SectionList"
          : "MapView",
    accessibilityRole:
      name === "chart" ? "image" : name === "scheduler" ? "list" : "region",
  };
}

/**
 * CSS-independent U09 canary for workflow and productivity patterns. This is
 * a renderer descriptor for a future native package, not a platform-native
 * component implementation or workflow engine.
 */
export interface NativeWorkflowDescriptor extends NativeWorkflowCanary {
  readonly accessibilityRole: "list" | "group" | "search" | "summary";
}

export function resolveNativeWorkflow(
  name: NativeWorkflowCanaryId,
): NativeWorkflowDescriptor {
  const contract = resolveNativeWorkflowCanary(name);
  return {
    ...contract,
    accessibilityRole:
      name === "commandPalette"
        ? "search"
        : name === "decisionWorkspace"
          ? "summary"
          : name === "wizard"
            ? "group"
            : "list",
  };
}

/**
 * CSS-independent U11 composition projection. This is metadata for a future
 * Expo/platform-native renderer; it is deliberately not a native component
 * implementation and never reads a CSS variable.
 */
export interface NativeCompositionDescriptor {
  readonly kind: "block" | "recipe";
  readonly id: string;
  readonly displayName: string;
  readonly platform: CompositionPlatform;
  readonly nativeStrategy: CompositionNativeStrategy;
  readonly profile: ProductProfileCapabilityContract;
  readonly values: ResolvedProductComposition["nativeProjection"]["values"];
  readonly presentation: string;
  readonly primitive: string;
  readonly semanticOrder: string;
  readonly safeArea: string;
  readonly touchSafeActions: string;
  readonly cssParsing: false;
  readonly slots?: BlockCompositionContract["slots"];
  readonly blockRoles?: RecipeCompositionContract["blockRoles"];
}

function compositionCanaryFor(
  kind: NativeCompositionDescriptor["kind"],
  sourceId: string,
) {
  return Object.values(
    NATIVE_COMPOSITION_CANARY[kind === "block" ? "blocks" : "recipes"],
  ).find((candidate) => candidate.sourceId === sourceId);
}

function nativeCompositionBase(
  kind: NativeCompositionDescriptor["kind"],
  contract: BlockCompositionContract | RecipeCompositionContract,
  profileId: BrandProfileId,
): NativeCompositionDescriptor {
  const canary = compositionCanaryFor(kind, contract.id);
  const resolution = resolveProductComposition({ productProfile: profileId });
  return {
    kind,
    id: contract.id,
    displayName: contract.displayName,
    platform: contract.platform,
    nativeStrategy: contract.nativeStrategy,
    profile: resolution.nativeProjection.profile,
    values: resolution.nativeProjection.values,
    presentation: canary?.presentation ?? contract.responsive.native,
    primitive: canary?.primitive ?? "platform-native renderer primitives",
    semanticOrder: canary?.semanticOrder ?? contract.responsive.semanticOrder,
    safeArea:
      canary?.safeArea ?? "renderer preserves platform safe-area insets",
    touchSafeActions:
      canary?.touchSafeActions ??
      "interactive actions remain labelled, reachable, and touch-safe",
    cssParsing: false,
    ...(kind === "block"
      ? { slots: (contract as BlockCompositionContract).slots }
      : { blockRoles: (contract as RecipeCompositionContract).blockRoles }),
  };
}

export function resolveNativeBlockComposition(
  id: string,
  profile: BrandProfileId = "neutral-product",
): NativeCompositionDescriptor {
  const contract = resolveBlockComposition(id);
  if (!contract) throw new Error(`Unknown U11 block composition: ${id}`);
  return nativeCompositionBase("block", contract, profile);
}

export function resolveNativeRecipeComposition(
  id: string,
  profile: BrandProfileId = "neutral-product",
): NativeCompositionDescriptor {
  const contract = resolveRecipeComposition(id);
  if (!contract) throw new Error(`Unknown U11 recipe composition: ${id}`);
  return nativeCompositionBase("recipe", contract, profile);
}

/**
 * CSS-independent U10 canary for advanced interaction consumers. The
 * descriptor is a renderer handoff: a future platform package chooses the
 * actual primitive, navigation, and gesture implementation.
 */
export interface NativeAdvancedInteractionDescriptor {
  readonly id: string;
  readonly sourceComponent: string;
  readonly platform: string;
  readonly nativeStrategy: string;
  readonly nativeStatus: string;
  readonly primitive: string;
  readonly presentation: string;
  readonly semanticOrder: string;
  readonly safeArea: string;
  readonly touchSafeActions: string;
  readonly accessibility: string;
  readonly cssParsing: false;
}

export function resolveNativeAdvancedInteraction(
  id: NativeAdvancedCanaryId,
): NativeAdvancedInteractionDescriptor {
  return resolveNativeAdvancedCanary(id);
}

export interface NativeAccessibilityDescriptor {
  readonly role: NativeAccessibilityRole;
  readonly label: string;
  readonly hint?: string;
  readonly state?: NativeAccessibilityState;
}

/**
 * CSS-independent native consumption of the shared component contract. This
 * is a semantic projection for a future platform renderer, not a
 * native component implementation.
 */
export interface NativeComponentContractProjection {
  readonly id: string;
  readonly canonicalId: string;
  readonly platform: ComponentPlatform;
  readonly status: RendererStatus;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly presentation: ComponentPlatformContract["native"]["presentation"];
  readonly semanticIntent: ComponentPlatformContract["semanticIntent"];
  readonly interactionModel: ComponentPlatformContract["interactionModel"];
  readonly criticalStates: ComponentPlatformContract["criticalStates"];
  readonly inputModalities: readonly InputModality[];
  readonly accessibilityObligations: readonly AccessibilityObligationId[];
  readonly tokenFamilies: readonly ComponentTokenFamily[];
  readonly layoutIntents: readonly ComponentLayoutIntent[];
  readonly motionRoles: readonly MotionRole[];
}

export function resolveNativeComponentContract(
  contract: ComponentPlatformContract,
): NativeComponentContractProjection {
  if (contract.native.status === "not-applicable")
    throw new Error(
      `Component ${contract.id} has no native renderer contract: ${contract.platform}`,
    );
  return {
    id: contract.id,
    canonicalId: contract.canonicalId,
    platform: contract.platform,
    status: contract.native.status,
    rendererStrategy: contract.rendererStrategy,
    presentation: contract.native.presentation,
    semanticIntent: contract.semanticIntent,
    interactionModel: contract.interactionModel,
    criticalStates: contract.criticalStates,
    inputModalities: contract.inputModalities,
    accessibilityObligations: contract.accessibilityObligations,
    tokenFamilies: contract.tokenFamilies,
    layoutIntents: contract.layoutIntents,
    motionRoles: contract.motionRoles,
  };
}

/**
 * CSS-independent Native projection for U06. This carries semantic layer,
 * focus, dismissal, urgency, and persistence obligations; an Expo or platform-
 * native renderer decides whether the presentation is a modal, sheet, native
 * snackbar, drawer, or screen.
 */
export interface NativeNavigationOverlayFeedbackProjection {
  readonly id: string;
  readonly canonicalId: string;
  readonly family: ResolvedNavigationOverlayFeedbackContract["family"];
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly nativeStatus: RendererStatus;
  readonly presentation: ResolvedNavigationOverlayFeedbackContract["nativePresentation"];
  readonly adaptivePattern?: string;
  readonly nativeAlternative?: ResolvedNavigationOverlayFeedbackContract["nativeAlternative"];
  readonly intent: string;
  readonly interactionModel: ResolvedNavigationOverlayFeedbackContract["interactionModel"];
  readonly states: ResolvedNavigationOverlayFeedbackContract["states"];
  readonly accessibility: ResolvedNavigationOverlayFeedbackContract["accessibility"];
  readonly tokenRoles: ResolvedNavigationOverlayFeedbackContract["tokenRoles"];
  readonly layoutIntents: ResolvedNavigationOverlayFeedbackContract["layoutIntents"];
  readonly motionRoles: ResolvedNavigationOverlayFeedbackContract["motionRoles"];
  readonly dismissModel: ResolvedNavigationOverlayFeedbackContract["dismissModel"];
  readonly focusModel: ResolvedNavigationOverlayFeedbackContract["focusModel"];
  readonly persistence: ResolvedNavigationOverlayFeedbackContract["persistence"];
  readonly urgency: ResolvedNavigationOverlayFeedbackContract["urgency"];
}

export function resolveNativeNavigationOverlayFeedbackContract(
  name: string,
  componentContract: ComponentPlatformContract,
): NativeNavigationOverlayFeedbackProjection {
  const contract = resolveNavigationOverlayFeedbackContract(
    name,
    componentContract,
  );
  if (!contract)
    throw new Error(
      `Navigation/overlay/feedback contract ${name} is not defined in the shared plane`,
    );
  if (contract.native.status === "not-applicable")
    throw new Error(`U06 contract ${name} has no native presentation`);
  return {
    id: name,
    canonicalId: contract.canonicalId,
    family: contract.family,
    platform: contract.platform,
    rendererStrategy: contract.rendererStrategy,
    nativeStatus: contract.native.status,
    presentation: contract.nativePresentation,
    ...(contract.adaptivePattern
      ? { adaptivePattern: contract.adaptivePattern }
      : {}),
    ...(contract.nativeAlternative
      ? { nativeAlternative: contract.nativeAlternative }
      : {}),
    intent: contract.intent,
    interactionModel: contract.interactionModel,
    states: contract.states,
    accessibility: contract.accessibility,
    tokenRoles: contract.tokenRoles,
    layoutIntents: contract.layoutIntents,
    motionRoles: contract.motionRoles,
    dismissModel: contract.dismissModel,
    focusModel: contract.focusModel,
    persistence: contract.persistence,
    urgency: contract.urgency,
  };
}

export const nativeNavigationOverlayFeedbackLayerRoles =
  NAVIGATION_OVERLAY_FEEDBACK_LAYER_ROLES;

/**
 * CSS-independent input metadata for a future native renderer. The
 * component-platform contract supplies platform and presentation decisions;
 * the U05 input plane supplies field, selection, value, and state semantics.
 */
export interface NativeInputContractProjection {
  readonly id: string;
  readonly canonicalComponent: string;
  readonly family: ResolvedInputContract["family"];
  readonly classification: ResolvedInputContract["classification"];
  readonly status: ResolvedInputContract["status"];
  readonly platform: ComponentPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly nativeStatus: RendererStatus;
  readonly presentation: ResolvedInputContract["nativePresentation"];
  readonly nativeAlternative?: ResolvedInputContract["nativeAlternative"];
  readonly intent: string;
  readonly measure: ResolvedInputContract["measure"];
  readonly tokenRoles: ResolvedInputContract["tokenRoles"];
  readonly states: ResolvedInputContract["states"];
  readonly accessibility: ResolvedInputContract["accessibility"];
  readonly asyncStates: ResolvedInputContract["asyncStates"];
  readonly dataBoundary: ResolvedInputContract["dataBoundary"];
  readonly virtualization: ResolvedInputContract["virtualization"];
}

export function resolveNativeInputContract(
  name: string,
  componentContract: ComponentPlatformContract,
): NativeInputContractProjection {
  const contract = resolveInputContract(name, componentContract);
  if (!contract)
    throw new Error(
      `Input contract ${name} is not defined in the shared plane`,
    );
  if (contract.nativeStatus === "not-applicable")
    throw new Error(`Input contract ${name} has no native presentation`);
  return {
    id: name,
    canonicalComponent: contract.canonicalComponent,
    family: contract.family,
    classification: contract.classification,
    status: contract.status,
    platform: contract.platform,
    rendererStrategy: contract.rendererStrategy,
    nativeStatus: contract.nativeStatus,
    presentation: contract.nativePresentation,
    ...(contract.nativeAlternative
      ? { nativeAlternative: contract.nativeAlternative }
      : {}),
    intent: contract.intent,
    measure: contract.measure,
    tokenRoles: contract.tokenRoles,
    states: contract.states,
    accessibility: contract.accessibility,
    asyncStates: contract.asyncStates,
    dataBoundary: contract.dataBoundary,
    virtualization: contract.virtualization,
  };
}

export interface NativeInputSourceProjection {
  readonly id: string;
  readonly displayName: string;
  readonly classification: DeviceSourceContract["classification"];
  readonly status: DeviceSourceContract["status"];
  readonly platform: DeviceSourceContract["platform"];
  readonly rendererStrategy: DeviceSourceContract["rendererStrategy"];
  readonly nativeStatus: DeviceSourceContract["nativeStatus"];
  readonly presentation: DeviceSourceContract["nativePresentation"];
  readonly webAlternativeComponent: DeviceSourceContract["webAlternativeComponent"];
  readonly capabilities: DeviceSourceContract["capabilities"];
  readonly metadata: DeviceSourceContract["metadata"];
  readonly consumerOwns: DeviceSourceContract["consumerOwns"];
  readonly accessibility: DeviceSourceContract["accessibility"];
}

export function resolveNativeInputSource(
  name: keyof typeof DEVICE_SOURCE_CONTRACTS,
): NativeInputSourceProjection {
  const source = DEVICE_SOURCE_CONTRACTS[name];
  return {
    id: source.id,
    displayName: source.displayName,
    classification: source.classification,
    status: source.status,
    platform: source.platform,
    rendererStrategy: source.rendererStrategy,
    nativeStatus: source.nativeStatus,
    presentation: source.nativePresentation,
    webAlternativeComponent: source.webAlternativeComponent,
    capabilities: source.capabilities,
    metadata: source.metadata,
    consumerOwns: source.consumerOwns,
    accessibility: source.accessibility,
  };
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
  const config = resolveThemeConfigLayers({
    BASE_RECIPE: recipeConfig,
    PRODUCT_PROFILE: {
      density: brand.density,
      ...(brand.brandRoles
        ? {
            primary: resolveAapmBrandColor(brand.brandRoles.primary),
            accent: resolveAapmBrandColor(brand.brandRoles.accent),
          }
        : {}),
    },
    THEME_OVERRIDE: {
      appearance,
      ...(density === undefined ? {} : { density }),
    },
  });
  const theme = resolveTheme(config);
  return buildNativeThemeSnapshot(theme, {
    motion,
    motionProfile: recipe.profile.motion.profile,
  });
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
  resolveNativeComponentContract,
  resolveNativeNavigationOverlayFeedbackContract,
  resolveNativeDataCollection,
  resolveNativeInputContract,
  resolveNativeInputSource,
  resolveNativeWorkflow,
  resolveNativeBlockComposition,
  resolveNativeRecipeComposition,
  resolveNativeAdvancedInteraction,
  createNativeButton,
  createNativeInput,
  createNativeCard,
  createNativeFeedback,
  createNativeSyncStatus,
  resolveNativeIcon,
  createFarmDailyOperationProof,
});

export {
  NATIVE_MOBILE_CONTRACT,
  NATIVE_MOBILE_TOKEN_REFERENCES,
  NATIVE_DATA_COLLECTION_CANARY,
  NATIVE_WORKFLOW_CANARY,
  NATIVE_COMPOSITION_CANARY,
  NATIVE_ADVANCED_CANARY,
};
export type {
  NativeMobileContract,
  NativeWorkflowCanary,
  NativeWorkflowCanaryId,
  NativeAdvancedCanaryId,
};
