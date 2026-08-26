import { useState } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import { Badge, Button, Modal, Select, Typography } from "@ten4seven/ui";

import {
  libraryNavigation,
  playgroundRoutePaths,
  referenceNavigation,
  studioNavigation,
  type PlaygroundRoute,
} from "./playground-routes";

export type ReferenceViewState = "ready" | "loading" | "error" | "empty";

const routeIcons: Record<PlaygroundRoute, IconName> = {
  "Theme Studio": "theme",
  Tokens: "tokens",
  Components: "components",
  Icons: "category",
  Recipes: "table",
  "Warehouse Inventory": "warehouse",
  "Publishing Store": "book",
};

const routeGroups = [
  { label: "Studio", routes: studioNavigation },
  { label: "Library", routes: libraryNavigation },
  { label: "References", routes: referenceNavigation },
] as const;

export interface ReferenceHarnessProps {
  activeRoute: PlaygroundRoute;
  onNavigate: (route: PlaygroundRoute) => void;
  warehouseViewState: ReferenceViewState;
  onWarehouseViewStateChange: (viewState: ReferenceViewState) => void;
}

export function ReferenceHarness({
  activeRoute,
  onNavigate,
  onWarehouseViewStateChange,
  warehouseViewState,
}: ReferenceHarnessProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="reference-harness-trigger">
        <Button
          aria-expanded={open}
          aria-label="Open ten4seven reference harness"
          intent="secondary"
          leadingIcon="components"
          onClick={() => setOpen(true)}
          size="sm"
        >
          Reference
        </Button>
      </div>

      <Modal
        description="Playground-only controls are kept outside the product shells."
        onClose={() => setOpen(false)}
        open={open}
        title="Reference harness"
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

          {activeRoute === "Warehouse Inventory" ? (
            <div className="reference-harness-simulation">
              <Select
                label="Fixture state"
                onChange={(event) =>
                  onWarehouseViewStateChange(
                    event.target.value as ReferenceViewState,
                  )
                }
                value={warehouseViewState}
              >
                <option value="ready">Ready</option>
                <option value="loading">Loading</option>
                <option value="error">Error</option>
                <option value="empty">Empty</option>
              </Select>
              <Typography typeRole="caption">
                State simulation belongs to this reference-only surface, not to
                the warehouse query.
              </Typography>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
