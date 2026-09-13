import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  NATIVE_CAPABILITY_STATES,
  NATIVE_DEVICE_CAPABILITY_CONTRACTS,
  NATIVE_DEVICE_CAPABILITY_IDS,
  NATIVE_PROFILE_CANARIES,
  type Appearance,
  type BrandProfileId,
  type NativeCapabilityState,
  type NativeDeviceCapabilityId,
} from "@ten4seven/contracts";
import {
  NativeAlertDialog,
  NativeApprovalPanel,
  NativeBottomNavigation,
  NativeButton,
  NativeCapabilityStateCard,
  NativeCheckbox,
  NativeCitationList,
  NativeContainer,
  NativeConversation,
  NativeField,
  NativeHapticIntent,
  NativeIcon,
  NativeIconButton,
  NativeInline,
  NativeList,
  NativePasswordInput,
  NativeProgress,
  NativePromptComposer,
  NativeRadio,
  NativeScreen,
  NativeSelect,
  NativeStack,
  NativeSurface,
  NativeSwitch,
  NativeTabs,
  NativeText,
  NativeTextarea,
  NativeThemeProvider,
  NativeToolCallCard,
  NativeSheet,
  NativeSyncBanner,
  useNativeTheme,
} from "@ten4seven/native/renderer";

const PROFILE_OPTIONS = [
  ...NATIVE_PROFILE_CANARIES,
] as const satisfies readonly BrandProfileId[];

const FAMILY_OPTIONS = [
  { id: "foundations", label: "Foundations", icon: "settings" as const },
  { id: "forms", label: "Forms", icon: "fileCheck" as const },
  { id: "navigation", label: "Navigation", icon: "farm" as const },
  { id: "data", label: "Data", icon: "table" as const },
  { id: "workflow", label: "Workflow", icon: "pending" as const },
  { id: "ai", label: "AI / Power", icon: "info" as const },
  { id: "device", label: "Device", icon: "refresh" as const },
] as const;

type FamilyId = (typeof FAMILY_OPTIONS)[number]["id"];

const records = [
  { id: "lot-101", title: "Lot 101", summary: "Ready for review" },
  { id: "lot-102", title: "Lot 102", summary: "Requires attention" },
  { id: "lot-103", title: "Lot 103", summary: "Synced 4 minutes ago" },
] as const;

const capabilityFixtureState: Record<
  NativeDeviceCapabilityId,
  NativeCapabilityState
> = {
  safeArea: "ready",
  virtualKeyboard: "active",
  camera: "permission-required",
  qrScanner: "permission-required",
  documentPicker: "ready",
  photoLibrary: "ready",
  permissions: "permission-required",
  location: "unavailable",
  haptics: "ready",
  pushEntry: "loading",
  deepLink: "ready",
  offline: "offline",
  sync: "pendingSync",
  networkRetry: "retry",
  secureStorage: "unavailable",
  backgroundTask: "unavailable",
  orientation: "active",
  fontScale: "active",
};

function LabSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <NativeSurface tone="surface" elevation="surface">
      <NativeStack>
        <NativeStack gap={6}>
          <NativeText intent="sectionHeading">{title}</NativeText>
          <NativeText tone="muted">{description}</NativeText>
        </NativeStack>
        {children}
      </NativeStack>
    </NativeSurface>
  );
}

