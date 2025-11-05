export default {
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  moduleNameMapper: {}
}
