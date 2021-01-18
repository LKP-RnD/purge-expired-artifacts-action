"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepo = exports.getOwner = exports.hasExpired = void 0;
const numberOfFields = 2;
function hasExpired(artifact) {
    this.logger.info(`artifact ${artifact}`)
    return Date.parse(artifact.expires) < Date.now();
}
exports.hasExpired = hasExpired;
function getOwner(parentRepo) {
    const stringParts = parentRepo.split("/");
    if (stringParts.length !== numberOfFields) {
        throw new Error(`Expected repo to use the format user/repo, got ${parentRepo}`);
    }
    return stringParts[0];
}
exports.getOwner = getOwner;
function getRepo(parentRepo) {
    const stringParts = parentRepo.split("/");
    if (stringParts.length !== numberOfFields) {
        throw new Error(`Expected repo to use the format user/repo, got ${parentRepo}`);
    }
    return stringParts[1];
}
exports.getRepo = getRepo;
//# sourceMappingURL=helpers.js.map
