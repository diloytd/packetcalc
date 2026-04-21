import { appName } from "@roller-blind-viewer/shared";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) {
  throw new Error("#app not found");
}

root.textContent = `${appName} — Vite + TS`;
