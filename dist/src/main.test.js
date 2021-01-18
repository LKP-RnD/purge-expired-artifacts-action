"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const logger_base_1 = require("./logger-base");
const test_helpers_1 = require("./test.helpers");
const typedi_1 = require("typedi");
const main_1 = require("./main");
const octokit_helper_1 = require("./octokit-helper");
const octokit_helper_mock_1 = require("./octokit-helper.mock");
describe("Main", () => {
    let o;
    beforeAll(() => {
        const { logger } = test_helpers_1.setupTestLogger();
        typedi_1.Container.set(logger_base_1.Logger, logger);
        o = new octokit_helper_mock_1.OctokitHelperMock();
        typedi_1.Container.set(octokit_helper_1.OctokitHelper, o);
        o.setupMock({
            listRunArtifactsResponse: [],
            listRunArtifactsError: new Error("Test error"),
            delteArtifactError: null,
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should setFailed when unable to list artifacts", () => __awaiter(void 0, void 0, void 0, function* () {
        o.setupMock({
            listRunArtifactsResponse: [],
            listRunArtifactsError: new Error("List error"),
            delteArtifactError: null,
        });
        const setFailedSpy = jest.spyOn(core, "setFailed");
        const m = new main_1.Main();
        yield m.runAction();
        expect(setFailedSpy).toHaveBeenCalled();
    }));
    it("should setFailed when unable to delete artifacts", () => __awaiter(void 0, void 0, void 0, function* () {
        o.setupMock({
            listRunArtifactsResponse: [
                { id: 1, expires: new Date(0).toISOString(), name: "" },
            ],
            listRunArtifactsError: null,
            delteArtifactError: new Error("Delete error"),
        });
        const setFailedSpy = jest.spyOn(core, "setFailed");
        const m = new main_1.Main();
        yield m.runAction();
        expect(setFailedSpy).toHaveBeenCalled();
    }));
    it("should list and delete the correct artifacts", () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.INPUT_REPO_TO_PURGE = "gitUser/gitRepo";
        o.setupMock({
            listRunArtifactsResponse: [
                { id: 1, expires: new Date(0).toISOString(), name: "" },
            ],
            listRunArtifactsError: null,
            delteArtifactError: null,
        });
        const setFailedSpy = jest.spyOn(core, "setFailed");
        const m = new main_1.Main();
        yield m.runAction();
        expect(setFailedSpy).not.toHaveBeenCalled();
        expect(o.calls[0].params.repo).toBe("gitRepo");
        expect(o.calls[0].params.owner).toBe("gitUser");
        expect(o.calls[1].call).toBe("delete");
        expect(o.calls[1].params.owner).toBe("gitUser");
        expect(o.calls[1].params.repo).toBe("gitRepo");
    }));
});
//# sourceMappingURL=main.test.js.map