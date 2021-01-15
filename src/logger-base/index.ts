import * as logform from "logform";
import * as winston from "winston";
import * as Transport from "winston-transport";

export enum LogLevelEnum {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

const defaultFormat: logform.Format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

export class Logger {
  private readonly logger: winston.Logger;

  constructor(
    transports: Transport[] | Transport,
    logLevel: LogLevelEnum = LogLevelEnum.INFO,
    format: logform.Format = defaultFormat
  ) {
    this.logger = winston.createLogger({
      level: logLevel,
      format,
      exitOnError: false,
      transports,
    });
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
  debug(message: string, params?: any, error?: Error): void {
    this.internalLog(LogLevelEnum.DEBUG, message, params, error);
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
  info(message: string, params?: any, error?: Error): void {
    this.internalLog(LogLevelEnum.INFO, message, params, error);
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
  error(message: string, params?: any, error?: Error): void {
    this.internalLog(LogLevelEnum.ERROR, message, params, error);
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
  warn(message: string, params?: any, error?: Error): void {
    this.internalLog(LogLevelEnum.WARN, message, params, error);
  }

  private createErrorStack(e: any): string {
    return e.reason
      ? `${e.stack}\n${this.createErrorStack(e.reason)}`
      : e.stack;
  }

  private internalLog(
    level: string,
    message: string,
    params?: any,
    error?: Error
  ) {
    let logEntry: winston.LogEntry = { level, message, params, error };
    if (error) {
      const errorWithStack = `\n${this.createErrorStack(error)}`;
      logEntry = { ...logEntry, errorWithStack };
    }
    this.logger.log(logEntry);
  }
}
