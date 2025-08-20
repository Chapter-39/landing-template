import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
    pool: "threads",
    maxWorkers: 1,
    poolOptions: {
      threads: { singleThread: true },
    },
    coverage: {
      provider: "v8",
    },
  },
});
