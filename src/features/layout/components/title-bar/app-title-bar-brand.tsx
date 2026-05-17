import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { cn } from "@/shared/lib/cn";

type AppTitleBarBrandProps = {
  className?: string;
};

export function AppTitleBarBrand({ className }: AppTitleBarBrandProps) {
  const { t } = useTranslation();

  return (
    <p
      className={cn(
        "truncate text-[13px] font-medium leading-none text-shell-fg",
        className,
      )}
    >
      {t("app.title")}
    </p>
  );
}
