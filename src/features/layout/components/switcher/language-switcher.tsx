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
          "h-8 rounded-lg border-[color:var(--chrome-border)] bg-[color:var(--button-secondary-bg)] px-2.5 font-medium leading-none text-[color:var(--chrome-foreground)] shadow-none hover:bg-[color:var(--button-secondary-hover-bg)]",
          open && "bg-[color:var(--button-secondary-hover-bg)]",
        )}
        onClick={() => setOpen((current) => !current)}
        variant="outline"
      >
        {getLocaleIcon(locale, "size-3")}
        <span className="text-[11px] font-semibold">
          {localeOptions[locale].label}
        </span>
        <ChevronDown className="size-2.5 opacity-70" />
        <span className="sr-only">{t("language.label")}</span>
      </Button>

      {open ? (
        <div
          className="absolute right-0 z-50 min-w-20 overflow-hidden rounded-lg border border-[color:var(--chrome-border)] bg-[color:var(--card-background)] p-0.5 shadow-md shadow-black/10"
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
                    ? "bg-[color:var(--button-primary-bg)] text-[color:var(--button-primary-fg)]"
                    : "text-[color:var(--chrome-foreground)] hover:bg-[color:var(--button-secondary-hover-bg)] hover:text-[color:var(--chrome-foreground)]",
                )}
                onClick={() => {
                  setLocale(nextLocale);
                  setOpen(false);
                }}
                role="menuitemradio"
                aria-checked={selected}
                type="button"
              >
                {getLocaleIcon(nextLocale, "size-3")}
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
