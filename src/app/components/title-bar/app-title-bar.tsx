import type { CSSProperties } from "react";
import { TitleBarLayoutProvider } from "@/app/context/title-bar/title-bar-layout-context";
import { useElementWidth } from "@/app/hooks/use-element-width";
import { LayoutModeToolbar } from "@/features/layout/components/toolbar/layout-mode-toolbar";
import { LanguageSwitcher } from "@/features/layout/components/switcher/language-switcher";
import { ViewControls } from "@/features/layout/components/toggles/view-controls";
import { WorkspaceTabStrip } from "@/features/workspace/components/tabs/workspace-tab-strip";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { TitleBarSection } from "./title-bar-section";

const dragStyle = { WebkitAppRegion: "drag" } as CSSProperties;
const noDragStyle = { WebkitAppRegion: "no-drag" } as CSSProperties;

export function AppTitleBar() {
  const { t } = useTranslation();
  const [centerRef, tabAreaWidth] = useElementWidth<HTMLDivElement>();

  return (
    <TitleBarLayoutProvider tabAreaWidth={tabAreaWidth}>
      <header className="grid h-9 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-zinc-200 bg-white/90 px-3 pr-2 pl-[86px] backdrop-blur">
        <div
          className="flex shrink-0 items-center translate-y-px"
          style={dragStyle}
        >
          <p className="truncate text-[13px] font-medium leading-none text-zinc-900">
            {t("app.title")}
          </p>
        </div>

        <div
          ref={centerRef}
          className="min-w-0 overflow-hidden"
          style={noDragStyle}
        >
          <WorkspaceTabStrip />
        </div>

        <div
          className="flex shrink-0 items-center gap-2 translate-y-px justify-self-end"
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
    </TitleBarLayoutProvider>
  );
}
