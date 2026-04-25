import { create } from "zustand";
import type { Locale } from "@/shared/i18n/types/i18n-types";
import type { LayoutMode } from "@/features/layout/types/layout-types";

type LayoutStore = {
  layoutMode: LayoutMode;
  locale: Locale;
  setLayoutMode: (mode: LayoutMode) => void;
  setLocale: (locale: Locale) => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  layoutMode: "native",
  locale: "ko",
  setLayoutMode: (layoutMode) => set({ layoutMode }),
  setLocale: (locale) => set({ locale }),
}));
