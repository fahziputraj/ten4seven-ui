import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AccessibilityInfo,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch as NativeSwitchControl,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
  type FlatListProps,
  type ListRenderItem,
  type StyleProp,
  type TextInputProps,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  NATIVE_CAPABILITY_STATES,
  NATIVE_DEVICE_CAPABILITY_CONTRACTS,
  NATIVE_HAPTIC_INTENTS,
  NATIVE_ICON_SEMANTIC_NAMES,
  NATIVE_MOBILE_CONTRACT,
  type NativeCapabilityState,
  type NativeDeviceCapabilityId,
  type NativeHapticIntent as NativeHapticIntentContract,
  type NativeIconSemanticName,
  type NativeTypographyIntent,
  type OfflineSyncPresentationState,
} from "@ten4seven/contracts";
import {
  resolveNativeTheme,
  type NativeThemeAdapterResult,
  type NativeThemeOptions,
  type NativeThemeVariant,
} from "./index.ts";

export type NativeSurfaceTone =
  "canvas" | "surface" | "raised" | "modal" | "control";
export type NativeTextTone =
  "primary" | "muted" | "success" | "warning" | "danger" | "info";

interface NativeThemeContextValue {
  readonly adapter: NativeThemeAdapterResult;
  readonly styles: ReturnType<typeof buildNativeStyles>;
  readonly theme: NativeThemeVariant;
  readonly appearance: "light" | "dark";
}

const NativeThemeContext = createContext<NativeThemeContextValue | null>(null);

export interface NativeThemeProviderProps extends NativeThemeOptions {
  readonly children: ReactNode;
}

/**
 * Resolve the shared Ten4Seven theme once, then provide concrete JS values to
 * the renderer. This provider intentionally has no CSS-variable or DOM path.
 */
export function NativeThemeProvider({
  children,
  profile = "aapm-farm",
  appearance = "system",
  density,
  motion,
}: NativeThemeProviderProps) {
  const systemAppearance = useColorScheme();
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (active) setSystemReducedMotion(value);
    });
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setSystemReducedMotion,
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  const resolvedMotion = motion ?? (systemReducedMotion ? "reduced" : "full");
  const adapter = useMemo(
    () =>
      resolveNativeTheme({
        profile,
        appearance,
        density,
        motion: resolvedMotion,
      }),
    [appearance, density, resolvedMotion, profile],
  );
  const resolvedAppearance =
    appearance === "system"
      ? systemAppearance === "dark"
        ? "dark"
        : "light"
      : appearance;
  const theme = adapter.variants[resolvedAppearance];
  const value = useMemo(
    () => ({
      adapter,
      theme,
      styles: buildNativeStyles(theme),
      appearance: resolvedAppearance,
    }),
    [adapter, resolvedAppearance, theme],
  );

  return (
    <SafeAreaProvider>
      <NativeThemeContext.Provider value={value}>
        {children}
      </NativeThemeContext.Provider>
    </SafeAreaProvider>
  );
}

export function useNativeTheme(): NativeThemeContextValue {
  const context = useContext(NativeThemeContext);
  if (!context)
    throw new Error("Native renderer components require NativeThemeProvider");
  return context;
}

export interface NativeScreenProps {
  readonly children: ReactNode;
  readonly edges?: readonly ("top" | "right" | "bottom" | "left")[];
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
}

