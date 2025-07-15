import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/static"),
    emptyOutDir: true,
  },
  base: "./", // Important for GitHub Pages
  server: {
    port: 3000,
  },
  define: {
    // Mock API endpoints for client-only deployment
    'process.env.API_URL': JSON.stringify(''),
  }
});
