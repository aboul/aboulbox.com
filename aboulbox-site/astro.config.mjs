// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  base: "/",
  site: import.meta.env.SERVER_NAME,
  trailingSlash: "never",
  integrations: [react()],
  server: { port: 3000, host: true },

  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    chromeDevtoolsWorkspace: true,
  },
});
