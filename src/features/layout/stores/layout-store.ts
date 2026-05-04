import { create } from "zustand";
import type { Locale } from "@/shared/i18n/types/i18n-types";
import type {
  LayoutMode,
  ThemeMode,
} from "@/features/layout/types/layout-types";

const THEME_STORAGE_KEY = "ai-agent-mock-theme-mode";

function getInitialThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedThemeMode === "dark" || storedThemeMode === "light") {
    return storedThemeMode;
  }

  return "dark";
}

type LayoutStore = {
  layoutMode: LayoutMode;
  locale: Locale;
  themeMode: ThemeMode;
  workspaceSidebarVisible: boolean;
  inspectorVisible: boolean;
  setLayoutMode: (mode: LayoutMode) => void;
  setLocale: (locale: Locale) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  toggleThemeMode: () => void;
  toggleWorkspaceSidebar: () => void;
  toggleInspector: () => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  layoutMode: "native",
  locale: "ko",
  themeMode: getInitialThemeMode(),
  workspaceSidebarVisible: true,
  inspectorVisible: true,
  setLayoutMode: (layoutMode) => set({ layoutMode }),
  setLocale: (locale) => set({ locale }),
  setThemeMode: (themeMode) => set({ themeMode }),
  toggleThemeMode: () =>
    set((state) => {
      const themeMode = state.themeMode === "dark" ? "light" : "dark";

      return { themeMode };
    }),
  toggleWorkspaceSidebar: () =>
    set((state) => ({
      workspaceSidebarVisible: !state.workspaceSidebarVisible,
    })),
  toggleInspector: () =>
    set((state) => ({
      inspectorVisible: !state.inspectorVisible,
    })),
}));
