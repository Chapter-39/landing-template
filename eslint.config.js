// eslint.config.js (ESM)
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default [
  // Ignora lo obvio
  { ignores: ["dist/**", "node_modules/**", ".idea/**", ".husky/**"] },

  // Reglas base de JS
  js.configs.recommended,

  // Tu capa del proyecto
  {
    files: ["**/*.{js,ts,jsx,tsx,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { import: importPlugin },
    rules: {},
  },

  // Desactiva choques con Prettier (no formatea, solo evita conflictos)
  prettier,
];
