import {Artifact} from './helpers';


interface OctokitMockResponses {
  listRunArtifactsResponse: Artifact[];
  listRunArtifactsError: Error | null;
  delteArtifactError: Error | null;
}

interface Call {
  call: string;
  params: any;
}

export class OctokitHelperMock {
  public calls: Call[];
  private responses: OctokitMockResponses;
  public setupMock(responses : OctokitMockResponses){
    this.calls = [];
    this.responses = responses;
  }

  public async listRunArtifacts(owner: string, repo: string) : Promise<Artifact[]> {
    this.calls.push({call: 'list', params: {owner, repo}});
    if (this.responses.listRunArtifactsError !== null){
      throw this.responses.listRunArtifactsError;
    }
    return Promise.resolve(this.responses.listRunArtifactsResponse);
  }

  public async delteArtifact(owner: string, repo: string, artifact: Artifact): Promise<void> {
    this.calls.push({call: 'delete', params : {owner, repo, artifact}});
    if (this.responses.delteArtifactError !== null){
      throw this.responses.listRunArtifactsError;
    }
  }
}
