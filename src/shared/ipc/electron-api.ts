import type {
  BrowserCapturePageInput,
  BrowserCapturePageResult,
} from "./contracts/browser-contract";
import type {
  StartAgentRunInput,
  StartAgentRunResult,
} from "./contracts/agent-contract";
import type {
  OpenWorkspaceInput,
  OpenWorkspaceResult,
} from "./contracts/workspace-contract";
import type { RuntimeVersionsResponse } from "./contracts/runtime-contract";

export type ElectronApi = {
  runtime: {
    versions: () => Promise<RuntimeVersionsResponse>;
  };
  workspace: {
    open: (input: OpenWorkspaceInput) => Promise<OpenWorkspaceResult>;
  };
  browser: {
    capturePage: (
      input: BrowserCapturePageInput,
    ) => Promise<BrowserCapturePageResult>;
  };
  agent: {
    startRun: (input: StartAgentRunInput) => Promise<StartAgentRunResult>;
  };
  versions: () => Promise<RuntimeVersionsResponse>;
};
