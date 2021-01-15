process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = {
  collectCoverageFrom: [
    "src/**/*.ts",
    "!**/*.ab.ts.ts",
    "!**/*.itest.ts",
    "!**/*.d.ts",
    "!**/migrations/**/*.ts",
    "!**/common/src/index.ts",
  ],
  coverageReporters: ["lcov", "text"],
  moduleFileExtensions: ["ts", "json", "js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
