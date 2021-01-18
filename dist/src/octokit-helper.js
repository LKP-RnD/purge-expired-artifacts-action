"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.OctokitHelper = void 0;
const rest_1 = require("@octokit/rest");
const typedi_1 = require("typedi");
const logger_base_1 = require("./logger-base");
const core = require("@actions/core");
class OctokitHelper {
    constructor() {
        const ghToken = core.getInput("token");
        if (ghToken === undefined) {
            this.logger.error("GITGUB_TOKEN env variable was not set.");
            process.exit(1);
        }
        this.octokit = new rest_1.Octokit({ auth: `token ${ghToken}` });
    }
    listRunArtifacts(owner, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            const listWorkflowRunArtifactsResponse = yield this.octokit.actions.listArtifactsForRepo({
                owner,
                repo,
            });
            return listWorkflowRunArtifactsResponse.data.artifacts;
        });
    }
    delteArtifact(owner, repo, artifact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteArtifactResponse = yield this.octokit.actions.deleteArtifact({
                    owner,
                    repo,
                    artifact_id: artifact.id,
                });
                this.logger.debug(`status: ${deleteArtifactResponse.status}`);
            }
            catch (error) {
                this.logger.error(`Could not delete artifact with id ${artifact.id}`);
            }
        });
    }
}
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", logger_base_1.Logger)
], OctokitHelper.prototype, "logger", void 0);
exports.OctokitHelper = OctokitHelper;
//# sourceMappingURL=octokit-helper.js.map