/** Safe-area-aware screen root shared by shells, sheets, and full-screen states. */
export function NativeScreen({
  children,
  edges = ["top", "right", "bottom", "left"],
  style,
  testID,
}: NativeScreenProps) {
  const { theme, styles } = useNativeTheme();
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingRight: edges.includes("right") ? insets.right : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left") ? insets.left : 0,
  };
  return (
    <View
      testID={testID}
      style={[
        styles.flex,
        { backgroundColor: theme.colors.canvas },
        padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface NativeTextProps extends TextProps {
  readonly intent?: NativeTypographyIntent;
  readonly tone?: NativeTextTone;
}

const textColor = (theme: NativeThemeVariant, tone: NativeTextTone) => {
  switch (tone) {
    case "muted":
      return theme.colors.textMuted;
    case "success":
      return theme.colors.statusSuccess;
    case "warning":
      return theme.colors.statusWarning;
    case "danger":
      return theme.colors.statusDanger;
    case "info":
      return theme.colors.statusInfo;
    default:
      return theme.colors.textPrimary;
  }
};

export function NativeText({
  intent = "body",
  tone = "primary",
  allowFontScaling = true,
  style,
  ...props
}: NativeTextProps) {
  const { theme } = useNativeTheme();
  const token = theme.typography[intent];
  return (
    <Text
      {...props}
      allowFontScaling={allowFontScaling}
      style={[
        {
          color: textColor(theme, tone),
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          fontWeight: token.fontWeight,
          letterSpacing: token.letterSpacingPx,
        },
        style,
      ]}
    />
  );
}

const iconGlyphs: Record<NativeIconSemanticName, string> = {
  farm: "⌂",
  egg: "○",
  chicken: "♧",
  inventory: "▣",
  table: "▤",
  pending: "◷",
  refresh: "↻",
  check: "✓",
  danger: "!",
  warning: "▲",
  info: "i",
  fileCheck: "▧",
  settings: "⚙",
  clock: "◷",
};

export interface NativeIconProps {
  readonly name: NativeIconSemanticName;
  readonly label?: string;
  readonly size?: number;
  readonly color?: string;
  readonly testID?: string;
}

/** Semantic icon names map to a platform glyph; consumers never pass vendor IDs. */
export function NativeIcon({
  name,
  label,
  size,
  color,
  testID,
}: NativeIconProps) {
  const { theme } = useNativeTheme();
  const resolvedSize = size ?? theme.icons.navigation;
  return (
    <Text
      testID={testID}
      accessible={Boolean(label)}
      accessibilityLabel={label}
      style={{
        color: color ?? theme.colors.textPrimary,
        fontSize: resolvedSize,
        lineHeight: resolvedSize + 4,
      }}
    >
      {iconGlyphs[name]}
    </Text>
  );
}

export interface NativeStackProps {
  readonly children: ReactNode;
  readonly gap?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
}

export function NativeStack({
  children,
  gap,
  style,
  testID,
}: NativeStackProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <View
      testID={testID}
      style={[styles.stack, { gap: gap ?? theme.spacing.sectionGap }, style]}
    >
      {children}
    </View>
  );
}

export interface NativeInlineProps extends NativeStackProps {
  readonly wrap?: boolean;
  readonly align?: ViewStyle["alignItems"];
}

export function NativeInline({
  children,
  gap,
  wrap = false,
  align = "center",
  style,
  testID,
}: NativeInlineProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <View
      testID={testID}
      style={[
        styles.inline,
        {
          gap: gap ?? theme.spacing.controlGap,
          alignItems: align,
          flexWrap: wrap ? "wrap" : "nowrap",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface NativeContainerProps {
  readonly children: ReactNode;
  readonly measure?:
    "compact" | "control" | "content" | "reading" | "wide" | "fluid";
  readonly style?: StyleProp<ViewStyle>;
}

export function NativeContainer({
  children,
  measure = "content",
  style,
}: NativeContainerProps) {
  const { theme, styles } = useNativeTheme();
  const bounds = theme.layout.measures[measure];
  return (
    <View
      style={[
        styles.container,
        {
          minWidth: 0,
          maxWidth: bounds.maximumPx ?? undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface NativeSurfaceProps {
  readonly children: ReactNode;
  readonly tone?: NativeSurfaceTone;
  readonly elevation?: "none" | "surface" | "raised" | "modal";
  readonly style?: StyleProp<ViewStyle>;
  readonly accessible?: boolean;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}

export function NativeSurface({
  children,
  tone = "surface",
  elevation = "surface",
  style,
  accessible,
  accessibilityLabel,
  testID,
}: NativeSurfaceProps) {
  const { theme, styles } = useNativeTheme();
  const backgroundColor =
    tone === "canvas"
      ? theme.colors.canvas
      : tone === "raised" || tone === "modal"
        ? theme.colors.surfaceRaised
        : theme.colors.surface;
  const shadow = elevation === "none" ? undefined : theme.elevation[elevation];
  return (
    <View
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.surface,
        {
          backgroundColor,
          borderColor: theme.colors.border,
          borderRadius:
            tone === "control" ? theme.radius.control : theme.radius.card,
        },
        shadow && {
          elevation: shadow.androidElevation,
          shadowColor: theme.colors.textPrimary,
          shadowOffset: { width: 0, height: shadow.shadowOffsetY },
          shadowRadius: shadow.shadowRadius,
          shadowOpacity: shadow.shadowOpacity,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export type NativeButtonIntent = "primary" | "secondary" | "quiet" | "danger";

export interface NativeButtonProps {
  readonly children: ReactNode;
  readonly intent?: NativeButtonIntent;
  readonly onPress?: () => void;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
}

export function NativeButton({
  children,
  intent = "primary",
  onPress,
  disabled = false,
  loading = false,
  accessibilityLabel,
  accessibilityHint,
  style,
  testID,
}: NativeButtonProps) {
  const { theme, styles } = useNativeTheme();
  const colors = {
    primary: [theme.colors.actionPrimary, theme.colors.actionPrimaryForeground],
    secondary: [
      theme.colors.actionSecondary,
      theme.colors.actionSecondaryForeground,
    ],
    quiet: [theme.colors.surface, theme.colors.actionQuiet],
    danger: [theme.colors.actionDanger, theme.colors.actionDangerForeground],
  }[intent];
  const isDisabled = disabled || loading;
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        {
          minHeight: theme.spacing.touchTarget,
          backgroundColor: colors[0],
          borderColor: intent === "quiet" ? theme.colors.border : colors[0],
          opacity: isDisabled
            ? theme.feedback.disabledOpacity
            : pressed
              ? theme.feedback.pressedOpacity
              : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors[1]} />
      ) : (
        <NativeText intent="button" style={{ color: colors[1] }}>
          {children}
        </NativeText>
      )}
    </Pressable>
  );
}

export interface NativeIconButtonProps {
  readonly icon: NativeIconSemanticName;
  readonly label: string;
  readonly onPress?: () => void;
  readonly disabled?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
}

export function NativeIconButton({
  icon,
  label,
  onPress,
  disabled = false,
  style,
  testID,
}: NativeIconButtonProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.iconButton,
        {
          minWidth: theme.spacing.touchTarget,
          minHeight: theme.spacing.touchTarget,
          opacity: disabled
            ? theme.feedback.disabledOpacity
            : pressed
              ? theme.feedback.pressedOpacity
              : 1,
        },
        style,
      ]}
    >
      <NativeIcon name={icon} label={label} />
    </Pressable>
  );
}

export type NativeFieldState =
  "default" | "focused" | "invalid" | "disabled" | "read-only" | "pending";

export interface NativeFieldProps extends Omit<TextInputProps, "style"> {
  readonly label: string;
  readonly state?: NativeFieldState;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly style?: StyleProp<TextStyle>;
  readonly testID?: string;
}

export function NativeField({
  label,
  state = "default",
  helperText,
  errorText,
  style,
  testID,
  editable,
  ...props
}: NativeFieldProps) {
  const { theme, styles } = useNativeTheme();
  const [focused, setFocused] = useState(false);
  const invalid = state === "invalid";
  const disabled = state === "disabled";
  const readOnly = state === "read-only";
  const pending = state === "pending";
  const borderColor = invalid
    ? theme.colors.statusDanger
    : focused || state === "focused"
      ? theme.colors.focus
      : theme.colors.border;
  const description = errorText ?? helperText;
  return (
    <View style={styles.fieldGroup} testID={testID}>
      <NativeText intent="label">{label}</NativeText>
      <TextInput
        {...props}
        editable={editable ?? (!disabled && !readOnly)}
        accessibilityLabel={label}
        accessibilityRole="text"
        accessibilityState={{ disabled, busy: pending }}
        accessibilityHint={errorText}
        onFocus={(event) => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          props.onBlur?.(event);
        }}
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          {
            minHeight: theme.spacing.control,
            color: theme.colors.textPrimary,
            backgroundColor: theme.colors.surface,
            borderColor,
            borderRadius: theme.radius.control,
            opacity: disabled ? theme.feedback.disabledOpacity : 1,
          },
          style,
        ]}
      />
      {description ? (
        <NativeText
          intent="caption"
          tone={invalid ? "danger" : "muted"}
          accessibilityRole="text"
        >
          {description}
        </NativeText>
      ) : null}
    </View>
  );
}

export function NativePasswordInput(props: NativeFieldProps) {
  return <NativeField {...props} secureTextEntry />;
}

export interface NativeTextareaProps extends NativeFieldProps {
  readonly rows?: number;
}

export function NativeTextarea({
  rows = 4,
  style,
  ...props
}: NativeTextareaProps) {
  const { theme } = useNativeTheme();
  return (
    <NativeField
      {...props}
      multiline
      textAlignVertical="top"
      style={[{ minHeight: theme.typography.body.lineHeight * rows }, style]}
    />
  );
}

export interface NativeCheckboxProps {
  readonly label: string;
  readonly selected: boolean;
  readonly onChange?: (selected: boolean) => void;
  readonly disabled?: boolean;
  readonly testID?: string;
}

export function NativeCheckbox({
  label,
  selected,
  onChange,
  disabled = false,
  testID,
}: NativeCheckboxProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <Pressable
      testID={testID}
      onPress={() => onChange?.(!selected)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      style={({ pressed }) => [
        styles.choice,
        {
          minHeight: theme.spacing.touchTarget,
          opacity: disabled
            ? theme.feedback.disabledOpacity
            : pressed
              ? theme.feedback.pressedOpacity
              : 1,
        },
      ]}
    >
      <View
        style={[
          styles.choiceMark,
          {
            borderColor: selected
              ? theme.colors.actionPrimary
              : theme.colors.borderStrong,
            backgroundColor: selected
              ? theme.colors.actionPrimary
              : theme.colors.surface,
          },
        ]}
      >
        {selected ? (
          <NativeText style={{ color: theme.colors.actionPrimaryForeground }}>
            ✓
          </NativeText>
        ) : null}
      </View>
      <NativeText>{label}</NativeText>
    </Pressable>
  );
}

export interface NativeRadioProps extends NativeCheckboxProps {
  readonly value?: string;
}

export function NativeRadio(props: NativeRadioProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <Pressable
      testID={props.testID}
      onPress={() => props.onChange?.(!props.selected)}
      disabled={props.disabled}
      accessibilityRole="radio"
      accessibilityLabel={props.label}
      accessibilityState={{
        selected: props.selected,
        disabled: props.disabled,
      }}
      style={[
        styles.choice,
        {
          minHeight: theme.spacing.touchTarget,
          opacity: props.disabled ? theme.feedback.disabledOpacity : 1,
        },
      ]}
    >
      <View
        style={[
          styles.radioMark,
          {
            borderColor: props.selected
              ? theme.colors.actionPrimary
              : theme.colors.borderStrong,
          },
        ]}
      >
        {props.selected ? (
          <View
            style={[
              styles.radioDot,
              { backgroundColor: theme.colors.actionPrimary },
            ]}
          />
        ) : null}
      </View>
      <NativeText>{props.label}</NativeText>
    </Pressable>
  );
}

export interface NativeSwitchProps {
  readonly label: string;
  readonly value: boolean;
  readonly onChange?: (value: boolean) => void;
  readonly disabled?: boolean;
  readonly testID?: string;
}

export function NativeSwitch({
  label,
  value,
  onChange,
  disabled = false,
  testID,
}: NativeSwitchProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <View
      testID={testID}
      style={[
        styles.choice,
        {
          minHeight: theme.spacing.touchTarget,
          opacity: disabled ? theme.feedback.disabledOpacity : 1,
        },
      ]}
    >
      <NativeText style={styles.flex}>{label}</NativeText>
      <NativeSwitchControl
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        accessibilityLabel={label}
        accessibilityState={{ checked: value, disabled }}
        trackColor={{
          false: theme.colors.borderStrong,
          true: theme.colors.actionPrimary,
        }}
        thumbColor={theme.colors.surfaceRaised}
      />
    </View>
  );
}

export interface NativeSelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface NativeSelectProps {
  readonly label: string;
  readonly value?: string;
  readonly options: readonly NativeSelectOption[];
  readonly placeholder?: string;
  readonly onChange?: (value: string) => void;
  readonly disabled?: boolean;
  readonly emptyLabel?: string;
  readonly testID?: string;
}

/** Adaptive Select: one native trigger opens a bounded sheet/list, never a Web popup. */
export function NativeSelect({
  label,
  value,
  options,
  placeholder = "Choose an option",
  onChange,
  disabled = false,
  emptyLabel = "No options available",
  testID,
}: NativeSelectProps) {
  const { theme, styles } = useNativeTheme();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  return (
    <View testID={testID} style={styles.fieldGroup}>
      <NativeText intent="label">{label}</NativeText>
      <Pressable
        onPress={() => setOpen(true)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint="Opens a native selection sheet"
        accessibilityState={{ disabled, expanded: open }}
        style={({ pressed }) => [
          styles.input,
          styles.selectTrigger,
          {
            minHeight: theme.spacing.control,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            opacity: disabled
              ? theme.feedback.disabledOpacity
              : pressed
                ? theme.feedback.pressedOpacity
                : 1,
          },
        ]}
      >
        <NativeText tone={selected ? "primary" : "muted"}>
          {selected?.label ?? placeholder}
        </NativeText>
        <NativeIcon name="pending" label="Open options" size={16} />
      </Pressable>
      <Modal
        visible={open}
        transparent
        animationType={theme.motion.enabled ? "slide" : "none"}
        onRequestClose={() => setOpen(false)}
        accessibilityViewIsModal
      >
        <View
          style={[
            styles.modalScrim,
            {
              backgroundColor: `${theme.colors.scrim}${Math.round(
                theme.feedback.scrimOpacity * 255,
              )
                .toString(16)
                .padStart(2, "0")}`,
            },
          ]}
        >
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                paddingBottom: Math.max(
                  insets.bottom,
                  theme.spacing.cardPadding,
                ),
              },
            ]}
          >
            <NativeInline>
              <NativeText intent="sectionHeading" style={styles.flex}>
                {label}
              </NativeText>
              <NativeIconButton
                icon="danger"
                label="Close options"
                onPress={() => setOpen(false)}
              />
            </NativeInline>
            {options.length === 0 ? (
              <NativeText tone="muted">{emptyLabel}</NativeText>
            ) : null}
            <FlatList
              data={options}
              keyExtractor={(option) => option.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    if (item.disabled) return;
                    onChange?.(item.value);
                    setOpen(false);
                  }}
                  disabled={item.disabled}
                  accessibilityRole="radio"
                  accessibilityLabel={item.label}
                  accessibilityState={{
                    selected: item.value === value,
                    disabled: item.disabled,
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      minHeight: theme.spacing.touchTarget,
                      backgroundColor:
                        item.value === value
                          ? theme.colors.surfaceRaised
                          : theme.colors.surface,
                      opacity: item.disabled
                        ? theme.feedback.disabledOpacity
                        : pressed
                          ? theme.feedback.pressedOpacity
                          : 1,
                    },
                  ]}
                >
                  <NativeText>{item.label}</NativeText>
                  {item.value === value ? (
                    <NativeIcon
                      name="check"
                      label="Selected"
                      color={theme.colors.statusSuccess}
                    />
                  ) : null}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export interface NativeSheetProps {
  readonly visible: boolean;
  readonly title: string;
  readonly children: ReactNode;
  readonly onDismiss: () => void;
  readonly testID?: string;
}

export function NativeSheet({
  visible,
  title,
  children,
  onDismiss,
  testID,
}: NativeSheetProps) {
  const { theme, styles } = useNativeTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal
      testID={testID}
      visible={visible}
      transparent
      animationType={theme.motion.enabled ? "slide" : "none"}
      onRequestClose={onDismiss}
      accessibilityViewIsModal
    >
      <View
        style={[
          styles.modalScrim,
          {
            backgroundColor: `${theme.colors.scrim}${Math.round(
              theme.feedback.scrimOpacity * 255,
            )
              .toString(16)
              .padStart(2, "0")}`,
          },
        ]}
      >
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              paddingBottom: Math.max(insets.bottom, theme.spacing.cardPadding),
            },
          ]}
        >
          <NativeInline>
            <NativeText intent="sectionHeading" style={styles.flex}>
              {title}
            </NativeText>
            <NativeIconButton
              icon="danger"
              label={`Close ${title}`}
              onPress={onDismiss}
            />
          </NativeInline>
          {children}
        </View>
      </View>
    </Modal>
  );
}

