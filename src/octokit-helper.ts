import { Octokit as O } from "@octokit/core";
import { Octokit } from "@octokit/rest";
import { Inject } from "typedi";
import { Artifact } from "./helpers";
import { Logger } from "./logger-base";
import * as core from "@actions/core";

export class OctokitHelper {
  @Inject()
  private readonly logger: Logger;
  private readonly octokit: O;
  constructor() {
    const ghToken = core.getInput("token");
    if (ghToken === undefined) {
      this.logger.error("GITGUB_TOKEN env variable was not set.");
      process.exit(1);
    }
    this.octokit = new Octokit({ auth: `token ${ghToken}` });
  }

  async listRunArtifacts(owner: string, repo: string): Promise<Artifact[]> {
    const listWorkflowRunArtifactsResponse = await this.octokit.actions.listArtifactsForRepo(
      {
        owner,
        repo,
      }
    );
    return listWorkflowRunArtifactsResponse.data.artifacts;
  }

  async delteArtifact(
    owner: string,
    repo: string,
    artifact: Artifact
  ): Promise<void> {
    const deleteArtifactResponse = await this.octokit.actions.deleteArtifact({
      owner,
      repo,
      artifact_id: artifact.id,
    });
    this.logger.debug(`status: ${deleteArtifactResponse.status}`);
  }
}
