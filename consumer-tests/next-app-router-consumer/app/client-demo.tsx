"use client";

import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  Select,
  T7Icon,
  useTen4SevenTheme,
} from "@ten4seven/ui";

export default function ClientDemo() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("north");
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { appearanceSetting, setTheme, theme } = useTen4SevenTheme();

  return (
    <section
      aria-labelledby="client-proof-heading"
      className="proof-card"
      data-testid="client-demo"
    >
      <div className="proof-card-heading">
        <span className="proof-icon">
          <T7Icon label="Dashboard" name="dashboard" size={20} />
        </span>
        <div>
          <p className="proof-kicker">Client boundary</p>
          <h2 id="client-proof-heading">Interactive ten4seven surface</h2>
        </div>
      </div>

      <p className="proof-copy">
        Provider, semantic icon, controlled fields, listbox, native dialog,
        theme modes, and keyboard behavior all come from the packed package.
      </p>

      <dl className="proof-state" data-testid="theme-state">
        <div>
          <dt>Resolved mode</dt>
          <dd data-testid="theme-mode">{theme.appearance}</dd>
        </div>
        <div>
          <dt>Requested mode</dt>
          <dd data-testid="theme-requested">{appearanceSetting}</dd>
        </div>
        <div>
          <dt>Provider portal</dt>
          <dd>{"#t7-overlay-root"}</dd>
        </div>
      </dl>

      <div
        aria-label="Theme appearance"
        className="proof-controls"
        data-testid="theme-controls"
        role="group"
      >
        <Button
          data-testid="theme-light"
          intent="secondary"
          onClick={() => setTheme({ appearance: "light" })}
          size="sm"
        >
          Light
        </Button>
        <Button
          data-testid="theme-dark"
          intent="secondary"
          onClick={() => setTheme({ appearance: "dark" })}
          size="sm"
        >
          Dark
        </Button>
        <Button
          data-testid="theme-system"
          intent="secondary"
          onClick={() => setTheme({ appearance: "system" })}
          size="sm"
        >
          System
        </Button>
      </div>

      <div className="proof-grid">
        <Input
          data-testid="name-input"
          id="farmer-name"
          label="Farmer name"
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
          }}
          placeholder="e.g. Sari"
          value={name}
        />
        <Select
          data-testid="region-select"
          id="farm-region"
          label="Farm region"
          onChange={(event) => {
            setRegion(event.target.value);
            setSaved(false);
          }}
          value={region}
        >
          <option value="north">North farm</option>
          <option value="central">Central farm</option>
          <option value="south">South farm</option>
        </Select>
      </div>

      <div className="proof-actions">
        <Button
          data-testid="save-button"
          leadingIcon="check"
          onClick={() => setSaved(true)}
        >
          Save profile
        </Button>
        <Button
          data-testid="open-modal"
          intent="secondary"
          onClick={() => setModalOpen(true)}
        >
          Open modal
        </Button>
      </div>

      {saved ? (
        <p className="proof-success" data-testid="saved-state" role="status">
          Saved {name || "profile"} for {region}.
        </p>
      ) : null}

      <Modal
        description="This native dialog is opened only after hydration."
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        title="Confirm consumer interaction"
      >
        <p data-testid="modal-content">
          Overlay content rendered through the provider-owned dialog contract.
        </p>
        <div className="proof-actions">
          <Button
            data-testid="modal-close"
            intent="secondary"
            onClick={() => setModalOpen(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </section>
  );
}
