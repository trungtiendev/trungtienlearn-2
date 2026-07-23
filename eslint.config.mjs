import nextFromGit from "@next/eslint-plugin-next";

export default [
  ...nextFromGit.configs["recommended"],
  {
    rules: {
      "@next/next/no-html-link-for-pages": "error",
    },
  },
];
