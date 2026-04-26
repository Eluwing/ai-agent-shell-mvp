import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { localeOptions } from "@/features/layout/constants/locale-options";
import { getLocaleIcon } from "@/features/layout/lib/get-locale-icon";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import type { Locale } from "@/shared/i18n/types/i18n-types";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function LanguageSwitcher() {
  const locale = useLayoutStore((state) => state.locale);
  const setLocale = useLayoutStore((state) => state.setLocale);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <Button
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "h-8 rounded-lg border-zinc-200 bg-zinc-50 px-2.5 font-medium leading-none text-zinc-900 shadow-none hover:bg-zinc-100",
          open && "bg-zinc-100",
        )}
        onClick={() => setOpen((current) => !current)}
        variant="outline"
      >
        {getLocaleIcon(locale)}
        <span className="text-[12px] font-semibold">
          {localeOptions[locale].label}
        </span>
        <ChevronDown className="size-2.5 opacity-70" />
        <span className="sr-only">{t("language.label")}</span>
      </Button>

      {open ? (
        <div
          className="absolute right-0 z-50 min-w-20 overflow-hidden rounded-lg border border-zinc-200 bg-white p-0.5 shadow-md shadow-zinc-200/40"
          role="menu"
          aria-label={t("language.label")}
        >
          {(Object.keys(localeOptions) as Locale[]).map((nextLocale) => {
            const selected = locale === nextLocale;

            return (
              <button
                key={nextLocale}
                className={cn(
                  "flex h-8 w-full items-center gap-1.5 rounded-md px-2 text-left transition-colors",
                  selected
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
                )}
                onClick={() => {
                  setLocale(nextLocale);
                  setOpen(false);
                }}
                role="menuitemradio"
                aria-checked={selected}
                type="button"
              >
                {getLocaleIcon(nextLocale)}
                <span className="text-[10px] font-semibold">
                  {localeOptions[nextLocale].label}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
