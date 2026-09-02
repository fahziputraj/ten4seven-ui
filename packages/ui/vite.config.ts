import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  resolve: {
    alias: {
      "@ten4seven/contracts": fileURLToPath(
        new URL("../contracts/src/index.ts", import.meta.url),
      ),
      "@ten4seven/icons": fileURLToPath(
        new URL("../icons/src/index.tsx", import.meta.url),
      ),
      "@ten4seven/tokens": fileURLToPath(
        new URL("../tokens/src/index.ts", import.meta.url),
      ),
    },
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    rollupOptions: {
      external: (id) =>
        id === "react" || id === "react-dom" || id.startsWith("react/"),
      output: {
        exports: "named",
      },
    },
    sourcemap: true,
  },
});
