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
      "@components": path.resolve(__dirname, "./app/components"),
      "@hooks": path.resolve(__dirname, "./app/hooks"),
      "@models": path.resolve(__dirname, "./app/models"),
      "@libs": path.resolve(__dirname, "./app/libs"),
      "@mocks": path.resolve(__dirname, "./app/mocks"),
      "@styles": path.resolve(__dirname, "./app/styles"),
      "@atoms": path.resolve(__dirname, "./app/atoms"),
      "@assets": path.resolve(__dirname, "./public"),
      "@images": path.resolve(__dirname, "./public/images"),
    },
  },
});
