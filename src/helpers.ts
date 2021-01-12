export interface Artifact {
  Id: number;
  expires: number;
}

export function hasExpired(artifact : Artifact) {
  return artifact.expires < Date.now();
}

export function getOwner(parentRepo: string): string {
  return parentRepo.split('/')[0];
}

export function getRepo(parentRepo: string): string {
  return parentRepo.split('/')[1];
}
