import { Artifact } from "./helpers";

interface OctokitMockResponses {
  listRunArtifactsResponse: Artifact[];
  listRunArtifactsError: Error | null;
  delteArtifactError: Error | null;
}
/* eslint-disable  @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
interface Call {
  call: string;
  params: any;
}

export class OctokitHelperMock {
  calls: Call[];
  private responses: OctokitMockResponses;
  setupMock(responses: OctokitMockResponses) {
    this.calls = [];
    this.responses = responses;
  }

  async listRunArtifacts(owner: string, repo: string): Promise<Artifact[]> {
    this.calls.push({ call: "list", params: { owner, repo } });
    if (this.responses.listRunArtifactsError !== null) {
      throw this.responses.listRunArtifactsError;
    }
    return Promise.resolve(this.responses.listRunArtifactsResponse);
  }

  async delteArtifact(
    owner: string,
    repo: string,
    artifact: Artifact
  ): Promise<void> {
    this.calls.push({ call: "delete", params: { owner, repo, artifact } });
    if (this.responses.delteArtifactError !== null) {
      throw this.responses.listRunArtifactsError;
    }
  }
}
