/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript"
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "vue/no-unused-vars": "off",
    "vue/multi-word-component-names": "off"
  },
  parserOptions: {
    ecmaVersion: "latest"
  }
};
