import {Artifact, hasExpired} from "./helpers";
import * as core from '@actions/core';
import { getOctokit} from '@actions/github';
import { Inject } from 'typedi'
import {Logger} from "./logger-base";
import {Octokit} from "@octokit/core";

export class Main {
  @Inject()
  private readonly logger: Logger;
  private readonly octokit: Octokit
  constructor() {
    const ghToken = process.env.GITHUB_TOKEN
    if (ghToken === undefined) {
      this.logger.error("GITGUB_TOKEN env variable was not set.")
      process.exit(1)
    }
    this.octokit = getOctokit(ghToken);
  }

  public async listRunArtifacts(owner: string, repo: string) {
    const listWorkflowRunArtifactsResponse = await this.octokit.actions.listArtifactsForRepo({
      owner,
      repo
    });
    return listWorkflowRunArtifactsResponse.data.artifacts;
  }

  public async delteExpiredArtifacts(owner: string, repo: string, artifact: Artifact) {
    if (hasExpired(artifact)) {
      const deleteArtifactResponse = await this.octokit.actions.deleteArtifact({
        owner,
        repo,
        artifact_id: artifact.Id
      });
      this.logger.debug(`status: ${deleteArtifactResponse.status}`);
    }
  }

  private async runAction() {
    try {
      const parentRepo = core.getInput('repo_to_purge');
      const owner = parentRepo.split('/')[0];
      const repo = parentRepo.split('/')[1];
      let artifacts = await this.listRunArtifacts(owner, repo);
      this.logger.info(`Artifacts purge: ${artifacts.length}`);
      const deleteRequests = artifacts.map((artifact : any) => {
        this.logger.debug(`Purging artifact: ${artifact.name}`, artifact.id);
        return this.delteExpiredArtifacts(owner, repo, artifact);
      });
      await Promise.all(deleteRequests);
      artifacts = await this.listRunArtifacts(owner, repo);
      this.logger.info(`artifacts after deletion: ${artifacts.length}`);
    } catch (error) {
      core.setFailed(error.message);
    }
  }

  run() {
    this.runAction().catch((error: Error) => {
      core.setFailed(error.message);
    });
  }
}
