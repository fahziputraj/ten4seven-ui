export type PlaygroundBuildIdentity = {
  appVersion: string;
  branch: string;
  commit: string;
  dirty: boolean;
};

/**
 * Playground-only build metadata. It is intentionally not exported from any
 * Ten4Seven package and is rendered only inside the existing QA harness.
 */
export const playgroundBuildIdentity: PlaygroundBuildIdentity =
  __T7_BUILD_IDENTITY__;
