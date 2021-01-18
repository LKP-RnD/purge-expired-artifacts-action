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
exports.OctokitHelperMock = void 0;
class OctokitHelperMock {
    setupMock(responses) {
        this.calls = [];
        this.responses = responses;
    }
    listRunArtifacts(owner, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.calls.push({ call: "list", params: { owner, repo } });
            if (this.responses.listRunArtifactsError !== null) {
                throw this.responses.listRunArtifactsError;
            }
            return Promise.resolve(this.responses.listRunArtifactsResponse);
        });
    }
    delteArtifact(owner, repo, artifact) {
        return __awaiter(this, void 0, void 0, function* () {
            this.calls.push({ call: "delete", params: { owner, repo, artifact } });
            if (this.responses.delteArtifactError !== null) {
                throw this.responses.listRunArtifactsError;
            }
        });
    }
}
exports.OctokitHelperMock = OctokitHelperMock;
//# sourceMappingURL=octokit-helper.mock.js.map