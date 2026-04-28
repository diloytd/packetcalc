import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Production-сборка пакета в режиме Vite library mode.
 *
 * На выходе: ESM `dist/index.js`, стили `dist/roller-blind-viewer.css` (в бандл добавляется
 * `import './roller-blind-viewer.css'` через `vite-plugin-lib-inject-css`), единый
 * `dist/index.d.ts` (`vite-plugin-dts` + `rollupTypes`). Зависимости `react`, `react-dom`,
 * `three`, `@react-three/fiber`, `@react-three/drei` не бандлятся — их ставит приложение.
 */
export default defineConfig({
  plugins: [
    libInjectCss(),
    react(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.build.json"),
      exclude: ["src/stories/**", "**/*.stories.*", "src/vite-env.d.ts"],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
      ],
      output: {
        assetFileNames: "roller-blind-viewer.[ext]",
      },
    },
  },
});
