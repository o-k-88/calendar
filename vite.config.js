import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      composition: path.resolve(__dirname, "./src/composition"),
      containers: path.resolve(__dirname, "./src/containers"),
      constants: path.resolve(__dirname, "./src/constants"),
      helpers: path.resolve(__dirname, "./src/helpers"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      context: path.resolve(__dirname, "./src/context"),
      layout: path.resolve(__dirname, "./src/layout"),
    },
  },
});
