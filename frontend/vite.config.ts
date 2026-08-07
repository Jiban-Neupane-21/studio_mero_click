import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  envDir: "../",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Proxy API requests to your Node.js server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Ensure the /api prefix is kept
      },
    },
  },
});
