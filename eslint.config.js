import { zLintGetConfig } from "@zenflux/eslint";

const baseConfig = await zLintGetConfig();

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    ...baseConfig,
];

export default config;
