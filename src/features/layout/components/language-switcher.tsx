import { Button } from "@/shared/components/ui/button";
import {
  localeLabels,
} from "@/shared/i18n/constants/translations";
import type { Locale } from "@/shared/i18n/types/i18n-types";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function LanguageSwitcher() {
  const locale = useLayoutStore((state) => state.locale);
  const setLocale = useLayoutStore((state) => state.setLocale);
  const { t } = useTranslation();

  return (
    <div
      className="ml-2 flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 p-1"
      aria-label={t("language.label")}
    >
      {(Object.keys(localeLabels) as Locale[]).map((nextLocale) => (
        <Button
          key={nextLocale}
          className="h-7 px-2 text-xs"
          variant={locale === nextLocale ? "default" : "secondary"}
          onClick={() => setLocale(nextLocale)}
        >
          {localeLabels[nextLocale]}
        </Button>
      ))}
    </div>
  );
}
