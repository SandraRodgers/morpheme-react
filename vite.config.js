import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "playground", // Vite is only used for the playground
  plugins: [react()],
  build: {
    outDir: "../dist", 
  },
});
