import * as core from "@actions/core";
import { Main } from "./src/main";

const m = new Main();
m.runAction().catch((error: Error) => {
  core.setFailed(error.message);
});
