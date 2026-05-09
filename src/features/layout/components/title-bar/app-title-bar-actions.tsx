import { LayoutModeToolbar } from "@/features/layout/components/toolbar/layout-mode-toolbar";
import { LanguageSwitcher } from "@/features/layout/components/switcher/language-switcher";
import { ThemeToggleButton } from "@/features/layout/components/switcher/theme-toggle-button";
import { ViewControls } from "@/features/layout/components/toggles/view-controls";
import { TitleBarSection } from "./title-bar-section";

export function AppTitleBarActions() {
  return (
    <div className="flex shrink-0 items-center gap-2 translate-y-px justify-self-end">
      <TitleBarSection withSeparator>
        <ViewControls />
      </TitleBarSection>
      <TitleBarSection withSeparator>
        <LayoutModeToolbar />
      </TitleBarSection>
      <TitleBarSection withSeparator>
        <ThemeToggleButton />
      </TitleBarSection>
      <TitleBarSection>
        <LanguageSwitcher />
      </TitleBarSection>
    </div>
  );
}
