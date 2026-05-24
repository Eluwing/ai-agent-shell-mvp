import { TitleBarLayoutProvider } from "@/features/layout/components/title-bar/title-bar-layout-context";
import { WorkspaceTabStrip } from "@/features/workspace/components/tabs/workspace-tab-strip";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";
import { useElementWidth } from "@/shared/hooks/use-element-width";

type AppTitleBarTabsProps = {
  maxTabWidth: number;
};

export function AppTitleBarTabs({ maxTabWidth }: AppTitleBarTabsProps) {
  const [tabsViewportRef, tabAreaWidth] = useElementWidth<HTMLDivElement>();
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  return (
    <TitleBarLayoutProvider
      maxTabWidth={maxTabWidth}
      tabAreaWidth={tabAreaWidth}
    >
      <div
        ref={tabsViewportRef}
        className="flex flex-1 min-w-0 items-end gap-1 overflow-hidden"
      >
        <WorkspaceTabStrip onAddWorkspace={addWorkspace} />
      </div>
    </TitleBarLayoutProvider>
  );
}
