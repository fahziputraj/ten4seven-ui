import { useState } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  Alert,
  AppShell,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  KPICluster,
  KeyValueList,
  PageHeader,
  RecordSummary,
  Select,
  Spinner,
  StateView,
  Typography,
} from "@ten4seven/ui";

import { PlaygroundSidebar, PlaygroundTopbar } from "./playground-chrome";

type FarmScenarioState =
  "current" | "loading" | "no_data" | "error" | "out_of_scope" | "not_found";

type FarmRecord = {
  id: string;
  name: string;
  region: string;
  owner: string;
  lastSync: string;
  eggs: string;
  population: string;
  mortality: string;
  henDay: string;
  feedIntake: string;
  fcr: string;
};

const farmRecords: FarmRecord[] = [
  {
    id: "farm-north",
    name: "Farm North",
    region: "Kediri · Unit 01",
    owner: "Sari Wulandari",
    lastSync: "Today · 09:20",
    eggs: "42,860",
    population: "48,240",
    mortality: "0.8%",
    henDay: "88.7%",
    feedIntake: "112 g",
    fcr: "1.72",
  },
  {
    id: "farm-central",
    name: "Farm Central",
    region: "Blitar · Unit 02",
    owner: "Dewi Lestari",
    lastSync: "Today · 09:12",
    eggs: "38,410",
    population: "44,980",
    mortality: "0.6%",
    henDay: "85.4%",
    feedIntake: "109 g",
    fcr: "1.76",
  },
  {
    id: "farm-south",
    name: "Farm South",
    region: "Tulungagung · Unit 03",
    owner: "Bima Pranoto",
    lastSync: "Today · 08:57",
    eggs: "31,290",
    population: "36,720",
    mortality: "1.1%",
    henDay: "82.8%",
    feedIntake: "115 g",
    fcr: "1.81",
  },
];

const scenarioOptions: Array<{
  label: string;
  value: FarmScenarioState;
}> = [
  { label: "Current", value: "current" },
  { label: "Loading", value: "loading" },
  { label: "No data", value: "no_data" },
  { label: "Error", value: "error" },
  { label: "Out of scope", value: "out_of_scope" },
  { label: "Not found", value: "not_found" },
];

