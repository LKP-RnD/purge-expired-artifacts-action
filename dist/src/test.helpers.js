"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectLog = exports.setupTestLogger = exports.TestTransport = void 0;
const Transport = require("winston-transport");
const logger_base_1 = require("./logger-base");
class TestTransport extends Transport {
    /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
    log(info) {
        this.savedInfo = info;
    }
}
exports.TestTransport = TestTransport;
function setupTestLogger() {
    const testTransport = new TestTransport();
    const logger = new logger_base_1.Logger(testTransport, logger_base_1.LogLevelEnum.DEBUG);
    return { testTransport, logger };
}
exports.setupTestLogger = setupTestLogger;
function expectLog(testTransport, level, message) {
    expect(testTransport.savedInfo.level).toBe(level);
    expect(testTransport.savedInfo.message).toBe(message);
}
exports.expectLog = expectLog;
//# sourceMappingURL=test.helpers.js.map