export const NativeDialog = NativeSheet;
export const NativeAlertDialog = NativeSheet;

export interface NativeTabsItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: NativeIconSemanticName;
  readonly disabled?: boolean;
}

export interface NativeTabsProps {
  readonly items: readonly NativeTabsItem[];
  readonly value: string;
  readonly onChange?: (id: string) => void;
  readonly testID?: string;
}

export function NativeTabs({
  items,
  value,
  onChange,
  testID,
}: NativeTabsProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <ScrollView
      testID={testID}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.tabBar,
        { borderBottomColor: theme.colors.border },
      ]}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange?.(item.id)}
            disabled={item.disabled}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected, disabled: item.disabled }}
            style={({ pressed }) => [
              styles.tab,
              {
                minHeight: theme.spacing.touchTarget,
                borderBottomColor: selected
                  ? theme.colors.actionPrimary
                  : "transparent",
                opacity: item.disabled
                  ? theme.feedback.disabledOpacity
                  : pressed
                    ? theme.feedback.pressedOpacity
                    : 1,
              },
            ]}
          >
            {item.icon ? (
              <NativeIcon name={item.icon} label={item.label} size={16} />
            ) : null}
            <NativeText
              intent="label"
              style={{
                color: selected
                  ? theme.colors.actionPrimary
                  : theme.colors.textMuted,
              }}
            >
              {item.label}
            </NativeText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export interface NativeBottomNavigationProps extends NativeTabsProps {}

