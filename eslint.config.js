import { zLintGetConfig } from "@zenflux/eslint";
import { zLintGetWorkspaces } from "@zenflux/eslint";
import util from "util";
const baseConfig = await zLintGetConfig( {
    workspaces: [
        ... zLintGetWorkspaces(),
        "apps/website/backend",
    ]
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    ...baseConfig,
];


console.log(util.inspect(config, { depth: null }));
export default config;
