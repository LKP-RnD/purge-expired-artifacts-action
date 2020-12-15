export interface Artifact {
  Id: number;
  expires: number;
}

export function hasExpired(artifact : Artifact) {
  return artifact.expires < Date.now();
}