export function NativeBottomNavigation(props: NativeBottomNavigationProps) {
  const { theme } = useNativeTheme();
  return (
    <NativeTabs
      {...props}
      testID={props.testID ?? "native-bottom-navigation"}
    />
  );
}

export interface NativeListProps<T> extends Omit<
  FlatListProps<T>,
  "data" | "renderItem"
> {
  readonly data: readonly T[];
  readonly renderItem: ListRenderItem<T>;
  readonly emptyLabel?: string;
  readonly errorLabel?: string;
  readonly loading?: boolean;
}

export function NativeList<T>({
  data,
  renderItem,
  emptyLabel = "Nothing to show",
  errorLabel,
  loading = false,
  ...props
}: NativeListProps<T>) {
  const { theme, styles } = useNativeTheme();
  if (loading) {
    return (
      <View style={[styles.centered, { minHeight: theme.spacing.row }]}>
        <ActivityIndicator color={theme.colors.actionPrimary} />
        <NativeText tone="muted">Loading</NativeText>
      </View>
    );
  }
  if (errorLabel) {
    return (
      <NativeSurface tone="surface" accessibilityLabel={errorLabel}>
        <NativeText tone="danger">{errorLabel}</NativeText>
      </NativeSurface>
    );
  }
  return (
    <FlatList
      {...props}
      data={data}
      renderItem={renderItem}
      keyExtractor={props.keyExtractor ?? ((_, index) => String(index))}
      contentContainerStyle={[
        styles.listContent,
        data.length === 0 && styles.flex,
        props.contentContainerStyle,
      ]}
      ListEmptyComponent={
        <View style={styles.centered}>
          <NativeText tone="muted">{emptyLabel}</NativeText>
        </View>
      }
    />
  );
}

