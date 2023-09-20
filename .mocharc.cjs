/** @type {import('mocha').MochaOptions} */
module.exports = {
    recursive: true,
    extension: ['.test.ts'],
    'node-option': ['require=ts-node/register', 'no-warnings'],
    reporter: 'mocha-multi',
    'reporter-option': [
        'spec=-',
        process.env.GITHUB_ACTIONS === 'true' ? 'mocha-reporter-gha=-' : null,
        process.env.SONARSCANNER === 'true' ? 'mocha-reporter-sonarqube=test-report.xml' : null,
    ].filter(Boolean),
}
