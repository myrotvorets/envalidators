import MyrotvoretsConfig from '@myrotvorets/eslint-config-myrotvorets-ts';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['dist/**'],
    },
    ...MyrotvoretsConfig,
    {
        files: ['test/**/*.ts'],
        rules: {
            'no-await-in-loop': 'off',
            'sonarjs/no-hardcoded-ip': 'off',
        },
    },
];
