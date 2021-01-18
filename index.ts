import "reflect-metadata";
import * as core from "@actions/core";
import { Main } from "./src/main";
import { Logger } from "src/logger-base";
import * as winston from "winston";
import { Container } from "typedi";

const logger = new Logger([new winston.transports.Console({ level: "info" })]);
Container.set(Logger, logger);
const m = new Main();
m.runAction().catch((error: Error) => {
  core.setFailed(error.message);
});
