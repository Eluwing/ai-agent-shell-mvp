import type { Locale } from "@/shared/i18n/types/i18n-types";

export type LayoutMode = "native" | "pip" | "split";

export type LayoutState = {
  layoutMode: LayoutMode;
  locale: Locale;
};
