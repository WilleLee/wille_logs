import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
      "@components": path.resolve(__dirname, "./app/_components"),
      "@hooks": path.resolve(__dirname, "./app/_hooks"),
      "@models": path.resolve(__dirname, "./app/_models"),
      "@libs": path.resolve(__dirname, "./app/_libs"),
      "@mocks": path.resolve(__dirname, "./app/_mocks"),
      "@assets": path.resolve(__dirname, "./public"),
    },
  },
});