function FoundationsFamily({
  profile,
  appearance,
  density,
  motion,
}: {
  profile: BrandProfileId;
  appearance: Appearance;
  density: "comfortable" | "default" | "compact" | "dense";
  motion: "full" | "reduced";
}) {
  const { adapter, theme } = useNativeTheme();
  return (
    <NativeStack>
      <LabSection
        title="Theme and token projection"
        description="Resolved values are JS/TS data from the shared token runtime. The renderer does not parse CSS."
      >
        <NativeInline wrap>
          <NativeSurface tone="raised" style={{ flex: 1, minWidth: 150 }}>
            <NativeText intent="caption" tone="muted">
              Profile
            </NativeText>
            <NativeText intent="label">{profile}</NativeText>
          </NativeSurface>
          <NativeSurface tone="raised" style={{ flex: 1, minWidth: 150 }}>
            <NativeText intent="caption" tone="muted">
              Appearance
            </NativeText>
            <NativeText intent="label">
              {appearance} → {theme.appearance}
            </NativeText>
          </NativeSurface>
          <NativeSurface tone="raised" style={{ flex: 1, minWidth: 150 }}>
            <NativeText intent="caption" tone="muted">
              Density / motion
            </NativeText>
            <NativeText intent="label">
              {density} / {motion}
            </NativeText>
          </NativeSurface>
        </NativeInline>
        <NativeText intent="caption" tone="muted">
          {adapter.product} · {adapter.themeRecipe} · surface{" "}
          {theme.colors.surface} · primary {theme.colors.actionPrimary}
        </NativeText>
        <NativeInline wrap>
          <NativeText intent="caption" tone="muted">
            Chart: {theme.chart.palette} / {theme.chart.colors.length} colors
          </NativeText>
          <NativeText intent="caption" tone="muted">
            Elevation: {theme.elevation.preset} / modal{" "}
            {theme.elevation.modal.androidElevation}
          </NativeText>
          <NativeText intent="caption" tone="muted">
            Measure: {theme.layout.measures.content.maximumPx ?? "fluid"}px
          </NativeText>
        </NativeInline>
      </LabSection>
      <LabSection
        title="Foundations and actions"
        description="Semantic text, icon, surface, press, loading, disabled, and minimum touch-target states."
      >
        <NativeText intent="screenTitle" accessibilityRole="header">
          Native Component Lab
        </NativeText>
        <NativeText intent="body">
          One semantic contract, multiple renderers. This fixture is
          deterministic and domain-neutral.
        </NativeText>
        <NativeInline wrap>
          <NativeButton testID="native-lab-primary">
            Primary action
          </NativeButton>
          <NativeButton intent="secondary">Secondary</NativeButton>
          <NativeButton intent="quiet">Quiet</NativeButton>
          <NativeButton intent="danger">Danger</NativeButton>
          <NativeButton loading>Loading</NativeButton>
          <NativeButton disabled>Disabled</NativeButton>
          <NativeIconButton icon="settings" label="Settings" />
        </NativeInline>
        <NativeInline>
          <NativeIcon name="farm" label="Farm semantic icon" />
          <NativeIcon
            name="check"
            label="Success semantic icon"
            color={theme.colors.statusSuccess}
          />
          <NativeText tone="success">
            Status uses meaning, not colour alone.
          </NativeText>
        </NativeInline>
      </LabSection>
    </NativeStack>
  );
}

function FormsFamily() {
  const [selected, setSelected] = useState("daily");
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState(false);
  const [enabled, setEnabled] = useState(true);
  return (
    <NativeStack>
      <LabSection
        title="Native form states"
        description="Input, password, textarea, checkbox, radio, switch, error, read-only, and pending states use native controls and accessible labels."
      >
        <NativeField
          label="Record name"
          placeholder="Type a value"
          defaultValue="Synthetic record"
        />
        <NativePasswordInput
          label="Secret value"
          placeholder="Never log this value"
          state="read-only"
        />
        <NativeField
          label="Invalid field"
          defaultValue="Needs correction"
          state="invalid"
          errorText="Use a valid synthetic value."
        />
        <NativeTextarea
          label="Notes"
          placeholder="Long content remains scrollable"
          rows={3}
        />
        <NativeInline wrap>
          <NativeCheckbox
            label="Include archived"
            selected={checked}
            onChange={setChecked}
          />
          <NativeRadio
            label="Daily cadence"
            selected={radio}
            onChange={setRadio}
          />
          <NativeSwitch label="Enabled" value={enabled} onChange={setEnabled} />
        </NativeInline>
        <NativeSelect
          label="Cadence"
          value={selected}
          onChange={setSelected}
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "disabled", label: "Unavailable option", disabled: true },
          ]}
        />
        <NativeSelect
          label="Empty selection"
          options={[]}
          emptyLabel="No fixture options"
        />
      </LabSection>
    </NativeStack>
  );
}

