import { Logger, LogLevelEnum } from ".";

import { TestTransport } from "../test.helpers";

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

  function setup(): { testTransport: TestTransport; logger: Logger } {
    const testTransport = new TestTransport();
    const logger = new Logger(testTransport, LogLevelEnum.DEBUG);
    return { testTransport, logger };
  }

  function expectLog(
    testTransport: TestTransport,
    level: string,
    message: string
  ) {
    expect(testTransport.savedInfo.level).toBe(level);
    expect(testTransport.savedInfo.message).toBe(message);
  }
});
