/* eslint-env browser */
/* global document, console, window */
// Minimal example script for Chapter 39 landing
(() => {
  try {
    // Apply color scheme class for shared SCSS variables
    const mq =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const applyScheme = () => {
      const isDark = mq && mq.matches;
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.classList.toggle("light", !isDark);
    };
    applyScheme();
    if (mq && typeof mq.addEventListener === "function") {
      mq.addEventListener("change", applyScheme);
    }

    // Set the document title
    document.title = "Chapter 39";

    // Ensure an H1 exists; if not, create one
    const existingH1 = document.querySelector("h1");
    if (!existingH1) {
      const h1 = document.createElement("h1");
      h1.textContent = "Chapter 39";
      document.body.prepend(h1);
    }
  } catch (err) {
    // Fail silently in production contexts, but log to console for visibility

    console.error("Initialization error:", err);
  }
})();
