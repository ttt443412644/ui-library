module.exports = {
  transform: {
    'jestScript.js': '<rootDir>/node_modules/babel-jest',
    '.(ts|tsx)': '<rootDir>/bin/jest.preprocessor.js',
  },
  collectCoverageFrom: ['src/**/index.{ts,tsx}'],
  testRegex: '(src/.*.unit.(ts|tsx)$)',
  setupFilesAfterEnv: ['./bin/jestScript'],
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
  },
}
