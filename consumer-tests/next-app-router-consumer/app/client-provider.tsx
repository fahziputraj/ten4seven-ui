"use client";

import { Ten4SevenProvider } from "@ten4seven/ui";
import type { ReactNode } from "react";

/**
 * The only client boundary needed by this proof. The route itself stays a
 * Server Component while the provider and interactive package graph hydrate
 * below this wrapper.
 */
export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Ten4SevenProvider
      accent="orange"
      appearance="system"
      palette="emerald"
      preferences={{ motion: "reduced" }}
      primary="emerald"
      typography="modern"
    >
      {children}
    </Ten4SevenProvider>
  );
}
