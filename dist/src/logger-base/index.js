"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevelEnum = void 0;
const winston = require("winston");
var LogLevelEnum;
(function (LogLevelEnum) {
    LogLevelEnum["DEBUG"] = "debug";
    LogLevelEnum["INFO"] = "info";
    LogLevelEnum["WARN"] = "warn";
    LogLevelEnum["ERROR"] = "error";
})(LogLevelEnum = exports.LogLevelEnum || (exports.LogLevelEnum = {}));
const defaultFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());
class Logger {
    constructor(transports, logLevel = LogLevelEnum.INFO, format = defaultFormat) {
        this.logger = winston.createLogger({
            level: logLevel,
            format,
            exitOnError: false,
            transports,
        });
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
    debug(message, params, error) {
        this.internalLog(LogLevelEnum.DEBUG, message, params, error);
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
    info(message, params, error) {
        this.internalLog(LogLevelEnum.INFO, message, params, error);
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
    error(message, params, error) {
        this.internalLog(LogLevelEnum.ERROR, message, params, error);
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
    warn(message, params, error) {
        this.internalLog(LogLevelEnum.WARN, message, params, error);
    }
    createErrorStack(e) {
        return e.reason
            ? `${e.stack}\n${this.createErrorStack(e.reason)}`
            : e.stack;
    }
    internalLog(level, message, params, error) {
        let logEntry = { level, message, params, error };
        if (error) {
            const errorWithStack = `\n${this.createErrorStack(error)}`;
            logEntry = Object.assign(Object.assign({}, logEntry), { errorWithStack });
        }
        this.logger.log(logEntry);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map