import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from "dotenv";

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // HMR per mode
  let hmr = undefined;

  if (mode !== "production") {
    hmr = {
      host: process.env.SERVER_NAME,
      clientPort: 443,
      protocol: "wss",
    };
  } 

  // Enable env variables in index.html
  const htmlPlugin = () => {
      return {
          name: "html-transform",
          transformIndexHtml(html: string) {
            return html.replace(/%(.*?)%/g, (_match, p1) => {
              if(p1 in process.env) {
                return process.env[p1] as string;
              } 
              
              return ""
            });
          },
      };
  };

  return {
    base: "",
    appType: 'mpa',
    plugins: [htmlPlugin(), react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      origin: "https://localhost:" + 3000,
      hmr: hmr,
      watch: {
        usePolling: true
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
                return "vendor"; // all other package goes here
            }
          },
        },
      },
    },
  }
});

