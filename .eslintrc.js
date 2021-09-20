module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        // позволяет убирать импорт React
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    env: {
        es6: true,
        browser: true,
        amd: true,
        node: true,
        commonjs: true,
    },
    rules: {
        'no-useless-escape': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
