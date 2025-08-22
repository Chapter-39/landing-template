/* eslint-env node */
import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync, rmSync, existsSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexHtml = path.join(distDir, "index.html");
const bundleJs = path.join(distDir, "bundle.js");

describe("build smoke", () => {
  beforeAll(() => {
    // Clean dist to ensure deterministic output
    rmSync(distDir, { recursive: true, force: true });
  });

  it("build produces index.html containing Chapter 39 and a script reference", () => {
    execSync("npm run --silent build", { stdio: "inherit" });

    expect(existsSync(indexHtml)).toBe(true);
    const html = readFileSync(indexHtml, "utf8");
    expect(html).toContain("<h1>Chapter 39</h1>");
    // Support both legacy inline build and Vite asset-based build
    const hasInlineScript = html.includes("<script>");
    const hasViteModuleScript = html.includes('<script type="module"');
    expect(hasInlineScript || hasViteModuleScript).toBe(true);

    // Legacy build emitted a temporary bundle.js which was removed; Vite never creates it
    expect(existsSync(bundleJs)).toBe(false);
  });
});
