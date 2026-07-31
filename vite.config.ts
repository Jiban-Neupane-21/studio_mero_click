import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import legacy from "@vitejs/plugin-legacy"; // <-- YO ADD GARNUHOS

// https://vite.dev/config/
export default defineConfig({
  base: "./", // <-- YO LINE YAHA (plugins bhanda bahira) RAKHNUHOS
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
