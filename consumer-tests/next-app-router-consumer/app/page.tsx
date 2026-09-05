import { Button } from "@ten4seven/ui";

import ClientDemo from "./client-demo";

/**
 * This file intentionally has no "use client" directive. It proves that a
 * normal App Router Server Component can compose the explicit client proof.
 */
export default function Page() {
  return (
    <main className="proof-shell" data-testid="server-page">
      <div className="proof-wrap">
        <header className="proof-intro">
          <p className="proof-kicker">T7UI-NEXT-001</p>
          <h1>Next.js App Router consumer proof</h1>
          <p>
            This page remains a Server Component. Interactive ten4seven UI is
            mounted only below the explicit client provider boundary.
          </p>
          <p
            className="proof-server-marker"
            data-testid="server-component-marker"
          >
            Server Component route rendered successfully.
          </p>
          <Button data-testid="server-import-button" intent="quiet">
            Server-tree action
          </Button>
        </header>
        <ClientDemo />
      </div>
    </main>
  );
}
