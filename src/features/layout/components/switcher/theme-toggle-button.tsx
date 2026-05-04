import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function ThemeToggleButton() {
  const { t } = useTranslation();
  const themeMode = useLayoutStore((state) => state.themeMode);
  const toggleThemeMode = useLayoutStore((state) => state.toggleThemeMode);

  return (
    <Button
      aria-label={
        themeMode === "dark"
          ? t("theme.switchToLight")
          : t("theme.switchToDark")
      }
      className="h-8 w-8 rounded-md border-0 px-0 shadow-none"
      onClick={toggleThemeMode}
      variant="outline"
    >
      {themeMode === "dark" ? (
        <SunMedium className="size-3.5" />
      ) : (
        <MoonStar className="size-3.5" />
      )}
    </Button>
  );
}
