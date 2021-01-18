import * as core from "@actions/core";
import { Logger } from "./logger-base";
import { setupTestLogger } from "./test.helpers";

import { Container } from "typedi";
import { Main } from "./main";
import { OctokitHelper } from "./octokit-helper";
import { OctokitHelperMock } from "./octokit-helper.mock";

describe("Main", () => {
  let o: OctokitHelperMock;
  beforeAll(() => {
    const { logger } = setupTestLogger();
    Container.set(Logger, logger);
    o = new OctokitHelperMock();
    Container.set(OctokitHelper, o);
    o.setupMock({
      listRunArtifactsResponse: [],
      listRunArtifactsError: new Error("Test error"),
      delteArtifactError: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should setFailed when unable to list artifacts", async () => {
    o.setupMock({
      listRunArtifactsResponse: [],
      listRunArtifactsError: new Error("List error"),
      delteArtifactError: null,
    });
    const setFailedSpy = jest.spyOn(core, "setFailed");
    const m = new Main();
    await m.runAction();
    expect(setFailedSpy).toHaveBeenCalled();
  });

  it("should setFailed when unable to delete artifacts", async () => {
    o.setupMock({
      listRunArtifactsResponse: [
        { id: 1, expires_at: new Date(0).toISOString(), name: "" },
      ],
      listRunArtifactsError: null,
      delteArtifactError: new Error("Delete error"),
    });
    const setFailedSpy = jest.spyOn(core, "setFailed");
    const m = new Main();
    await m.runAction();
    expect(setFailedSpy).toHaveBeenCalled();
  });

  it("should list and delete the correct artifacts", async () => {
    process.env.INPUT_REPO_TO_PURGE = "gitUser/gitRepo";
    o.setupMock({
      listRunArtifactsResponse: [
        { id: 1, expires_at: new Date(0).toISOString(), name: "" },
      ],
      listRunArtifactsError: null,
      delteArtifactError: null,
    });
    const setFailedSpy = jest.spyOn(core, "setFailed");
    const m = new Main();
    await m.runAction();
    expect(setFailedSpy).not.toHaveBeenCalled();
    expect(o.calls[0].params.repo).toBe("gitRepo");
    expect(o.calls[0].params.owner).toBe("gitUser");
    expect(o.calls[1].call).toBe("delete");
    expect(o.calls[1].params.owner).toBe("gitUser");
    expect(o.calls[1].params.repo).toBe("gitRepo");
  });
});