function NavigationFamily() {
  const [tab, setTab] = useState("overview");
  const [sheet, setSheet] = useState(false);
  const items = [
    { id: "overview", label: "Overview", icon: "farm" as const },
    { id: "activity", label: "Activity", icon: "clock" as const },
    { id: "settings", label: "Settings", icon: "settings" as const },
  ];
  return (
    <NativeStack>
      <LabSection
        title="Adaptive navigation and overlays"
        description="Tabs and bottom navigation are touch surfaces; sheets handle dismissal and system back through onRequestClose."
      >
        <NativeTabs items={items} value={tab} onChange={setTab} />
        <NativeText tone="muted">Selected route: {tab}</NativeText>
        <NativeBottomNavigation items={items} value={tab} onChange={setTab} />
        <NativeInline>
          <NativeButton onPress={() => setSheet(true)}>Open sheet</NativeButton>
          <NativeButton intent="quiet">Back / up intent</NativeButton>
        </NativeInline>
        <NativeSheet
          visible={sheet}
          title="Contextual surface"
          onDismiss={() => setSheet(false)}
        >
          <NativeText>
            Secondary actions stay in a bounded native sheet on narrow surfaces.
          </NativeText>
          <NativeButton onPress={() => setSheet(false)}>Done</NativeButton>
        </NativeSheet>
      </LabSection>
    </NativeStack>
  );
}

