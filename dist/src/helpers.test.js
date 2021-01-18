"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const tomorrow = new Date(new Date().setDate(today.getDate() - 1));
const expiredArtifact = { id: 1, expires: yesterday.toISOString(), name: "" };
const liveArtifact = { id: 1, expires: tomorrow.toISOString(), name: "" };
describe("Helpers", () => {
    describe("hasExpired", () => {
        it("Should return true for expired artifacts", () => {
            expect(helpers_1.hasExpired(expiredArtifact)).toBe(true);
        });
        it("Should return false for live artifacts", () => {
            expect(helpers_1.hasExpired(liveArtifact)).toBe(false);
        });
    });
    describe("getOwner", () => {
        it("Should return the owner given a repository string", () => {
            expect(helpers_1.getOwner("user/repo")).toBe("user");
        });
        it("Should throw given a faulty string", () => {
            expect(() => helpers_1.getOwner("userrepo")).toThrow();
            expect(() => helpers_1.getOwner("")).toThrow();
            expect(() => helpers_1.getOwner("u/l/a")).toThrow();
        });
    });
    describe("getRepo", () => {
        it("Should return the repository name given a repository string", () => {
            expect(helpers_1.getRepo("user/repo")).toBe("repo");
        });
        it("Should throw given a faulty string", () => {
            expect(() => helpers_1.getRepo("userrepo")).toThrow();
            expect(() => helpers_1.getRepo("u/l/a")).toThrow();
            expect(() => helpers_1.getRepo("")).toThrow();
        });
    });
});
//# sourceMappingURL=helpers.test.js.map