export default {
  testEnvironment: 'jsdom', // Simulates a browser environment for React components
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel to transform JavaScript files
  },
  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy', // Mock stylesheets
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Add Jest setup file
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore built files and dependencies
};
