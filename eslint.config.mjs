import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const directoryName = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: directoryName,
});

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
]);

export default eslintConfig;
