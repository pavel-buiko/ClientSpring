import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "/ClientSpring/",
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://server-ancient-grass-9030.fly.dev",
      },
    },
  },
});