export interface NativeSyncBannerProps {
  readonly state: OfflineSyncPresentationState;
  readonly label?: string;
  readonly onRetry?: () => void;
  readonly testID?: string;
}

export function NativeSyncBanner({
  state,
  label,
  onRetry,
  testID,
}: NativeSyncBannerProps) {
  const { theme, styles } = useNativeTheme();
  const tone =
    state === "online"
      ? "success"
      : state === "syncFailed" ||
          state === "retryAvailable" ||
          state === "stale"
        ? "warning"
        : state === "offline"
          ? "warning"
          : "info";
  const color = textColor(theme, tone);
  const defaultLabel: Record<OfflineSyncPresentationState, string> = {
    online: "Online",
    offline: "Offline",
    pendingSync: "Changes pending sync",
    syncing: "Syncing changes",
    syncFailed: "Sync failed",
    retryAvailable: "Retry sync available",
    stale: "Data may be stale",
  };
  const resolvedLabel = label ?? defaultLabel[state];
  return (
    <NativeSurface
      testID={testID}
      tone="surface"
      accessibilityLabel={resolvedLabel}
      style={{ borderColor: color }}
    >
      <NativeInline>
        <NativeIcon
          name={
            state === "online"
              ? "check"
              : state === "syncing"
                ? "refresh"
                : "info"
          }
          label={resolvedLabel}
          color={color}
        />
        <NativeText tone={tone} style={styles.flex}>
          {resolvedLabel}
        </NativeText>
        {onRetry &&
        (state === "syncFailed" ||
          state === "retryAvailable" ||
          state === "stale") ? (
          <NativeButton intent="quiet" onPress={onRetry}>
            Retry
          </NativeButton>
        ) : null}
      </NativeInline>
    </NativeSurface>
  );
}

