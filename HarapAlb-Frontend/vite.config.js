import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), vue()],
  build: {
    assetsInclude: ["src/**"],
  },
  server: {
    proxy: {
      "/SfantaDuminica": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});