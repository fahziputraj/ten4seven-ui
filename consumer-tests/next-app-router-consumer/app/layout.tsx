import "@ten4seven/ui/styles.css";
import "./proof.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import ClientProvider from "./client-provider";

export const metadata: Metadata = {
  title: "Ten4Seven Next.js consumer proof",
  description: "Bounded Next.js 16 and React 19 package compatibility proof.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