export interface NativeCapabilityStateCardProps {
  readonly capability: NativeDeviceCapabilityId;
  readonly state: NativeCapabilityState;
  readonly detail?: string;
  readonly onAction?: () => void;
  readonly actionLabel?: string;
  readonly testID?: string;
}

export function NativeCapabilityStateCard({
  capability,
  state,
  detail,
  onAction,
  actionLabel,
  testID,
}: NativeCapabilityStateCardProps) {
  const { theme, styles } = useNativeTheme();
  const contract = NATIVE_DEVICE_CAPABILITY_CONTRACTS[capability];
  const isError =
    state === "denied" ||
    state === "unavailable" ||
    state === "error" ||
    state === "invalid" ||
    state === "syncFailed";
  const tone: NativeTextTone = isError
    ? "warning"
    : state === "success" || state === "ready" || state === "detected"
      ? "success"
      : "info";
  return (
    <NativeSurface
      testID={testID}
      tone="surface"
      accessibilityLabel={`${capability}: ${state}`}
    >
      <NativeStack gap={theme.spacing.controlGap}>
        <NativeInline>
          <NativeText intent="label" style={styles.flex}>
            {capability}
          </NativeText>
          <NativeText intent="caption" tone={tone}>
            {state}
          </NativeText>
        </NativeInline>
        <NativeText tone="muted">{detail ?? contract.presentation}</NativeText>
        {onAction ? (
          <NativeButton intent="secondary" onPress={onAction}>
            {actionLabel ??
              (state === "permission-required" ? "Continue" : "Retry")}
          </NativeButton>
        ) : null}
      </NativeStack>
    </NativeSurface>
  );
}

export interface NativeMasterDetailItem {
  readonly id: string;
  readonly title: string;
  readonly summary?: string;
}

export interface NativeMasterDetailProps<T extends NativeMasterDetailItem> {
  readonly items: readonly T[];
  readonly selectedId?: string;
  readonly onSelect?: (id: string) => void;
  readonly renderDetail: (item: T) => ReactNode;
  readonly testID?: string;
}

