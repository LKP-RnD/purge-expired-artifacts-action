export interface Artifact {
  id: number;
  expires: number;
  name: string;
}

export function hasExpired(artifact : Artifact) {
  return artifact.expires < Date.now();
}

export function getOwner(parentRepo: string): string {
  const stringParts =  parentRepo.split('/');
  if (stringParts.length !== 2){
    throw new Error(`Expected parentRpo to use the format user/repo, got ${parentRepo}`);
  }
  return stringParts[0];
}

export function getRepo(parentRepo: string): string {
  const stringParts = parentRepo.split('/');
  if (stringParts.length !== 2){
    throw new Error(`Expected parentRpo to use the format user/repo, got ${parentRepo}`);
  }
  return stringParts[1];
}
