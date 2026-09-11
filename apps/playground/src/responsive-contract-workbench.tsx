import {
  moduleStates as generatedModuleStates,
  responsiveShell as generatedResponsiveShell,
} from "@ten4seven/agent/generated";
import type {
  ModuleStateContract,
  ModuleStateId,
  ResponsiveContract,
} from "@ten4seven/contracts";
import {
  Badge,
  Button,
  Collapsible,
  DataTable,
  ModuleState,
  Typography,
} from "@ten4seven/ui";

const responsive = generatedResponsiveShell as unknown as ResponsiveContract;
const moduleStateContract =
  generatedModuleStates as unknown as ModuleStateContract;

const behaviorRows = Object.values(responsive.components).map((behavior) => ({
  id: behavior.id,
  pattern: behavior.displayName,
  desktop: behavior.desktop.mode,
  tablet: behavior.tablet.mode,
  mobile: behavior.mobile.mode,
}));

const proofStates: ModuleStateId[] = [
  "setup-required",
  "dependency-unavailable",
  "read-only",
];

/** A compact generated-contract proof for the Q04 shell and module-state API. */
export function ResponsiveContractWorkbench() {
  return (
    <section
      aria-label="Responsive shell and module-state contracts"
      className="studio-responsive-contracts"
      data-testid="studio-responsive-contracts"
    >
      <div className="studio-responsive-contracts-heading">
        <div>
          <Typography typeRole="overline">
            Q04 · presentation contracts
          </Typography>
          <Typography as="h2" typeRole="heading-md">
            Responsive shell &amp; module states
          </Typography>
          <Typography as="p" typeRole="body-sm">
            Generated behavior metadata keeps shell, narrow layouts, and
            module-state presentation aligned across private app surfaces.
          </Typography>
        </div>
        <Badge tone="success">Generated · v{responsive.schemaVersion}</Badge>
      </div>

      <div className="studio-responsive-contract-summary">
        <span>
          <strong>{Object.keys(responsive.shell.viewportBands).length}</strong>
          <small>viewport bands</small>
        </span>
        <span>
          <strong>{Object.keys(responsive.components).length}</strong>
          <small>behavior contracts</small>
        </span>
        <span>
          <strong>{Object.keys(moduleStateContract.states).length}</strong>
          <small>module states</small>
        </span>
        <span>
          <strong>1</strong>
          <small>shared shell grammar</small>
        </span>
      </div>

      <Collapsible
        className="studio-responsive-contract-panel"
        id="responsive-contracts"
        title={
          <span className="studio-responsive-contract-panel-title">
            <span>Viewport &amp; component behavior</span>
            <small>One matrix for desktop, tablet, and mobile</small>
          </span>
        }
      >
        <div className="studio-responsive-contract-content">
          <div className="studio-responsive-viewport-grid">
            {Object.values(responsive.shell.viewportBands).map((band) => (
              <div className="studio-responsive-viewport" key={band.id}>
                <Typography typeRole="label">{band.label}</Typography>
                <Typography typeRole="caption">
                  {band.minWidth === null ? "up to" : `from ${band.minWidth}px`}
                  {band.maxWidth === null ? "" : ` · ${band.maxWidth}px max`}
                </Typography>
              </div>
            ))}
          </div>
          <DataTable
            caption="Responsive component behavior matrix"
            columns={[
              {
                key: "pattern",
                header: "Pattern",
                render: (row) => <strong>{row.pattern}</strong>,
              },
              { key: "desktop", header: "Desktop" },
              { key: "tablet", header: "Tablet" },
              { key: "mobile", header: "Mobile" },
            ]}
            density="compact"
            responsive="stacked"
            rowKey={(row) => row.id}
            rows={behaviorRows}
          />
        </div>
      </Collapsible>

      <Collapsible
        className="studio-responsive-contract-panel"
        id="module-states"
        title={
          <span className="studio-responsive-contract-panel-title">
            <span>Module-state presentation</span>
            <small>Rendering only · consumer owns meaning and actions</small>
          </span>
        }
      >
        <div className="studio-module-state-proof">
          <div className="studio-module-state-proof-note">
            <Typography typeRole="body-sm">
              The shared renderer receives a state and optional ReactNode
              actions. It does not evaluate entitlement, permission, tenant
              scope, or lifecycle transitions.
            </Typography>
            <Button intent="quiet" size="sm">
              Contract boundary
            </Button>
          </div>
          <div className="studio-module-state-grid">
            {proofStates.map((state) => {
              const pattern = moduleStateContract.states[state];
              return (
                <ModuleState
                  description={pattern.defaultDescription}
                  key={state}
                  state={state}
                  title={pattern.defaultTitle}
                />
              );
            })}
          </div>
        </div>
      </Collapsible>
    </section>
  );
}
