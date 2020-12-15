export interface Artifact {
  Id: string
  expires: number
}

export function hasExpired(artifact : Artifact) {
  return artifact.expires < Date.now();
}
