import type { CSSProperties } from "react";
import { LayoutModeToolbar } from "@/features/layout/components/layout-mode-toolbar";
import { LanguageSwitcher } from "@/features/layout/components/language-switcher";
import { ViewControls } from "@/features/layout/components/view-controls";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { TitleBarSection } from "./title-bar-section";

const dragStyle = { WebkitAppRegion: "drag" } as CSSProperties;
const noDragStyle = { WebkitAppRegion: "no-drag" } as CSSProperties;

export function AppTitleBar() {
  const { t } = useTranslation();

  return (
    <header className="flex h-9 items-center border-b border-zinc-200 bg-white/90 px-3 pr-2 pl-[86px] backdrop-blur">
      <div
        className="flex min-w-0 flex-1 items-center translate-y-px"
        style={dragStyle}
      >
        <p className="truncate text-[13px] font-medium leading-none text-zinc-900">
          {t("app.title")}
        </p>
      </div>

      <div
        className="flex items-center gap-2 translate-y-px"
        style={noDragStyle}
      >
        <TitleBarSection withSeparator>
          <ViewControls />
        </TitleBarSection>
        <TitleBarSection withSeparator>
          <LayoutModeToolbar />
        </TitleBarSection>
        <TitleBarSection>
          <LanguageSwitcher />
        </TitleBarSection>
      </div>
    </header>
  );
}
