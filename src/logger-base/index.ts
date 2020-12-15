import * as logform from 'logform';
import * as winston from 'winston';
import * as Transport from 'winston-transport';

export enum LogLevelEnum {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

const defaultFormat: logform.Format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

export class Logger {
  private logger: winston.Logger;

  constructor(
    transports: Transport[] | Transport,
    logLevel: LogLevelEnum = LogLevelEnum.INFO,
    format: logform.Format = defaultFormat
  ) {
    this.logger = winston.createLogger({
      level: logLevel,
      format,
      exitOnError: false,
      transports
    });
  }

  public debug(message: string, params?: any, error?: Error) {
    this.internalLog(LogLevelEnum.DEBUG, message, params, error);
  }

  public info(message: string, params?: any, error?: Error) {
    this.internalLog(LogLevelEnum.INFO, message, params, error);
  }

  public error(message: string, params?: any, error?: Error) {
    this.internalLog(LogLevelEnum.ERROR, message, params, error);
  }

  public warn(message: string, params?: any, error?: Error) {
    this.internalLog(LogLevelEnum.WARN, message, params, error);
  }

  private createErrorStack(e: any): string {
    return e.reason ? `${e.stack}\n${this.createErrorStack(e.reason)}` : e.stack;
  }

  private internalLog(level: string, message: string, params?: any, error?: Error) {
    let logEntry: winston.LogEntry = { level, message, params, error };
    if (error) {
      const errorWithStack = `\n${this.createErrorStack(error)}`;
      logEntry = { ...logEntry, errorWithStack };
    }
    this.logger.log(logEntry);
  }
}
