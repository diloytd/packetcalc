import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const webRoot = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(webRoot, "../..");
const rootNodeModules = path.resolve(workspaceRoot, "node_modules");

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@roller-blind-viewer/roller-blind-viewer": path.resolve(
        webRoot,
        "../../packages/roller-blind-viewer/src",
      ),
      "@roller-blind-viewer/shared": path.resolve(
        webRoot,
        "../../packages/shared/src",
      ),
      react: path.resolve(rootNodeModules, "react"),
      "react/jsx-runtime": path.resolve(rootNodeModules, "react/jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve(
        rootNodeModules,
        "react/jsx-dev-runtime.js",
      ),
      "react-dom": path.resolve(rootNodeModules, "react-dom"),
      "react-dom/client": path.resolve(rootNodeModules, "react-dom/client.js"),
    },
  },
  server: {
    port: 5173,
  },
});
