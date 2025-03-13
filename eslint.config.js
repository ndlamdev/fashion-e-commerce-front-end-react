import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default tseslint.config({ ignores: ["dist"] }, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020, globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    prettier: eslintPluginPrettier,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": ["warn", {
      allowConstantExport: true,
    }],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^" }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": ["error", {
      vars: "all",
      args: "after-used",
      ignoreRestSiblings: true,
      "argsIgnorePattern": "^",
    }],
    "no-trailing-spaces": "error", // Xóa space ở đầu và cuối dòng
    "no-multi-spaces": "error", // Xóa khoảng trắng thừa giữa các từ
  },
  settings: {
    react: {
      version: "detect",
    }, "import/resolver": {
      alias: {
        map: [["@", "./src"]], extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
  },
});
