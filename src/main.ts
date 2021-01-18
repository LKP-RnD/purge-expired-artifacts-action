import * as core from "@actions/core";
import { Container } from "typedi";
import { Artifact, getOwner, getRepo, hasExpired } from "./helpers";
import { Logger } from "./logger-base";
import { OctokitHelper } from "./octokit-helper";

export class Main {
  private readonly logger: Logger;
  private readonly oh: OctokitHelper;
  constructor() {
    this.logger = Container.get(Logger);
    this.oh = Container.get(OctokitHelper);
  }

  async runAction(): Promise<void> {
    try {
      const repoToPurge = core.getInput("repo_to_purge");
      const owner = getOwner(repoToPurge);
      const repo = getRepo(repoToPurge);
      let artifacts = await this.oh.listRunArtifacts(owner, repo);
      const expiredArtifacts = artifacts.filter((artifact: Artifact) =>
        hasExpired(artifact)
      );
      this.logger.info(`Artifacts to purge: ${expiredArtifacts.length}`);
      const deleteRequests = expiredArtifacts.map((artifact: Artifact) => {
        this.logger.info(`Purging artifact: ${artifact.name}`, artifact.id);
        return this.oh.delteArtifact(owner, repo, artifact);
      });
      await Promise.all(deleteRequests).catch(core.setFailed);
      artifacts = await this.oh.listRunArtifacts(owner, repo);
      this.logger.info(`Artifacts after deletion: ${artifacts.length}`);
    } catch (err) {
      this.logger.error(err.message);
      core.setFailed(err.message);
    }
  }
}
