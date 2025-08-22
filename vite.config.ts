import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // Default to root. For GitHub project pages, set base to "/<repo>/".
  base: "/",
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@shared": "@chapter-39/shared-template",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Allow @use of packages in node_modules
        includePaths: ["node_modules"],
      },
    },
  },
});
