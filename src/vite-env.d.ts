/// <reference types="vite/client" />

interface Window {
  agentShell?: {
    versions: () => Promise<{
      electron: string;
      chrome: string;
      node: string;
    }>;
  };
}
