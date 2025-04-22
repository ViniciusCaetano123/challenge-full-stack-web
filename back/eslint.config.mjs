import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
    ]
  },
  { files: ["src/**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["src/**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  {rules:{"@typescript-eslint/no-unused-vars": "warn"}},
  
  eslintConfigPrettier,
  tseslint.configs.recommended,
]);