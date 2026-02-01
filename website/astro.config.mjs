// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import rollingRelease from "./src/integrations/rolling.ts";

const server_name = import.meta.env.SERVER_NAME;

// https://astro.build/config
export default defineConfig({
  base: "/",
  site: server_name,

  trailingSlash: "never",
  integrations: [rollingRelease(), react()],
  server: { port: 3000, host: true, allowedHosts: true },
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  }
});
