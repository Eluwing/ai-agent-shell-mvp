import { create } from "zustand";
import type { Locale } from "@/shared/i18n/types/i18n-types";
import type { LayoutMode } from "@/features/layout/types/layout-types";

type LayoutStore = {
  layoutMode: LayoutMode;
  locale: Locale;
  workspaceSidebarVisible: boolean;
  inspectorVisible: boolean;
  setLayoutMode: (mode: LayoutMode) => void;
  setLocale: (locale: Locale) => void;
  toggleWorkspaceSidebar: () => void;
  toggleInspector: () => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  layoutMode: "native",
  locale: "ko",
  workspaceSidebarVisible: true,
  inspectorVisible: true,
  setLayoutMode: (layoutMode) => set({ layoutMode }),
  setLocale: (locale) => set({ locale }),
  toggleWorkspaceSidebar: () =>
    set((state) => ({
      workspaceSidebarVisible: !state.workspaceSidebarVisible,
    })),
  toggleInspector: () =>
    set((state) => ({
      inspectorVisible: !state.inspectorVisible,
    })),
}));
