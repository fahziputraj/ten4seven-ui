import { useState } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import { Badge, Button, Modal, Select, Typography } from "@ten4seven/ui";

import type { PlaygroundBuildIdentity } from "./build-identity";
import {
  playgroundNavigationGroups,
  playgroundRoutePaths,
  type PlaygroundRoute,
} from "./playground-routes";

export type ReferenceViewState = "ready" | "loading" | "error" | "empty";

const routeIcons: Record<PlaygroundRoute, IconName> = {
  "Theme Studio": "theme",
  "Component Lab": "components",
  Tokens: "tokens",
  Components: "components",
  Blocks: "components",
  Icons: "category",
  Recipes: "table",
  "Operations Tracker": "analytics",
  "Operational Patterns": "logistics",
  "SaaS Control Plane": "admin",
  "ERP Density Reference": "table",
  "Farm P1 Reference": "farm",
  "Publishing Store": "book",
  "Public Showcase": "dashboard",
};

const routeGroups = playgroundNavigationGroups.map(({ label, routes }) => ({
  label,
  routes,
}));

export interface ReferenceHarnessProps {
  activeRoute: PlaygroundRoute;
  buildIdentity: PlaygroundBuildIdentity;
  onNavigate: (route: PlaygroundRoute) => void;
  onOpenChange?: (open: boolean) => void;
  operationsViewState: ReferenceViewState;
  onOperationsViewStateChange: (viewState: ReferenceViewState) => void;
  open?: boolean;
}

export function ReferenceHarness({
  activeRoute,
  buildIdentity,
  onNavigate,
  onOpenChange,
  onOperationsViewStateChange,
  operationsViewState,
  open,
}: ReferenceHarnessProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = open ?? uncontrolledOpen;

  function setOpen(nextOpen: boolean) {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  return (
    <>
      <div
        className="reference-harness-trigger"
        data-testid="reference-harness-trigger"
      >
        <Button
          aria-expanded={isOpen}
          aria-label="Open ten4seven reference QA controls"
          aria-haspopup="dialog"
          intent="secondary"
          leadingIcon="components"
          onClick={() => setOpen(true)}
          size="sm"
        >
          QA
        </Button>
      </div>

      <Modal
        description="QA-only controls remain outside consumer preview routes."
        onClose={() => setOpen(false)}
        open={isOpen}
        title="Reference QA"
      >
        <div className="reference-harness-content">
          <div className="reference-harness-status">
            <Badge tone="success">
              <T7Icon name="success" size={13} /> Local deterministic fixture
            </Badge>
            <Typography typeRole="caption">
              Active route: {playgroundRoutePaths[activeRoute]}
            </Typography>
          </div>

          <section
            aria-labelledby="reference-build-identity-title"
            className="reference-harness-build-identity"
            data-testid="build-identity"
          >
            <div className="reference-harness-build-identity-heading">
              <Typography
                as="h2"
                id="reference-build-identity-title"
                typeRole="overline"
              >
                Runtime build identity
              </Typography>
              <Badge tone={buildIdentity.dirty ? "warning" : "success"}>
                {buildIdentity.dirty ? "Working tree" : "Clean build"}
              </Badge>
            </div>
            <dl className="reference-harness-build-identity-list">
              <div data-build-identity-field="version">
                <dt>Package</dt>
                <dd>{buildIdentity.appVersion}</dd>
              </div>
              <div data-build-identity-field="commit">
                <dt>Commit</dt>
                <dd>{buildIdentity.commit}</dd>
              </div>
              <div data-build-identity-field="branch">
                <dt>Branch / ref</dt>
                <dd>{buildIdentity.branch}</dd>
              </div>
            </dl>
            <Typography typeRole="caption">
              Playground QA metadata only; product and consumer shells do not
              render build diagnostics.
            </Typography>
          </section>

          <div className="reference-harness-navigation">
            {routeGroups.map((group) => (
              <section key={group.label}>
                <Typography typeRole="overline">{group.label}</Typography>
                <div>
                  {group.routes.map((route) => (
                    <Button
                      aria-current={activeRoute === route ? "page" : undefined}
                      intent={activeRoute === route ? "secondary" : "quiet"}
                      key={route}
                      leadingIcon={routeIcons[route]}
                      onClick={() => {
                        onNavigate(route);
                        setOpen(false);
                      }}
                      size="sm"
                    >
                      {route}
                    </Button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {activeRoute === "Operations Tracker" ? (
            <div className="reference-harness-simulation">
              <Select
                label="Fixture state"
                onChange={(event) =>
                  onOperationsViewStateChange(
                    event.target.value as ReferenceViewState,
                  )
                }
                value={operationsViewState}
              >
                <option value="ready">Ready</option>
                <option value="loading">Loading</option>
                <option value="error">Error</option>
                <option value="empty">Empty</option>
              </Select>
              <Typography typeRole="caption">
                State simulation belongs to this reference-only surface, not to
                the operations tracker query.
              </Typography>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
