import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://hybridcal.dev.sunyempire.edu",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, "/api/v1/calendar/all?_format=json"),
  //     },
  //     "/next": {
  //       target: "https://hybridcal.dev.sunyempire.edu",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/next/, "/api/v1/calendar/all?_format=json&page=4"), // General rewrite for /api/v1
  //     },
  //     "/filtered": {
  //       target: "https://hybridcal.dev.sunyempire.edu",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/filtered/, "api/v1/calendar/202411?_format=json"), // General rewrite for /api/v1
  //     },
  //   },
  // },
  plugins: [react()],
});
