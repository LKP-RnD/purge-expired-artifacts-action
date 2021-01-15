const jestCommon = require("./jest.common.config");

module.exports = {
  ...jestCommon,
  coverageDirectory: "coverage/unit",
  testRegex: ".*\\.test\\.ts$",
};
