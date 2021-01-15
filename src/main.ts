import * as core from '@actions/core';
import {Container} from 'typedi';
import {Artifact, getOwner, getRepo, hasExpired} from './helpers';
import {Logger} from './logger-base';
import {OctokitHelper} from './octokit-helper';

export class Main {
  private readonly logger: Logger;
  private readonly oh : OctokitHelper;
  constructor() {
    this.logger = Container.get(Logger);
    this.oh = Container.get(OctokitHelper);
  }

  public async runAction() {
    try {
      const parentRepo = core.getInput('repo_to_purge');
      const owner = getOwner(parentRepo);
      const repo = getRepo(parentRepo);
      let artifacts = await this.oh.listRunArtifacts(owner, repo);
      this.logger.info(`Artifacts purge: ${artifacts.length}`);
      const expiredArtifacts = artifacts.filter((artifact : Artifact) => hasExpired(artifact));
      const deleteRequests = expiredArtifacts.map((artifact : Artifact) => {
        this.logger.debug(`Purging artifact: ${artifact.name}`, artifact.id);
        return this.oh.delteArtifact(owner, repo, artifact);
      });
      await Promise.all(deleteRequests).catch(core.setFailed);
      artifacts = await this.oh.listRunArtifacts(owner, repo);
      this.logger.info(`artifacts after deletion: ${artifacts.length}`);
    } catch (err) {
      core.setFailed(err.message);
    }
  }
}