/** Adaptive list/detail: phone shows one pane at a time; wide surfaces may show both. */
export function NativeMasterDetail<T extends NativeMasterDetailItem>({
  items,
  selectedId,
  onSelect,
  renderDetail,
  testID,
}: NativeMasterDetailProps<T>) {
  const { width } = useWindowDimensions();
  const { theme, styles } = useNativeTheme();
  const selected = items.find((item) => item.id === selectedId);
  const wide = width >= 720;
  return (
    <View
      testID={testID}
      style={[styles.masterDetail, wide && styles.masterDetailWide]}
    >
      <View
        style={[
          styles.master,
          wide && {
            flex: 1,
            borderRightColor: theme.colors.border,
            borderRightWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <NativeList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSelect?.(item.id)}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              accessibilityState={{ selected: item.id === selectedId }}
              style={({ pressed }) => [
                styles.listRow,
                {
                  backgroundColor:
                    item.id === selectedId
                      ? theme.colors.surfaceRaised
                      : theme.colors.surface,
                  opacity: pressed ? theme.feedback.pressedOpacity : 1,
                },
              ]}
            >
              <NativeText intent="label">{item.title}</NativeText>
              {item.summary ? (
                <NativeText intent="caption" tone="muted">
                  {item.summary}
                </NativeText>
              ) : null}
            </Pressable>
          )}
          emptyLabel="No records"
        />
      </View>
      {wide || selected ? (
        <View style={[styles.detail, wide && { flex: 2 }]}>
          {!wide ? (
            <NativeButton intent="quiet" onPress={() => onSelect?.("")}>
              Back to list
            </NativeButton>
          ) : null}
          {selected ? (
            renderDetail(selected)
          ) : (
            <NativeText tone="muted">Select a record</NativeText>
          )}
        </View>
      ) : null}
    </View>
  );
}

export interface NativeConversationMessage {
  readonly id: string;
  readonly role: "user" | "assistant" | "tool";
  readonly content: string;
  readonly state?: "pending" | "error" | "complete";
}

export function NativeConversation({
  messages,
  testID,
}: {
  readonly messages: readonly NativeConversationMessage[];
  readonly testID?: string;
}) {
  const { theme } = useNativeTheme();
  return (
    <ScrollView
      testID={testID}
      contentContainerStyle={{ gap: theme.spacing.controlGap }}
      accessibilityRole="list"
    >
      {messages.map((message) => (
        <NativeSurface
          key={message.id}
          tone={message.role === "user" ? "raised" : "surface"}
          accessibilityLabel={`${message.role} message`}
        >
          <NativeStack gap={theme.spacing.controlGap}>
            <NativeText intent="caption" tone="muted">
              {message.role}
            </NativeText>
            <NativeText>{message.content}</NativeText>
            {message.state === "pending" ? (
              <ActivityIndicator color={theme.colors.actionPrimary} />
            ) : null}
            {message.state === "error" ? (
              <NativeText tone="danger">
                Unable to complete this step.
              </NativeText>
            ) : null}
          </NativeStack>
        </NativeSurface>
      ))}
    </ScrollView>
  );
}

export interface NativePromptComposerProps {
  readonly value: string;
  readonly onChangeText?: (value: string) => void;
  readonly onSubmit?: () => void;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly testID?: string;
}

export function NativePromptComposer({
  value,
  onChangeText,
  onSubmit,
  disabled = false,
  placeholder = "Ask a question",
  testID,
}: NativePromptComposerProps) {
  const { theme, styles } = useNativeTheme();
  return (
    <KeyboardAvoidingView
      testID={testID}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <NativeInline align="flex-end">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          accessibilityLabel="Prompt"
          accessibilityRole="text"
          style={[
            styles.input,
            styles.flex,
            {
              minHeight: theme.spacing.control,
              color: theme.colors.textPrimary,
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.control,
            },
          ]}
        />
        <NativeButton onPress={onSubmit} disabled={disabled || !value.trim()}>
          Send
        </NativeButton>
      </NativeInline>
    </KeyboardAvoidingView>
  );
}

export function NativeCitationList({
  citations,
}: {
  readonly citations: readonly string[];
}) {
  return (
    <NativeStack gap={8}>
      <NativeText intent="label">Sources</NativeText>
      {citations.map((citation, index) => (
        <NativeText key={`${citation}-${index}`} intent="caption" tone="muted">
          {index + 1}. {citation}
        </NativeText>
      ))}
    </NativeStack>
  );
}

export function NativeToolCallCard({
  name,
  status,
  detail,
}: {
  readonly name: string;
  readonly status: string;
  readonly detail?: string;
}) {
  const { styles } = useNativeTheme();
  return (
    <NativeSurface accessibilityLabel={`${name}: ${status}`}>
      <NativeStack gap={8}>
        <NativeInline>
          <NativeText intent="label" style={styles.flex}>
            {name}
          </NativeText>
          <NativeText intent="caption" tone="info">
            {status}
          </NativeText>
        </NativeInline>
        {detail ? <NativeText tone="muted">{detail}</NativeText> : null}
      </NativeStack>
    </NativeSurface>
  );
}

export function NativeApprovalPanel({
  title,
  detail,
  onApprove,
  onReject,
}: {
  readonly title: string;
  readonly detail?: string;
  readonly onApprove?: () => void;
  readonly onReject?: () => void;
}) {
  return (
    <NativeSurface tone="raised" accessibilityLabel={title}>
      <NativeStack>
        <NativeText intent="sectionHeading">{title}</NativeText>
        {detail ? <NativeText tone="muted">{detail}</NativeText> : null}
        <NativeInline>
          <NativeButton onPress={onApprove}>Approve</NativeButton>
          <NativeButton intent="quiet" onPress={onReject}>
            Decline
          </NativeButton>
        </NativeInline>
      </NativeStack>
    </NativeSurface>
  );
}

