/// <reference types="vite/client" />

import type { ElectronApi } from "@/shared/ipc/electron-api";

declare global {
  interface Window {
    agentShell?: ElectronApi;
  }
}

export {};
