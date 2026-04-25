import { create } from "zustand";
import type { Locale } from "@/i18n/translations";

type LayoutMode = "native" | "pip" | "split";

type AgentStore = {
  layoutMode: LayoutMode;
  activeWorkspace: string;
  locale: Locale;
  setLayoutMode: (mode: LayoutMode) => void;
  setActiveWorkspace: (workspace: string) => void;
  setLocale: (locale: Locale) => void;
};

export const useAgentStore = create<AgentStore>((set) => ({
  layoutMode: "native",
  activeWorkspace: "CMS",
  locale: "ko",
  setLayoutMode: (layoutMode) => set({ layoutMode }),
  setActiveWorkspace: (activeWorkspace) => set({ activeWorkspace }),
  setLocale: (locale) => set({ locale }),
}));
