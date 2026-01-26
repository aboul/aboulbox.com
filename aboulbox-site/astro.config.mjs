// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import getFilesOnDisk from "./plugins/build-release";

const buildDir = "dest/release_" + Date.now();
const outDir = import.meta.env.DEV ? "dist" : buildDir;

// https://astro.build/config
export default defineConfig({
  base: "/",
  site: import.meta.env.SERVER_NAME,
  trailingSlash: "never",
  integrations: [react()],
  server: { port: 3000, host: true },
  vite: {
    plugins: [tailwindcss(), getFilesOnDisk(buildDir)],
  },

  outDir: outDir,
});
