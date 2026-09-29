import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // Match Next.js: components use the automatic JSX runtime (no `import React`).
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
