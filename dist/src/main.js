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
exports.Main = void 0;
const core = require("@actions/core");
const typedi_1 = require("typedi");
const helpers_1 = require("./helpers");
const logger_base_1 = require("./logger-base");
const octokit_helper_1 = require("./octokit-helper");
class Main {
    constructor() {
        this.logger = typedi_1.Container.get(logger_base_1.Logger);
        this.oh = typedi_1.Container.get(octokit_helper_1.OctokitHelper);
    }
    runAction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repoToPurge = core.getInput("repo_to_purge");
                const owner = helpers_1.getOwner(repoToPurge);
                const repo = helpers_1.getRepo(repoToPurge);
                let artifacts = yield this.oh.listRunArtifacts(owner, repo);
                const expiredArtifacts = artifacts.filter((artifact) => {
                    return helpers_1.hasExpired(artifact);
                });
                this.logger.info(`Artifacts to purge: ${expiredArtifacts.length}`);
                const deleteRequests = expiredArtifacts.map((artifact) => {
                    this.logger.info(`Purging artifact: ${artifact.name}`, artifact.id);
                    return this.oh.delteArtifact(owner, repo, artifact);
                });
                yield Promise.all(deleteRequests).catch(core.setFailed);
                artifacts = yield this.oh.listRunArtifacts(owner, repo);
                this.logger.info(`Artifacts after deletion: ${artifacts.length}`);
            }
            catch (err) {
                this.logger.error(err.message);
                core.setFailed(err.message);
            }
        });
    }
}
exports.Main = Main;
//# sourceMappingURL=main.js.map