function DataFamily({ chrome }: { chrome: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string>();
  const selected = records.find((record) => record.id === selectedId);
  // NativeMasterDetail remains the canonical renderer contract. This Lab
  // canary keeps the virtualized NativeList as the owning scroll surface so
  // the list/detail proof is not nested inside the Lab's former ScrollView.
  return (
    <NativeList
      testID="native-lab-data-list"
      data={records}
      keyExtractor={(record) => record.id}
      contentContainerStyle={{ padding: 16, gap: 16 }}
      ListHeaderComponent={
        <NativeContainer
          measure="wide"
          style={{
            minWidth: 0,
            maxWidth: "100%",
            alignSelf: "stretch",
            padding: 0,
          }}
        >
          <NativeStack>
            {chrome}
            <LabSection
              title="Collection and master/detail"
              description="DataTable intent maps to a touch-safe native list/detail surface. The virtualized list owns scrolling on this canary so it is not nested inside a parent ScrollView."
            >
              {selected ? (
                <NativeSurface tone="raised" testID="native-lab-record-detail">
                  <NativeStack>
                    <NativeText intent="sectionHeading">
                      {selected.title}
                    </NativeText>
                    <NativeText>{selected.summary}</NativeText>
                    <NativeButton
                      intent="quiet"
                      onPress={() => setSelectedId(undefined)}
                    >
                      Back to list
                    </NativeButton>
                  </NativeStack>
                </NativeSurface>
              ) : (
                <NativeText tone="muted">
                  Select a record to open its narrow-surface detail.
                </NativeText>
              )}
            </LabSection>
          </NativeStack>
        </NativeContainer>
      }
      renderItem={({ item }) => (
        <NativeSurface tone={item.id === selectedId ? "raised" : "surface"}>
          <NativeStack>
            <NativeText intent="label">{item.title}</NativeText>
            <NativeText tone="muted">{item.summary}</NativeText>
            <NativeButton intent="quiet" onPress={() => setSelectedId(item.id)}>
              Open record
            </NativeButton>
          </NativeStack>
        </NativeSurface>
      )}
      ListFooterComponent={
        <NativeStack>
          <NativeText intent="label">FlatList fixture</NativeText>
          <NativeProgress value={0.64} label="Synthetic completion" />
        </NativeStack>
      }
    />
  );
}

function WorkflowFamily() {
  const [syncState, setSyncState] = useState<
    | "offline"
    | "pendingSync"
    | "syncing"
    | "syncFailed"
    | "retryAvailable"
    | "online"
  >("offline");
  return (
    <NativeStack>
      <LabSection
        title="Workflow and offline/sync presentation"
        description="The renderer presents connectivity and retry states; the consumer owns persistence, queueing, conflict resolution, and handlers."
      >
        <NativeSyncBanner
          state={syncState}
          onRetry={() => setSyncState("syncing")}
        />
        <NativeInline wrap>
          {(
            [
              "offline",
              "pendingSync",
              "syncing",
              "syncFailed",
              "retryAvailable",
              "online",
            ] as const
          ).map((state) => (
            <NativeButton
              key={state}
              intent={state === syncState ? "primary" : "quiet"}
              onPress={() => setSyncState(state)}
            >
              {state}
            </NativeButton>
          ))}
        </NativeInline>
        <NativeApprovalPanel
          title="Review synthetic decision"
          detail="Approval is presentation-only; the consumer provides the mutation and authorization."
          onApprove={() => undefined}
          onReject={() => undefined}
        />
      </LabSection>
    </NativeStack>
  );
}

function AiFamily() {
  const [prompt, setPrompt] = useState("");
  return (
    <NativeStack>
      <LabSection
        title="AI / power adaptive canary"
        description="Conversation, citations, tool status, approval, and keyboard-safe composer primitives remain domain-neutral."
      >
        <NativeConversation
          messages={[
            {
              id: "m1",
              role: "user",
              content: "Summarise this synthetic record.",
              state: "complete",
            },
            {
              id: "m2",
              role: "assistant",
              content: "The record is ready for review.",
              state: "complete",
            },
            {
              id: "m3",
              role: "tool",
              content: "No external tool was executed in this lab.",
              state: "complete",
            },
          ]}
        />
        <NativeCitationList
          citations={["Synthetic source A", "Synthetic source B"]}
        />
        <NativeToolCallCard
          name="Preview tool"
          status="complete"
          detail="Fixture only; no network or business side effect."
        />
        <NativePromptComposer
          value={prompt}
          onChangeText={setPrompt}
          onSubmit={() => setPrompt("")}
        />
      </LabSection>
    </NativeStack>
  );
}

function DeviceFamily() {
  const [capabilityState, setCapabilityState] =
    useState<NativeCapabilityState>("ready");
  const [alert, setAlert] = useState(false);
  const capabilities = useMemo(
    () =>
      NATIVE_DEVICE_CAPABILITY_IDS.map((id) => ({
        id,
        state: capabilityFixtureState[id],
      })),
    [],
  );
  return (
    <NativeStack>
      <LabSection
        title="Device capability state lab"
        description="Capability cards expose permission, unavailable, loading, offline, sync, retry, orientation, font-scale, and haptic intent states without bundling platform APIs or business logic."
      >
        <NativeInline wrap>
          {NATIVE_CAPABILITY_STATES.slice(0, 8).map((state) => (
            <NativeButton
              key={state}
              intent={state === capabilityState ? "primary" : "quiet"}
              onPress={() => setCapabilityState(state)}
            >
              {state}
            </NativeButton>
          ))}
        </NativeInline>
        <NativeCapabilityStateCard
          capability="camera"
          state={capabilityState}
          actionLabel="Request capability"
          onAction={() => setAlert(true)}
        />
        <NativeInline wrap>
          <NativeHapticIntent intent="selection" />
          <NativeHapticIntent intent="confirmation" />
          <NativeHapticIntent intent="warning" />
          <NativeHapticIntent intent="impact" />
        </NativeInline>
        <NativeText intent="label">All capability fixtures</NativeText>
        {capabilities.map(({ id, state }) => (
          <NativeCapabilityStateCard key={id} capability={id} state={state} />
        ))}
        <NativeAlertDialog
          visible={alert}
          title="Capability boundary"
          onDismiss={() => setAlert(false)}
        >
          <NativeText tone="muted">
            The lab records presentation only. The application must provide the
            actual permission adapter.
          </NativeText>
          <NativeButton onPress={() => setAlert(false)}>Close</NativeButton>
        </NativeAlertDialog>
      </LabSection>
    </NativeStack>
  );
}

function NativeLab({
  profile,
  setProfile,
  appearance,
  setAppearance,
  density,
  setDensity,
  motion,
  setMotion,
  family,
  setFamily,
}: {
  profile: BrandProfileId;
  setProfile: (value: BrandProfileId) => void;
  appearance: Appearance;
  setAppearance: (value: Appearance) => void;
  density: "comfortable" | "default" | "compact" | "dense";
  setDensity: (value: "comfortable" | "default" | "compact" | "dense") => void;
  motion: "full" | "reduced";
  setMotion: (value: "full" | "reduced") => void;
  family: FamilyId;
  setFamily: (value: FamilyId) => void;
}) {
  const labChrome = (
    <>
      <NativeInline align="flex-start">
        <NativeStack gap={6} style={{ flex: 1 }}>
          <NativeText intent="screenTitle">Ten4Seven Native Lab</NativeText>
          <NativeText tone="muted">
            Expo / React Native renderer proof surface · synthetic fixtures only
          </NativeText>
        </NativeStack>
        <NativeIconButton icon="info" label="About this lab" />
      </NativeInline>
      <LabSection
        title="Renderer controls"
        description="Change the same shared profile, appearance, density, motion, and family dimensions used by the native contract."
      >
        <NativeSelect
          label="Product profile"
          value={profile}
          onChange={(value) => setProfile(value as BrandProfileId)}
          options={PROFILE_OPTIONS.map((value) => ({
            value,
            label: value,
          }))}
        />
        <NativeTabs
          items={[
            { id: "system", label: "System" },
            { id: "light", label: "Light" },
            { id: "dark", label: "Dark" },
          ]}
          value={appearance}
          onChange={(value) => setAppearance(value as Appearance)}
        />
        <NativeInline wrap>
          {(["comfortable", "default", "compact", "dense"] as const).map(
            (value) => (
              <NativeButton
                key={value}
                intent={value === density ? "primary" : "quiet"}
                onPress={() => setDensity(value)}
              >
                {value}
              </NativeButton>
            ),
          )}
          <NativeButton
            intent={motion === "full" ? "primary" : "quiet"}
            onPress={() => setMotion("full")}
          >
            Motion
          </NativeButton>
          <NativeButton
            intent={motion === "reduced" ? "primary" : "quiet"}
            onPress={() => setMotion("reduced")}
          >
            Reduced motion
          </NativeButton>
        </NativeInline>
        <NativeTabs
          testID="native-lab-family-tabs"
          items={FAMILY_OPTIONS}
          value={family}
          onChange={(value) => setFamily(value as FamilyId)}
        />
      </LabSection>
    </>
  );

  return (
    <NativeScreen testID="native-lab-screen">
      {family === "data" ? (
        <DataFamily chrome={labChrome} />
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 16, gap: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <NativeContainer
            measure="wide"
            style={{
              minWidth: 0,
              maxWidth: "100%",
              alignSelf: "stretch",
              padding: 0,
            }}
          >
            <NativeStack>
              {labChrome}
              {family === "foundations" ? (
                <FoundationsFamily
                  profile={profile}
                  appearance={appearance}
                  density={density}
                  motion={motion}
                />
              ) : null}
              {family === "forms" ? <FormsFamily /> : null}
              {family === "navigation" ? <NavigationFamily /> : null}
              {family === "workflow" ? <WorkflowFamily /> : null}
              {family === "ai" ? <AiFamily /> : null}
              {family === "device" ? <DeviceFamily /> : null}
              <NativeText intent="caption" tone="muted">
                No API, authentication, persistence, upload, camera, location,
                push, secure-storage, or background-task implementation is
                bundled in this lab.
              </NativeText>
            </NativeStack>
          </NativeContainer>
        </ScrollView>
      )}
    </NativeScreen>
  );
}

export default function App() {
  const [profile, setProfile] = useState<BrandProfileId>("aapm-farm");
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [density, setDensity] = useState<
    "comfortable" | "default" | "compact" | "dense"
  >("comfortable");
  const [motion, setMotion] = useState<"full" | "reduced">("full");
  const [family, setFamily] = useState<FamilyId>("foundations");
  return (
    <NativeThemeProvider
      profile={profile}
      appearance={appearance}
      density={density}
      motion={motion}
    >
      <NativeLab
        profile={profile}
        setProfile={setProfile}
        appearance={appearance}
        setAppearance={setAppearance}
        density={density}
        setDensity={setDensity}
        motion={motion}
        setMotion={setMotion}
        family={family}
        setFamily={setFamily}
      />
    </NativeThemeProvider>
  );
}
