import { useState } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import { Badge, Button, Modal, Select, Typography } from "@ten4seven/ui";

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
  onNavigate: (route: PlaygroundRoute) => void;
  onOpenChange?: (open: boolean) => void;
  operationsViewState: ReferenceViewState;
  onOperationsViewStateChange: (viewState: ReferenceViewState) => void;
  open?: boolean;
}

export function ReferenceHarness({
  activeRoute,
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
