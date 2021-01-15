import * as Transport from "winston-transport";
import { Logger, LogLevelEnum } from "./logger-base";

export class TestTransport extends Transport {
  /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
  savedInfo: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
  log(info: any): any {
    this.savedInfo = info;
  }
}

export function setupTestLogger(): {
  testTransport: TestTransport;
  logger: Logger;
} {
  const testTransport = new TestTransport();
  const logger = new Logger(testTransport, LogLevelEnum.DEBUG);
  return { testTransport, logger };
}

export function expectLog(
  testTransport: TestTransport,
  level: string,
  message: string
) {
  expect(testTransport.savedInfo.level).toBe(level);
  expect(testTransport.savedInfo.message).toBe(message);
}
