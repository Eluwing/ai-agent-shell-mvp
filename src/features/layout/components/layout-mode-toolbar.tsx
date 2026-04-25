import { Monitor, PanelRight, PictureInPicture2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function LayoutModeToolbar() {
  const setLayoutMode = useLayoutStore((state) => state.setLayoutMode);
  const { t } = useTranslation();

  return (
    <>
      <Button variant="outline" onClick={() => setLayoutMode("native")}>
        <Monitor className="size-4" />
        {t("layout.native")}
      </Button>
      <Button variant="outline" onClick={() => setLayoutMode("pip")}>
        <PictureInPicture2 className="size-4" />
        {t("layout.pip")}
      </Button>
      <Button variant="outline" onClick={() => setLayoutMode("split")}>
        <PanelRight className="size-4" />
        {t("layout.split")}
      </Button>
    </>
  );
}
