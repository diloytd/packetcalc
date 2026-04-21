import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const webRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@roller-blind-viewer/shared": path.resolve(
        webRoot,
        "../../packages/shared/src",
      ),
    },
  },
  server: {
    port: 5173,
  },
});
