import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function WebviewPlaceholder() {
  const { t } = useTranslation();

  return (
    <div className="grid h-[calc(100vh-8.75rem)] place-items-center bg-[color:var(--app-background)]">
      <div className="text-center">
        <p className="text-2xl font-semibold">
          {t("browser.placeholderTitle")}
        </p>
        <p className="mt-2 text-sm text-[color:var(--app-foreground)]/70">
          {t("browser.placeholderSubtitle")}
        </p>
      </div>
    </div>
  );
}
