import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    root: "playground", // Vite is only used for the playground
    plugins: [react()],
    build: {
      outDir: "../dist", 
    },
  };
});

