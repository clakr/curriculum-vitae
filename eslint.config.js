import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.all,
  {
    ignores: [".astro"],
  },
];