export function NativeProgress({
  value,
  label = "Progress",
}: {
  readonly value?: number;
  readonly label?: string;
}) {
  const { theme, styles } = useNativeTheme();
  const bounded =
    value === undefined ? undefined : Math.max(0, Math.min(1, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={
        bounded === undefined ? undefined : { min: 0, max: 1, now: bounded }
      }
    >
      <NativeText intent="caption" tone="muted">
        {label}
      </NativeText>
      <View
        style={[
          styles.progressTrack,
          { backgroundColor: theme.colors.surfaceRaised },
        ]}
      >
        {bounded !== undefined ? (
          <View
            style={[
              styles.progressFill,
              {
                width: `${bounded * 100}%`,
                backgroundColor: theme.colors.actionPrimary,
              },
            ]}
          />
        ) : (
          <ActivityIndicator color={theme.colors.actionPrimary} />
        )}
      </View>
    </View>
  );
}

export function NativeHapticIntent({
  intent,
}: {
  readonly intent: NativeHapticIntentContract;
}) {
  return (
    <NativeText
      intent="caption"
      tone="muted"
      accessibilityLabel={`Haptic intent: ${intent}`}
    >
      Optional {intent} feedback
    </NativeText>
  );
}

export const nativeRendererMetadata = Object.freeze({
  contract: NATIVE_MOBILE_CONTRACT.id,
  capabilityStates: NATIVE_CAPABILITY_STATES,
  capabilityIds: Object.keys(NATIVE_DEVICE_CAPABILITY_CONTRACTS),
  hapticIntents: NATIVE_HAPTIC_INTENTS,
  iconNames: NATIVE_ICON_SEMANTIC_NAMES,
  cssParsing: false,
  usesSafeAreaContext: true,
  usesNativeFontScaling: true,
  usesPressState: true,
  usesSystemBackDismissal: true,
});

/** Geometry derives from shared density/radius roles. Flex, percentages and round
 * indicator anatomy are renderer/composition constants, not theme scales. */
function buildNativeStyles(theme: NativeThemeVariant) {
  const { spacing, radius, marks } = theme;
  return StyleSheet.create({
    flex: { flex: 1 },
    stack: { flexDirection: "column" },
    inline: { flexDirection: "row" },
    container: {
      width: "100%",
      alignSelf: "center",
      padding: spacing.cardPadding,
    },
    surface: {
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: radius.card,
      padding: spacing.cardPadding,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.controlGap,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: radius.control,
    },
    iconButton: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.control,
    },
    fieldGroup: { gap: spacing.fieldGap },
    input: {
      borderWidth: StyleSheet.hairlineWidth,
      paddingHorizontal: spacing.controlGap,
      paddingVertical: spacing.fieldGap,
    },
    selectTrigger: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    choice: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.controlGap,
    },
    choiceMark: {
      width: marks.choice,
      height: marks.choice,
      borderWidth: marks.stroke,
      borderRadius: radius.control / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    radioMark: {
      width: marks.radio,
      height: marks.radio,
      borderWidth: marks.stroke,
      borderRadius: marks.radio / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    radioDot: {
      width: marks.dot,
      height: marks.dot,
      borderRadius: marks.dot / 2,
    },
    modalScrim: { flex: 1, justifyContent: "flex-end" },
    sheet: {
      maxHeight: "88%",
      borderTopLeftRadius: radius.panel,
      borderTopRightRadius: radius.panel,
      borderWidth: StyleSheet.hairlineWidth,
      padding: spacing.cardPadding,
      gap: spacing.sectionGap,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.controlGap,
      borderRadius: radius.control,
    },
    tabBar: {
      flexGrow: 1,
      gap: spacing.fieldGap / 2,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    tab: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.fieldGap,
      paddingHorizontal: spacing.controlGap,
      borderBottomWidth: 2,
    },
    centered: {
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.cardPadding,
      gap: spacing.fieldGap,
    },
    listContent: { gap: spacing.fieldGap, paddingVertical: spacing.fieldGap },
    listRow: {
      padding: spacing.controlGap,
      borderRadius: radius.control,
      gap: spacing.fieldGap / 2,
    },
    masterDetail: { flex: 1 },
    masterDetailWide: { flexDirection: "row" },
    master: { minHeight: theme.layout.measures.compact.minimumPx },
    detail: { padding: spacing.cardPadding, gap: spacing.controlGap },
    progressTrack: {
      minHeight: spacing.fieldGap,
      borderRadius: spacing.fieldGap / 2,
      overflow: "hidden",
      justifyContent: "center",
    },
    progressFill: {
      height: spacing.fieldGap,
      borderRadius: spacing.fieldGap / 2,
    },
  });
}
