import {Artifact} from './helpers';


interface OctokitMockResponses {
  listRunArtifactsResponse: Artifact[];
  listRunArtifactsError: Error | null;
}

export class OctokitHelperMock {
  private responses: OctokitMockResponses;
  public setupMock(responses : OctokitMockResponses){
    this.responses = responses;
  }

  public async listRunArtifacts(owner: string, repo: string) : Promise<Artifact[]> {
    if (this.responses.listRunArtifactsError !== null){
      throw this.responses.listRunArtifactsError;
    }
    return Promise.resolve(this.responses.listRunArtifactsResponse);
  }

  public async delteExpiredArtifacts(owner: string, repo: string, artifact: Artifact): Promise<void> {
  }
}