function FarmContextCard({
  farm,
  farmId,
  onFarmChange,
  scenarioState,
  onScenarioChange,
}: {
  farm: FarmRecord;
  farmId: string;
  onFarmChange: (farmId: string) => void;
  scenarioState: FarmScenarioState;
  onScenarioChange: (state: FarmScenarioState) => void;
}) {
  return (
    <Card className="operations-domain-card farm-proof-context-card">
      <CardHeader>
        <div>
          <CardTitle>Farm context</CardTitle>
          <CardDescription>
            Choose only from contexts supplied by the consumer authorization
            boundary.
          </CardDescription>
        </div>
        <Badge tone="success">Authorized</Badge>
      </CardHeader>
      <CardContent>
        <div className="farm-proof-controls" data-t7-rail="form">
          <Select
            id="farm-context-selector"
            label="Farm context selector"
            onChange={(event) => onFarmChange(event.target.value)}
            value={farmId}
          >
            {farmRecords.map((record) => (
              <option key={record.id} value={record.id}>
                {record.name}
              </option>
            ))}
          </Select>
          <Select
            id="farm-proof-scenario"
            label="Scenario state"
            onChange={(event) =>
              onScenarioChange(event.target.value as FarmScenarioState)
            }
            value={scenarioState}
          >
            {scenarioOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <Typography typeRole="caption">
          State selection is local fixture control for this proof; no Farm
          request, authorization decision, or persistence is performed.
        </Typography>
        <KeyValueList
          aria-label="Selected farm metadata"
          items={[
            { label: "Region", value: farm.region },
            { label: "Owner", value: farm.owner },
          ]}
        />
      </CardContent>
    </Card>
  );
}

function FarmIdentityCard({ farm }: { farm: FarmRecord }) {
  return (
    <Card className="operations-domain-card farm-proof-identity-card">
      <CardContent>
        <RecordSummary
          description={`${farm.region} · production snapshot supplied by the consumer`}
          eyebrow="Selected authorized farm"
          media={
            <span className="operations-record-icon">
              <T7Icon aria-hidden="true" name="farm" size={19} />
            </span>
          }
          metadata={<Badge tone="primary">Current context</Badge>}
          title={farm.name}
        />
        <KeyValueList
          aria-label="Farm identity and ownership"
          items={[
            { label: "Farm ID", value: farm.id },
            { label: "Accountable owner", value: farm.owner },
            { label: "Last snapshot", value: farm.lastSync },
          ]}
        />
      </CardContent>
    </Card>
  );
}

function FarmOverviewMetrics({ farm }: { farm: FarmRecord }) {
  return (
    <section
      aria-labelledby="farm-production-signals"
      className="farm-proof-overview"
    >
      <div className="reference-section-bar">
        <div>
          <Typography
            as="h2"
            id="farm-production-signals"
            typeRole="heading-lg"
          >
            Production signals
          </Typography>
          <Typography typeRole="body-sm">
            A small, truthful Farm Overview slice supplied by the consumer.
          </Typography>
        </div>
        <Badge tone="success">Current snapshot</Badge>
      </div>
      <KPICluster
        columns={3}
        items={[
          {
            icon: "stockIn",
            label: "Eggs",
            note: "collected today",
            value: farm.eggs,
          },
          {
            icon: "users",
            label: "Population",
            note: "active hens",
            value: farm.population,
          },
          {
            icon: "danger",
            label: "Mortality",
            note: "today's rate",
            tone: "warning",
            value: farm.mortality,
          },
          {
            icon: "analytics",
            label: "Hen Day",
            note: "production rate",
            value: farm.henDay,
          },
          {
            icon: "package",
            label: "Feed Intake",
            note: "per hen / day",
            value: farm.feedIntake,
          },
          {
            icon: "chart",
            label: "FCR",
            note: "consumer-provided ratio",
            value: farm.fcr,
          },
        ]}
        label="Farm overview metrics"
        variant="cards"
      />
      <Alert
        description="These values are static synthetic fixture data. The UI does not derive FCR, evaluate flock health, or persist a Farm update."
        title="Consumer-owned production truth"
        tone="info"
      />
    </section>
  );
}

function FarmScenarioSurface({
  farm,
  scenarioState,
  onReturnToCurrent,
}: {
  farm: FarmRecord;
  scenarioState: FarmScenarioState;
  onReturnToCurrent: () => void;
}) {
  if (scenarioState === "current") {
    return <FarmOverviewMetrics farm={farm} />;
  }

  if (scenarioState === "loading") {
    return (
      <Card
        aria-live="polite"
        className="operations-domain-card farm-proof-state-card"
        data-testid="farm-proof-state-surface"
        data-state="loading"
      >
        <CardContent>
          <div className="farm-proof-loading">
            <Spinner label="Loading farm overview" size="lg" />
            <div>
              <Typography as="h2" typeRole="heading-sm">
                Loading farm overview
              </Typography>
              <Typography typeRole="body-sm">
                The consumer is preparing a Farm snapshot. This fixture does not
                start a network request.
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stateCopy: Record<
    Exclude<FarmScenarioState, "current" | "loading">,
    {
      action: string;
      description: string;
      state: "empty" | "error" | "permission" | "unavailable";
      title: string;
    }
  > = {
    error: {
      action: "Retry synthetic read",
      description:
        "The synthetic read failed safely. No retry calls a real API or changes Farm data.",
      state: "error",
      title: "Farm overview could not be loaded",
    },
    no_data: {
      action: "Return to current fixture",
      description:
        "The authorized context is present, but this selected window returned no production snapshot.",
      state: "empty",
      title: "No farm data available",
    },
    not_found: {
      action: "Use an authorized farm",
      description:
        "The selected resource is unavailable; the consumer keeps the user in a safe, non-destructive state.",
      state: "unavailable",
      title: "Farm context not found",
    },
    out_of_scope: {
      action: "Use an authorized farm",
      description:
        "No overview is shown until a consumer-provided authorization result confirms access to this Farm.",
      state: "permission",
      title: "Farm is outside your authorized scope",
    },
  };
  const copy = stateCopy[scenarioState];

  return (
    <Card
      className="operations-domain-card farm-proof-state-card"
      data-testid="farm-proof-state-surface"
      data-state={scenarioState}
    >
      <CardContent>
        <StateView
          action={
            <Button intent="secondary" onClick={onReturnToCurrent} size="sm">
              {copy.action}
            </Button>
          }
          description={copy.description}
          state={copy.state}
          title={copy.title}
        />
      </CardContent>
    </Card>
  );
}

export interface FarmSyntheticProofProps {
  onNavigatePath?: (path: string) => void;
  onOpenSettings?: () => void;
}

export function FarmSyntheticProof({
  onNavigatePath,
  onOpenSettings,
}: FarmSyntheticProofProps) {
  const [farmId, setFarmId] = useState(farmRecords[0].id);
  const [scenarioState, setScenarioState] =
    useState<FarmScenarioState>("current");
  const farm =
    farmRecords.find((record) => record.id === farmId) ?? farmRecords[0];
  const navigatePath = onNavigatePath ?? (() => undefined);

  const sidebar = (
    <PlaygroundSidebar
      activePath="/farm-synthetic-proof"
      localNavigation={[
        {
          key: "authorized-farms",
          label: "Authorized Farms",
          items: farmRecords.map((record) => ({
            active: record.id === farm.id,
            badge: record.id === farm.id ? "Current" : undefined,
            icon: "farm" as IconName,
            key: record.id,
            label: record.name,
            onSelect: () => {
              setFarmId(record.id);
              setScenarioState("current");
            },
          })),
        },
      ]}
      footer={
        <Typography typeRole="caption">
          Synthetic fixture · no live Farm data
        </Typography>
      }
      label="Authorized Farms"
      onNavigatePath={navigatePath}
    />
  );

  return (
    <AppShell
      className="reference-app-shell operations-app-shell operational-reference-shell farm-proof-shell"
      data-shell-contract="reference-shell"
      data-shell-variant="contextual"
      sidebar={sidebar}
      stickyHeader
      topbar={
        <PlaygroundTopbar
          activeRoute="Farm P1 Reference"
          backLabel="Back to Studio"
          breadcrumbItems={[{ label: "Farm Synthetic" }]}
          onNavigatePath={navigatePath}
          onOpenSettings={onOpenSettings}
          settingsLabel="Open Farm proof settings"
          showBack={Boolean(onNavigatePath)}
        />
      }
    >
      <div
        className="reference-page operations-reference farm-proof-page"
        data-farm-id={farm.id}
        data-farm-state={scenarioState}
        data-profile="enterprise"
        data-testid="farm-synthetic-proof"
      >
        <PageHeader
          actions={
            <Button
              intent="secondary"
              leadingIcon="settings"
              onClick={onOpenSettings}
              size="sm"
            >
              Theme settings
            </Button>
          }
          description="A bounded Farm consumer composition that proves authorized context, Farm Overview metrics, and safe loading/recovery states without implementing Farm business behavior."
          meta={
            <>
              <Badge tone="primary">
                <T7Icon name="farm" size={13} />
                Farm consumer proof
              </Badge>
              <Typography typeRole="caption">
                Synthetic proof · AAPM production adoption unverified
              </Typography>
            </>
          }
          overline="AppShell · Authorized Farms · Farm Overview"
          title="Farm Overview"
        />

        <div className="farm-proof-context-grid">
          <FarmContextCard
            farm={farm}
            farmId={farm.id}
            onFarmChange={(nextFarmId) => {
              setFarmId(nextFarmId);
              setScenarioState("current");
            }}
            onScenarioChange={setScenarioState}
            scenarioState={scenarioState}
          />
          <FarmIdentityCard farm={farm} />
        </div>

        <FarmScenarioSurface
          farm={farm}
          onReturnToCurrent={() => setScenarioState("current")}
          scenarioState={scenarioState}
        />
      </div>
    </AppShell>
  );
}
