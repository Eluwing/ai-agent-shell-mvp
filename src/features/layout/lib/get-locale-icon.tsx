import { Globe } from "lucide-react";
import type { Locale } from "@/shared/i18n/types/i18n-types";

export function getLocaleIcon(
  locale: Locale,
  className?: string,
) {
  switch (locale) {
    case "ko":
    case "ja":
    case "en":
    default:
      return <Globe className={className} />;
  }
}
