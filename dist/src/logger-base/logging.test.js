"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const test_helpers_1 = require("../test.helpers");
describe("logger", () => {
    const testMessage = "a test message";
    it("should write to log when calling debug", () => {
        const { testTransport, logger } = setup();
        logger.debug(testMessage);
        expectLog(testTransport, "debug", testMessage);
    });
    it("should write to log when calling info", () => {
        const { testTransport, logger } = setup();
        logger.info(testMessage);
        expectLog(testTransport, "info", testMessage);
    });
    it("should write to log when calling error", () => {
        const { testTransport, logger } = setup();
        logger.error(testMessage, {}, new Error("an error"));
        expectLog(testTransport, "error", testMessage);
        expect(testTransport.savedInfo.errorWithStack).toBeDefined();
    });
    it("should add timestamp to log", () => {
        const { testTransport, logger } = setup();
        logger.info(testMessage);
        expect(testTransport.savedInfo.timestamp).toBeDefined();
    });
    it("should add parameter to log", () => {
        const { testTransport, logger } = setup();
        const value = "value";
        logger.info(testMessage, { key: value });
        expect(testTransport.savedInfo.params.key).toBe(value);
    });
    function setup() {
        const testTransport = new test_helpers_1.TestTransport();
        const logger = new _1.Logger(testTransport, _1.LogLevelEnum.DEBUG);
        return { testTransport, logger };
    }
    function expectLog(testTransport, level, message) {
        expect(testTransport.savedInfo.level).toBe(level);
        expect(testTransport.savedInfo.message).toBe(message);
    }
});
//# sourceMappingURL=logging.test.js.map