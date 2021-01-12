import {Octokit as O} from '@octokit/core';
import {Octokit} from '@octokit/rest';
import {Inject} from 'typedi';
import {Artifact, hasExpired} from './helpers';
import {Logger} from './logger-base';

export class OctokitHelper {

  @Inject()
  private logger : Logger;
  private readonly octokit : O;
  constructor() {
    const ghToken = process.env.GITHUB_TOKEN;
    if (ghToken === undefined) {
      this.logger.error('GITGUB_TOKEN env variable was not set.');
      process.exit(1);
    }
    this.octokit = new Octokit({ghToken});
  }

  public async listRunArtifacts(owner: string, repo: string) : Promise<Artifact[]> {
    const listWorkflowRunArtifactsResponse = await this.octokit.actions.listArtifactsForRepo({
      owner,
      repo
    });
    return listWorkflowRunArtifactsResponse.data.artifacts;
  }

  public async delteExpiredArtifacts(owner: string, repo: string, artifact: Artifact): Promise<void> {
    if (hasExpired(artifact)) {
      const deleteArtifactResponse = await this.octokit.actions.deleteArtifact({
        owner,
        repo,
        artifact_id: artifact.Id
      });
      this.logger.debug(`status: ${deleteArtifactResponse.status}`);
    }
  }
}
