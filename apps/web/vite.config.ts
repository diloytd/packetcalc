import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const webRoot = path.dirname(fileURLToPath(import.meta.url));
const webNodeModules = path.resolve(webRoot, "node_modules");

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
      react: path.resolve(webNodeModules, "react"),
      "react/jsx-runtime": path.resolve(webNodeModules, "react/jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve(
        webNodeModules,
        "react/jsx-dev-runtime.js",
      ),
      "react-dom": path.resolve(webNodeModules, "react-dom"),
      "react-dom/client": path.resolve(webNodeModules, "react-dom/client.js"),
    },
  },
  server: {
    port: 5173,
  },
});
