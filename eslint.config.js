import { zLintGetConfig } from "@zenflux/eslint";

const baseConfig = await zLintGetConfig();

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    ... baseConfig,
    {
        rules: {
            "space-in-parens": [ "error", "always" ],
            "space-before-function-paren": ["error", "never"],
            "space-before-blocks": [ "error", "always" ],
            "template-curly-spacing": [ "error", "always" ],
            "array-bracket-spacing": [ "error", "always" ],
            "object-curly-spacing": [ "error", "always" ],
            "computed-property-spacing": [ "error", "always" ],
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['/src/*'],
                            message: 'Imports from /src/* are restricted. monorepo imports e.g. @vertix/bot/src/index.ts should be used instead.'
                        }
                    ]
                }
            ]
        }
    },
];

export default config;
