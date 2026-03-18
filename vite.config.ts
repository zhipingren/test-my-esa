import vesaErrorReporter from './.vesa/vite-error-plugin.js';
import vesaErrorReporter from './.vesa/vite-error-plugin.js';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
  plugins: [vesaErrorReporter(), vesaErrorReporter(), tailwindcss(), react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
