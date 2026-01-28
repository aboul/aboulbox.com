// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import rollingRelease from "./src/integrations/rolling.ts";

// https://astro.build/config
export default defineConfig({
  base: "/",
  site: import.meta.env.SERVER_NAME,

  trailingSlash: "never",
  integrations: [rollingRelease(), react()],
  server: { port: 3000, host: true },
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
});
