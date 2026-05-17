import type {
  BrowserCapturePageInput,
  BrowserCapturePageResult,
} from "./contracts/browser-contract";
import type { Workspace } from "@/features/workspace/types/workspace-types";
import type {
  StartAgentRunInput,
  StartAgentRunResult,
} from "./contracts/agent-contract";
import type {
  OpenWorkspaceInput,
  OpenWorkspaceResult,
  NavigateWorkspaceBackInput,
  NavigateWorkspaceForwardInput,
  ReloadWorkspaceInput,
  WorkspaceNavigationState,
  SetWorkspaceViewBoundsInput,
} from "./contracts/workspace-contract";
import type { RuntimeVersionsResponse } from "./contracts/runtime-contract";
import type { LayoutModeChangedEvent } from "./contracts/layout-contract";

export type ElectronApi = {
  runtime: {
    versions: () => Promise<RuntimeVersionsResponse>;
  };
  window: {
    minimize: () => Promise<void>;
    toggleMaximize: () => Promise<{ maximized: boolean }>;
    close: () => Promise<void>;
  };
  layout: {
    enterPip: () => Promise<{ enabled: boolean }>;
    exitPip: () => Promise<{ enabled: boolean; workspaceId?: string | null }>;
    onModeChanged: (
      callback: (input: LayoutModeChangedEvent) => void,
    ) => () => void;
  };
  workspace: {
    open: (input: OpenWorkspaceInput) => Promise<OpenWorkspaceResult>;
    setViewBounds: (input: SetWorkspaceViewBoundsInput) => Promise<void>;
    navigateBack: (input: NavigateWorkspaceBackInput) => Promise<void>;
    navigateForward: (
      input: NavigateWorkspaceForwardInput,
    ) => Promise<void>;
    reload: (input: ReloadWorkspaceInput) => Promise<void>;
    getNavigationState: (
      input: { workspaceId: Workspace["id"] },
    ) => Promise<WorkspaceNavigationState>;
    onNavigationStateChanged: (
      callback: (input: WorkspaceNavigationState) => void,
    ) => () => void;
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
