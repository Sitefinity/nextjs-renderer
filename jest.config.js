const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.e2e.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      isolatedModules: true
    }]
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)', 'node_modules/framework/(?!.*\\.mjs$)']
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
