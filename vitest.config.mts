import { defineConfig, Plugin } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths() as Plugin],
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      // reporter: ["text", "html"],
    },
  },
});
