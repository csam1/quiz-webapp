module.exports = {
  collectCoverageFrom: ["src/**/*"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/pages/",
    "<rootDir>/styles/",
    "<rootDir>/__mocks__/",
  ],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/fileMock.ts",
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};
