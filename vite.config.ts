import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import legacy from "@vitejs/plugin-legacy"; // <-- YO ADD GARNUHOS

// https://vite.dev/config/
export default defineConfig({
  // When deploying to the root of a domain (like studiomeroclick.com.np),
  // it's best to use the default '/' base. Using './' can cause issues
  // with routing and asset paths in a Single Page Application.
  // base: "./",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    legacy({
      targets: ["defaults", "not IE 11"], // Pure traditional JavaScript convert garne
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
  },
});
