import { Octokit as O } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { Inject } from "typedi";
import { Artifact } from "./helpers";
import { Logger } from "./logger-base";
import * as core from "@actions/core";

export class OctokitHelper {
  @Inject()
  private readonly logger: Logger;
  private readonly octokit: O;
  private readonly dryRun: boolean;

  constructor() {
    const OctokitWithPlugins = O.plugin(paginateRest, restEndpointMethods);
    const ghToken = core.getInput("token");
    this.dryRun = core.getInput("dry_run") === "true";
    if (ghToken === undefined) {
      this.logger.error("GITGUB_TOKEN env variable was not set.");
      process.exit(1);
    }
    this.octokit = new OctokitWithPlugins({ auth: `token ${ghToken}` });
  }

  async listRunArtifacts(owner: string, repo: string): Promise<Artifact[]> {
    const artifacts = [];
    for await (const response of this.octokit.paginate.iterator(
      this.octokit.actions.listArtifactsForRepo,
      { owner, repo }
    )) {
      if (response.data.total_count > 0) {
        artifacts.push(...response.data);
      }
    }

    return artifacts;
  }

  async delteArtifact(
    owner: string,
    repo: string,
    artifact: Artifact
  ): Promise<void> {
    try {
      if (this.dryRun) {
        this.logger.info(
          `[Dry run]: Would have deleted artifact: ${artifact.id} ${artifact.expires_at} ${artifact.name}`
        );
      } else {
        const deleteArtifactResponse = await this.octokit.actions.deleteArtifact(
          {
            owner,
            repo,
            artifact_id: artifact.id,
          }
        );
        this.logger.debug(`status: ${deleteArtifactResponse.status}`);
      }
    } catch (error) {
      this.logger.error(`Could not delete artifact with id ${artifact.id}`);
    }
  }
}
