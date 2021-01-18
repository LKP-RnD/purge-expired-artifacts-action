export interface Artifact {
  id: number;
  expires: string;
  name: string;
}

const numberOfFields = 2;

export function hasExpired(artifact: Artifact): boolean {
  return Date.parse(artifact.expires) < Date.now();
}

export function getOwner(parentRepo: string): string {
  const stringParts = parentRepo.split("/");
  if (stringParts.length !== numberOfFields) {
    throw new Error(
      `Expected repo to use the format user/repo, got ${parentRepo}`
    );
  }
  return stringParts[0];
}

export function getRepo(parentRepo: string): string {
  const stringParts = parentRepo.split("/");
  if (stringParts.length !== numberOfFields) {
    throw new Error(
      `Expected repo to use the format user/repo, got ${parentRepo}`
    );
  }
  return stringParts[1];
}
