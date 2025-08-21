#!/usr/bin/env node
/* eslint-env node */
/* global console, process */
import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const distDir = path.resolve(__dirname, "..", "dist");
  const entryFile = path.resolve(__dirname, "..", "src", "main.ts");
  const scssFile = path.resolve(__dirname, "..", "src", "index.scss");
  const bundleFile = path.join(distDir, "bundle.js");
  const htmlFile = path.join(distDir, "index.html");

  try {
    console.log("[build] Ensuring dist directory exists…");
    await mkdir(distDir, { recursive: true });

    console.log("[build] Bundling with esbuild…");
    await build({
      entryPoints: [entryFile],
      bundle: true,
      minify: true,
      format: "iife",
      platform: "browser",
      target: ["es2020"],
      outfile: bundleFile,
      logLevel: "info",
    });

    console.log("[build] Creating index.html with inlined styles and script…");
    const js = await readFile(bundleFile, "utf8");

    // Try to compile SCSS entry if present and `sass` is available
    let compiledCss = "";
    try {
      // Check if SCSS entry exists
      const hasScss = await readFile(scssFile, "utf8")
        .then(() => true)
        .catch(() => false);
      if (hasScss) {
        try {
          const { compileString } = await import("sass");
          const scssSource = await readFile(scssFile, "utf8");
          const result = compileString(scssSource, {
            loadPaths: [
              path.resolve(__dirname, "..", "node_modules"),
              path.resolve(__dirname, "..", "src"),
            ],
          });
          compiledCss = result.css;
          console.log("[build] Inlined SCSS from src/index.scss");
        } catch (e) {
          console.warn(
            "[build] SCSS detected but not compiled.",
            e && e.message ? `Reason: ${e.message}` : "Install 'sass' to enable.",
          );
        }
      }
    } catch {
      // Ignore SCSS probing errors; build continues without styles
    }

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="dark light" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Chapter 39</title>
    <meta name="description" content="Chapter 39" />
    ${compiledCss ? `<style>${compiledCss}</style>` : ""}
  </head>
  <body>
    <main>
      <h1>Chapter 39</h1>
    <main>
    <script>${js}</script>
  </body>
</html>`;

    await writeFile(htmlFile, html, "utf8");
    console.log(`[build] Wrote ${path.relative(process.cwd(), htmlFile)}`);

    console.log("[build] Cleaning up temporary bundle…");
    await rm(bundleFile, { force: true });

    console.log("[build] Done. Single-file artifact ready in dist/index.html");
  } catch (err) {
    console.error("[build] Failed:", err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

await run();
