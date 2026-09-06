"use client";

import { exactColor, Ten4SevenProvider } from "@ten4seven/ui";
import type { ReactNode } from "react";

/**
 * The only client boundary needed by this proof. The route itself stays a
 * Server Component while the provider and interactive package graph hydrate
 * below this wrapper.
 */
export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Ten4SevenProvider
      accent={exactColor("#D4451A")}
      appearance="system"
      palette="emerald"
      preferences={{ motion: "reduced" }}
      primary={exactColor("#318139")}
      typography="modern"
    >
      {children}
    </Ten4SevenProvider>
  );
}
