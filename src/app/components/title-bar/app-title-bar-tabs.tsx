import { Plus } from "lucide-react";
import { TitleBarLayoutProvider } from "@/app/context/title-bar/title-bar-layout-context";
import { useElementWidth } from "@/app/hooks/use-element-width";
import { WorkspaceTabStrip } from "@/features/workspace/components/tabs/workspace-tab-strip";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function AppTitleBarTabs() {
  const { t } = useTranslation();
  const [tabsViewportRef, tabAreaWidth] = useElementWidth<HTMLDivElement>();
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  return (
    <TitleBarLayoutProvider tabAreaWidth={tabAreaWidth}>
      <div className="flex min-w-0 items-end gap-1 overflow-hidden">
        <div ref={tabsViewportRef} className="min-w-0 flex-1 overflow-hidden">
          <WorkspaceTabStrip />
        </div>
        <Button
          type="button"
          aria-label={t("workspace.addTab")}
          className="mb-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-shell-fg/70 transition-colors hover:bg-button-outline-hover hover:text-shell-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-primary/30 focus-visible:ring-offset-0"
          onClick={addWorkspace}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </TitleBarLayoutProvider>
  );
}
