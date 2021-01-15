import * as core from "@actions/core";
import { Main } from "./src/main";
import { Logger } from "src/logger-base";
import * as winston from "winston";
import { Container } from "typedi";

Container.set(
  Logger,
  new Logger([new winston.transports.Console({ level: "info" })])
);
const m = new Main();
m.runAction().catch((error: Error) => {
  core.setFailed(error.message);
});
